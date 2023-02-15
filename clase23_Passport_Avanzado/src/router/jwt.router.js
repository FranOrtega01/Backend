import { Router } from "express";
import { generateToken, authToken, passportCall, authorization } from '../utils.js'
import passport from "passport";


const router = Router()

const users = [
    {email: 'fran@gmail.com', password:'secret', rol: 'user'},
    {email: 'admin@gmail.com', password:'secret', rol: 'admin'}

]

router.post('/register', (req, res) => {
    const user = req.body

    if(users.find(u => u.email === user.email)){
        return res.status(400).send({status: 'error', error: 'User already exists'})
    }

    users.push(user)
    const access_token = generateToken(user)

    res.send({status: 'success', access_token})
})

router.post('/login', (req, res)=> {
    const {email, password} = req.body

    const user = (users.find(u => u.email === email && u.password === password))

    if(!user) return res.status(400).send({status: 'error', error: 'Invalid credentials'})

    const access_token = generateToken(user)
    res.cookie('MyTokenCookie', access_token).send({status: 'success'})
})

//Daria Not Auth porque no toma el token de la Cookie, lo toma del header
//Ver utils
router.get('/private', passportCall('jwt'), authorization('user'), (req, res) => {
    res.send({status:'succes', payload: req.user, role: 'USER'})
})

router.get('/admin', passportCall('jwt'), authorization('admin'), (req, res) => {
    res.send({status:'succes', payload: req.user, role: 'ADMIN'})
})


export default router