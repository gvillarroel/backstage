import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import TableChartIcon from '@material-ui/icons/TableChart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import MemoryIcon from '@material-ui/icons/Memory';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
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
    showcase: showcaseRouteRef,
  },
  extensions: [
    PageBlueprint.make({
      params: {
        path: '/',
        title: 'AI Backstage',
        icon: React.createElement(HomeIcon),
        routeRef: rootRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/HomePage').then(m =>
            React.createElement(m.HomePage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'models',
      params: {
        path: '/models',
        title: 'AI Models',
        icon: React.createElement(TableChartIcon),
        routeRef: modelsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/ModelsPage').then(m =>
            React.createElement(m.ModelsPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'skills',
      params: {
        path: '/skills',
        title: 'AI Skills',
        icon: React.createElement(FlashOnIcon),
        routeRef: skillsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/SkillsPage').then(m =>
            React.createElement(m.SkillsPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'communities',
      params: {
        path: '/communities',
        title: 'AI Communities',
        icon: React.createElement(GroupWorkIcon),
        routeRef: communitiesRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/CommunitiesPage').then(m =>
            React.createElement(m.CommunitiesPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'agents',
      params: {
        path: '/agents',
        title: 'AI Agents',
        icon: React.createElement(MemoryIcon),
        routeRef: agentsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/AgentsPage').then(m =>
            React.createElement(m.AgentsPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'foundations',
      params: {
        path: '/foundations',
        title: 'AI Foundations',
        icon: React.createElement(AccountTreeIcon),
        routeRef: foundationsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/FoundationsPage').then(m =>
            React.createElement(m.FoundationsPage),
          ),
      },
    }),
    PageBlueprint.make({
      name: 'docs',
      params: {
        path: '/docs',
        title: 'AI Docs',
        icon: React.createElement(DescriptionIcon),
        routeRef: docsRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/DocsPage').then(m => React.createElement(m.DocsPage)),
      },
    }),
    PageBlueprint.make({
      name: 'showcase',
      params: {
        path: '/showcase',
        title: 'AI Showcase',
        icon: React.createElement(PaletteIcon),
        routeRef: showcaseRouteRef,
        noHeader: true,
        loader: () =>
          import('./pages/ShowcasePage').then(m =>
            React.createElement(m.ShowcasePage),
          ),
      },
    }),
  ],
});
