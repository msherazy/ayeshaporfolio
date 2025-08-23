'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, Loader2 } from 'lucide-react';
import { personalInfoService } from '@/lib/portfolioService';
import { PersonalInfo, CreatePersonalInfoData, UpdatePersonalInfoData } from '@/types/portfolio';
import { toast } from 'sonner';

export function PersonalInfoForm() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    typingTexts: [''],
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      email: ''
    },
    resumeUrl: ''
  });

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    try {
      const data = await personalInfoService?.getPersonalInfo();
      if (data) {
        setPersonalInfo(data);
        setFormData({
          name: data.name,
          title: data.title,
          description: data?.description,
          typingTexts: data?.typingTexts?.length > 0 ? data?.typingTexts : [''],
          location: data?.location,
          socialLinks: {
            github: data?.socialLinks?.github || '',
            linkedin: data?.socialLinks?.linkedin || '',
            twitter: data?.socialLinks?.twitter || '',
            email: data?.socialLinks?.email
          },
          resumeUrl: data.resumeUrl || ''
        });
      }
    } catch (error) {
      console.error('Error loading personal info:', error);
      toast.error('Lỗi khi tải thông tin cá nhân');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSave = {
        ...formData,
        typingTexts: formData.typingTexts.filter(text => text.trim() !== '')
      };

      if (personalInfo) {
        await personalInfoService.updatePersonalInfo(personalInfo.id, dataToSave);
        toast.success('Cập nhật thông tin cá nhân thành công');
      } else {
        await personalInfoService.createPersonalInfo(dataToSave);
        toast.success('Tạo thông tin cá nhân thành công');
      }
      
      await loadPersonalInfo();
    } catch (error) {
      console.error('Error saving personal info:', error);
      toast.error('Lỗi khi lưu thông tin cá nhân');
    } finally {
      setSaving(false);
    }
  };

  const addTypingText = () => {
    setFormData(prev => ({
      ...prev,
      typingTexts: [...prev.typingTexts, '']
    }));
  };

  const removeTypingText = (index: number) => {
    setFormData(prev => ({
      ...prev,
      typingTexts: prev.typingTexts.filter((_, i) => i !== index)
    }));
  };

  const updateTypingText = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      typingTexts: prev.typingTexts.map((text, i) => i === index ? value : text)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Tên</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="title">Chức danh</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="location">Địa điểm</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          required
        />
      </div>

      {/* Typing Animation Texts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Typing Animation Texts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {formData.typingTexts.map((text, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={text}
                onChange={(e) => updateTypingText(index, e.target.value)}
                placeholder="VD: Full Stack Developer"
              />
              {formData.typingTexts.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTypingText(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addTypingText}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm text
          </Button>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.socialLinks.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, email: e.target.value }
                }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={formData.socialLinks.github}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, github: e.target.value }
                }))}
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData?.socialLinks?.linkedin}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                }))}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={formData.socialLinks.twitter}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                }))}
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              value={formData.resumeUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, resumeUrl: e.target.value }))}
              placeholder="https://drive.google.com/file/d/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {personalInfo ? 'Cập nhật' : 'Tạo mới'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
} 