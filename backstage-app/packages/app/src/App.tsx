import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import aiBackstagePlugin from '@internal/plugin-ai-backstage';
import { authModule } from './modules/auth';
import { navModule } from './modules/nav';
import { aiThemeModule } from './modules/ai-theme';
import { techdocsModule } from './modules/techdocs';

export default createApp({
  features: [
    catalogPlugin,
    aiBackstagePlugin,
    authModule,
    navModule,
    aiThemeModule,
    techdocsModule,
  ],
});
