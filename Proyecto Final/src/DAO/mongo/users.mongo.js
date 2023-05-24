import UserModel from './models/user.model.js'

export default class User{
    constructor(){}

    get = async() => {
        return await UserModel.find().lean().exec()
    }

    create = async(data) => {
        return await UserModel.create(data)
    }

    getOneByID = async(id) => {
        return await UserModel.findById({_id:id}).lean().exec();
    }

    getOneByEmail = async(email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }

    update = async(id, updUser)=>{
        console.log(updUser);
        const result = await UserModel.updateOne({_id: id}, {$set:updUser});
        console.log(result);
        return result;
    }

    deleteOne = async(id) => {
        return await UserModel.deleteOne({_id: id})
    }
}