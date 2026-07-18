import React, { useState } from "react";
import laundryContact from "../assets/laundryContact.png";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
// import hero from "../assets/hero.webp";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

function Contact() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiryType: "Order Support",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'All fields are required. Please fill them out.'
      });
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your message has been sent successfully.'
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          inquiryType: "Order Support",
          message: ""
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.message || 'Something went wrong.'
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Could not submit form. Please check if the server is running.'
      });
    }
  };

  return (
    <div className="pt-16 md:pt-15">
      {/* Banner - Desktop */}
      <div className="relative hidden md:block">
        <img
          src={laundryContact}
          alt="Contact"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="ml-8 md:ml-20 max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white"
            >
              We're Here To Help You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-4 text-base md:text-xl text-white/90 leading-relaxed"
            >
              Whether you have a question about our eco-friendly processes, need
              help with an order, or just want to say hello, our team is ready
              to assist you with clinical precision.
            </motion.p>
          </div>
        </div>
      </div>

 {/* Mobile Banner */}
<div className="md:hidden relative overflow-hidden min-h-[500px] bg-gradient-to-br from-[#0f3d7a] via-[#1d4ed8] to-[#60a5fa] rounded-b-[40px]">

  {/* Animated Glow */}
  <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

  <div className="absolute top-40 right-0 w-40 h-40 bg-cyan-300/10 rounded-full blur-3xl animate-pulse"></div>

  {/* Animated Wave */}
  <div className="absolute bottom-32 left-0 w-full overflow-hidden opacity-30">
    <div className="h-[2px] bg-white animate-pulse"></div>
    <div className="h-[2px] bg-white mt-3 animate-pulse"></div>
    <div className="h-[2px] bg-white mt-3 animate-pulse"></div>
    <div className="h-[2px] bg-white mt-3 animate-pulse"></div>
  </div>

  {/* Floating Circles */}
  <div className="absolute top-24 right-12 w-4 h-4 border-2 border-white rounded-full animate-bounce"></div>

  <div className="absolute top-40 right-24 w-3 h-3 border border-white rounded-full animate-ping"></div>

  <div className="absolute bottom-48 right-10 w-5 h-5 border-2 border-cyan-200 rounded-full animate-bounce"></div>

  {/* Content */}
  <div className="relative z-10 px-6 pt-14">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-full">

      <span className="text-2xl">🎧</span>

      <span className="text-white font-semibold">
        Customer Support
      </span>

    </div>

    {/* Heading */}
    <h1 className="mt-8 text-6xl font-extrabold text-white leading-none">
      Contact Us
    </h1>

    {/* Description */}
    <p className="mt-6 text-white/90 text-xl leading-relaxed max-w-xs">
      Questions about pickup, delivery or laundry care?
      Our support team is always ready to help.
    </p>

    {/* CTA Card */}
    <div className="mt-12 bg-white rounded-3xl p-6 shadow-2xl">

      <h3 className="text-[#0f3d7a] text-3xl font-bold">
        Get In Touch
      </h3>

      <p className="text-gray-500 mt-3">
        Need help with your order?
        Contact our team anytime.
      </p>

      <button className="mt-5 w-full py-4 rounded-2xl bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] text-white font-bold text-lg hover:scale-105 transition-all duration-300">
        Contact Support →
      </button>

    </div>

  </div>

</div>

      {/* Contact Section */}
      <section className="bg-[#f7f9fc] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
            {/* Left Form */}
            <form onSubmit={handleSubmit} className="bg-white border border-blue-100 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
              <h2 className="text-3xl font-bold text-[#0f3d7a]">
                Send a Message
              </h2>

              <p className="text-gray-500 text-sm mt-2 mb-8">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                    FIRST NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Jane"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                    LAST NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    required
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                />
              </div>

              <div className="mt-5">
                <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                  INQUIRY TYPE
                </label>

                <select 
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full h-12 px-4 border border-slate-200 rounded-xl outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Order Support">Order Support</option>
                  <option value="Pickup Request">Pickup Request</option>
                  <option value="Dry Cleaning">Dry Cleaning</option>
                  <option value="General Query">General Query</option>
                </select>
              </div>

              <div className="mt-5">
                <label className="block text-[11px] font-bold tracking-wider text-[#0f3d7a] mb-2">
                  MESSAGE
                </label>

                <textarea
                  rows="6"
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 border border-slate-200 rounded-xl outline-none resize-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full h-12 mt-6 rounded-xl text-white font-semibold bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] hover:from-[#2563eb] hover:to-[#0f3d7a] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                Send Message →
              </button>
            </form>

            {/* Right Side */}
            <div className="space-y-5">
              {/* Direct Contact */}
              <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f3d7a]">
                  Direct Contact
                </h3>

                <div className="flex gap-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaPhoneAlt className="text-blue-600 text-sm" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-500">PHONE</p>
                    <p className="text-sm font-medium">+91 98765 43210</p>
                    <small className="text-gray-500">Mon-Fri, 8am - 8pm</small>
                  </div>
                </div>

                <hr className="my-5 border-slate-200" />

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaEnvelope className="text-blue-600 text-sm" />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-500">EMAIL</p>
                    <p className="text-sm font-medium">support@athenura.com</p>
                    <small className="text-gray-500">
                      Average response time: 2 hours
                    </small>
                  </div>
                </div>
              </div>

              {/* Headquarters */}
              <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0f3d7a]">
                  Headquarters
                </h3>

                <div className="flex gap-4 mt-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-blue-600 text-sm" />
                  </div>

                  <div className="text-sm text-gray-700">
                    RDC Raj Nagar <br />
                    Ghaziabad Uttar Pradesh
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-lg">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps?q=Mumbai&output=embed"
                    className="w-full h-48 rounded-xl mt-5 border-0"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
