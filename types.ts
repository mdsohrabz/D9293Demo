export type SourceType = 'reddit' | 'newsletter' | 'twitter';

export interface ContentItem {
  id: string;
  title: string;
  source: SourceType;
  sourceName: string;
  summary: string;
  url: string;
  timestamp: string; // ISO date string
  isSaved: boolean;
  tags: string[];
}

export type HookPlatform = 'twitter' | 'linkedin' | 'viral';

export interface GeneratedHook {
  id: string;
  contentItemId: string;
  platform: HookPlatform;
  content: string;
  createdAt: string;
}

export type TabView = 'feed' | 'saved';