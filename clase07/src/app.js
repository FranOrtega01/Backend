import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); //Recibir 'Bien los json

let users = [];

app.get('/', (req, res) => res.send('OK'));
app.get('/api/user', (req, res) => res.json(users));

app.post('/api/user', (req, res) => {
    const user = req.body;

    users.push(user);
    res.send({status: 'success', message: 'User created!'});
})

app.put('/api/user/', (req, res) => {
    const user = req.body;
    const idxUser = users.findIndex(u => u.name.toLowerCase() === user.name.toLowerCase());
    
    if(idxUser === -1 ) return res.status(404).json({status:'Error', message:'User not found'});
    users[idxUser] = user;
    res.send({status: 'success', message:'User updated!'});
})

app.delete('/api/user/:name', (req, res) => {
    const name = req.params.name
    const currentLength = users.length
    users = users.filter(u => u.name.toLowerCase() !== name.toLowerCase())

    if (users.length === currentLength) return res.status(404).json({status:'Error', message:'User not found'});

    res.send({status:'succes', message:'User deleted!'})
})

app.listen(8080);