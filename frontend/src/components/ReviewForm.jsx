import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    if (!user || !comment || !rating) {
        setError('Please provide your name, a rating, and a comment.');
        setIsSubmitting(false);
        return;
    }

    try {
      const { data } = await axios.post(`http://localhost:5000/api/products/${productId}/reviews`, {
        user,
        rating,
        comment,
      });

      onReviewAdded(data); 
      setSuccess('Thank you! Your review has been submitted.');
      
      // Clear the form
      setUser('');
      setComment('');
      setRating(5); 

    } catch (err) {
      setError('Failed to submit review. Server error.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
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
    }),
    hover: {
      scale: 1.2,
      transition: {
        type: "spring",
        stiffness: 400
      }
    },
    tapped: {
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)"
    },
    tap: { scale: 0.98 },
    loading: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100"
    >
      <h3 className="text-2xl font-bold mb-5 text-indigo-700">Write a Review</h3>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm overflow-hidden"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="bg-green-100 border border-green-400 text-green-700 p-3 rounded mb-4 text-sm overflow-hidden"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={submitHandler}>
        <motion.div 
          className="mb-4"
          whileFocus="focus"
        >
          <label htmlFor="user" className="block text-sm font-medium text-gray-700">Your Name</label>
          <motion.input 
            whileFocus="focus"
            variants={inputVariants}
            type="text" 
            id="user" 
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:border-indigo-500"
            required 
            placeholder="John Doe"
            disabled={isSubmitting}
          />
        </motion.div>

        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
          <div className="flex space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                custom={star}
                variants={starVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tapped"
              >
                <FaStar 
                  className={`cursor-pointer w-7 h-7 ${star <= rating ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300 hover:text-gray-400'}`}
                  onClick={() => !isSubmitting && setRating(star)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="mb-6"
          whileFocus="focus"
        >
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
          <motion.textarea 
            whileFocus="focus"
            variants={inputVariants}
            id="comment" 
            rows="4" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:border-indigo-500"
            required 
            placeholder="This perfume is..."
            disabled={isSubmitting}
          ></motion.textarea>
        </motion.div>

        <motion.button 
          variants={buttonVariants}
          initial="initial"
          whileHover={isSubmitting ? "loading" : "hover"}
          whileTap="tap"
          animate={isSubmitting ? "loading" : "initial"}
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Submitting...
            </motion.span>
          ) : (
            "Submit Review"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};




export default ReviewForm;