import type {
  PersonalInfo,
  AboutInfo,
  SkillCategory,
  ContactInfo,
  SiteSettings,
  CreatePersonalInfoData,
  UpdatePersonalInfoData,
  CreateAboutInfoData,
  UpdateAboutInfoData,
  CreateSkillCategoryData,
  UpdateSkillCategoryData,
  CreateContactInfoData,
  UpdateContactInfoData,
  CreateSiteSettingsData,
  UpdateSiteSettingsData
} from '@/types/portfolio';

// Helper function to safely convert timestamps
const convertTimestamp = (timestamp: any) => {
  if (!timestamp) return undefined;
  if (typeof timestamp === 'string') return new Date(timestamp);
  if (timestamp instanceof Date) return timestamp;
  return undefined;
};

// Personal Info Services
export const personalInfoService = {
  // Get personal info
  async getPersonalInfo(): Promise<PersonalInfo | null> {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      return {
        ...data.personalInfo,
        createdAt: convertTimestamp(data?.personalInfo?.createdAt),
        updatedAt: convertTimestamp(data?.personalInfo?.updatedAt),
      };
    } catch (error) {
      console.error('Error getting personal info:', error);
      return null;
    }
  },

  // Create personal info
  async createPersonalInfo(data: CreatePersonalInfoData): Promise<PersonalInfo> {
    try {
      const response = await fetch('/api/portfolio/personal-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create personal info');
      return response.json();
    } catch (error) {
      console.error('Error creating personal info:', error);
      throw error;
    }
  },

  // Update personal info
  async updatePersonalInfo(id: string, data: UpdatePersonalInfoData): Promise<PersonalInfo> {
    try {
      const response = await fetch(`/api/portfolio/personal-info/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update personal info');
      return response.json();
    } catch (error) {
      console.error('Error updating personal info:', error);
      throw error;
    }
  }
};

// About Info Services
export const aboutInfoService = {
  // Get about info
  async getAboutInfo(): Promise<AboutInfo | null> {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      return {
        ...data.aboutInfo,
        createdAt: convertTimestamp(data.aboutInfo.createdAt),
        updatedAt: convertTimestamp(data.aboutInfo.updatedAt),
      };
    } catch (error) {
      console.error('Error getting about info:', error);
      return null;
    }
  },

  // Create about info
  async createAboutInfo(data: CreateAboutInfoData): Promise<AboutInfo> {
    try {
      const response = await fetch('/api/portfolio/about-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create about info');
      return response.json();
    } catch (error) {
      console.error('Error creating about info:', error);
      throw error;
    }
  },

  // Update about info
  async updateAboutInfo(id: string, data: UpdateAboutInfoData): Promise<AboutInfo> {
    try {
      const response = await fetch(`/api/portfolio/about-info/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update about info');
      return response.json();
    } catch (error) {
      console.error('Error updating about info:', error);
      throw error;
    }
  }
};

// Skill Categories Services
export const skillCategoriesService = {
  // Get all skill categories
  async getAllSkillCategories(): Promise<SkillCategory[]> {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      return data.skillCategories.map((category: any) => ({
        ...category,
        createdAt: convertTimestamp(category.createdAt),
        updatedAt: convertTimestamp(category.updatedAt),
      }));
    } catch (error) {
      console.error('Error getting skill categories:', error);
      return [];
    }
  },

  // Get skill category by ID
  async getSkillCategoryById(id: string): Promise<SkillCategory | null> {
    try {
      const categories = await this.getAllSkillCategories();
      return categories.find(cat => cat.id === id) || null;
    } catch (error) {
      console.error('Error getting skill category by ID:', error);
      return null;
    }
  },

  // Create skill category
  async createSkillCategory(data: CreateSkillCategoryData): Promise<SkillCategory> {
    try {
      const response = await fetch('/api/portfolio/skill-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create skill category');
      return response.json();
    } catch (error) {
      console.error('Error creating skill category:', error);
      throw error;
    }
  },

  // Update skill category
  async updateSkillCategory(id: string, data: UpdateSkillCategoryData): Promise<SkillCategory> {
    try {
      const response = await fetch(`/api/portfolio/skill-categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update skill category');
      return response.json();
    } catch (error) {
      console.error('Error updating skill category:', error);
      throw error;
    }
  },

  // Delete skill category
  async deleteSkillCategory(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/portfolio/skill-categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete skill category');
    } catch (error) {
      console.error('Error deleting skill category:', error);
      throw error;
    }
  }
};

// Contact Info Services
export const contactInfoService = {
  // Get contact info
  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      return {
        ...data.contactInfo,
        createdAt: convertTimestamp(data.contactInfo.createdAt),
        updatedAt: convertTimestamp(data.contactInfo.updatedAt),
      };
    } catch (error) {
      console.error('Error getting contact info:', error);
      return null;
    }
  },

  // Create contact info
  async createContactInfo(data: CreateContactInfoData): Promise<ContactInfo> {
    try {
      const response = await fetch('/api/portfolio/contact-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create contact info');
      return response.json();
    } catch (error) {
      console.error('Error creating contact info:', error);
      throw error;
    }
  },

  // Update contact info
  async updateContactInfo(id: string, data: UpdateContactInfoData): Promise<ContactInfo> {
    try {
      const response = await fetch(`/api/portfolio/contact-info/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update contact info');
      return response.json();
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  }
};

// Site Settings Services
export const siteSettingsService = {
  // Get site settings
  async getSiteSettings(): Promise<SiteSettings | null> {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      return {
        ...data.siteSettings,
        createdAt: convertTimestamp(data.siteSettings.createdAt),
        updatedAt: convertTimestamp(data.siteSettings.updatedAt),
      };
    } catch (error) {
      console.error('Error getting site settings:', error);
      return null;
    }
  },

  // Create site settings
  async createSiteSettings(data: CreateSiteSettingsData): Promise<SiteSettings> {
    try {
      const response = await fetch('/api/portfolio/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create site settings');
      return response.json();
    } catch (error) {
      console.error('Error creating site settings:', error);
      throw error;
    }
  },

  // Update site settings
  async updateSiteSettings(id: string, data: UpdateSiteSettingsData): Promise<SiteSettings> {
    try {
      const response = await fetch(`/api/portfolio/site-settings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update site settings');
      return response.json();
    } catch (error) {
      console.error('Error updating site settings:', error);
      throw error;
    }
  }
};
