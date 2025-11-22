import { TrendingUp, DollarSign, FolderOpen, Activity } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ProjectCard from '../../components/ProjectCard';
import { Button } from '../../components/ui/button';
import { mockProjects, getInvestmentsByUserId, formatCurrency } from '../../utils/mockData';

export default function InvestorDashboard({ currentUser, onNavigate, onLogout }) {
  const myInvestments = getInvestmentsByUserId(currentUser?.id || 1);
  const totalInvested = myInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const projectsInvested = new Set(myInvestments.map(inv => inv.projectId)).size;

  // Get trending projects
  const trendingProjects = [...mockProjects]
    .sort((a, b) => b.investorCount - a.investorCount)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl text-white mb-2">
              Chào mừng, {currentUser?.name}! 👋
            </h1>
            <p className="text-white/70 text-lg">
              Theo dõi danh mục đầu tư và khám phá các dự án mới
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/30 rounded-xl">
                  <DollarSign className="w-6 h-6 text-purple-300" />
                </div>
                <Activity className="w-5 h-5 text-purple-300" />
              </div>
              <p className="text-white/70 mb-1">Tổng đã đầu tư</p>
              <p className="text-3xl text-white">{formatCurrency(totalInvested)}</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-pink-700/20 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-pink-500/30 rounded-xl">
                  <FolderOpen className="w-6 h-6 text-pink-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-pink-300" />
              </div>
              <p className="text-white/70 mb-1">Dự án đã đầu tư</p>
              <p className="text-3xl text-white">{projectsInvested}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-300" />
                </div>
                <Activity className="w-5 h-5 text-blue-300" />
              </div>
              <p className="text-white/70 mb-1">Lần đầu tư gần nhất</p>
              <p className="text-lg text-white">
                {myInvestments.length > 0
                  ? new Date(myInvestments[0].createdAt).toLocaleDateString('vi-VN')
                  : 'Chưa có'}
              </p>
            </div>
          </div>

          {/* Recent Investments */}
          {myInvestments.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Đầu tư gần đây</h2>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('investment-history')}
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                >
                  Xem tất cả
                </Button>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 text-white/70">Dự án</th>
                        <th className="text-left p-4 text-white/70">Số tiền</th>
                        <th className="text-left p-4 text-white/70">Ngày đầu tư</th>
                        <th className="text-left p-4 text-white/70">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myInvestments.slice(0, 5).map((investment) => (
                        <tr key={investment.id} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-4 text-white">{investment.projectTitle}</td>
                          <td className="p-4 text-white">{formatCurrency(investment.amount)}</td>
                          <td className="p-4 text-white/70">
                            {new Date(investment.createdAt).toLocaleDateString('vi-VN')}
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                              Thành công
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Trending Projects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-white">Dự án đang hot 🔥</h2>
              <Button
                variant="outline"
                onClick={() => onNavigate('home')}
                className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
              >
                Xem tất cả
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onNavigate('project-detail', project)}
                />
              ))}
            </div>
          </div>

          {/* Empty State */}
          {myInvestments.length === 0 && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-purple-500/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <DollarSign className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl text-white mb-2">Bắt đầu hành trình đầu tư</h3>
                <p className="text-white/70 mb-6">
                  Bạn chưa có khoản đầu tư nào. Khám phá các dự án tiềm năng và bắt đầu đầu tư ngay!
                </p>
                <Button
                  onClick={() => onNavigate('home')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Khám phá dự án
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
