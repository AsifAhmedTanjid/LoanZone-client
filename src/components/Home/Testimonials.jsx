import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jhankar Mahbub",
      role: "Business Owner",
      image:
        "https://i.ibb.co.com/nMN9rHXt/FB-IMG-1734106780258-1024x1024-jpg-bv-resized-mobile-jpg-bv.webp",
      rating: 5,
      text: "LoanZone helped me expand my bakery business when traditional banks turned me away. The process was incredibly fast and the rates were fair. I couldn't be happier!",
    },
    {
      id: 2,
      name: "Asif Ahmed",
      role: "Homeowner",
      image: "https://i.ibb.co.com/zVTgPJC0/Screenshot-2025-10-25-124246.png",
      rating: 5,
      text: "The mortgage application process was smooth and transparent. The team guided me through every step. Thanks to LoanZone, I'm now living in my dream home.",
    },
    {
      id: 3,
      name: "Abdur Rakib",
      role: "Freelance Designer",
      image: "https://i.ibb.co.com/zT6VJwBp/1750676584597.jpg",
      rating: 4,
      text: "I needed a personal loan for an emergency, and LoanZone came through. The approval was quick, and the funds were in my account the next day. Highly recommended.",
    },
    {
      id: 4,
      name: "Azizul Islam Milton",
      role: "Tech Entrepreneur",
      image: "https://i.ibb.co.com/LdH46WKY/Screenshot-2025-10-25-124736.png",
      rating: 5,
      text: "Excellent service! The platform is user-friendly, and the customer support is top-notch. They really care about finding the right financial solution for you.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="py-12 my-12">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-3xl font-bold mb-4"
        >
          What Our Customers Say
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="text-base-content/70 max-w-2xl mx-auto"
        >
          Don't just take our word for it. Here's what our satisfied borrowers
          have to say about their experience with LoanZone.
        </motion.p>
      </div>

      <div className="relative mx-auto px-4 max-w-4xl">
        <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
          <div className="card-body items-center text-center py-12">
            <FaQuoteLeft className="text-4xl text-primary/20 mb-6" />

            <div className="min-h-50 flex items-center justify-center w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <p className="text-xl italic mb-8 max-w-2xl mx-auto">
                    "{testimonials[currentIndex].text}"
                  </p>

                  <div className="flex justify-center items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < testimonials[currentIndex].rating
                            ? "text-warning"
                            : "text-base-300"
                        }
                      />
                    ))}
                  </div>

                  <div className="flex flex-col items-center gap-2 mt-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-base-content/60">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex gap-2 mt-6">
                {testimonials.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-base-300'}`}
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
