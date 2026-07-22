import React, { useEffect, useState, useRef } from 'react'
import { ServicesData } from '../Data/LaundaryData.js'
import { useParams, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import HeroCTA from '../components/CTA.jsx'
import { MoveRight, CheckCircle2, ArrowRight } from 'lucide-react'
import Eco from '../assets/Laundry-Service/Eco.webp';
import Wool from '../assets/Laundry-Service/Wool.webp';
import Product from '../assets/Laundry-Service/Product.webp';
import FabSpecialist from '../assets/Laundry-Service/FabSpecialist.webp'
import useEmblaCarousel from "embla-carousel-react";

const SubService = () => {

  const { service } = useParams();
  const data = ServicesData[service];
  const navigate = useNavigate();

  if (!data) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6 text-center pt-24">
        <div className="max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-blue-50">
          <h1 className="text-3xl font-bold text-blue-950 mb-4">Service Inactive</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            This professional cleaning service is currently inactive or unavailable. Please browse our other active services.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-2xl bg-blue-900 text-white font-semibold hover:bg-blue-800 transition shadow-lg shadow-blue-950/20 cursor-pointer"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const { Hero, WhyUs, ServiceOffered, CTA, Servicetitle, ExpertService, ExpertTitle } = data;

  console.log(data);

  const features = [
    { id: 1, image: Eco, title: "Eco-Friendly Cleaning Machines ", desc: "Gentle on clothes, kind to the planet. " },
    { id: 2, image: Wool, title: " Certified Wool Care Technology", desc: "Special care for delicate fabrics. " },
    { id: 3, image: FabSpecialist, title: "Expert Fabric Specialists ", desc: "Experience you can trust. " },
    { id: 4, image: Product, title: "Sustainable Cleaning Solutions ", desc: "Clean clothes, cleaner future. " }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut", },
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
    <>
      <div>
        {/* hero section */}
        <section
  className="w-full  h-[600px] md:min-h-screen grid grid-cols-1 lg:grid-cols-2  md:pt-24"
  style={{
    backgroundImage: `url(${Hero.HeroBackground})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
   <div className="flex md:hidden absolute inset-0 md:mt-12 bg-black/60 z-10 h-[600px]"></div>
        <div className="md:flex hidden absolute inset-0 md:mt-12 bg-white/10 z-10 min-h-screen"></div>
  {/* Left Content */}
  <div className="flex items-center justify-center px-5 sm:px-8 lg:px-12 lg:py-0 z-20">
    <div className="w-full max-w-2xl text-center lg:text-left">

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 },
            },
          }}
         className="font-serif font-bold leading-tight
text-white
bg-clip-text text-transparent
md:bg-none md:text-blue-950 md:text-opacity-100
text-4xl sm:text-5xl md:text-6xl lg:text-7xl "
        >
          {Hero.HeroTitle}
        </motion.h1>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7 },
            },
          }}
         className="mt-10 md:mt-6 font-serif font-bold
bg-gradient-to-r from-[#67E8F9] via-[#22D3EE] to-[#acc2f3]
bg-clip-text text-transparent
md:bg-none md:text-blue-600
drop-shadow-lg md:drop-shadow-none
text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {Hero.HeroSub}
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 0.8 },
            },
          }}
            className="mt-6 text-md sm:text-md md:text-lg text-white  font-semibold md:font-semibold  md:text-blue-950 leading-5 md:leading-8 max-w-xl">
        
          {Hero.HeroPara}
        </motion.p>

        <motion.button
                     initial={{ opacity: 0, }}
                     animate={{ opacity: 1, }}
                     transition={{ duration: 1.2, delay: 0.9 }}
                     whileHover={{ scale: 1.04, y: -3 }}
                     whileTap={{ scale: 0.96 }}
                     onClick={() => navigate("/checkout")}
                     className="group relative mt-15 mb-4 overflow-hidden rounded-2xl bg-linear-to-r from-blue-700 via-blue-600 to-cyan-500 px-8 py-4 md:px-10 md:py-5 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20"
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
       
      </motion.div>
    </div>
  </div>

  {/* Right Image */}
  <div className="hidden lg:flex items-center justify-end overflow-hidden">
            <img
              src={Hero.HeroVector}
              alt=""
              className="w-full h-full object-cover -translate-x-16"
            />
          </div> 
</section>




        {/* types of Service */}

        {ServiceOffered.length > 0 && (
          <section
            className="bg-linear-to-b from-blue-100 via-blue-300 to-white py-16 md:py-20"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 px-4"
            >
              Types of {Servicetitle} We Offer
            </motion.h1>

            <div className="w-full hidden md:flex justify-center mt-12 px-5">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {ServiceOffered.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden rounded-3xl bg-white border border-blue-200 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                      {/* Image */}
                      <div className="relative p-3">
                        <div className="relative overflow-hidden rounded-2xl h-44">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                          />


                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Badge */}
                        <span
                          className={`absolute top-6 left-6 ${item.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Floating Icon */}
                      <div className="absolute left-1/2 top-[150px] -translate-x-1/2 z-10">
                        <div className="w-14 h-14 rounded-full bg-white border-4 border-blue-100 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-6">
                          <Icon size={24} className="text-blue-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="pt-5 px-5 pb-5">
                        <h2 className="text-2xl font-bold text-center text-blue-900">
                          {item.title}
                        </h2>

                        <p className="mt-2 text-sm text-center text-gray-600 leading-6 line-clamp-2 min-h-[48px]">
                          {item.desc}
                        </p>

                        {/* Features */}
                        <div className="mt-5 flex flex-wrap justify-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                          {item.features.map((feature) => (
                            <span
                              key={feature}
                              className="shrink-0 flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700"
                            >
                              <CheckCircle2 size={12} />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Hover Line */}
                      <div className=" hidden md:flex h-1 w-0 bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-500 group-hover:w-full"></div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Mobile Embla Carousel */}
            <div className="md:hidden mt-10">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {ServiceOffered.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        className="flex-[0_0_88%] px-2"
                      >
                        <motion.div
                          whileHover={{ y: -8 }}
                          transition={{ duration: 0.3 }}
                          className="group relative overflow-hidden rounded-3xl bg-white border border-blue-200 shadow-lg h-full"
                        >
                          {/* Image */}
                          <div className="relative p-3">
                            <div className="relative overflow-hidden rounded-2xl h-44">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Badge */}
                            <span
                              className={`absolute top-6 left-6 ${item.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}
                            >
                              {item.badge}
                            </span>
                          </div>

                          {/* Floating Icon */}
                          <div className="absolute left-1/2 top-[150px] -translate-x-1/2 z-10">
                            <div className="w-14 h-14 rounded-full bg-white border-4 border-blue-100 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-6">
                              <Icon size={24} className="text-blue-600" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="pt-5 px-5 pb-5">
                            <h2 className="text-2xl font-bold text-center text-blue-900">
                              {item.title}
                            </h2>

                            <p className="mt-2 text-sm text-center text-gray-600 leading-6 line-clamp-2 min-h-[48px]">
                              {item.desc}
                            </p>

                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                              {item.features.map((feature) => (
                                <span
                                  key={feature}
                                  className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-medium text-blue-700"
                                >
                                  <CheckCircle2 size={12} />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Bottom Line */}
                          <div className="h-1 w-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {ServiceOffered.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`transition-all duration-300 rounded-full ${selectedIndex === index
                        ? "w-6 h-2 bg-blue-900"
                        : "w-2 h-2 bg-blue-300"
                      }`}
                  />
                ))}
              </div>
            </div>

          </section>
        )}



        {/* why Choose Us */}

        <div
          className="w-full min-h-screen bg-linear-to-b from-white via-blue-200 to-blue-100 py-16"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-blue-950 text-center mb-16 px-4"
          >
            {WhyUs.title}
          </motion.h1>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-5 items-center">

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className="bg-gray-50 rounded-2xl p-5 text-center border border-blue-900 shadow-sm hover:shadow-2xl"
                >
                  <div className="flex justify-center">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      whileHover={{ y: -5, rotate: 3 }}
                      transition={{ duration: 0.25 }}
                      className="w-20 h-20"
                    />
                  </div>

                  <h2 className="font-bold mt-3 text-blue-950 text-xl">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-700">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="flex justify-center "
            >
              <motion.img
                src={WhyUs.image}
                alt="Laundry Process"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-125 h-auto"
              />
            </motion.div>

          </div>
        </div>



        {/* Expert Service */}
        <section
          className="bg-linear-to-b from-blue-100 via-blue-300 to-white py-16 md:py-20"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 px-4"
          >
            {ExpertTitle}
          </motion.h1>

          <div className="w-full flex justify-center mt-12 px-5">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ExpertService.map((item) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group bg-white border border-blue-400 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl"
                >
                  <div className="relative p-3">
                    <div className="relative overflow-hidden rounded-2xl h-44">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />


                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-950">
                      {item.title}
                    </h2>

                    <p className="mt-4 text-gray-700 text-sm md:text-sm leading-7">
                      {item.desc}
                    </p>

                  </div>
                  <div className=" hidden md:flex h-1 w-0 bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-500 group-hover:w-full"></div>
                </motion.div>
              ))}
            </motion.div>



          </div>
          <div className="w-full flex justify-center ">
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 }, },
              }}
              whileHover={{ y: -3, scale: 1.03, }}
              whileTap={{ scale: 0.97, }}
              onClick={()=>navigate("/checkout")}
              className="group mt-8 md:mt-10 py-3 md:py-3 px-6 md:px-8 rounded-full bg-linear-to-r from-blue-900 via-blue-600 to-blue-400 text-white font-semibold text-base md:text-md shadow-xl"  >
              <span className="flex items-center gap-2">
                Schedule Pickup

              </span>
            </motion.button>
          </div>
        </section>


        <HeroCTA

          headingtop={CTA.headingtop}
          headingbottom={CTA.headingbottom}
          subHeading={CTA.subHeading}
        />

      </div>
    </>
  )
}

export default SubService