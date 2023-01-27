import express from 'express';
import pokeapi from './routes/pokeapi.routes.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js';

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/pokeapi', pokeapi)

app.get('/', (req, res) => {
    res.send('OK')
})

app.listen(8080)