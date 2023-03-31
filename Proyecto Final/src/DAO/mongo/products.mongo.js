import productModel from './models/products.model.js'

export default class Product{
    constructor(){}

    get = async() => {
        return await productModel.find().lean().exec()
    }

    getPaginate = async (search, options) => {
        return await productModel.paginate(search, options)
    }

    create = async(data) => {
        return await productModel.create(data)
    }

    getOneByID = async(id) => {
        return await productModel.findById({_id: id}).lean().exec()
    }

    update = async(id, newProduct) => {
        const result = await productModel.updateOne({_id: id}, newProduct);
        return result;
    }

    deleteOne = async(id) => {
        return await productModel.deleteOne({_id: id})
    }
}