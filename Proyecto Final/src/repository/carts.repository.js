import cartDTO from '../DAO/DTO/carts.dto.js'

export default class cartRepository{
    
    constructor(dao){
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get()
        } catch (error) {
            throw new Error(error)
        }
    }

    create = async () => {
        try {
            return await this.dao.create()
        } catch (error) {
            throw new Error(error)

        }
    }

    getOneByID = async (id) => {
        try {
            return await this.dao.getOneByID(id)
        } catch (error) {
            throw new Error('Cart not found')

        }
    }

    addProduct = async (cid, pid, qty) => {
        try {
            
            const result = await this.dao.addProduct(cid,pid, qty);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }

    update = async (id, products)=>{
        try {
            const result = await this.dao.update(id, products);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }

    updateProduct = (id, pid, qty)=>{
        try {
            return this.dao.updateProduct(id, pid, qty);
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteCart = async (id) =>{
        try {
            return await this.dao.deleteCart(id);
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteOneProduct  = async (id, pid) =>{
        try {
            return await this.dao.deleteOneProduct(id,pid);
        } catch (error) {
            throw new Error(error)
        }
    }

    clearCart = async (id)=>{
        try {
            return await this.dao.clearCart(id);
        } catch (error) {
            throw new Error(error)
        }
    }

    purchase = async (cid)=>{
        try {
            const purchase = await this.dao.purchase(cid);
            console.log('Purchase: ', purchase);
            return purchase
            
        } catch (error) {
            console.log('Error to purchase service: ' + error);
        }
    }
}