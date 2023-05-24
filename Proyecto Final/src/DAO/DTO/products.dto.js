export default class ProductDTO{

    constructor(product){
        this.id = product.id || product._id || null
        this.title = product.title || ''
        this.description = product.description || ''
        this.price = product.price || 0
        this.status = product.status || true
        this.category = product.category || ''
        this.code = product.code || 0
        this.thumbnails = product.thumbnails || []
        this.stock = product.stock || 0,
        this.owner = product.owner;
    }
}