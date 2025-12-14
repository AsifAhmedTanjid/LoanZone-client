import React from 'react';

import { FaUserShield, FaUserTie, FaUser } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const DashboardWelcome = () => {
    const { user } = useAuth();
    const [role] = useRole();

    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center bg-base-100 p-8">
            <div className="text-center space-y-6 max-w-2xl">
                <div className="avatar placeholder mb-4">
                    <div className="bg-neutral text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" />
                        ) : (
                            <span className="text-3xl">{user?.displayName?.charAt(0) || 'U'}</span>
                        )}
                    </div>
                </div>
                
                <h1 className="text-4xl font-bold text-primary">
                    Welcome Back, {user?.displayName}!
                </h1>
                
                <div className="flex justify-center items-center gap-2 text-xl font-semibold opacity-70">
                    {role === 'admin' && <FaUserShield className="text-error" />}
                    {role === 'manager' && <FaUserTie className="text-secondary" />}
                    {role === 'borrower' && <FaUser className="text-success" />}
                    <span className="uppercase">{role} Dashboard</span>
                </div>

                <p className="text-lg">
                    Manage your {role === 'borrower' ? 'loans and applications' : role === 'manager' ? 'loan requests and approvals' : 'users and system settings'} efficiently from here.
                </p>

                <div className="stats shadow mt-8 w-full">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div className="stat-title">Status</div>
                        <div className="stat-value text-primary">Active</div>
                        <div className="stat-desc">Account is fully verified</div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                        </div>
                        <div className="stat-title">Role</div>
                        <div className="stat-value text-secondary capitalize">{role}</div>
                        <div className="stat-desc">System Access Level</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardWelcome;
