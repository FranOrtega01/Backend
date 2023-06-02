import { Router } from 'express';
import { authorization } from '../utils.js';
import {rolUpgrade, deleteLastConnecition} from '../controller/users.controller.js'
import { upload } from '../config/multer.js';

const router = Router()

router.get('/premium/:uid', (req, res) => {
    const user = req.user
    console.log(user);
    res.render('sessions/PremiumFilesUpload', user)
})

router.post('/premium/:uid', rolUpgrade)

router.delete('/delete', authorization(['admin']), deleteLastConnecition)

router.post('/:uid/documents', upload, (req, res) =>{
    if(!req.files || req.files.length === 0)  return res.status(400).send({status: 'error', error: 'Something went wrong'})
    res.json({status: 'success', payload: 'Files uploaded'});
});


export default router