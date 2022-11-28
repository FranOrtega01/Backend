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

    getNextID = async () => {
        const products = await this.getProducts()
        const count = products.length;
        return count > 0 ? products[count-1].id + 1 : 1;
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const id = await this.getNextID()
        return this.getProducts()
        .then(products => {
            if (products.some(prod => prod.code === code)){
                return 
            }
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
            .catch(() => console.log('A product with this code already exists'))
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
        return productByID ?? 'Product not found';
    }
    updateProduct = async (id, field, newValue) => {
        const products = await this.getProducts()
        const update = products.find(prod => prod.id === id)
        if(update === undefined) return console.log('Product not found')
        if(update[field] === undefined) return console.log('Field not found')

        update[field] = newValue
        fs.writeFileSync(this.path, JSON.stringify(products))

    }
    deleteProduct = async (id) => {
        const products = await this.getProducts()
        const filter = products.filter(prod => prod.id !== id)
        fs.promises.writeFile(this.path, JSON.stringify(filter))

    }
}

async function run(){
    const manager = new ProductManager('products.json');
    // await manager.addProduct('Zapas', 'descr', 14, 'https://', 32, 64)
    // await manager.addProduct('Guti', 'descr', 213, 'https://', 16, 64)
    // await manager.addProduct('Remeras', 'descr', 32, 'https://', 64, 64)
    // console.log(await manager.getProductByID(2))
    // await manager.deleteProduct(2)
    // await manager.updateProduct(2, 'title', 'Remeras')
    // console.log(await manager.getProducts());

}
run()