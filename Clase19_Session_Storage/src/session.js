import express from 'express';
import session from 'express-session';


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('Ok'))
app.use(session({
    secret: 'secretsecret',
    resave: true, // Mantiene la sesion activa
    saveUninitialized: true // Guarda cualquier cosa, asi sea avacio
}))

app.get('/session', (req, res) => {

    if(req.session.counter){
        req.session.counter++
        return res.send(`Se ha visitado el sitio ${req.session.counter} veces.`)
    }
    req.session.counter = 1
    res.send('Bienvenido')

})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send({status: 'Logout error', error: err})

        res.send('Logout ok')
    })

})

const DB = [{username:'lucas', password:'secret', rol: 'admin'}]

app.get('/login', (req, res) => {
    const {username, password} = req.query

    const user = DB.find(u => u.username === username && u.password === password)

    if(!user) return res.send('invalid credentials')

    req.session.user = user //Creamos la session

    res.send('Login success!')

}) 

function auth(req, res, next){
    if(req.session?.user){
        return next()
    }
    return res.status(401).send('Error de authorization')
}

app.get('/private', auth, (req,res) => {
    res.send('Esta pagina la podes ver porque estas logueado' + JSON.stringify(req.session.user))
})

app.listen(8080)