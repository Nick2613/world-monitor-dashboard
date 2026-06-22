export interface AINews {
  id: string;
  title: string;
  source: string;
  time: string;
  category: string;
  impact: 'high' | 'medium' | 'low';
  sentiment: 'positive' | 'negative' | 'neutral';
  tags: string[];
}

export const AI_NEWS: AINews[] = [
  { id: 'ai1', title: 'OpenAI launches GPT-5 with real-time reasoning capabilities', source: 'TechCrunch', time: '12 min ago', category: 'LLM', impact: 'high', sentiment: 'positive', tags: ['GPT-5', 'OpenAI', 'AGI'] },
  { id: 'ai2', title: 'Google DeepMind achieves breakthrough in protein-drug interaction prediction', source: 'Nature', time: '28 min ago', category: 'Research', impact: 'high', sentiment: 'positive', tags: ['DeepMind', 'Drug Discovery', 'AlphaFold'] },
  { id: 'ai3', title: 'NVIDIA announces Blackwell Ultra GPU architecture for AI training', source: 'The Verge', time: '45 min ago', category: 'Hardware', impact: 'high', sentiment: 'positive', tags: ['NVIDIA', 'GPU', 'Blackwell'] },
  { id: 'ai4', title: 'EU AI Act enforcement begins: Tech companies scramble to comply', source: 'Reuters', time: '1 hr ago', category: 'Regulation', impact: 'high', sentiment: 'negative', tags: ['EU AI Act', 'Regulation', 'Compliance'] },
  { id: 'ai5', title: 'Anthropic raises $5B at $60B valuation for AI safety research', source: 'Bloomberg', time: '1 hr ago', category: 'Funding', impact: 'medium', sentiment: 'positive', tags: ['Anthropic', 'Funding', 'AI Safety'] },
  { id: 'ai6', title: 'China releases open-source LLM rivaling GPT-4 performance', source: 'SCMP', time: '2 hr ago', category: 'LLM', impact: 'high', sentiment: 'neutral', tags: ['China', 'Open Source', 'LLM'] },
  { id: 'ai7', title: 'Tesla FSD v13 achieves Level 4 autonomy in 95% of test scenarios', source: 'Electrek', time: '2 hr ago', category: 'Autonomous', impact: 'high', sentiment: 'positive', tags: ['Tesla', 'FSD', 'Autonomous'] },
  { id: 'ai8', title: 'Meta releases Llama 4 with multimodal reasoning and 1M context', source: 'Meta AI Blog', time: '3 hr ago', category: 'LLM', impact: 'high', sentiment: 'positive', tags: ['Meta', 'Llama 4', 'Open Source'] },
  { id: 'ai9', title: 'AI-generated deepfakes surge 300% ahead of global elections', source: 'AP News', time: '3 hr ago', category: 'Security', impact: 'high', sentiment: 'negative', tags: ['Deepfakes', 'Elections', 'Misinformation'] },
  { id: 'ai10', title: 'Microsoft Copilot now handles 40% of enterprise coding tasks', source: 'ZDNet', time: '4 hr ago', category: 'Enterprise', impact: 'medium', sentiment: 'positive', tags: ['Microsoft', 'Copilot', 'Enterprise'] },
  { id: 'ai11', title: 'Google Gemini 2.5 Pro tops benchmarks with 2M token context window', source: 'Google Blog', time: '4 hr ago', category: 'LLM', impact: 'medium', sentiment: 'positive', tags: ['Google', 'Gemini', 'Benchmarks'] },
  { id: 'ai12', title: 'AI chip shortage expected to ease as TSMC ramps 2nm production', source: 'Nikkei Asia', time: '5 hr ago', category: 'Hardware', impact: 'medium', sentiment: 'positive', tags: ['TSMC', '2nm', 'Chips'] },
  { id: 'ai13', title: 'Open-source AI models now match proprietary on most enterprise tasks', source: 'Ars Technica', time: '5 hr ago', category: 'Trend', impact: 'medium', sentiment: 'neutral', tags: ['Open Source', 'Enterprise', 'Trend'] },
  { id: 'ai14', title: 'AI adoption in healthcare accelerates: FDA approves 12 new AI diagnostics', source: 'STAT News', time: '6 hr ago', category: 'Healthcare', impact: 'medium', sentiment: 'positive', tags: ['Healthcare', 'FDA', 'Diagnostics'] },
  { id: 'ai15', title: 'Major data breach exposes AI training datasets of 3 top labs', source: 'Wired', time: '6 hr ago', category: 'Security', impact: 'high', sentiment: 'negative', tags: ['Data Breach', 'Training Data', 'Security'] },
];

export interface FundingRound {
  company: string;
  amount: string;
  valuation?: string;
  stage: string;
  sector: string;
  investors: string;
  date: string;
}

export const FUNDING_ROUNDS: FundingRound[] = [
  { company: 'Anthropic', amount: '$5B', valuation: '$60B', stage: 'Series D', sector: 'AI Safety', investors: 'Google, Salesforce', date: 'Jun 2026' },
  { company: 'xAI', amount: '$6B', valuation: '$40B', stage: 'Series C', sector: 'AGI', investors: 'a16z, Sequoia', date: 'May 2026' },
  { company: 'Mistral AI', amount: '$2B', valuation: '$18B', stage: 'Series B', sector: 'Foundation Models', investors: 'General Catalyst, Lightspeed', date: 'Jun 2026' },
  { company: 'Cohere', amount: '$500M', valuation: '$5.5B', stage: 'Series D', sector: 'Enterprise AI', investors: 'PSP Investments, Inovia', date: 'May 2026' },
  { company: 'Figure AI', amount: '$1.5B', valuation: '$12B', stage: 'Series B', sector: 'Humanoid Robots', investors: 'Microsoft, Nvidia, Bezos', date: 'Apr 2026' },
  { company: 'Sakana AI', amount: '$300M', valuation: '$2B', stage: 'Series A', sector: 'AI Research', investors: 'NTT, Khosla', date: 'Jun 2026' },
  { company: 'Physical Intelligence', amount: '$400M', valuation: '$2.4B', stage: 'Series B', sector: 'Robotics AI', investors: 'Amazon, Thrive Capital', date: 'May 2026' },
  { company: 'Reka AI', amount: '$200M', valuation: '$1.5B', stage: 'Series B', sector: 'Multimodal AI', investors: ' DST Global, Snowflake', date: 'Apr 2026' },
];

export interface AIModel {
  name: string;
  company: string;
  released: string;
  parameters: string;
  modality: string;
  benchmark: string;
  openSource: boolean;
}

export const AI_MODELS: AIModel[] = [
  { name: 'GPT-5', company: 'OpenAI', released: 'Jun 2026', parameters: '~2T est.', modality: 'Text, Image, Audio, Video', benchmark: 'MMLU: 95.2%', openSource: false },
  { name: 'Gemini 2.5 Pro', company: 'Google', released: 'May 2026', parameters: '~1.5T est.', modality: 'Text, Image, Audio, Video', benchmark: 'MMLU: 94.8%', openSource: false },
  { name: 'Claude 4 Opus', company: 'Anthropic', released: 'Jun 2026', parameters: '~1.8T est.', modality: 'Text, Image', benchmark: 'MMLU: 94.5%', openSource: false },
  { name: 'Llama 4 405B', company: 'Meta', released: 'Apr 2026', parameters: '405B', modality: 'Text, Image', benchmark: 'MMLU: 88.7%', openSource: true },
  { name: 'DeepSeek V3', company: 'DeepSeek', released: 'May 2026', parameters: '671B MoE', modality: 'Text, Code', benchmark: 'MMLU: 87.3%', openSource: true },
  { name: 'Qwen3 235B', company: 'Alibaba', released: 'Mar 2026', parameters: '235B MoE', modality: 'Text, Image', benchmark: 'MMLU: 86.1%', openSource: true },
  { name: 'Mistral Large 3', company: 'Mistral AI', released: 'Jun 2026', parameters: '123B', modality: 'Text, Code, Math', benchmark: 'MMLU: 85.4%', openSource: true },
  { name: 'Command R+ v2', company: 'Cohere', released: 'May 2026', parameters: '104B', modality: 'Text, RAG', benchmark: 'MMLU: 83.2%', openSource: true },
];