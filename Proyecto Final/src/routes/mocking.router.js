import { Router } from 'express';
import { get } from '../controller/mock.controller.js'


const router = Router();

router.get('/', get);

export default router;