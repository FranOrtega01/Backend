
import express from 'express'
import handlebars from 'express-handlebars'
import { Server }  from 'socket.io'
import __dirname from './utils.js';
import cookieParser from 'cookie-parser'

import socket from './socket.js';

import session from 'express-session';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

// Init Servers
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Config engine templates

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.static(__dirname + '/public'))



// Config Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));


// Passport Middlewares Config
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Server 
const httpServer = app.listen(8080, () => console.log('Listening...'))
const socketServer = new Server(httpServer)
socket(socketServer, app)
