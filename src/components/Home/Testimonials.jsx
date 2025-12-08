import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Jhankar Mahbub",
            role: "Business Owner",
            image: "https://i.ibb.co.com/nMN9rHXt/FB-IMG-1734106780258-1024x1024-jpg-bv-resized-mobile-jpg-bv.webp",
            rating: 5,
            text: "LoanZone helped me expand my bakery business when traditional banks turned me away. The process was incredibly fast and the rates were fair. I couldn't be happier!"
        },
        {
            id: 2,
            name: "Asif Ahmed",
            role: "Homeowner",
            image: "https://i.ibb.co.com/zVTgPJC0/Screenshot-2025-10-25-124246.png",
            rating: 5,
            text: "The mortgage application process was smooth and transparent. The team guided me through every step. Thanks to LoanZone, I'm now living in my dream home."
        },
        {
            id: 3,
            name: "Abdur Rakib",
            role: "Freelance Designer",
            image: "https://i.ibb.co.com/zT6VJwBp/1750676584597.jpg",
            rating: 4,
            text: "I needed a personal loan for an emergency, and LoanZone came through. The approval was quick, and the funds were in my account the next day. Highly recommended."
        },
        {
            id: 4,
            name: "Azizul Islam Milton",
            role: "Tech Entrepreneur",
            image: "https://i.ibb.co.com/LdH46WKY/Screenshot-2025-10-25-124736.png",
            rating: 5,
            text: "Excellent service! The platform is user-friendly, and the customer support is top-notch. They really care about finding the right financial solution for you."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = React.useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className="py-16 my-12">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
                <p className="text-base-content/70 max-w-2xl mx-auto">
                    Don't just take our word for it. Here's what our satisfied borrowers have to say about their experience with LoanZone.
                </p>
            </div>

            <div className="relative mx-auto px-4">

                <div className="card bg-base-100 shadow-xl border border-base-200">
                    <div className="card-body items-center text-center py-12">
                        <FaQuoteLeft className="text-4xl text-primary/20 mb-6" />
                        
                        <p className="text-xl italic mb-8 max-w-2xl min-h-[100px] flex items-center justify-center">
                            "{testimonials[currentIndex].text}"
                        </p>
                        
                        <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i} 
                                    className={i < testimonials[currentIndex].rating ? "text-warning" : "text-base-300"} 
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
                                </div>
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-lg">{testimonials[currentIndex].name}</h4>
                                <p className="text-sm text-base-content/70">{testimonials[currentIndex].role}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-12">
                    <button onClick={prevSlide} className="btn btn-circle btn-primary btn-outline">❮</button>
                </div>
                <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-12">
                    <button onClick={nextSlide} className="btn btn-circle btn-primary btn-outline">❯</button>
                </div>
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button 
                            key={index} 
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-primary' : 'bg-base-300'}`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
