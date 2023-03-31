import messageModel from './models/message.model.js'

export default class Message{
    constructor(){}

    get = async() => {
        return await messageModel.find().lean().exec()
    }


    create = async(data) => {
        return await messageModel.create(data)
    }
}