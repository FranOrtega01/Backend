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
        const cart = await cartModel.findOne({_id: id})
        res.json({cart})
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: 'Cart not found'
        })
    }
})

// Create new cart
router.post('/', async (req,res) => {
    const newCart = await cartModel.create({})
    res.json({status:'Success', newCart})
})

// Add products to cart
router.post("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid
    const quantity = req.body.quantity || 1
    const cart = await cartModel.findById(cartID)

    let found = false

    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].id == productID) {

            // Si se aclara cantidad, se suma, sino se suma 1 por defecto
            quantity === 1 ? cart.products[i].quantity++ : cart.products[i].quantity += quantity
            found = true
            break
        }
    }
    if (!found) {
        cart.products.push({ id: productID, quantity})
    }

    await cart.save()

    res.json({status: "Success", cart})
})

// Delete cart by ID
router.delete('/:id', async (req,res) => {
    const id = req.params.id
    const deleted = await cartModel.deleteOne({_id: id})
    
    res.json({
        status: "Success",
        massage: "Cart deleted",
        deleted
    })
})

export default router