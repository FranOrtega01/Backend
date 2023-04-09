import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import chatRouter from './routes/chat.router.js'
import productViewRouter from './routes/products.view.router.js'
import cartViewRouter from './routes/cart.view.router.js'
import sessionRouter from './routes/session.router.js'
import mockingRouter from './routes/mocking.router.js'
import loggerTest from "./routes/logger.router.js"
import { passportCall } from "./utils.js";

const socket = (io, app) => {
    
    app.use((req, res, next) => {
        req.io = io;
        next();
    });

    // Config de rutas
    app.get('/', (req, res) => {
        req.session.user ? res.redirect('/products') : res.redirect('/session/login')
    })

    app.use('/products', passportCall('current') , productViewRouter)
    app.use('/cart', passportCall('current'), cartViewRouter )
    app.use('/api/products', productRouter)
    app.use('/api/carts', cartRouter)
    app.use('/chat', passportCall('current'), chatRouter)
    app.use('/session', sessionRouter) 
    app.use('/mockingproducts', mockingRouter)
    app.use("/loggerTest", loggerTest)
    
}


export default socket