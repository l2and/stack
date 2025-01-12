export type Tool = {
  title: string
  slug: string
  status: 'Using' | 'Plan to Try' | 'Plan to Build' | 'Retired'
  description: string
  howToUse: string[]
  caveats?: string
  category: 'AI' | 'Productivity' | 'Development' | 'Communication' | 'Design' | 'Other'
  url?: string
} 