import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';

const ApprovedApplication = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedApplication, setSelectedApplication] = useState(null);

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['manager-approved-applications', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/manager/applications/${user.email}`);
            return data.filter(app => app.status === 'approved');
        },
        enabled: !!user?.email
    });

    const openModal = (app) => {
        setSelectedApplication(app);
        document.getElementById('approved_application_modal').showModal();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Approved Loan Applications</h2>
            
            {applications.length === 0 ? (
                <div className="text-center py-12 bg-base-200 rounded-xl">
                    <h3 className="text-xl font-semibold text-base-content/70">No approved applications found.</h3>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan ID</th>
                                <th>User Info</th>
                                <th>Amount</th>
                                <th>Approved Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app._id} className="hover">
                                    <td>
                                        <span className="font-mono text-xs">{app._id}</span>
                                    </td>
                                    <td>
                                        <div className="font-bold">{app.borrowerName}</div>
                                        <div className="text-xs text-base-content/60">{app.borrowerEmail}</div>
                                    </td>
                                    <td>${parseInt(app.loanAmount).toLocaleString()}</td>
                                    <td>{app.approvedAt ? new Date(app.approvedAt).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <button 
                                            onClick={() => openModal(app)}
                                            className="btn btn-sm btn-info text-white" 
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Application Details Modal */}
            <dialog id="approved_application_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-lg mb-4">Application Details</h3>
                    {selectedApplication && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm opacity-70">Loan Title</p>
                                <p className="font-semibold">{selectedApplication.loanTitle}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Amount</p>
                                <p className="font-semibold">${parseInt(selectedApplication.loanAmount).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Status</p>
                                <p className="font-semibold text-success">{selectedApplication.status.toUpperCase()}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Approved Date</p>
                                <p className="font-semibold">{selectedApplication.approvedAt ? new Date(selectedApplication.approvedAt).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Applicant Name</p>
                                <p className="font-semibold">{selectedApplication.borrowerName}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Email</p>
                                <p className="font-semibold">{selectedApplication.borrowerEmail}</p>
                            </div>
                             <div>
                                <p className="text-sm opacity-70">Contact</p>
                                <p className="font-semibold">{selectedApplication.contactNumber}</p>
                            </div>
                             <div>
                                <p className="text-sm opacity-70">Income Source</p>
                                <p className="font-semibold">{selectedApplication.incomeSource}</p>
                            </div>
                            <div className="col-span-full">
                                <p className="text-sm opacity-70">Address</p>
                                <p className="font-semibold">{selectedApplication.address}</p>
                            </div>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ApprovedApplication;
