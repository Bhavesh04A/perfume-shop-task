require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');
const productRoutes = require('./routes/productRoutes');
const mockProducts = require('./data/mockData');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Database Connection and Server Start
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully!');

        // Seed Mock Data
        await seedDatabase();

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

// Function to check and insert mock data
const seedDatabase = async() => {
    const count = await Product.countDocuments();
    if (count === 0) {
        console.log('Database is empty. Seeding mock data...');
        await Product.insertMany(mockProducts);
        console.log('Mock data seeded!');
    } else {
        console.log(`Database already contains ${count} products.`);
    }
};

connectDB();