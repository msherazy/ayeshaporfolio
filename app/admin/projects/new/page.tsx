import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <div className="px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Thêm Project Mới</h1>
        <p className="text-gray-600 mt-2">Tạo một project mới cho portfolio của bạn</p>
      </div>
      
      <ProjectForm mode="create" />
    </div>
  );
} 