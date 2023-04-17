import express from 'express'

const app = express()

app.get('/', (req, res) => res.send(`<h1> [Fran] My Service </h1>`) )

app.listen(8080, () => console.log('Listening...'))