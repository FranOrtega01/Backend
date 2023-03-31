export default class TicketDTO{
    constructor(ticket){
        this.code = ticket.code;
        this.pruchase_datetime = ticket.pruchase_datetime;
        this.purchaser = ticket.purchaser;
        this.amount = ticket.amount;
    }
}