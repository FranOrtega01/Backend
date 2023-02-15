import passport from "passport";

import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const PRIVATE_KEY = 'coderhouse_123456'


const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies['MyTokenCookie'] : null
    console.log('Cookie extractor:', token);
    return token
}


const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }

    }))
}

export default initializePassport