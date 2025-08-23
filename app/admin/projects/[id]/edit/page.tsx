'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { ProjectService } from '@/lib/projectService';
import { Project } from '@/types/project';

export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await ProjectService.getProjectById(projectId);
        setProject(data);
      } catch (error) {
        console.error('Error loading project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Không tìm thấy project</p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Chỉnh Sửa Project</h1>
        <p className="text-gray-600 mt-2">Cập nhật thông tin project: {project.title}</p>
      </div>
      
      <ProjectForm mode="edit" project={project} />
    </div>
  );
} 