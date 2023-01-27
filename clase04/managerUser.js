const fs = require('fs')

class ManagerUser {

    constructor(filename){
        this.filename = filename
        this.format = 'utf-8'

    }

    createUser = async (name, lastname, age, course) =>{
        return this.getUser()
            .then(users => {
                users.push({
                    name,
                    lastname,
                    age,
                    course
                })
                return users
            })
            .then(
                usersNew => fs.promises.writeFile(this.filename, JSON.stringify(usersNew))
            )
    }

    getUser = async () => {
        return fs.promises.readFile(this.filename, this.format)
            .then(content => JSON.parse(content))
            .catch(e => {
                console.log('ERROR:', e);
                return []
            })        
        }

}

async function run(){
    const manager = new ManagerUser('users.json');
    await manager.createUser('Fran', 'Ortega', 21, 'JS Backend')
    console.log(await manager.getUser());
}
run()