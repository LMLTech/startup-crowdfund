import { Clock, Users, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { formatCurrency, calculateProgress } from '../utils/mockData';

export default function ProjectCard({ project, onClick }) {
  const progress = calculateProgress(project.currentAmount, project.targetAmount);

  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all cursor-pointer group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-purple-500/90 text-white border-0">
            {project.category}
          </Badge>
        </div>
        {project.status === 'pending' && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-yellow-500/90 text-white border-0">
              Chờ duyệt
            </Badge>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/5 rounded text-xs text-white/70 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/70">Đã đạt</span>
            <span className="text-white">{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </Progress>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-white/70 text-xs mb-1">Đã huy động</p>
            <p className="text-white">
              {formatCurrency(project.currentAmount).replace('₫', '')}
            </p>
          </div>
          <div>
            <p className="text-white/70 text-xs mb-1">Mục tiêu</p>
            <p className="text-white">
              {formatCurrency(project.targetAmount).replace('₫', '')}
            </p>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1 text-white/70 text-sm">
            <Users className="w-4 h-4" />
            <span>{project.investorCount} nhà đầu tư</span>
          </div>
          <div className="flex items-center gap-1 text-white/70 text-sm">
            <Clock className="w-4 h-4" />
            <span>{project.daysLeft} ngày</span>
          </div>
        </div>
      </div>
    </div>
  );
}
