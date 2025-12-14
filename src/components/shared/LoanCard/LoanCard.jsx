import React from 'react';
import { Link } from 'react-router';

const LoanCard = ({ loan }) => {
    const { _id, title, loanImage, category, interestRate, maxLoanLimit } = loan;

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-200">
            <figure className="h-48 overflow-hidden">
                <img src={loanImage} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
            </figure>
            <div className="card-body">
                <div className="flex justify-between items-start">
                    <h2 className="card-title text-lg font-bold">{title}</h2>
                    <div className="badge badge-secondary badge-outline text-xs">{category}</div>
                </div>
                
                <div className="space-y-2 my-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-base-content/70">Interest Rate:</span>
                        <span className="font-semibold text-primary">{interestRate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-base-content/70">Max Limit:</span>
                        <span className="font-semibold">${maxLoanLimit.toLocaleString()}</span>
                    </div>
                </div>

                <div className="card-actions justify-end mt-auto">
                    <Link to={`/loan-details/${_id}`} className="btn btn-primary btn-block">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default LoanCard;
