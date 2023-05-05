import chai from "chai";
import supertest from "supertest";


const expect = chai.expect
const requester = supertest('http://127.0.0.1:8080')


// describe('Testing Ecommerce', () => {

    // describe('Testing Products', function(){

    //     it('Endpoint GET /api/products debe traer todos los productos (paginados)', async function(){
    //         const response = await requester.get('/api/products')
    //         const { status, ok, _body } = response
            // console.log(status);
            // console.log(ok);
            // console.log(_body);

            // expect(_body.newProduct).to.have.property('_id')
        // })

        // it('Endpoint GET /api/products/getAll debe traer todos los productos', async function(){
        //     const response = await requester.get('/api/products/getAll')
        //     const { status, ok, _body } = response
        //     console.log(status);
        //     console.log(ok);
        //     console.log(_body);

            // expect(_body.newProduct).to.have.property('_id')
        // })

        // it('Endpoint POST /api/products debe crear un producto', async function(){
        //     const productMock = {
        //         title: 'title',
        //         description: 'description',
        //         price: 10,
        //         status: true,
        //         category: 'category',
        //         code: 'AD',
        //         thumbnails: ['asdf','asdf'],
        //         stock: 12,
        //     }

        //     const response = await requester.post('/api/products').send(productMock)
        //     const { status, ok, _body } = response

        //     expect(_body.newProduct).to.have.property('_id')
        // })
    // })


//     describe('Registro, Login & Current', function(){
//         let cookie;
//         const mockUser = {
            
//             first_name: 'first_name',
//             last_name: 'last_name',
//             email: 'emailhg',
//             age: 21,
//             password: 'password',
//             rol: 'user',
//             cart: '',
//         }

//         it('Debe registrar un usuario', async function(){
//             const { _body } = await requester.post('/session/register').send(mockUser)

//             console.log(_body);

//             // expect(_body.).to.be.ok
//         })

//     })

// })