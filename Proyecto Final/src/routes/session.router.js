import { Router } from "express";
import passport from 'passport'
const router = Router();

import dotenv from 'dotenv';
dotenv.config();

// View para register 

function auth(req, res, next){
    if(req.cookies[process.env.COOKIE_NAME]){
        return next()
    }
    return res.status(401).send('Error de autorización')
}

router.get('/register', (req, res) => {
    res.render('sessions/register' , {title: 'Register'})
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
    res.render('sessions/login', {title: 'Login'})
})

// API LogIn
router.post('/login', passport.authenticate('login', {failureRedirect: '/session/failLogin'}), async (req,res) => {

    if(!req.user){
        return res.status(400).send({status:'error', error: 'Invalid Credentials'})
    }

    // req.session.user = {
    //     first_name: req.user.first_name,
    //     last_name: req.user.last_name,
    //     email: req.user.email,
    //     age: req.user.age,
    //     rol: req.user.rol
    // }

    res.cookie(process.env.COOKIE_NAME, req.user.token).redirect('/products')
})

router.get('/failLogin', (req, res) => {
    console.log('Fail Strategy');
    res.send({error: 'Failed'})
})

router.get('/profile',auth, (req, res) => {
    console.log(req.user);
    res.render('sessions/profile', { user: req.user})
})


// Login Github

router.get('/github', 
passport.authenticate('github', {scope:['user:email']}),
async(req, res) => {}
)

router.get('/githubcallback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    async(req, res) => {
        console.log('Callback', req.user);
        
        req.session.user = req.user
        
        
        res.redirect('/products')
    })
    
    // Login Google
    
    router.get('/google', 
    passport.authenticate('google', 
    {scope:['email', 'profile']}),
    async(req, res) => {}
    )
    
    router.get('/googlecallback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    async(req, res) => {
        console.log('Callback', req.user);
        
        req.session.user = req.user
        
        res.redirect('/products')
    }
    
    )
    export default router
    
    // LogOut
    router.get('/logout', (req, res) => {
        // req.session.destroy(err => {
        //     if(err){
        //         console.log(err);
        //         return res.status(500).render('errors/base', {error: err})
        //     }
        //     res.clearCookie(process.env.COOKIE_NAME).redirect('/session/login')
        // })
        res.clearCookie(process.env.COOKIE_NAME).redirect('/session/login')

    })