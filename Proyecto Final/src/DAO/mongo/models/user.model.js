import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol:{
        type: String,
        default: 'user'
    },
    cart: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "carts"
        }
    },
    documents:{
        type:[
            {
                name:String,
                reference: String,
            }
        ],
        default: []
    },
    last_connection: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel