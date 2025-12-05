import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaPaperPlane, FaClock, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      transition: { duration: 0.2 }
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

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Visit Our Store',
      details: '123 Fragrance Lane, Pune, Maharashtra, India',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Us',
      details: 'support@scentlux.in',
      color: 'text-purple-500',
      bg: 'bg-purple-50'
    },
    {
      icon: <FaPhone />,
      title: 'Call Us',
      details: '+91 98765 43210',
      color: 'text-green-500',
      bg: 'bg-green-50'
    },
    {
      icon: <FaClock />,
      title: 'Business Hours',
      details: 'Mon-Sat: 10AM - 8PM\nSunday: 12PM - 6PM',
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    },
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
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 title-font">
              Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              We're here to help with all your fragrance questions
            </p>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-lg"
              style={{
                right: `${10 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            {/* Contact Info Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`${info.bg} p-6 rounded-2xl border border-gray-100 shadow-lg`}
                >
                  <div className={`text-3xl mb-4 ${info.color}`}>
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{info.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form & Map */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
              >
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <FaHeadset className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Send Us a Message</h2>
                    <p className="text-gray-600">We usually respond within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div whileFocus="focus">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.div whileFocus="focus">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <motion.input
                      variants={inputVariants}
                      whileFocus="focus"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.div whileFocus="focus">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <motion.textarea
                      variants={inputVariants}
                      whileFocus="focus"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Tell us about your fragrance preferences or ask a question..."
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover={isSubmitting ? "loading" : "hover"}
                    whileTap="tap"
                    animate={isSubmitting ? "loading" : "initial"}
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="flex items-center justify-center"
                      >
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </motion.span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </span>
                    )}
                  </motion.button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl text-center"
                    >
                      ✅ Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                </form>
              </motion.div>

              {/* Map & FAQ */}
              <motion.div variants={itemVariants}>
                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 h-full flex flex-col">
                  <div className="flex-1 rounded-xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-64 md:h-80 w-full rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <FaMapMarkerAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-semibold">Pune, Maharashtra</p>
                        <p className="text-gray-500">123 Fragrance Lane</p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked</h3>
                    <div className="space-y-4">
                      {[
                        { q: 'What is your return policy?', a: '30-day return policy on unopened products' },
                        { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide with tracking' },
                        { q: 'How do I choose a fragrance?', a: 'Use our scent quiz or contact our experts' },
                      ].map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white p-4 rounded-xl border border-gray-100"
                        >
                          <h4 className="font-bold text-gray-800 mb-2">{faq.q}</h4>
                          <p className="text-gray-600">{faq.a}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 md:p-12 text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Immediate Assistance?</h3>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Call us now for personalized fragrance recommendations
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white text-indigo-600 font-bold py-3 px-8 rounded-full shadow-lg"
              >
                <FaPhone className="mr-2" />
                +91 98765 43210
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;