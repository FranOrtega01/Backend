import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
import GithubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oidc'
import { createHash, isValidPassword, generateToken, extractCookie} from "../utils.js";
import { UserService, CartService } from '../repository/index.js'
import config from './config.js'


//Passport (Local) - mejora la arquitectura y estructura generando estrategias de auth y autorizacion, dejando el codigo mas limpio

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const JWTExtract = jwt.ExtractJwt


const initializePassport = () => {
    //Estrategia para register
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email' 
    },
    async (req, username, password, done) => {

        // Datos del form
        let {first_name, last_name, email, age, rol} = req.body

        try {
            // Buscar un user con ese email
            const user = await UserService.getOneByEmail(username)

            // Si existe return 
            if(user){
                return done(null, false) // (null) No hay ningun error pero, (false) el usuario ya existe.
            }

            // Handle roles
            //Cambiar
            if(email == config.adminEmail && password == config.adminPass) rol = 'admin'
            // Crea el user con el hash
            const newUser = { 
                first_name, 
                last_name, 
                email, 
                age, 
                password: createHash(password), 
                cart: await CartService.create(),
                rol
            }
            const result = await UserService.create(newUser)

            return done(null, result)

        } catch (error) {
            return done('Error al obtener user ' + error)
        }
    }))

    //Estrategia para login
    passport.use('login', new LocalStrategy({
        usernameField: 'email',

    }, async (username, password, done) => {
        try {
            const user = await UserService.getOneByEmail(username)

            if(!user){
                return(null, user)
            }
    
            // No hay error, pero esta mal las password
            if(!isValidPassword(user, password)) return done(null, false)

            // jwt Token

            const token = generateToken(user, '24h');
            user.token = token
            return done(null, user)
            
        } catch (error) {
            req.logger.error(error)
        }
    }))

    //Estrategia para login con GitHub
    passport.use('github', new GithubStrategy({
        clientID: config.githubClientID,
        clientSecret: config.githubAppKey,
        callbackURL: 'http://127.0.0.1:8080/session/githubcallback'
    }, async (accesToken, refreshToken, profile, done) => {

        try {
            const user = await UserService.getOneByEmail( profile._json.email )

            if (user) {
                const token = generateToken(user, "24h");
                user.token = token;
                return done(null, user)
            };

            const newUser = await UserService.create({
                first_name: profile._json.name,
                last_name: '',
                email: profile.emails[0].value,
                age: profile._json.age,
                password: '', 
                cart: await CartService.create(),
                rol: 'user'
            })

            const token = generateToken(newUser, "24h");
            newUser.token = token;

            return done(null, newUser);
        } catch (error) {
            return done('Error to login with GitHub: ' + error);
        }
    }
    ))

    //Estrategia para login con Google
    passport.use('google', new GoogleStrategy({
        clientID: config.googleClientID,
        clientSecret: config.googleAppKey,
        callbackURL: 'http://127.0.0.1:8080/session/googlecallback'
    }, async (issuer, profile, done) => {
        const { name, emails} = profile
        try {
            const user = await UserService.getOneByEmail(emails[0].value)

            if(user){
                const token = generateToken(user, "24h");
                user.token = token;
                return done(null, user)
            }

            const newUser = await UserService.create({
                first_name: name.givenName,
                last_name:  name.familyName,
                email: emails[0].value,
                password: '',
                cart: await CartService.create(),
                rol:'user'
            })

            const token = generateToken(user, "24h");
            newUser.token = token;
            return done(null, newUser)

        } catch (error) {
            return done('Error to login with Google' + error)
        }
    }
    ))

    // Estrategia para current con JWT
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([extractCookie]),
        secretOrKey: config.jwtPrivateKey,
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserService.getOneByID(id)
        done(null, user)
    })
}

export default initializePassport