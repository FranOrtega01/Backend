import MyRouter from './router.js'

export default class UsersRouter extends MyRouter{
    init(){
        this.get('/', (req, res) => {
            res.sendSucces('Hola Coders')
        }) 
    }
}