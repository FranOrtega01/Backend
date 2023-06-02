import { UserService } from "../repository/index.js";
import { generateToken, transport, isValidPassword, createHash, passwordFormatIsValid } from '../utils.js';
import UserDTO from "../DAO/DTO/users.dto.js";
import config from "../config/config.js";


export const login = async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }
    console.log('USER:', req.user);
    try {
        // cookie del token
        res.cookie(config.jwtCookieName, req.user.token);

        // Update last_connection
        await UserService.update(req.user._id, {last_connection: Date.now()})

        res.status(200).redirect('/products')
    } catch (error) {
        res.status(400).send({ status: 'error', error })
    }

}

export const profile = async (req, res) => {
    //User sin password
    const userDTO = new UserDTO(req.user.user).getCurrent()
    res.render('sessions/profile', {
        user: userDTO
    })
}

export const githubLogin = async (req, res) => {
        req.logger.info('Callback', req.user)
        req.session.user = req.user
        res.cookie(config.jwtCookieName, req.user.token).redirect('/products');
}

export const logout = async (req, res) => {
    await UserService.update(req.user._id, {last_connection: Date.now()})
    res.clearCookie(config.jwtCookieName).redirect('/session/login')
}

export const resetPasswordMail = async (req, res) => {
    const { email } = req.body;
    const user = await UserService.getOneByEmail(email);

    if (!user) return res.render('sessions/restore-account', { message: 'No encontramos ese usuario' })

    try {
        const jwt = generateToken(user._id, "24h");

        const result = await transport.sendMail({
            from: config.gmailAppEmail,
            to: email,
            subject: 'Password Reset',
            html: `
                <p>Haz click<a href="http://127.0.0.1:8080/session/restore-account/password-reset/${jwt}" target="_blank"> aquí </a>para restablecer tu contraseña.</p>
            `
        })

        return res.render('sessions/restore-account', { message: 'Email enviado! Por favor, revisa el spam en tu correo' })

    } catch (error) {
        console.log(error);
        return res.render('sessions/restore-account', { message: 'Hubo un error, por favor intentalo de nuevo en unos momentos' })
    }
}

export const resetPasswordRender = async (req, res) => {
    const id = req.id;
    const user = await UserService.getOneByID(id);
    console.log(user);

    res.cookie('resetToken', id)
    res.render('sessions/password-reset');
}

export const resetPassword = async (req, res) => {
    const id = req.cookies['resetToken']

    const password = req.body?.data;
    if (!password) return res.send({ status: 'error', data: 'La contraseña no puede ser vacía' });

    // Handle errors - Render errors in password format
    const message = passwordFormatIsValid(password);
    if (Object.keys(message).length != 0) return res.send({ status: 'error', data: Object.values(message).join(' ') });

    // Check if password is the same
    const user = await UserService.getOneByID(id);
    const repitedPassword = isValidPassword(user, password);

    if (repitedPassword) return res.send({ status: 'error', data: 'La contraseña no puede ser la misma' });

    // Change new hashed password 
    const hashedPassword = createHash(password);
    user.password = hashedPassword
    console.log("New user: ", user);
    const result = await UserService.update(user._id, user);

    return res.send({ status: "success" })
}

