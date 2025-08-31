'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Settings } from 'lucide-react';
import { ProjectService } from '@/lib/projectService';
import { Project } from '@/types/project';

export default function AdminDashboard() {
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

  const stats = {
    total: projects.length,
    featured: projects.filter(p => p.featured).length,
    regular: projects.filter(p => !p.featured).length,
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Project
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Nổi Bật</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featured}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Thường</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.regular}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2">
              <Link href="/admin/portfolio">
                <Settings className="h-8 w-8" />
                <span className="font-semibold">Portfolio Settings</span>
                <span className="text-sm opacity-80">Quản lý thông tin cá nhân</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-6 flex flex-col gap-2">
              <Link href="/admin/experiences/new">
                <Plus className="h-8 w-8" />
                <span className="font-semibold">Add Experience</span>
                <span className="text-sm opacity-80">Thêm kinh nghiệm làm việc mới</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Projects Gần Đây</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Chưa có project nào</p>
              <Button asChild>
                <Link href="/admin/projects/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo Project Đầu Tiên
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.slice(0, 5).map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{project.title}</h3>
                      {project.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Nổi bật
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{project.description.slice(0, 100)}...</p>
                    <div className="flex gap-2 mt-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
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
                </div>
              ))}
              
              {projects.length > 5 && (
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/admin/projects">Xem Tất Cả Projects</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 