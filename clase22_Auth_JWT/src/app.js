import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import sessionRouter from './routes/session.router.js'
import initializePassport from './config/passport.config.js'
import jwtRouter from './routes/jwt.router.js'

const app = express()
const MONGO_URL = 'mongodb://localhost:27017'
const MONGO_DB = 'clase21'

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(session({
    secret: 'CoderSecret',
    resave:true,
    saveUninitialized:true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use('/session', sessionRouter )
app.use('/jwt', jwtRouter )
app.get('/', (req, res) => res.send('home'))


mongoose.set('strictQuery')
mongoose.connect(MONGO_URL, {dbName: MONGO_DB}, err => {
    if(err){
        return console.log('Couldnt connect to DB');
    }

    console.log('DB Connected');
    app.listen(8080, () => console.log('Listening...'))
})

