import mongoose from "mongoose";
import UserModel from "../src/models/users.model.js";

const env = async () => {

    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017', {dbName: 'Pizzeria'})
    console.log('DB Connected');

    const users = await UserModel.paginate({gender: 'Female'}, {limit:5, page:1})
    console.log(users);

    process.exit()

}

env()