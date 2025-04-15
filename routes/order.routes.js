const express = require('express');
const { protected, isAdmin } = require('../middlewares/auth.middleware');
const { placeOrder, getMyOrders, getAllOrders, updateStatus, mockPayment } = require('../controller/order.controller');
const router = express.Router();


/**
 * @swagger
 * tags:
 *   - name: Order
 *     description: Order Management
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Add product to card
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingInfo:
 *                 type: string
 *                 address: {type: string}
 *                 city: {type: string}
 *                 state: {type: string}
 *                 country: {type: string}
 *     responses:
 *       201:
 *         description: orders placedq
 */

router.post('/', protected, placeOrder);


/**
 * @swagger
 * /order/my-orders:
 *   get:
 *     summary: list of my orders
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: order retrive sucessfully
 */
router.get('/my-orders',protected, getMyOrders);
/**
 * @swagger
 * /order/all-orders:
 *   get:
 *     summary: list of all orders
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: order retrive sucessfully
 */
router.get('/all-orders',protected, isAdmin, getAllOrders);


/**
 * @swagger
 * /order:
 *   put:
 *     summary: Update Order Status
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: product is updated
 *       404:
 *         description: product not found
 */
router.put('/', protected, isAdmin, updateStatus);


/**
 * @swagger
 * /order/mock-payment/:orderId:
 *   get:
 *     summary: list of all orders
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: order retrive sucessfully
 */
router.get('/mock-payment/:orderId', protected, mockPayment);

module.exports = router;