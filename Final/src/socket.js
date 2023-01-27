import messageModel from "./dao/models/message.model.js";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import chatRouter from './routes/chat.router.js'


const socket = (io, app) => {
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    // Config de rutas
    app.get('/', (req, res) => {
        res.send('Work great!')
    })
    app.use('/api/products', productRouter)
    app.use('/api/carts', cartRouter)
    app.use('/chat', chatRouter)



    io.on("connection", async socket => {
        let messages = await messageModel.find().lean().exec()
        io.emit("logs", messages)
        console.log("New client connected")

        socket.on("message", async data => {

            await messageModel.create(data)
            messages = await messageModel.find().lean().exec()
            io.emit("logs", messages)
        })
    })
}

export default socket