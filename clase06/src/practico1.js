const express = require('express')

const app = express()

const users = [

    {id:'1' , nombre:'Gonzalo', apellido: 'Coradello'},
    {id:'2' , nombre:'Maximo', apellido: 'Guti'},
    {id:'3' , nombre:'Lucas', apellido: 'Rueda'},
]

app.get('/', (req, res) => {
    res.send({users})
})
app.get('/:id', (req, res) => {
    const idUser = req.params.id
    const user = users.find(u => u.id === idUser)
    if(!user) res.send({error: 'User not found'})
    else res.send({user})
})


app.listen(8080, () => console.log('El server esta corriendo'))