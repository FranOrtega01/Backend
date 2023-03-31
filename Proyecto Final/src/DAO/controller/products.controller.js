import { ProductService } from '../../repository/index.js'


export const get = async (req, res) => {
    try {
        const products = await ProductService.get()
        res.json({payload: products})
    } catch (error) {
        res.json(error)
    }
}
export const getPaginate = async (req, res) => {
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

        const data = await ProductService.getPaginate(search, options)
    
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
export const create = async( req, res ) => {
    try {
        const product = req.body
        const newProduct = await ProductService.create(product)
        req.io.emit('updatedProducts', await ProductService.get())

        res.json({
            status: "success",
            newProduct
        })

    } catch (error) {
        res.json({
            error
        })
    }
}
export const getOneByID = async( req, res) => {
    const { pid } = req.params

    try {
        const product = await ProductService.getOneByID(pid)
        res.json({product})
    } catch (error) {
        console.log(error);
        res.json({
            status: "error",
            message: 'Product not found'
        })
    }
}
export const update = async(req, res) => {
    const { pid } = req.params
    const productToUpdate = req.body

    try {
        const update = await ProductService.update(pid, productToUpdate)
    
        //Update realTime
        req.io.emit('updatedProducts', await ProductService.get())
        res.json({
            status: "success",
            update
        })
        
    } catch (error) {
        res.json({
            error
        })
    }
}
export const deleteOne = async (req, res) => {
    const { pid } = req.params

    const deleted = await ProductService.deleteOne(pid)
    
    //Update realTime
    req.io.emit('updatedProducts', await ProductService.get())

    res.json({
        status: "success",
        deleted
    })
}