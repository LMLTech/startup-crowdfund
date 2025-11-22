import { ArrowLeft, Calendar, DollarSign, Users, Clock, Target, Check, User2, HelpCircle, TrendingUp, MessageCircle, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Textarea } from '../../components/ui/textarea';
import { formatCurrency, calculateProgress, mockProjectComments } from '../../utils/mockData';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ProjectDetailPage({ project, currentUser, onNavigate, onLogout }) {
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

  const progress = calculateProgress(project.currentAmount, project.targetAmount);

  const handleInvest = () => {
    if (!currentUser) {
      toast.error('Bạn cần có tài khoản nhà đầu tư để thực hiện đóng góp. Vui lòng đăng nhập hoặc đăng ký để tiếp tục.');
      return;
    }

    if (currentUser.role !== 'investor') {
      toast.error('Chỉ nhà đầu tư mới có thể đầu tư vào dự án!');
      return;
    }

    onNavigate('payment', project);
  };

  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (!currentUser) {
      toast.error('Bạn cần đăng nhập để bình luận.');
      return;
    }

    if (comment.trim() === '') {
      toast.error('Bình luận không được để trống.');
      return;
    }

    const newComment = {
      user: currentUser,
      content: comment,
      date: new Date().toLocaleDateString('vi-VN'),
    };

    mockProjectComments.push(newComment);
    setComment('');
    toast.success('Bình luận của bạn đã được thêm.');
  };

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Project Image */}
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500/90 text-white border-0">
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h1 className="text-4xl text-white mb-4">{project.title}</h1>
                <p className="text-white/80 text-lg mb-6">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="border-white/20 text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Startup Info */}
                <div className="pt-6 border-t border-white/20">
                  <p className="text-white/70 mb-2">Startup</p>
                  <p className="text-white text-xl">{project.startupName}</p>
                  <p className="text-white/70">{project.founderName}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <Tabs defaultValue="description">
                  <TabsList className="bg-white/10 border-white/20">
                    <TabsTrigger value="description" className="data-[state=active]:bg-purple-500">
                      Mô tả chi tiết
                    </TabsTrigger>
                    <TabsTrigger value="milestones" className="data-[state=active]:bg-purple-500">
                      Mục tiêu
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-6">
                    <div className="text-white/80 space-y-4">
                      <p>{project.fullDescription}</p>
                      <div className="pt-4">
                        <h3 className="text-white text-xl mb-3">Lợi ích cho nhà đầu tư</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 mt-0.5" />
                            <span>Tham gia vào dự án tiềm năng với đội ngũ chuyên nghiệp</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 mt-0.5" />
                            <span>Nhận cập nhật định kỳ về tiến độ dự án</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 mt-0.5" />
                            <span>Cơ hội sinh lời cao khi dự án thành công</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-400 mt-0.5" />
                            <span>Đóng góp vào phát triển cộng đồng và xã hội</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="milestones" className="mt-6">
                    <div className="space-y-4">
                      {project.milestones?.map((milestone, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${
                            milestone.completed
                              ? 'bg-green-500/10 border-green-500/50'
                              : 'bg-white/5 border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start gap-3">
                              {milestone.completed ? (
                                <Check className="w-5 h-5 text-green-400 mt-0.5" />
                              ) : (
                                <Target className="w-5 h-5 text-purple-400 mt-0.5" />
                              )}
                              <div>
                                <h4 className="text-white">{milestone.title}</h4>
                                <p className="text-white/70 text-sm">{milestone.description}</p>
                              </div>
                            </div>
                            <span className="text-white/70">{formatCurrency(milestone.amount)}</span>
                          </div>
                          {milestone.completed && (
                            <div className="ml-8">
                              <Badge className="bg-green-500/20 text-green-400 border-0">
                                Đã hoàn thành
                              </Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Comments */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                <h3 className="text-white text-xl mb-4">Bình luận</h3>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Viết bình luận của bạn..."
                  className="w-full h-24 mb-4"
                />
                <Button
                  onClick={handleAddComment}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Gửi bình luận
                </Button>

                <div className="mt-6">
                  {mockProjectComments.map((comment, index) => (
                    <div key={index} className="flex items-start gap-4 mb-4">
                      <User2 className="w-10 h-10 text-white/70" />
                      <div>
                        <p className="text-white text-sm">
                          {comment.userName} - {comment.createdAt}
                        </p>
                        <p className="text-white/80">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Investment Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 sticky top-24">
                <div className="mb-6">
                  <p className="text-4xl text-white mb-2">
                    {formatCurrency(project.currentAmount)}
                  </p>
                  <p className="text-white/70">
                    đã huy động từ {formatCurrency(project.targetAmount)}
                  </p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/70">Tiến độ</span>
                    <span className="text-white">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </Progress>
                </div>

                {/* Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white">{project.investorCount}</p>
                      <p className="text-white/70 text-sm">Nhà đầu tư</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <Clock className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-white">{project.daysLeft} ngày</p>
                      <p className="text-white/70 text-sm">Còn lại</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white">{new Date(project.createdAt).toLocaleDateString('vi-VN')}</p>
                      <p className="text-white/70 text-sm">Ngày bắt đầu</p>
                    </div>
                  </div>
                </div>

                {/* Invest Button */}
                <Button
                  onClick={handleInvest}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Đầu tư ngay
                </Button>

                {!currentUser && (
                  <p className="text-white/70 text-sm text-center mt-4">
                    Vui lòng đăng nhập để đầu tư
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}