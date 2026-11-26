export type ID = string;

export interface UserProfile {
  id: ID;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  tier: 'Enterprise Research' | 'Developer Pro' | 'Standard';
}

export interface SearchResultItem {
  id: ID;
  title: string;
  subtitle: string;
  category: 'workspace' | 'knowledge' | 'agents' | 'workflows';
  link: string;
}
