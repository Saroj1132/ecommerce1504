
const orderModel = require('../models/order.model');;
const cartModel = require('../models/cart.model')

exports.placeOrder = async (req, res) => {
    const cart = await cartModel.findOne({ userId: req.user._id }).populate('items.productId');
    if (!cart) {
        return res.status(404).json('cart not found')
    };

    const { shippingInfo } = req.body;
    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
        totalAmount += item.productId.price * item.quantity;
        return {
            product: item.productId._id,
            quantity: item.quantity
        };
    });

    const order = await orderModel.create({
        userId: req.user._id,
        items: orderItems,
        shippingInfo: shippingInfo,
        totalAmount: totalAmount
    });

    await cartModel.findOneAndDelete({ userId: req.user._id });
    return res.status(201).json('order placed');
}


exports.getMyOrders = async (req, res) => {
    const orders = await orderModel.find({ userId: req.user._id });
    if (orders.length > 0) {
        return res.status(200).json({ orders });
    }
    return res.status(404).json('order not found')
}


exports.getAllOrders = async (req, res) => {
    const orders = await orderModel.find();
    if (orders.length > 0) {
        return res.status(200).json({ orders });
    }
    return res.status(404).json('order not found')
}

exports.updateStatus = async (req, res) => {
    const { orderId, status } = req.body
    const order = await orderModel.findById({ _id: orderId });
    if (order) {
        order.status = status;
        await order.save();
        return res.status(200).json('order status update sucessfully');
    }
    return res.status(404).json('order not found')
}

exports.mockPayment = async (req, res) => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    const { orderId } = req.params
    const order = await orderModel.findById({ _id: orderId });
    if (!order) {
        return res.status(404).json('order not found');
    }

    order.status = 'Paid';
    await order.save();
    await delay(5000)
    return res.status(200).json('payment sucessfully order status changed');
}

