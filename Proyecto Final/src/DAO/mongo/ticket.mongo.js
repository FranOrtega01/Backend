import ticketModel from "./models/ticket.model.js";

export default class Ticket {
    constructor(){}

    get = async()=>{
        try {
            const tickets = await ticketModel.find().lean().exec();
            return tickets;
        } catch (error) {
            throw new Error(error)
        }
    }
    getOneByID = async(id) =>{
        try {
            const ticket = await ticketModel.findById({_id: id}).lean().exec()
            return ticket;
        } catch (error) {
            throw new Error('Ticket not found')
        }
    }

    create = async(ticket)=>{
        try {
            const result = await ticketModel.create(ticket);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }
}
