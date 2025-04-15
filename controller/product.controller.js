
const productModel = require('../models/product.model');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, category, price, stock } = req.body;
        const images = req.files.map(file => file.path);

        const product = await productModel.create({
            name, description, category, price, stock, images
        });

        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (search) filter.name = { $regex: search, $options: 'i' }
        const products = await productModel.find(filter);
        if (products.length > 0) {
            return res.status(200).json({ products });
        }
        return res.status(404).json('product not found')
    } catch (error) {
        res.status(500).json(error)
    }
}



exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findById(id);
        if (product) {
            return res.status(200).json({ product });
        }
        return res.status(404).json('product not found')
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);
        if (product) {
            return res.status(200).json('This product deleted');
        }
        return res.status(404).json('product not found')
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const updateFields = { ...req.body };
        if (req.files) {
            updateFields.images = req.files.map(file => file.path);
        }

        const existProduct = await productModel.findById(req.body.productId);
        if (!existProduct) {
            return res.status(404).json('product not found')
        }

        await productModel.findByIdAndUpdate(req.body.productId, updateFields, { new: true });
        return res.status(200).json('product updated')
    } catch (error) {
        res.status(500).json(error)
    }
}
