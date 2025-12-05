import React from 'react';
import { FaStar } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewList = ({ reviews }) => {
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

    const reviewVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        },
        hover: {
            y: -4,
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            transition: {
                type: "spring",
                stiffness: 400
            }
        }
    };

    const starVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: (i) => ({
            scale: 1,
            rotate: 0,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 200
            }
        })
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <motion.div
                    key={i}
                    custom={i}
                    variants={starVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <FaStar 
                        className={`w-4 h-4 ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                    />
                </motion.div>
            );
        }
        return <motion.div className="flex space-x-0.5">{stars}</motion.div>;
    };
    
    // Sort by newest first
    const sortedReviews = reviews.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    if (!reviews || reviews.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-gray-500 p-6 border border-dashed rounded-lg text-center bg-gray-50"
            >
                <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl mb-2"
                >
                    💭
                </motion.div>
                No reviews yet. Be the first to share your thoughts!
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <AnimatePresence>
                {sortedReviews.map((review, index) => (
                    <motion.div
                        key={index}
                        variants={reviewVariants}
                        whileHover="hover"
                        className="border-b pb-4 last:border-b-0 bg-white p-4 rounded-xl border border-gray-100"
                        layout
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <motion.p 
                                className="font-bold text-gray-800"
                                whileHover={{ scale: 1.05 }}
                            >
                                {review.user || 'Anonymous User'}
                            </motion.p>
                            <motion.p 
                                className="text-sm text-gray-500"
                                whileHover={{ scale: 1.05 }}
                            >
                                {new Date(review.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            </motion.p>
                        </div>
                        
                        <motion.div 
                            className="mb-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            {renderStars(review.rating)}
                        </motion.div>
                        
                        <motion.p 
                            className="text-gray-600 italic leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            "{review.comment}"
                        </motion.p>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default ReviewList;