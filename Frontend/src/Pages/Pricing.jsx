import React, { useState } from 'react'
import { Shirt, Sparkles, CheckCircle2, ArrowRight, IndianRupee } from "lucide-react";
import { MdOutlineIron } from "react-icons/md";
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { pricingFaqs } from "../Data/LaundaryData.js";


const Pricing = () => {

  const [hoveredId, setHoveredID] = useState()

  const navigate = useNavigate();

  const pricing = [
    {
      id: 1,
      title: "Laundry",
      description: "Perfect for everyday laundry.",
      price: "20",
      unit: "/item",
      icon: Shirt,
      features: [
        {
          icon: CheckCircle2,
          text: "Premium Detergent",
        },
        {
          icon: CheckCircle2,
          text: "Drying & Expert Folding",
        },
        {
          icon: CheckCircle2,
          text: "Color Sorting",
        },
      ],
    },

    {
      id: 2,
      title: "Dry Cleaning",
      description: "Specialized care for delicate items.",
      price: "30",
      unit: "/item",
      icon: Sparkles,
      popular: true,
      features: [
        {
          icon: CheckCircle2,
          text: "Eco-Friendly Solvents",
        },
        {
          icon: CheckCircle2,
          text: "Stain Pre-Treatment",
        },
        {
          icon: CheckCircle2,
          text: "Hand Finishing",
        },

      ],
    },

    {
      id: 3,
      title: "Iron & Press",
      description: "Crisp, professional results.",
      price: "15",
      unit: "/item",
      icon: MdOutlineIron,
      features: [
        {
          icon: CheckCircle2,
          text: "Steam Pressing",
        },
        {
          icon: CheckCircle2,
          text: "Crease Alignment",
        },
        {
          icon: CheckCircle2,
          text: "Starch Options",
        },
      ],
    },
  ];

  return (
    <>
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-6 ">

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-900"
          >
            Transparent Pricing
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Personal Care for Every Budget
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From daily essentials to delicate heirloom fabrics, our tiered
            pricing ensures you only pay for the precision you need.
          </motion.p>

        </div>


        {/* Price card */}

        <section className="w-full bg-linear-to-b from-white via-blue-100 to-white">
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-10 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricing.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: item.id * 0.20,
                    }}

                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group relative w-full  rounded-2xl border border-blue-200 bg-blue-50 px-6 py-3 transition-all duration-500 hover:bg-blue-900 hover:border-blue-900 hover:shadow-2xl hover:scale-105"
                  >
                    {item.popular && (
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full bg-yellow-400 text-black">
                        MOST POPULAR
                      </span>
                    )}

                    <Icon className="h-7 w-7 text-blue-900 transition-colors duration-500 group-hover:text-white" />

                    <h2 className="mt-3 text-xl font-semibold text-blue-950 transition-colors duration-500 group-hover:text-white">
                      {item.title}
                    </h2>

                    <p className="mt-1 text-sm text-blue-700 transition-colors duration-500 group-hover:text-blue-100">
                      {item.description}
                    </p>

                    <h1 className="mt-4 text-4xl font-bold text-blue-900 transition-colors duration-500 group-hover:text-white flex">
                      <span className="flex items-center"><IndianRupee size={30} className='mt-1'/>{item.price}</span>
                      <span className="text-sm font-normal text-blue-700 group-hover:text-blue-100 transition-colors duration-500 mt-5">
                        {item.unit}
                      </span>
                    </h1>

                    <ul className="mt-5 space-y-4">
                      {item.features.map((feature, index) => {
                        const FeatureIcon = feature.icon;

                        return (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-blue-800 transition-colors duration-500 group-hover:text-white"
                          >
                            <FeatureIcon className="h-4 w-4 shrink-0 transition-colors duration-500 group-hover:text-white" />
                            <span>{feature.text}</span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-7 mb-3">
                      <button
                      onClick={()=>navigate("/checkout")}
                        className="w-full rounded-xl border border-blue-900 py-3 font-semibold text-blue-900 transition-all duration-500 group-hover:bg-white group-hover:text-blue-900"
                      >
                        {hoveredId === item.id ? "Book Now" : "Select Service"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* CTA Section */}

        <section className="w-full pt-20 px-4 md:px-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative  overflow-hidden rounded-2xl bg-linear-to-r from-blue-800 via-blue-900 to-blue-950 shadow-2xl w-[1150px]"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute -top-20 left-20 h-64 w-64 rounded-full bg-white blur-3xl" />
              <div className="absolute bottom-0 right-20 h-52 w-52 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 md:px-10">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 text-center md:text-left"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-blue-200 font-semibold">
                  Join the Athenura Club
                </p>

                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
                  Save 15% with a Subscription
                </h2>

                <p className="mt-3 max-w-2xl text-sm md:text-base text-blue-100">
                  Enjoy priority scheduling, free eco-friendly scent boosters,
                  and discounted rates on every order when you sign up for our
                  weekly flow plan.
                </p>

                <motion.button
                  onClick={() => navigate("/subscription")}
                  whileHover={{ y: -5, scale: 1.03, }}
                  whileTap={{ scale: 0.97, }}
                  className="group flex items-center gap-3 rounded-2xl bg-white  px-3 md:px-5  py-3 md:py-2 mt-5 text-md md:text-lg font-semibold text-blue-900 shadow-xl"
                >
                  View More

                  <motion.div
                    animate={{ x: [0, 4, 0], }}
                    transition={{ duration: 1.5, repeat: Infinity, }}
                  >

                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>

              {/* Pricing Card */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                }}
                className="w-full max-w-55 h-50 rounded-xl bg-white/95 p-5 shadow-xl backdrop-blur-sm"
              >
                <p className="text-center text-md text-gray-500 ">
                  Starting at
                </p>

                <div className="mt-2 text-center">
                  <span className="text-4xl font-bold text-blue-900">
                    $49.99
                  </span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-12 w-full rounded-lg  bg-blue-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-800"
                >
                  Upgrade to Member
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* pricing FAQ */}
        <section className="pt-16 px-4 bg-linear-to-b from-white to via-blue-200 to-white">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10"
            >
              Pricing FAQs
            </motion.h2>

            {/* FAQ Cards */}
            <div className="space-y-5">
              {pricingFaqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  whileHover={{
                    y: -4,
                    scale: 1.01,
                  }}
                  className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-bold text-lg text-gray-900">
                    {faq.question}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </div>


    </>
  )
}

export default Pricing;