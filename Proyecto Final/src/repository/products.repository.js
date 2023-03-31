import ProductDTO from '../DAO/DTO/products.dto.js'
import EErros from '../errors/enumErrors.js'
import { generateProductErrorInfo } from '../errors/info.js'
import CustomError from '../errors/customError.js'

export default class ProductRepository{
    constructor(dao){
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get()
        } catch (error) {
            return console.log(error);
        }
    }

    getPaginate = async (search, options) => {
        return await this.dao.getPaginate(search, options)
    }

    create = async (data) => {
        try {
            const dataToInsert = new ProductDTO(data)
            return await this.dao.create(dataToInsert)
        } catch (error) {
            CustomError.createError({
                name: "Product create error",
                cause: generateProductErrorInfo(),
                message: "Error trying to create new product",
                code: EErros.INVALID_TYPES_ERROR
            })
        }
    }

    getOneByID = async (id) => {
        try {
            return await this.dao.getOneByID(id)
        } catch (error) {
            throw new Error('Product not found');
        }
    }

    update = async (id, productToUpdate) => {
        try {
            const prodToUpdate = new ProductDTO(productToUpdate);
            const result = await this.dao.update(id, prodToUpdate);
            return result;
        } catch (error) {
            throw new Error('Product not found');
        }
    }

    deleteOne = async ( pid ) => {
        return await this.dao.deleteOne(pid)
    }
}