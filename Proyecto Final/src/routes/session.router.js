import { Router } from "express";
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from 'passport'
const router = Router();

// View para register 

router.get('/register', (req, res) => {
    res.render('sessions/register')
})

// API para crear usuarios
router.post('/register', passport.authenticate('register', {failureRedirect: '/session/failRegister'}), async (req, res) => {
    const userNew = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age,
        password: createHash(req.body.password)
    }
    console.log(userNew);

    const user = new UserModel(userNew)
    await user.save()

    res.redirect('/session/login')
})

// View LogIn
router.get('/login', (req, res) => {
    res.render('sessions/login')
})

// API LogIn
router.post('/login', async (req,res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({email}).lean().exec()
    
        if(!user){
            return res.status(401).render('errors/base', {
                error: 'User not found'
            })
        }
    
        if(!isValidPassword(user, password)){
            return res.status(403).send({status: 'error', error: 'Incorrect Password'})
        }
    
        delete user.passowrd
    
        req.session.user = user
    
        res.redirect('/products')
        
    } catch (error) {
        res.json({status: 'error', error})
    }

})


router.get('/profile', (req, res) => {
    res.json(req.session.user)
})


// LogOut
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
            res.status(500). render('errors/base', {error: err})
        }
        else{
            res.redirect('/session/login')
        }
    })
})


export default router