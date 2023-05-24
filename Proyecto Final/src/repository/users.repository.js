import userDTO from '../DAO/DTO/users.dto.js'
import CustomError from '../errors/customError.js';
import EErros from '../errors/enumErrors.js';
import { generateUserErrorInfo } from '../errors/info.js';

export default class UserRepository{
    
    constructor(dao){
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get();
        } catch (error) {
            return console.log(error);
        }
    }

    create = async (data) => {
        try {
            const dataToInsert = new userDTO(data)
            return await this.dao.create(dataToInsert)
        } catch (error) {
            CustomError.createError({
                name: "User create error",
                cause: generateUserErrorInfo(),
                message: "Error trying to create new user",
                code: EErros.INVALID_TYPES_ERROR
            })
        }
    }

    getOneByID = async(id) => {
        try {
            return await this.dao.getOneByID(id)
        } catch (error) {
            return console.log('User not found');
        }
    }

    getOneByEmail = async(email) => {
        try {
            return await this.dao.getOneByEmail(email)
        } catch (error) {
            return console.log(error);
        }
    }

    update = async (id, user) => {
        try {
            const result = await this.dao.update(id, user);
            return result;
        } catch (error) {
            return console.log(error);
        }
    }

    deleteOne = async(id) => {
        try {
            return await this.dao.deleteOne(id)
        } catch (error) {
            return console.log(error)
        }
    }
}
