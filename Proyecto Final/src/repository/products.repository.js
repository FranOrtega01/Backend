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
        console.log("DATA POSTMAN: ", data);
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

    // Update product by owner
    update = async (id, productToUpdate, user) => {
        try {
            //
            if(productToUpdate.owner.rol == owner.rol || user.rol == 'admin'){
                if(productToUpdate.owner.id != user._id) return;

                const prodToUpdate = new ProductDTO(productToUpdate);
                return await this.dao.update(id, prodToUpdate);  
            }
        } catch (error) {
            throw new Error('Product not found or unauthorized');
        }
    }


    deleteOne = async(pid, user) => {
        try {
            const prod = await this.getOneByID(pid);
            // If owners rol == prod.owner.rol (Premium) or admin
            if(prod.owner.rol == user.rol || user.rol == 'admin'){
                //If owners id != prod.owners id
                if(prod.owner.id != user._id) return;
                return await this.dao.delete(pid);
            }
        } catch (error) {
            throw new Error('An error ocurred deleting a product');
        }
    }
}