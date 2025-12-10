import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Container from '../../components/shared/Container/Container';
import useAuth from '../../hooks/useAuth';
import { HashLoader } from 'react-spinners';
import { 
    FaMoneyBillWave, 
    FaPercent, 
    FaCalendarAlt, 
    FaCheckCircle, 
    FaArrowLeft,
    FaFileAlt,
    FaUserCheck,
    FaClock,
    FaHandHoldingUsd,
    FaInfoCircle
} from 'react-icons/fa';

const LoanDetails = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const requiredDocs = [
        "Valid Government ID (NID/Passport)",
        "Bank Statement (Last 6 months)",
        "Proof of Income / Salary Certificate",
        "Utility Bill Copy"
    ];

    const eligibility = [
        "Age: 21 - 60 years",
        "Minimum Monthly Income: $500",
        "Employment Status: Salaried or Self-Employed",
        "Credit Score: 650+"
    ];

    const features = [
        "Instant Approval",
        "No Hidden Charges",
        "Minimal Documentation",
        "Flexible Repayment",
        "24/7 Customer Support",
        "Secure Process"
    ];

    const faqs = [
        {
            question: "How long does the approval process take?",
            answer: "Typically, loans are approved within 24 hours of document submission."
        },
        {
            question: "Can I prepay my loan?",
            answer: "Yes, you can prepay your loan after 6 months with a minimal charge."
        },
        {
            question: "Is collateral required?",
            answer: "For personal loans, no collateral is required. Business loans may vary."
        }
    ];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    useEffect(() => {
        fetch('/loans.json')
            .then(res => res.json())
            .then(data => {
                const foundLoan = data.find(l => l._id === parseInt(id) || l._id === id);
                setLoan(foundLoan);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch loan details:", err);
                setLoading(false);
            });
    }, [id]);

    const handleApply = () => {
        navigate(`/apply-loan/${id}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    if (!loan) {
        return (
            <Container>
                <div className="text-center py-20">
                    <h2 className="text-3xl font-bold text-error">Loan Not Found</h2>
                    <button onClick={() => navigate('/all-loans')} className="btn btn-primary mt-4">Back to All Loans</button>
                </div>
            </Container>
        );
    }

    const { title, image, category, interestRate, maxLoanLimit, description, emiOptions } = loan;

    return (
        <div className="bg-base-200 min-h-screen py-12">
            <Container>
                <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6 gap-2 hover:bg-base-300">
                    <FaArrowLeft /> Back to Loans
                </button>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
                    <div className="space-y-8">
                        <div className="rounded-2xl overflow-hidden shadow-2xl h-[300px] md:h-[400px] group">
                            <img 
                                src={image} 
                                alt={title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-base-100 p-6 rounded-xl shadow-md border-l-4 border-primary hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <FaPercent size={20} />
                                    </div>
                                    <span className="text-sm font-semibold text-base-content/60">Interest Rate</span>
                                </div>
                                <h3 className="text-2xl font-bold text-base-content">{interestRate}</h3>
                            </div>
                            
                            <div className="bg-base-100 p-6 rounded-xl shadow-md border-l-4 border-secondary hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                                        <FaMoneyBillWave size={20} />
                                    </div>
                                    <span className="text-sm font-semibold text-base-content/60">Max Limit</span>
                                </div>
                                <h3 className="text-2xl font-bold text-base-content">${maxLoanLimit?.toLocaleString()}</h3>
                            </div>

                            <div className="bg-base-100 p-6 rounded-xl shadow-md border-l-4 border-accent hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-3 bg-accent/10 rounded-full text-accent">
                                        <FaHandHoldingUsd size={20} />
                                    </div>
                                    <span className="text-sm font-semibold text-base-content/60">Processing Fee</span>
                                </div>
                                <h3 className="text-2xl font-bold text-base-content">1% - 2%</h3>
                            </div>

                            <div className="bg-base-100 p-6 rounded-xl shadow-md border-l-4 border-info hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-3 bg-info/10 rounded-full text-info">
                                        <FaClock size={20} />
                                    </div>
                                    <span className="text-sm font-semibold text-base-content/60">Disbursal</span>
                                </div>
                                <h3 className="text-2xl font-bold text-base-content">24 Hours</h3>
                            </div>
                        </div>
                        <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-200">
                            <h3 className="text-xl font-bold mb-4 text-base-content">Why Choose This Loan?</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <FaCheckCircle className="text-primary" />
                                        <span className="text-sm font-medium text-base-content/80">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-base-100 p-8 rounded-2xl shadow-xl h-fit border border-base-200">
                        <div className="flex justify-between items-start gap-4 mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">{title}</h1>
                            <span className="badge badge-secondary badge-lg font-medium px-4 py-3 shrink-0">{category}</span>
                        </div>
                        
                        <div className="prose max-w-none mb-8">
                            <p className="text-lg text-base-content/80 leading-relaxed">
                                {description}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <FaUserCheck className="text-success" /> Eligibility
                                </h4>
                                <ul className="space-y-2">
                                    {eligibility.map((item, idx) => (
                                        <li key={idx} className="text-sm text-base-content/70 flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-base-content/40"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                                    <FaFileAlt className="text-warning" /> Documents
                                </h4>
                                <ul className="space-y-2">
                                    {requiredDocs.map((item, idx) => (
                                        <li key={idx} className="text-sm text-base-content/70 flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-base-content/40"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
                                <FaCalendarAlt className="text-primary" />
                                Flexible EMI Options
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {emiOptions?.map((plan, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-base-200 p-3 rounded-lg border border-base-300 hover:border-primary transition-colors cursor-default">
                                        <FaCheckCircle className="text-success text-sm" />
                                        <span className="font-medium text-sm md:text-base">{plan}</span>
                                    </div>
                                )) || <span className="text-sm text-gray-500">No specific plans listed.</span>}
                            </div>
                        </div>

                        <div className="card-actions mt-8 mb-8">
                            <button 
                                onClick={handleApply} 
                                className="btn btn-primary btn-lg w-full shadow-lg hover:shadow-primary/50 transition-all transform hover:-translate-y-1 "
                                disabled={!user}
                            >
                                Apply for this Loan
                            </button>
                            {!user && <p className="text-xs text-center w-full mt-2 text-error font-medium">Please login to apply for this loan</p>}
                        </div>

                        <div className="divider"></div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-base-content">
                                <FaInfoCircle className="text-info" />
                                Frequently Asked Questions
                            </h3>
                            <div className="join join-vertical w-full">
                                {faqs.map((faq, idx) => (
                                    <div key={idx} className="collapse collapse-arrow join-item border border-base-300">
                                        <input type="radio" name="my-accordion-4" defaultChecked={idx === 0} /> 
                                        <div className="collapse-title text-base font-medium">
                                            {faq.question}
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-sm text-base-content/70">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default LoanDetails;
