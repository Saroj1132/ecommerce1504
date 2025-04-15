const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    items: {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product'
            },
            quantity: Number
    },
    shippingInfo: {
        address: String,
        city: String,
        state: String,
        country: String
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Shipped", "Delivered"],
        default: 'Pending'
    },
    totalAmount: Number
},{timestamps: true});


module.exports = mongoose.model('order', orderSchema);