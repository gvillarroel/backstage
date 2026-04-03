export type UiStatusTone =
  | 'approved'
  | 'review'
  | 'optimized'
  | 'preview'
  | 'evaluation'
  | 'research'
  | 'monitoring'
  | 'foundation';

export interface AiBackstageSnapshot {
  models: Array<Record<string, unknown>>;
  repositories: Array<Record<string, unknown>>;
  skills: Array<Record<string, unknown>>;
  communities: Array<Record<string, unknown>>;
  agents: Array<Record<string, unknown>>;
  capabilities: Array<Record<string, unknown>>;
  generatedAt: string;
}
