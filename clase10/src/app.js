import express from 'express'
import { Server } from 'socket.io'
import __dirname from './utils.js'


const app = express()
const httpServer = app.listen(8080, () => console.log('Listening...'))
const socketServer = new Server(httpServer)

app.use(express.static (__dirname + '/public'))

socketServer.on('connection', socket => {
    //Handshake

    console.log('New client');

    socket.on('message', data => {
        console.log('SERVER:', data)
    })

    socket.emit('msg_individual', 'Este mensaje, solo lo recibe el socket')

    socket.broadcast.emit('msg_resto', 'Este mensaje los reciben todos menos el socket actual')

    socketServer.emit('msg_all', 'Este mensaje se envia a todos')
})