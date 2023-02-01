
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

    if(filter){
        search.title = filter
    }
    
    const data = await productModel.paginate(search, options)


    res.render('home', data)
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

export default router