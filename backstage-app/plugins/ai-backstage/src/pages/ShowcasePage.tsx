import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderShowcasePage, SnapshotBoundary } from './shared';

export const ShowcasePage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderShowcasePage}
    </SnapshotBoundary>
  );
};
