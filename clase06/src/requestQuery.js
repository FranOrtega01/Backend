const express = require('express')


const app = express()


//QUERY: /?clave=valor

app.get('/saludo', (req, res) => {
    console.log(req.query);
    res.send(`Saludos desde express`)
})


app.listen(8080, () => console.log('El server esta corriendo'))