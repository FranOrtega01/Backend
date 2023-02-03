import express from 'express';
import cookieParser from 'cookie-parser';
import __dirname from './utils.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(cookieParser('LucasRuedaIsMySecret'))


///////////////////

app.use(express.static(__dirname + '/public'))

// app.post('/set', (req, res) => {
    //     res.cookie(req.body.name, req.body.email).redirect('/index.html')
    // })
    
app.get('/get', (req,res) => {
    res.json(req.cookies)
})

////////////////////



app.get('/', (req, res) => res.send('Ok'))


app.get('/cookie/set', (req, res) => {
    res.cookie('CookieDeR2', 'Thanos siempre tuvo razon').send('Cookie seteada')
})

app.get('/cookie/get', (req, res) => {
    res.send( req.cookies )
})

app.get('/cookie/delete', (req, res) => {
    res.clearCookie('CookieDeR2').send('Cookie removed')
})

app.get('/cookie/setSigned', (req, res) => {
    res.cookie('CookieDeR2', 'Thanos siempre tuvo razon',{signed: true}).send('Cookie seteada')
})



app.listen(8080)