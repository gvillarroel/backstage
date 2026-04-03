import { useAiBackstageSnapshot } from '../hooks/useAiBackstageSnapshot';
import { renderDocsPage, SnapshotBoundary } from './shared';

export const DocsPage = () => {
  const { snapshot, error, loading } = useAiBackstageSnapshot();

  return (
    <SnapshotBoundary loading={loading} error={error} snapshot={snapshot}>
      {renderDocsPage}
    </SnapshotBoundary>
  );
};
