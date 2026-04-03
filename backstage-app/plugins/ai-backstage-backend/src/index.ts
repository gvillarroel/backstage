import express from 'express';
import {
  coreServices,
  createBackendPlugin,
  resolvePackagePath,
} from '@backstage/backend-plugin-api';
import { loadAiBackstageSnapshot } from './lib/loaders';

export default createBackendPlugin({
  pluginId: 'ai-backstage',
  register(reg) {
    reg.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        rootConfig: coreServices.rootConfig,
      },
      async init({ httpRouter, logger, rootConfig }) {
        const configuredDataDir = rootConfig.getOptionalString('aiBackstage.dataDir');
        const defaultDataDir = resolvePackagePath(
          '@internal/plugin-ai-backstage-backend',
          '../../../data',
        );
        const dataDir = configuredDataDir ?? defaultDataDir;
        const router = express.Router();

        router.get('/health', (_, response) => {
          response.json({ status: 'ok' });
        });

        router.get('/snapshot', async (_, response, next) => {
          try {
            const snapshot = await loadAiBackstageSnapshot(dataDir);
            response.json(snapshot);
          } catch (error) {
            logger.error(`Failed to load AI Backstage snapshot from ${dataDir}`);
            next(error);
          }
        });

        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
        httpRouter.addAuthPolicy({
          path: '/snapshot',
          allow: 'unauthenticated',
        });
        httpRouter.use(router);
      },
    });
  },
});
