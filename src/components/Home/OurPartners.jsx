import React from 'react';
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcStripe, FaCcAmex, FaCcDiscover } from 'react-icons/fa';
import { motion } from 'framer-motion';

const OurPartners = () => {
    return (
        <div className="py-12 my-12 border-t border-b border-base-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold opacity-70">Trusted By Global Payment Partners</h2>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <motion.div whileHover={{ scale: 1.1, color: '#1A1F71' }}>
                    <FaCcVisa className="text-6xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, color: '#EB001B' }}>
                    <FaCcMastercard className="text-6xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, color: '#003087' }}>
                    <FaCcPaypal className="text-6xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, color: '#008cdd' }}>
                    <FaCcStripe className="text-6xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, color: '#2E77BC' }}>
                    <FaCcAmex className="text-6xl" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1, color: '#FF6000' }}>
                    <FaCcDiscover className="text-6xl" />
                </motion.div>
            </div>
        </div>
    );
};

export default OurPartners;
