import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, TrendingUp, Users, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProjectCard from '../../components/ProjectCard';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Slider } from '../../components/ui/slider';
import { mockProjects, formatCurrency } from '../../utils/mockData';

export default function ExplorePage({ currentUser, onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000000000]);
  const [minProgress, setMinProgress] = useState(0);

  // Get approved projects only
  const approvedProjects = mockProjects.filter(p => p.status === 'approved');

  // Get unique categories
  const categories = ['all', ...new Set(approvedProjects.map(p => p.category))];

  // Filter and sort projects
  const filteredProjects = approvedProjects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesPrice = project.targetAmount >= priceRange[0] && project.targetAmount <= priceRange[1];
      const progress = (project.currentAmount / project.targetAmount) * 100;
      const matchesProgress = progress >= minProgress;
      return matchesSearch && matchesCategory && matchesPrice && matchesProgress;
    })
    .sort((a, b) => {
      if (sortBy === 'trending') return b.investorCount - a.investorCount;
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'ending-soon') return a.daysLeft - b.daysLeft;
      if (sortBy === 'most-funded') return b.currentAmount - a.currentAmount;
      return 0;
    });

  // Calculate statistics
  const totalProjects = approvedProjects.length;
  const totalFunded = approvedProjects.reduce((sum, p) => sum + p.currentAmount, 0);
  const totalInvestors = approvedProjects.reduce((sum, p) => sum + p.investorCount, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      {/* Hero Section */}
      <div className="pt-32 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Khám Phá Dự Án
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Tất cả các dự án đã được Hội đồng CVA thẩm định và phê duyệt
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <span className="text-3xl text-white">{totalProjects}</span>
              </div>
              <p className="text-white/70">Dự án đang gọi vốn</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-6 h-6 text-pink-400" />
                <span className="text-3xl text-white">{totalInvestors}+</span>
              </div>
              <p className="text-white/70">Nhà đầu tư</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-blue-400" />
                <span className="text-3xl text-white">{formatCurrency(totalFunded).replace('₫', 'tỷ')}</span>
              </div>
              <p className="text-white/70">Tổng vốn huy động</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 mb-8">
        <div className="container mx-auto">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            {/* Main Search Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
              <div className="md:col-span-5 relative">
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
                        {cat === 'all' ? 'Tất cả danh mục' : cat}
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
              <div className="md:col-span-1">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  className="w-full border-white/20 bg-white/10 hover:bg-white/20 text-white"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="pt-4 border-t border-white/20 space-y-6">
                <div>
                  <label className="text-white text-sm mb-3 block">
                    Vốn mục tiêu: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                  </label>
                  <Slider
                    min={0}
                    max={2000000000}
                    step={50000000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-3 block">
                    Tiến độ tối thiểu: {minProgress}%
                  </label>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[minProgress]}
                    onValueChange={(val) => setMinProgress(val[0])}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={() => {
                    setPriceRange([0, 2000000000]);
                    setMinProgress(0);
                    setSelectedCategory('all');
                    setSearchTerm('');
                  }}
                  variant="outline"
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>

          {/* Active Filters */}
          {(selectedCategory !== 'all' || searchTerm || minProgress > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== 'all' && (
                <Badge className="bg-purple-500/90 text-white border-0">
                  {selectedCategory}
                </Badge>
              )}
              {searchTerm && (
                <Badge className="bg-pink-500/90 text-white border-0">
                  Tìm kiếm: {searchTerm}
                </Badge>
              )}
              {minProgress > 0 && (
                <Badge className="bg-blue-500/90 text-white border-0">
                  Tiến độ {'>='} {minProgress}%
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="px-4 pb-20 flex-1">
        <div className="container mx-auto">
          <div className="mb-6">
            <p className="text-white/70">
              Hiển thị {filteredProjects.length} dự án
            </p>
          </div>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/70 text-xl">Không tìm thấy dự án phù hợp</p>
              <p className="text-white/50 mt-2">Thử điều chỉnh bộ lọc của bạn</p>
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

      <Footer onNavigate={onNavigate} />
    </div>
  );
}