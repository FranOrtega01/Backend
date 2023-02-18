import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
import UserModel from '../dao/models/user.model.js';
import GithubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oidc'
import { createHash, isValidPassword, generateToken, extractCookie} from "../utils.js";

import dotenv from "dotenv"
dotenv.config()

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
        const {first_name, last_name, email, age, rol} = req.body

        try {
            // Buscar un user con ese email
            const user = await UserModel.findOne({email: username})

            // Si existe return 
            if(user){
                console.log('User already exists');
                return done(null, false) // (null) No hay ningun error pero, (false) el usuario ya existe.
            }

            // Handle roles
            //Cambiar
            if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) rol = 'admin'

            // Crea el user con el hash
            const newUser = { 
                first_name, 
                last_name, 
                email, 
                age, 
                password: createHash(password), 
                rol
            }

            const result = await UserModel.create(newUser)

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
            const user = await UserModel.findOne({email: username})

            if(!user){
                console.log('User doesnt exist');
                return(null, user)
            }
    
            // No hay error, pero esta mal las password
            if(!isValidPassword(user, password)) return done(null, false)

            const token = generateToken(user);
            user.token = token

            return done(null, user)
        } catch (error) {
            console.log(error);
        }
    }))

    //Estrategia jwt
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([extractCookie]),
        secretOrKey: process.env.JWT_SIGN
    }, async(jwt_payload, done) => {
        done(null, jwt_payload)
    }
    ))
    //Estrategia para login con GitHub
    passport.use('github', new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_APP_KEY,
        callbackURL: 'http://127.0.0.1:8080/session/githubcallback'
    }, async (accesToken, refreshToken, profile, done) => {
        console.log(profile);

        try {
            const user = await UserModel.findOne({email: profile._json.email})

            if(user) return done(null, user)

            const newUser = await UserModel.create({
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                password: ''
            })


            return done(null, newUser)

        } catch (error) {
            return done('Error to login with GitHub' + error)
        }
    }
    ))


    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_APP_KEY,
        callbackURL: 'http://127.0.0.1:8080/session/googlecallback'
    }, async (accesToken, refreshToken, profile, done) => {
        // const { name, emails} = profile
        console.log(profile);
        try {
            const user = await UserModel.findOne({email: profile.emails[0].value})

            if(user) return done(null, user)

            const newUser = await UserModel.create({
                first_name: profile.name.givenName,
                last_name:  profile.name.familyName,
                email: profile.emails[0].value,
                password: ''
            })

            return done(null, newUser)

        } catch (error) {
            return done('Error to login with Google' + error)
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport