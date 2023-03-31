import TicketDTO from "../DAO/DTO/ticket.dto.js"
import { v4 as uuidv4 } from 'uuid';
import CustomError from '../errors/customError.js';
import EErros from '../errors/enumErrors.js';
import { generateTicketErrorInfo } from '../errors/info.js';

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async()=>{
        try {
            return await this.dao.get();
        } catch (error) {
            return console.log(error)
        }
    }

    getOneByID = async(id)=>{
        try {
            return await this.dao.getOneByID(id);
        } catch (error) {
            return console.log('Ticket not found');
        }
    }

    create = async (purchaser, amount)=>{
        try {
            const ticketToInsert = new TicketDTO({
                code: uuidv4(), 
                purchase_datetime: Date.now(),
                amount, 
                purchaser, 
            });
            return await this.dao.create(ticketToInsert);
        } catch (error) {
            CustomError.createError({
                name: "Ticket create error",
                cause: generateTicketErrorInfo(),
                message: "Error trying to create new ticket",
                code: EErros.INVALID_TYPES_ERROR
            })
        }
    }
}