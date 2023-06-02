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
        const result = await UserModel.updateOne({_id: id}, {$set:updUser});
        return result;
    }

    deleteOne = async(id) => {
        return await UserModel.deleteOne({_id: id})
    }

    deleteMany = async(cond) => {
        console.log("Condition: ", cond);
        return await UserModel.deleteMany(cond)
    }

    addDoc = async (id, docName, path) =>{
        console.log('Entro al add');

        try {
            const user = await this.getOneByID(id)
            console.log(user);

            user.documents.push({name: docName, reference: path});
            await this.update(id, user)

        } catch (error) {
            console.log(error);
        }
    }

    updateDoc = async (id, index, docName, path) =>{
        console.log('Entro al update');
        try {
            
            const user = await this.getOneByID(id)
            console.log(user);
            user.documents[index] = {name: docName, reference: path};
            await this.update(id, user)
        } catch (error) {
            console.log(error);
        }
    }
}