import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaSearch, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -20, 0],
      rotate: [0, i * 90, 0],
      transition: {
        duration: 3 + i,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  const numberVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)"
    },
    tap: { scale: 0.95 }
  };

  const floatingPerfumes = [
    { emoji: '💎', size: 'w-16 h-16', delay: 0 },
    { emoji: '🌸', size: 'w-12 h-12', delay: 1 },
    { emoji: '🌊', size: 'w-14 h-14', delay: 2 },
    { emoji: '🔥', size: 'w-10 h-10', delay: 3 },
  ];

  const quickLinks = [
    { icon: <FaShoppingBag />, label: 'Shop Perfumes', path: '/shop' },
    { icon: <FaSearch />, label: 'Search Collection', path: '/shop' },
    { icon: <FaHome />, label: 'Homepage', path: '/' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingPerfumes.map((perfume, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={floatingVariants}
            animate="animate"
            className={`absolute ${perfume.size} text-4xl opacity-10`}
            style={{
              left: `${15 + index * 25}%`,
              top: `${20 + index * 15}%`,
            }}
          >
            {perfume.emoji}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Animated 404 Number */}
          <div className="relative mb-8">
            <motion.div
              variants={numberVariants}
              className="text-9xl md:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-indigo-600"
            >
              404
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <FaExclamationTriangle className="w-32 h-32 text-red-400 opacity-30" />
            </motion.div>
          </div>

          {/* Main Message */}
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Scent Lost in the Air
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The fragrance you're searching for seems to have evaporated! 
              Don't worry, we have plenty of exquisite scents waiting for you.
            </p>
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 w-48 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mb-12"
          />

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-700 mb-8">
              Find Your Perfect Scent Instead
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link
                    to={link.path}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="text-3xl text-indigo-600 mb-3">
                      {link.icon}
                    </div>
                    <span className="font-semibold text-gray-800">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Action Button */}
          <motion.div variants={itemVariants}>
            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                to="/"
                className="inline-flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-xl"
              >
                <span className="flex items-center">
                  Discover New Fragrances
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="ml-3"
                  >
                    <FaArrowRight />
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-16 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100"
          >
            <p className="text-gray-700 italic">
              💡 <span className="font-semibold">Did you know?</span> The average person can distinguish 
              over 1 trillion different scents. Maybe your next favorite fragrance is just a click away!
            </p>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="mt-12 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md mx-auto"
          >
            <h4 className="font-bold text-gray-800 mb-3">Try searching for:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {['Floral', 'Woody', 'Fresh', 'Oriental', 'Citrus', 'Spicy'].map((scent, index) => (
                <motion.button
                  key={scent}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => window.location.href = `/shop?search=${scent}`}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
                >
                  {scent}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-100 to-transparent"></div>

      {/* Perfume Bottle Animation */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="fixed bottom-8 right-8 w-20 h-32 hidden lg:block"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-lg"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-300 rounded-t-lg"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gray-400 rounded-b-lg"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;