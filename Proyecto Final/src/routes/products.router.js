
import { Router } from 'express'
import productModel from '../dao/models/products.model.js'

const router = Router()


// // Real time products
// router.get('/realTimeProducts', async (req, res) => {
//     const products = await productModel.find().lean().exec()
//     res.render('realTimeProducts',{
//         title: 'Real Time Products',
//         products
//     })
// })

// Listar products
// router.get('/', async (req,res) => {
//     const products = await productModel.paginate(search, options)

//     res.json({products})
//     // res.render('home', { products })
// })


// Listar products
router.get('/', async (req,res) => {
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

        const data = await productModel.paginate(search, options)
    
        data.prevLink = data.hasPrevPage ? `/api/products?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/api/products?page=${data.nextPage}` : null
    
        // console.log(JSON.stringify(data, null, "\t"));
    
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
})

// Get por id
router.get("/:id", async (req, res) => {
    const id = req.params.id

    try {
        const product = await productModel.findOne({_id: id})
        res.json({product})
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: 'Product not found'
        })
    }
})

// Crear productos
router.post('/', async (req, res) => {
    try {
        const product = req.body
        const newProduct = await productModel.create(product)
        req.io.emit('updatedProducts', await productModel.find().lean().exec());

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
})

// Update por id
router.put("/:id", async (req, res) => {
    const id = req.params.id
    const productToUpdate = req.body
    // await productModel.updateOne({_id: id}, productToUpdate)
    await productModel.updateOne({code: id}, productToUpdate)

    //Update realTime
    req.io.emit('updatedProducts', await productModel.find().lean().exec());
    res.json({
        status: "Success",
    })
})


// Eliminar por id
router.delete('/:id', async (req,res) => {
    const id = req.params.id
    // const deleted = await productModel.deleteOne({_id: id})
    const deleted = await productModel.deleteOne({code: id})
    
    //Update realTime
    req.io.emit('updatedProducts', await productModel.find().lean().exec())

    res.json({
        status: "Success",
        massage: "Product deleted",
        deleted
    })
})

export default router