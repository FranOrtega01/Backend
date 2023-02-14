import { Router } from "express";

export default class MyRouter{
    constructor(){
        this.router = Router()
        this.init()
    }

    init(){}

    getRouter(){
        return this.router
    }

    get(path, ...callbacks){
        this.router.get(path,this.generateCustomResponses, this.applyCallbacks(callbacks))
    }
    
    post(path, ...callbacks){
        this.router.get(path,this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    put(path, ...callbacks){
        this.router.get(path,this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path, ...callbacks){
        this.router.get(path,this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks){
        return callbacks.map(cb => async(...params) => {
            try {
                // params (req, res, next)
                // apply apunta directamente a la funcion callback
                // this es para que se utilice en el contexte de la Clase Router
                await cb.apply(this, params)
            } catch (error) {
                console.log(error);
                //Params1 es el parametro 'res'
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses = (req, res, next) => {
        res.sendSuccess = payload => res.send({status: 'success', payload})

        res.sendServerError = error => res.status(500).send({status: 'error', error})

        res.sendUserError = error => res.status(400).send({status: 'error', error})

        next()
    }
}