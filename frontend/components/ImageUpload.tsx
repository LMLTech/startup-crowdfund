import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface ImageUploadProps {
  label?: string;
  value?: string;
  onChange: (file: File | null, previewUrl: string) => void;
  required?: boolean;
}

export default function ImageUpload({ label = "Hình ảnh dự án", value, onChange, required = false }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || '');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreview('');
      onChange(null, '');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh!');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File không được vượt quá 5MB!');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange(null, '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </Label>

      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
            dragActive 
              ? 'border-purple-500 bg-purple-500/10' 
              : 'border-white/20 bg-white/5 hover:border-white/40'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-white/10 rounded-full">
              <Upload className="w-8 h-8 text-white/70" />
            </div>
            
            <div>
              <p className="text-white mb-2">
                Kéo thả hình ảnh vào đây hoặc
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Chọn từ máy tính
              </Button>
            </div>

            <p className="text-white/50 text-sm">
              PNG, JPG, GIF, WEBP (tối đa 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black/20">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-white/20 bg-white/10 hover:bg-white/20 text-white"
              >
                <Upload className="w-4 h-4 mr-2" />
                Thay đổi
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleRemove}
                className="border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <X className="w-4 h-4 mr-2" />
                Xóa
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
