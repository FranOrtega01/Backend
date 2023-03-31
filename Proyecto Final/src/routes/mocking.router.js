import { Router } from 'express';
import { get } from '../DAO/controller/mock.controller.js'


const router = Router();

router.get('/', get);

export default router;