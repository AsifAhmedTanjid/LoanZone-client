import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';

const MyLoans = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['my-applications', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/applications/${user.email}`);
            return data;
        },
        enabled: !!user?.email
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">My Loan Applications</h2>
            
            {applications.length === 0 ? (
                <div className="text-center py-12 bg-base-200 rounded-xl">
                    <h3 className="text-xl font-semibold text-base-content/70">You haven't applied for any loans yet.</h3>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>#</th>
                                <th>Loan Title</th>
                                <th>Amount</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, index) => (
                                <tr key={app._id} className="hover">
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="font-bold">{app.loanTitle}</div>
                                    </td>
                                    <td>${parseInt(app.loanAmount).toLocaleString()}</td>
                                    <td>{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <div className={`badge ${
                                            app.status === 'approved' ? 'badge-success' : 
                                            app.status === 'rejected' ? 'badge-error' : 'badge-warning'
                                        } gap-2`}>
                                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyLoans;
