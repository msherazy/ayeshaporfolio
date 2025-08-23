import { Experience, CreateExperienceData, UpdateExperienceData } from '@/types/experience';

// Helper function to safely convert timestamps
const convertTimestamp = (timestamp: any) => {
  if (!timestamp) return undefined;
  if (typeof timestamp === 'string') return new Date(timestamp);
  if (timestamp instanceof Date) return timestamp;
  return undefined;
};

export class ExperienceService {
  // Get all experiences
  static async getAllExperiences(): Promise<Experience[]> {
    try {
      const response = await fetch('/api/experiences');
      const experiences = await response.json();
      return experiences.map((exp: any) => ({
        ...exp,
        createdAt: convertTimestamp(exp.createdAt),
        updatedAt: convertTimestamp(exp.updatedAt),
      }));
    } catch (error) {
      console.error('Error getting experiences:', error);
      return [];
    }
  }

  // Get experience by ID
  static async getExperienceById(id: string): Promise<Experience | null> {
    try {
      const response = await fetch(`/api/experiences/${id}`);
      if (!response.ok) return null;
      const experience = await response.json();
      return {
        ...experience,
        createdAt: convertTimestamp(experience.createdAt),
        updatedAt: convertTimestamp(experience.updatedAt),
      };
    } catch (error) {
      console.error('Error getting experience by ID:', error);
      return null;
    }
  }

  // Create new experience
  static async createExperience(data: CreateExperienceData): Promise<Experience> {
    try {
      const response = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create experience');
      const experience = await response.json();
      return {
        ...experience,
        createdAt: convertTimestamp(experience.createdAt),
        updatedAt: convertTimestamp(experience.updatedAt),
      };
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  }

  // Update experience
  static async updateExperience(id: string, data: UpdateExperienceData): Promise<Experience> {
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update experience');
      const experience = await response.json();
      return {
        ...experience,
        createdAt: convertTimestamp(experience.createdAt),
        updatedAt: convertTimestamp(experience.updatedAt),
      };
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  }

  // Delete experience
  static async deleteExperience(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete experience');
    } catch (error) {
      console.error('Error deleting experience:', error);
      throw error;
    }
  }
}
