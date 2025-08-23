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
import { ExperienceService } from '@/lib/experienceService';
import { Experience, CreateExperienceData, UpdateExperienceData } from '@/types/experience';

interface ExperienceFormProps {
  experience?: Experience;
  mode: 'create' | 'edit';
}

export function ExperienceForm({ experience, mode }: ExperienceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: experience?.title || '',
    company: experience?.company || '',
    location: experience?.location || '',
    period: experience?.period || '',
    description: experience?.description || [],
    technologies: experience?.technologies || [],
    featured: experience?.featured || false,
  });
  const [newTech, setNewTech] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        await ExperienceService.createExperience(formData as CreateExperienceData);
      } else if (mode === 'edit' && experience?.id) {
        await ExperienceService.updateExperience({
          id: experience.id,
          ...formData,
        } as UpdateExperienceData);
      }
      
      router.push('/admin/experiences');
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Có lỗi xảy ra khi lưu experience');
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

  const addDescription = () => {
    if (newDescription.trim()) {
      setFormData(prev => ({
        ...prev,
        description: [...prev.description, newDescription.trim()],
      }));
      setNewDescription('');
    }
  };

  const removeDescription = (index: number) => {
    setFormData(prev => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>
            {mode === 'create' ? 'Thêm Experience Mới' : 'Chỉnh Sửa Experience'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Chức vụ</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Ví dụ: Senior Backend Developer"
                required
              />
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company">Công ty</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Ví dụ: Google"
                required
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Địa điểm</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Ví dụ: Ho Chi Minh City, Vietnam"
                required
              />
            </div>

            {/* Period */}
            <div>
              <Label htmlFor="period">Thời gian</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => handleInputChange('period', e.target.value)}
                placeholder="Ví dụ: Jan 2023 - Dec 2023"
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label>Mô tả công việc</Label>
              <div className="flex gap-2 mb-2">
                <Textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Mô tả một nhiệm vụ/thành tựu..."
                  rows={2}
                />
                <Button type="button" onClick={addDescription} size="sm" className="self-start">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.description.map((desc, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-1 text-sm text-black">{desc}</span>
                    <button
                      type="button"
                      onClick={() => removeDescription(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
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

            {/* Featured */}
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange('featured', checked)}
              />
              <Label htmlFor="featured">Experience nổi bật</Label>
            </div>

            {/* Submit buttons */}
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Đang lưu...' : mode === 'create' ? 'Tạo Experience' : 'Cập nhật'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push('/admin/experiences')}
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