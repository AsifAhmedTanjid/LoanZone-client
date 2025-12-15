import React, { useState } from 'react';
import Container from '../../components/shared/Container/Container';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaHeadset } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axios = useAxios();
    const [isSending, setIsSending] = useState(false);

    const onSubmit = async (data) => {
        setIsSending(true);
        try {
            const res = await axios.post('/send-email', data);
            if (res.data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Message sent successfully!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                reset();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to send message. Please try again.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Container>
            <div className="py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-6 text-primary">Get in Touch</h1>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Have questions about our loans or services? We're here to help. Reach out to us through any of the channels below.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div className="card bg-base-100 shadow-xl border border-base-200">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb-6">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <FaMapMarkerAlt className="text-primary text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Our Location</h3>
                                            <p className="text-base-content/70">House 12, Road 34, Gulshan 1<br />Dhaka 1212, Bangladesh</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <FaPhone className="text-primary text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Phone Number</h3>
                                            <p className="text-base-content/70">+880 1234-567890</p>
                                            <p className="text-sm text-base-content/50">Sun-Thu 10am-6pm BST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <FaEnvelope className="text-primary text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Email Address</h3>
                                            <p className="text-base-content/70">support@loanzone.com</p>
                                            <p className="text-base-content/70">info@loanzone.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <FaClock className="text-primary text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Working Hours</h3>
                                            <p className="text-base-content/70">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                                            <p className="text-base-content/70">Friday - Saturday: Closed</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <FaHeadset className="text-primary text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Customer Support</h3>
                                            <p className="text-base-content/70">24/7 Live Chat Available</p>
                                            <p className="text-base-content/70">Average response time: 5 mins</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-6">Send us a Message</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">First Name</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="John" 
                                            className="input input-bordered w-full" 
                                            {...register("firstName", { required: true })}
                                        />
                                        {errors.firstName && <span className="text-red-500 text-sm">First Name is required</span>}
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Last Name</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Doe" 
                                            className="input input-bordered w-full" 
                                            {...register("lastName", { required: true })}
                                        />
                                        {errors.lastName && <span className="text-red-500 text-sm">Last Name is required</span>}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email Address</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        placeholder="john@example.com" 
                                        className="input input-bordered w-full" 
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Subject</span>
                                    </label>
                                    <select 
                                        className="select select-bordered w-full" 
                                        defaultValue="Select a topic"
                                        {...register("subject", { required: true })}
                                    >
                                        <option disabled>Select a topic</option>
                                        <option value="Loan Application">Loan Application</option>
                                        <option value="Repayment Inquiry">Repayment Inquiry</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                    </select>
                                    {errors.subject && <span className="text-red-500 text-sm">Subject is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Message</span>
                                    </label>
                                    <textarea 
                                        className="textarea textarea-bordered h-32 w-full resize-none" 
                                        placeholder="How can we help you?"
                                        {...register("message", { required: true })}
                                    ></textarea>
                                    {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
                                </div>

                                <div className="form-control mt-6">
                                    <button disabled={isSending} className="btn btn-primary">
                                        {isSending ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Contact;
