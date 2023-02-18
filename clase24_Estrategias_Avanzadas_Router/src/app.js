import express from 'express';

const app = express()

const words = []
app.param('word', async(req, res, next, word) => {
    const searchWord = words.find(u => u === word)
    if(!searchWord) req.word = null
    else req.word = searchWord

    next()
})

//Fuerza el parametro a ser solo letras, %C3%B3 seria la ó
app.get('/api/dictionary/:word', async (req, res) => {
    const word = req.params.word
    res.send(`Significado de la palabra "${word}"`)
})

app.post('/api/dictionary/:word', async (req, res) => {
    const word = req.params.word
    res.send(`Significado de la palabra "${word}"`)
})

app.get('*', (req, res) => {
    res.status(404).send('No se puede manejar la palabra')
})

app.listen(8080)