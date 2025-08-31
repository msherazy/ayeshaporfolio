'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Building, Calendar, Edit, MapPin, Plus, Trash2} from 'lucide-react';
import {ExperienceService} from '@/lib/experienceService';
import {Experience} from '@/types/experience';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await ExperienceService.getAllExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa experience này?')) {
      try {
        await ExperienceService.deleteExperience(id);
        await loadExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        alert('Có lỗi xảy ra khi xóa experience');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="px-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Experiences</h1>
        <Button asChild>
          <Link href="/admin/experiences/new">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Experience
          </Link>
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">Chưa có experience nào</p>
            <Button asChild>
              <Link href="/admin/experiences/new">
                <Plus className="h-4 w-4 mr-2" />
                Tạo Experience Đầu Tiên
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {experiences.map((experience) => (
            <Card key={experience.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{experience.title}</span>
                  <div className="flex gap-1">
                    {experience.featured && (
                      <Badge className="bg-yellow-500 mr-2">Nổi bật</Badge>
                    )}
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/experiences/${experience.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => experience.id && handleDelete(experience.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Company and Location */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    {experience.company}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {experience.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {experience.period}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <h4 className="font-medium text-sm">Mô tả công việc:</h4>
                  <ul className="space-y-1">
                    {experience.description.slice(0, 2).map((desc, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-yellow-400 mr-2 mt-1">•</span>
                        {desc.length > 80 ? `${desc.slice(0, 80)}...` : desc}
                      </li>
                    ))}
                    {experience.description.length > 2 && (
                      <li className="text-xs text-gray-500">
                        +{experience.description.length - 2} mô tả khác...
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Công nghệ:</h4>
                  <div className="flex flex-wrap gap-1">
                    {experience.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  {experience.createdAt && (
                    <div>Tạo: {new Date(experience.createdAt).toLocaleDateString('vi-VN')}</div>
                  )}
                  {experience.updatedAt && (
                    <div>Cập nhật: {new Date(experience.updatedAt).toLocaleDateString('vi-VN')}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 