import React from 'react';
import { FaHeart, FaTruck, FaShieldAlt, FaGem, FaUsers, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      y: -10,
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  const features = [
    { icon: <FaHeart />, title: '100% Authentic', desc: 'Guaranteed genuine perfumes', color: 'text-pink-500' },
    { icon: <FaTruck />, title: 'Free Shipping', desc: 'On orders above ₹2000', color: 'text-indigo-500' },
    { icon: <FaShieldAlt />, title: 'Secure Packaging', desc: 'Safe delivery guaranteed', color: 'text-green-500' },
    { icon: <FaGem />, title: 'Premium Quality', desc: 'Luxury fragrances only', color: 'text-yellow-500' },
  ];

  const team = [
    { name: 'Aarav Sharma', role: 'Master Perfumer', desc: '20+ years in fragrance creation' },
    { name: 'Priya Patel', role: 'Quality Control', desc: 'Ensuring perfection in every bottle' },
    { name: 'Raj Malhotra', role: 'Customer Experience', desc: 'Dedicated to your satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 title-font">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Story</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Where passion for fragrance meets luxury experience
            </p>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-lg"
              style={{
                left: `${10 + i * 20}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                The Essence of <span className="text-indigo-600">ScentLux</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We believe that a single scent can define a memory, an emotion, and a moment. 
                ScentLux is dedicated to sourcing the finest, most unique fragrances from around the world.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Philosophy</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Every perfume tells a story. Our collection ranges from classic timeless scents 
                  to modern, limited-edition artisanal creations, each carefully curated to evoke 
                  emotions and create lasting memories.
                </p>
                <p className="text-lg text-gray-600">
                  Our commitment is to provide a luxurious shopping experience with guaranteed 
                  authenticity and superior customer service that makes you feel special.
                </p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 p-8 flex items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-center"
                  >
                    <FaGem className="w-24 h-24 text-indigo-500 mx-auto mb-4" />
                    <p className="text-xl font-bold text-gray-800">Luxury in Every Drop</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Why Choose Us</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={featureVariants}
                    whileHover="hover"
                    className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg text-center"
                  >
                    <div className={`text-4xl mb-4 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Team Section */}
            <motion.div variants={itemVariants} className="mt-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Meet Our Experts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10 }}
                    className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg text-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <FaUsers className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                    <p className="text-indigo-600 font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-600">{member.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="mt-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 md:p-12"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: '5000+', label: 'Happy Customers' },
                  { value: '200+', label: 'Exclusive Scents' },
                  { value: '50+', label: 'Brand Partners' },
                  { value: '24/7', label: 'Support' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-indigo-100">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;