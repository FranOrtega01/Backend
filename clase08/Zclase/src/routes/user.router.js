import { Router } from 'express'

const router = Router()
const users = []

router.get('/', (req, res) => {

    console.log(req.dato1);
    console.log(req.dato2);

    res.json({users})
})

router.post('/', (req, res) => {
    const user = req.body
    users.push(user)

    res.send({status: 'success', message:'User created!'})
})

export default router