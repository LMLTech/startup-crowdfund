import { ArrowLeft, Search, Download, Filter, Calendar } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { getInvestmentsByUserId, formatCurrency } from '../../utils/mockData';
import { toast } from 'sonner';

export default function InvestmentHistory({ currentUser, onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const investments = getInvestmentsByUserId(currentUser?.id || 1);

  const filteredInvestments = investments
    .filter(inv => {
      const matchesSearch = inv.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || inv.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'amount-high') return b.amount - a.amount;
      if (sortBy === 'amount-low') return a.amount - b.amount;
      return 0;
    });

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const handleExport = () => {
    toast.success('Đang xuất dữ liệu...');
    // In production, this would generate a CSV or PDF file
  };

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => onNavigate('investor-dashboard')}
              className="mb-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Dashboard
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl text-white mb-2">Lịch sử đầu tư</h1>
                <p className="text-white/70">
                  Tổng: {formatCurrency(totalInvested)} từ {investments.length} giao dịch
                </p>
              </div>
              <Button
                onClick={handleExport}
                variant="outline"
                className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo tên dự án..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="success">Thành công</SelectItem>
                  <SelectItem value="pending">Đang xử lý</SelectItem>
                  <SelectItem value="failed">Thất bại</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="amount-high">Số tiền cao nhất</SelectItem>
                  <SelectItem value="amount-low">Số tiền thấp nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Investments Table */}
          {filteredInvestments.length > 0 ? (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left p-4 text-white/70">ID Giao dịch</th>
                      <th className="text-left p-4 text-white/70">Dự án</th>
                      <th className="text-left p-4 text-white/70">Số tiền</th>
                      <th className="text-left p-4 text-white/70">Phương thức</th>
                      <th className="text-left p-4 text-white/70">Ngày đầu tư</th>
                      <th className="text-left p-4 text-white/70">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvestments.map((investment) => (
                      <tr key={investment.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-white/70 font-mono text-sm">
                          {investment.transactionId}
                        </td>
                        <td className="p-4 text-white max-w-xs">
                          <p className="line-clamp-2">{investment.projectTitle}</p>
                        </td>
                        <td className="p-4 text-white">
                          {formatCurrency(investment.amount)}
                        </td>
                        <td className="p-4 text-white/70">
                          {investment.paymentMethod}
                        </td>
                        <td className="p-4 text-white/70">
                          {new Date(investment.createdAt).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              investment.status === 'success'
                                ? 'bg-green-500/20 text-green-400 border-0'
                                : investment.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-400 border-0'
                                : 'bg-red-500/20 text-red-400 border-0'
                            }
                          >
                            {investment.status === 'success'
                              ? 'Thành công'
                              : investment.status === 'pending'
                              ? 'Đang xử lý'
                              : 'Thất bại'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-white/10">
                {filteredInvestments.map((investment) => (
                  <div key={investment.id} className="p-4 hover:bg-white/5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-white mb-1">{investment.projectTitle}</p>
                        <p className="text-white/70 text-sm font-mono">
                          {investment.transactionId}
                        </p>
                      </div>
                      <Badge
                        className={
                          investment.status === 'success'
                            ? 'bg-green-500/20 text-green-400 border-0'
                            : 'bg-yellow-500/20 text-yellow-400 border-0'
                        }
                      >
                        {investment.status === 'success' ? 'Thành công' : 'Đang xử lý'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-white/70">Số tiền</p>
                        <p className="text-white">{formatCurrency(investment.amount)}</p>
                      </div>
                      <div>
                        <p className="text-white/70">Phương thức</p>
                        <p className="text-white">{investment.paymentMethod}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-white/70">Ngày đầu tư</p>
                        <p className="text-white">
                          {new Date(investment.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
              <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">Không tìm thấy giao dịch</h3>
              <p className="text-white/70">
                {investments.length === 0
                  ? 'Bạn chưa có khoản đầu tư nào'
                  : 'Thử thay đổi bộ lọc để xem kết quả khác'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
