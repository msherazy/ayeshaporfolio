'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2 } from 'lucide-react';
import { contactInfoService } from '@/lib/portfolioService';
import { ContactInfo } from '@/types/portfolio';
import { toast } from 'sonner';

export function ContactInfoForm() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    contactFormEmail: ''
  });

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      const data = await contactInfoService.getContactInfo();
      if (data) {
        setContactInfo(data);
        setFormData({
          email: data.email,
          phone: data.phone || '',
          location: data.location,
          socialLinks: {
            github: data.socialLinks.github || '',
            linkedin: data.socialLinks.linkedin || '',
            twitter: data.socialLinks.twitter || '',
            facebook: data.socialLinks.facebook || '',
            instagram: data.socialLinks.instagram || ''
          },
          contactFormEmail: data.contactFormEmail || ''
        });
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
      toast.error('Lỗi khi tải thông tin liên hệ');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (contactInfo) {
        await contactInfoService.updateContactInfo(contactInfo.id, formData);
        toast.success('Cập nhật thông tin liên hệ thành công');
      } else {
        await contactInfoService.createContactInfo(formData);
        toast.success('Tạo thông tin liên hệ thành công');
      }
      
      await loadContactInfo();
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast.error('Lỗi khi lưu thông tin liên hệ');
    } finally {
      setSaving(false);
    }
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
      {/* Basic Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin liên hệ cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+84 123 456 789"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Địa điểm</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="VD: Ho Chi Minh City, Vietnam"
              required
            />
          </div>
          <div>
            <Label htmlFor="contactFormEmail">Email nhận form liên hệ</Label>
            <Input
              id="contactFormEmail"
              type="email"
              value={formData.contactFormEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, contactFormEmail: e.target.value }))}
              placeholder="Email để nhận tin nhắn từ contact form"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={formData.socialLinks.facebook}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                }))}
                placeholder="https://facebook.com/username"
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={formData.socialLinks.instagram}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                }))}
                placeholder="https://instagram.com/username"
              />
            </div>
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
              {contactInfo ? 'Cập nhật' : 'Tạo mới'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
} 