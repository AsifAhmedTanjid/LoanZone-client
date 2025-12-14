import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';
import Swal from 'sweetalert2';

const PendingApplication = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedApplication, setSelectedApplication] = useState(null);

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['manager-applications', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/manager/applications/${user.email}`);
            return data.filter(app => app.status === 'pending');
        },
        enabled: !!user?.email
    });

    const { mutate: updateStatus } = useMutation({
        mutationFn: async ({ id, status }) => {
            const updateData = { status };
            if (status === 'approved') {
                updateData.approvedAt = new Date();
            }
            const { data } = await axiosSecure.patch(`/applications/${id}`, updateData);
            return data;
        },
        onSuccess: (data, variables) => {
            if (data.modifiedCount > 0) {
                Swal.fire(
                    variables.status === 'approved' ? 'Approved!' : 'Rejected!',
                    `Loan application has been ${variables.status}.`,
                    'success'
                );
                queryClient.invalidateQueries(['manager-applications', user?.email]);
            }
        }
    });

    const handleStatusUpdate = (id, status) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to ${status} this application!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: status === 'approved' ? '#36d399' : '#f87272',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${status} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus({ id, status });
            }
        });
    };

    const openModal = (app) => {
        setSelectedApplication(app);
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
            <h2 className="text-3xl font-bold mb-6">Pending Loan Applications</h2>
            
            {applications.length === 0 ? (
                <div className="text-center py-12 bg-base-200 rounded-xl">
                    <h3 className="text-xl font-semibold text-base-content/70">No pending applications found.</h3>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
                    <table className="table w-full">
                        <thead className="bg-base-200">
                            <tr>
                                <th>Loan ID</th>
                                <th>User Info</th>
                                <th>Amount</th>
                                <th>Date</th>
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
                                    <td>{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'N/A'}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => openModal(app)}
                                                className="btn btn-sm btn-info text-white" 
                                            >
                                                View
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(app._id, 'approved')}
                                                className="btn btn-sm btn-success text-white" 
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                className="btn btn-sm btn-error text-white" 
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Application Details Modal */}
            <dialog id="application_details_modal" className="modal">
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
                                <p className="font-semibold text-warning">{selectedApplication.status.toUpperCase()}</p>
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

export default PendingApplication;
