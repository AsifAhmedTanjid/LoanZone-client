import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";
import Swal from 'sweetalert2';

const AllLoans = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const {
    data: loans = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-loans"],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/loans');
      return data;
    }
  });

  const { mutate: deleteLoan } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/loans/${id}`);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Loan has been deleted.",
          icon: "success",
        });
        queryClient.invalidateQueries(["all-loans"]);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const { mutate: updateLoan, isPending: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
        const { _id, ...dataToSend } = updatedData;
        const { data } = await axiosSecure.patch(`/loans/${_id}`, dataToSend);
        return data;
    },
    onSuccess: (data) => {
        if (data.modifiedCount > 0) {
            toast.success('Loan updated successfully');
            queryClient.invalidateQueries(['all-loans']);
            document.getElementById('update_loan_modal').close();
            setSelectedLoan(null);
        } else {
            toast.success('No changes made');
            document.getElementById('update_loan_modal').close();
        }
    },
    onError: (error) => {
        toast.error(error.message);
    }
  });

      const handleToggleHome = (loan) => {
        updateLoan({ 
            _id: loan._id, 
            showOnHome: !loan.showOnHome 
        });
    };

    const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLoan(id);
      }
    });
  };

  const openUpdateModal = (loan) => {
    setSelectedLoan(loan);
    setValue("title", loan.title);
    setValue("category", loan.category);
    setValue("interestRate", loan.interestRate);
    setValue("maxLoanLimit", loan.maxLoanLimit);
    setValue("requiredDocuments", loan.requiredDocuments);
    setValue("emiPlans", loan.emiPlans);
    setValue("loanImage", loan.loanImage);
    setValue("description", loan.description);
    setValue("showOnHome", loan.showOnHome || false);
    
    document.getElementById('update_loan_modal').showModal();
  };

  const onUpdateSubmit = (data) => {
    updateLoan({ ...data, _id: selectedLoan._id });
  };

  const filteredLoans = loans.filter((loan) => {
    const matchesSearch = loan.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory
      ? loan.category === filterCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-error mt-10">Error: {error.message}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-base-content">
        All Loans (Admin)
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full md:w-1/4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Personal">Personal Loan</option>
          <option value="Business">Business Loan</option>
          <option value="Home">Home Loan</option>
          <option value="Vehicle">Vehicle Loan</option>
          <option value="Education">Education Loan</option>
          <option value="Agriculture">Agriculture Loan</option>
        </select>
      </div>

      <div className="overflow-x-auto w-full max-w-[calc(100vw-2rem)] md:max-w-full bg-base-100 rounded-xl shadow-lg border border-base-200">
        <table className="table w-full min-w-150">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
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
                    <div className="text-sm opacity-70">{loan.managerEmail || 'N/A'}</div>
                </td>
                <td>
                    <input 
                        type="checkbox" 
                        className="toggle toggle-success toggle-sm" 
                        checked={loan.showOnHome || false}
                        onChange={() => handleToggleHome(loan)}
                    />
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openUpdateModal(loan)}
                      className="btn btn-ghost btn-xs text-warning tooltip"
                      data-tip="Edit Loan"
                    >
                      Edit
                    </button>
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

      {/* Update Loan Modal */}
      <dialog id="update_loan_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
            <h3 className="font-bold text-lg mb-4">Update Loan</h3>
            <form id="update-loan-form" onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Loan Title</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("title", { required: "Loan title is required" })}
                        />
                        {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Category</span>
                        </label>
                        <select 
                            className="select select-bordered w-full focus:select-primary"
                            {...register("category", { required: "Category is required" })}
                        >
                            <option value="">Select Category</option>
                            <option value="Personal">Personal Loan</option>
                            <option value="Business">Business Loan</option>
                            <option value="Home">Home Loan</option>
                            <option value="Vehicle">Vehicle Loan</option>
                            <option value="Education">Education Loan</option>
                            <option value="Agriculture">Agriculture Loan</option>
                        </select>
                        {errors.category && <span className="text-error text-sm mt-1">{errors.category.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Interest Rate (%)</span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("interestRate", { 
                                required: "Interest rate is required", 
                                min: { value: 0, message: "Interest rate cannot be negative" } 
                            })}
                        />
                        {errors.interestRate && <span className="text-error text-sm mt-1">{errors.interestRate.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Max Loan Limit ($)</span>
                        </label>
                        <input
                            type="number"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("maxLoanLimit", { 
                                required: "Max limit is required", 
                                min: { value: 100, message: "Max loan limit must be at least 100" } 
                            })}
                        />
                        {errors.maxLoanLimit && <span className="text-error text-sm mt-1">{errors.maxLoanLimit.message}</span>}
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Required Documents</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("requiredDocuments", { required: "Required documents are required" })}
                        />
                        {errors.requiredDocuments && <span className="text-error text-sm mt-1">{errors.requiredDocuments.message}</span>}
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Available EMI Plans (Months)</span>
                        </label>
                        <div className="flex flex-wrap gap-4 p-4 border border-base-300 rounded-lg bg-base-200/30">
                            {['6', '12', '18', '24', '36', '48', '60'].map((month) => (
                                <label key={month} className="cursor-pointer label gap-2">
                                    <input 
                                        type="checkbox" 
                                        value={`${month} Months`}
                                        className="checkbox checkbox-primary checkbox-sm"
                                        {...register("emiPlans", { required: "Select at least one EMI plan" })}
                                    />
                                    <span className="label-text">{month} Months</span>
                                </label>
                            ))}
                        </div>
                        {errors.emiPlans && <span className="text-error text-sm mt-1">{errors.emiPlans.message}</span>}
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Loan Image URL</span>
                        </label>
                        <input
                            type="url"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("loanImage", { required: "Image URL is required" })}
                        />
                        {errors.loanImage && <span className="text-error text-sm mt-1">{errors.loanImage.message}</span>}
                    </div>
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24 w-full focus:textarea-primary"
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label cursor-pointer justify-start gap-4">
                            <span className="label-text font-semibold">Show on Home Page</span>
                            <input 
                                type="checkbox" 
                                className="toggle toggle-primary"
                                {...register("showOnHome")} 
                            />
                        </label>
                    </div>
                </div>
            </form>

            <div className="modal-action">
                <form method="dialog">
                    <button className="btn btn-ghost mr-2">Cancel</button>
                </form>
                <button 
                    type="submit" 
                    form="update-loan-form"
                    className={`btn btn-primary ${isUpdating ? 'loading' : ''}`}
                    disabled={isUpdating}
                >
                    {isUpdating ? 'Updating...' : 'Update Loan'}
                </button>
            </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllLoans;
