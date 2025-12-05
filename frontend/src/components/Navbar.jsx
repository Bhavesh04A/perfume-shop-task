import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsOpen(false);
    }
  };

  const cartItemsCount = 3;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-gradient-to-r from-white to-indigo-50 shadow-lg sticky top-0 z-50 border-b border-indigo-100"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold text-xl">P</span>
              </motion.div>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight"
              >
                ScentLux
              </motion.span>
            </Link>
          </motion.div>

          {/* Search Bar - Desktop */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex flex-1 max-w-md mx-8"
          >
            <form onSubmit={handleSearch} className="relative w-full">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search perfumes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10 pr-4 rounded-full border border-indigo-200 focus:outline-none focus:border-indigo-500 bg-white shadow-sm"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit" 
                className="absolute right-2 top-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
              >
                <FaSearch className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Desktop Links */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex space-x-6 items-center"
          >
            {['Home', 'Shop', 'About', 'Contact'].map((item, index) => (
              <motion.div key={item} variants={itemVariants}>
                <Link 
                  to={`/${item === 'Home' ? '' : item.toLowerCase()}`} 
                  className="nav-link group relative"
                >
                  <span className="relative">
                    {item}
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 bg-indigo-600"
                      initial="hidden"
                      whileHover="visible"
                      variants={underlineVariants}
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-indigo-100 transition"
              >
                <FaUser className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <motion.div variants={itemVariants}>
                <Link to="/cart" className="relative">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full hover:bg-indigo-100 transition relative"
                  >
                    <FaShoppingCart className="w-6 h-6 text-gray-600" />
                    {cartItemsCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg"
                      >
                        {cartItemsCount}
                      </motion.span>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:hidden flex items-center space-x-3"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSearch}
              className="p-2 text-gray-600 hover:text-indigo-600"
            >
              <FaSearch className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none transition"
            >
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white shadow-xl border-t border-gray-100 overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-4 py-3 border-b"
            >
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search perfumes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 text-white p-3 rounded-r-lg">
                  <FaSearch className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
            
            {['Home', 'Shop', 'About', 'Contact'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
              >
                <Link 
                  to={`/${item === 'Home' ? '' : item.toLowerCase()}`} 
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item === 'Home' ? '🏠' : item === 'Shop' ? '🛍️' : item === 'About' ? 'ℹ️' : '📞'}</span> {item}
                </Link>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-4 py-3 border-t mt-2 bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <Link to="/account" className="flex items-center text-gray-700 hover:text-indigo-600" onClick={() => setIsOpen(false)}>
                  <FaUser className="mr-2" /> Account
                </Link>
                <Link to="/cart" className="flex items-center text-gray-700 hover:text-indigo-600 relative" onClick={() => setIsOpen(false)}>
                  <FaShoppingCart className="mr-2" /> Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;