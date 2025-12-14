import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import { FaUserShield, FaUserSlash, FaUserEdit } from 'react-icons/fa';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedUser, setSelectedUser] = useState(null);
    const [suspendReason, setSuspendReason] = useState('');
    const [newRole, setNewRole] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/users');
            return data;
        }
    });

    const { mutate: updateUser } = useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await axiosSecure.patch(`/users/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            Swal.fire('Success', 'User updated successfully', 'success');
            document.getElementById('suspend_modal').close();
            document.getElementById('role_modal').close();
        }
    });

    const handleRoleSubmit = () => {
        if (!selectedUser) return;
        updateUser({ id: selectedUser._id, data: { role: newRole } });
    };

    const openRoleModal = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        document.getElementById('role_modal').showModal();
    };

    const handleSuspend = (e) => {
        e.preventDefault();
        if (!suspendReason.trim()) return;
        
        updateUser({ 
            id: selectedUser._id, 
            data: { 
                status: 'suspended',
                suspendReason: suspendReason
            } 
        });
    };

    const openSuspendModal = (user) => {
        setSelectedUser(user);
        setSuspendReason('');
        document.getElementById('suspend_modal').showModal();
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                              (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter ? user.role === roleFilter : true;
        return matchesSearch && matchesRole;
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <HashLoader color="#36d7b7" size={50} />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search by name or email..." 
                    className="input input-bordered w-full md:w-1/4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className="select select-bordered w-full md:w-1/4"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="borrower">Borrower</option>
                </select>
            </div>

            <div className="overflow-x-auto w-full max-w-[calc(100vw-2rem)] md:max-w-full bg-base-100 rounded-xl shadow-lg border border-base-200">
                <table className="table w-full min-w-150">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id} className="hover">
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <div className={`badge ${
                                        user.role === 'admin' ? 'badge-primary' : 
                                        user.role === 'manager' ? 'badge-secondary' : 'badge-ghost'
                                    }`}>
                                        {user.role}
                                    </div>
                                </td>
                                <td>
                                    {user.status === 'suspended' ? (
                                        <span className="text-error font-bold">Suspended</span>
                                    ) : (
                                        <span className="text-success font-bold">Active</span>
                                    )}
                                </td>
                                <td>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => openRoleModal(user)}
                                            className="btn btn-sm btn-ghost text-info tooltip" 
                                            data-tip="Change Role"
                                        >
                                            <FaUserEdit size={18} />
                                        </button>
                                        
                                        {user.status !== 'suspended' ? (
                                            <button 
                                                onClick={() => openSuspendModal(user)}
                                                className="btn btn-sm btn-ghost text-error tooltip" 
                                                data-tip="Suspend User"
                                            >
                                                <FaUserSlash size={18} />
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => updateUser({ id: user._id, data: { status: 'active', suspendReason: null } })}
                                                className="btn btn-sm btn-ghost text-success tooltip" 
                                                data-tip="Activate User"
                                            >
                                                <FaUserShield size={18} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Suspend Modal */}
            <dialog id="suspend_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-error">Suspend User</h3>
                    <p className="py-4">Please provide a reason for suspending <span className="font-bold">{selectedUser?.name}</span>.</p>
                    <form onSubmit={handleSuspend}>
                        <textarea 
                            className="textarea textarea-bordered w-full h-24" 
                            placeholder="Reason for suspension..."
                            value={suspendReason}
                            onChange={(e) => setSuspendReason(e.target.value)}
                            required
                        ></textarea>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={() => document.getElementById('suspend_modal').close()}>Cancel</button>
                            <button type="submit" className="btn btn-error text-white">Suspend</button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Role Modal */}
            <dialog id="role_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update User Role</h3>
                    <p className="py-4">Select a new role for <span className="font-bold">{selectedUser?.name}</span></p>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select 
                            className="select select-bordered"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            <option value="borrower">Borrower</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button className="btn" onClick={() => document.getElementById('role_modal').close()}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleRoleSubmit}>Update Role</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageUsers;