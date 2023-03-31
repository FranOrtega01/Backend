import { Router } from "express";
import passport from 'passport'
const router = Router();
import config from "../config/config.js";

// View para register 



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
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }

    //cookie del token
    console.log(config.jwtCookieName);
    res.cookie(config.jwtCookieName, req.user.token).redirect('/products');
})

router.get('/failLogin', (req, res) => {
    console.log('Fail Strategy');
    res.send({error: 'Failed'})
})

router.get('/profile', (req, res) => {
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
        res.cookie(config.jwtCookieName, req.user.token).redirect('/products');
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
        res.cookie(config.jwtCookieName, req.user.token).redirect('/products');
    }
    
    )
    export default router
    
    // LogOut
    router.get('/logout', (req, res) => {
        res.clearCookie(config.jwtCookieName).redirect('/session/login')
    })