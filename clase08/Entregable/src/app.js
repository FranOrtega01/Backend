import express from 'express'
import handlebars from 'express-handlebars'
import { Server }  from 'socket.io'
import __dirname from './utils.js';

import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'


// Init Servers
const app = express()
const httpServer = app.listen(8080, () => console.log('Listening...'))
const io = new Server(httpServer)

// Config engine templates

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.use((req,res,next)=>{
    req.io = io
    next()
})

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
