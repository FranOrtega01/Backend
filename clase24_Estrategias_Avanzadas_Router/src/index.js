import express from 'express'
import UsersRouter from './routes/user.router.js'

const app = express()

const usersRouter = new UsersRouter()

app.use('/users', usersRouter.getRouter())


app.listen(8080)