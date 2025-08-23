export interface Experience {
  id?: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateExperienceData {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  featured: boolean;
}

export interface UpdateExperienceData extends Partial<CreateExperienceData> {
  id: string;
} 