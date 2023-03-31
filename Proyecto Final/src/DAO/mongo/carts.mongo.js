import cartModel from './models/cart.model.js'
import ProductMongo from '../mongo/products.mongo.js'

const productMongo = new ProductMongo()

export default class Cart{
    constructor(){}

    get = async() => {
        return await cartModel.find().populate('products.id').lean().exec()
    }

    create = async() => {
        return await cartModel.create({})
    }

    getOneByID = async(id) => {
        return await cartModel.findById({_id: id}).populate('products.id').lean().exec()
    }

    addProduct = async (cid, pid, quantity) => {
        const cart = await cartModel.findById(cid);
        const idx = cart.products.findIndex(prod => prod.id == pid);
        if (idx != -1) {
            cart.products[idx].quantity += quantity;
        } else {
            cart.products.push({ id: pid, quantity })
        }
        return await cart.save();
    }

    update = async (id, newProducts) => {
        const cart = await cartModel.findById(id);
        cart.products = newProducts;
        return await cart.save();
    }

    updateProduct = async (id, pid, quantity) => {
        const cart = await cartModel.findById(id);
        const idx = cart.products.findIndex(prod => prod.id == pid);
        if (idx != -1) {
            cart.products[idx].quantity = quantity;
        } else {
            return { status: 'error', error:'Product not found' }
        }
        return await cart.save();
    }

    deleteCart = async (id) => {
        const result = await cartModel.deleteOne({_id: id});
        return result;
    }

    deleteOneProduct = async (id, pid) => {
        const cart = await cartModel.findById(id);
        const idx = cart.products.findIndex(p => p.id == pid);
        if (idx < 0) return { status: 'error', error: 'Product not found' };
        if (idx == 0 && cart.products.length == 1) {
            cart.products = [];
        } else {
            cart.products = cart.products.slice(idx, 1);
        }
        return await cart.save();
    }

    clearCart = async (id) => {
        const cart = await cartModel.findById(id);
        cart.products = [];
        return await cart.save();
    }

    purchase = async (cid) => {
        try {
            const cart = await this.getOneByID(cid);

            let totalPrice = 0;
            const noStock = [];
            const comparation = cart.products;

            comparation.forEach(async product => {
                // Si el stock es mayor a la cantidad comprada
                console.log(product.id.stock);
                console.log(product.quantity);
                // Stock = Stock - cantidad comprada
                if (product.id.stock >= product.quantity) {

                    product.id.stock -= product.quantity;
                    // Price = precio * canitidad 
                    totalPrice += product.id.price * product.quantity;
                    
                    // Update los productos del mongo con la nueva cantidad
                    await productMongo.update(product.id._id, product.id);
                   
                //Sino agregarlo a noStock
                } else {
                    noStock.push(product.id);
                }
            });

            const purchase = {
                noStock,
                totalPrice
            }
            return purchase;
        } catch (error) {
            console.log('Cart not found');
        }
    }
    
}