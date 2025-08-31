'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Save, Loader2, AlertTriangle } from 'lucide-react';
import { aboutInfoService } from '@/lib/portfolioService';
import { AboutInfo } from '@/types/portfolio';
import { toast } from 'sonner';

export function AboutInfoForm() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    highlights: [
      { icon: '', text: '', color: '' }
    ]
  });

  useEffect(() => {
    loadAboutInfo();
  }, []);

  const loadAboutInfo = async () => {
    try {
      setError(null);
      console.log('[AboutInfo] Loading data...');
      
      const data = await aboutInfoService.getAboutInfo();
      console.log('[AboutInfo] Loaded data:', data);
      
      if (data) {
        setAboutInfo(data);
        setFormData({
          title: data.title,
          description: data.description,
          highlights: data.highlights.length > 0 ? data.highlights : [{ icon: '', text: '', color: '' }]
        });
      }
    } catch (error: any) {
      console.error('[AboutInfo] Error loading data:', error);
      setError(`Lỗi khi tải dữ liệu: ${error.message}`);
      toast.error('Lỗi khi tải thông tin about');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent double submission
    if (saving) {
      console.log('[AboutInfo] Already saving, ignoring duplicate submit');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      console.log('[AboutInfo] Starting save operation...');
      console.log('[AboutInfo] Form data:', formData);
      console.log('[AboutInfo] Existing about info:', aboutInfo);

      const dataToSave = {
        ...formData,
        highlights: formData.highlights.filter(h => h.text.trim() !== '')
      };

      console.log('[AboutInfo] Data to save:', dataToSave);

      let result;
      if (aboutInfo?.id) {
        console.log('[AboutInfo] Updating existing record with ID:', aboutInfo.id);
        result = await aboutInfoService.updateAboutInfo(aboutInfo.id, dataToSave);
        console.log('[AboutInfo] Update result:', result);
        toast.success('Cập nhật thông tin about thành công');
      } else {
        console.log('[AboutInfo] Creating new record');
        result = await aboutInfoService.createAboutInfo(dataToSave);
        console.log('[AboutInfo] Create result:', result);
        toast.success('Tạo thông tin about thành công');
      }
      
      // Reload to get fresh data
      console.log('[AboutInfo] Reloading data after save');
      await loadAboutInfo();
      
    } catch (error: any) {
      console.error('[AboutInfo] Save error:', error);
      console.error('[AboutInfo] Error stack:', error.stack);
      
      const errorMessage = error.message || 'Unknown error occurred';
      setError(`Lỗi khi lưu: ${errorMessage}`);
      
      // More specific error handling
      if (errorMessage.includes('permission')) {
        toast.error('Lỗi quyền truy cập - Kiểm tra API permissions');
      } else if (errorMessage.includes('network')) {
        toast.error('Lỗi kết nối mạng - Kiểm tra internet');
      } else if (errorMessage.includes('auth')) {
        toast.error('Lỗi xác thực - Đăng nhập lại');
      } else {
        toast.error(`Lỗi khi lưu thông tin about: ${errorMessage}`);
      }
    } finally {
      setSaving(false);
      console.log('[AboutInfo] Save operation completed');
    }
  };

  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, { icon: '', text: '', color: '' }]
    }));
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const updateHighlight = (index: number, field: 'icon' | 'text' | 'color', value: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.map((highlight, i) => 
        i === index ? { ...highlight, [field]: value } : highlight
      )
    }));
  };

  const colorOptions = [
    'text-blue-600',
    'text-green-600',
    'text-red-600',
    'text-yellow-600',
    'text-purple-600',
    'text-pink-600',
    'text-indigo-600',
    'text-orange-600'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Lỗi:</span>
            </div>
            <p className="text-red-700 mt-2">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setError(null)}
              className="mt-3"
            >
              Đóng
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Debug Info */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="text-sm text-blue-800">
            <strong>Debug Info:</strong>
            <br />• Existing ID: {aboutInfo?.id || 'None (will create new)'}
            <br />• Form valid: {formData.title && formData.description ? 'Yes' : 'No'}
            <br />• Saving: {saving ? 'Yes' : 'No'}
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="VD: About Me"
            required
            disabled={saving}
          />
        </div>

        <div>
          <Label htmlFor="description">Mô tả</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            placeholder="Mô tả về bản thân..."
            required
            disabled={saving}
          />
        </div>

        {/* Highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-2">
                  <Label>Icon/Emoji</Label>
                  <Input
                    value={highlight.icon}
                    onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                    placeholder="🚀"
                    disabled={saving}
                  />
                </div>
                <div className="col-span-6">
                  <Label>Text</Label>
                  <Input
                    value={highlight.text}
                    onChange={(e) => updateHighlight(index, 'text', e.target.value)}
                    placeholder="VD: 1+ Years Experience"
                    disabled={saving}
                  />
                </div>
                <div className="col-span-3">
                  <Label>Color</Label>
                  <select
                    value={highlight.color}
                    onChange={(e) => updateHighlight(index, 'color', e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    disabled={saving}
                  >
                    <option value="">Chọn màu</option>
                    {colorOptions.map(color => (
                      <option key={color} value={color}>
                        {color.replace('text-', '').replace('-600', '')}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
                  {formData.highlights.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeHighlight(index)}
                      disabled={saving}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addHighlight}
              className="w-full"
              disabled={saving}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm highlight
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <Button 
            type="button" 
            variant="outline" 
            onClick={loadAboutInfo}
            disabled={saving}
          >
            Reload Data
          </Button>
          <Button type="submit" disabled={saving || !formData.title || !formData.description}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {aboutInfo ? 'Cập nhật' : 'Tạo mới'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 