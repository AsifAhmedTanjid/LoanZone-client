import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="hero min-h-150 rounded-xl overflow-hidden my-8 relative"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80)",
      }}
    >
      <div className="hero-overlay bg-black/60"></div>
      <div className="hero-content text-center text-neutral-content relative z-10">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-5 text-5xl font-bold text-white leading-tight"
          >
            Empowering Your Dreams with <span className="text-primary">Easy Loans</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mb-8 text-gray-200 text-lg"
          >
            Whether you're looking to buy a home, start a business, or manage
            unexpected expenses, LoanZone is here to help. Experience
            hassle-free application and quick disbursement.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Link to="/all-loans" className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform">
              Explore Loans
            </Link>
        
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
