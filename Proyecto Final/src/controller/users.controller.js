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

export const rolUpgrade = async (req, res) => {
    const { uid } = req.params;
    try {
        const user = await UserService.getOneByID(uid);
        if (!user) return res.status(404).send({status:'error', error: "User not found"})
        if (user.rol == "admin") res.status(400).send({status:'error', error: "User is admin"})
        user.rol = user.rol == "user" ? "premium" : "user";
        const newUser = await UserService.update(uid, user);
        console.log(newUser, user.rol);
        return res.status(200).send({status: 'success', message:'User rol changed'})
    } catch (error) {
        return console.log(error);
    }


}

export const deleteLastConnecition = async (req, res) => {
    try {
        // 172800000 = 2 days
        const conditions = {
            last_connection: { $gt: 172800000 },
            rol: { $ne: 'admin' }
        };
        const deletedUsers = await UserService.deleteMany(conditions)
        res.json({status:'success', deletedUsers})
    } catch (error) {
        res.json({status:'error', error})
    }
}