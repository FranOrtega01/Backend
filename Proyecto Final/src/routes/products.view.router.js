
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
    const limit = req.query?.limit || 2
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
    

    if(sort){
        if(sort === 'asc') options.sort = {'price': 1}
        if(sort === 'desc') options.sort = {'price': -1}
    }
    
    const data = await productModel.paginate(search, options)

    data.prevLink = data.hasPrevPage ? `/products?page=${data.prevPage}` : null
    data.nextLink = data.hasNextPage ? `/products?page=${data.nextPage}` : null

    const user = req.user
    
    res.render('home', {data, user})
})

// Get por id
router.get("/:id", async (req, res) => {
    const id = req.params.id

    try {
        const product = await productModel.findOne({_id: id})
        res.render('prodDetail', product)
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: 'Product not found'
        })
    }
})

export default router