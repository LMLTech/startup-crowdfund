import { Users, FolderOpen, DollarSign, TrendingUp, Activity } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { mockProjects, mockUsers, mockInvestments, formatCurrency } from '../../utils/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function AdminDashboard({ currentUser, onNavigate, onLogout }) {
  const totalUsers = mockUsers.length;
  const totalProjects = mockProjects.length;
  const totalInvestments = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalTransactions = mockInvestments.length;

  // Chart data
  const categoryData = [
    { name: 'Công nghệ', value: 3 },
    { name: 'Y tế', value: 1 },
    { name: 'Nông nghiệp', value: 1 },
    { name: 'Tài chính', value: 2 },
    { name: 'Khác', value: 3 },
  ];

  const monthlyData = [
    { month: 'T7', revenue: 120 },
    { month: 'T8', revenue: 250 },
    { month: 'T9', revenue: 180 },
    { month: 'T10', revenue: 320 },
    { month: 'T11', revenue: 450 },
  ];

  const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl text-white mb-2">
              Admin Dashboard 👨‍💼
            </h1>
            <p className="text-white/70 text-lg">
              Quản lý toàn bộ hệ thống StarFund
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/30 rounded-xl">
                  <Users className="w-6 h-6 text-purple-300" />
                </div>
                <Activity className="w-5 h-5 text-purple-300" />
              </div>
              <p className="text-white/70 mb-1">Người dùng</p>
              <p className="text-3xl text-white">{totalUsers}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-pink-700/20 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-500/30 rounded-xl">
                  <FolderOpen className="w-6 h-6 text-pink-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-pink-300" />
              </div>
              <p className="text-white/70 mb-1">Dự án</p>
              <p className="text-3xl text-white">{totalProjects}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/30 rounded-xl">
                  <DollarSign className="w-6 h-6 text-blue-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-blue-300" />
              </div>
              <p className="text-white/70 mb-1">Tổng vốn</p>
              <p className="text-xl text-white">{formatCurrency(totalInvestments).substring(0, 10)}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/30 rounded-xl">
                  <Activity className="w-6 h-6 text-green-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-white/70 mb-1">Giao dịch</p>
              <p className="text-3xl text-white">{totalTransactions}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Button
              onClick={() => onNavigate('user-management')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white p-6 h-auto flex flex-col items-start"
            >
              <Users className="w-8 h-8 mb-2" />
              <span className="text-lg">Quản lý người dùng</span>
              <span className="text-sm text-white/70">{totalUsers} người dùng</span>
            </Button>

            <Button
              onClick={() => onNavigate('project-management')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white p-6 h-auto flex flex-col items-start"
            >
              <FolderOpen className="w-8 h-8 mb-2" />
              <span className="text-lg">Quản lý dự án</span>
              <span className="text-sm text-white/70">{totalProjects} dự án</span>
            </Button>

            <Button
              onClick={() => onNavigate('transaction-management')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white p-6 h-auto flex flex-col items-start"
            >
              <DollarSign className="w-8 h-8 mb-2" />
              <span className="text-lg">Quản lý giao dịch</span>
              <span className="text-sm text-white/70">{totalTransactions} giao dịch</span>
            </Button>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl text-white mb-6">Doanh thu theo tháng</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                  <YAxis stroke="rgba(255,255,255,0.7)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorGradient)" />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl text-white mb-6">Dự án theo danh mục</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
