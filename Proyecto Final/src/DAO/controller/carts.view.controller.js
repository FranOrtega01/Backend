import { CartService, TicketService } from '../../repository/index.js'

export const get = async (req, res) => {
    try {
        const carts = await CartService.get()
        console.log(carts);
        res.render('cart', {carts: [carts]})
    } catch (error) {
        res.render('errors/base', {error: 'An error ocurred!'})
    }
}

export const getOneByID = async(req, res) => {
    const { cid } = req.params
    try {
        const cart = await CartService.getOneByID(cid)
        res.render('cartID',cart)
    } catch (error) {
        
    }
}

export const purchase = async (req, res) =>{
    const {cid} = req.params;
    const status = await CartService.purchase(cid);

    console.log(status);
    if (!status) return res.status(404).json({ status: 'Error', error: 'Cart not found' });

    await CartService.update(cid, status.noStock);
    if(status.totalPrice>0){
        console.log(req.user.user.email, status.totalPrice);
        const createToken = await TicketService.create(req.user.user.email, status.totalPrice);
        const resultToken = await TicketService.getOneByID(createToken._id)
        
        status.token = resultToken;
    }
    res.json({status: 'success', ticket: status.token});
}
