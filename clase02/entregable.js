/*Realizar una clase 'ProductManager' que gestione un conjunto de productos.

Debe contar con: Title, Description, Price, Thumbnail (url), Code, Stock
Al agregar productos, chequear que el codigo no exista en la lista
getProducts ✓
addProduct ✓
getProductById ✓
*/

class ProductManager{
    constructor(){
        this.products = [];
    }
    //Get product list
    getProducts = () => this.products;

    getNextID = () => {
        const count = this.products.length;
        return count > 0 ? this.products[count-1].id + 1 : 1;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        //Check if code is already in the list
        if (this.products.some(prod => prod.code === code)){
            return console.log('This code already exists')
        }
            const id = this.getNextID()
            const product = {
                id,
                title,
                description,
                thumbnail,
                price,
                code,
                stock
            }
            this.products.push(product)
    }

    getProductById = (id) => {
        const product = this.products.find(prod => prod.id === id)
        return product ? product : 'Not found'
    }
}

const productManager = new ProductManager()

productManager.addProduct('Remera de boca','asdfaasdf',300,'https...',58,18)
productManager.addProduct('Gorra de boca','desc...',300,'https',59,21)
productManager.addProduct('Repetido','afsdf',300,'https',59,1)
productManager.addProduct('Short de boca','afsdf',300,'https',2,21)

console.log(productManager.getProducts());

console.log('Producto:', productManager.getProductById(8));
console.log('Producto:', productManager.getProductById(3));

