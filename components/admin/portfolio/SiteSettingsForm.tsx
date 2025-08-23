'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2, Plus, X } from 'lucide-react';
import { siteSettingsService } from '@/lib/portfolioService';
import { SiteSettings } from '@/types/portfolio';
import { toast } from 'sonner';

export function SiteSettingsForm() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    siteName: '',
    tagline: '',
    description: '',
    keywords: [''],
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6'
    },
    seo: {
      title: '',
      description: '',
      image: ''
    },
    analytics: {
      googleAnalyticsId: ''
    }
  });

  useEffect(() => {
    loadSiteSettings();
  }, []);

  const loadSiteSettings = async () => {
    try {
      const data = await siteSettingsService.getSiteSettings();
      if (data) {
        setSiteSettings(data);
        setFormData({
          siteName: data.siteName,
          tagline: data.tagline,
          description: data.description,
          keywords: data.keywords.length > 0 ? data.keywords : [''],
          theme: data.theme,
          seo: {
            title: data.seo.title,
            description: data.seo.description,
            image: data.seo.image || ''
          },
          analytics: {
            googleAnalyticsId: data.analytics?.googleAnalyticsId || ''
          }
        });
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
      toast.error('Lỗi khi tải cài đặt website');
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
        keywords: formData.keywords.filter(keyword => keyword.trim() !== '')
      };

      if (siteSettings) {
        await siteSettingsService.updateSiteSettings(siteSettings.id, dataToSave);
        toast.success('Cập nhật cài đặt website thành công');
      } else {
        await siteSettingsService.createSiteSettings(dataToSave);
        toast.success('Tạo cài đặt website thành công');
      }
      
      await loadSiteSettings();
    } catch (error) {
      console.error('Error saving site settings:', error);
      toast.error('Lỗi khi lưu cài đặt website');
    } finally {
      setSaving(false);
    }
  };

  const addKeyword = () => {
    setFormData(prev => ({
      ...prev,
      keywords: [...prev.keywords, '']
    }));
  };

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter((_, i) => i !== index)
    }));
  };

  const updateKeyword = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.map((keyword, i) => i === index ? value : keyword)
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
      {/* Basic Site Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin website cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Tên website</Label>
              <Input
                id="siteName"
                value={formData.siteName}
                onChange={(e) => setFormData(prev => ({ ...prev, siteName: e.target.value }))}
                placeholder="VD: My Portfolio"
                required
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
                placeholder="VD: Full Stack Developer"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="description">Mô tả website</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Mô tả ngắn về website..."
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SEO Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={formData.seo.title}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, title: e.target.value }
              }))}
              placeholder="Tiêu đề hiển thị trên search engine"
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={formData.seo.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, description: e.target.value }
              }))}
              rows={2}
              placeholder="Mô tả hiển thị trên search engine..."
            />
          </div>
          <div>
            <Label htmlFor="seoImage">SEO Image URL</Label>
            <Input
              id="seoImage"
              value={formData.seo.image}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                seo: { ...prev.seo, image: e.target.value }
              }))}
              placeholder="URL hình ảnh cho social sharing"
            />
          </div>
          
          {/* Keywords */}
          <div>
            <Label>Keywords</Label>
            <div className="space-y-2">
              {formData.keywords.map((keyword, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={keyword}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    placeholder="VD: portfolio, developer, react"
                  />
                  {formData.keywords.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeKeyword(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addKeyword}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm keyword
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Theme Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="primaryColor"
                  type="color"
                  value={formData.theme.primaryColor}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    theme: { ...prev.theme, primaryColor: e.target.value }
                  }))}
                  className="w-16 h-10"
                />
                <Input
                  value={formData.theme.primaryColor}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    theme: { ...prev.theme, primaryColor: e.target.value }
                  }))}
                  placeholder="#3b82f6"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="secondaryColor"
                  type="color"
                  value={formData.theme.secondaryColor}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    theme: { ...prev.theme, secondaryColor: e.target.value }
                  }))}
                  className="w-16 h-10"
                />
                <Input
                  value={formData.theme.secondaryColor}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    theme: { ...prev.theme, secondaryColor: e.target.value }
                  }))}
                  placeholder="#8b5cf6"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
            <Input
              id="googleAnalyticsId"
              value={formData.analytics.googleAnalyticsId}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                analytics: { ...prev.analytics, googleAnalyticsId: e.target.value }
              }))}
              placeholder="G-XXXXXXXXXX"
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
              {siteSettings ? 'Cập nhật' : 'Tạo mới'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
} 