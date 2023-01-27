const express = require('express')
const ProductManager = require('../ProductManager')

const app = express()
const manager = new ProductManager('./products.json')

app.get('/products', async (req, res) => {

    const limit = req.query.limit

    const products = await manager.getProducts()
    
    if(limit && limit < products.length){
        products.splice(limit, products.length)
    }

    res.json(products)
})

app.get('/products/:id', async (req, res) => {
    const id = JSON.parse(req.params.id)
    const product = await manager.getProductByID(id)
    res.json(product)
})


app.listen(8080)