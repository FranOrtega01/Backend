import { Router } from "express";
import passport from "passport";

const router = Router()

router.get('/', async (req, res) => {
    res.render('index')
})

router.get('/login', async (req, res) => {
    res.render('login')
})


router.get('/github', 
    passport.authenticate('github', {scope:['user:email']}),
    async(req, res) => {}
)

router.get('/githubCallback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    async(req, res) => {
        console.log('Callback', req.user);

        req.session.user = req.user

        console.log('User Session:', req.session.user);

        res.redirect('/')
    }
    
)

export default router