import { Router } from "express";
import passport from 'passport'
const router = Router();
import config from "../config/config.js";
import UserDTO from "../DAO/DTO/users.dto.js";
import { UserService } from '../repository/index.js'
import { passportCall, authorization, transport} from '../utils.js';


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

    req.logger.error('Strategy failed');
    res.send({error: 'Failed'})
})

// View LogIn
router.get('/login', (req, res) => {
    console.log(req.user);
    res.render('sessions/login', {title: 'Login'})
})

// API LogIn
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }

    //cookie del token
    res.cookie(config.jwtCookieName, req.user.token).redirect('/products');
})

router.get('/failLogin', (req, res) => {
    req.logger.error('Strategy failed');
    res.send({error: 'Failed'})
})

router.get('/profile', passportCall('jwt'), authorization('user'), (req, res)=>{

    //User sin password
    const userDTO = new UserDTO(req.user.user).getCurrent()
    console.log("User: ", userDTO);
    res.render('sessions/profile', {
        user: userDTO   
    })
})


// Login Github

router.get('/github', 
passport.authenticate('github', {scope:['user:email']}),
async(req, res) => {}
)

router.get('/githubcallback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    async(req, res) => {
        req.logger.info('Callback', req.user)

        
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
    req.logger.info('Callback', req.user)

    
    req.session.user = req.user
    res.cookie(config.jwtCookieName, req.user.token).redirect('/products');
}

)

// LogOut
router.get('/logout', (req, res) => {
    res.clearCookie(config.jwtCookieName).redirect('/session/login')
})



//----------------------------------------------------------

//Restore Password
router.get('/password-reset', (req, res) => {
    res.render('sessions/password-reset');
})

router.post('/password-reset', async (req, res) => {

    const {email} = req.body;
    const user = await UserService.getOneByEmail(email);

    if(!user) return res.render('sessions/password-reset', { message: 'No encontramos ese usuario'})
    
    const jwt = generateToken(user._id);

    const result = await transport.sendMail({
        from: config.gmailAppKey,
        to: email,
        subject: 'Password Reset',
        html: `
            <p>Haz click <a href="http://127.0.0.1:8080/session/restore/${jwt}" target="_blank">aquí </> para restablecer tu contraseña.</p>
        `
    })
})

router.get('/password-reset/:jwt', validateTokenAndGetID, async(req, res) => {
    const id = req.id;
    const user = await UserService.getOne(id);
    const token = req.params.jwt;
    res.cookie('user', user).render('session/changepass');
})


    export default router