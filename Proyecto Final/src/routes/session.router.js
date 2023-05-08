import { Router } from "express";
import passport from 'passport'
const router = Router();
import config from "../config/config.js";
import UserDTO from "../DAO/DTO/users.dto.js";
import { UserService } from '../repository/index.js'
import { passportCall, authorization,generateToken, transport,isValidPassword, createHash, validateTokenAndGetID, passwordFormatIsValid} from '../utils.js';


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
router.get('/restore-account', (req, res) => {
    res.render('sessions/restore-account');
})

// /restore-account handle jwt token & gmail transport
router.post('/restore-account', async (req, res) => {

    const {email} = req.body;
    const user = await UserService.getOneByEmail(email);

    if(!user) return res.render('sessions/restore-account', { message: 'No encontramos ese usuario'})
    
    try {
        const jwt = generateToken(user._id , "24h");
    
        const result = await transport.sendMail({
            from: config.gmailAppEmail,
            to: email,
            subject: 'Password Reset',
            html: `
                <p>Haz click<a href="http://127.0.0.1:8080/session/restore-account/password-reset/${jwt}" target="_blank"> aquí </a>para restablecer tu contraseña.</p>
            `
        })
        
        return res.render('sessions/restore-account', { message: 'Email enviado! Por favor, revisa el spam en tu correo'})

    } catch (error) {
        console.log(error);
        return res.render('sessions/restore-account', { message: 'Hubo un error, por favor intentalo de nuevo en unos momentos'})
    }
})

// /password-reset
// Validate token (Middleware) validates the jwt token in params
router.get('/restore-account/password-reset/:jwt', validateTokenAndGetID, async(req, res) => {
    //ID in token from ValidateToken
    const { jwt } = req.params
    const id = req.id;
    const user = await UserService.getOneByID(id);
    console.log(user);

    res.cookie('resetToken', id)
    res.cookie('user', user).render('sessions/password-reset');
})

// /restore-account/password-reset checks password format & updates user psw
router.post('/restore-account/password-reset', async(req, res) => {
    const id = req.cookies['resetToken']

    const password = req.body?.data;
    if(!password) return res.send({status: 'error', data: 'La contraseña no puede ser vacía'});
    
    // Handle errors - Render errors in password format
    const message = passwordFormatIsValid(password);
    if(Object.keys(message).length != 0) return  res.send({status: 'error', data: Object.values(message).join(' ')});
    
    // Check if password is the same
    const user = await UserService.getOneByID(id);
    const repitedPassword = isValidPassword(user, password);
    
    if(repitedPassword) return res.send({status: 'error', data: 'La contraseña no puede ser la misma'});
    
    // Change new hashed password 
    const hashedPassword = createHash(password);
    user.password = hashedPassword
    console.log("New user: ",user);
    const result = await UserService.update(user._id, user);
    
    return res.send({status: "success"})
});



    export default router