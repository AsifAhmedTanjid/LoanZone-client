import React, { useState, useEffect } from 'react';
import Container from '../../components/shared/Container/Container';
import LoanCard from '../../components/shared/LoanCard/LoanCard';
import LoanCardSkeleton from '../../components/shared/LoanCard/LoanCardSkeleton';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const AllLoans = () => {
    const axiosPublic = useAxios();
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");
    const itemsPerPage = 8;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['loans', currentPage, itemsPerPage, search, category, sortBy],
        queryFn: async () => {
            const params = new URLSearchParams();
            params.append('page', currentPage);
            params.append('size', itemsPerPage);
            if (search) params.append('search', search);
            if (category) params.append('category', category);
            if (sortBy) params.append('sortBy', sortBy);
            
            const { data } = await axiosPublic.get(`/loans?${params.toString()}`);
            return data;
        }
    });

    const { data: countData } = useQuery({
        queryKey: ['loansCount', search, category],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (category) params.append('category', category);
            
            const { data } = await axiosPublic.get(`/loansCount?${params.toString()}`);
            return data;
        }
    });

    const count = countData?.count || 0;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
        }
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

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
                    <input
                        type="text"
                        placeholder="Search loans..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
                        className="input input-bordered w-full md:w-1/3"
                    />
                    
                    <div className="flex gap-4 w-full md:w-auto">
                        <select 
                            className="select select-bordered w-full md:w-auto"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setCurrentPage(0); }}
                        >
                            <option value="">All Categories</option>
                            <option value="Personal">Personal Loan</option>
                            <option value="Home">Home Loan</option>
                            <option value="Business">Business Loan</option>
                            <option value="Vehicle">Vehicle Loan</option>
                            <option value="Education">Education Loan</option>
                            <option value="Agriculture">Agriculture Loan</option>
                        </select>

                        <select 
                            className="select select-bordered w-full md:w-auto"
                            value={sortBy}
                            onChange={(e) => { setSortBy(e.target.value); setCurrentPage(0); }}
                        >
                            <option value="">Sort By</option>
                            <option value="interestRateLow">Interest Rate (Low to High)</option>
                            <option value="interestRateHigh">Interest Rate (High to Low)</option>
                            <option value="amountHigh">Amount (High to Low)</option>
                            <option value="amountLow">Amount (Low to High)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        [...Array(8)].map((_, index) => (
                            <LoanCardSkeleton key={index} />
                        ))
                    ) : (
                        loans.map(loan => (
                            <LoanCard key={loan._id} loan={loan} />
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                <div className='text-center mt-12'>
                    <div className="join">
                        <button onClick={handlePrevPage} className="join-item btn btn-outline">Prev</button>
                        {
                            pages.map(page => <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`join-item btn ${currentPage === page ? 'btn-active btn-primary' : 'btn-outline'}`}
                            >{page + 1}</button>)
                        }
                        <button onClick={handleNextPage} className="join-item btn btn-outline">Next</button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AllLoans;
