//res es la respuesta
import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvalability, updateProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product ID
 *           example: 2  
 *         name:
 *           type: string
 *           description: The Product Name
 *           example: Laptop 15 inch
 *         price:
 *           type: number
 *           description: The Product Price
 *           example: 200
 *         avalability:
 *           type: boolean
 *           description: The Product avalability
 *           example: true
 *      
 *       required:
 *         - name
 *         - price
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Succesful response
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
*/
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on its unique ID
 *     parameters:
 *       - in: path 
 *         name: id 
 *         description: The ID of the product to retrieve 
 *         required: true 
 *         schema:  
 *           type: integer 
 *     responses:
 *       200:
 *         description: Succesful Response
 *         content: 
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404: 
 *         description: Not found
 *       400:
 *         description: Bad request - Invalid ID
 */

router.get('/:id',
    param('id').isInt().withMessage('Id no válido'),

    handleInputErrors, // si pasa la validacion anterior le pasa los erroes a este midleware

    getProductById)


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:  
 *       - Products
 *     description: Return a new product
 *     requestBody: 
 *       required: true
 *       content: 
 *         application/json: 
 *           schema: 
 *             type: object 
 *             properties: 
 *               name: 
 *                 type: string
 *                 example: "Tablet 10 inch"
 *               price: 
 *                 type: number
 *                 example: 1000
 *     responses:
 *       201: 
 *         description: Succesful response
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/Product'
 *       400: 
 *         description: Bad request - Invalid data
 * 
 * 
 *  */
router.post('/',

    // checa la validacion
    body('name')
        .notEmpty()
        .withMessage('El nombre de el producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor invalido')
        .notEmpty().withMessage('El precio de el producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),

    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}: 
 *   put:
 *     summary: Update product by ID
 *     tags: 
 *       - Products
 *     description: Return updated product
 *     parameters:
 *       - in: path 
 *         name: id 
 *         description: The ID of the product to retrieve 
 *         required: true 
 *         schema:  
 *           type: integer 
 *     requestBody:  
 *       required: true
 *       content: 
 *         application/json: 
 *           schema: 
 *             type: object 
 *             properties: 
 *               name: 
 *                 type: string
 *                 example: "Tablet 10 inch"
 *               price: 
 *                 type: number
 *                 example: 40
 *               avalability:
 *                 type: boolean
 *                 example: true
 *     responses: 
 *       201:
 *         description: Succesful response
 *         content: 
 *           application/json: 
 *             schema: 
 *               $ref: '#/components/schemas/Product'
 *       400: 
 *         description: Bad request - Invalid ID or Invalid input data 
 *       404: 
 *         description: Product not found
 *  
 *       
 */

router.put('/:id',

    //
    param('id')
        .isInt()
        .withMessage('Id no válido'),

    body('name')
        .notEmpty()
        .withMessage('El nombre de el producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor invalido')
        .notEmpty().withMessage('El precio de el producto no puede ir vacio')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),

    body('avalability')
        .isBoolean().withMessage('Valor invalido'),


    handleInputErrors,
    updateProduct
)


/**
 * @swagger
 * /api/products/{id}: 
 *   patch:
 *     summary: Update product avalability by ID
 *     tags: 
 *       - Products
 *     description: Return product avalability updated
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: Product's id to update avalibility
 *         required: true
 *         schemas:
 *           type: integer
 *     responses: 
 *       200: 
 *         description: Succesful response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400: 
 *         description: Bad request or Invalid input data
 *       404: 
 *         description: Product not found
*/

router.patch('/:id',
    param('id').isInt().withMessage('Id no válido'),



    handleInputErrors,
    updateAvalability)


/**
 * @swagger
 * /api/products/{id}:
 *   delete: 
 *     summary: Delete product by ID
 *     tags:
 *       - Products
 *     description: Return a confirmation messages product deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product's id to delete
 *         required: true
 *         schemas: 
 *           type: integer
 *     responses: 
 *       200:
 *         description: Succesful response
 *         content: 
 *           application/json: 
 *             schema: 
 *               type: string
 *               value: 'Producto eliminado'
 *       400: 
 *         description: Bad request or Invalid input data
 *       404: 
 *         description: Product not found    
 *     
 */
router.delete('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputErrors,
    deleteProduct
)

export default router