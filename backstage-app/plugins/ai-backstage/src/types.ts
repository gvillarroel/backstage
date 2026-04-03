export type UiStatusTone =
  | 'approved'
  | 'review'
  | 'optimized'
  | 'preview'
  | 'evaluation'
  | 'research'
  | 'monitoring'
  | 'foundation';

export interface ModelRecord {
  provider: string;
  model_name: string;
  portfolio_state: string;
  tool_call: string;
  reasoning: string;
  input_types: string;
  context_window: number;
  input_cost_per_1m: number | null;
  output_cost_per_1m: number | null;
  notes: string;
  uiStatus: UiStatusTone;
}

export interface RepositoryRecord {
  name: string;
  owner: string;
  github_url: string;
  description: string;
  language: string;
  date: string;
  type: string;
  show_on: string[];
}

export interface SkillRecord {
  name: string;
  description: string;
  category: string;
  tags: string[];
  status: string;
  uiStatus: UiStatusTone;
}

export interface CommunityRecord {
  name: string;
  description: string;
  type: string;
  cadence: string;
  link: string;
  link_label: string;
  icon: string;
}

export interface AgentRecord {
  name: string;
  status: string;
  description: string;
  owner: string;
  channel: string;
  icon: string;
  uiStatus: UiStatusTone;
}

export interface CapabilityRecord {
  name: string;
  description: string;
  icon: string;
  link: string;
  show_on: string[];
}

export interface AiBackstageSnapshot {
  models: ModelRecord[];
  repositories: RepositoryRecord[];
  skills: SkillRecord[];
  communities: CommunityRecord[];
  agents: AgentRecord[];
  capabilities: CapabilityRecord[];
  generatedAt: string;
}
