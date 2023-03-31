import messageDTO from '../DAO/DTO/message.dto.js'

export default class MessageRepository{
    
    constructor(dao){
        this.dao = dao
    }

    get = async () => {
        return await this.dao.get()
    }

    crate = async (data) => {
        const messageToInsert = new messageDTO(data)
        return await this.dao.crate(messageToInsert)
    }
}