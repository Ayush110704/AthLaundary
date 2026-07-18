// components/Review.jsx
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Carousel from '../Ui/Carousel';

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review:
        "Excellent service! My clothes came back perfectly cleaned, folded, and delivered on time. Highly recommended.",
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 4,
      review:
        "The pickup and delivery process was super convenient. Their stain removal service is impressive.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 4,
      review:
        "Very professional staff and affordable pricing. My shirts looked brand new after washing.",
    },
    {
      id: 4,
      name: "Daniel Miller",
      rating: 5,
      review:
        "Fast turnaround and great customer support. This has become my go-to laundry service.",
    },
    {
      id: 5,
      name: "Jessica Taylor",
      rating: 5,
      review:
        "Absolutely love this service! They handle delicate fabrics with care and always return my items smelling fresh.",
    },
    {
      id: 6,
      name: "David Clark",
      rating: 4,
      review:
        "Reliable and punctual. The online booking system is very user-friendly and the quality is consistently good.",
    },
    {
      id: 7,
      name: "Amanda White",
      rating: 5,
      review:
        "Best laundry service in town! They even remembered my preferences for folding and packaging. Truly personalized service.",
    },
    {
      id: 8,
      name: "Robert Green",
      rating: 4,
      review:
        "Great value for money. My clothes are always perfectly pressed and the customer service team is very responsive.",
    }
  ];

  // Create duplicates for seamless infinite scroll
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  // Review Card Component
  const ReviewCard = ({ review, cardWidth }) => (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100"
      style={{ 
        width: `${cardWidth}px`,
        minHeight: '280px',
        flexShrink: 0
      }}
      whileHover={{
        scale: 1.03,
        y: -8,
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        transition: { duration: 0.2 }
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < review.rating 
                ? 'fill-blue-900 text-blue-900' 
                : 'text-gray-300 fill-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed flex-grow text-base">
        "{review.review}"
      </p>

      {/* Customer Name */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="font-semibold text-blue-950 text-lg">
          — {review.name}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="w-full bg-gradient-to-b from-white via-blue-50 to-blue-100 py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-950">
            Customers Review
          </h1>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-lg font-bold text-blue-900">
              4.9/5
            </p>
          </div>
        </div>

        {/* Carousel */}
        <Carousel 
          speed={0.8}
          pauseOnHover={true}
          autoScroll={true}
          gap={24}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard 
              key={`${review.id}-${index}`}
              review={review}
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Review;