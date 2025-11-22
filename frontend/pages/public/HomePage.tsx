import { useState } from 'react';
import { Search, TrendingUp, Users, DollarSign, Filter, ChevronDown } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProjectCard from '../../components/ProjectCard';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { mockProjects, formatCurrency } from '../../utils/mockData';

export default function HomePage({ currentUser, onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  // Get unique categories
  const categories = ['all', ...new Set(mockProjects.map(p => p.category))];

  // Filter and sort projects
  const filteredProjects = mockProjects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'trending') return b.investorCount - a.investorCount;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'ending-soon') return a.daysLeft - b.daysLeft;
      if (sortBy === 'most-funded') return b.currentAmount - a.currentAmount;
      return 0;
    });

  // Calculate statistics
  const totalProjects = mockProjects.length;
  const totalFunded = mockProjects.reduce((sum, p) => sum + p.currentAmount, 0);
  const totalInvestors = mockProjects.reduce((sum, p) => sum + p.investorCount, 0);

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            Đầu Tư Vào Tương Lai
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Kết nối nhà đầu tư với các startup tiềm năng. Cùng nhau xây dựng những ý tưởng tuyệt vời thành hiện thực.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <span className="text-3xl text-white">{totalProjects}</span>
              </div>
              <p className="text-white/70">Dự án đang gọi vốn</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-6 h-6 text-pink-400" />
                <span className="text-3xl text-white">{formatCurrency(totalFunded).replace('₫', 'tỷ')}</span>
              </div>
              <p className="text-white/70">Tổng vốn đã huy động</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-blue-400" />
                <span className="text-3xl text-white">{totalInvestors}+</span>
              </div>
              <p className="text-white/70">Nhà đầu tư</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm dự án..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                />
              </div>
              <div className="md:col-span-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat} className="focus:bg-white/10">
                        {cat === 'all' ? 'Tất cả' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                    <SelectItem value="trending" className="focus:bg-white/10">Phổ biến nhất</SelectItem>
                    <SelectItem value="newest" className="focus:bg-white/10">Mới nhất</SelectItem>
                    <SelectItem value="ending-soon" className="focus:bg-white/10">Sắp kết thúc</SelectItem>
                    <SelectItem value="most-funded" className="focus:bg-white/10">Vốn cao nhất</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-4 pb-20">
        <div className="container mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/70 text-xl">Không tìm thấy dự án phù hợp</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onNavigate('project-detail', project)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      {!currentUser && (
        <div className="px-4 pb-20">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
              <h2 className="text-3xl md:text-4xl text-white mb-4">
                Sẵn sàng bắt đầu?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Đăng ký ngay để khám phá các dự án tiềm năng hoặc gọi vốn cho ý tưởng của bạn
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => onNavigate('register')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
                >
                  Đăng ký làm Nhà đầu tư
                </Button>
                <Button
                  onClick={() => onNavigate('register')}
                  variant="outline"
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white px-8 py-6 text-lg"
                >
                  Đăng ký làm Startup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer onNavigate={onNavigate} />
    </div>
  );
}