import passport from "passport";
import UserModel from "../models/user.models.js";
import GithubStrategy from 'passport-github2'

const initializePassport = () => {

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.758e2e05670e4223',
        clientSecret: 'ae237859b3cccbce5a1e685c6f2cd2ac7b822223',
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

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })
}

export default initializePassport