export default class UserDTO{

    constructor(user){
        this.id = user.id || user._id || null
        this.first_name = user.first_name || '' 
        this.last_name = user.last_name || '' 
        this.email = user.email || '' 
        this.age = user.age || ''
        this.rol = user.rol || 'user'
        this.password = user.password
        this.cart = user.cart
        this.documents = user.documents
        this.last_connection = user.last_connection
    }

    getCurrent = () => {


        return {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            age: this.age,
            rol: this.rol,
            cart: this.cart,
            documents: this.documents,
        }
    }
}