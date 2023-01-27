const ProductManager = require('./ProductManager')

const manager = new ProductManager('products.json')

const run = async () => {
    // await manager.addProduct('Zapas', 'descr', 14, 'https://', 32, 64)   
    // await manager.updateProduct(2, {title:'Zapas',desc:'asdafsdf', price:22, thumbnail:'https://', code:123,stock: 64})
    // await manager.addProduct('Botas', 'desasdfasdcr', 144, 'https://', 1232, 64)
    // await manager.addProduct('Mochilas', 'desasdfasdcr', 144, 'https://', 412, 64)
    // await manager.addProduct('Remeras', 'desasdfasdcr', 144, 'https://', 41, 64)
    // await manager.addProduct('Pantalones', 'desasdfasdcr', 144, 'https://', 908, 64)
    // await manager.addProduct('Camperas', 'desasdfasdcr', 144, 'https://', 902, 64)
    // await manager.addProduct('Medias', 'desasdfasdcr', 144, 'https://', 671, 64)
    // await manager.addProduct('Gorras', 'desasdfasdcr', 144, 'https://', 576, 64)
    // await manager.addProduct('Anteojos', 'desasdfasdcr', 144, 'https://', 802, 64)
    // await manager.addProduct('Guantes', 'desasdfasdcr', 144, 'https://', 3977, 64)
    // await manager.addProduct('Medias', 'desasdfasdcr', 144, 'https://', 14412232, 64)
    // await manager.addProduct('Botas', 'desasdfasdcr', 144, 'https://', 622, 64)
    // await manager.addProduct('Botas', 'desasdfasdcr', 144, 'https://', 688, 64)
    // await manager.addProduct('Botas', 'desasdfasdcr', 144, 'https://', 744, 64)
    await manager.updateProduct(16, {desc:'Updated'})
    // await manager.deleteProduct(2)
    // console.log(await manager.getProductByID(2));
    console.log(await manager.getProducts());
}
run()