import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

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

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection, productSchema)

export default productModel