import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingBag, FaCreditCard, FaTruck } from 'react-icons/fa';
import { formatCurrency } from '../utils/currency';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Velvet Dusk', price: 9500, quantity: 1, image: '/images/velvetdusk.png', size: '50ml', category: 'Women' },
    { id: 2, name: 'Aqua Fresh', price: 6250, quantity: 2, image: '/images/aquafresh.png', size: '100ml', category: 'Unisex' },
    { id: 3, name: 'Rose Gardenia', price: 11099, quantity: 1, image: '/images/rosegardenia.png', size: '75ml', category: 'Women' },
  ]);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === 'scentlux10') {
      setCouponApplied(true);
      alert('Coupon applied! 10% discount added.');
    } else {
      alert('Invalid coupon code. Try "SCENTLUX10"');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shipping + tax - discount;

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
    hidden: { y: 20, opacity: 0 },
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

  const cartItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    exit: { 
      x: 20, 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const checkoutVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      setCartItems([]);
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any perfumes to your cart yet.</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/shop"
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg"
            >
              <FaArrowLeft className="mr-2" /> Start Shopping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-black mb-4 title-font">Shopping Cart</h1>
            <p className="text-xl text-indigo-100">Review your items and proceed to checkout</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={cartItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col sm:flex-row p-6">
                      {/* Product Image */}
                      <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 object-cover rounded-xl"
                        />
                      </motion.div>

                      {/* Product Details */}
                      <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                {item.category}
                              </span>
                              <span className="text-sm text-gray-500">Size: {item.size}</span>
                            </div>
                            <p className="text-2xl font-bold text-indigo-600">
                              {formatCurrency(item.price)}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                              <motion.button
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-3 hover:bg-gray-100"
                              >
                                <FaMinus className="w-3 h-3" />
                              </motion.button>
                              <span className="px-4 py-2 font-bold min-w-[40px] text-center">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-3 hover:bg-gray-100"
                              >
                                <FaPlus className="w-3 h-3" />
                              </motion.button>
                            </div>

                            {/* Remove Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id)}
                              className="p-3 text-red-500 hover:bg-red-50 rounded-full"
                            >
                              <FaTrash className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-lg font-semibold text-gray-700">
                            Subtotal: {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Link
                  to="/shop"
                  className="flex items-center justify-center w-full py-4 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  <FaArrowLeft className="mr-2" /> Continue Shopping
                </Link>
              </motion.div>
            </motion.div>

            {/* Order Summary */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <motion.div
                variants={checkoutVariants}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaShoppingBag className="mr-2 text-indigo-600" /> Order Summary
                </h2>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: 'Subtotal', value: formatCurrency(subtotal) },
                    { label: 'Shipping', value: shipping === 0 ? 'FREE' : formatCurrency(shipping) },
                    { label: 'Tax (18%)', value: formatCurrency(tax) },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between"
                    >
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-bold">{item.value}</span>
                    </motion.div>
                  ))}

                  {/* Coupon */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4 border-t border-gray-200"
                  >
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={applyCoupon}
                        className="px-4 py-3 bg-indigo-100 text-indigo-700 font-bold rounded-lg hover:bg-indigo-200"
                      >
                        Apply
                      </motion.button>
                    </div>
                    {couponApplied && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4"
                      >
                        <div className="flex justify-between">
                          <span>Discount (10%)</span>
                          <span className="font-bold">-{formatCurrency(discount)}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Total */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-gray-200 pt-4"
                  >
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-indigo-600"
                      >
                        {formatCurrency(total)}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  variants={checkoutVariants}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isCheckingOut ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="flex items-center"
                    >
                      <FaCreditCard className="mr-2" /> Processing...
                    </motion.span>
                  ) : (
                    <span className="flex items-center">
                      <FaCreditCard className="mr-2" /> Proceed to Checkout
                    </span>
                  )}
                </motion.button>

                {/* Security Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-indigo-50 rounded-xl"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <FaTruck className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-600">Free shipping</span>
                    <span className="text-gray-600">on orders above ₹2000</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✅ Secure payment · 🔒 256-bit encryption · 📦 Fast delivery
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartPage;