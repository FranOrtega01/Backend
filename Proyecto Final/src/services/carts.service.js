import cartModel from '../dao/models/cart.model.js';

export default class CartsService{
    constructor(){
    }

    getAll = async () => {
        return await cartModel.find().lean().exec()
    }

    getById = async (id) => {
        return await cartModel.findOne({_id: id}).populate('products.id')
    }
    create = async () => {
        return await cartModel.create({})
    }
    delete = async (id) => {
        return await cartModel.deleteOne({_id: id})
    } 
}