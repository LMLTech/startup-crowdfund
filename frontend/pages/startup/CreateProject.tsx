import { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Navbar from '../../components/Navbar';
import ImageUpload from '../../components/ImageUpload';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

export default function CreateProject({ currentUser, onNavigate, onLogout }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: '',
    targetAmount: '',
    daysLeft: '90',
    image: '',
    imageFile: null,
  });
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [milestones, setMilestones] = useState([
    { title: '', description: '', amount: '' }
  ]);

  const categories = [
    'Công nghệ - Môi trường',
    'Xã hội - Ẩm thực',
    'Giáo dục - Công nghệ',
    'Y tế - Công nghệ',
    'Nông nghiệp - IoT',
    'Tài chính - Blockchain',
    'Năng lượng - Môi trường',
    'IoT - Smart Home',
    'Du lịch - AI',
    'Thời trang - AR',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', amount: '' }]);
  };

  const handleRemoveMilestone = (index) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (tags.length === 0) {
      toast.error('Vui lòng thêm ít nhất 1 tag cho dự án');
      return;
    }

    const newProject = {
      id: Date.now(),
      ...formData,
      targetAmount: parseInt(formData.targetAmount),
      daysLeft: parseInt(formData.daysLeft),
      tags,
      milestones: milestones.filter(m => m.title && m.amount),
      currentAmount: 0,
      investorCount: 0,
      startupName: currentUser.company || currentUser.name,
      founderId: currentUser.id,
      founderName: currentUser.name,
      founderEmail: currentUser.email,
      status: 'pending',
      createdAt: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
    };

    toast.success('Dự án đã được gửi đến CVA để duyệt!');
    setTimeout(() => {
      onNavigate('startup-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('startup-dashboard')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Button>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <h1 className="text-3xl text-white mb-2">Tạo dự án mới</h1>
            <p className="text-white/70 mb-8">Điền thông tin chi tiết để bắt đầu gọi vốn</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-white mb-2 block">
                  Tên dự án *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="VD: EcoTech - Ứng dụng quản lý rác thải thông minh"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white mb-2 block">
                  Mô tả ngắn *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={2}
                  placeholder="Mô tả ngắn gọn về dự án (hiển thị trên card)"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <Label htmlFor="fullDescription" className="text-white mb-2 block">
                  Mô tả chi tiết *
                </Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Mô tả chi tiết về dự án, lợi ích, kế hoạch thực hiện..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="category" className="text-white mb-2 block">
                    Danh mục *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="targetAmount" className="text-white mb-2 block">
                    Mục tiêu gọi vốn (VNĐ) *
                  </Label>
                  <Input
                    id="targetAmount"
                    name="targetAmount"
                    type="number"
                    value={formData.targetAmount}
                    onChange={handleChange}
                    required
                    min="1000000"
                    step="1000000"
                    placeholder="500000000"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <Label htmlFor="daysLeft" className="text-white mb-2 block">
                    Thời gian gọi vốn (ngày) *
                  </Label>
                  <Input
                    id="daysLeft"
                    name="daysLeft"
                    type="number"
                    value={formData.daysLeft}
                    onChange={handleChange}
                    required
                    min="30"
                    max="180"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <ImageUpload
                  label="Hình ảnh dự án"
                  value={formData.image}
                  onChange={(file, previewUrl) => {
                    setFormData({
                      ...formData,
                      imageFile: file,
                      image: previewUrl
                    });
                  }}
                  required
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Tags (từ khóa) *</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Nhập tag và nhấn Enter"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline" className="border-white/20 bg-white/10 text-white">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-purple-500/30 text-white rounded-full text-sm flex items-center gap-2">
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white">Mục tiêu / Milestones</Label>
                  <Button type="button" onClick={handleAddMilestone} variant="outline" size="sm" className="border-white/20 bg-white/10 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm mục tiêu
                  </Button>
                </div>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-white/70 text-sm">Mục tiêu {index + 1}</span>
                        {milestones.length > 1 && (
                          <button type="button" onClick={() => handleRemoveMilestone(index)} className="text-red-400 hover:text-red-300">
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <Input
                          value={milestone.title}
                          onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                          placeholder="Tiêu đề mục tiêu"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        <Textarea
                          value={milestone.description}
                          onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                          placeholder="Mô tả chi tiết"
                          rows={2}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                        <Input
                          type="number"
                          value={milestone.amount}
                          onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
                          placeholder="Số tiền cần thiết"
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
                >
                  Gửi duyệt dự án
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('startup-dashboard')}
                  className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                >
                  Hủy
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}