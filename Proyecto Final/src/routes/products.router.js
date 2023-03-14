
import { Router } from 'express'
import { getAll, getById, create, updateOne, deleteOne } from '../controller/products.controller.js';

const router = Router()

// Listar products

router.get('/', getAll)

// Get por id
router.get("/:id", getById)

// Crear productos
router.post('/', create)

// Update por id
router.put("/:id", updateOne)

// Eliminar por id
router.delete('/:id', deleteOne)

export default router