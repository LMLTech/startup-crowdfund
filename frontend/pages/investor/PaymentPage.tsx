import { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Check, Shield } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Separator } from '../../components/ui/separator';
import { formatCurrency } from '../../utils/mockData';
import { toast } from 'sonner';

export default function PaymentPage({ project, currentUser, onNavigate, onLogout }) {
  const [amount, setAmount] = useState('1000000');
  const [paymentMethod, setPaymentMethod] = useState('vnpay');
  const [loading, setLoading] = useState(false);

  const suggestedAmounts = [1000000, 5000000, 10000000, 20000000];

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!amount || parseInt(amount) < 100000) {
      toast.error('Số tiền đầu tư tối thiểu là 100,000 VNĐ');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Save investment to localStorage (mock)
      const investment = {
        id: Date.now(),
        investorId: currentUser.id,
        investorName: currentUser.name,
        projectId: project.id,
        projectTitle: project.title,
        amount: parseInt(amount),
        paymentMethod: paymentMethod === 'vnpay' ? 'VNPay' : 'Bank Card',
        status: 'success',
        transactionId: `${paymentMethod.toUpperCase()}${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      const existingInvestments = JSON.parse(localStorage.getItem('investments') || '[]');
      existingInvestments.push(investment);
      localStorage.setItem('investments', JSON.stringify(existingInvestments));

      toast.success('Đầu tư thành công! Email xác nhận đã được gửi đến bạn.');
      setLoading(false);
      
      setTimeout(() => {
        onNavigate('investment-history');
      }, 2000);
    }, 2000);
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Không tìm thấy dự án</p>
          <Button onClick={() => onNavigate('home')} className="mt-4">
            Quay về trang chủ
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => onNavigate('project-detail', project)}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl text-white">Thanh toán</h2>
                  <p className="text-white/70 text-sm">Hoàn tất đầu tư của bạn</p>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                {/* Amount */}
                <div>
                  <Label htmlFor="amount" className="text-white mb-2 block">
                    Số tiền đầu tư (VNĐ)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100000"
                    step="100000"
                    required
                    className="bg-white/10 border-white/20 text-white text-xl"
                  />
                  <p className="text-white/70 text-sm mt-2">
                    {formatCurrency(parseInt(amount || 0))}
                  </p>
                </div>

                {/* Suggested Amounts */}
                <div>
                  <Label className="text-white mb-2 block">Số tiền gợi ý</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedAmounts.map((suggested) => (
                      <Button
                        key={suggested}
                        type="button"
                        variant="outline"
                        onClick={() => setAmount(suggested.toString())}
                        className="border-white/20 bg-white/5 hover:bg-white/10 text-white"
                      >
                        {formatCurrency(suggested)}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="bg-white/20" />

                {/* Payment Method */}
                <div>
                  <Label className="text-white mb-3 block">Phương thức thanh toán</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'vnpay'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/20 bg-white/5'
                      }`}
                      onClick={() => setPaymentMethod('vnpay')}
                    >
                      <RadioGroupItem value="vnpay" id="vnpay" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-blue-500/20 rounded">
                          <Wallet className="w-5 h-5 text-blue-400" />
                        </div>
                        <Label htmlFor="vnpay" className="text-white cursor-pointer flex-1">
                          <p>VNPay</p>
                          <p className="text-xs text-white/70">Thanh toán qua ví VNPay</p>
                        </Label>
                      </div>
                    </div>

                    <div
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/20 bg-white/5'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <RadioGroupItem value="card" id="card" />
                      <div className="flex items-center gap-3 flex-1">
                        <div className="p-2 bg-green-500/20 rounded">
                          <CreditCard className="w-5 h-5 text-green-400" />
                        </div>
                        <Label htmlFor="card" className="text-white cursor-pointer flex-1">
                          <p>Thẻ ngân hàng</p>
                          <p className="text-xs text-white/70">Thẻ nội địa / quốc tế</p>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Security Note */}
                <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-white text-sm mb-1">Thanh toán an toàn</p>
                    <p className="text-white/70 text-xs">
                      Giao dịch được mã hóa và bảo mật theo tiêu chuẩn quốc tế
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
                >
                  {loading ? 'Đang xử lý...' : `Thanh toán ${formatCurrency(parseInt(amount || 0))}`}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl text-white mb-4">Thông tin dự án</h3>
                
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-white mb-2">{project.title}</h4>
                <p className="text-white/70 text-sm mb-4">{project.startupName}</p>

                <Separator className="bg-white/20 mb-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Số tiền đầu tư</span>
                    <span className="text-white">{formatCurrency(parseInt(amount || 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Phí giao dịch</span>
                    <span className="text-white">0 VNĐ</span>
                  </div>
                  
                  <Separator className="bg-white/20" />
                  
                  <div className="flex justify-between">
                    <span className="text-white">Tổng cộng</span>
                    <span className="text-white text-xl">{formatCurrency(parseInt(amount || 0))}</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-white mb-4">Quyền lợi nhà đầu tư</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Nhận email cảm ơn và xác nhận đầu tư</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Cập nhật tiến độ dự án định kỳ</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Tham gia cộng đồng nhà đầu tư</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/80 text-sm">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Cơ hội sinh lời khi dự án thành công</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
