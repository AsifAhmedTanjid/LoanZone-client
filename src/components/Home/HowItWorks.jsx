import React from "react";
import {
  FaSearch,
  FaFileContract,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearch className="text-4xl text-primary" />,
      title: "Browse Loans",
      description:
        "Explore our wide range of loan products to find the one that fits your needs.",
    },
    {
      id: 2,
      icon: <FaFileContract className="text-4xl text-primary" />,
      title: "Apply Online",
      description:
        "Complete our secure and straightforward online application in just a few minutes.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      title: "Get Approved",
      description:
        "Receive a decision quickly and get your funds directly deposited upon approval.",
    },
    {
      id: 4,
      icon: <FaMoneyBillWave className="text-4xl text-primary" />,
      title: "Receive Funds",
      description:
        "Funds are transferred to your account instantly after final verification.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="py-12 rounded-xl my-12 bg-base-200/30 px-4">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          className="text-3xl font-bold mb-4"
        >
          How It Works
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="text-base-content/70 max-w-2xl mx-auto"
        >
          Getting a loan with LoanZone is simple and transparent. Follow these
          easy steps to secure your funding.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {steps.map((step) => (
          <motion.div
            key={step.id}
            variants={item}

            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <span className="text-6xl font-bold text-primary">{step.id}</span>
            </div>
            <div className="card-body items-center text-center z-10">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4   transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="card-title mb-2">{step.title}</h3>
              <p className="text-base-content/70 text-sm">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HowItWorks;
