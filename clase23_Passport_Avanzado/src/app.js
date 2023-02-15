import express from 'express'
import __dirname from './utils.js'
import jwtRouter from './router/jwt.router.js'
import cookieParser from 'cookie-parser'
import initializePassport from './config/passport.config.js'
import passport from 'passport'

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser('coderCookieToken'))

initializePassport()
app.use(passport.initialize())

app.use(express.static(__dirname + '/public'))

app.use('/jwt', jwtRouter)
app.get('/', (req, res) => res.send('ok'))

app.listen(8080)