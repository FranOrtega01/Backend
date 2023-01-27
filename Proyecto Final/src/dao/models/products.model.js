import mongoose from 'mongoose';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    status: Boolean,
    category: String,
    code: {
        type:String,
        unique: true
    },
    thumbnails: Array,
    stock: Number
})

const productModel = mongoose.model(productsCollection, productSchema)

export default productModel