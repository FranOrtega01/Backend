import { Router } from 'express';
import cartModel from '../dao/models/cart.model.js'

const router = Router()

// Get all carts
router.get('/', async (req, res) => {
    const carts = await cartModel.find().lean().exec()
    res.json({carts})
})

// Get cart by ID
router.get('/:id', async (req, res) => {
    const id = (req.params.id)
    try {
        const data = await cartModel.findOne({_id: id}).populate('products.id')
        console.log(data);
        res.render('cart', data)


    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: 'Cart not found'
        })
    }
})


export default router