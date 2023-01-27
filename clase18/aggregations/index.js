import mongoose from "mongoose";
import orderModel from "./models/order.model.js";

const env = async(medida) => {

    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017', {dbName: 'Pizzeria'})
    
    console.log('DB Connected');
    
    // const result = await orderModel.insertMany([
    //     {name: 'Pepperoni', size: 'small', price: 19, quantity: 10, date: "2022-01-11T18:50:30Z"},
        // {name: 'Pepperoni', size: 'medium', price: 20, quantity: 4, date: "2022-01-15T18:50:30Z"},
    //     {name: 'Pepperoni', size: 'large', price: 21, quantity: 30, date: "2022-01-17T18:50:30Z"},
    //     {name: 'Cheese', size: 'small', price: 12, quantity: 15, date: "2022-01-11T18:50:30Z"},
    //     {name: 'Cheese', size: 'medium', price: 13, quantity: 50, date: "2022-01-11T18:50:30Z"},
    //     {name: 'Cheese', size: 'large', price: 14, quantity: 10, date: "2022-01-11T18:50:30Z"},
    //     {name: 'Hawaina', size: 'small', price: 17, quantity: 10, date: "2022-01-11T18:50:30Z"},
    //     {name: 'Hawaina', size: 'medium', price: 18, quantity: 10, date: "2022-01-11T18:50:30Z"}
        // ]);

    // console.log(result);


    //EJEMPLO
    // const orders = await orderModel.aggregate([
    //     {$match: {size: 'medium'}}, //1.
    //     {
    //         $group: {
    //             _id: '$name',
    //             totalQuantity: { $sum: "$quantity" }
    //         }
    //     }

    // ])


    //PRACTICA
    const orders = await orderModel.aggregate([
            //1. Filtra solo las medianas
            {$match: {size: medida}}, 
            //2. Agrupa por nombre y suma sus cantidades
            {
                $group: {
                    _id: '$name',
                    totalQuantity: { $sum: "$quantity" }
                }
            }, 
            //3. Ordena de mayor a menor (-1)
            {$sort: {totalQuantity: -1}},
            //4
            {
                $group: {
                    _id:1,
                    orders: {$push: '$$ROOT'}
                    //Con el push, pusheo el documento a un nuevo array (orders), y con el ROOT indico que son TODOS los atributos del documento.

                    //Guardamos el resultado en un doc nuevo.
                    //El doc nuevo va a tener _id y orders
                    //Hacemos $push para guardar todo el resultado anterior en un campo 'orders'
                    //$$ROOT toma toda la estructura de cada uno de los documentos
                }
            },
            {
                $project:{
                    '_id': 0, //Genera un ObjectID
                    orders: '$orders'
                }
            },
            // {
            //     $merge:{into: 'reports'} // Exporta el resultado a una nueva coleccion
            // }
        ]);

    console.log(JSON.stringify(orders, null, '\t'));

    process.exit()
}

env('medium')