import { Router } from 'express';
import { chat } from '../controller/messages.controller.js';
import { authorization } from '../utils.js';

const router = Router();

router.get('/',authorization('user'), chat);

export default router;