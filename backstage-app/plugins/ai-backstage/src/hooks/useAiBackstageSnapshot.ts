import {
  configApiRef,
  discoveryApiRef,
  fetchApiRef,
  useApi,
} from '@backstage/frontend-plugin-api';
import { useEffect, useState } from 'react';
import type { AiBackstageSnapshot } from '../types';

let snapshotCache: AiBackstageSnapshot | undefined;
let inflightRequest: Promise<AiBackstageSnapshot> | undefined;

export const useAiBackstageSnapshot = () => {
  const configApi = useApi(configApiRef);
  const discoveryApi = useApi(discoveryApiRef);
  const fetchApi = useApi(fetchApiRef);
  const [snapshot, setSnapshot] = useState<AiBackstageSnapshot | undefined>(
    snapshotCache,
  );
  const [error, setError] = useState<Error | undefined>();
  const [loading, setLoading] = useState(!snapshotCache);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (!inflightRequest) {
        inflightRequest = (async () => {
          const appBaseUrl = configApi.getOptionalString('app.baseUrl') ?? window.location.origin;
          const appBasePath = new URL(appBaseUrl).pathname.replace(/\/$/, '');
          const staticSnapshotUrl = `${appBasePath || ''}/ai-backstage-snapshot.json`;

          try {
            const baseUrl = await discoveryApi.getBaseUrl('ai-backstage');
            const response = await fetchApi.fetch(`${baseUrl}/snapshot`);
            if (!response.ok) {
              throw new Error(`AI Backstage data request failed: ${response.status}`);
            }
            return (await response.json()) as AiBackstageSnapshot;
          } catch (apiError) {
            const fallbackResponse = await fetchApi.fetch(staticSnapshotUrl);
            if (!fallbackResponse.ok) {
              throw apiError;
            }
            return (await fallbackResponse.json()) as AiBackstageSnapshot;
          }
        })();
      }

      try {
        const data = await inflightRequest;
        snapshotCache = data;
        if (mounted) {
          setSnapshot(data);
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError as Error);
        }
      } finally {
        inflightRequest = undefined;
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, [configApi, discoveryApi, fetchApi]);

  return { snapshot, error, loading };
};
