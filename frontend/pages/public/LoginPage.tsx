import { useState } from 'react';
import { LogIn, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { mockUsers } from '../../utils/mockData';

export default function LoginPage({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        toast.success('Đăng nhập thành công!');
        onLogin(user);
      } else {
        toast.error('Email hoặc mật khẩu không đúng!');
      }
      setLoading(false);
    }, 1000);
  };

  const quickLogin = (role) => {
    const user = mockUsers.find(u => u.role === role);
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
      toast.info(`Đã điền sẵn thông tin ${role}. Nhấn Đăng nhập!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => onNavigate('home')}
          className="mb-6 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl text-white mb-2">Đăng nhập</h2>
            <p className="text-white/70">Chào mừng bạn quay trở lại!</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>

          {/* Quick Login for Demo */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-white/70 text-sm text-center mb-3">Demo - Đăng nhập nhanh:</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                onClick={() => quickLogin('investor')}
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs"
              >
                Nhà đầu tư
              </Button>
              <Button
                variant="outline"
                onClick={() => quickLogin('startup')}
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs"
              >
                Startup
              </Button>
              <Button
                variant="outline"
                onClick={() => quickLogin('cva')}
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs"
              >
                CVA
              </Button>
              <Button
                variant="outline"
                onClick={() => quickLogin('admin')}
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs"
              >
                Admin
              </Button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-white/70">
              Chưa có tài khoản?{' '}
              <button
                onClick={() => onNavigate('register')}
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Đăng ký ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
