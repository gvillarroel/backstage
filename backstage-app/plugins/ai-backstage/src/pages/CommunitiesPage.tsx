import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderCommunitiesPage, SnapshotBoundary } from './shared';

export const CommunitiesPage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderCommunitiesPage}
    </SnapshotBoundary>
  );
};
