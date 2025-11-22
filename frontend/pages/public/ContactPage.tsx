import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

export default function ContactPage({ currentUser, onNavigate, onLogout }) {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    subject: '',
    category: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Mock API call
    toast.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.');
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      subject: '',
      category: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Địa chỉ',
      content: '123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh, Việt Nam',
      color: 'purple',
    },
    {
      icon: Phone,
      title: 'Điện thoại',
      content: '+84 123 456 789',
      link: 'tel:+84123456789',
      color: 'pink',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@starfund.vn',
      link: 'mailto:contact@starfund.vn',
      color: 'blue',
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      content: 'Thứ 2 - Thứ 6: 8:00 - 20:00\nThứ 7 - CN: 9:00 - 17:00',
      color: 'green',
    },
  ];

  const departments = [
    { value: 'general', label: 'Câu hỏi chung' },
    { value: 'investor', label: 'Hỗ trợ nhà đầu tư' },
    { value: 'startup', label: 'Hỗ trợ startup' },
    { value: 'technical', label: 'Hỗ trợ kỹ thuật' },
    { value: 'partnership', label: 'Hợp tác kinh doanh' },
    { value: 'media', label: 'Truyền thông' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      {/* Hero Section */}
      <div className="pt-32 pb-12 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl mb-6">
            <MessageSquare className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-6xl text-white mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="px-4 pb-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-purple-400/50 transition-all group"
                >
                  <div className={`p-3 bg-${info.color}-500/20 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 text-${info.color}-400`} />
                  </div>
                  <h3 className="text-white mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-white/70 hover:text-white transition-colors whitespace-pre-line"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-white/70 whitespace-pre-line">{info.content}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="px-4 pb-20 flex-1">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl text-white mb-2">Gửi tin nhắn cho chúng tôi</h2>
              <p className="text-white/70">
                Điền thông tin bên dưới và chúng tôi sẽ phản hồi trong vòng 24 giờ
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Họ và tên <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">
                    Phòng ban <span className="text-red-400">*</span>
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                      {departments.map(dept => (
                        <SelectItem key={dept.value} value={dept.value} className="focus:bg-white/10">
                          {dept.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white">
                    Tiêu đề <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Tiêu đề tin nhắn"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Nội dung <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Nhập nội dung tin nhắn của bạn..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6"
              >
                <Send className="w-5 h-5 mr-2" />
                Gửi tin nhắn
              </Button>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl text-white mb-3">Hỗ trợ khẩn cấp</h3>
              <p className="text-white/70 mb-4">
                Nếu bạn gặp vấn đề khẩn cấp cần hỗ trợ ngay lập tức, vui lòng liên hệ hotline:
              </p>
              <a
                href="tel:1900xxxx"
                className="text-purple-400 hover:text-purple-300 text-xl"
              >
                1900-xxxx
              </a>
              <p className="text-white/60 text-sm mt-2">
                (Phí cuộc gọi theo nhà mạng)
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl text-white mb-3">Hợp tác truyền thông</h3>
              <p className="text-white/70 mb-4">
                Đối với các yêu cầu hợp tác truyền thông, báo chí, vui lòng liên hệ:
              </p>
              <a
                href="mailto:media@starfund.vn"
                className="text-purple-400 hover:text-purple-300"
              >
                media@starfund.vn
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
