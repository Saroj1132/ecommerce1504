const mongoose = require('mongoose')

const cartItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        require: true
    },
    quantity: {
        type: Number,
        default: 1,
        require: true
    }
});

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    items: [cartItemSchema]
});



module.exports = mongoose.model('cart', cartSchema);