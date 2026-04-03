import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderSkillsPage, SnapshotBoundary } from './shared';

export const SkillsPage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderSkillsPage}
    </SnapshotBoundary>
  );
};
