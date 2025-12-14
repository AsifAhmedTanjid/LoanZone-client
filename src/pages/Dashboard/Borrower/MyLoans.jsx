import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const MyLoans = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedApplication, setSelectedApplication] = useState(null);

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['my-applications', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/applications/${user.email}`);
            return data;
        },
        enabled: !!user?.email
    });

    const { mutate: cancelApplication } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/applications/${id}`);
            return data;
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                Swal.fire(
                    'Cancelled!',
                    'Your loan application has been cancelled.',
                    'success'
                );
                queryClient.invalidateQueries(['my-applications', user?.email]);
            }
        }
    });

    const handleCancel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelApplication(id);
            }
        });
    };

    const handlePay = () => {
        Swal.fire({
            title: 'Payment Feature',
            text: 'Stripe payment integration coming soon!',
            icon: 'info'
        });
    };

    const openModal = (app) => {
        setSelectedApplication(app);
        document.getElementById('loan_details_modal').showModal();
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
                                <th>Loan ID</th>
                                <th>Loan Info</th>
                                <th>Amount</th>
                                <th>Status</th>
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
                                        <div className="font-bold">{app.loanTitle}</div>
                                        <div className="text-xs text-base-content/60">Interest: {app.interestRate}%</div>
                                    </td>
                                    <td>${parseInt(app.loanAmount).toLocaleString()}</td>
                                    <td>
                                        <div className={`badge ${
                                            app.status === 'approved' ? 'badge-success' : 
                                            app.status === 'rejected' ? 'badge-error' : 'badge-warning'
                                        } gap-2`}>
                                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 items-center">
                                            <button 
                                                onClick={() => openModal(app)}
                                                className="btn btn-sm btn-info text-white" 
                                            >
                                                View
                                            </button>
                                            
                                            {app.status === 'pending' && (
                                                <button 
                                                    onClick={() => handleCancel(app._id)}
                                                    className="btn btn-sm btn-error text-white" 
                                                >
                                                    Cancel
                                                </button>
                                            )}

                                            {app.feeStatus === 'paid' ? (
                                                <span className="badge badge-success badge-outline p-3">Paid</span>
                                            ) : (
                                                <button 
                                                    className="btn btn-sm btn-success text-white" 
                                                    onClick={() => handlePay()}
                                                >
                                                    Pay
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Loan Details Modal */}
            <dialog id="loan_details_modal" className="modal">
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
                                <p className={`font-semibold ${
                                    selectedApplication.status === 'approved' ? 'text-success' : 
                                    selectedApplication.status === 'rejected' ? 'text-error' : 'text-warning'
                                }`}>
                                    {selectedApplication.status.toUpperCase()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Applied Date</p>
                                <p className="font-semibold">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
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

export default MyLoans;
