import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

const AddLoanForm = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { mutate, isPending } = useMutation({
        mutationFn: async (loanData) => {
            const { data } = await axiosSecure.post('/loans', loanData);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success('Loan added successfully');
                reset();
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSubmit = (data) => {
        const loanData = {
            ...data,
            managerEmail: user?.email,
            managerName: user?.displayName,
            status: 'pending',
            createdAt: new Date(),
        };
        mutate(loanData);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-base-100 rounded-xl shadow-lg border border-base-200">
            <h2 className="text-2xl font-bold text-center mb-8 text-base-content">Add New Loan</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/*Title */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Loan Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Business Startup Loan"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("title", { required: "Loan title is required" })}
                        />
                        {errors.title && <span className="text-error text-sm mt-1">{errors.title.message}</span>}
                    </div>

                    {/* Category */}
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

                    {/* Interest Rate */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Interest Rate (%)</span>
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="e.g., 5.5"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("interestRate", { 
                                required: "Interest rate is required", 
                                min: { value: 0, message: "Interest rate cannot be negative" } 
                            })}
                        />
                        {errors.interestRate && <span className="text-error text-sm mt-1">{errors.interestRate.message}</span>}
                    </div>

                    {/* Max Loan Limit */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Max Loan Limit ($)</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 50000"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("maxLoanLimit", { 
                                required: "Max limit is required", 
                                min: { value: 100, message: "Max loan limit must be at least 100" } 
                            })}
                        />
                        {errors.maxLoanLimit && <span className="text-error text-sm mt-1">{errors.maxLoanLimit.message}</span>}
                    </div>

                    {/* Required Documents */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Required Documents</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., NID, Bank Statement, Salary Slip (comma separated)"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("requiredDocuments", { required: "Required documents are required" })}
                        />
                        {errors.requiredDocuments && <span className="text-error text-sm mt-1">{errors.requiredDocuments.message}</span>}
                    </div>

                    {/* EMI Plans */}
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

                    {/* Loan Image  */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Loan Image URL</span>
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            className="input input-bordered w-full focus:input-primary"
                            {...register("loanImage", { required: "Image URL is required" })}
                        />
                        {errors.loanImage && <span className="text-error text-sm mt-1">{errors.loanImage.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="form-control md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24 w-full focus:textarea-primary"
                            placeholder="Detailed description of the loan..."
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && <span className="text-error text-sm mt-1">{errors.description.message}</span>}
                    </div>

                    {/* Show on Home Toggle */}
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

                <div className="form-control mt-6 flex flex-row gap-4">
                    <button 
                        type="button" 
                        className="btn btn-outline btn-primary flex-1"
                        onClick={() => reset()}
                        disabled={isPending}
                    >
                        Reset Form
                    </button>
                    <button 
                        type="submit" 
                        className={`btn btn-primary flex-1 ${isPending ? 'loading' : ''}`}
                        disabled={isPending}
                    >
                        {isPending ? 'Adding Loan...' : 'Add Loan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLoanForm;
