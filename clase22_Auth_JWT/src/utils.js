import { fileURLToPath } from "url";
import { dirname } from "path";
import jwt from "jsonwebtoken";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname 


const PRIVATE_KEY = 'coderhouse_123456'

export const generateToken = user => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'} )
    return token
}

export const authToken = (req, res, next) => {
    const token = req.headers.auth 

    if(!token) return res.status(401).send({error: 'Not auth'})

    jwt.verify(token, PRIVATE_KEY, (err, credentials) => {
        if(err) return res.status(403).send({error: 'Not authorizated'})

        req.user = credentials.user
        next()
    })

}