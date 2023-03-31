import { ProductService } from "../../repository/index.js";

export const getPaginate = async (req, res) => {
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    const sort = req.query.sort
    

    const options = {
        limit,
        page,
        lean:true,
    }

    const search = {}

    if(filter)  search.title = filter
    

    if(sort){
        if(sort === 'asc') options.sort = {'price': 1}
        if(sort === 'desc') options.sort = {'price': -1}
    }


    try {

        const data = await ProductService.getPaginate(search, options)
    
        data.prevLink = data.hasPrevPage ? `/api/products?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/api/products?page=${data.nextPage}` : null
    
    
        const user = req.user.user
        res.render('home', {data, user})

    } catch (error) {
        res.render('errors/base', {error: `Error en el render del view: ${error}`})
    }
}
export const getOneByID = async (req, res) => {
    const { id } = req.params

    try {
        const product = await ProductService.getOneByID(id)
        const user = req.user.user
        res.render('prodDetail', {product, user})
    } catch (error) {
        res.render('errors/base', {error})
    }
}
export const getRealTime = async (req, res) => {
    try {
        const products = await ProductService.get()
        res.render('realTimeProducts',{
            title: 'Real Time Products',
            products
        })
    } catch (error) {
        res.render('errors/base', {error: 'An error ocurred!'})
    }
}