const express = require('express')


const app = express()

app.get('/saludo', (request, response) => {
    response.send('Saludos desde express')
})

//Obs: se pueden mandar etiquetas de html
app.get('/bienvenida', (request, response) => {
    response.send('<h1 style="color:blue">Hello world</h1> ')
})

//Obs: se le hace un stringify 
app.get('/usuario', (request, response) => { 
    response.send({name: 'Fran', apellido: 'Ortega', email:'Pepe@gmail.com'})
})

app.listen(8080, () => console.log('El server esta corriendo'))