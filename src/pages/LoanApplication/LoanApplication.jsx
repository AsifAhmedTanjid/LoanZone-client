
import { useParams, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';

const LoanApplication = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors } } = useForm();

   
    const { data: loan, isLoading } = useQuery({
        queryKey: ['loan', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/loans/${id}`);
            return data;
        },
        enabled: !!id,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (applicationData) => {
            const { data } = await axiosSecure.post('/applications', applicationData);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                toast.success('Application submitted successfully!');
                navigate('/dashboard/my-loans');
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSubmit = (data) => {
        const applicationData = {
            ...data,
            loanId: loan._id,
            loanTitle: loan.title,
            interestRate: loan.interestRate,
            borrowerEmail: user?.email,
            borrowerName: `${data.firstName} ${data.lastName}`,
            status: 'pending',
            feeStatus: 'unpaid',
            appliedDate: new Date(),
            managerEmail: loan.managerEmail 
        };
        mutate(applicationData);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
                <div className="bg-primary p-6 text-primary-content text-center">
                    <h2 className="text-3xl font-bold">Loan Application Form</h2>
                    <p className="opacity-90 mt-2">Please fill in the details below to apply for {loan?.title}</p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                  
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-base-200/50 p-6 rounded-xl border border-base-300">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Loan Title</span>
                            </label>
                            <input 
                                type="text" 
                                value={loan?.title || ''} 
                                readOnly 
                                className="input input-bordered w-full bg-base-200 cursor-not-allowed" 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Interest Rate</span>
                            </label>
                            <input 
                                type="text" 
                                value={loan?.interestRate ? `${loan.interestRate}%` : ''} 
                                readOnly 
                                className="input input-bordered w-full bg-base-200 cursor-not-allowed" 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Your Email</span>
                            </label>
                            <input 
                                type="text" 
                                value={user?.email || ''} 
                                readOnly 
                                className="input input-bordered w-full bg-base-200 cursor-not-allowed" 
                            />
                        </div>
                    </div>

                    <div className="divider">Personal Information</div>

                
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">First Name</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="John"
                                className="input input-bordered w-full focus:input-primary"
                                {...register("firstName", { required: "First Name is required" })}
                            />
                            {errors.firstName && <span className="text-error text-sm mt-1">{errors.firstName.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Last Name</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Doe"
                                className="input input-bordered w-full focus:input-primary"
                                {...register("lastName", { required: "Last Name is required" })}
                            />
                            {errors.lastName && <span className="text-error text-sm mt-1">{errors.lastName.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Contact Number</span>
                            </label>
                            <input 
                                type="tel" 
                                placeholder="+1234567890"
                                className="input input-bordered w-full focus:input-primary"
                                {...register("contactNumber", { required: "Contact Number is required" })}
                            />
                            {errors.contactNumber && <span className="text-error text-sm mt-1">{errors.contactNumber.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">NID / Passport Number</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="A12345678"
                                className="input input-bordered w-full focus:input-primary"
                                {...register("nid", { required: "ID Number is required" })}
                            />
                            {errors.nid && <span className="text-error text-sm mt-1">{errors.nid.message}</span>}
                        </div>
                    </div>

                    <div className="divider">Financial Details</div>

                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Income Source</span>
                            </label>
                            <select 
                                className="select select-bordered w-full focus:select-primary"
                                {...register("incomeSource", { required: "Income Source is required" })}
                            >
                                <option value="">Select Source</option>
                                <option value="Salary">Salary</option>
                                <option value="Business">Business</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Investment">Investment</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.incomeSource && <span className="text-error text-sm mt-1">{errors.incomeSource.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Monthly Income ($)</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder="5000"
                                className="input input-bordered w-full focus:input-primary"
                                {...register("monthlyIncome", { required: "Monthly Income is required", min: 0 })}
                            />
                            {errors.monthlyIncome && <span className="text-error text-sm mt-1">{errors.monthlyIncome.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Loan Amount ($)</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder="10000"
                                className="input input-bordered w-full focus:input-primary"
                                {...register("loanAmount", { 
                                    required: "Loan Amount is required", 
                                    min: { value: 100, message: "Minimum amount is 100" },
                                    max: { value: loan?.maxLoanLimit, message: `Maximum limit is ${loan?.maxLoanLimit}` }
                                })}
                            />
                            {errors.loanAmount && <span className="text-error text-sm mt-1">{errors.loanAmount.message}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Reason for Loan</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="e.g., Home Renovation"
                                className="input input-bordered w-full focus:input-primary"
                                {...register("reason", { required: "Reason is required" })}
                            />
                            {errors.reason && <span className="text-error text-sm mt-1">{errors.reason.message}</span>}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Address</span>
                        </label>
                        <textarea 
                            className="textarea textarea-bordered h-24 focus:textarea-primary w-full"
                            placeholder="Your full address..."
                            {...register("address", { required: "Address is required" })}
                        ></textarea>
                        {errors.address && <span className="text-error text-sm mt-1">{errors.address.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Extra Notes (Optional)</span>
                        </label>
                        <textarea 
                            className="textarea textarea-bordered h-24 focus:textarea-primary w-full"
                            placeholder="Any additional information..."
                            {...register("notes")}
                        ></textarea>
                    </div>

                    <div className="form-control mt-6">
                        <button 
                            type="submit" 
                            className={`btn btn-primary btn-lg w-full ${isPending ? 'loading' : ''}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Submitting Application...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoanApplication;
