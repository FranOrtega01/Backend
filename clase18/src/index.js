import express from "express";
import __dirname from './utils.js'
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import ViewsRouter from './routes/views.router.js'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017', {dbName: 'Pizzeria'}, () => {
    app.listen(8080, () => console.log('Listening...'))
})


app.use('/', ViewsRouter)