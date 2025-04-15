const express = require('express');
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateStatus,
  mockPayment,
} = require('../controller/order.controller');
const { protected, isAdmin } = require('../middlewares/auth.middleware');

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
 *     summary: Place a new order
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
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', protected, placeOrder);

/**
 * @swagger
 * /order/my-orders:
 *   get:
 *     summary: Get current user's orders
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       404:
 *         description: No orders found
 */
router.get('/my-orders', protected, getMyOrders);

/**
 * @swagger
 * /order/all-orders:
 *   get:
 *     summary: Get all orders (admin only)
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 *       403:
 *         description: Unauthorized access
 */
router.get('/all-orders', protected, isAdmin, getAllOrders);

/**
 * @swagger
 * /order:
 *   put:
 *     summary: Update order status (admin only)
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
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 */
router.put('/', protected, isAdmin, updateStatus);

/**
 * @swagger
 * /order/mock-payment/{orderId}:
 *   get:
 *     summary: Simulate payment for an order
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to simulate payment for
 *     responses:
 *       200:
 *         description: Payment simulated successfully
 *       404:
 *         description: Order not found
 */
router.get('/mock-payment/:orderId', protected, mockPayment);

module.exports = router;
