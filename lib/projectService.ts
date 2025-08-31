import { Project, CreateProjectData, UpdateProjectData } from '@/types/project';

// Helper function to safely convert timestamps
const convertTimestamp = (timestamp: any) => {
  if (!timestamp) return undefined;
  if (typeof timestamp === 'string') return new Date(timestamp);
  if (timestamp instanceof Date) return timestamp;
  return undefined;
};

export class ProjectService {
  // Get project by ID
  static async getProjectById(id: string): Promise<Project | null> {
    try {
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) return null;
      const project = await response.json();
      return {
        ...project,
        createdAt: convertTimestamp(project.createdAt),
        updatedAt: convertTimestamp(project.updatedAt),
      };
    } catch (error) {
      console.error('Error getting project by ID:', error);
      return null;
    }
  }

  // Create new project
  static async createProject(data: CreateProjectData): Promise<Project> {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create project');
      const project = await response.json();
      return {
        ...project,
        createdAt: convertTimestamp(project.createdAt),
        updatedAt: convertTimestamp(project.updatedAt),
      };
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project
  static async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update project');
      const project = await response.json();
      return {
        ...project,
        createdAt: convertTimestamp(project.createdAt),
        updatedAt: convertTimestamp(project.updatedAt),
      };
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Delete project
  static async deleteProject(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete project');
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Get all projects
  static async getAllProjects(): Promise<Project[]> {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      return projects.map((project: any) => ({
        ...project,
        createdAt: convertTimestamp(project.createdAt),
        updatedAt: convertTimestamp(project.updatedAt),
      }));
    } catch (error) {
      console.error('Error getting all projects:', error);
      return [];
    }
  }

  // Get featured projects
  static async getFeaturedProjects(): Promise<Project[]> {
    try {
      const projects = await this.getAllProjects();
      return projects.filter(project => project.featured);
    } catch (error) {
      console.error('Error getting featured projects:', error);
      return [];
    }
  }
}
