import React from "react";
import {
  FaPercent,
  FaClock,
  FaShieldAlt,
  FaHandHoldingUsd,
  FaHeadset,
  FaFileContract,
} from "react-icons/fa";
import Container from "../shared/Container/Container";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaPercent />,
      title: "Competitive Rates",
      description:
        "Enjoy some of the lowest interest rates in the market, tailored to your credit profile.",
    },
    {
      icon: <FaClock />,
      title: "Fast Approval",
      description:
        "Get a decision in minutes, not days. Our automated system speeds up the process.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Private",
      description:
        "Your data is protected with bank-level encryption. We prioritize your privacy.",
    },
    {
      icon: <FaHandHoldingUsd />,
      title: "Flexible Repayment",
      description:
        "Choose a repayment plan that fits your budget, from 12 to 60 months.",
    },
    {
      icon: <FaFileContract />,
      title: "No Hidden Fees",
      description:
        "What you see is what you get. No origination fees or prepayment penalties.",
    },
    {
      icon: <FaHeadset />,
      title: "Expert Support",
      description:
        "Our dedicated team of loan specialists is available 24/7 to assist you.",
    },
  ];

  return (
    <div className="py-12 rounded-3xl my-12">
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose LoanZone?</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            We are committed to providing the best financial solutions with
            transparency and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-200"
            >
              <div className="card-body items-center text-center">
                <div className="text-4xl text-primary mb-4 p-4 bg-primary/10 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="card-title mb-2">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
