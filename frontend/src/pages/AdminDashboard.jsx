import  React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Award, TrendingUp, Download, Search, Filter, Eye, BarChart3, PieChart, Calendar } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import AdminAuthModal from '../components/AdminAuthModal';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line } from 'recharts';

const AdminDashboard = () => {
  const { isAdminAuthenticated, adminUser, adminLogout } = useAdmin();
  const [showAuthModal, setShowAuthModal] = useState(!isAdminAuthenticated);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAdminAuthenticated]);

  const mockUsers = [
    { id: 1, name: 'sffs', email: 'sffs@example.com', role: 'Java Full Stack Developer', progress: 85, xp: 2450, lastActive: '2024-01-20', completedModules: 12, totalModules: 15 },
    { id: 2, name: 'Aashif', email: 'aashif.h785@gmail.com', role: 'Frontend Developer', progress: 92, xp: 3200, lastActive: '2024-01-21', completedModules: 18, totalModules: 20 },
    { id: 3, name: 'Kamamlesh', email: 'mkamamlesh@gmail.com', role: 'QA Tester', progress: 67, xp: 1800, lastActive: '2024-01-19', completedModules: 8, totalModules: 12 },
    { id: 4, name: 'Janani', email: 'sjananaim@gmail.com', role: 'DevOps Engineer', progress: 78, xp: 2100, lastActive: '2024-01-21', completedModules: 14, totalModules: 18 },
    { id: 5, name: 'Sarveshwaran', email: 'vsarvesh@gmail.com', role: 'Frontend Developer', progress: 55, xp: 1200, lastActive: '2024-01-18', completedModules: 7, totalModules: 15 },
    { id: 6, name: 'David Lee', email: 'david.lee@example.com', role: 'Java Full Stack Developer', progress: 73, xp: 1950, lastActive: '2024-01-17', completedModules: 10, totalModules: 14 },
    { id: 7, name: 'Priya Singh', email: 'priya.singh@example.com', role: 'QA Tester', progress: 88, xp: 2600, lastActive: '2024-01-20', completedModules: 11, totalModules: 12 },
    { id: 8, name: 'Carlos Gomez', email: 'carlos.gomez@example.com', role: 'DevOps Engineer', progress: 60, xp: 1400, lastActive: '2024-01-16', completedModules: 9, totalModules: 16 },
    { id: 9, name: 'Anna Kim', email: 'anna.kim@example.com', role: 'Frontend Developer', progress: 80, xp: 2300, lastActive: '2024-01-19', completedModules: 15, totalModules: 18 },
    { id: 10, name: 'Mohammed Ali', email: 'mohammed.ali@example.com', role: 'Java Full Stack Developer', progress: 40, xp: 900, lastActive: '2024-01-15', completedModules: 5, totalModules: 12 },
    { id: 11, name: 'Linda Brown', email: 'linda.brown@example.com', role: 'QA Tester', progress: 95, xp: 2800, lastActive: '2024-01-21', completedModules: 12, totalModules: 12 },
    { id: 12, name: 'Tom White', email: 'tom.white@example.com', role: 'DevOps Engineer', progress: 50, xp: 1100, lastActive: '2024-01-14', completedModules: 8, totalModules: 15 },
    { id: 13, name: 'Sophia Green', email: 'sophia.green@example.com', role: 'Frontend Developer', progress: 77, xp: 2100, lastActive: '2024-01-18', completedModules: 13, totalModules: 17 },
    { id: 14, name: 'Ravi Kumar', email: 'ravi.kumar@example.com', role: 'Java Full Stack Developer', progress: 65, xp: 1700, lastActive: '2024-01-17', completedModules: 9, totalModules: 13 },
    { id: 15, name: 'Olga Petrova', email: 'olga.petrova@example.com', role: 'QA Tester', progress: 82, xp: 2200, lastActive: '2024-01-20', completedModules: 10, totalModules: 12 },
    { id: 16, name: 'James Miller', email: 'james.miller@example.com', role: 'DevOps Engineer', progress: 90, xp: 2700, lastActive: '2024-01-21', completedModules: 16, totalModules: 18 },
    { id: 17, name: 'Ava Turner', email: 'ava.turner@example.com', role: 'Frontend Developer', progress: 68, xp: 1600, lastActive: '2024-01-18', completedModules: 10, totalModules: 15 },
    { id: 18, name: 'Ethan Wright', email: 'ethan.wright@example.com', role: 'Java Full Stack Developer', progress: 88, xp: 2600, lastActive: '2024-01-20', completedModules: 13, totalModules: 15 },
    { id: 19, name: 'Mia Chen', email: 'mia.chen@example.com', role: 'QA Tester', progress: 75, xp: 2000, lastActive: '2024-01-19', completedModules: 9, totalModules: 12 },
    { id: 20, name: 'Noah Scott', email: 'noah.scott@example.com', role: 'DevOps Engineer', progress: 82, xp: 2200, lastActive: '2024-01-21', completedModules: 15, totalModules: 18 },
    { id: 21, name: 'Isabella Moore', email: 'isabella.moore@example.com', role: 'Frontend Developer', progress: 90, xp: 3000, lastActive: '2024-01-21', completedModules: 17, totalModules: 20 },
    { id: 22, name: 'William Evans', email: 'william.evans@example.com', role: 'Java Full Stack Developer', progress: 60, xp: 1400, lastActive: '2024-01-16', completedModules: 8, totalModules: 13 },
    { id: 23, name: 'Olivia Clark', email: 'olivia.clark@example.com', role: 'QA Tester', progress: 85, xp: 2400, lastActive: '2024-01-20', completedModules: 11, totalModules: 12 },
    { id: 24, name: 'Benjamin Lewis', email: 'benjamin.lewis@example.com', role: 'DevOps Engineer', progress: 70, xp: 1800, lastActive: '2024-01-19', completedModules: 12, totalModules: 16 },
    { id: 25, name: 'Charlotte Walker', email: 'charlotte.walker@example.com', role: 'Frontend Developer', progress: 78, xp: 2100, lastActive: '2024-01-18', completedModules: 14, totalModules: 17 },
    { id: 26, name: 'Henry Hall', email: 'henry.hall@example.com', role: 'Java Full Stack Developer', progress: 55, xp: 1200, lastActive: '2024-01-15', completedModules: 6, totalModules: 12 },
    { id: 27, name: 'Amelia Young', email: 'amelia.young@example.com', role: 'QA Tester', progress: 92, xp: 3200, lastActive: '2024-01-21', completedModules: 12, totalModules: 12 },
    { id: 28, name: 'Jack King', email: 'jack.king@example.com', role: 'DevOps Engineer', progress: 65, xp: 1700, lastActive: '2024-01-17', completedModules: 10, totalModules: 15 },
    { id: 29, name: 'Grace Adams', email: 'grace.adams@example.com', role: 'Frontend Developer', progress: 83, xp: 2300, lastActive: '2024-01-19', completedModules: 16, totalModules: 18 },
    { id: 30, name: 'Samuel Nelson', email: 'samuel.nelson@example.com', role: 'Java Full Stack Developer', progress: 77, xp: 2100, lastActive: '2024-01-18', completedModules: 11, totalModules: 14 }
  ];

  const overviewStats = [
    { title: 'Total Users', value: '1,247', icon: <Users className="w-8 h-8" />, change: '+12%' },
    { title: 'Active Learners', value: '892', icon: <TrendingUp className="w-8 h-8" />, change: '+8%' },
    { title: 'Certificates Issued', value: '456', icon: <Award className="w-8 h-8" />, change: '+15%' },
    { title: 'Avg. Completion', value: '78%', icon: <BarChart3 className="w-8 h-8" />, change: '+5%' }
  ];

  const roleDistribution = [
    { name: 'Java Full Stack', value: 35, color: '#3b82f6' },
    { name: 'Frontend Dev', value: 28, color: '#06b6d4' },
    { name: 'QA Tester', value: 20, color: '#8b5cf6' },
    { name: 'DevOps', value: 17, color: '#10b981' }
  ];

  const progressData = [
    { month: 'Oct', users: 45, completed: 32 },
    { month: 'Nov', users: 67, completed: 48 },
    { month: 'Dec', users: 89, completed: 71 },
    { month: 'Jan', users: 124, completed: 98 }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const exportReport = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Progress %', 'XP', 'Completed Modules', 'Total Modules', 'Last Active'],
      ...filteredUsers.map(user => [
        user.name, user.email, user.role, user.progress, user.xp, 
        user.completedModules, user.totalModules, user.lastActive
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-progress-report.csv';
    a.click();
  };

  if (!isAdminAuthenticated) {
    return showAuthModal ? <AdminAuthModal onClose={() => navigate('/')} /> : null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-blue-200">Monitor user performance and learning progress</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-blue-200">Welcome, {adminUser?.name}</span>
            <button 
              onClick={adminLogout}
              className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex space-x-1 mb-8 bg-white/5 rounded-lg p-1">
          {['overview', 'users', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white' 
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <div key={index} className="glassmorphism rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-200 text-sm">{stat.title}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <p className="text-green-400 text-sm">{stat.change}</p>
                    </div>
                    <div className="text-blue-400">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Role Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <RechartsPieChart data={roleDistribution} dataKey="value">
                      {roleDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Monthly Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#93c5fd" />
                    <YAxis stroke="#93c5fd" />
                    <Tooltip />
                    <Bar dataKey="users" fill="#3b82f6" />
                    <Bar dataKey="completed" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-blue-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                  />
                </div>
                
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 [&>option]:text-black [&>option]:bg-white"
>                 <option value="all">All Roles</option>
                  <option value="Java Full Stack Developer">Java Full Stack</option>
                  <option value="Frontend Developer">Frontend Dev</option>
                  <option value="QA Tester">QA Tester</option>
                  <option value="DevOps Engineer">DevOps</option>
                </select>

              </div>
              <button
                onClick={exportReport}
                className="flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            <div className="glassmorphism rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-blue-200">User</th>
                      <th className="px-6 py-4 text-left text-blue-200">Role</th>
                      <th className="px-6 py-4 text-left text-blue-200">Progress</th>
                      <th className="px-6 py-4 text-left text-blue-200">XP</th>
                      <th className="px-6 py-4 text-left text-blue-200">Modules</th>
                      <th className="px-6 py-4 text-left text-blue-200">Last Active</th>
                      <th className="px-6 py-4 text-left text-blue-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t border-white/10">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-blue-200 text-sm">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-blue-200">{user.role}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-white/20 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                style={{ width: `${user.progress}%` }}
                              />
                            </div>
                            <span className="text-white text-sm">{user.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-blue-200">{user.xp}</td>
                        <td className="px-6 py-4 text-blue-200">{user.completedModules}/{user.totalModules}</td>
                        <td className="px-6 py-4 text-blue-200">{user.lastActive}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-400 hover:text-blue-300">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Learning Completion Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="month" stroke="#93c5fd" />
                  <YAxis stroke="#93c5fd" />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
                  <Line type="monotone" dataKey="completed" stroke="#06b6d4" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {mockUsers.sort((a, b) => b.xp - a.xp).slice(0, 5).map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-400 font-bold">#{index + 1}</span>
                        <div>
                          <p className="text-white">{user.name}</p>
                          <p className="text-blue-200 text-sm">{user.role}</p>
                        </div>
                      </div>
                      <span className="text-cyan-400 font-bold">{user.xp} XP</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glassmorphism rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Skills Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={roleDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="name" stroke="#93c5fd" />
                    <YAxis stroke="#93c5fd" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
 