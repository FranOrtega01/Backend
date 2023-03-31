import jwt from 'jsonwebtoken'
import passport from 'passport'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import config from './config/config.js'
import { faker } from '@faker-js/faker'


export default __dirname
faker.locale = 'es'

//Bcrcypt 
export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

//Cookies Token
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[config.jwtCookieName] : null
}

// JWT Token
export const generateToken = user => {
    const token = jwt.sign({user}, config.jwtPrivateKey , {expiresIn: '24h'} )
    return token
}

export const authToken = (req, res, next) => {

    let token = req.cookies[config.jwtCookieName]
    if(!token) return res.status(401).render('errors/base', {error: 'Not authenticated'})

    jwt.verify(token, config.jwtPrivateKey, (err, credentials) => {
        if(err) return res.status(403).render('errors/base', {error:'Not authorized'})

        req.user = credentials.user
        next()
    })
}
export const authorization = (rol) => {
    return async (req, res, next) => {
        console.log('USUARIO AUTH: ', req.user);
        const user = req.user?.user || req.user;
        if (!user) return res.status(401).send({ error: "Unauthorized" });
        if (user.rol != rol) return res.status(403).send({ error: 'No Permission' })
        next();
    }
}

//Passport
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

export const productsMock = (cant) =>{
    const products = [];
    for (let i = 0; i < cant; i++) {
        products.push(generateProduct());
    }
    return products;
}

export const generateProduct = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: true,
        stock: faker.random.numeric(1),
        category: faker.commerce.productMaterial(),
        thumbnails: [faker.image.imageUrl()],
    }
}