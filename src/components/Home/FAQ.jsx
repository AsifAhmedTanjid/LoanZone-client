import React from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What documents do I need to apply for a loan?",
      answer:
        "Typically, you'll need to provide proof of identity (ID card or passport), proof of income (pay stubs or bank statements), and proof of address (utility bill). Specific requirements may vary based on the loan type.",
    },
    {
      question: "How long does the approval process take?",
      answer:
        "Our automated system provides initial decisions within minutes. Once approved, funds are usually deposited into your account within 24 hours.",
    },
    {
      question: "Can I pay off my loan early?",
      answer:
        "Yes! At LoanZone, we believe in financial freedom. You can pay off your loan early at any time without any prepayment penalties.",
    },
    {
      question: "What interest rates do you offer?",
      answer:
        "Our rates are competitive and depend on your creditworthiness and the loan term. Rates start as low as 5.99% APR for qualified borrowers.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use bank-level encryption and security measures to protect your personal and financial data. We never share your information with third parties without your consent.",
    },
  ];

  return (
    <div className="py-12 rounded-xl my-12">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-3xl font-bold mb-4"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="text-base-content/70 max-w-2xl mx-auto"
        >
          Have questions? We have answers. Here are some of the most common
          questions our customers ask.
        </motion.p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: index * 0.1 }}
            className="collapse collapse-plus bg-base-100 border border-base-300"
          >
            <input
              type="radio"
              name="my-accordion-3"
              defaultChecked={index === 0}
            />
            <div className="collapse-title text-lg font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p className="text-base-content/70">{faq.answer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
