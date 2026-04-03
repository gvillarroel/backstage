import fs from 'fs/promises';
import path from 'path';
import { readCsvText } from './csv';
import type { AiBackstageSnapshot, UiStatusTone } from './types';

const statusMap: Record<string, UiStatusTone> = {
  'Approved for build': 'approved',
  'Review board': 'review',
  'Cost-optimized': 'optimized',
  'Preview only': 'preview',
  'Open evaluation': 'evaluation',
  'Research track': 'research',
  Monitoring: 'monitoring',
  Foundation: 'foundation',
  Production: 'approved',
  Controlled: 'review',
  Pilot: 'evaluation',
  'Shared service': 'foundation',
  Discovery: 'preview',
  active: 'approved',
};

const splitList = (value: string | undefined) =>
  (value ?? '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);

const resolveUiStatus = (value: string | undefined): UiStatusTone =>
  statusMap[value ?? ''] ?? 'evaluation';

const numberOrNull = (value: string | undefined) =>
  value && value.length ? Number(value) : null;

export const loadAiBackstageSnapshot = async (
  dataDir: string,
): Promise<AiBackstageSnapshot> => {
  const read = async (name: string) =>
    readCsvText(await fs.readFile(path.join(dataDir, name), 'utf8'));

  const [models, repositories, skills, communities, agents, capabilities] =
    await Promise.all([
      read('models.csv'),
      read('repositories.csv'),
      read('skills.csv'),
      read('communities.csv'),
      read('agents.csv'),
      read('capabilities.csv'),
    ]);

  return {
    models: models.map(model => ({
      ...model,
      context_window: Number(model.context_window ?? 0),
      input_cost_per_1m: numberOrNull(model.input_cost_per_1m),
      output_cost_per_1m: numberOrNull(model.output_cost_per_1m),
      uiStatus: resolveUiStatus(model.portfolio_state),
    })),
    repositories: repositories.map(repository => ({
      ...repository,
      show_on: splitList(repository.show_on),
    })),
    skills: skills.map(skill => ({
      ...skill,
      tags: splitList(skill.tags),
      uiStatus: resolveUiStatus(skill.status),
    })),
    communities,
    agents: agents.map(agent => ({
      ...agent,
      uiStatus: resolveUiStatus(agent.status),
    })),
    capabilities: capabilities.map(capability => ({
      ...capability,
      show_on: splitList(capability.show_on),
    })),
    generatedAt: new Date().toISOString(),
  };
};
