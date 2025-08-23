// Personal Information for Hero Section
export interface PersonalInfo {
  id: string;
  name: string;
  title: string;
  description: string;
  typingTexts: string[]; // For typing animation
  profileImage?: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email: string;
  };
  resumeUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// About Information
export interface AboutInfo {
  id: string;
  title: string;
  description: string;
  highlights: {
    icon: string; // Icon name or emoji
    text: string;
    color: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Skill Category
export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Emoji or icon name
  skills: string[];
  order: number; // For sorting
  createdAt?: Date;
  updatedAt?: Date;
}

// Contact Information
export interface ContactInfo {
  id: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  contactFormEmail?: string; // Email to receive contact form submissions
  createdAt?: Date;
  updatedAt?: Date;
}

// Site Settings
export interface SiteSettings {
  id: string;
  siteName: string;
  tagline: string;
  description: string;
  keywords: string[];
  favicon?: string;
  logo?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  seo: {
    title: string;
    description: string;
    image?: string;
  };
  analytics?: {
    googleAnalyticsId?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Form interfaces for creating/updating
export interface CreatePersonalInfoData extends Omit<PersonalInfo, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdatePersonalInfoData extends Partial<CreatePersonalInfoData> {}

export interface CreateAboutInfoData extends Omit<AboutInfo, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateAboutInfoData extends Partial<CreateAboutInfoData> {}

export interface CreateSkillCategoryData extends Omit<SkillCategory, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateSkillCategoryData extends Partial<CreateSkillCategoryData> {}

export interface CreateContactInfoData extends Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateContactInfoData extends Partial<CreateContactInfoData> {}

export interface CreateSiteSettingsData extends Omit<SiteSettings, 'id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateSiteSettingsData extends Partial<CreateSiteSettingsData> {} 