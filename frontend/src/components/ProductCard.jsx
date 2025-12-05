import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaHeart, FaStar } from 'react-icons/fa';
import { formatCurrency } from '../utils/currency';
import { motion } from 'framer-motion';

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    alert(`Added ${product.name} to cart!`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.3 + index * 0.05
      }
    }
  };

  const wishlistVariants = {
    initial: { scale: 1 },
    tapped: { 
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.3
      }
    },
    liked: {
      scale: 1.2,
      color: "#ef4444",
      transition: {
        type: "spring",
        stiffness: 500
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden group border border-gray-100 relative"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          variants={imageVariants}
          animate={isHovered ? "hover" : "visible"}
          src={product.image || '/images/default-perfume.png'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <motion.span 
              variants={badgeVariants}
              className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full"
            >
              NEW
            </motion.span>
          )}
          {product.discount && (
            <motion.span 
              variants={badgeVariants}
              className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"
            >
              -{product.discount}%
            </motion.span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          variants={wishlistVariants}
          animate={isWishlisted ? "liked" : "initial"}
          whileTap="tapped"
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full ${isWishlisted 
            ? 'bg-red-500 text-white' 
            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'}`}
        >
          <FaHeart className="w-5 h-5" />
        </motion.button>

        {/* Quick Add Overlay */}
        <motion.div 
          variants={overlayVariants}
          animate={isHovered ? "hover" : "hidden"}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl hover:bg-indigo-50 transition flex items-center justify-center space-x-2"
          >
            <FaShoppingBag /> <span>Add to Cart</span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
          >
            {product.category || 'Perfume'}
          </motion.span>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center space-x-1"
          >
            <FaStar className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-gray-700">{product.rating || '4.5'}</span>
          </motion.div>
        </div>
        
        <motion.h3 
          whileHover={{ color: "#4f46e5" }}
          className="text-xl font-bold text-gray-900 mb-2 line-clamp-1"
        >
          {product.name}
        </motion.h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description_short || 'Experience luxury with this exquisite fragrance.'}
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <motion.p 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-extrabold text-indigo-700"
            >
              {formatCurrency(product.price)}
            </motion.p>
            {product.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="p-3 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition"
          >
            <FaShoppingBag className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;