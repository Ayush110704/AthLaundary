import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import manImg from '../assets/HomeHero.png';
import Review from '../components/Review';
import {
  features,
  statsData,
  allServices,
  howItWorksSteps,
  sectionTexts,
  buttonTexts,
  colors
} from '../Data/LaundaryData';
import { Link , useNavigate} from 'react-router-dom';

 
const useInView = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};
 
const useInViewOnce = (threshold = 0.3) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, threshold]);

  return [ref, isVisible, setHasAnimated];
};
 
const useCarousel = (totalItems, itemsPerView = 1) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const prev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const goTo = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const getVisible = (items) => {
    const visible = [];
    for (let i = 0; i < itemsPerView; i++) {
      visible.push(items[(activeIndex + i) % totalItems]);
    }
    return visible;
  };

  return {
    activeIndex,
    direction,
    next,
    prev,
    goTo,
    getVisible
  };
};
 
const useMedia = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
};
 
const useMobile = () => useMedia('(max-width: 768px)');

 //use for animated heading
const AnimatedHeading = ({ isVisible }) => {
  const text = sectionTexts.services.heading;
  const words = text.split(" ");
  
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative inline-block pb-6">
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="flex flex-wrap justify-center lg:justify-start gap-1"
      >
        {words.map((word, index) => {
          const isHighlight = word === "Services";
          return (
            <motion.span
              key={index}
              custom={index}
              variants={wordVariants}
              className={`text-3xl sm:text-4xl md:text-5xl font-bold inline-block ${
                isHighlight ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.div>

      <svg
        viewBox="0 0 500 120"
        className="w-48 sm:w-56 md:w-64 lg:w-72 absolute -bottom-0 left-0"
        style={{ transform: 'translateY(10px)' }}
      >
        <motion.path
          d="M30 80 C120 60, 260 55, 450 75"
          fill="none"
          stroke={colors.primary}
          strokeWidth="5"
          strokeLinecap="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: isVisible ? 1 : 0,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            delay: 0.5,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};
 
const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime;
    const startVal = 0;
    const endVal = parseFloat(end);

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * eased;
      
      if (Number.isInteger(endVal)) {
        setCount(Math.round(current));
      } else {
        setCount(current.toFixed(1));
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (Number.isInteger(endVal)) {
          setCount(Math.round(endVal));
        } else {
          setCount(endVal);
        }
      }
    };

    requestAnimationFrame(update);
  }, [started, end, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600"
      >
        {prefix}{count}{suffix}
      </motion.div>
    </div>
  );
};

//  MAIN COMPONENT 

const HomePage = () => {  
  const isMobile = useMobile();
  const [nearYouRef, isNearYouVisible] = useInView(0.3);
  const [servicesRef, areServicesVisible] = useInView(0.3);
  const [howItWorksRef, isHowItWorksVisible] = useInView(0.3);
  const [statsRef, areStatsVisible] = useInViewOnce(0.3);

  const totalServices = allServices.length;
  const itemsPerView = isMobile ? 1 : 3;
  
  const {
    activeIndex,
    direction,
    next,
    prev,
    goTo,
    getVisible
  } = useCarousel(totalServices, itemsPerView);

  const visibleServices = getVisible(allServices);
 
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const navigate = useNavigate();

  const underlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    })
  };

  const nearYouText = sectionTexts.nearYou.text.split("");

  return (
    <> 
      {/* HERO SECTION */}
      <div 
        className="min-h-screen flex items-center py-12 md:py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${manImg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Shining Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)",
          }}
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left"> 
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight font-serif"
              >
                <span className="block">{sectionTexts.hero.title}</span>
              </motion.h1>
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-2 inline-block relative overflow-hidden"
              >
                <span className="text-xs sm:text-sm md:text-base font-semibold text-blue-600 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm relative inline-block"> 
                  <motion.span
                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/70 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                  <span className="relative z-10">{sectionTexts.hero.badge}</span>
                </span>
              </motion.div>
              
              {/* Near You Section */}
              <div ref={nearYouRef} className="mt-3">
                <motion.div
                  initial="hidden"
                  animate={isNearYouVisible ? "visible" : "hidden"}
                  className="flex flex-wrap justify-center lg:justify-start gap-0"
                >
                  {nearYouText.map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={charVariants}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 inline-block font-serif"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Underline */}
                <div className="flex justify-center lg:justify-start mt-1">
                  <svg
                    width="160"
                    height="20"
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    className="w-40 sm:w-48 md:w-52"
                  >
                    <motion.path
                      d="M7.7,145.6C109,125,299.9,116.2,401,121.3C42.1,2.2,87.6,11.8,87.3,25.7"
                      stroke={colors.primaryLight}
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                      initial="hidden"
                      animate={isNearYouVisible ? "visible" : "hidden"}
                      variants={underlineVariants}
                    />
                  </svg>
                </div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-sm sm:text-base text-gray-600 mt-3 max-w-lg mx-auto lg:mx-0"
              >
                {sectionTexts.hero.subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <motion.button 
                 onClick={()=>navigate("/checkout")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition duration-200 text-center text-sm sm:text-base overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  />
                  <span className="relative z-10">{buttonTexts.primary}</span>
                </motion.button>
                
                <motion.button 
                  onClick={()=>navigate("/pricing")} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-full shadow-md transition duration-200 text-center text-sm sm:text-base border border-sky-200 overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-200/50 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8
                    }}
                  />
                  <span className="relative z-10">{buttonTexts.secondary}</span>
                </motion.button>
              </motion.div>

              {/* Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="mt-8 grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    className="flex flex-col items-center justify-center p-3 transition-all duration-300 cursor-pointer group relative bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md overflow-hidden"
                  > 
                    <div className="w-10 h-10 flex items-center justify-center mb-1 transition-transform duration-300 group-hover:scale-110 relative z-10">
                      <img 
                        src={feature.icon} 
                        alt={feature.alt} 
                        loading="lazy"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <h3 className="text-[10px] sm:text-xs font-semibold text-gray-700 text-center leading-tight relative z-10">
                      {feature.title}
                    </h3>
                    <div className="absolute inset-0 rounded-xl border-2 border-sky-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
 
            <div className="flex-1 flex justify-center lg:justify-end self-end lg:self-auto"> 
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section ref={servicesRef} className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
            <AnimatedHeading isVisible={areServicesVisible} />
            <p className="text-base sm:text-lg text-gray-600 max-w-xl px-6 text-left md:text-right pt-2">
              {sectionTexts.services.subtitle}
            </p>
          </div>

          <div className="relative px-4 md:px-12"> 
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Services Grid */}
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-6 overflow-hidden`}>
              {visibleServices.map((service, index) => (
                <div
                  // onClick={()=>navigate(service.path)}
                  key={`${activeIndex}-${index}`}
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-[420px]"
                  style={{
                    backgroundImage: `url(${service.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                    <div className="flex items-start gap-3">
                      <div className="w-1 h-12 bg-yellow-400 rounded-full flex-shrink-0 mt-1"></div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-gray-200 text-xs leading-relaxed line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
 
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalServices }).map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === index
                    ? 'bg-blue-600 w-8 h-2.5'
                    : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
 
          <div className="mt-16 text-center bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl py-8 px-6 border border-sky-100">
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              {sectionTexts.services.trustBadge}
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section ref={howItWorksRef} className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isHowItWorksVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-6 relative inline-block w-full"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              {sectionTexts.howItWorks.title} <br/>Makes{" "}
              <span className="text-blue-600">{sectionTexts.howItWorks.highlight}</span>
            </h2>
            
            <div className="flex justify-center">
              <svg
                viewBox="0 0 500 120"
                className="w-48 sm:w-56 md:w-64 lg:w-80"
              >
                <motion.path
                  d="M30 80 C120 60, 260 55, 450 75"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={{
                    pathLength: 0,
                    opacity: 0,
                  }}
                  animate={{
                    pathLength: isHowItWorksVisible ? 1 : 0,
                    opacity: isHowItWorksVisible ? 1 : 0,
                  }}
                  transition={{
                    delay: 0.5,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHowItWorksVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-600 text-base sm:text-lg max-w-4xl mx-auto mb-16 leading-relaxed"
          >
            {sectionTexts.howItWorks.description}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 relative"> 
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-200 hidden lg:block"
              initial={{ scaleX: 0 }}
              animate={isHowItWorksVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              style={{ transformOrigin: "left center" }}
            />

            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  x: -100,
                  scale: 0.8 
                }}
                animate={isHowItWorksVisible ? { 
                  opacity: 1, 
                  x: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  x: -100, 
                  scale: 0.8 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4 + (index * 0.25),
                  ease: [0.25, 0.1, 0.25, 1],
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 text-center group z-10"
              >
                <motion.div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isHowItWorksVisible ? { 
                    scale: 1, 
                    rotate: 0 
                  } : { 
                    scale: 0, 
                    rotate: -180 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + (index * 0.25),
                    type: "spring",
                    stiffness: 200,
                    damping: 12
                  }}
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                </motion.div>

                <div className="mt-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-sm md:text-base font-semibold text-gray-800 mt-2 leading-relaxed">
                  {step.title}
                </h3>

                {/* Arrow Connector */}
                {index < howItWorksSteps.length - 1 && (
                  <motion.div 
                    className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-0"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isHowItWorksVisible ? { 
                      opacity: 1, 
                      scaleX: 1 
                    } : { 
                      opacity: 0, 
                      scaleX: 0 
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.6 + (index * 0.25),
                      ease: "easeOut"
                    }}
                  >
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isHowItWorksVisible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full"
          ></motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <div className="w-full h-1 bg-[#1A1A4E]"></div>
      <section ref={statsRef} className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={areStatsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center justify-center flex-wrap gap-1">
              Trusted by thousands of people across the{" "}
              <span className="text-blue-600 relative inline-block">
                nation
                <svg
                  viewBox="0 0 200 40"
                  className="absolute left-0 w-full h-5 mt-1"
                  style={{ bottom: '-8px' }}
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M5 30 C60 20, 140 20, 195 30"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: areStatsVisible ? 1 : 0,
                      opacity: areStatsVisible ? 1 : 0,
                    }}
                    transition={{
                      delay: 0.5,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </span>
              .
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={areStatsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="text-center"
              >
                <AnimatedCounter 
                  end={stat.value} 
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  duration={2}
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={areStatsVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider mt-2"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-1 bg-[#1A1A4E]"></div>

      {/* REVIEWS SECTION */}
      <Review />
    </>
  );
};

export default HomePage;