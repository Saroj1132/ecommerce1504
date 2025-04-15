const express = require('express');
const {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} = require('../controller/cart.controller');
const { protected } = require('../middlewares/auth.middleware');

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
 *     summary: Add product to cart
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
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to cart
 *       404:
 *         description: Product not found
 */
router.post('/', protected, addToCart);

/**
 * @swagger
 * /cart:
 *   put:
 *     summary: Update product quantity in cart
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
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated
 *       404:
 *         description: Cart or product not found
 */
router.put('/', protected, updateCartItem);

/**
 * @swagger
 * /cart/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       404:
 *         description: Item not found in cart
 */
router.delete('/:productId', protected, removeCartItem);

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
 *         description: Cart retrieved successfully
 *       404:
 *         description: Cart not found
 */
router.get('/', protected, getCart);

module.exports = router;
