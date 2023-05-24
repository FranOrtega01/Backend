import { CartService, TicketService, ProductService } from '../repository/index.js'

export const get = async (req, res) => {
    try {
        const carts = await CartService.get()
        res.json(carts)
    } catch (error) {
        res.json(error)
    }
}

export const create = async (req, res) => {
    try {
        const newCart = await CartService.create()
        res.json({status:'success', newCart})
    } catch (error) {
        res.json(error)
    }
}

export const getOneByID = async (req, res) => {
    try {
        const {cid} =  req.params;
        const cart = await CartService.getOneByID(cid);
        return res.json(cart)
    } catch (error) {
        res.json(error)
    }
}

export const addProduct = async (req, res) => {
    try {
        const user = req.user?.user
        const {cid} = req.params;
        const {pid} = req.params;
        const quantity = Number(req.body?.quantity) || 1;
        
        // Premium cant add own product
        const product = await ProductService.getOneByID(pid)
        console.log(product);
        console.log(user._id);
        if(product.owner.id == user._id) return res.status(400).json({status: 'error', error: 'Cant add own product'})

        
        const result = await CartService.addProduct(cid, pid, quantity);
    
        if(!result) return res.status(404).json({status: 'error', error: 'Cart not found'})
    
        res.send({status: 'success', result})
    } catch (error) {
        console.log('ERROR: ', error);
        res.json(error)
    }
}

export const update = async (req, res) => {
    try {
        const newProducts= req.body;
        const {cid} = req.params;
        const cart = await CartService.update(cid, newProducts);
    
        if(!cart) return res.status(404).json({status: 'error', error: 'Cart not found'});
        res.json({status: 'success', cart})
    } catch (error) {
        res.json(error)
    }
}

export const updateProduct = async (req, res) => {
    const {cid} = req.params;
    const {pid} = req.params;
    const quantity = req.body?.quantity || 1;

    const cart = await CartService.updateProduct(cid, pid, quantity);
    res.json({status: 'success', cart})

}

export const deleteCart = async (req, res) => {
    const {cid} = req.params;

    const result = await CartService.deleteCart(cid);
    if(!result) return res.status(404).json({status: 'error', error: 'Cart not found'})

    res.json({status: 'success', result});
}

export const deleteOneProduct = async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    const cart = await CartService.deleteOneProduct(cid, pid);
    if(!cart) return res.status(404).json({status: 'error', error: 'Cart not found'});
    res.json({status: 'success', cart})
}

export const clearCart = async (req, res) => {
    const {cid} = req.params;
    const cart = await CartService.clearCart(cid);
    if(!cart) return res.status(404).json({status: 'error', error: 'Cart not found'});
    res.json({status: 'success', cart})
}

