'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { ProjectService } from '@/lib/projectService';
import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';

interface ProjectFormProps {
  project?: Project;
  mode: 'create' | 'edit';
}

export function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    technologies: project?.technologies || [],
    github: project?.github || '',
    demo: project?.demo || '',
    featured: project?.featured || false,
  });
  const [newTech, setNewTech] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        await ProjectService.createProject(formData as CreateProjectData);
      } else if (mode === 'edit' && project?.id) {
        await ProjectService.updateProject(project.id, {
          ...formData,
        } as UpdateProjectData);
      }
      
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Có lỗi xảy ra khi lưu project');
    } finally {
      setLoading(false);
    }
  };

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }));
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech),
    }));
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === 'create' ? 'Thêm Project Mới' : 'Chỉnh Sửa Project'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Tiêu đề</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <Label htmlFor="image">URL Hình ảnh</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                required
              />
            </div>

            {/* Technologies */}
            <div>
              <Label>Công nghệ sử dụng</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Nhập công nghệ..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* GitHub URL */}
            <div>
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                type="url"
                value={formData.github}
                onChange={(e) => handleInputChange('github', e.target.value)}
                required
              />
            </div>

            {/* Demo URL */}
            <div>
              <Label htmlFor="demo">Demo URL (Tùy chọn)</Label>
              <Input
                id="demo"
                type="url"
                value={formData.demo}
                onChange={(e) => handleInputChange('demo', e.target.value)}
                placeholder="https://example.com (Để trống nếu không có demo)"
              />
            </div>

            {/* Featured */}
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <Label htmlFor="featured">Project nổi bật</Label>
            </div>

            {/* Submit buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Đang lưu...' : mode === 'create' ? 'Tạo Project' : 'Cập nhật'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/admin/projects')}
              >
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 