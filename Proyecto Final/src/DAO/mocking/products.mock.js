import { productsMock } from "../../utils.js";
import ProductDTO from "../DTO/products.dto.js";

export default class Mocking{
    constructor(cant){
        this.products = productsMock(cant);
    }

    get = ()=>{
        try {
            return this.products;
        } catch (error) {
            throw new Error('Couldnt get products')

        }
    }

    getOneByID = (pid)=>{
        try {
            return this.products.find(p => p.id == pid);
        } catch (error) {
            throw new Error('Product not found')

        }
    }

    create = (product) =>{
        try {
            const productToInser = ProductDTO(product);
            this.products.push(productToInser);
            return productToInser;
        } catch (error) {
            throw new Error('Product not found')

        }
    }

    update = (pid, product)=>{
        try {
            const productToInser = ProductDTO(product);
            const idx = this.products.findIndex(p => p.id == pid);
            if(idx == -1) return error;
            this.products[idx] = productToInser;
            return productToInser;
        } catch (error) {
            throw new Error('Product not found')
        }
    }

    deleteOne = (pid) =>{
        try {
            const idx = this.products.findIndex(p => p.id == pid);
            if(idx == -1) return error;
            this.products.splice(idx,1);
            return true;
        } catch (error) {
            throw new Error('Product not found')
        }
    }
}