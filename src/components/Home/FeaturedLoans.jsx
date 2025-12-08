import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import LoanCard from '../shared/LoanCard/LoanCard';


const FeaturedLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/loans.json')
            .then(res => res.json())
            .then(data => {
                setLoans(data.slice(0, 6));
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch loans:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="py-12 my-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Available Loans</h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    Explore our most popular loan packages designed to meet your financial needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loans.map(loan => (
                    <LoanCard key={loan._id} loan={loan} />
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/all-loans" className="btn btn-outline btn-primary btn-wide">
                    See All Loans
                </Link>
            </div>
        </div>
    );
};

export default FeaturedLoans;
