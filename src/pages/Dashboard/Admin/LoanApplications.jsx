import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';
import { FaEye } from 'react-icons/fa';

const LoanApplications = () => {
    const axiosSecure = useAxiosSecure();
    const [filterStatus, setFilterStatus] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['admin-applications'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/applications');
            return data;
        }
    });

    const filteredApplications = filterStatus 
        ? applications.filter(app => app.status === filterStatus)
        : applications;

    const openDetailsModal = (application) => {
        setSelectedApplication(application);
        document.getElementById('application_details_modal').showModal();
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
            <h2 className="text-3xl font-bold mb-6">Loan Applications</h2>

            <div className="mb-6">
                <select 
                    className="select select-bordered w-full max-w-xs"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            
            <div className="overflow-x-auto w-full max-w-[calc(100vw-2rem)] md:max-w-full bg-base-100 rounded-xl shadow-lg border border-base-200">
                <table className="table w-full min-w-150">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Loan ID</th>
                            <th>User Info</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map((app) => (
                            <tr key={app._id} className="hover">
                                <td className="font-mono text-xs">{app._id}</td>
                                <td>
                                    <div className="flex flex-col">
                                        <span className="font-bold">{app.applicantName}</span>
                                        <span className="text-xs opacity-70">{app.borrowerEmail}</span>
                                    </div>
                                </td>
                                <td>{app.loanCategory || 'N/A'}</td>
                                <td className="font-bold">${app.loanAmount}</td>
                                <td>
                                    <div className={`badge ${
                                        app.status === 'approved' ? 'badge-success' : 
                                        app.status === 'rejected' ? 'badge-error' : 'badge-warning'
                                    }`}>
                                        {app.status || 'pending'}
                                    </div>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => openDetailsModal(app)}
                                        className="btn btn-sm btn-ghost text-info tooltip" 
                                        data-tip="View Details"
                                    >
                                        <FaEye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Details Modal */}
            <dialog id="application_details_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-lg mb-4">Application Details</h3>
                    {selectedApplication && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-base-200 rounded-lg">
                                <h4 className="font-bold text-sm opacity-70 mb-2">Applicant Information</h4>
                                <p><span className="font-semibold">Name:</span> {selectedApplication.borrowerName}</p>
                                <p><span className="font-semibold">Email:</span> {selectedApplication.borrowerEmail}</p>
                                <p><span className="font-semibold">Phone:</span> {selectedApplication.contactNumber}</p>
                                <p><span className="font-semibold">Address:</span> {selectedApplication.address}</p>
                                <p><span className="font-semibold">ID Number:</span> {selectedApplication.nid}</p>
                            </div>
                            <div className="p-4 bg-base-200 rounded-lg">
                                <h4 className="font-bold text-sm opacity-70 mb-2">Loan Information</h4>
                                <p><span className="font-semibold">Amount:</span> ${selectedApplication.loanAmount}</p>
                                <p><span className="font-semibold">Category:</span> {selectedApplication.loanCategory || 'N/A'}</p>
                                <p><span className="font-semibold">Income Source:</span> {selectedApplication.incomeSource}</p>
                                <p><span className="font-semibold">Monthly Income:</span> ${selectedApplication.monthlyIncome}</p>
                                <p><span className="font-semibold">Reason:</span> {selectedApplication.reason}</p>
                            </div>
                            <div className="col-span-1 md:col-span-2 p-4 bg-base-200 rounded-lg">
                                <h4 className="font-bold text-sm opacity-70 mb-2">Status & Notes</h4>
                                <p><span className="font-semibold">Current Status:</span> <span className="uppercase font-bold">{selectedApplication.status || 'pending'}</span></p>
                                <p><span className="font-semibold">Application Date:</span> {selectedApplication.appliedDate ? new Date(selectedApplication.appliedDate).toLocaleDateString() : 'N/A'}</p>
                                {selectedApplication.notes && (
                                    <p className="mt-2"><span className="font-semibold">Notes:</span> {selectedApplication.notes}</p>
                                )}
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

export default LoanApplications;
