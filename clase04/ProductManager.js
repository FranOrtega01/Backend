/*Manejo de archivos: Realizar una clase 'ProductManager', la cual permitira trabajar con multiples prods.
Esta debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos

Debe incluir: una variable this.path
*/

const fs = require('fs')

class ProductManager{
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

    addProduct = async (title, desc, price, thumbnail, code, stock) => {
        const products = await this.read();
        const id = await this.getNextID(products);
        if(products.some(prod => prod.code === code)){
            return console.log('A product with this code already exists');
        }
        const obj = {
            id,
            title,
            desc,
            price,
            thumbnail,
            code,
            stock
        }
        
        products.push(obj)
        await this.write(products)
    }

    //Get product list
    getProducts = async () => {
        const content = await this.read()
        return content    
        }

    getProductByID = async (id) => {
        const products = await this.read()
        console.log(products);
        const productByID = await products.find(prod => prod.id === id)
        return productByID ?? 'Product not found';
    }
    updateProduct = async (id,obj) => {
        obj.id = id
        const list = await this.read()
        const idx = list.findIndex(prod => prod.id === id)
        if(idx === -1) return 'Product not found'

        list[idx] = {
            ...list[idx],
            ...obj
        }
        await this.write(list)

    }
    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const filter = products.filter(prod => prod.id !== id)
        fs.promises.writeFile(this.path, JSON.stringify(filter))

    }
}

module.exports = ProductManager