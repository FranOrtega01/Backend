import { Router } from 'express';
import { authorization } from '../utils.js';
import {upgrade, deleteLastConnecition} from '../controller/users.controller.js'
import { upload } from '../config/multer.js';

const router = Router()

router.put('/premium/:uid', authorization(['user', 'premium', 'admin']), upgrade)

router.delete('/delete', authorization(['admin']), deleteLastConnecition)

router.post('/:uid/documents', upload, (req, res) =>{
    if(!req.file) return res.status(400).send({status: 'error', error: 'Something went wrong'})
    res.json({status: 'success', payload: 'File uploaded'});
});


export default router