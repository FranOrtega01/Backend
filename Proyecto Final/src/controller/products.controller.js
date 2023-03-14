import ProductsService from "../services/products.service.js";

const productService = new ProductsService()

export const getAll = async (req, res) => {
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    const sort = req.query.sort
    

    const options = {
        limit,
        page,
        lean:true,
    }

    const search = {}

    if(filter)  search.title = filter
    

    if(sort){
        if(sort === 'asc') options.sort = {'price': 1}
        if(sort === 'desc') options.sort = {'price': -1}
    }


    try {

        const data = await productService.paginate(search, options)
    
        data.prevLink = data.hasPrevPage ? `/api/products?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/api/products?page=${data.nextPage}` : null
    
    
        res.json({
            status: 'success',
            payload: data.docs,
            totalDocs: data.totalDocs,
            limit: data.limit,
            totalPages: data.totalPages,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: data.prevLink,
            nextLink:data.nextLink
        })

    } catch (error) {
        res.send({status: 'error', error})
    }
}
export const getById = async( req, res) => {
    const id = req.params.id

    try {
        const product = await productService.getById(id)
        res.json({product})
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: 'Product not found'
        })
    }
}
export const create = async( req, res ) => {
    try {
        const product = req.body
        const newProduct = await productService.create(product)
        req.io.emit('updatedProducts', await productService.getAll())

        res.json({
            status: "Success",
            newProduct
        })

    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}
export const updateOne = async(req, res) => {
    const id = req.params.id
    const productToUpdate = req.body

    try {
        await productService.update(id, productToUpdate)
    
        //Update realTime
        req.io.emit('updatedProducts', await productService.getAll())
        res.json({
            status: "Success",
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
}
export const deleteOne = async (req, res) => {
    const id = req.params.id

    const deleted = await productService.delete(id)
    
    //Update realTime
    req.io.emit('updatedProducts', await productService.getAll())

    res.json({
        status: "Success",
        massage: "Product deleted",
        deleted
    })
}