
import React, { useState } from "react";
import {
  FaSearch,
  FaCalendarCheck,
  FaTshirt,
  FaTruck,
  FaMoneyBillWave,
  FaInfoCircle,
  FaChevronDown,
  FaHeadset,
} from "react-icons/fa";

import { faqData, serviceFaqs } from "../Data/LaundaryData";

function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState("");

  const categories = [
    { name: "All", icon: <FaSearch /> },
    { name: "Booking", icon: <FaCalendarCheck /> },
    { name: "Services", icon: <FaTshirt /> },
    { name: "Delivery", icon: <FaTruck /> },
    { name: "Pricing", icon: <FaMoneyBillWave /> },
    { name: "General", icon: <FaInfoCircle /> },
  ];

  const serviceResult = serviceFaqs.find(
    (item) =>
      item.keyword.toLowerCase() === search.toLowerCase().trim()
  );

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" ||
      faq.category === activeCategory;

    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-[#f8fbff] min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center">

          <h1 className="text-4xl md:text-5xl font-bold text-[#0f3d7a] mt-7">
            How can we help?
          </h1>

          <p className="text-gray-500 mt-3">
            Search our frequently asked questions.
          </p>

          <div className="relative max-w-xl mx-auto mt-8">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        {/* Service Search Result */}
        {serviceResult && (
          <div className="max-w-4xl mx-auto mt-8 bg-white border border-blue-100 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-[#0f3d7a]">
              {serviceResult.question}
            </h3>

            <p className="mt-3 text-gray-600 leading-7">
              {serviceResult.answer}
            </p>
          </div>
        )}

        {/* Main Section */}
        <div className="grid lg:grid-cols-[250px_1fr] gap-8 mt-12">

          {/* Sidebar */}
          <div className="bg-white rounded-2xl p-4 shadow-md h-fit">

            <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">
              Categories
            </h3>

            <div className="space-y-2">

              {categories.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveCategory(item.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeCategory === item.name
                      ? "bg-[#0f3d7a] text-white shadow-lg"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}

            </div>
          </div>

          {/* FAQ Content */}
          <div>

            <h2 className="text-2xl font-bold text-[#0f3d7a] mb-6">
              {activeCategory}
            </h2>

            {filteredFaqs.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-gray-700">
                  No FAQs Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try searching with different keywords.
                </p>
              </div>
            )}

            <div className="space-y-4">

              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
                >

                  <button
                    onClick={() =>
                      setOpenId(openId === faq.id ? null : faq.id)
                    }
                    className={`w-full flex justify-between items-center p-5 transition-all duration-500 ${
                      openId === faq.id
                        ? "bg-gradient-to-r from-[#eff6ff] via-[#dbeafe] to-[#eff6ff]"
                        : "bg-white"
                    }`}
                  >

                    <span className="font-semibold text-[#0f3d7a] text-left text-lg">
                      {faq.question}
                    </span>

                    <FaChevronDown
                      className={`transition-all duration-300 ${
                        openId === faq.id
                          ? "rotate-180 text-blue-600"
                          : "text-gray-500"
                      }`}
                    />

                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openId === faq.id
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >

                    <div className="px-5 pb-5 pt-2 text-gray-600 leading-7 bg-white">
                      {faq.answer}
                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Support Card */}
            <div className="mt-10 bg-gradient-to-r from-[#0f3d7a] to-[#2563eb] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between">

              <div>
                <h3 className="text-white text-2xl font-bold">
                  Still have questions?
                </h3>

                <p className="text-blue-100 mt-2">
                  Our support team is ready to help you.
                </p>
              </div>

              <button className="mt-4 md:mt-0 flex items-center gap-2 bg-white text-[#0f3d7a] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                <FaHeadset />
                Contact Support
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default FAQ;
