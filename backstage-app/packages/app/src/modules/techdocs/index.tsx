import { createFrontendModule, PageBlueprint } from '@backstage/frontend-plugin-api';
import {
  TechDocsIndexPage,
  TechDocsReaderPage,
  techdocsPlugin,
} from '@backstage/plugin-techdocs';

export const techdocsModule = createFrontendModule({
  pluginId: 'techdocs',
  extensions: [
    PageBlueprint.make({
      params: {
        path: '/techdocs',
        title: 'TechDocs',
        routeRef: techdocsPlugin.routes.root,
        loader: async () => <TechDocsIndexPage />,
      },
    }),
    PageBlueprint.make({
      name: 'reader',
      params: {
        path: '/techdocs/:namespace/:kind/:name',
        routeRef: techdocsPlugin.routes.docRoot,
        loader: async () => <TechDocsReaderPage />,
      },
    }),
  ],
});
