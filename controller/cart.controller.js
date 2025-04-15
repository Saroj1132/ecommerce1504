
const cartModel = require('../models/cart.model');
const productModel = require('../models/product.model');

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    
    let cart = await cartModel.findOne({userId: req.user._id});
    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json('product not found')
    }

    if (product.stock < quantity) {
        return res.status(404).json('not enough stock')
    }

    if(!cart){
        cart = new cartModel({
            userId: req.user._id,
            items: [{productId: productId, quantity: quantity}]
        })
    }else{
        const itemIndex = cart.items.findIndex(i =>
            i.productId.toString() === productId
        );
        if(itemIndex > -1){
            cart.items[itemIndex].quantity += quantity;
        }else{
            cart.items.push({productId: productId, quantity: quantity});
        }
    }

    product.stock -= quantity
    await product.save();
    await cart.save();
    res.status(201).json(cart)
}



exports.updateCartItem = async (req, res) => {
    const { productId, quantity: newQty } = req.body;
    
    let cart = await cartModel.findOne({userId: req.user._id});
    if (!cart) {
        return res.status(404).json('cart not found')
    }
    
    const item = cart.items.find(i=> i.productId.toString() === productId);
    if(!item){
        return res.status(404).json('this product not found in cart')
    }

    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json('product not found')
    }

    const qtyDiff = newQty - item.quantity;
    if(qtyDiff > 0 && product.stock < qtyDiff){
        return res.status(404).json('not enough stock')
    }

    product.stock -= qtyDiff;
    product.save();

    item.quantity = newQty;
    await cart.save();
    res.status(201).json(cart)
}

exports.removeCartItem = async (req, res) => {
    const { productId } = req.params;
    
    let cart = await cartModel.findOne({userId: req.user._id});
    if (!cart) {
        return res.status(404).json('cart not found')
    }
    
    const item = cart.items.find(i=> i.productId.toString() === productId);
    if(!item){
        return res.status(404).json('this product not found in cart')
    }

    const product = await productModel.findById(productId);
    if (!product) {
        return res.status(404).json('product not found')
    }

    product.stock += item.quantity;
    product.save();

    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    await cart.save();

    res.status(201).json('item remove successfully')
}

exports.getCart = async (req, res) => {
    const cart = await cartModel.findOne({userId: req.user._id}).populate('items.productId');
    if(!cart){
        return res.status(404).json('cart not found')
    }

    let subTotal = 0;
    cart.items.forEach(item => {
        subTotal += item.quantity * item.productId.price;
    });

    res.json({cart, subTotal})
};