import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const AboutSection = () => {
    return (
        <div className="py-12 my-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2"
                >
                    <img 
                        src="https://img.freepik.com/free-photo/close-up-keyboard-glasses-with-executives-background_1098-3635.jpg?semt=ais_hybrid&w=740&q=80" 
                        alt="About Us" 
                        className="rounded-lg shadow-2xl w-full object-cover h-100"
                    />
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/2 space-y-6"
                >
                    <h2 className="text-3xl lg:text-4xl font-bold">Empowering Your Financial Future</h2>
                    <p className="text-base-content/70 text-lg">
                        At LoanZone, we believe that everyone deserves access to fair and transparent financial solutions. Since our inception, we've been dedicated to bridging the gap between dreams and reality by providing accessible loans to individuals and businesses alike.
                    </p>
                    <p className="text-base-content/70">
                        Our mission is to simplify the lending process, eliminating the bureaucracy and hidden fees often associated with traditional banking. We leverage cutting-edge technology to offer fast approvals and competitive rates.
                    </p>
                    <Link to="/about" className="btn btn-primary">Learn More About Us</Link>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutSection;
