import passport from 'passport'
import local from 'passport-local'
import UserModel from '../dao/models/user.model.js';
import { createHash, isValidPassword} from "../utils.js";

//Passport (Local) - mejora la arquitectura y estructura generando estrategias de auth y autorizacion, dejando el codigo mas limpio

const LocalStrategy = local.Strategy

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
            if(email == 'adminCoder@coder.com' && password == 'adminCod3r123') rol = 'admin'

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

            return done(null, user)
        } catch (error) {
            console.log(error);
        }
    }))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport