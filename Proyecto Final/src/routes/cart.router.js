import { Router } from 'express';
import { get, create, getOneByID,addProduct, update, updateProduct, deleteCart, deleteOneProduct, clearCart } from '../controller/carts.controller.js'
import { authorization } from '../utils.js'


const router = Router()

// Get all carts [admin]
// router.get('/', authorization('admin'), get);
router.get('/', get);


// Get cart by id [user]
// router.get('/:cid', authorization('user'), getOneByID);
router.get('/:cid',  getOneByID);


// Create cart [user]
router.post('/', authorization(['user', 'premium']), create);

// Add product [user]
router.post('/:cid/products/:pid', authorization(['user', 'premium']), addProduct);

// Update cart [user]
router.put('/:cid', authorization(['user', 'premium']), update);

// Update product [user]
router.put('/:cid/products/:pid', authorization(['user', 'premium']), updateProduct);

// Delete cart [admin]
router.delete('/:cid', authorization('admin'), deleteCart)

// Clear cart [user]
router.delete('/:cid', authorization(['user', 'premium']), clearCart);

// Delete product from cart [user]
router.delete('/:cid/products/:pid', authorization(['user', 'premium']), deleteOneProduct)




export default router