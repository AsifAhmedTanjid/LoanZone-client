import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { HashLoader } from 'react-spinners';

const ManageLoan = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { data: loans = [], isLoading, isError, error } = useQuery({
        queryKey: ['manage-loans', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/manage-loans/${user?.email}`);
            return data;
        },
        enabled: !!user?.email,
    });

    
    const { mutate: deleteLoan } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/loans/${id}`);
            return data;
        },
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                toast.success('Loan deleted successfully');
                queryClient.invalidateQueries(['my-loans', user?.email]);
            }
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });
    console.log(user?.email);
    

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this loan?')) {
            deleteLoan(id);
        }
    };

    if (isLoading) {
          return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-error mt-10">Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-base-content">Manage Loans</h2>
            
            {loans.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">You haven't added any loans yet.</p>
                    <Link to="/dashboard/add-loan" className="btn btn-primary mt-4">Add Your First Loan</Link>
                </div>
            ) : (
                <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-200">
                    <table className="table w-full">
                     
                        <thead className="bg-base-200">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Interest</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id} className="hover">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={loan.loanImage} alt={loan.title} />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="font-bold">{loan.title}</div>
                                    </td>
                                    <td>{loan.interestRate}%</td>
                                    <td>{loan.category}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Link 
                                                to={`/dashboard/update-loan/${loan._id}`}
                                                className="btn btn-ghost btn-xs text-warning tooltip" 
                                                data-tip="Edit Loan"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(loan._id)}
                                                className="btn btn-ghost btn-xs text-error tooltip" 
                                                data-tip="Delete Loan"
                                            >
                                                Delete
                                            </button>
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

export default ManageLoan;