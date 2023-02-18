
import express from 'express'
import handlebars from 'express-handlebars'
import { Server }  from 'socket.io'
import __dirname from './utils.js';

import mongoose from "mongoose";
import socket from './socket.js';

import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

import dotenv from 'dotenv';
dotenv.config();


// Init Servers
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Config engine templates

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.static(__dirname + '/public'))

// Config DB

const uri = `mongodb+srv://FranOrtega:${process.env.MONGO_PASSWORD}@clustertester.b9tsw8l.mongodb.net/?retryWrites=true&w=majority`


const DBname = 'ecommerce'

// Config Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: uri,
        dbName: DBname
        
    }),
    secret:'mysecret',
    resave: true,
    saveUninitialized: true
    
}))
// Inicializa Middlewares de Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Server + DB setup
mongoose.set('strictQuery', false)

mongoose.connect(uri,{dbName: DBname}, error => {
    if(error){
        console.log(error);
        console.log('Couldnt connect to DB');
        return
    }
    console.log('Connected to DB');

    const httpServer = app.listen(8080, () => console.log('Listening...'))
    const socketServer = new Server(httpServer)
    // Socket() - Maneja los mensajes 
    socket(socketServer, app)
})