'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Edit, ExternalLink, Github, Plus, Trash2} from 'lucide-react';
import {ProjectService} from '@/lib/projectService';
import {Project} from '@/types/project';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await ProjectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa project này?')) {
      try {
        await ProjectService.deleteProject(id);
        await loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Có lỗi xảy ra khi xóa project');
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
        <h1 className="text-3xl font-bold text-gray-900">Quản Lý Projects</h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">Chưa có project nào</p>
            <Button asChild>
              <Link href="/admin/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                Tạo Project Đầu Tiên
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500">Nổi bật</Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{project.title}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => project.id && handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      GitHub
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500">
                  {project.createdAt && (
                    <div>Tạo: {new Date(project.createdAt).toLocaleDateString('vi-VN')}</div>
                  )}
                  {project.updatedAt && (
                    <div>Cập nhật: {new Date(project.updatedAt).toLocaleDateString('vi-VN')}</div>
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