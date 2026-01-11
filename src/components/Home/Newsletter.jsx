import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        if (!email) {
            return toast.error("Please enter a valid email address");
        }
        toast.success("Thank you for subscribing to our newsletter!");
        e.target.reset();
    }

    return (
        <div className="py-16 my-12 bg-primary text-primary-content rounded-2xl relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-8">
                <div className="md:w-1/2">
                    <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
                    <p className="opacity-90">
                        Stay updated with the latest financial tips, new loan products, and exclusive offers delivered straight to your inbox.
                    </p>
                </div>
                
                <div className="md:w-1/2 w-full">
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="input input-bordered w-full text-base-content focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                        <button type="submit" className="btn btn-secondary text-white hover:scale-105 transition-transform">
                            Subscribe <FaPaperPlane className="ml-2" />
                        </button>
                    </form>
                    <p className="text-xs mt-3 opacity-70">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
