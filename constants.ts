import { ContentItem } from './types';

export const MOCK_INITIAL_DATA: ContentItem[] = [
  {
    id: '1',
    title: 'The Future of AI Agents in 2025',
    source: 'reddit',
    sourceName: 'r/Singularity',
    summary: 'A deep dive into how autonomous agents will reshape workforce productivity, moving beyond simple chatbots to complex task executioners.',
    url: '#',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    isSaved: false,
    tags: ['AI', 'Productivity'],
  },
  {
    id: '2',
    title: 'React Server Components: A Comprehensive Guide',
    source: 'newsletter',
    sourceName: 'Frontend Weekly',
    summary: 'Understanding the paradigm shift in React architecture. How RSCs improve initial page load and reduce bundle size significantly.',
    url: '#',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    isSaved: true,
    tags: ['React', 'Web Dev'],
  },
  {
    id: '3',
    title: 'Why Founders Should Write Code',
    source: 'twitter',
    sourceName: '@paulg',
    summary: 'Technical founders have a distinct advantage in the early stages of a startup. Iteration speed is the only metric that matters.',
    url: '#',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    isSaved: false,
    tags: ['Startup', 'Founders'],
  },
  {
    id: '4',
    title: 'Sustainable Growth vs. Hypergrowth',
    source: 'newsletter',
    sourceName: 'The Bootstrapper',
    summary: 'Analyzing the trend of slow, profitable growth companies versus VC-backed unicorns. Why the tide is turning towards profitability.',
    url: '#',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    isSaved: false,
    tags: ['Business', 'SaaS'],
  }
];

export const MOCK_NEW_DATA: ContentItem[] = [
  {
    id: '5',
    title: 'Tailwind CSS v4.0 Alpha Release',
    source: 'twitter',
    sourceName: '@adamwathan',
    summary: 'A first look at the new engine. It is faster, smaller, and easier to use. No more configuration files needed for basic setups.',
    url: '#',
    timestamp: new Date().toISOString(),
    isSaved: false,
    tags: ['CSS', 'Design'],
  },
  {
    id: '6',
    title: 'DeepSeek-R1 vs Gemini 1.5 Pro',
    source: 'reddit',
    sourceName: 'r/LocalLLaMA',
    summary: 'Benchmarking the latest open weights models against proprietary giants. The gap is closing faster than expected.',
    url: '#',
    timestamp: new Date().toISOString(),
    isSaved: false,
    tags: ['AI', 'LLMs'],
  }
];

export const MOCK_GENERATED_HOOKS: Record<string, string[]> = {
  twitter: [
    "AI agents aren't coming; they're already here. 🤖\n\nAnd they're about to change how we work forever.\n\nHere's why 2025 is the year of the autonomous agent: 🧵",
    "Stop thinking of AI as a chatbot.\nStart thinking of it as an employee.\n\nThe shift to Agentic workflows is massive. Here is what you need to know 👇",
  ],
  linkedin: [
    "The workforce is evolving. We are moving from 'AI as a tool' to 'AI as a teammate'.\n\nI recently read an insightful discussion on r/Singularity about the state of autonomous agents in 2025.\n\nThe key takeaway? Productivity isn't just about speed anymore; it's about autonomy.\n\nAre you ready for this shift? #AI #FutureOfWork #Productivity",
  ]
};