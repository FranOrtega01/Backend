import ProductsService from "../services/products.service.js";

const productService = new ProductsService()


export const getAll = async (req,res) => {
    
    const limit = req.query?.limit || 2
        const page = req.query?.page || 1
        const filter = req.query?.query || ''
        const sort = req.query.sort
        
    
        const options = {
            limit,
            page,
            lean:true,
        }
    
        const search = {}
    
        if(filter){
            search.title = filter
        }
        
    
        if(sort){
            if(sort === 'asc') options.sort = {'price': 1}
            if(sort === 'desc') options.sort = {'price': -1}
        }
        
        const data = await productService.paginate(search, options)
    
        data.prevLink = data.hasPrevPage ? `/products?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/products?page=${data.nextPage}` : null
    
        const user = req.user
        
        res.render('home', {data, user})
}

export const getById = async (req, res) => {
    const id = req.params.id

    try {
        const product = await productService.getById(id)
        res.render('prodDetail', product)
    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: 'Product not found'
        })
    }
}