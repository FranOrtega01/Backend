import { Router } from 'express';
import { authorization } from '../utils.js';
import {upgrade} from '../controller/users.controller.js'

const router = Router()

router.put('/premium/:uid', authorization(['user', 'premium']), upgrade )

export default router