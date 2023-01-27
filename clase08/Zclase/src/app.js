import express from 'express'
import usersRouter from './routes/user.router.js'
import petsRouter from './routes/pet.router.js'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static', express.static('public'))


//Un middleware que ejecuta una funcion SIEMPRE antes de llegar al endpoint
app.use((req, res, next) => {
    console.log('Time:', new Date().toLocaleTimeString())
    next()
})

//Lo mismo que el anterior pero para un endpoint especifico
function midi1(req, res, next){
    req.dato1 = 'un dato'
    next()
}
//Se pueden anidar
function midi2(req, res, next){
    req.dato2 = 'otro dato'
    next()
}

app.use('/api/users', midi1, midi2, usersRouter)
app.use('/api/pets', petsRouter)


app.listen(8080)