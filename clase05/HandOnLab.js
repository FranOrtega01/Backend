//Practida de modulos nativos: fs + crypto

const crypto = require('crypto')
const DB = []
class userManager{

    getUsers = () => {
        return DB 
    }

    insertUser = (user) => {
        user.salt = crypto.randomBytes(128).toString('base64')
        user.password = crypto.createHmac('sha256', user.salt).update(user.password).digest('hex')
        DB.push(user)    
    }

    validateUser = (username, password) => {
        const user = DB.find(u => u.username == username)
        if(!user) {
            console.log('User not found');
            return
        }
        const newHash = crypto.createHmac('sha256', user.salt).update(password).digest('hex')
        if (newHash === user.password){
            console.log('Logged!');
        }else{
            console.log('Invalid password!');
        }
    }
}

const m = new userManager()
m.insertUser({
    name: 'Joni',
    lastname: 'Pintos',
    username: 'JPintos',
    password: '123456'
})

console.log(m.getUsers());

m.validateUser('JPintos', '123456')