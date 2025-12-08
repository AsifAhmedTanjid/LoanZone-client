import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "What documents do I need to apply for a loan?",
            answer: "Typically, you'll need to provide proof of identity (ID card or passport), proof of income (pay stubs or bank statements), and proof of address (utility bill). Specific requirements may vary based on the loan type."
        },
        {
            question: "How long does the approval process take?",
            answer: "Our automated system provides initial decisions within minutes. Once approved, funds are usually deposited into your account within 24 hours."
        },
        {
            question: "Can I pay off my loan early?",
            answer: "Yes! At LoanZone, we believe in financial freedom. You can pay off your loan early at any time without any prepayment penalties."
        },
        {
            question: "What interest rates do you offer?",
            answer: "Our rates are competitive and depend on your creditworthiness and the loan term. Rates start as low as 5.99% APR for qualified borrowers."
        },
        {
            question: "Is my personal information secure?",
            answer: "Absolutely. We use bank-level encryption and security measures to protect your personal and financial data. We never share your information with third parties without your consent."
        }
    ];

    return (
        <div className="py-12 rounded-xl my-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    Have questions? We have answers. Here are some of the most common questions our customers ask.
                </p>
            </div>

            <div className=" space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="collapse collapse-plus bg-base-100 border border-base-300">
                        <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
                        <div className="collapse-title text-xl font-medium">
                            {faq.question}
                        </div>
                        <div className="collapse-content">
                            <p className="text-base-content/70">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
