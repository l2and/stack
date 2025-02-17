export interface Tool {
  id: string;
  title: string;
  status: 'Using' | 'Plan to Try' | 'Plan to Build' | 'Building' | 'Retired' | 'Trying';
  category: 'AI' | 'Productivity' | 'Development' | 'Communication' | 'Design' | 'Other';
  description: string;
  howToUse: string[];
  caveats: string[];
  url: string;
  useCases: {
    title: string;
    items: string[];
  }[];
  tips: {
    title: string;
    items: string[];
  }[];
  addedOn: string | null;
  recommendedBy: string | null;
}

export interface Process {
  title: string;
  slug: string;
  description: string;
  toolsInvolved: string[];
  steps: string[];
  notes?: string;
  category: 'Personal' | 'Professional' | 'Development' | 'Content' | 'Other';
  content?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  }
} 