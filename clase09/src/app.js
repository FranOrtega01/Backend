import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js '
import viewsRouter from './routes/view.router.js'


const app = express();

app.use(express.static(__dirname + '/public'))

// Inicializamos el Motor de Plantilla:
app.engine('handlebars', handlebars.engine())
// Indicamos donde estan las Views:
app.set('views', __dirname + '/views')
// Indicamos que Motor de Plantilla usamos:
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

const server = app.listen(8080)