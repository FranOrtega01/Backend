import CartsService from "../services/carts.service.js";

const cartService = new CartsService()

export const getAll = async (req, res) => {
    const carts = await cartService.getAll()
    res.json({payload: carts})
}
export const getById = async (req, res) => {
    const id = (req.params.id)

    try {
        const cart = await cartService.getById(id)
        res.json({cart})

    } catch (error) {
        console.log(error);
        res.json({
            status: "Error",
            message: 'Cart not found'
        })
    }
}

export const create = async (req, res) => {
    const newCart = await cartService.create()
    res.json({status:'Success', newCart})
}


