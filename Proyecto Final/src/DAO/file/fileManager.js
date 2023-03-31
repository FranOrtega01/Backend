import fs from 'fs'

class FileManager{
    constructor(path){
        this.path = path
        this.format = 'utf-8'
    }

    read = async () => {
        if(fs.existsSync(this.path)){
            return fs.promises.readFile(this.path, this.format).then(r => JSON.parse(r))
        }
        return []
        
    }

    write = async (content) => {
        return fs.promises.writeFile(this.path, JSON.stringify(content))
    }

    getNextID = async list => {
        const count = list.length;
        return count > 0 ? list[count-1].id + 1 : 1;
    }

    get = async () => {
        return await this.read()
    }

    getOneByParam = async(param, value) => {
        const data = await this.read();
        const obj = data.find(d => d[param] == value)
        return obj
    }

    create = async(obj) => {
        const list = await this.read();
        obj.id = this.getNextID()
        list.push(obj)

        await this.write(list)
    }

    update = async (id, obj) => {
        obj.id = id
        const list = await this.read()
        
        for (let i = 0; i < list.length; i++) {
            if(list[i].id == id){
                list[i] = obj;
                break
            }
        }

        await this.write(list)
        return obj
    }

    delete = async (id) => {
        const products = await this.read()
        const listLength = products.length
        const filter = products.filter(prod => prod.id !== id)
        if (listLength === filter.length) return -1

        await this.write(filter)

        return true
    }
}

export default FileManager