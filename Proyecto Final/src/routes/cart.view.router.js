import { Router } from 'express';
import { authorization } from '../utils.js'
import { get, getOneByID, purchase } from '../controller/carts.view.controller.js'


const router = Router()

// Get all carts
router.get('/', get)

// Get cart by ID
router.get('/:cid', getOneByID)

// Ticket
// Generate purchase ticket [user]
router.post('/:cid/purchase',authorization('user'), purchase);

export default router