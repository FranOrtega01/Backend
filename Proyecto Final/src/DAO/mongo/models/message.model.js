import mongoose from 'mongoose';

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: String,
    message: String,
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel