import { motion } from 'framer-motion';

export default function SkeletonCard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0.5, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const shimmerVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Image Placeholder */}
      <motion.div
        variants={itemVariants}
        className="w-full h-64 relative overflow-hidden"
      >
        <motion.div
          variants={shimmerVariants}
          animate="animate"
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          style={{ 
            backgroundSize: '200% 200%',
          }}
        />
      </motion.div>
      
      <div className="p-5 space-y-3">
        {/* Title Placeholder */}
        <motion.div
          variants={itemVariants}
          className="h-4 rounded w-3/4 relative overflow-hidden"
        >
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
            style={{ 
              backgroundSize: '200% 200%',
            }}
          />
        </motion.div>
        
        {/* Description Placeholder */}
        <motion.div
          variants={itemVariants}
          className="h-3 rounded w-full relative overflow-hidden"
        >
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
            style={{ 
              backgroundSize: '200% 200%',
            }}
          />
        </motion.div>
        
        {/* Rating Placeholder */}
        <motion.div
          variants={itemVariants}
          className="h-3 rounded w-1/2 relative overflow-hidden"
        >
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
            style={{ 
              backgroundSize: '200% 200%',
            }}
          />
        </motion.div>
        
        {/* Price Placeholder */}
        <motion.div
          variants={itemVariants}
          className="h-5 rounded w-1/4 mt-4 relative overflow-hidden"
        >
          <motion.div
            variants={shimmerVariants}
            animate="animate"
            className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"
            style={{ 
              backgroundSize: '200% 200%',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}