
import { Router } from 'express'
import productModel from '../dao/models/products.model.js';
import { getAll, getById } from '../controller/products.view.controller.js';

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
router.get('/', getAll)

// Get por id
router.get('/:id', getById)


export default router