import { Router } from 'express'
import CartManager from '../cart_manager.js'

const cartManager = new CartManager('carts.json')

const router = Router()

router.get('/', async (req, res) => {
    const carts = await cartManager.get()
    res.json({carts})
})

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const cart = await cartManager.getByID(id)
    if(cart === -1) return res.status(404).send('Cart not found')
    res.json({ cart })
})

router.post('/', async (req, res) => {
    const newCart = await cartManager.create()
    res.json({status: 'success', newCart})
})

router.post('/:cid/products/:pid', async (req, res) => {
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)

    const cart = await cartManager.addProduct(cid, pid)
    if(cart === -1) return res.status(404).send('No such product with given ID')
    res.json({status: 'success', cart})
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const deletedProduct = await cartManager.delete(id)
    if(deletedProduct === -1) return res.status(404).send('Product not found')
    res.json({status: 'success', deletedProduct})
})

export default router