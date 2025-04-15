const express = require('express');
const { protected, isAdmin } = require('../middlewares/auth.middleware');
const { createProduct, updateProduct, getProducts, getProduct, deleteProduct } = require('../controller/product.controller');
const upload = require('../middlewares/upload.middleware');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product Management
 */

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               images:
 *                 { type: array, items: {type: string, format-binary}}
 *     responses:
 *       201:
 *         description: product created
 */

router.post('/', protected, isAdmin, upload.array('images'), createProduct);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: get all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', getProducts)


/**
 * @swagger
 * /product/:id:
 *   get:
 *     summary: get singlw products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */

router.get('/:id', getProduct)


/**
 * @swagger
 * /product/:id:
 *   delete:
 *     summary: delete product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 */
router.delete('/:id', protected, isAdmin, deleteProduct)


/**
 * @swagger
 * /product:
 *   put:
 *     summary: Update product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               images:
 *                 { type: array, items: {type: string, format-binary}}
 *     responses:
 *       201:
 *         description: product is updated
 *       404:
 *         description: product not found
 */
router.put('/', protected, isAdmin, upload.array('images'), updateProduct);

module.exports = router;