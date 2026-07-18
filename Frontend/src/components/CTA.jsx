import { ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTA = ({ headingtop, headingbottom, subHeading }) => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
      >
       
        {/* <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" /> */}

        
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-16 top-1/2 h-52 w-52 rounded-full bg-white/10 blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-16 -top-12 h-48 w-48 rounded-full bg-cyan-300/10 blur-3xl"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14 text-center">
         

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            {headingtop}

            <span className="block bg-linear-to-r from-cyan-300 to-blue-100 bg-clip-text text-transparent">
              {headingbottom}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base lg:text-lg"
          >
            {subHeading}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            {/* Primary Button */}
            <motion.button
              onClick={() => navigate("/checkout")}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-blue-900 shadow-lg transition-all hover:shadow-xl sm:w-auto"
            >
              Book Pickup

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.button>

            {/* Secondary Button */}
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:w-auto"
            >
              <Phone size={18} />
              Contact Us
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;