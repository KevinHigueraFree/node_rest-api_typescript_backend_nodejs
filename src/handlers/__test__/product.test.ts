import request from 'supertest';
import server from '../../server'

describe('POST /api/products', () => {

    test('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})
        //! should be
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)// to validate length

        //!shouldn't  be
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(3)// to validate length
    })


    test('Should validate  that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor curve",
            price: 0

        })

        //!should  be
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)// to validate length

        //!shouldn't  be
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(3)// to validate length
    })

    test('Should validate  that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor curve",
            price: "Hola"
        })

        //!should  be
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)// to validate length

        //!shouldn't  be
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(3)// to validate length
    })



    test('Should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse testing",
            price: 1000
        })

        //! should be
        expect(response.status).toEqual(201)//? toEqual: verifi that the response.sttaus be exactly same to 201
        expect(response.body).toHaveProperty('data')//? toHaveProperty: verific that have the data propierty

        //!dont should be
        expect(response.status).not.toEqual(200)
        expect(response.status).not.toEqual(404)
        expect(response.body).not.toHaveProperty('errors')

    })

})

describe('GET /api/products', () => {
    test('should check if api/products url exist', async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })


    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/) // have a reponse json
        expect(response.body).toHaveProperty('data') // to validate length
        expect(response.body.data).toHaveLength(4)
        expect(response.body).not.toHaveProperty('errors')



    })
})

describe('GET /api/products/:id', () => {
    test('GET a error 404 response a non-existent product', async () => {
        const product_id = 1000
        const response = await request(server).get(`/api/products/${product_id}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');

    })
    test('should check a valid ID in the URL', async () => {

        const response = await request(server).get(`/api/products/not-valid-url`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Id no válido')


    })
    test('get a JSON response for a single product', async () => {

        const product_id = 1
        const response = await request(server).get(`/api/products/${product_id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')


    })
})

describe('PUT /api/products/:id', () => {
    test('should check a valid ID in the URL', async () => {

        const response = await request(server)
            .put(`/api/products/not-valid-url`)
            .send({
                name: 'Test',
                price: 300,
                avalability: true
            })


        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Id no válido')

    })


    test('should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data')

    })

    test('should validate that the price is greater than 0', async () => {
        const response = await request(server)
            .put('/api/products/1')
            .send({
                name: 'Test',
                price: -300,
                avalability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El precio debe ser mayor a 0')

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data')

    })

    test('should return a 404 response form a non-existent product', async () => {
        const product_id = 2000
        const response = await request(server)
            .put(`/api/products/${product_id}`)
            .send({
                name: 'Test',
                price: 200,
                avalability: true
            })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        // expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data')

    })

    test('should update an existing product with valid data', async () => {

        const response = await request(server)
            .put('/api/products/3')
            .send({
                name: 'Test',
                price: 200,
                avalability: true
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors')

    })


})

describe('PATCH /api/products/:id', () => {
    test('should return a 404 response for a non existent product', async () => {
        const product_id = 2000
        const response = await request(server).patch(`/api/products/${product_id}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200);
        expect(response.body).not.toHaveProperty('data')
    })

    test('should return a 200 response por sucees to update product',async()=>{
        const response = await request(server).patch('/api/products/2')
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBeTruthy()
    

      expect(response.status).not.toBe(400);
      expect(response.status).not.toBe(404);
        expect(response.body).not.toHaveProperty('error')
    
    })
})

describe('DELETE /api/products/:id', () => {
    test('Should  check  valid a ID', async () => {
        const response = await request(server).delete('/api/products/not-valid-id')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Id no válido')

    })

    test('Should return a 404 response for a non existen product ', async () => {
        const product_id = 2000
        const response = await request(server).delete(`/api/products/${product_id}`)

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(200);

    })

    test('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto Eliminado')
    })
})