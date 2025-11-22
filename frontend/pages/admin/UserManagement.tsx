import { ArrowLeft, Search, UserPlus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { mockUsers } from '../../utils/mockData';
import { toast } from 'sonner';

export default function UserManagement({ currentUser, onNavigate, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeColor = (role) => {
    switch(role) {
      case 'admin': return 'bg-red-500/20 text-red-400';
      case 'cva': return 'bg-purple-500/20 text-purple-400';
      case 'investor': return 'bg-blue-500/20 text-blue-400';
      case 'startup': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleDelete = (userId) => {
    toast.success('Đã xóa người dùng thành công!');
  };

  return (
    <div className="min-h-screen">
      <Navbar currentUser={currentUser} onNavigate={onNavigate} onLogout={onLogout} />

      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => onNavigate('admin-dashboard')}
            className="mb-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại Dashboard
          </Button>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl text-white mb-2">Quản lý người dùng</h1>
              <p className="text-white/70">Tổng: {filteredUsers.length} người dùng</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo tên, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Vai trò" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white">
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="investor">Nhà đầu tư</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="cva">CVA</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left p-4 text-white/70">ID</th>
                    <th className="text-left p-4 text-white/70">Tên</th>
                    <th className="text-left p-4 text-white/70">Email</th>
                    <th className="text-left p-4 text-white/70">Vai trò</th>
                    <th className="text-left p-4 text-white/70">Ngày tạo</th>
                    <th className="text-left p-4 text-white/70">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="p-4 text-white/70">#{user.id}</td>
                      <td className="p-4 text-white">{user.name}</td>
                      <td className="p-4 text-white/70">{user.email}</td>
                      <td className="p-4">
                        <Badge className={`${getRoleBadgeColor(user.role)} border-0`}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-white/70">
                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(user.id)}
                            className="border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
