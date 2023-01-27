const express = require('express')


const app = express()


app.get('/saludo/:name', (req, res) => {
    const name = req.params.name
    
    res.send(`Saludos ${name} desde express`)
})


app.get('/saludo/:name/:lastname', (req, res) => {
    const name = req.params.name
    const lastname = req.params.lastname

    res.send(`Saludos ${name} ${lastname} desde express`)
})

app.listen(8080, () => console.log('El server esta corriendo'))