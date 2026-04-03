import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderPlatformPage, SnapshotBoundary } from './shared';

export const PlatformPage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderPlatformPage}
    </SnapshotBoundary>
  );
};
