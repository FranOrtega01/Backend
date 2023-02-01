import express from 'express'
import handlebars from 'express-handlebars'
import { Server }  from 'socket.io'
import __dirname from './utils.js';

import mongoose from "mongoose";
import socket from './socket.js';

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
const uri = "mongodb+srv://FranOrtega:elsapopepe.CODERHOUSE@clustertester.b9tsw8l.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', false)

// Server + DB setup
mongoose.connect(uri,{dbName: "ecommerce"}, error => {
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