import React from 'react';
import {
  AppRootElementBlueprint,
  createFrontendModule,
} from '@backstage/frontend-plugin-api';
import './global.css';

export const aiThemeModule = createFrontendModule({
  pluginId: 'app',
  extensions: [
    AppRootElementBlueprint.make({
      name: 'ai-backstage-theme-root',
      params: {
        element: <React.Fragment />,
      },
    }),
  ],
});
