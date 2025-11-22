import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ProjectCard from '../../components/ProjectCard';
import { Button } from '../../components/ui/button';
import { mockPendingProjects } from '../../utils/mockData';

export default function ReviewProjects({ currentUser, onNavigate, onLogout }) {
  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('cva-dashboard')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Button>

          <h1 className="text-4xl text-white mb-2">Dự án chờ duyệt</h1>
          <p className="text-white/70 mb-8">
            {mockPendingProjects.length} dự án cần được thẩm định
          </p>

          {mockPendingProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPendingProjects.map(project => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onNavigate('review-detail', project)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 text-center">
              <p className="text-white/70 text-xl">Không có dự án nào chờ duyệt</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
