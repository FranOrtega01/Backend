import { UserService } from '../repository/index.js'

export const get = async (req, res) => {
    const user = await UserService.get()
    res.json({user});
}

export const create = async (req,res) => {
    const data = req.body

    try {
        const newUser = await UserService.create(data) 
    
        return res.json({status:'success', payload:newUser});
    } catch (error) {
        return res.json({status:'error', error});
    }

}

export const getOneByID = async (req, res) => {
    const { uid } = req.params

    try {
        const user = await UserService.getOneByID(uid)
    
        return res.json(user)
    } catch (error) {
        return res.json(error)
    }
}

export const getOneByEmail = async (req, res) => {
    const { email } = req.params
    try {
        const user = await UserService.getOneByEmail(email)
    
        return res.json(user)   
    } catch (error) {
        return res.json(error)   
    }
}

export const update = async (req, res) => {
    const { uid } = req.params
    const data = req.body
    try {
        const updatedUser = await UserService.update(uid, data)
    
        res.json({status:'success', updatedUser})
    } catch (error) {
        res.json({status:'error', error})
    }
}

export const deleteOne = async (req, res) => {
    const { uid } = req.params
    try {
        const deletedUser = await UserService.deleteOne(uid)

        res.json({status:'success', deletedUser})
    } catch (error) {
        res.json({status:'error', error})
    }
}

// Api Users

export const upgrade = async (req, res) => {
    const { uid } = req.params;
    try {
        const updateRol = {rol:'premium'}
        const updatedUser = await UserService.update(uid, updateRol )
        res.json({status:'success', updatedUser})
    } catch (error) {
        res.json({status:'error', error})
    }
}

