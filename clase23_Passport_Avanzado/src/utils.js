import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import passport from "passport";

export default __dirname 


const PRIVATE_KEY = 'coderhouse_123456'

export const generateToken = user => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'} )
    return token
}

export const authToken = (req, res, next) => {
    //Si existe el token en el header lo tomo de ahi
    let token = req.headers.auth 

    //Si no lo tomo de la cookie donde deberia estar
    if(!token) token = req.cookies['MyTokenCookie']
    if(!token) return res.status(401).send({error: 'Not auth'})

    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if(err) return res.status(403).send({error: 'Not authorizated'})

        req.user = credentials.user
        next()
    })
}

export const passportCall = (strategy) => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info){
            if(err) return next(err)
            if(!user){
                return res.status(401).send({error: info.messages ? info.messages : info.toString()})
            }

            req.user = user
            next()
        })(req, res, next)
    }
}

export const authorization = rol => {
    return async(req, res, next) => {
        const user = req.user.user
        if(!user) return res.status(401).send({error: 'Unauthorized'})
        console.log(user.rol);
        // if(user.rol != rol) return res.status(403).send({error: 'No permission'})
        if(user.rol != 'admin' && user.rol != rol) return res.status(403).send({error: 'No permission'})

        next()
    }
}