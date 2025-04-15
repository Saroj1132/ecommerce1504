const express = require('express');
const { protected, isAdmin } = require('../middlewares/auth.middleware');
const { addToCart, updateCartItem, removeCartItem, getCart } = require('../controller/cart.controller');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Cart
 *     description: Cart Management
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to card
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: string
 *     responses:
 *       201:
 *         description: items added to cart
 *       404:
 *         description: product not found
 */

router.post('/', protected, addToCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: updated product cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: string
 *     responses:
 *       201:
 *         description: items updated in cart
 *       404:
 *         description: cart not found
 */
router.put('/', protected, updateCartItem);


/**
 * @swagger
 * /cart/:productId:
 *   get:
 *     summary: remove item cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: item remove successfully
 */

router.get('/:productId', protected, removeCartItem);


/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrived
 */
router.get('/', protected, getCart);

module.exports = router;