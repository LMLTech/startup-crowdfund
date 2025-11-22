import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { formatCurrency, calculateProgress } from '../../utils/mockData';

export default function EditProject({ project, currentUser, onNavigate, onLogout }) {
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Không tìm thấy dự án</p>
          <Button onClick={() => onNavigate('my-projects')} className="mt-4">
            Quay về danh sách
          </Button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(project.currentAmount, project.targetAmount);

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('my-projects')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách dự án
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className={project.status === 'approved' ? 'bg-green-500/90' : 'bg-yellow-500/90'}>
                    {project.status === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                  </Badge>
                  <h1 className="text-3xl text-white">{project.title}</h1>
                </div>

                <div className="aspect-video rounded-xl overflow-hidden mb-6">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Mô tả ngắn</p>
                    <p className="text-white">{project.description}</p>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm mb-1">Mô tả chi tiết</p>
                    <p className="text-white">{project.fullDescription}</p>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-white/20 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.milestones && (
                    <div>
                      <p className="text-white/70 text-sm mb-2">Mục tiêu</p>
                      <div className="space-y-3">
                        {project.milestones.map((milestone, index) => (
                          <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                            <p className="text-white">{milestone.title}</p>
                            <p className="text-white/70 text-sm">{milestone.description}</p>
                            <p className="text-white/70 text-sm mt-2">{formatCurrency(milestone.amount)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl text-white mb-4">Thống kê</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Mục tiêu</p>
                    <p className="text-2xl text-white">{formatCurrency(project.targetAmount)}</p>
                  </div>

                  <div>
                    <p className="text-white/70 text-sm mb-1">Đã huy động</p>
                    <p className="text-2xl text-white">{formatCurrency(project.currentAmount)}</p>
                  </div>

                  <Progress value={progress} className="h-2 bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </Progress>
                  <p className="text-white/70 text-sm text-center">{progress.toFixed(1)}% đạt được</p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <p className="text-white/70 text-sm mb-1">Nhà đầu tư</p>
                      <p className="text-xl text-white">{project.investorCount}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm mb-1">Còn lại</p>
                      <p className="text-xl text-white">{project.daysLeft} ngày</p>
                    </div>
                  </div>
                </div>
              </div>

              {project.status === 'pending' && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                  <p className="text-yellow-400 text-sm">
                    Dự án đang chờ duyệt bởi CVA. Bạn sẽ nhận được thông báo khi dự án được phê duyệt hoặc có phản hồi.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
