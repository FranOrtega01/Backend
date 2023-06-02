import { Router } from "express";
import passport from 'passport'
const router = Router();
import { passportCall, authorization , validateTokenAndGetID,  } from '../utils.js';

import { login, profile, githubLogin, logout, resetPasswordMail, resetPasswordRender, resetPassword} from "../controller/sessions.controller.js";

// View para register 
router.get('/register', (req, res) => {
    res.render('sessions/register', { title: 'Register' })
})

// API para crear usuarios
// Si el register falla, redirecciona a failRegister
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failRegister' }), async (req, res) => {
    res.redirect('/session/login')
})

router.get('/failRegister', (req, res) => {
    req.logger.error('Strategy failed');
    res.send({ error: 'Failed' })
})

// View LogIn
router.get('/login', (req, res) => {
    res.render('sessions/login', { title: 'Login' })
})

// API LogIn
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), login)

router.get('/failLogin', (req, res) => {
    req.logger.error('Strategy failed');
    res.send({ error: 'Failed' })
})

router.get('/profile', passportCall('jwt'), authorization(['user', 'premium', 'admin']), profile)


// Login Github

router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] }),
    async (req, res) => { }
)

router.get('/githubcallback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    githubLogin)

// Login Google

router.get('/google',
    passport.authenticate('google',
        { scope: ['email', 'profile'] }),
    async (req, res) => { }
)

router.get('/googlecallback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    githubLogin
)

// LogOut
router.get('/logout', logout)


//----------------------------------------------------------

//Restore Password
router.get('/restore-account', (req, res) => {
    res.render('sessions/restore-account');
})

// /restore-account handle jwt token & gmail transport
router.post('/restore-account', resetPasswordMail)

// /password-reset
// Validate token (Middleware) validates the jwt token in params
router.get('/restore-account/password-reset/:jwt', validateTokenAndGetID, resetPasswordRender)

// /restore-account/password-reset checks password format & updates user psw
router.post('/restore-account/password-reset', resetPassword);



export default router