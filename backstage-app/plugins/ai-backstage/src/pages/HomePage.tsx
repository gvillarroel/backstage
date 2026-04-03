import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderHomePage, SnapshotBoundary } from './shared';

export const HomePage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderHomePage}
    </SnapshotBoundary>
  );
};
