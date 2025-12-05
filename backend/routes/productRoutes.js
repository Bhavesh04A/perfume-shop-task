const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products (for the Homepage)
router.get('/', async(req, res) => {
    try {
        const products = await Product.find({});
        const homepageProducts = products.map(p => ({
            _id: p._id,
            name: p.name,
            price: p.price,
            description_short: p.description_short,
            image: p.image_main,
        }));
        res.json(homepageProducts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   GET /api/products/:id
// @desc    Get a single product by ID (for the Product Page)
router.get('/:id', async(req, res) => {
    try {
        // Find product and include all details (including reviews and gallery)
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/:id/reviews', async(req, res) => {
    try {
        const { user, rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newReview = { user, rating: Number(rating), comment, date: new Date() };

        // Add the new review and save
        product.reviews.push(newReview);
        await product.save();

        res.status(201).json(newReview); // Return the newly added review

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;