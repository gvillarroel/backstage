import path from 'path';
import { loadAiBackstageSnapshot } from './loaders';

describe('loadAiBackstageSnapshot', () => {
  it('loads and normalizes the seeded CSV bridge data', async () => {
    const dataDir = path.resolve(__dirname, '../../../../../data');
    const snapshot = await loadAiBackstageSnapshot(dataDir);

    expect(snapshot.models.length).toBeGreaterThan(0);
    expect(snapshot.repositories.length).toBeGreaterThan(0);
    expect(snapshot.skills.length).toBeGreaterThan(0);
    expect(snapshot.generatedAt).toContain('T');

    const firstModel = snapshot.models[0] as {
      context_window: number;
      uiStatus: string;
    };
    const firstRepository = snapshot.repositories[0] as {
      show_on: string[];
    };
    const firstSkill = snapshot.skills[0] as {
      tags: string[];
      uiStatus: string;
    };

    expect(typeof firstModel.context_window).toBe('number');
    expect(firstModel.uiStatus).toBeTruthy();
    expect(Array.isArray(firstRepository.show_on)).toBe(true);
    expect(Array.isArray(firstSkill.tags)).toBe(true);
    expect(firstSkill.uiStatus).toBe('approved');
  });
});
