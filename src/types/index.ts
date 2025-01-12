export interface Tool {
  title: string;
  slug: string;
  status: 'Currently Using' | 'Plan to Try' | 'Retired';
  description: string;
  howToUse: string;
  caveats?: string;
  category: 'AI' | 'Productivity' | 'Development' | 'Communication' | 'Design' | 'Other';
}

export interface Process {
  title: string;
  slug: string;
  description: string;
  toolsInvolved: string[];
  steps: string[];
  notes?: string;
  category: 'Personal' | 'Professional' | 'Development' | 'Content' | 'Other';
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