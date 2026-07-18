import React from 'react'
import heroVideo from '../assets/ServiceVideo.mp4'
import ServiceImageDesktop from '../assets/Services/ServiceImage.png'
import ServiceImageMobile from '../assets/Services/ServiceImageMobile.png'
import Ironing from '../assets/Services/Ironing.jpg'
import Warehouse from '../assets/Services/Warehouse.png'
import { motion } from 'framer-motion'
import { CircleCheck, Star, Minus, MoveRight, Clock3, Leaf, Truck, ShieldCheck, Play, Ampersand,IndianRupee } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import FloatingCard from '../Ui/FloatingCard.jsx';
import Stat from '../Ui/Stat.jsx';
import WashingMachine from '../assets/Services/WashingMachine.webp'
import ShoeCleaning from '../assets/Services/ShoeCleaning.webp'
import Iron from '../assets/Services/Iron.webp'
import DryCleaning from '../assets/Services/DryCleaning.webp'
import CarpetCleaning from '../assets/Services/CarpetCleaning.webp'
import Curtain from '../assets/Services/Curtain.webp'
import { Link, useNavigate } from "react-router-dom"
import CTA from '../components/CTA.jsx'
import Review from '../components/Review.jsx'
import useEmblaCarousel from "embla-carousel-react";

const Services = () => {

  const [hoveredId, setHoveredId] = useState(null);

  const navigate = useNavigate();

  const price = [
    {
      id: 1, title: "Laundry", price: "20", includes: [
        { id: 1, type: "Wash,Fold and Ironed" },
        { id: 2, type: "Trousers, Shirts ,Skirts ,etc" },
        { id: 3, type: "Standard Stain Removal" }]
    },
    {
      id: 2, title: "Dry Cleaning", price: "30", includes: [
        { id: 1, type: "2 Piece Suits" },
        { id: 2, type: "Heavy Winter Coats" },
        { id: 3, type: "Silk & Velvet Handling" }
      ]
    },
    {
      id: 3, title: "Curtains and Carpets", price: "50", includes: [
        { id: 1, type: "Comforters & Duvets" },
        { id: 2, type: "Curtains & Drapery" },
        { id: 3, type: "Deep Sanitize Cycle" }]
    }
  ]

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review:
        "Excellent service! My clothes came back perfectly cleaned, folded, and delivered on time. Highly recommended.",
      location: "New York",
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 5,
      review:
        "The pickup and delivery process was super convenient. Their stain removal service is impressive.",
      location: "Chicago",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 4,
      review:
        "Very professional staff and affordable pricing. My shirts looked brand new after washing.",
      location: "Los Angeles",
    },
    {
      id: 4,
      name: "Daniel Miller",
      rating: 5,
      review:
        "Fast turnaround and great customer support. This has become my go-to laundry service.",
      location: "Seattle",
    }
  ];

  const services = [
    { id: 1, title: "Laundry", desc: "Everyday wash & fold service for all your clothes.", image: WashingMachine, path: "/services/Laundry-service" },
    { id: 2, title: "Dry Cleaning", desc: " Gentle cleaning for formal, delicate & designer wear..", image: DryCleaning, path: "/services/DryClean-service" },
    { id: 3, title: "Shoe Cleaning", desc: "Deep cleaning & restoration for all types of footwear .", image: ShoeCleaning, path: "/services/ShoeCleaning-service" },
    { id: 4, title: "Ironing", desc: " Steam ironing for crisp, wrinkle-free & perfect finish.", image: Iron, path: "/services/Ironing-service" },
    { id: 5, title: "Carpet Cleaning", desc: " Deep and  cleaning for carpets, rugs & mats.", image: CarpetCleaning, path: "/services/CarpetCleaning-service" },
    { id: 6, title: "Curtain Cleaning", desc: " Professional cleaning for curtains, blinds & drapes.", image: Curtain, path: "/services/CurtainCleaning-service" },
  ]


  const containerVariants = {
    hidden: {},
    visible: {
      transition:
        { staggerChildren: 0.12, },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.7, },
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // ADDED: Auto-scroll effect for mobile carousel
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
      } else {
        emblaApi.scrollNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="w-full min-h-screen md:pt-12">
      {/* Hero Section */}
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${window.innerWidth < 768 ? ServiceImageMobile : ServiceImageDesktop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex md:hidden absolute inset-0 md:mt-12 bg-black/20 z-10 min-h-screen"></div>
        <div className="md:flex hidden absolute inset-0 md:mt-12 bg-white/10 z-10 min-h-screen"></div>

        <div className="relative z-20 min-h-screen flex items-center  text-center md:text-left">
          <div className="w-full max-w-3xl px-6 sm:px-10 lg:px-20 md:mt-0">



            <motion.h1
              initial={{ opacity: 0, scale: 1, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}

              className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white md:text-blue-950">
                Laundry
              </span>

              <br />

              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Made Effortless
              </span>
            </motion.h1>



            <motion.p
              initial={{ opacity: 0, scale: 1, }}
              animate={{ opacity: 1, scale: 1, }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-6 text-sm sm:text-base md:text-lg text-gray-400 font-semibold  md:text-blue-950 leading-8 max-w-xl">

              Professional laundry and dry cleaning with
              30-minute pickup, eco-friendly cleaning,
              and doorstep delivery.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ duration: 1.2, delay: 0.9 }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/checkout")}
              className="group relative mt-8 mb-4 overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 via-blue-600 to-cyan-500 px-8 py-4 md:px-10 md:py-5 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20"
            >
              {/* Shine Effect */}
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              {/* Content */}
              <span className="relative z-10 flex items-center gap-3 text-base md:text-lg font-semibold">
                Book Pickup

                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                  }}
                >
                  <MoveRight className="h-5 w-5" />
                </motion.div>
              </span>
            </motion.button>

            {/* STATS */}

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4  mt-8 md:mt-5  ">

              <Stat
                value="5000+"
                title="Orders"
                delay={1}
              />

              <Stat

                value="4.9★"
                title="Rating"
                delay={1.2}
              />

              <Stat
                value="30 Min"
                title="Pickup"
                delay={1.4}
              />

              <Stat
                value="24/7"
                title="Support"
                delay={1.6}
              />

            </div>


          </div>
        </div>

        <FloatingCard
          icon={<Truck />}
          text='Same Day  Delivery'
          className="top-60 right-34"
          delay={0}
        />

        <FloatingCard
          icon={<ShieldCheck />}
          text="Eco Friendly"
          className="bottom-44 right-72"
          delay={0.3}
        />

        <FloatingCard
          icon={<Clock3 />}
          text="30 Min Pickup"
          className="bottom-20 right-28"
          delay={0.6}
        />

      </div>

      {/* Mid Section */}
      <div className="bg-linear-to-b from-blue-50 via-blue-100 to-blue-50  w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-16 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left section */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="text-3xl md:text-4xl font-bold text-blue-950"
              >
                The Freshness Journey
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut", }}
                className="text-gray-600 text-base md:text-lg mt-4 leading-6"
              >
                Our signature multi-stage process ensures that every
                garment receives a clinical level of cleanliness
                without compromising fabric quality.
              </motion.p>

              < motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut", }}
                className="mt-8 space-y-4">
                {/* Step 1 */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-teal-900 text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="h-16 md:h-20 w-px bg-gray-300 mt-1"></div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-950">
                      Inspection & Pre-treatment
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg mt-2">
                      Identifying fabric types and targeting individual stains.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="h-16 md:h-20 w-px bg-gray-300 mt-1"></div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-950">
                      Solvent-Free Cleaning
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg mt-2">
                      Eco-friendly technology that lifts dirt while preserving color.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-2 md:gap-6">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full border border-blue-900 text-blue-900 flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-blue-950">
                      Steam Finishing
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg mt-2">
                      Restoring the garment's shape and professional silhouette.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* center section */}


            <div className="space-y-6">
              {/* Ironing Image */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: "easeOut", }}
                whileHover={{ y: -5 }}
                className="bg-gray-100 rounded-xl"
              >
                <img
                  src={Ironing}
                  alt="Ironing"
                  className="h-60 md:h-72 w-full rounded-xl object-cover shadow-2xl"
                />
              </motion.div>

              {/* Turnaround Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut", }}
                whileHover={{ y: -6, scale: 1.02, }}
                className="border border-gray-300 rounded-2xl p-6 md:p-8 bg-gray-100 shadow-lg"
              >
                <Clock3
                  className="text-blue-900 mb-4"
                  size={28}
                />

                <h3 className="text-2xl md:text-3xl font-semibold text-blue-950">
                  Turnaround
                </h3>

                <p className="text-gray-600 text-base md:text-xl mt-4">
                  Standard: 48 Hours
                </p>

                <p className="text-gray-600 text-base md:text-xl">
                  Express: Next Day Delivery
                </p>
              </motion.div>
            </div>


            {/* right section */}
            <div className="space-y-6">

              {/* Eco-Wash Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut", }}
                whileHover={{ y: -6, scale: 1.02, }}
                className="bg-teal-800 text-white p-6 md:p-8 rounded-2xl shadow-xl"
              >

                <Leaf size={28} />
                <h3 className="text-2xl md:text-3xl mt-4">
                  Eco-Wash™
                </h3>

                <p className="text-base md:text-lg mt-4 leading-7">
                  Our proprietary biodegradable solvents are
                  hypoallergenic and 100% biodegradable.
                </p>
              </motion.div>

              {/* Warehouse Image */}
              <motion.img
                src={Warehouse}
                alt="Warehouse"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut", }}
                whileHover={{ y: -5, scale: 1.02, }}
                className="h-72 md:h-80 w-full rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services we offer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-screen text-center py-14 bg-gradient-to-b from-blue-50 via-blue-200 to-blue-50"
      >
        {/* Heading */}
        <div className="mt-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-blue-950 py-1 px-4 border border-blue-900 rounded-full text-white font-medium"
          >
            ✨ Our Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="mt-6 text-2xl md:text-5xl text-blue-950 font-bold"
          >
            Complete Care For You & Your Belongings
          </motion.h1>
        </div>

        {/* dekstop  Grid layout*/}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.9 }}

          className="hidden md:grid max-w-7xl mx-auto px-5 mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.03, }}
              transition={{ duration: 0.25, }}
              className="group flex flex-col border border-blue-900 rounded-2xl bg-white shadow-md overflow-hidden"
            >

              {/* Image */}
              <div className="p-5 flex justify-center">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  whileHover={{ y: -6, rotate: 3, }}
                  transition={{ duration: 0.2 }}
                  className="w-20 h-20 object-contain"
                />

              </div>

              
              <h2 className="font-bold text-blue-950 text-xl px-2">
                {service.title}
              </h2>

             
              <p className="p-4 text-gray-700 text-sm leading-6">
                {service.desc}
              </p>

              {/* Footer */}
              <footer className="mt-auto mb-5 flex justify-center">
                <Link
                  to={service.path}
                  className="flex items-center gap-1 font-semibold text-blue-600 transition-all duration-300 group-hover:text-blue-950"
                >
                  Explore

                  <motion.div
                    animate={{ x: [0, 4, 0], }}
                    transition={{ duration: 1.5, repeat: Infinity, }}
                  >
                    <MoveRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </footer>
               <div className=" hidden md:flex h-1 w-0 bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* mobile view layout */}

        <div className="md:hidden relative overflow-hidden mt-10" ref={emblaRef}>
          <div className="flex  ">
            {services.map((service) => (
              <div
                key={service.id}
                className="basis-[80%] shrink-0 px-2"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -12, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col h-full border border-blue-900 rounded-2xl bg-white shadow-md overflow-hidden"
                >
                  {/* Image */}
                  <div className="p-5 flex justify-center">
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      whileHover={{ y: -6, rotate: 3 }}
                      transition={{ duration: 0.2 }}
                      className="w-20 h-20 object-contain"
                    />
                  </div>

                
                  <h2 className="font-bold text-blue-950 text-2xl px-2">
                    {service.title}
                  </h2>

                 
                  <p className="p-4 text-gray-700 text-sm leading-6">
                    {service.desc}
                  </p>

                  {/* Footer */}
                  <footer className="mt-auto mb-5 flex justify-center">
                    <Link
                      to={service.path}
                      className="flex items-center gap-1 font-bold text-blue-900 group-hover:text-blue-950"
                    >
                      Explore

                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <MoveRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </footer>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === idx
                  ? "w-6 bg-blue-900"
                  : "w-2 bg-blue-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </motion.div>






      {/* Pricing Section */}
      <div className="w-full py-16 bg-linear-to-b from-blue-50 via-blue-100 to-white">
        {/* Heading */}
        <div className="text-center px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-blue-900 font-semibold">
            Transparent Pricing
          </h1>
          <p className="mt-4 text-sm md:text-lg text-gray-600 max-w-3xl mx-auto">
            Premium care without the premium guesswork.
            All prices include complimentary pickup.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {price.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group w-full min-h-[350px] border border-gray-300 rounded-2xl p-6 bg-blue-50 text-start transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-white hover:bg-blue-900 hover:text-white"
              >
                <h2 className="font-semibold text-lg">
                  {item.title}
                </h2>
                <h1 className="mt-4 text-3xl md:text-4xl font-bold text-blue-900 flex group-hover:text-white">
                 <span className="flex  items-center"><IndianRupee size={30} className='mt-1'/>{item.price}</span> 
                  <span className="text-sm font-normal text-gray-600 mt-4 group-hover:text-white">
                    /item
                  </span>
                </h1>
                <ul className="mt-8 space-y-3">
                  {item.includes.map((include) => (
                    <li
                      key={include.id}
                      className="flex items-center gap-2 text-gray-700 font-semibold text-sm md:text-base group-hover:text-white"
                    >
                      <CircleCheck className="h-5 w-5 text-blue-950 shrink-0 group-hover:text-white " />
                      {include.type}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex justify-center">
                  <button 
                  onClick={()=>navigate("/checkout")}
                  className="w-full md:w-56 py-3 rounded-xl border border-blue-950 text-blue-950 font-semibold text-base md:text-lg transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:text-blue-950 hover:scale-105">
                    {hoveredId === item.id ? "Book Now" : "Select Tier"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      < CTA
        type=" Laundry"
        headingtop="Ready For Fresh, Clean Clothes"
        headingbottom="Every Day?"
        subHeading="Schedule a pickup in seconds. We wash, dry clean, iron and deliver right to your doorstep"
      />

      {/* Customers Review Section */}
      <Review />
    </div>

  )
}



export default Services;