import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: {
        type: Date,
        default: Date.now()
    },
    amount: Number,
    purchaser: String
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;