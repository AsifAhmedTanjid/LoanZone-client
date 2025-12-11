import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { HashLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaEnvelope, FaIdCard, FaCalendarAlt } from 'react-icons/fa';

const Profile = () => {
    const { user, loading, signoutUserFunc } = useAuth();
    const [role, isRoleLoading] = useRole();

    const handleLogout = () => {
        signoutUserFunc()
            .then(() => {
                toast.success('Logged out successfully');
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    if (loading || isRoleLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-100px)] p-4">
            <div className="bg-base-100 shadow-2xl rounded-3xl w-full max-w-3xl overflow-hidden border border-base-200">
                <div className="h-48 bg-linear-to-r from-primary to-secondary relative">
                    <div className="absolute -bottom-16 left-8">
                        <div className="avatar">
                            <div className="w-32 rounded-full ring-4 ring-base-100 shadow-lg bg-base-100">
                                <img 
                                    src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                                    alt="Profile" 
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

              
                <div className="pt-20 pb-8 px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-base-content">{user?.displayName}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm uppercase tracking-wide border border-primary/20">
                                    {role}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-outline btn-error rounded-full hover:bg-error hover:text-white transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="divider my-6"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-base-200/50 border border-base-200 hover:border-primary/30 transition-all hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-primary/10 text-primary text-xl">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-base-content/60">Email Address</p>
                                    <p className="text-base-content font-medium break-all">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-base-200/50 border border-base-200 hover:border-primary/30 transition-all hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-secondary/10 text-secondary text-xl">
                                    <FaIdCard />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-base-content/60">User ID</p>
                                    <p className="text-xs text-base-content font-medium font-mono break-all">{user?.uid}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-base-200/50 border border-base-200 hover:border-primary/30 transition-all hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-accent/10 text-accent text-xl">
                                    <FaCalendarAlt />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-base-content/60">Joined Date</p>
                                    <p className="text-base-content font-medium">
                                        {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

