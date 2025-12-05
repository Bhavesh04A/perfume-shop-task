const mongoose = require('mongoose');

// Schema for Reviews
const reviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

// Main Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    description_short: { type: String, required: true },
    description_full: { type: String, required: true }, // For the Product Page
    price: { type: Number, required: true },
    available_sizes: [{ type: String }], // e.g., ['50ml', '100ml']
    image_main: { type: String, required: true }, // Main image URL (local path)
    image_gallery: [{ type: String }], // For the Product Page gallery (local paths)
    reviews: [reviewSchema], // Nested reviews
    stock_count: { type: Number, default: 0 },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;