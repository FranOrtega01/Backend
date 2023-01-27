import userModel from "./models/user.model.js";
import mongoose from "mongoose";

const uri = 'mongodb+srv://FranOrtega:elsapopepe.CODERHOUSE@clustertester.b9tsw8l.mongodb.net/?retryWrites=true&w=majority'

const env = async() => {
    await mongoose.connect(uri, {
        dbName: 'clase17'
    })

    console.log('DB Connected');

    const response = await userModel.find({first_name: 'Celia'}).explain('executionStats')
    console.log(response);
}

env()

// Find() - 2ms
// Find('Celia) - 3ms
// Find('Celia) first_name index:true - 1ms