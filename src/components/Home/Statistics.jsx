import React from 'react';
import { motion } from 'framer-motion';

const Statistics = () => {
    return (
        <div className="py-12 bg-base-200 rounded-xl my-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Our Impact</h2>
                <p className="text-base-content/70">Trusted by thousands across the nation</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="text-4xl font-bold text-primary mb-2">15K+</div>
                    <div className="text-sm font-medium uppercase tracking-wide">Loans Disbursed</div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center"
                >
                    <div className="text-4xl font-bold text-secondary mb-2">$50M+</div>
                    <div className="text-sm font-medium uppercase tracking-wide">Volume Traded</div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                >
                    <div className="text-4xl font-bold text-accent mb-2">99%</div>
                    <div className="text-sm font-medium uppercase tracking-wide">Satisfaction Rate</div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                >
                    <div className="text-4xl font-bold text-info mb-2">24/7</div>
                    <div className="text-sm font-medium uppercase tracking-wide">Support Available</div>
                </motion.div>
            </div>
        </div>
    );
};

export default Statistics;
