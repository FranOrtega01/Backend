import jwt from 'jsonwebtoken'
import passport from 'passport'
import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import config from './config/config.js'
import { faker } from '@faker-js/faker'
import nodemailer from 'nodemailer'


export default __dirname
faker.locale = 'es'

// Bcrcypt hash
export const createHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// Check if password is valid
export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

// Cookies Token Extract
export const extractCookie = req => {
    return (req && req.cookies) ? req.cookies[config.jwtCookieName] : null
}

// JWT Token Generate
export const generateToken = (user, time) => {
    const token = jwt.sign({user}, config.jwtPrivateKey , {expiresIn: time} )
    return token
}


// Cookie Token Auth
export const authToken = (req, res, next) => {

    let token = req.cookies[config.jwtCookieName]
    if(!token) return res.status(401).render('errors/base', {error: 'Not authenticated'})

    jwt.verify(token, config.jwtPrivateKey, (err, credentials) => {
        if(err) return res.status(403).render('errors/base', {error:'Not authorized'})

        req.user = credentials.user
        next()
    })
}

// Rol authorization
// export const authorization = (rol) => {
//     return async (req, res, next) => {
//         console.log("Auth: ",req.user);
//         const user = req.user?.user;
//         if (!user) return res.status(401).send({ error: "Unauthorized" });
//         if (user.rol != rol) return res.status(403).send({ error: 'No Permission' })
//         next();
//     }
// }

export const authorization = (rol) => {
    return async (req, res, next) => {
        const user = req.user?.user;
        if (!user) return res.status(401).send({status:'error', error: "Unauthorized" });
        if (!rol.includes(user.rol)) return res.status(403).send({status:'error', error: 'No Permission' })
        next();
    }
}

// Passport
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).render('errors/base', { error: info.messages ? info.messages : info.toString() })
            };
            req.user = user;
            next();
        })(req, res, next)
    }
}


// Transport Email (gmail)
export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAppEmail,
        pass: config.gmailAppKey,
    }
})


// Validate JWT token for password reset
export const validateTokenAndGetID = (req, res, next) => {
    const token = req.params.jwt;
    jwt.verify(token, config.jwtPrivateKey, (error, credentials) => {
        if(error) console.log(error);
        if (error) return res.render('sessions/password-reset', { message: "token expired" })
        //ID in token
        req.id = credentials.user;
        next();
    })
}

export const passwordFormatIsValid = (password)=>{
    const message = {};
    if(password.length < 8) message.large = "Debe tener como mínimo 8 caracteres.";
    if(!(/[A-Z]/.test(password))) message.mayus = "Debe contener al menos una mayúscula.";
    if(!(/[0-9]/.test(password))) message.number = "Debe contener algún número.";

    return message;

}

// Mock Testing

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