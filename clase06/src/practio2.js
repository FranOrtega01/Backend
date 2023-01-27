const express = require('express')

const app = express()

const users = [

    {id:'1' , nombre:'Gonzalo', apellido: 'Coradello', gender: 'M'},
    {id:'2' , nombre:'Maximo', apellido: 'Guti', gender: 'M'},
    {id:'3' , nombre:'Lucas', apellido: 'Rueda', gender: 'M'},
    {id:'4' , nombre:'Bianca', apellido: 'Baltieri', gender: 'F'},
    {id:'5' , nombre:'Eugenia', apellido: 'Insaurralde', gender: 'F'},
    {id:'6' , nombre:'Isabella', apellido: 'Besciani', gender: 'F'},
    {id:'7' , nombre:'Adriana', apellido: 'Thanner', gender: 'F'},
]

app.get('/', (req, res) => {
    let gender = req.query.gender

    // if(gender && (gender === 'M' || gender === 'F')){
    //     const userFiltered = users.filter(u => u.gender === gender)
    //     return res.send({users: userFiltered})
    // }

    // res.send({users})


    //Me permite poner el query en minuscula
    if(gender){
        gender = gender.toUpperCase()
        if(gender === 'M' || gender === 'F'){
            const userFiltered = users.filter(u => u.gender === gender)
            return res.send({users: userFiltered})
        }
    }
})

app.listen(8080, () => console.log('El server esta corriendo'))
