import React from 'react';

const LoanCardSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="skeleton h-48 w-full"></figure>
            <div className="card-body">
                <div className="skeleton h-6 w-3/4 mb-2"></div>
                <div className="skeleton h-4 w-full mb-1"></div>
                <div className="skeleton h-4 w-5/6 mb-4"></div>
                <div className="flex justify-between items-center mb-4">
                    <div className="skeleton h-6 w-20"></div>
                    <div className="skeleton h-6 w-24"></div>
                </div>
                <div className="skeleton h-10 w-full"></div>
            </div>
        </div>
    );
};

export default LoanCardSkeleton;
