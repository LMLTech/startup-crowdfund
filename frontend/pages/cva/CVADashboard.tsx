import { ShieldCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { mockPendingProjects, mockProjects } from '../../utils/mockData';

export default function CVADashboard({ currentUser, onNavigate, onLogout }) {
  const pendingCount = mockPendingProjects.length;
  const approvedCount = mockProjects.length;
  const totalReviewed = pendingCount + approvedCount;

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl text-white mb-2">
              CVA Dashboard 🛡️
            </h1>
            <p className="text-white/70 text-lg">
              Thẩm định và duyệt các dự án gọi vốn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/30 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <p className="text-white/70 mb-1">Chờ duyệt</p>
              <p className="text-3xl text-white">{pendingCount}</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/30 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                </div>
              </div>
              <p className="text-white/70 mb-1">Đã duyệt</p>
              <p className="text-3xl text-white">{approvedCount}</p>
            </div>

            <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 backdrop-blur-xl rounded-2xl p-6 border border-red-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-500/30 rounded-xl">
                  <XCircle className="w-6 h-6 text-red-300" />
                </div>
              </div>
              <p className="text-white/70 mb-1">Từ chối</p>
              <p className="text-3xl text-white">0</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/30 rounded-xl">
                  <ShieldCheck className="w-6 h-6 text-purple-300" />
                </div>
              </div>
              <p className="text-white/70 mb-1">Tổng đã xét duyệt</p>
              <p className="text-3xl text-white">{totalReviewed}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl text-white mb-2">Duyệt dự án mới</h2>
                <p className="text-white/70">
                  Có {pendingCount} dự án đang chờ thẩm định và phê duyệt
                </p>
              </div>
              <Button
                onClick={() => onNavigate('review-projects')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 whitespace-nowrap"
              >
                <ShieldCheck className="w-5 h-5 mr-2" />
                Xem dự án chờ duyệt
              </Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl text-white mb-6">Hướng dẫn thẩm định</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white mb-2">✅ Tiêu chí phê duyệt</h3>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• Ý tưởng rõ ràng, khả thi</li>
                  <li>• Kế hoạch tài chính hợp lý</li>
                  <li>• Đội ngũ có năng lực</li>
                  <li>• Lợi ích cho cộng đồng</li>
                </ul>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white mb-2">❌ Tiêu chí từ chối</h3>
                <ul className="text-white/70 text-sm space-y-2">
                  <li>• Thông tin không đầy đủ</li>
                  <li>• Vi phạm pháp luật</li>
                  <li>• Rủi ro quá cao</li>
                  <li>• Thiếu tính khả thi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
