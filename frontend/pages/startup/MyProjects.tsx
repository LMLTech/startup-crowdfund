import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import ProjectCard from '../../components/ProjectCard';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { getProjectsByFounderId } from '../../utils/mockData';

export default function MyProjects({ currentUser, onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const myProjects = getProjectsByFounderId(currentUser?.id || 2);

  const approvedProjects = myProjects.filter(p => p.status === 'approved');
  const pendingProjects = myProjects.filter(p => p.status === 'pending');

  const filterProjects = (projects) => {
    return projects.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('startup-dashboard')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Button>

          <h1 className="text-4xl text-white mb-8">Dự án của tôi</h1>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-white/10 border-white/20 mb-8">
              <TabsTrigger value="all">Tất cả ({myProjects.length})</TabsTrigger>
              <TabsTrigger value="approved">Đã duyệt ({approvedProjects.length})</TabsTrigger>
              <TabsTrigger value="pending">Chờ duyệt ({pendingProjects.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterProjects(myProjects).map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => onNavigate('edit-project', project)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterProjects(approvedProjects).map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => onNavigate('edit-project', project)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterProjects(pendingProjects).map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => onNavigate('edit-project', project)}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
