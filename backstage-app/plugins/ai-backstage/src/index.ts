import { createElement } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import TableChartIcon from '@material-ui/icons/TableChart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import MemoryIcon from '@material-ui/icons/Memory';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import AppsIcon from '@material-ui/icons/Apps';
import PaletteIcon from '@material-ui/icons/Palette';
import {
  PageBlueprint,
  createFrontendPlugin,
} from '@backstage/frontend-plugin-api';
import {
  agentsRouteRef,
  communitiesRouteRef,
  docsRouteRef,
  foundationsRouteRef,
  modelsRouteRef,
  platformRouteRef,
  rootRouteRef,
  showcaseRouteRef,
  skillsRouteRef,
} from './routes';

export default createFrontendPlugin({
  pluginId: 'ai-backstage',
  routes: {
    root: rootRouteRef,
    models: modelsRouteRef,
    skills: skillsRouteRef,
    communities: communitiesRouteRef,
    agents: agentsRouteRef,
    foundations: foundationsRouteRef,
    docs: docsRouteRef,
    platform: platformRouteRef,
    showcase: showcaseRouteRef,
  },
  extensions: [
    PageBlueprint.make({
      params: {
        path: '/',
        title: 'AI Backstage',
        icon: createElement(HomeIcon),
        routeRef: rootRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/HomePage').then(m => createElement(m.HomePage)),
      },
    }),
    PageBlueprint.make({
      name: 'models',
      params: {
        path: '/models',
        title: 'AI Models',
        icon: createElement(TableChartIcon),
        routeRef: modelsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/ModelsPage').then(m => createElement(m.ModelsPage)),
      },
    }),
    PageBlueprint.make({
      name: 'skills',
      params: {
        path: '/skills',
        title: 'AI Skills',
        icon: createElement(FlashOnIcon),
        routeRef: skillsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/SkillsPage').then(m => createElement(m.SkillsPage)),
      },
    }),
    PageBlueprint.make({
      name: 'communities',
      params: {
        path: '/communities',
        title: 'AI Communities',
        icon: createElement(GroupWorkIcon),
        routeRef: communitiesRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/CommunitiesPage').then(m =>
            createElement(m.CommunitiesPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'agents',
      params: {
        path: '/agents',
        title: 'AI Agents',
        icon: createElement(MemoryIcon),
        routeRef: agentsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/AgentsPage').then(m => createElement(m.AgentsPage)),
      },
    }),
    PageBlueprint.make({
      name: 'foundations',
      params: {
        path: '/foundations',
        title: 'AI Foundations',
        icon: createElement(AccountTreeIcon),
        routeRef: foundationsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/FoundationsPage').then(m =>
            createElement(m.FoundationsPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'docs',
      params: {
        path: '/docs',
        title: 'AI Docs',
        icon: createElement(DescriptionIcon),
        routeRef: docsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/DocsPage').then(m => createElement(m.DocsPage)),
      },
    }),
    PageBlueprint.make({
      name: 'platform',
      params: {
        path: '/platform',
        title: 'Backstage Platform',
        icon: createElement(AppsIcon),
        routeRef: platformRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/PlatformPage').then(m =>
            createElement(m.PlatformPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'showcase',
      params: {
        path: '/showcase',
        title: 'AI Showcase',
        icon: createElement(PaletteIcon),
        routeRef: showcaseRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/ShowcasePage').then(m =>
            createElement(m.ShowcasePage),
          ),
      },
    }),
  ],
});
