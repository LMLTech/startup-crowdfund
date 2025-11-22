import { ArrowLeft, Search, Download } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { mockInvestments, formatCurrency } from '../../utils/mockData';
import { toast } from 'sonner';

export default function TransactionManagement({ currentUser, onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvestments = mockInvestments.filter(inv =>
    inv.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.investorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);

  const handleExport = () => {
    toast.success('Đang xuất báo cáo giao dịch...');
  };

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('admin-dashboard')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl text-white mb-2">Quản lý giao dịch</h1>
              <p className="text-white/70">
                Tổng: {formatCurrency(totalRevenue)} từ {filteredInvestments.length} giao dịch
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

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo dự án, nhà đầu tư, mã giao dịch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-4 text-white/70">Mã GD</th>
                    <th className="text-left p-4 text-white/70">Nhà đầu tư</th>
                    <th className="text-left p-4 text-white/70">Dự án</th>
                    <th className="text-left p-4 text-white/70">Số tiền</th>
                    <th className="text-left p-4 text-white/70">Phương thức</th>
                    <th className="text-left p-4 text-white/70">Ngày GD</th>
                    <th className="text-left p-4 text-white/70">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvestments.map((investment) => (
                    <tr key={investment.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4 text-white/70 font-mono text-sm">
                        {investment.transactionId}
                      </td>
                      <td className="p-4 text-white">{investment.investorName}</td>
                      <td className="p-4 text-white max-w-xs">
                        <p className="line-clamp-2">{investment.projectTitle}</p>
                      </td>
                      <td className="p-4 text-white">{formatCurrency(investment.amount)}</td>
                      <td className="p-4 text-white/70">{investment.paymentMethod}</td>
                      <td className="p-4 text-white/70">
                        {new Date(investment.createdAt).toLocaleDateString('vi-VN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="p-4">
                        <Badge className="bg-green-500/20 text-green-400 border-0">
                          Thành công
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
