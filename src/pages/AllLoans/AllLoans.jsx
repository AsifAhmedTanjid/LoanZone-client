import React, { useState, useEffect } from 'react';
import Container from '../../components/shared/Container/Container';
import LoanCard from '../../components/shared/LoanCard/LoanCard';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import useAxios from '../../hooks/useAxios';

const AllLoans = () => {
    const axiosPublic = useAxios();
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['loans', currentPage, itemsPerPage],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/loans?page=${currentPage}&size=${itemsPerPage}`);
            return data;
        }
    });

    const { data: countData } = useQuery({
        queryKey: ['loansCount'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/loansCount');
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

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
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
