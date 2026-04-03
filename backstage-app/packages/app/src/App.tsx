import { createApp } from '@backstage/frontend-defaults';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import aiBackstagePlugin from '@internal/plugin-ai-backstage';
import { navModule } from './modules/nav';
import { aiThemeModule } from './modules/ai-theme';

export default createApp({
  features: [catalogPlugin, aiBackstagePlugin, navModule, aiThemeModule],
});
