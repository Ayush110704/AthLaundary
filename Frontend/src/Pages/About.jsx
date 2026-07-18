import React from "react";
import {
  FaLeaf,
  FaClock,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
  FaBullseye,
  FaEye,
  FaGem,
  FaHandshake,
  FaAward,
  FaHistory,
  FaTruck,
  FaSoap,
  FaClipboardCheck,
  FaWind,
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";

import heroImg from "../assets/About-Section/About-Hero.png";
import storyImg from "../assets/About-Section/AboutStory.png";
import whoWeAreImg from "../assets/About-Section/WhoWeWere-section.png";
import team1 from "../assets/About-Section/PersonFirst.png";
import team2 from "../assets/About-Section/PersonSecond.png";
import team3 from "../assets/About-Section/PersonThird.png";
import team4 from "../assets/About-Section/PersonFourth.png";

const values = [
  {
    icon: <FaShieldAlt className="text-[#0B4EA2] text-xl" />,
    title: "Clinical Hygiene",
    desc: "Our facilities operate at industry-grade standards, ensuring every fiber is sanitized and fresh.",
  },
  {
    icon: <FaLeaf className="text-[#00A6A6] text-xl" />,
    title: "Eco-First Care",
    desc: "We use 100% biodegradable detergents and water-recycling technologies to minimize our footprint.",
  },
  {
    icon: <FaClock className="text-[#0B4EA2] text-xl" />,
    title: "Zero Friction",
    desc: "Time is your most valuable asset. We optimize every step to ensure your laundry is a background task.",
  },
];

const whoWeAreCards = [
  {
    icon: <FaHandshake className="text-xl text-[#0B4EA2]" />,
    title: "Unwavering Trust",
    desc: "A reliable partnership protecting your luxury fabrics.",
    color: "bg-blue-50 text-[#0B4EA2]"
  },
  {
    icon: <FaAward className="text-xl text-[#00A6A6]" />,
    title: "Elite Standards",
    desc: "Rigorous attention to detail on every stitch and seam.",
    color: "bg-teal-50 text-[#00A6A6]"
  }
];

const processSteps = [
  {
    icon: <FaTruck className="text-xl text-[#0B4EA2]" />,
    title: "Doorstep Pickup",
    desc: "Book through our App/website or WhatsApp; our team collects your clothes safely and on schedule.",
    borderColor: "hover:border-[#0B4EA2]"
  },
  {
    icon: <FaSoap className="text-xl text-[#00A6A6]" />,
    title: "Sorting & Washing",
    desc: "Clothes are carefully sorted by color and fabric, cleaned with eco-detergents and German-grade machines for superior hygiene.",
    borderColor: "hover:border-[#00A6A6]"
  },
  {
    icon: <FaClipboardCheck className="text-xl text-[#0B4EA2]" />,
    title: "Drying & Quality Check",
    desc: "Temperature-controlled dryers and multi-stage inspections ensure wrinkle-free and odour-free results.",
    borderColor: "hover:border-[#0B4EA2]"
  },
  {
    icon: <FaWind className="text-xl text-[#00A6A6]" />,
    title: "Steam Ironing",
    desc: "Professional steam-press gives garments a crisp, ready-to-wear finish with zero fabric damage.",
    borderColor: "hover:border-[#00A6A6]"
  },
  {
    icon: <FaHome className="text-xl text-[#0B4EA2]" />,
    title: "Doorstep Delivery",
    desc: "On-time delivery with live tracking via our AI dashboard – freshness guaranteed.",
    borderColor: "hover:border-[#0B4EA2]"
  }
];

const teamMembers = [
  { img: team1, name: "Sarah Chen", role: "Operations Director" },
  { img: team2, name: "Marcus Miller", role: "Master Textile Specialist" },
  { img: team3, name: "Elena Rodriguez", role: "Customer Success Lead" },
  { img: team4, name: "David Park", role: "Logistics Coordinator" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const About = () => {
  return (
    <section className="bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          src={heroImg}
          alt="Laundry Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545]/80 via-[#0B4EA2]/40 to-black/50" />

        <div className="relative z-10 text-center max-w-6xl px-4 md:px-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white mb-6 overflow-hidden">
            {"Athenura Redefining Cleanliness".split(" ").map((word, wordIdx) => (
              <motion.span
                key={wordIdx}
                className="inline-block mr-[0.25em] last:mr-0"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: wordIdx * 0.15,
                    }
                  }
                }}
              >
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.4, ease: "easeOut" }
                      }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="text-base md:text-xl leading-relaxed text-white/85 max-w-2xl mx-auto font-light"
          >
            Where clinical precision meets personal care. Discover the mastery
            of the nation’s most trusted garment care service.
          </motion.p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* OUR STORY */}
      <section className="relative bg-white py-28 overflow-hidden border-b border-gray-100">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-[#00A6A6]/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Image Column */}
            <motion.div
              className="lg:col-span-5 order-2 lg:order-1 flex items-center justify-center relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-full rounded-[2rem] bg-slate-50/50 p-4 border border-slate-100 shadow-xl flex items-center justify-center overflow-hidden">
                <img
                  src={storyImg}
                  alt="Our Story - Full Uncropped View"
                  className="w-full h-auto max-h-[450px] object-contain rounded-2xl"
                />
              </div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              className="lg:col-span-7 order-1 lg:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-[#00A6A6] font-bold uppercase tracking-[4px] text-xs mb-3">
                Our Legacy
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold text-[#0B2545] leading-tight mb-6">
                Our Story
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed text-lg mb-6">
                We started as a modest local workshop with a single objective: to rescue textiles that traditional dry cleaners deemed unfixable. Driven by a deep appreciation for heritage fabrics and craft tailoring, we spent years refining localized cleaning sciences by hand.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed text-lg mb-8">
                Through careful observation and a strict refusal to rely on harsh chemical over-processing, those early days taught us the fundamentals of specialized fiber integrity. Our roots as a dedicated boutique studio established the standard of exact precision that shapes our large-scale operations today.
              </motion.p>

              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700">
                <FaHistory className="text-[#00A6A6]" /> Established on a foundation of traditional textile expertise.
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="relative bg-gradient-to-br from-[#F1F5F9] via-white to-[#F8FAFC] py-28 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#0B4EA2]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00A6A6]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <motion.div
              className="lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeInUp} className="text-[#0B4EA2] font-bold uppercase tracking-[4px] text-xs mb-3">
                Who We Are
              </motion.p>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-serif font-bold text-[#0B2545] leading-tight mb-6">
                More than a laundry service — a promise of care.
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed text-lg mb-10">
                At Athenura, we are a modern garment-care brand built on trust,
                precision, and convenience. We don’t just wash clothes — we
                preserve fabrics, protect quality, and simplify daily life for
                our customers.
              </motion.p>

              <motion.div variants={fadeInUp} className="grid sm:grid-cols-2 gap-6">
                {whoWeAreCards.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center shadow-sm mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2545] mb-2 font-serif">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={whoWeAreImg}
                  alt="Who We Are"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/40 via-transparent to-transparent" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* NEW SECTION: OUR PROCESS (Based on Screenshot) */}
      <section className="bg-sky-100 py-28 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          
          <div className="text-center max-w-4xl mx-auto mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#0B4EA2] font-bold uppercase tracking-[4px] text-xs mb-3"
            >
              How It Works
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-bold text-[#0B2545] mb-6"
            >
              Our Process – How Athenura Delivers India's Best Laundry & Dry-Clean Experience
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className={`bg-white border-2 border-gray-100/80 rounded-3xl p-6 shadow-sm ${step.borderColor} transition-all duration-300 flex flex-col items-center text-center`}
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  {step.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-[#0B2545] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* OUR PURPOSE */}
      <section className="py-28 bg-gradient-to-br from-[#0B2545] to-[#0B4EA2] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="text-center mb-16">
            <span className="text-emerald-400 uppercase tracking-[4px] font-bold text-xs block mb-3">
              Our Purpose
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              The Blueprint of Our Dedication
            </h2>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Mission */}
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#00A6A6] flex items-center justify-center text-white text-xl mb-6 shadow-lg">
                <FaBullseye />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-white/80 leading-relaxed font-light">
                To deliver premium laundry solutions through innovative technology,
                expert garment care, and exceptional customer service that exceeds expectations.
              </p>
            </motion.div>

            {/* Focus */}
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-xl mb-6 shadow-lg">
                <FaGem />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-white">Our Focus</h3>
              <p className="text-white/80 leading-relaxed font-light">
                We focus on fabric-safe cleaning, eco-friendly processes,
                punctional delivery, and providing customers with a seamless laundry experience.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-white text-xl mb-6 shadow-lg">
                <FaEye />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-white/80 leading-relaxed font-light">
                To become India's most trusted smart laundry brand by combining
                sustainability, innovation, and premium garment care for every household.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-[#F8FAFC] py-28 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-[#0B4EA2] font-bold uppercase tracking-[4px] text-xs mb-3">
              Core Values
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B2545]">
              Built on Trust and Efficiency
            </h2>
          </div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {values.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                  {item.icon}
                </div>
                <h3 className={`text-xl font-serif font-bold mb-3 ${item.title === "Eco-First Care" ? "text-[#00A6A6]" : "text-[#0B2545]"}`}>
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <p className="text-[#0B4EA2] font-bold uppercase tracking-[4px] text-xs mb-3">
                Our Team
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B2545]">
                Meet the Freshness Experts
              </h2>
              <p className="text-gray-500 text-base mt-3 max-w-xl font-light">
                Our staff undergoes 120+ hours of expert care training before touching a single customer garment.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-full bg-blue-50 text-[#0B4EA2] font-semibold text-xs flex items-center gap-2 border border-blue-100/50">
                <FaCheckCircle /> ISO Certified
              </div>
              <div className="px-4 py-2 rounded-full bg-teal-50 text-[#00A6A6] font-semibold text-xs flex items-center gap-2 border border-teal-100/50">
                <FaStar /> 5-Star Care
              </div>
            </div>
          </div>

          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative bg-gradient-to-b from-slate-50 to-slate-100/50 p-4 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="rounded-2xl overflow-hidden relative aspect-[4/5] bg-slate-200">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="px-2 pt-5 pb-2">
                  <h3 className="text-xl font-serif font-bold text-[#0B2545] group-hover:text-[#0B4EA2] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </section>
  );
};

export default About;