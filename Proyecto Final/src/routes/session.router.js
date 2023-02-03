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
    // Si el register falla, redirecciona a failRegister
router.post('/register', passport.authenticate('register', {failureRedirect: '/session/failRegister'}), async (req, res) => {
    
    res.redirect('/session/login')
})

router.get('/failRegister', (req, res) => {
    console.log('Fail Strategy');
    res.send({error: 'Failed'})
})

// View LogIn
router.get('/login', (req, res) => {
    res.render('sessions/login')
})

// API LogIn
router.post('/login', passport.authenticate('login', {failureRedirect: '/session/failLogin'}), async (req,res) => {

    if(!req.user){
        return res.status(400).send({status:'error', error: 'Invalid Credentials'})
    }

    req.session.user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age
    }

    res.redirect('/products')
})

router.get('/failLogin', (req, res) => {
    console.log('Fail Strategy');
    res.send({error: 'Failed'})
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