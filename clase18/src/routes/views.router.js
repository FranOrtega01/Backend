import { Router } from "express";
import UserModel from '../models/users.model.js'

const router = Router()

router.get('/', (req, res) => res.render('index'))

router.get('/users', async (req, res) => {

    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 5

    const result = await UserModel.paginate({}, {page, limit, lean:true})

    result.prevLink = result.hasPrevPage ? `/users?page=${result.prevPage}` : ''
    result.nextLink = result.hasNextPage ? `/users?page=${result.nextPage}` : ''

    res.render('users', result)
})

export default router