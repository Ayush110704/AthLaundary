import React from "react";
import AthenuraLogo from "../assets/Athenura.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: {
    y: -8,
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};

const gradientVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

function Footer() {
  const services = [
    { label: "Laundry Service", path: "/services/Laundry-service" },
    { label: "Dry Cleaning", path: "/services/DryClean-service" },
    { label: "Ironing", path: "/services/Ironing-service" },
    { label: "Carpet Cleaning", path: "/services/CarpetCleaning-service" },
    { label: "Shoe Cleaning", path: "/services/ShoeCleaning-service" },
    { label: "Curtain Cleaning", path: "/services/CurtainCleaning-service" },
  ];

  return (
    <footer className="bg-[#0a1628] text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0f1f3d] to-[#0a1628]"
        variants={gradientVariants}
        animate="animate"
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <motion.div
          className="grid md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants}>
            <motion.img
              src={AthenuraLogo}
              alt="Athenura Logo"
              className="w-56 h-auto brightness-0 invert filter"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <motion.p
              className="mt-5 text-gray-300 text-sm leading-7 max-w-[250px]"
              variants={itemVariants}
            >
              Your trusted laundry and dry cleaning partner. Premium garment
              care with free pickup and fast doorstep delivery.
            </motion.p>

            {/* Social Icons */}
            <motion.div className="flex gap-3 mt-5" variants={itemVariants}>
              {/* Twitter/X */}
              <motion.a
                href="https://x.com/athenura_in"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                <FaXTwitter className="text-white group-hover:rotate-12 transition-transform duration-300" />
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/company/athenura/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                <FaLinkedinIn className="text-white group-hover:rotate-12 transition-transform duration-300 text-lg" />
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/athenura.in?igsh=MXg4MWtrenA2ZHF4Zw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:shadow-lg hover:shadow-pink-500/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                <FaInstagram className="text-white group-hover:rotate-12 transition-transform duration-300 text-lg" />
              </motion.a>

              {/* YouTube */}
              <motion.a
                href="https://www.youtube.com/@Athenura"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
              >
                <FaYoutube className="text-white group-hover:rotate-12 transition-transform duration-300" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-xl font-semibold text-white mb-4 relative inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Services
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  className="hover:text-blue-400 cursor-pointer relative group"
                  variants={slideInLeftVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="absolute left-0 top-1/2 w-1 h-1 bg-blue-400 rounded-full -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="inline-block"
                    whileHover={{ paddingLeft: "12px" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={service.path}>{service.label}</Link>
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-xl font-semibold text-white mb-4 relative inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Quick Links
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.h3>

            <ul className="space-y-3 text-gray-300 text-sm">
              <Link to="/About">
                <motion.li
                  className="hover:text-blue-400 cursor-pointer mb-4"
                  variants={slideInLeftVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  About Us
                </motion.li>
              </Link>
              <Link to="/Services">
                <motion.li
                  className="hover:text-blue-400 cursor-pointer mb-4"
                  variants={slideInLeftVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  Services
                </motion.li>
              </Link>
              <Link to="/user-terms">
                <motion.li
                  className="hover:text-blue-400 cursor-pointer mb-4"
                  variants={slideInLeftVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  Terms & Conditions
                </motion.li>
              </Link>
              <Link to="/FAQ">
                <motion.li
                  className="hover:text-blue-400 cursor-pointer mb-4"
                  variants={slideInLeftVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  FAQs
                </motion.li>
              </Link>
              <Link to="/Contact">
                <motion.li
                  className="hover:text-blue-400 cursor-pointer mb-4"
                  variants={slideInLeftVariants}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                >
                  Contact Us
                </motion.li>
              </Link>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-xl font-semibold text-white mb-4 relative inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Contact Us
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-blue-400"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.h3>

            <div className="space-y-4 text-gray-300 text-sm">
              {/* Email */}
              <motion.div
                className="flex gap-3 items-start group cursor-pointer hover:text-blue-400 transition-colors duration-300"
                variants={slideInLeftVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaEnvelope className="text-blue-400 mt-1" />
                </motion.div>
                <div className="flex flex-col"> 
                  <a
                    href="mailto:official@athenura.in"
                    className="hover:underline decoration-blue-400 underline-offset-2"
                  >
                    official@athenura.in
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                className="flex gap-3 items-start group cursor-pointer hover:text-green-400 transition-colors duration-300"
                variants={slideInLeftVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaPhoneAlt className="text-green-400 mt-1" />
                </motion.div>
                <div className="flex flex-col">
                  
                  <a
                    href="tel:+919835051934"
                    className="hover:underline decoration-green-400 underline-offset-2"
                  >
                    +91 98350 51934
                  </a>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                className="flex gap-3 items-start group cursor-pointer hover:text-red-400 transition-colors duration-300"
                variants={slideInLeftVariants}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaMapMarkerAlt className="text-red-400 mt-1" />
                </motion.div>
                <span className="hover:underline decoration-red-400 underline-offset-2">
                  Sector 62, Noida, Uttar Pradesh
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-white/10 mt-8 pt-4 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.p
            className="hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            © 2026 ATHENURA. All Rights Reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;