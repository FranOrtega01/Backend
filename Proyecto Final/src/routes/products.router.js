
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
router.get('/', async (req,res) => {
    const products = await productModel.find().lean().exec()
    const limit = req.query.limit

    //Si existe limit, limitar los productos al numero dado

    if (limit) products.splice(limit, products.length)

    res.json({products})
    // res.render('home', { products })
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