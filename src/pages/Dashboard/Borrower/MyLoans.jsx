import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const MyLoans = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['my-applications', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/applications/${user.email}`);
            return data;
        },
        enabled: !!user?.email
    });

    useEffect(() => {
        const success = searchParams.get('success');
        const sessionId = searchParams.get('session_id');
        const applicationId = searchParams.get('applicationId');

        if (success === 'true' && sessionId && applicationId) {
            const verifyPayment = async () => {
                try {
                    const { data } = await axiosSecure.post('/verify-payment', { sessionId, applicationId });
                    if (data.success) {
                        Swal.fire({
                            title: 'Payment Successful!',
                            text: 'Your application fee has been paid.',
                            icon: 'success'
                        });
                        queryClient.invalidateQueries(['my-applications', user?.email]);
                        setSearchParams({});
                    }
                } catch (error) {
                    console.error("Payment verification failed", error);
                
                }
            };
            verifyPayment();
        }
    }, [searchParams, axiosSecure, queryClient, user?.email, setSearchParams]);

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

    const handlePay = async (app) => {
        try {
            const { data } = await axiosSecure.post('/create-checkout-session', {
                applicationId: app._id,
                loanTitle: app.loanTitle,
                amount: 10,
                borrowerEmail: user.email,
                borrowerName: user.displayName
            });
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Payment initiation failed", error);
            toast.error("Failed to initiate payment");
        }
    };

    const openModal = (app) => {
        setSelectedApplication(app);
        document.getElementById('loan_details_modal').showModal();
    };

    const openPaymentModal = (app) => {
        setPaymentDetails(app);
        document.getElementById('payment_details_modal').showModal();
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

                                            {app.paymentStatus === 'paid' ? (
                                                <button 
                                                    onClick={() => openPaymentModal(app)}
                                                    className="badge badge-success badge-outline p-3 cursor-pointer hover:bg-success hover:text-white transition-colors"
                                                >
                                                    Paid
                                                </button>
                                            ) : (
                                                <button 
                                                    className="btn btn-sm btn-success text-white" 
                                                    onClick={() => handlePay(app)}
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

            {/* Payment Details Modal */}
            <dialog id="payment_details_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 text-success">Payment Details</h3>
                    {paymentDetails && (
                        <div className="space-y-4">
                            <div className="p-4 bg-base-200 rounded-lg">
                                <p className="text-sm opacity-70">Transaction ID</p>
                                <p className="font-mono font-semibold break-all">{paymentDetails.transactionId}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Loan ID</p>
                                <p className="font-mono font-semibold">{paymentDetails._id}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Payer Email</p>
                                <p className="font-semibold">{paymentDetails.paymentEmail || paymentDetails.borrowerEmail}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Amount Paid</p>
                                <p className="font-semibold text-xl">${paymentDetails.paymentAmount || 10}</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-70">Payment Date</p>
                                <p className="font-semibold">
                                    {paymentDetails.paymentDate ? new Date(paymentDetails.paymentDate).toLocaleString() : 'N/A'}
                                </p>
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
