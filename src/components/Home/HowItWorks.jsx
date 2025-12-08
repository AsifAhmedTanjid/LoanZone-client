import React from 'react';
import { FaSearch, FaFileContract, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            icon: <FaSearch className="text-4xl text-primary" />,
            title: "Browse Loans",
            description: "Explore our wide range of loan products to find the one that fits your needs."
        },
        {
            id: 2,
            icon: <FaFileContract className="text-4xl text-primary" />,
            title: "Apply Online",
            description: "Complete our secure and straightforward online application in just a few minutes."
        },
        {
            id: 3,
            icon: <FaCheckCircle className="text-4xl text-primary" />,
            title: "Get Approved",
            description: "Receive a decision quickly and get your funds directly deposited upon approval."
        },
        {
            id: 4,
            icon: <FaMoneyBillWave className="text-4xl text-primary" />,
            title: "Receive Funds",
            description: "Funds are transferred to your account instantly after final verification."
        }
    ];

    return (
        <div className="py-16 bg-base-200 rounded-xl my-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    Getting a loan with LoanZone is simple and transparent. Follow these easy steps to secure your funding.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                {steps.map((step) => (
                    <div key={step.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="card-body items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                {step.icon}
                            </div>
                            <h3 className="card-title mb-2">{step.title}</h3>
                            <p className="text-base-content/70 text-sm">{step.description}</p>
                            <div className="badge badge-primary badge-outline mt-4">Step {step.id}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
