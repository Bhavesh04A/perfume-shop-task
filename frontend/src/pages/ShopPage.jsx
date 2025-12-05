import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { FaFilter, FaSort, FaSearch, FaTimes, FaTag, FaFire, FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [categories, setCategories] = useState(['All', 'Men', 'Women', 'Unisex', 'Luxury', 'Fresh']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const allProducts = response.data;
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Enhanced fallback data
        const fallbackProducts = [
          { _id: '1', name: 'Velvet Dusk', price: 9500, description_short: 'Rich notes of amber and vanilla', image: '/images/velvetdusk.png', category: 'Women', rating: 4.8, tags: ['Bestseller', 'Luxury'] },
          { _id: '2', name: 'Aqua Fresh', price: 6250, description_short: 'Cool, crisp oceanic fragrance', image: '/images/aquafresh.png', category: 'Unisex', rating: 4.5, tags: ['Fresh', 'Summer'] },
          { _id: '3', name: 'Rose Gardenia', price: 11099, description_short: 'Classic floral bouquet', image: '/images/rosegardenia.png', category: 'Women', rating: 4.9, tags: ['Floral', 'Romantic'] },
          { _id: '4', name: 'Leather Smoke', price: 12500, description_short: 'Bold, smoky masculine scent', image: '/images/leathersmoke.png', category: 'Men', rating: 4.7, tags: ['Masculine', 'Winter'] },
          { _id: '5', name: 'Green Tea Zen', price: 4999, description_short: 'Calming citrus-green tea blend', image: '/images/greenteazen.png', category: 'Unisex', rating: 4.6, tags: ['Fresh', 'Day Wear'] },
          { _id: '6', name: 'Midnight Orchid', price: 8999, description_short: 'Mysterious floral with woody notes', image: '/images/velvetdusk.png', category: 'Women', rating: 4.8, tags: ['Evening', 'Luxury'] },
          { _id: '7', name: 'Citrus Zest', price: 7499, description_short: 'Fresh and energizing citrus burst', image: '/images/aquafresh.png', category: 'Unisex', rating: 4.4, tags: ['Fresh', 'Energy'] },
          { _id: '8', name: 'Royal Oud', price: 15999, description_short: 'Luxurious woody oriental fragrance', image: '/images/leathersmoke.png', category: 'Men', rating: 4.9, tags: ['Luxury', 'Premium'] },
          { _id: '9', name: 'Ocean Breeze', price: 6999, description_short: 'Fresh marine and sea notes', image: '/images/aquafresh.png', category: 'Unisex', rating: 4.3, tags: ['Summer', 'Fresh'] },
          { _id: '10', name: 'Vanilla Dream', price: 8499, description_short: 'Sweet and comforting vanilla', image: '/images/velvetdusk.png', category: 'Women', rating: 4.7, tags: ['Sweet', 'Comfort'] },
          { _id: '11', name: 'Sandalwood Mystique', price: 11999, description_short: 'Earthy sandalwood with spices', image: '/images/leathersmoke.png', category: 'Unisex', rating: 4.8, tags: ['Woody', 'Spicy'] },
          { _id: '12', name: 'Jasmine Bloom', price: 7699, description_short: 'Pure jasmine floral essence', image: '/images/rosegardenia.png', category: 'Women', rating: 4.6, tags: ['Floral', 'Spring'] },
        ];
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description_short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply price range filter
    result = result.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Featured - default order
        break;
    }

    // Update active filters
    const filters = [];
    if (selectedCategory !== 'All') filters.push(`Category: ${selectedCategory}`);
    if (priceRange[0] > 0 || priceRange[1] < 50000) filters.push(`Price: ₹${priceRange[0]} - ₹${priceRange[1]}`);
    if (searchQuery) filters.push(`Search: "${searchQuery}"`);
    setActiveFilters(filters);

    setFilteredProducts(result);
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([0, 50000]);
    setSortBy('featured');
    setSearchQuery('');
  };

  const removeFilter = (filterIndex) => {
    const filter = activeFilters[filterIndex];
    if (filter.startsWith('Category:')) {
      setSelectedCategory('All');
    } else if (filter.startsWith('Price:')) {
      setPriceRange([0, 50000]);
    } else if (filter.startsWith('Search:')) {
      setSearchQuery('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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

  const filterPanelVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
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
          <p className="text-lg text-gray-600">Loading our fragrance collection...</p>
        </div>
      </div>
    );
  }

  const tags = ['Bestseller', 'Luxury', 'Fresh', 'Floral', 'Summer', 'Winter', 'New'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 title-font">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Your</span> Scent
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Explore our exclusive collection of luxury fragrances
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Search and Filter Bar */}
          <motion.div variants={itemVariants} className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  placeholder="Search perfumes by name, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
                />
                {searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </motion.button>
                )}
              </div>

              {/* Filter Controls */}
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200"
                >
                  <FaFilter /> Filters
                </motion.button>

                <div className="relative">
                  <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <motion.select
                    whileFocus={{ scale: 1.02 }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 appearance-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="rating">Highest Rated</option>
                  </motion.select>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {activeFilters.map((filter, index) => (
                    <motion.button
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFilter(index)}
                      className="flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                    >
                      {filter}
                      <FaTimes className="w-3 h-3" />
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear All
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  variants={filterPanelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="mt-6 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 border border-gray-200 rounded-xl bg-gray-50">
                    {/* Categories */}
                    <div>
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FaTag /> Category
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                          <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full transition ${selectedCategory === category
                              ? 'bg-indigo-600 text-white shadow-lg'
                              : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400'
                              }`}
                          >
                            {category}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <h3 className="font-bold text-lg mb-4">
                        Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                      </h3>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max="50000"
                          step="1000"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>₹0</span>
                          <span>₹25,000</span>
                          <span>₹50,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tags */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <motion.button
                  key={tag}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full hover:shadow-md transition-shadow"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-bold text-indigo-600">{filteredProducts.length}</span> of{' '}
              <span className="font-bold">{products.length}</span> products
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white rounded-2xl shadow-lg"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                😔
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  custom={index}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center"
            >
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`px-4 py-2 rounded-lg ${page === 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShopPage;