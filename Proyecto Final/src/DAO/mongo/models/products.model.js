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
    stock: Number,
    owner:{
        rol:{
            type: String,
            default: 'admin'
        },
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection, productSchema)

export default productModel