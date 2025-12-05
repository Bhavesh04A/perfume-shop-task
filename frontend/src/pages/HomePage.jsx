import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaShippingFast, FaAward, FaLock, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = response.data;
        setProducts(allProducts);
        setFeaturedProducts(allProducts.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        
        const fallbackProducts = [
          { _id: '1', name: 'Velvet Dusk', price: 9500, description_short: 'Rich notes of amber and vanilla', image: '/images/velvetdusk.png', rating: 4.8 },
          { _id: '2', name: 'Aqua Fresh', price: 6250, description_short: 'Cool, crisp, and oceanic fragrance', image: '/images/aquafresh.png', rating: 4.5 },
          { _id: '3', name: 'Rose Gardenia', price: 11099, description_short: 'Classic floral bouquet, light and airy', image: '/images/rosegardenia.png', rating: 4.9 },
          { _id: '4', name: 'Leather Smoke', price: 12500, description_short: 'Bold, smoky, and complex masculine scent', image: '/images/leathersmoke.png', rating: 4.7 },
          { _id: '5', name: 'Green Tea Zen', price: 4999, description_short: 'Calming and clean citrus-green tea blend', image: '/images/greenteazen.png', rating: 4.6 },
          { _id: '6', name: 'Midnight Orchid', price: 8999, description_short: 'Mysterious floral with woody undertones', image: '/images/velvetdusk.png', rating: 4.8 },
          { _id: '7', name: 'Citrus Zest', price: 7499, description_short: 'Fresh and energizing citrus burst', image: '/images/aquafresh.png', rating: 4.4 },
          { _id: '8', name: 'Royal Oud', price: 15999, description_short: 'Luxurious woody oriental fragrance', image: '/images/leathersmoke.png', rating: 4.9 },
        ];
        setProducts(fallbackProducts);
        setFeaturedProducts(fallbackProducts);
      }
    };
    fetchProducts();
  }, []);

  const features = [
    { icon: <FaShippingFast />, title: 'Free Shipping', desc: 'On orders above ₹2000' },
    { icon: <FaLock />, title: 'Secure Payment', desc: '100% secure transactions' },
    { icon: <FaAward />, title: 'Authentic Products', desc: 'Guaranteed authenticity' },
  ];

  if (loading && products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 mb-4 border-4 border-indigo-600 border-t-transparent rounded-full"
        />
        <p className="text-lg text-gray-600">
          Loading exquisite fragrances...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section - SIMPLIFIED AND FIXED */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              Discover Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Signature
              </span>{' '}
              Scent
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light">
              Luxury perfumes crafted with passion. Experience the art of fragrance with our exclusive collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/shop" 
                  className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-4 px-8 rounded-full shadow-2xl"
                >
                  Shop Now 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-2"
                  >
                    <FaArrowRight />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/about" 
                  className="inline-flex items-center bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                rotate: [0, 360, 0]
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 15}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose ScentLux?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best fragrance experience
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl text-indigo-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              ✨ Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked selection of our most exquisite fragrances
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/shop" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-xl font-bold"
              >
                View All Products
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  <FaArrowRight />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;