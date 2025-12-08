import React, { useEffect, useState } from 'react';
import Container from '../../components/shared/Container/Container';
import LoanCard from '../../components/shared/LoanCard/LoanCard';

const AllLoans = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/loans.json')
            .then(res => res.json())
            .then(data => {
                setLoans(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch loans:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 text-primary">Explore Our Loans</h1>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Find the perfect financial solution for your needs. Browse through our wide range of loan products designed to help you achieve your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loans.map(loan => (
                        <LoanCard key={loan._id} loan={loan} />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default AllLoans;
