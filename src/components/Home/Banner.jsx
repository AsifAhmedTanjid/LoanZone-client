import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className="hero min-h-[600px] rounded-xl overflow-hidden my-8"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80)",
      }}
    >
      <div className="hero-overlay bg-black/50"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Empowering Your Dreams with Easy Loans
          </h1>
          <p className="mb-5 text-gray-200 text-lg">
            Whether you're looking to buy a home, start a business, or manage
            unexpected expenses, LoanZone is here to help. Experience
            hassle-free application and quick disbursement.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/all-loans" className="btn btn-primary btn-lg">
              Explore Loans
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
