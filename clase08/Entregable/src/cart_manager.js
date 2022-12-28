import fs from 'fs'

class CartManager{
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
    readProducts = async () => {
        if(fs.existsSync('products.json')){
            return fs.promises.readFile('products.json', 'utf-8').then(r => JSON.parse(r))
        }
        return []

    }
    write = async (content) => {
        return fs.promises.writeFile(this.path, JSON.stringify(content))
    }

    getNextID = (list) => {
        const count = list.length;
        return count > 0 ? list[count-1].id + 1 : 1;
    }

    //Create new empty cart
    create = async () => {
        const carts = await this.read();

        const id = await this.getNextID(carts);
        const newCart = {
            id,
            products: []
        }
        carts.push(newCart)
        await this.write(carts)

        return newCart
    }
    //Add products to a cart
    addProduct = async (cartID, productID) => {
        const cart = await this.getByID(cartID)
        const products = await this.readProducts()
        
        //Throw error if product with given ID doesnt exist
        if(!products.some(prod => prod.id === productID)) return -1

        const prodIdx = cart.products.findIndex(prod => prod.id === productID)

        if (prodIdx !== -1) cart.products[prodIdx].quantity++
        else{
            cart.products.push({
                id:productID,
                quantity:1
            })
        }

        await this.update(cartID, cart)
        return cart
    }

    //Get carts list
    get = async () => {
        const content = await this.read()
        return content    
    }
    //Get cart by ID
    getByID = async (id) => {
        const carts = await this.read()
        const cartByID = await carts.find(cart => cart.id === id)
        return cartByID ?? -1;
    }

    //Update a cart 
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

    //Delete a cart
    delete = async (id) => {
        const products = await this.read()
        const listLength = products.length
        const filter = products.filter(prod => prod.id !== id)
        if (listLength === filter.length) return -1
        fs.promises.writeFile(this.path, JSON.stringify(filter))

    }
}

export default CartManager