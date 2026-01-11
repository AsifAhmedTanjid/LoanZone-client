import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaUserTie, FaUser, FaUsers, FaMoneyBillWave, FaFileInvoiceDollar, FaClipboardList, FaClock } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { HashLoader } from 'react-spinners';

const DashboardWelcome = () => {
    const { user } = useAuth();
    const [role, isRoleLoading] = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: [role, 'dashboard-stats'],
        enabled: !!role,
        queryFn: async () => {
             let res;
             if (role === 'admin') res = await axiosSecure.get('/admin-stats');
             else if (role === 'manager') res = await axiosSecure.get('/manager-stats');
             else if (role === 'borrower') res = await axiosSecure.get('/borrower-stats');
             return res.data;
        }
    });

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };

    
    const pieData = role === 'admin' ? stats.usersByRole?.map(u => ({ name: u._id, value: u.count })) : 
                    stats.applicationsByStatus?.map(a => ({ name: a._id, value: a.count }));
    
   
    const barData = role === 'admin' ? stats.loansByCategory?.map(l => ({ name: l._id, count: l.count })) : 
                    role === 'manager' ? [
                        { name: 'Posted Loans', count: stats.totalLoans || 0 },
                        { name: 'All Applications', count: stats.totalApplications || 0 },
                        { name: 'Paid Applications', count: stats.paidApplications || 0 }
                    ] :
                    // Borrower
                     [
                        { name: 'Total', count: stats.totalApplications || 0 },
                        { name: 'Paid', count: stats.applicationsByStatus?.find(a => a._id === 'paid')?.count || 0 },
                        { name: 'Pending', count: stats.applicationsByStatus?.find(a => a._id === 'pending')?.count || 0 }
                    ];

    if (isLoading || isRoleLoading) return <div className="flex justify-center items-center h-full min-h-[50vh]"><HashLoader color="#36d7b7"></HashLoader></div>;

    return (
        <div className="p-8 bg-base-100 min-h-screen">
             {/* Welcome Section */}
             <div className="mb-8 flex flex-col items-center">
                 <div className="avatar placeholder mb-4">
                     <div className="bg-neutral text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Profile" />
                        ) : (
                            <span className="text-3xl">{user?.displayName?.charAt(0) || 'U'}</span>
                        )}
                     </div>
                 </div>
                 <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back, {user?.displayName}!</h1>
                 <p className="opacity-70">
                    {role === 'admin' ? 'System Overview & Statistics' :
                     role === 'manager' ? 'Manage Your Loan Portfolio' :
                     'Your Application Dashboard'}
                 </p>
             </div>

             {/* Overview Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                 {role === 'admin' && (
                     <>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-secondary">
                                <FaUsers className="text-3xl" />
                            </div>
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value">{stats.totalUsers || 0}</div>
                            <div className="stat-desc">Registered Accounts</div>
                        </div>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-primary">
                                <FaClipboardList className="text-3xl" />
                            </div>
                            <div className="stat-title">Total Loans</div>
                            <div className="stat-value">{stats.totalLoans || 0}</div>
                            <div className="stat-desc">All Categories</div>
                        </div>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-accent">
                                <FaFileInvoiceDollar className="text-3xl" />
                            </div>
                            <div className="stat-title">Total Applications</div>
                            <div className="stat-value">{stats.totalApplications || 0}</div>
                            <div className="stat-desc">Across all loans</div>
                        </div>
                     </>
                 )}

                 {role === 'manager' && (
                     <>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-secondary">
                                <FaClipboardList className="text-3xl" />
                            </div>
                            <div className="stat-title">My Posted Loans</div>
                            <div className="stat-value">{stats.totalLoans || 0}</div>
                            <div className="stat-desc">Active Loans</div>
                        </div>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-primary">
                                <FaFileInvoiceDollar className="text-3xl" />
                            </div>
                            <div className="stat-title">Applications</div>
                            <div className="stat-value">{stats.totalApplications || 0}</div>
                            <div className="stat-desc">Received on your loans</div>
                        </div>
                         <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-success">
                                <FaMoneyBillWave className="text-3xl" />
                            </div>
                            <div className="stat-title">Paid Applications</div>
                            <div className="stat-value">{stats.paidApplications || 0}</div>
                            <div className="stat-desc">Successful payments</div>
                        </div>
                     </>
                 )}

                 {role === 'borrower' && (
                     <>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-secondary">
                                <FaFileInvoiceDollar className="text-3xl" />
                            </div>
                            <div className="stat-title">My Applications</div>
                            <div className="stat-value">{stats.totalApplications || 0}</div>
                            <div className="stat-desc">Total submitted</div>
                        </div>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                            <div className="stat-figure text-primary">
                                <FaMoneyBillWave className="text-3xl" />
                            </div>
                            <div className="stat-title">Total Spent</div>
                            <div className="stat-value text-primary">${stats.totalSpent || 0}</div>
                            <div className="stat-desc">Application Fees</div>
                        </div>
                        <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                             <div className="stat-figure text-info">
                                 <FaClock className="text-3xl" />
                             </div>
                             <div className="stat-title">Pending</div>
                             <div className="stat-value">{stats.applicationsByStatus?.find(a => a._id === 'pending')?.count || 0}</div>
                             <div className="stat-desc">Applications verifying</div>
                        </div>
                     </>
                 )}
                 
               
                  <div className="stat bg-base-200 shadow-xl rounded-2xl border border-base-300">
                        <div className="stat-figure text-warning">
                             {role === 'admin' && <FaUserShield className="text-3xl" />}
                             {role === 'manager' && <FaUserTie className="text-3xl" />}
                             {role === 'borrower' && <FaUser className="text-3xl" />}
                        </div>
                        <div className="stat-title">Current Role</div>
                        <div className="stat-value capitalize text-2xl">{role}</div>
                        <div className="stat-desc">Access Level</div>
                  </div>
             </div>

             {/* Charts Section */}
             <div className="flex flex-col lg:flex-row gap-8">
             
                {(pieData && pieData.length > 0) ? (
                     <div className="flex-1 bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300 min-h-100">
                        <h3 className="text-2xl font-bold mb-6 text-center">
                            {role === 'admin' ? 'User Role Distribution' : 'Application Status'}
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                     </div>
                ) : (
                    <div className="flex-1 bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300 min-h-75 flex items-center justify-center">
                        <p className="text-opacity-50">No chart data available yet</p>
                    </div>
                )}

              
                 {role !== 'unknown' && (
                      <div className="flex-1 bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300 min-h-100">
                        <h3 className="text-2xl font-bold mb-6 text-center">
                            {role === 'admin' ? 'Loans by Category' : 
                             role === 'manager' ? 'Engagement Overview' : 
                             'Application Activity'}
                        </h3>
                        {barData && barData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="count" name={role === 'admin' ? "Loans" : "Count"} fill={role === 'admin' ? "#8884d8" : "#82ca9d"} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-75 flex items-center justify-center text-opacity-50">No data available</div>
                        )}
                      </div>
                 )}
             </div>
        </div>
    );
};

export default DashboardWelcome;
