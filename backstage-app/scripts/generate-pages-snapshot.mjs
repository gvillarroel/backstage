import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'csv-parse/sync';

const repoRoot = path.resolve(process.cwd(), '..');
const dataDir = path.join(repoRoot, 'data');
const outputPath = path.join(process.cwd(), 'packages', 'app', 'public', 'ai-backstage-snapshot.json');

const statusMap = {
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

const splitList = value =>
  String(value ?? '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);

const readCsv = async fileName => {
  const raw = await fs.readFile(path.join(dataDir, fileName), 'utf8');
  return parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
};

const toNumberOrNull = value => {
  const stringValue = String(value ?? '').trim();
  return stringValue ? Number(stringValue) : null;
};

const resolveUiStatus = value => statusMap[String(value ?? '')] ?? 'evaluation';

const [models, repositories, skills, communities, agents, capabilities] = await Promise.all([
  readCsv('models.csv'),
  readCsv('repositories.csv'),
  readCsv('skills.csv'),
  readCsv('communities.csv'),
  readCsv('agents.csv'),
  readCsv('capabilities.csv'),
]);

const snapshot = {
  models: models.map(model => ({
    ...model,
    context_window: Number(model.context_window ?? 0),
    input_cost_per_1m: toNumberOrNull(model.input_cost_per_1m),
    output_cost_per_1m: toNumberOrNull(model.output_cost_per_1m),
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

await fs.writeFile(outputPath, JSON.stringify(snapshot, null, 2));
console.log(`Generated ${outputPath}`);
