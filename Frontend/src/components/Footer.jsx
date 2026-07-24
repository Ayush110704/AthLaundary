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

// ============================================
// WATER EFFECT COMPONENTS 
// ============================================

// // Water drop particle component
// const WaterDrop = ({ x, y, size, delay, duration, color }) => {
//   return (
//     <motion.div
//       className="absolute rounded-full pointer-events-none"
//       style={{
//         width: size,
//         height: size,
//         left: x,
//         top: y,
//         background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}10)`,
//         boxShadow: `0 0 ${size * 2}px ${color}20, inset 0 0 ${size}px ${color}30`,
//       }}
//       initial={{ opacity: 0, y: 0, scale: 0.5 }}
//       animate={{
//         opacity: [0, 0.8, 0.6, 0.8, 0],
//         y: [0, -30, -60, -90, -120],
//         x: [0, 10, -5, 8, -10],
//         scale: [0.5, 1.2, 1, 0.8, 0.3],
//       }}
//       transition={{
//         duration: duration,
//         delay: delay,
//         repeat: Infinity,
//         ease: "easeOut",
//       }}
//     >
//       {/* Inner glow */}
//       <motion.div
//         className="absolute inset-0 rounded-full"
//         style={{
//           background: `radial-gradient(circle at 40% 30%, ${color}80, transparent 70%)`,
//         }}
//         animate={{
//           scale: [1, 1.3, 1],
//           opacity: [0.3, 0.6, 0.3],
//         }}
//         transition={{
//           duration: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//     </motion.div>
//   );
// };

// // Water ripple effect
// const WaterRipple = ({ x, y, size, delay }) => {
//   return (
//     <motion.div
//       className="absolute rounded-full pointer-events-none border border-blue-400/20"
//       style={{
//         width: size,
//         height: size,
//         left: x - size / 2,
//         top: y - size / 2,
//       }}
//       initial={{ scale: 0, opacity: 0.8 }}
//       animate={{
//         scale: [0, 1.5, 3],
//         opacity: [0.8, 0.4, 0],
//         borderWidth: [2, 1, 0.5],
//       }}
//       transition={{
//         duration: 4,
//         delay: delay,
//         repeat: Infinity,
//         ease: "easeOut",
//       }}
//     />
//   );
// };

// // Water splash effect
// const WaterSplash = ({ x, y, delay }) => {
//   const droplets = 8;
//   return (
//     <>
//       {[...Array(droplets)].map((_, i) => {
//         const angle = (i / droplets) * Math.PI * 2;
//         const distance = 20 + Math.random() * 30;
//         const dx = Math.cos(angle) * distance;
//         const dy = Math.sin(angle) * distance - 20;
        
//         return (
//           <motion.div
//             key={i}
//             className="absolute w-1 h-1 rounded-full bg-blue-300/40 pointer-events-none"
//             style={{
//               left: x,
//               top: y,
//             }}
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{
//               opacity: [0, 1, 0],
//               scale: [0, 2, 0.5],
//               x: [0, dx],
//               y: [0, dy],
//             }}
//             transition={{
//               duration: 1.5,
//               delay: delay + (i * 0.05),
//               repeat: Infinity,
//               repeatDelay: 3,
//               ease: "easeOut",
//             }}
//           />
//         );
//       })}
//     </>
//   );
// };

function Footer() {
  const services= [
        { label: "Laundry Service", path: "/services/Laundry-service" },

        { label: "Dry Cleaning", path: "/services/DryClean-service" },

        { label: "Ironing", path: "/services/Ironing-service" },

        { label: "Carpet Cleaning", path: "/services/CarpetCleaning-service" },

        { label: "Shoe Cleaning", path: "/services/ShoeCleaning-service" },

        { label: "Curtain Cleaning", path: "/services/CurtainCleaning-service" },

      ];

  const companyLinks = ["About Us", "Terms & Conditions", "FAQs"];

  // ============================================
  // WATER EFFECT DATA 
  // ============================================
  
  // // Generate random water drops
  // const waterDrops = [
  //   { x: "5%", y: "10%", size: 12, delay: 0, duration: 4, color: "#60A5FA" },
  //   { x: "15%", y: "30%", size: 8, delay: 1, duration: 5, color: "#93C5FD" },
  //   { x: "25%", y: "60%", size: 15, delay: 2, duration: 4.5, color: "#3B82F6" },
  //   { x: "35%", y: "80%", size: 10, delay: 0.5, duration: 5.5, color: "#60A5FA" },
  //   { x: "45%", y: "20%", size: 6, delay: 1.5, duration: 4, color: "#93C5FD" },
  //   { x: "55%", y: "50%", size: 14, delay: 3, duration: 4.8, color: "#3B82F6" },
  //   { x: "65%", y: "70%", size: 9, delay: 0.8, duration: 5.2, color: "#60A5FA" },
  //   { x: "75%", y: "15%", size: 11, delay: 2.5, duration: 4.2, color: "#93C5FD" },
  //   { x: "85%", y: "45%", size: 7, delay: 1.8, duration: 5.8, color: "#3B82F6" },
  //   { x: "92%", y: "85%", size: 13, delay: 3.5, duration: 4.6, color: "#60A5FA" },
  //   { x: "10%", y: "90%", size: 8, delay: 4, duration: 5, color: "#93C5FD" },
  //   { x: "50%", y: "10%", size: 10, delay: 2.2, duration: 4.3, color: "#3B82F6" },
  //   { x: "70%", y: "90%", size: 6, delay: 3.8, duration: 5.5, color: "#60A5FA" },
  //   { x: "30%", y: "40%", size: 9, delay: 1.2, duration: 4.7, color: "#93C5FD" },
  //   { x: "88%", y: "30%", size: 12, delay: 2.8, duration: 4.9, color: "#3B82F6" },
  // ];

  // // Ripples
  // const ripples = [
  //   { x: "20%", y: "30%", size: 40, delay: 0 },
  //   { x: "50%", y: "70%", size: 50, delay: 2 },
  //   { x: "80%", y: "25%", size: 35, delay: 4 },
  //   { x: "35%", y: "85%", size: 45, delay: 1 },
  //   { x: "65%", y: "40%", size: 30, delay: 3 },
  // ];

  // // Splashes
  // const splashes = [
  //   { x: "15%", y: "50%", delay: 0 },
  //   { x: "40%", y: "20%", delay: 2 },
  //   { x: "60%", y: "80%", delay: 4 },
  //   { x: "85%", y: "55%", delay: 1 },
  // ];

  return (
    <footer className="bg-[#0a1628] text-white relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0f1f3d] to-[#0a1628]"
        variants={gradientVariants}
        animate="animate"
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* ========================================== */}
      {/* WATER EFFECTS LAYER */}
      {/* ========================================== */}
      
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {waterDrops.map((drop, index) => (
          <WaterDrop key={index} {...drop} />
        ))}
        
        Water ripples
        {ripples.map((ripple, index) => (
          <WaterRipple key={`ripple-${index}`} {...ripple} />
        ))}
        
        Water splashes
        {splashes.map((splash, index) => (
          <WaterSplash key={`splash-${index}`} {...splash} />
        ))}
      </div> */}

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
              <motion.div
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                custom={0}
              >
                <a href="https://x.com/athenura_in" target="_blank">
                <FaXTwitter className="text-white group-hover:rotate-12 transition-transform duration-300" />
              </a>
              </motion.div>

              <motion.div
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                custom={1}
               
              >
                <a  href="https://www.linkedin.com/company/athenura/posts/?feedView=all"
                target="_blank">
                <FaLinkedinIn className="text-white group-hover:rotate-12 transition-transform duration-300 text-lg" />
             </a> 
             </motion.div>

              <motion.div
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:shadow-lg hover:shadow-pink-500/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                custom={2}
              >
                <a href="https://www.instagram.com/athenura.in?igsh=MXg4MWtrenA2ZHF4Zw=="
                target="_blank"
                >
                
              <FaInstagram className="text-white group-hover:rotate-12 transition-transform duration-300 text-lg" />
              </a>
              </motion.div>

              <motion.div
                className="group w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/30"
                variants={socialIconVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                custom={3}
              >
                <a href="https://www.youtube.com/@Athenura" target="_blank">
                <FaYoutube className="text-white group-hover:rotate-12 transition-transform duration-300" />
             </a>
              </motion.div>
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
                  custom={index}
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
                <span className="group-hover:underline decoration-blue-400 underline-offset-2">
                  official@athenura.in
                </span>
              </motion.div>

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
                <span className="group-hover:underline decoration-green-400 underline-offset-2">
                  +91 98350 51934
                </span>
              </motion.div>

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
                <span className="group-hover:underline decoration-red-400 underline-offset-2">
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