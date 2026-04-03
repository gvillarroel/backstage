import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderModelsPage, SnapshotBoundary } from './shared';

export const ModelsPage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderModelsPage}
    </SnapshotBoundary>
  );
};
