import { ExperienceForm } from '@/components/admin/ExperienceForm';

export default function NewExperiencePage() {
  return (
    <div className="px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Thêm Experience Mới</h1>
        <p className="text-gray-600 mt-2">Tạo một experience mới cho portfolio của bạn</p>
      </div>
      
      <ExperienceForm mode="create" />
    </div>
  );
} 