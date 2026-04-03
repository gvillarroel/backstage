import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderAgentsPage, SnapshotBoundary } from './shared';

export const AgentsPage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderAgentsPage}
    </SnapshotBoundary>
  );
};
