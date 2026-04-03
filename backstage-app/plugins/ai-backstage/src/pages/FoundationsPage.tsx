import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderFoundationsPage, SnapshotBoundary } from './shared';

export const FoundationsPage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderFoundationsPage}
    </SnapshotBoundary>
  );
};
