import passport from 'passport'
import local from 'passport-local'
import UserModel from '../dao/models/user.model.js';
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy
const initializePassport = () => {
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
    async (req, username, password, done) => {

        const {first_name, last_name, email, age} = req.body

        try {
            const user = await UserModel.findOne({email: username})

            if(user){
                console.log('User already exists');
            }

            const newUser = { first_name, last_name, email, age, password: createHash(password)}

            const result = await UserModel.create(newUser)

            return done(null, result)

        } catch (error) {
            return done('Error al obtener user ' + error)
        }
    }))
}

export default initializePassport