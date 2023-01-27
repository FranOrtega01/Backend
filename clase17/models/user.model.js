import mongoose from "mongoose";

export default mongoose.model('users', mongoose.Schema({
    first_name: {
        type: String,
        index: true   // Indexacion
    },
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    gender: String
}))