/*
import { Router } from 'express'
import FileManager from '../product_manager.js'

const fileManager = new FileManager('products.json')
const router = Router()

//Get products + limit
// router.get('/', async (req, res) => {
//     const products = await fileManager.get()
//     const limit = req.query.limit
//     //Si existe limit, limitar los productos al numero dado
//     if (limit) products.splice(limit, products.length)
//     res.json({products})
// })

//Entrega mostrar los productos disponibles/////////////
// api/products ahora es una view que muestra los productos
router.get('/', async (req, res) => {
    const products = await fileManager.get()
    const limit = req.query.limit
    //Si existe limit, limitar los productos al numero dado
    if (limit) products.splice(limit, products.length)
    res.render('home',{
        title: 'Products',
        products
    })
})

router.get('/realTimeProducts', async (req, res) => {
    const products = await fileManager.get()
    res.render('realTimeProducts',{
        title: 'Real Time Products',
        products
    })
})
////////////////////////////////////////////////////////

//Get product by ID params
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const product = await fileManager.getByID(id)
    if(product === -1) return res.status(404).send('Product not found')
    res.json({product})
})
//Post products
router.post('/', async (req, res) => {
    const product = req.body
    const addedProduct = await fileManager.add(product)
    if(addedProduct === -1) return res.status(400).send('A product with this code already exists')
    if(addedProduct === -2) return res.status(400).send('Invalid or missing fields')
    res.json({status: 'success', addedProduct})
    const products = await fileManager.get()
    req.io.emit('updatedProducts', products);
})

//Update product by ID
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const product = req.body
    const updatedProduct = await fileManager.update(id, product)
    if(updatedProduct === -1) return res.status(404).send('Product not found')

    res.json({status: 'success', updatedProduct})
    const products = await fileManager.get()
    req.io.emit('updatedProducts', products);
})

//Delete product by ID
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = await fileManager.delete(id)
    if(deletedProduct === -1) return res.status(404).send('Product not found')
    res.json({status: 'success', deletedProduct})
    const products = await fileManager.get()
    req.io.emit('updatedProducts', products);
})

export default router
*/

import { Router } from 'express'
import productModel from '../dao/models/products.model.js'

const router = Router()


// Real time products
router.get('/realTimeProducts', async (req, res) => {
    const products = await productModel.find().lean().exec()
    res.render('realTimeProducts',{
        title: 'Real Time Products',
        products
    })
})

// Listar products
router.get('/', async (req,res) => {
    const products = await productModel.find().lean().exec()
    const limit = req.query.limit

    //Si existe limit, limitar los productos al numero dado

    if (limit) products.splice(limit, products.length)
    res.json({products})
    res.render('home', { products })
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