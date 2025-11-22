import { Rocket, DollarSign, FolderOpen, PlusCircle, TrendingUp, Eye } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ProjectCard from '../../components/ProjectCard';
import { Button } from '../../components/ui/button';
import { getProjectsByFounderId, formatCurrency } from '../../utils/mockData';

export default function StartupDashboard({ currentUser, onNavigate, onLogout }) {
  const myProjects = getProjectsByFounderId(currentUser?.id || 2);
  
  const approvedProjects = myProjects.filter(p => p.status === 'approved');
  const pendingProjects = myProjects.filter(p => p.status === 'pending');
  
  const totalFunded = approvedProjects.reduce((sum, p) => sum + p.currentAmount, 0);
  const totalInvestors = approvedProjects.reduce((sum, p) => sum + p.investorCount, 0);

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl text-white mb-2">
              Xin chào, {currentUser?.name}! 🚀
            </h1>
            <p className="text-white/70 text-lg">
              Quản lý các dự án của bạn và theo dõi tiến độ gọi vốn
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/30 rounded-xl">
                  <FolderOpen className="w-6 h-6 text-purple-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-purple-300" />
              </div>
              <p className="text-white/70 mb-1">Tổng dự án</p>
              <p className="text-3xl text-white">{myProjects.length}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/30 rounded-xl">
                  <Eye className="w-6 h-6 text-green-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-300" />
              </div>
              <p className="text-white/70 mb-1">Đã duyệt</p>
              <p className="text-3xl text-white">{approvedProjects.length}</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/30 rounded-xl">
                  <DollarSign className="w-6 h-6 text-yellow-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-yellow-300" />
              </div>
              <p className="text-white/70 mb-1">Tổng vốn huy động</p>
              <p className="text-xl text-white">{formatCurrency(totalFunded).replace('₫', '')}</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-blue-300" />
                </div>
                <TrendingUp className="w-5 h-5 text-blue-300" />
              </div>
              <p className="text-white/70 mb-1">Nhà đầu tư</p>
              <p className="text-3xl text-white">{totalInvestors}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl text-white mb-2">Bắt đầu gọi vốn cho ý tưởng của bạn</h2>
                <p className="text-white/70">
                  Tạo dự án mới và kết nối với hàng nghìn nhà đầu tư tiềm năng
                </p>
              </div>
              <Button
                onClick={() => onNavigate('create-project')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 whitespace-nowrap"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Tạo dự án mới
              </Button>
            </div>
          </div>

          {/* Pending Projects */}
          {pendingProjects.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Dự án chờ duyệt</h2>
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                  {pendingProjects.length} dự án
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingProjects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => onNavigate('edit-project', project)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Active Projects */}
          {approvedProjects.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Dự án đang hoạt động</h2>
                <Button
                  variant="outline"
                  onClick={() => onNavigate('my-projects')}
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                >
                  Xem tất cả
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedProjects.slice(0, 3).map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => onNavigate('edit-project', project)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
              <div className="max-w-md mx-auto">
                <div className="p-4 bg-purple-500/20 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Rocket className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-2xl text-white mb-2">Bắt đầu hành trình gọi vốn</h3>
                <p className="text-white/70 mb-6">
                  Bạn chưa có dự án nào. Tạo dự án đầu tiên và kết nối với nhà đầu tư ngay!
                </p>
                <Button
                  onClick={() => onNavigate('create-project')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Tạo dự án đầu tiên
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
