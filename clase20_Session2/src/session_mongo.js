import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express()
const uri = 'mongodb+srv://FranOrtega:elsapopepe.CODERHOUSE@clustertester.b9tsw8l.mongodb.net/?retryWrites=true&w=majority'
app.use(session({
    store:MongoStore.create({
        mongoUrl: uri,
        dbName: 'sessions',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl:100  
    }),
    secret:'123456',
    resave: true,
    saveUninitialized: true
}))


function auth(req, res, next){
    if(req.session?.user) return next()
    return res.status(401).send("auth error")
}

app.get('/', (req, res) => res.send('ok'))

// Login
app.get('/login', (req, res) => {
    const { username } = req.query

    if (!username) return res.send('Need an username')

    req.session.user = username

    res.send('Login success')
})


// Logout
app.get('/logout', (req, res) => {

    req.session.destroy(err => res.send(err))

})


// Private
app.get('/private', auth, (req, res) => res.send('Private Page') )


app.listen(8080)
