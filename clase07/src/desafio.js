import express from 'express';

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let frase = 'Los estudiantes de la clase 32210 son super cool!'

app.get('/frase', (req, res) => res.json({frase}))

app.get('/api/palabras/:pos', (req, res) => {
    const pos = req.params.pos
    const palabras = frase.split(' ')
    res.json({
        buscada: palabras[pos - 1],
        posicion: pos
    })
})

app.post('/api/palabras', (req,res) => {
    const palabra = req.body.palabra;
    const pos = frase.split(' ').length;
    frase = frase + ' ' + palabra;

    res.json({
        agregada: palabra,
        pos
    })
})

app.listen(8080);