import messageModel from "./dao/models/message.model.js";
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import chatRouter from './routes/chat.router.js'
import productViewRouter from './routes/products.view.router.js'
import cartViewRouter from './routes/cart.view.router.js'
import sessionRouter from './routes/session.router.js'
import { passportCall } from "./utils.js";

const socket = (io, app) => {
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    // Config de rutas
    app.get('/', (req, res) => {
        res.redirect('/session/login')
    })

    app.use('/products', passportCall('jwt'), productViewRouter)
    app.use('/cart', cartViewRouter )
    app.use('/api/products', productRouter)
    app.use('/api/carts', cartRouter)
    app.use('/chat', chatRouter)
    app.use('/session', sessionRouter)


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