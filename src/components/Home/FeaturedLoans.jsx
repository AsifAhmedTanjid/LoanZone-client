import React from 'react';
import { Link } from 'react-router';
import LoanCard from '../shared/LoanCard/LoanCard';
import LoanCardSkeleton from '../shared/LoanCard/LoanCardSkeleton';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { motion } from 'framer-motion';

const FeaturedLoans = () => {
    const axiosPublic = useAxios();
    const { data: loans = [], isLoading } = useQuery({
        queryKey: ['featured-loans'],
        queryFn: async () => {
            
            const { data: featuredData } = await axiosPublic.get('/loans?featured=true&size=8');
            
            if (featuredData.length > 0) {
                return featuredData;
            }
            
            
            const { data: latestData } = await axiosPublic.get('/loans?size=8');
            return latestData;
        }
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="py-12 my-12">
            <div className="text-center mb-12">
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-4"
                >
                    Available Loans
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base-content/70 max-w-2xl mx-auto"
                >
                    Explore our most popular loan packages designed to meet your financial needs.
                </motion.p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, index) => (
                        <LoanCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {loans.map(loan => (
                        <motion.div key={loan._id} variants={item}>
                            <LoanCard loan={loan} />
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <div className="text-center mt-12">
                <Link to="/all-loans" className="btn btn-outline btn-primary btn-wide hover:scale-105 transition-transform">
                    See All Loans
                </Link>
            </div>
        </div>
    );
};

export default FeaturedLoans;
