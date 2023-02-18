import jwt from 'jsonwebtoken'
import passport from 'passport'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import dotenv from 'dotenv';
dotenv.config();

export default __dirname

export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const extractCookie = req => {
    return (req && req.cookie) ? req.cookie.process.env.COOKIE_NAME : null
}

export const generateToken = user => {
    const token = jwt.sign({user}, process.env.JWT_SIGN , {expiresIn: '24h'} )
    return token
}

export const authToken = (req, res, next) => {
    //Si existe el token en el header lo tomo de ahi
    // let token = req.headers.auth 

    //Si no lo tomo de la cookie donde deberia estar
    let token = req.cookies[process.env.COOKIE_NAME]
    if(!token) return res.status(401).render('errors/base', {error: 'Not authenticated'})

    jwt.verify(token, process.env.JWT_SIGN, (err, credentials) => {
        if(err) return res.status(403).render('errors/base', {error:'Not authorized'})

        req.user = credentials.user
        next()
    })
}

export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if(err) return next(err)
            if(!user){
                return res.status(401).render('errors/base', {error: info.messages ? info.messages : info.toString()})
            }

            req.user = user
            next()
        })(req, res, next)
    }
}