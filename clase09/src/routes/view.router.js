import express from 'express';

const router = express.Router();

const users = [
    {
        name: 'Fran',
        lastname: 'Ortega',
        age: 21,
        email: 'asdfa@gmail.com',
        cellphone: '1190909',
        role: 'admin'
    },
    {
        name: 'Guti',
        lastname: 'Rodriguez',
        age: 28,
        email: 'asdfa@gmail.com',
        cellphone: '11234209',
        role: 'user'
    },
    {
        name: 'Kpo',
        lastname: 'Maslaton',
        age: 11,
        email: 'asdfa@gmail.com',
        cellphone: '11341346',
        role: 'admin'
    },
    {
        name: 'Suriburu',
        lastname: 'Buru',
        age: 23,
        email: 'asdfa@gmail.com',
        cellphone: '11346349',
        role: 'user'
    },
    {
        name: 'Uga',
        lastname: 'Buga',
        age: 223,
        email: 'asdfa@gmail.com',
        cellphone: '16436',
        role: 'admin'
    },
];

const foods = [
    {name: 'Banana', price: 15},
    {name: 'Manzana', price: 10},
    {name: 'Pera', price: 12},
    {name: 'Kiwi', price: 23},
    {name: 'Anana', price: 20},
];
router.get('/', (req, res) => {
    const user = users[Math.floor(Math.random() * 5)]; 
    // res.render('index', user)

    res.render('index', {
        user,
        style: 'index.css',
        isAdmin: user.role === 'admin',
        foods
    });

});

export default router