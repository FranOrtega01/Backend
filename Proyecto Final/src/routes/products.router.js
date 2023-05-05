import { Router } from 'express'
import { get, getPaginate, create, getOneByID, update, deleteOne } from '../controller/products.controller.js';
import { authorization } from '../utils.js';

const router = Router()

// Listar products
router.get('/', getPaginate)

router.get('/getAll', get)

// Get por id
router.get("/:pid", getOneByID)

// Crear productos
// router.post('/', authorization('admin'), create)
router.post('/', create)


// Update por id
router.put("/:pid" ,update)

// Eliminar por id
router.delete('/:pid',  authorization('admin'),deleteOne)

export default router