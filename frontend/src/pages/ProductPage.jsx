import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaShareAlt, FaStar, FaFacebook, FaTwitter, FaEnvelope, FaShoppingBag, FaHeart, FaTruck, FaShieldAlt } from 'react-icons/fa';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { formatCurrency } from '../utils/currency';
import { motion, AnimatePresence } from 'framer-motion';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showShareDropdown, setShowShareDropdown] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const productData = response.data;
        setProduct(productData);
        setMainImage(productData.image_main || '/images/default-perfume-main.png');
        if (productData.available_sizes && productData.available_sizes.length > 0) {
          setSelectedSize(productData.available_sizes[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback data
        const fallbackProduct = {
          _id: id,
          name: 'Velvet Dusk',
          brand: 'ScentLux Exclusive',
          price: 9500,
          description_full: 'A sophisticated blend of amber and vanilla with hints of bergamot and sandalwood. This exquisite fragrance unfolds with citrusy top notes that gradually reveal a warm, sensual heart of jasmine and rose, settling into a rich base of vanilla, musk, and precious woods.\n\nPerfect for evening wear and special occasions, Velvet Dusk leaves a lasting impression that evolves beautifully throughout the day.',
          image_main: '/images/velvetdusk.png',
          image_gallery: ['/images/velvetdusk.png', '/images/velvetdusk-alt1.png', '/images/velvetdusk-alt2.png'],
          available_sizes: ['30ml', '50ml', '100ml'],
          category: 'Women',
          rating: 4.8,
          reviews: [
            { user: 'Priya Sharma', rating: 5, comment: 'Absolutely love this! The scent lasts all day.', date: '2024-01-15' },
            { user: 'Raj Mehta', rating: 4, comment: 'Great gift for my wife. She adores it!', date: '2024-01-10' },
            { user: 'Ananya Reddy', rating: 5, comment: 'The perfect evening fragrance. Highly recommend!', date: '2024-01-05' },
          ]
        };
        setProduct(fallbackProduct);
        setMainImage(fallbackProduct.image_main);
        setSelectedSize(fallbackProduct.available_sizes[0]);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleReviewAdded = (newReview) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      reviews: [newReview, ...prevProduct.reviews]
    }));
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} at ScentLux!`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
    setShowShareDropdown(false);
  };

  const addToCart = () => {
    // Add to cart logic here
    alert(`Added ${quantity} x ${product.name} (${selectedSize}) to cart!`);
  };

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

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const wishlistVariants = {
    initial: { scale: 1 },
    liked: {
      scale: [1, 1.3, 1],
      color: "#ef4444",
      transition: {
        duration: 0.3
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-16 w-16 mb-4 border-4 border-indigo-600 border-t-transparent rounded-full"
          />
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl mb-4"
        >
          😔
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const allImages = [product.image_main, ...(product.image_gallery || [])].filter(img => img);
  const avgRating = product.reviews?.length > 0
    ? (product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length).toFixed(1)
    : '0.0';

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="w-5 h-5 text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        {/* Images Gallery */}
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative overflow-hidden rounded-2xl shadow-xl bg-white"
          >
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
            <motion.button
              variants={wishlistVariants}
              animate={isWishlisted ? "liked" : "initial"}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
            >
              <FaHeart className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-600'}`} />
            </motion.button>
          </motion.div>

          {/* Gallery Thumbnails */}
          <div className="flex space-x-3 overflow-x-auto py-2">
            {allImages.map((imgUrl, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMainImage(imgUrl)}
                className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${imgUrl === mainImage
                  ? 'border-indigo-600 ring-2 ring-indigo-300'
                  : 'border-gray-200 hover:border-indigo-400'
                  }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product Details */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{product.category || 'Perfume'}</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 font-serif mb-4">{product.brand || 'ScentLux Exclusive'}</p>

            <div className="flex items-center space-x-4 mb-6">
              {renderStars(parseFloat(avgRating))}
              <span className="text-lg font-bold text-gray-700">{avgRating}</span>
              <span className="text-gray-500">({product.reviews?.length || 0} reviews)</span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold text-indigo-600 mb-8"
            >
              {formatCurrency(product.price)}
            </motion.p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">About the Scent</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description_full || 'No description available.'}
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <motion.div whileHover={{ y: -5 }} className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
              <FaTruck className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium">Free Shipping</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
              <FaShieldAlt className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium">Authentic</span>
            </motion.div>
          </div>

          {/* Size Selection */}
          {product.available_sizes && product.available_sizes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-medium text-gray-700">Select Size</h4>
              <div className="flex flex-wrap gap-3">
                {product.available_sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${selectedSize === size
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <span className="text-xl font-bold">−</span>
                </motion.button>
                <span className="px-6 py-3 text-xl font-bold">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100"
                >
                  <span className="text-xl font-bold">+</span>
                </motion.button>
              </div>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareDropdown(!showShareDropdown)}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl"
                >
                  <FaShareAlt className="w-6 h-6 text-gray-600" />
                </motion.button>

                <AnimatePresence>
                  {showShareDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 min-w-[150px] overflow-hidden"
                    >
                      <button onClick={() => handleShare('facebook')} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50">
                        <FaFacebook className="mr-3 text-blue-600" /> Facebook
                      </button>
                      <button onClick={() => handleShare('twitter')} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50">
                        <FaTwitter className="mr-3 text-blue-400" /> Twitter
                      </button>
                      <button onClick={() => handleShare('email')} className="flex items-center w-full px-4 py-3 text-left hover:bg-gray-50">
                        <FaEnvelope className="mr-3 text-gray-600" /> Email
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addToCart}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
            >
              <FaShoppingBag className="w-6 h-6" />
              <span className="text-lg">Add to Cart - {formatCurrency(product.price * quantity)}</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 space-y-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ReviewForm productId={id} onReviewAdded={handleReviewAdded} />
          </div>
          <div className="lg:col-span-2">
            <ReviewList reviews={product.reviews || []} />
          </div>
        </div>
      </motion.div>

      {/* Related Products Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-8">You May Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 shadow-sm"
            >
              <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductPage;