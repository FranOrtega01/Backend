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

    getNextID = async (list) => {
        const count = list.length;
        return count > 0 ? list[count-1].id + 1 : 1;
    }

    add = async (obj) => {
        //ERRORS: -1 duplicated code, -2 missing or invalid field
        const products = await this.read();
        const id = await this.getNextID(products);
        if(products.some(prod => prod.code === obj.code)){
            return -1;
        }
        if (!obj.status) obj.status = true 
        if (!obj.title) return -2
        if (!obj.description) return -2
        if (!obj.code) return -2
        if (!obj.price) return -2
        if (!obj.stock) return -2
        if (!obj.category) return -2
        
        obj.id = id
        products.push(obj)
        await this.write(products)
    }

    //Get product list
    get = async () => {
        const content = await this.read()
        return content    
        }

    getByID = async (id) => {
        const products = await this.read()
        const prodByID = await products.find(cart => cart.id === id)
        return prodByID ?? -1;
    }

    update = async (id,obj) => {
        obj.id = id
        const list = await this.read()
        const idx = list.findIndex(prod => prod.id === id)
        if(idx === -1) return -1

        list[idx] = {
            ...list[idx],
            ...obj
        }
        await this.write(list)

    }
    delete = async (id) => {
        const products = await this.read()
        const listLength = products.length
        const filter = products.filter(prod => prod.id !== id)
        if (listLength === filter.length) return -1
        fs.promises.writeFile(this.path, JSON.stringify(filter))

    }
}

export default FileManager