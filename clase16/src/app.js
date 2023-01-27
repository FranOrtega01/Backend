import express from "express";
import handlebars from 'express-handlebars';
import __dirname from "./utils.js";

import pokeRouter from './routes/pokedex.router.js';
import mongoose from "mongoose";


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Config del motor
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Carpeta publica
app.use(express.static(__dirname + '/public'))

// Config de rutas
app.get('/', (req, res) => {
    res.send('Work great!')
})

app.use('/pokedex', pokeRouter)


const uri = 'mongodb+srv://FranOrtega:elsapopepe.CODERHOUSE@clustertester.b9tsw8l.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(uri, error => {
    if(error){
        console.log('Couldnt connect to DB');
        return
    }
    console.log('Connected to DB');
    app.listen(8080, () => console.log('Listening...'))
    
})