import MyRouter from './router.js'
import jwt from 'jsonwebtoken'

export default class UsersRouter extends MyRouter{
    init(){

        this.post('/login', ['PUBLIC'], (req, res) => {
            const user ={
                email: req.query.email,
                role: 'user'
            }
            const token = jwt.sign(user, 'secret');
            res.sendSuccess({token})

        })

        this.get('/', ['PUBLIC'], (req, res) => {
            res.sendSuccess('Hola Coders')
        }) 

        this.post('/:word',['USER'] , (req, res) => {
            if(req.params.word == 'x') res.sendUserError('sadf')
            res.sendSuccess('Word added')
        })

    }
}