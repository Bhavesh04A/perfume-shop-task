import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaPinterest, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
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

  const socialIconVariants = {
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
      scale: 1.3,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  const subscribeButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(79, 70, 229, 0.4)"
    },
    tap: { scale: 0.95 },
    success: {
      scale: [1, 1.1, 1],
      backgroundColor: "#10b981",
      transition: {
        duration: 0.3
      }
    }
  };

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { label: "New Arrivals", path: "/shop?sort=new" },
        { label: "Bestsellers", path: "/shop?sort=bestseller" },
        { label: "Men's Collection", path: "/shop?category=Men" },
        { label: "Women's Collection", path: "/shop?category=Women" },
        { label: "Gift Sets", path: "/shop?category=Gift" },
        { label: "Sale", path: "/shop?sort=sale" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "FAQs", path: "/faq" },
        { label: "Shipping & Returns", path: "/shipping" },
        { label: "Contact Us", path: "/contact" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Track Order", path: "/track" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Our Story", path: "/about#story" },
        { label: "Careers", path: "/careers" },
        { label: "Press", path: "/press" },
        { label: "Sustainability", path: "/sustainability" },
        { label: "Store Locator", path: "/stores" },
      ]
    }
  ];

  const socialLinks = [
    { icon: FaInstagram, color: '#E1306C', url: 'https://instagram.com' },
    { icon: FaTwitter, color: '#1DA1F2', url: 'https://twitter.com' },
    { icon: FaFacebook, color: '#1877F2', url: 'https://facebook.com' },
    { icon: FaYoutube, color: '#FF0000', url: 'https://youtube.com' },
    { icon: FaPinterest, color: '#E60023', url: 'https://pinterest.com' },
  ];

  const contactInfo = [
    { icon: FaPhone, text: '+91 98765 43210', href: 'tel:+919876543210' },
    { icon: FaEnvelope, text: 'support@scentlux.in', href: 'mailto:support@scentlux.in' },
    { icon: FaMapMarkerAlt, text: '123 Fragrance Lane, Pune, India', href: 'https://maps.google.com' },
  ];

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-4xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              >
                ScentLux
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Experience luxury in every drop. We bring you the finest fragrances 
              from around the world, curated for the discerning individual.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5, color: '#a78bfa' }}
                  className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <info.icon className="w-4 h-4" />
                  <span className="text-sm">{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div 
              key={section.title} 
              variants={itemVariants}
              custom={sectionIndex}
            >
              <h4 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (sectionIndex * 0.2) + (linkIndex * 0.05) }}
                  >
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="flex items-center"
                      >
                        <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 md:col-span-2">
            <h4 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Join Our Fragrance Club
            </h4>
            <p className="text-gray-400 mb-6 text-sm">
              Subscribe to get exclusive offers, new arrivals, and 15% off your first order.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 pr-32"
                />
                <motion.button
                  variants={subscribeButtonVariants}
                  initial="initial"
                  whileHover={subscribed ? "success" : "hover"}
                  whileTap="tap"
                  animate={subscribed ? "success" : "initial"}
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-2 px-6 rounded-lg"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </motion.button>
              </div>
              
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm"
                >
                  🎉 Thank you for subscribing! Check your email for confirmation.
                </motion.p>
              )}
            </form>

            {/* Social Media */}
            <div className="mt-8">
              <p className="text-gray-400 mb-4 text-sm">Follow us on social media</p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    custom={index}
                    variants={socialIconVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                    className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                    style={{ color: social.color }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8"
        />

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800"
        >
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-red-500"
            >
              <FaHeart />
            </motion.span>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ScentLux. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <motion.a 
              whileHover={{ color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              whileHover={{ color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a 
              whileHover={{ color: '#fff' }}
              href="#"
              className="hover:text-white transition-colors"
            >
              Cookies
            </motion.a>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-8 border-t border-gray-800"
        >
          {['Secure Payment', 'Free Shipping', '100% Authentic', '24/7 Support'].map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="flex items-center space-x-2 text-gray-400 text-sm"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-32 h-32 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
            style={{
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
          />
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;