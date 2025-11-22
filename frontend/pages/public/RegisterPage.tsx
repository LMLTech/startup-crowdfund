import { useState } from 'react';
import { UserPlus, Mail, Lock, User, Phone, MapPin, Building, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { toast } from 'sonner';

export default function RegisterPage({ onRegister, onNavigate }) {
  const [role, setRole] = useState('investor');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    address: '',
    company: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        ...formData,
        role,
        createdAt: new Date().toISOString(),
      };
      
      delete newUser.confirmPassword;
      
      toast.success('Đăng ký thành công!');
      onRegister(newUser);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        {/* Register Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl text-white mb-2">Đăng ký tài khoản</h2>
            <p className="text-white/70">Tham gia cộng đồng StarFund ngay hôm nay</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="text-white mb-3 block">Bạn là:</Label>
              <RadioGroup value={role} onValueChange={setRole}>
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      role === 'investor'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/5'
                    }`}
                    onClick={() => setRole('investor')}
                  >
                    <RadioGroupItem value="investor" id="investor" />
                    <Label htmlFor="investor" className="text-white cursor-pointer flex-1">
                      <div>
                        <p className="font-semibold">Nhà đầu tư</p>
                        <p className="text-xs text-white/70">Đầu tư vào các dự án</p>
                      </div>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      role === 'startup'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/5'
                    }`}
                    onClick={() => setRole('startup')}
                  >
                    <RadioGroupItem value="startup" id="startup" />
                    <Label htmlFor="startup" className="text-white cursor-pointer flex-1">
                      <div>
                        <p className="font-semibold">Startup</p>
                        <p className="text-xs text-white/70">Gọi vốn cho dự án</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
                  Họ và tên
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-white mb-2 block">
                  Mật khẩu
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-white mb-2 block">
                  Xác nhận mật khẩu
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">
                  Số điện thoại
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0901234567"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-white mb-2 block">
                  Địa chỉ
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Hà Nội, Việt Nam"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {role === 'startup' && (
                <div className="md:col-span-2">
                  <Label htmlFor="company" className="text-white mb-2 block">
                    Tên công ty / Startup
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="ABC Startup Co."
                      value={formData.company}
                      onChange={handleChange}
                      required={role === 'startup'}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-white/70">
              Đã có tài khoản?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Đăng nhập
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
