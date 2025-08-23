'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Save, Loader2, Edit, Trash2 } from 'lucide-react';
import { skillCategoriesService } from '@/lib/portfolioService';
import { SkillCategory } from '@/types/portfolio';
import { toast } from 'sonner';

export function SkillCategoriesManager() {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    icon: '',
    skills: [''],
    order: 0
  });

  useEffect(() => {
    loadSkillCategories();
  }, []);

  const loadSkillCategories = async () => {
    try {
      const data = await skillCategoriesService.getSkillCategories();
      setSkillCategories(data);
    } catch (error) {
      console.error('Error loading skill categories:', error);
      toast.error('Lỗi khi tải skill categories');
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
        skills: formData.skills.filter(skill => skill.trim() !== '')
      };

      if (editingId) {
        await skillCategoriesService.updateSkillCategory(editingId, dataToSave);
        toast.success('Cập nhật skill category thành công');
      } else {
        await skillCategoriesService.createSkillCategory(dataToSave);
        toast.success('Tạo skill category thành công');
      }
      
      await loadSkillCategories();
      resetForm();
    } catch (error) {
      console.error('Error saving skill category:', error);
      toast.error('Lỗi khi lưu skill category');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category: SkillCategory) => {
    setEditingId(category.id);
    setFormData({
      title: category.title,
      icon: category.icon,
      skills: category.skills.length > 0 ? category.skills : [''],
      order: category.order
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa skill category này?')) return;

    try {
      await skillCategoriesService.deleteSkillCategory(id);
      toast.success('Xóa skill category thành công');
      await loadSkillCategories();
    } catch (error) {
      console.error('Error deleting skill category:', error);
      toast.error('Lỗi khi xóa skill category');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: '',
      icon: '',
      skills: [''],
      order: skillCategories.length
    });
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
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
    <div className="space-y-6">
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? 'Chỉnh sửa Skill Category' : 'Thêm Skill Category mới'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="VD: Backend Development"
                  required
                />
              </div>
              <div>
                <Label htmlFor="icon">Icon/Emoji</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="🔧"
                  required
                />
              </div>
              <div>
                <Label htmlFor="order">Thứ tự</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                  min="0"
                />
              </div>
            </div>

            <div>
              <Label>Skills</Label>
              <div className="space-y-2">
                {formData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      placeholder="VD: Node.js"
                    />
                    {formData.skills.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSkill}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm skill
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
              )}
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingId ? 'Cập nhật' : 'Tạo mới'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* List */}
      <div className="grid gap-4">
        {skillCategories.map((category) => (
          <Card key={category.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                    <Badge variant="outline">Thứ tự: {category.order}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {skillCategories.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              Chưa có skill category nào. Hãy tạo mới!
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 