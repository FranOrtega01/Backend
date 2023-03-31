import FileManager from "./fileManager.js";

export default class User{

    constructor(){
        this.fileManager = new FileManager('db_file/users.json')
    }

    get = async() => {
        return await this.fileManager.get()
    }

    getOneByID = async(id) => {
        return await this.fileManager.getOneByParam('id', id)
    }

    getOneByEmail = async(email) => {
        return await this.fileManager.getOneByParam('email', email)
    }
    
    create = async(data) => {
        return await this.fileManager.create(data)
    }

    update = async(id, obj) => {
        return await this.fileManager.update(id, obj)
    }

    delete = async(id) => {
        return await this.fileManager.delete(id)
    }
}