
import { Router } from 'express'
import { getPaginate, getOneByID, getRealTime } from '../DAO/controller/products.view.controller.js';

const router = Router()


// Real time products
router.get('/realTimeProducts', getRealTime)

// Listar products
router.get('/', getPaginate)

// Get por id
router.get('/:id', getOneByID)


export default router