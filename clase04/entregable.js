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
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        return this.getProducts()
        .then(products => {
            const id = this.getNextID()
            products.push({
                    id: id,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                })
                return products
            })
            .then(
                products => fs.promises.writeFile(this.path, JSON.stringify(products))
            )
    }

    getNextID = async () => {
        const products = await this.getProducts()
        const count = products.length;
        console.log('COUNT:',count);
        return count > 0 ? products[count-1].id + 1 : 1;
        // return count
    }

    //Get product list
    getProducts = async () => {
        return fs.promises.readFile(this.path, this.format)
            .then(products => JSON.parse(products))
            .catch(e => {
                if(e) return []
            })        
        }

    getProductByID = async (id) => {
        const products = await this.getProducts()
        const productByID = await products.find(prod => prod.id === id)
        return productByID ?? console.log('Product not found');
    }
}

async function run(){
    const manager = new ProductManager('products.json');
    await manager.addProduct('Zapas', 'descr', 14, 'https://', 64, 64)
    console.log(await manager.getProducts());
}
run()