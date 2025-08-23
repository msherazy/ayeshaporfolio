export interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo?: string; // Make demo optional
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProjectData {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo?: string; // Make demo optional
  featured: boolean;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
} 