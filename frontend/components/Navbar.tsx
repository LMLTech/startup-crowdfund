import { Rocket, User, LogOut, Home, BarChart3, FolderOpen, ShieldCheck, Settings, Compass, HelpCircle, BookOpen, Info, Mail } from 'lucide-react';
import { Button } from './ui/button';

export default function Navbar({ currentUser, onNavigate, onLogout }) {
  const getNavItems = () => {
    if (!currentUser) {
      return [
        { label: 'Trang chủ', icon: Home, page: 'home' },
        { label: 'Khám phá', icon: Compass, page: 'explore' },
        { label: 'Giới thiệu', icon: Info, page: 'about' },
        { label: 'Blog', icon: BookOpen, page: 'blog' },
        { label: 'FAQ', icon: HelpCircle, page: 'faq' },
        { label: 'Liên hệ', icon: Mail, page: 'contact' },
      ];
    }

    switch (currentUser.role) {
      case 'investor':
        return [
          { label: 'Trang chủ', icon: Home, page: 'home' },
          { label: 'Khám phá', icon: Compass, page: 'explore' },
          { label: 'Dashboard', icon: BarChart3, page: 'investor-dashboard' },
          { label: 'Lịch sử đầu tư', icon: FolderOpen, page: 'investment-history' },
        ];
      case 'startup':
        return [
          { label: 'Trang chủ', icon: Home, page: 'home' },
          { label: 'Dashboard', icon: BarChart3, page: 'startup-dashboard' },
          { label: 'Dự án của tôi', icon: FolderOpen, page: 'my-projects' },
          { label: 'Tạo dự án', icon: Rocket, page: 'create-project' },
        ];
      case 'cva':
        return [
          { label: 'Dashboard', icon: BarChart3, page: 'cva-dashboard' },
          { label: 'Duyệt dự án', icon: ShieldCheck, page: 'review-projects' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', icon: BarChart3, page: 'admin-dashboard' },
          { label: 'Quản lý người dùng', icon: User, page: 'user-management' },
          { label: 'Quản lý dự án', icon: FolderOpen, page: 'project-management' },
          { label: 'Quản lý giao dịch', icon: Settings, page: 'transaction-management' },
        ];
      default:
        return [{ label: 'Trang chủ', icon: Home, page: 'home' }];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StarFund
            </span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                >
                  <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                {/* User Info */}
                <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                  <User className="w-4 h-4 text-white" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm">{currentUser.name || currentUser.email}</span>
                    <span className="text-white/60 text-xs capitalize">{currentUser.role}</span>
                  </div>
                </div>
                
                {/* Logout Button */}
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => onNavigate('login')}
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => onNavigate('register')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  Đăng ký
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}