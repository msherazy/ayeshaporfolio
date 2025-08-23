'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ExperienceForm } from '@/components/admin/ExperienceForm';
import { ExperienceService } from '@/lib/experienceService';
import { Experience } from '@/types/experience';

export default function EditExperiencePage() {
  const params = useParams();
  const experienceId = params.id as string;
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await ExperienceService.getExperienceById(experienceId);
        setExperience(data);
      } catch (error) {
        console.error('Error loading experience:', error);
      } finally {
        setLoading(false);
      }
    };

    if (experienceId) {
      loadExperience();
    }
  }, [experienceId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Không tìm thấy experience</p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Chỉnh Sửa Experience</h1>
        <p className="text-gray-600 mt-2">Cập nhật thông tin experience: {experience.title}</p>
      </div>
      
      <ExperienceForm mode="edit" experience={experience} />
    </div>
  );
} 