import React from 'react';
import { Link } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
            <div className="max-w-md">
                <FaExclamationTriangle className="text-8xl text-warning mx-auto mb-6" />
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
                <p className="text-base-content/70 mb-8">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="btn btn-primary btn-wide">
                    <FaHome className="mr-2" /> Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
