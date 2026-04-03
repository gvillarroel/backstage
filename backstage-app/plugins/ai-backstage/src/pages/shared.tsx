import React from 'react';
import StorageIcon from '@material-ui/icons/Storage';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExtensionIcon from '@material-ui/icons/Extension';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import MemoryIcon from '@material-ui/icons/Memory';
import ApartmentIcon from '@material-ui/icons/Apartment';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import type { AiBackstageSnapshot } from '../types';
import {
  AiPage,
  DiagramCard,
  DomainCardGrid,
  EmptyState,
  ErrorState,
  IconHeadline,
  LoadingState,
  MetadataRow,
  RepoLink,
  SearchShowcase,
  SectionBlock,
  SimpleTable,
  StatusBadge,
  TagList,
} from '../components/common';
import { useAiBackstageStyles } from '../components/styles';
import {
  formatCurrency,
  formatInteger,
  mapLegacyLinkToRoute,
  titleFromSlug,
} from '../utils/format';
import { fdxDesignTokens } from '../components/theme';

export const SnapshotBoundary = ({
  loading,
  error,
  snapshot,
  children,
}: {
  loading: boolean;
  error?: Error;
  snapshot?: AiBackstageSnapshot;
  children: (snapshot: AiBackstageSnapshot) => React.ReactElement;
}) => {
  if (loading) {
    return <LoadingState />;
  }
  if (error) {
    return <ErrorState error={error} />;
  }
  if (!snapshot) {
    return (
      <EmptyState
        title="No data available"
        message="The AI Backstage snapshot is empty."
      />
    );
  }
  return children(snapshot);
};

export const renderHomePage = (snapshot: AiBackstageSnapshot) => {
  const featuredRepos = snapshot.repositories.filter(repository =>
    repository.show_on.includes('index'),
  );

  return (
    <AiPage
      eyebrow="f(dx) AI operating surface"
      title="One place to navigate models, communities, skills, repositories, and AI agents."
      description="This plugin reinterprets the static proof of concept as a Backstage-native internal product surface. The architecture of information, tone, and visual language remain f(dx)-led while the experience now lives inside the real Backstage shell."
      metrics={[
        {
          label: 'Domains',
          value: '9',
          helper:
            'Home, Models, Skills, Communities, Agents, Foundations, Docs, Platform, Showcase',
        },
        {
          label: 'Models',
          value: String(snapshot.models.length),
          helper: 'Curated model inventory with portfolio state',
        },
        {
          label: 'Repositories',
          value: String(snapshot.repositories.length),
          helper: 'Bridge-ready for future catalog migration',
        },
        {
          label: 'Agents',
          value: String(snapshot.agents.length),
          helper: 'Managed assets with owners and channels',
        },
      ]}
    >
      <SectionBlock
        eyebrow="Navigation"
        title="Use Backstage as the shell, and AI Backstage as the product surface."
        description="Each area below maps directly from the original proof of concept, but now sits behind a reusable theme, typed data contracts, and a backend adapter that still reads the current CSVs."
      >
        <DomainCardGrid
          items={[
            {
              key: 'models',
              title: 'Models',
              eyebrow: 'Operational inventory',
              description:
                'Provider, reasoning, tool calling, context, cost posture, and internal portfolio state.',
              footer: (
                <IconHeadline
                  icon={StorageIcon}
                  title="Selection signals"
                  description="Designed for real decision-making, not raw vendor comparison."
                />
              ),
            },
            {
              key: 'skills',
              title: 'Skills',
              eyebrow: 'Reusable assets',
              description:
                'Internal skills are discoverable by category, tags, and reuse value.',
              footer: (
                <IconHeadline
                  icon={ExtensionIcon}
                  title="Outcome-oriented"
                  description="Curated for workflow reuse rather than prompt dumping."
                />
              ),
            },
            {
              key: 'communities',
              title: 'Communities',
              eyebrow: 'Enablement loops',
              description:
                'Find guilds, forums, and office-hours style channels for AI adoption.',
              footer: (
                <IconHeadline
                  icon={GroupWorkIcon}
                  title="Who to ask"
                  description="Cadence and participation format stay visible."
                />
              ),
            },
            {
              key: 'agents',
              title: 'Agents',
              eyebrow: 'Managed products',
              description:
                'Ownership, channel, maturity, and operational status for each agent.',
              footer: (
                <IconHeadline
                  icon={MemoryIcon}
                  title="Operate with clarity"
                  description="Designed to surface who owns what and where it runs."
                />
              ),
            },
            {
              key: 'foundations',
              title: 'Foundations',
              eyebrow: 'Controls and architecture',
              description:
                'Repositories, governance framing, and diagrams for the platform backbone.',
              footer: (
                <IconHeadline
                  icon={AccountTreeIcon}
                  title="Migration-ready"
                  description="Built to converge later with the Software Catalog."
                />
              ),
            },
            {
              key: 'docs',
              title: 'Docs',
              eyebrow: 'Repository knowledge',
              description:
                'Curated documentation hub today, with a clear path toward TechDocs later.',
              footer: (
                <IconHeadline
                  icon={MenuBookIcon}
                  title="Knowledge surface"
                  description="Aggregated docs without losing future native alignment."
                />
              ),
            },
            {
              key: 'platform',
              title: 'Platform',
              eyebrow: 'Backstage capabilities',
              description:
                'Explains what this Backstage environment can do across catalog, search, scaffolding, docs, auth, notifications, and signals.',
              footer: (
                <IconHeadline
                  icon={AppsIcon}
                  title="Platform-level view"
                  description="Clarifies the product surface behind the content pages."
                />
              ),
            },
            {
              key: 'tech-radar',
              title: 'Tech Radar',
              eyebrow: 'Adoption guidance',
              description:
                'Highlights technologies by adoption posture so teams can distinguish what is recommended, trial-stage, under assessment, or on hold.',
              footer: (
                <IconHeadline
                  icon={BubbleChartIcon}
                  title="Decision support"
                  description="Makes technology posture visible before teams commit to tools or patterns."
                />
              ),
            },
          ]}
        />
      </SectionBlock>
      <SectionBlock
        eyebrow="Repositories"
        title="Connected repositories anchoring the migration."
        description="These repository records still come from the original CSV source, but the UI is already ready for later catalog-backed enrichment."
      >
        <DomainCardGrid
          items={featuredRepos.map(repository => ({
            key: repository.name,
            title: repository.name,
            eyebrow: titleFromSlug(repository.type),
            description: repository.description,
            footer: (
              <>
                <MetadataRow>
                  <span>{repository.language || 'Unknown language'}</span>
                  <span>{repository.date || 'No date'}</span>
                </MetadataRow>
                <RepoLink href={repository.github_url}>
                  Open repository
                </RepoLink>
              </>
            ),
          }))}
        />
      </SectionBlock>
    </AiPage>
  );
};

export const renderModelsPage = (snapshot: AiBackstageSnapshot) => (
  <AiPage
    eyebrow="Model inventory"
    title="Track model availability with language business teams can act on."
    description="The original model inventory is now served through a typed API surface. It preserves portfolio state, reasoning and tool-call signals, and explicit source framing while making future migration to internal APIs possible."
    metrics={[
      {
        label: 'Rows shown',
        value: String(snapshot.models.length),
        helper: 'Representative seeded mix across model types',
      },
      {
        label: 'Providers',
        value: String(
          new Set(snapshot.models.map(model => model.provider)).size,
        ),
        helper: 'Curated vendor mix with internal posture',
      },
      {
        label: 'Source',
        value: 'CSV bridge',
        helper: 'Runtime adapter, no static regeneration required',
      },
    ]}
  >
    <SectionBlock
      eyebrow="Inventory"
      title="Operational model matrix"
      description="The portfolio state visual language from the original proof of concept is preserved through shared status semantics rather than page-specific CSS."
    >
      <SimpleTable
        columns={[
          'Provider',
          'Model',
          'Portfolio state',
          'Tool call',
          'Reasoning',
          'Input types',
          'Context window',
          'Cost / 1 M input',
        ]}
        rows={snapshot.models.map(model => [
          model.provider,
          model.model_name,
          <StatusBadge
            key={`${model.model_name}-status`}
            label={model.portfolio_state}
            tone={model.uiStatus}
          />,
          model.tool_call.toLowerCase() === 'yes' ? 'Yes' : 'No',
          model.reasoning.toLowerCase() === 'yes' ? 'Yes' : 'No',
          model.input_types,
          formatInteger(model.context_window),
          formatCurrency(model.input_cost_per_1m),
        ])}
      />
    </SectionBlock>
  </AiPage>
);

export const renderSkillsPage = (snapshot: AiBackstageSnapshot) => (
  <AiPage
    eyebrow="Skill finder"
    title="Make reusable AI skills discoverable by workflow and outcome."
    description="The static finder is now a Backstage-native directory page driven by typed skill contracts. The emphasis stays on reuse value, tags, and category framing rather than prompt dumps."
    metrics={[
      {
        label: 'Skills',
        value: String(snapshot.skills.length),
        helper: 'Internal skills available now',
      },
      {
        label: 'Categories',
        value: String(
          new Set(snapshot.skills.map(skill => skill.category)).size,
        ),
        helper: 'Domain buckets for quick discovery',
      },
      {
        label: 'Status model',
        value: 'Shared',
        helper: 'Uses the same UI state semantics as the other pages',
      },
    ]}
  >
    <SectionBlock eyebrow="Directory" title="Internal skills">
      <DomainCardGrid
        items={snapshot.skills.map(skill => ({
          key: skill.name,
          title: skill.name,
          eyebrow: skill.category,
          description: skill.description,
          footer: (
            <>
              <StatusBadge label={skill.status} tone={skill.uiStatus} />
              <TagList tags={skill.tags} />
            </>
          ),
        }))}
      />
    </SectionBlock>
  </AiPage>
);

export const renderCommunitiesPage = (snapshot: AiBackstageSnapshot) => (
  <AiPage
    eyebrow="Community map"
    title="Help teams find the right enablement loop or governance forum."
    description="Communities remain intentionally lightweight. The point is not to over-model them, but to make contact paths, cadence, and purpose easy to discover from inside the Backstage shell."
    metrics={[
      {
        label: 'Communities',
        value: String(snapshot.communities.length),
        helper: 'Guilds, office hours, and review channels',
      },
      {
        label: 'Format',
        value: 'Curated',
        helper: 'Small, high-signal directory rather than a generic org chart',
      },
    ]}
  >
    <SectionBlock eyebrow="Communities" title="AI communities and loops">
      <DomainCardGrid
        columns={4}
        items={snapshot.communities.map(community => ({
          key: community.name,
          title: community.name,
          eyebrow: titleFromSlug(community.type || 'community'),
          description: community.description,
          footer: (
            <>
              <MetadataRow>
                <span>Cadence: {community.cadence || 'TBD'}</span>
              </MetadataRow>
              {community.link ? (
                <RepoLink href={community.link}>
                  {community.link_label || 'Open channel'}
                </RepoLink>
              ) : null}
            </>
          ),
        }))}
      />
    </SectionBlock>
  </AiPage>
);

export const renderAgentsPage = (snapshot: AiBackstageSnapshot) => {
  const classes = useAiBackstageStyles();
  const statusCounts = snapshot.agents.reduce<Record<string, number>>(
    (acc, agent) => {
      acc[agent.status] = (acc[agent.status] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const ownerCount = new Set(snapshot.agents.map(agent => agent.owner)).size;
  const channelCount = new Set(snapshot.agents.map(agent => agent.channel))
    .size;
  const accentByTone: Record<string, string> = {
    approved: fdxDesignTokens.shadowGreen,
    review: fdxDesignTokens.shadowOrange,
    optimized: fdxDesignTokens.shadowRed,
    preview: fdxDesignTokens.shadowBlue,
    evaluation: fdxDesignTokens.shadowRed,
    research: fdxDesignTokens.shadowRed,
    monitoring: fdxDesignTokens.shadowOrange,
    foundation: fdxDesignTokens.shadowGreen,
  };
  const topStatuses = Object.entries(statusCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <AiPage
      eyebrow="Agent directory"
      title="List AI agents as managed assets, not one-off experiments."
      description="The page now reads like an operating surface, not a spreadsheet transplant. Ownership, production posture, and delivery channel stay visible at scan speed while the layout carries the f(dx) brand system more cleanly."
      aside={
        <Paper className={classes.heroPanel}>
          <Typography className={classes.heroPanelLabel}>
            Operating coverage
          </Typography>
          <Typography className={classes.heroPanelValue}>
            {snapshot.agents.length} live entries
          </Typography>
          <div className={classes.heroPanelList}>
            <div className={classes.heroPanelItem}>
              <span>Owning teams</span>
              <strong>{ownerCount}</strong>
            </div>
            <div className={classes.heroPanelItem}>
              <span>Delivery channels</span>
              <strong>{channelCount}</strong>
            </div>
            <div className={classes.heroPanelItem}>
              <span>Most common posture</span>
              <strong>{topStatuses[0]?.[0] ?? 'TBD'}</strong>
            </div>
          </div>
        </Paper>
      }
      metrics={[
        {
          label: 'Agents',
          value: String(snapshot.agents.length),
          helper: 'Tracked as product-like assets',
        },
        {
          label: 'Statuses',
          value: String(Object.keys(statusCounts).length),
          helper: 'Lifecycle posture remains explicit',
        },
        {
          label: 'Owners',
          value: String(ownerCount),
          helper: 'Distinct teams carrying accountability',
        },
        {
          label: 'Channels',
          value: String(channelCount),
          helper: 'Execution surfaces used in practice',
        },
      ]}
    >
      <SectionBlock
        eyebrow="Signals"
        title="Where the current portfolio is concentrated"
        description="The strongest statuses are surfaced separately so the page communicates posture before the user reads every card."
      >
        <div className={classes.statusOverviewGrid}>
          {topStatuses.map(([status, count], index) => (
            <Paper
              key={status}
              className={classes.statusOverviewCard}
              style={{
                boxShadow: `${fdxDesignTokens.shadowCard}, inset 0 3px 0 ${
                  accentByTone[
                    snapshot.agents.find(agent => agent.status === status)
                      ?.uiStatus ?? 'preview'
                  ] ?? accentByTone.preview
                }`,
              }}
            >
              <Typography className={classes.eyebrow}>
                {index === 0
                  ? 'Primary posture'
                  : index === 1
                  ? 'Secondary posture'
                  : 'Emerging posture'}
              </Typography>
              <Typography className={classes.statusOverviewValue}>
                {count}
              </Typography>
              <StatusBadge
                label={status}
                tone={
                  snapshot.agents.find(agent => agent.status === status)
                    ?.uiStatus ?? 'preview'
                }
              />
            </Paper>
          ))}
        </div>
      </SectionBlock>
      <SectionBlock
        eyebrow="Directory"
        title="Managed agent assets"
        description="Each card now carries the ownership line, the operating status, and the channel as distinct signals so the page scans cleanly even inside the denser Backstage shell."
      >
        <div className={classes.agentGrid}>
          {snapshot.agents.map(agent => (
            <Paper
              key={agent.name}
              className={classes.agentCard}
              style={{
                background: fdxDesignTokens.neutralSurface,
                boxShadow: `${fdxDesignTokens.shadowCardStrong}, inset 3px 0 0 ${
                  accentByTone[agent.uiStatus] ?? accentByTone.preview
                }`,
              }}
            >
              <div className={classes.agentCardHeader}>
                <div>
                  <Typography className={classes.agentOwner}>
                    {agent.owner}
                  </Typography>
                  <Typography className={classes.agentName}>
                    {agent.name}
                  </Typography>
                </div>
                <StatusBadge label={agent.status} tone={agent.uiStatus} />
              </div>
              <Typography className={classes.agentDescription}>
                {agent.description}
              </Typography>
              <div className={classes.agentFooter}>
                <div className={classes.agentMetaRow}>
                  <span className={classes.agentMetaPill}>
                    <ApartmentIcon fontSize="small" />
                    {agent.owner}
                  </span>
                  <span className={classes.agentMetaPill}>
                    <SettingsEthernetIcon fontSize="small" />
                    {agent.channel}
                  </span>
                </div>
                <div className={classes.agentMetaRow}>
                  <span className={classes.agentMetaPill}>
                    <BubbleChartIcon fontSize="small" />
                    Lifecycle: {agent.status}
                  </span>
                </div>
              </div>
            </Paper>
          ))}
        </div>
      </SectionBlock>
    </AiPage>
  );
};

export const renderFoundationsPage = (snapshot: AiBackstageSnapshot) => {
  const repos = snapshot.repositories.filter(repository =>
    repository.show_on.includes('foundations'),
  );

  return (
    <AiPage
      eyebrow="Foundations"
      title="Connect the AI surface to repositories, controls, and architecture."
      description="This page is where the migration meets native Backstage direction. Repositories remain bridge-backed from CSV today, while the UI shape is intentionally compatible with future catalog enrichment and TechDocs linking."
      metrics={[
        {
          label: 'Foundation repos',
          value: String(repos.length),
          helper: 'Candidates for catalog migration first',
        },
        {
          label: 'Capabilities',
          value: String(
            snapshot.capabilities.filter(cap =>
              cap.show_on.includes('foundations'),
            ).length,
          ),
          helper: 'Controls and platform capabilities',
        },
      ]}
    >
      <SectionBlock
        eyebrow="Repository map"
        title="Repositories that anchor the platform"
        description="This is the first domain intentionally shaped to converge on the Backstage Software Catalog."
      >
        <DomainCardGrid
          items={repos.map(repository => ({
            key: repository.name,
            title: repository.name,
            eyebrow: titleFromSlug(repository.type),
            description: repository.description,
            footer: (
              <>
                <MetadataRow>
                  <span>{repository.owner}</span>
                  <span>{repository.language}</span>
                  <span>{repository.date}</span>
                </MetadataRow>
                <RepoLink href={repository.github_url}>
                  Open repository
                </RepoLink>
              </>
            ),
          }))}
        />
      </SectionBlock>
      <SectionBlock
        eyebrow="Governance"
        title="Capabilities and controls"
        description="The original static options grid becomes a reusable metadata surface that can later absorb catalog relations, policy data, or ownership APIs."
      >
        <DomainCardGrid
          items={snapshot.capabilities
            .filter(capability => capability.show_on.includes('foundations'))
            .map(capability => ({
              key: capability.name,
              title: capability.name,
              description: capability.description,
              footer: capability.link ? (
                <RepoLink href={mapLegacyLinkToRoute(capability.link)}>
                  Open linked page
                </RepoLink>
              ) : undefined,
            }))}
        />
      </SectionBlock>
      <SectionBlock
        eyebrow="Architecture"
        title="Diagram support remains first-class"
        description="Mermaid stays client-side, while PlantUML remains encapsulated behind a reusable React component boundary."
      >
        <DomainCardGrid
          items={[
            {
              key: 'diagram-mermaid',
              title: 'Mermaid flow',
              description: (
                <DiagramCard
                  title="AI operating flow"
                  kind="mermaid"
                  source={`flowchart LR
  data[CSV bridge data] --> backend[Backstage backend plugin]
  backend --> frontend[AI Backstage frontend plugin]
  frontend --> shell[Backstage shell]
  shell --> users[f(dx) teams]`}
                />
              ),
            },
            {
              key: 'diagram-plantuml',
              title: 'PlantUML contract',
              description:
                'The renderer boundary is present. The next iteration can swap in the exact encoding routine from the legacy implementation without changing page structure.',
            },
          ]}
        />
      </SectionBlock>
    </AiPage>
  );
};

export const renderDocsPage = (snapshot: AiBackstageSnapshot) => (
  <AiPage
    eyebrow="Documentation hub"
    title="Keep repository knowledge curated now, while preparing for TechDocs later."
    description="The legacy docs hub aggregated repository documentation outside Backstage. This page preserves the product need while making the next migration step explicit: move repository-backed docs toward TechDocs when entity coverage is ready."
    metrics={[
      {
        label: 'Repositories',
        value: String(snapshot.repositories.length),
        helper: 'Sources visible in the documentation hub',
      },
      {
        label: 'Current mode',
        value: 'Curated',
        helper: 'TechDocs-aligned, but not blocked on full catalog adoption',
      },
    ]}
  >
    <SectionBlock
      eyebrow="Repositories"
      title="Documentation sources"
      description="Today this acts as an aggregated knowledge surface. The migration path is to replace direct GitHub links with TechDocs entity links once repository metadata is ready."
    >
      <Paper
        style={{
          marginBottom: 24,
          padding: 20,
          border: `1px solid ${fdxDesignTokens.borderLight}`,
          background: fdxDesignTokens.neutralSurface,
          boxShadow: fdxDesignTokens.shadowCard,
        }}
      >
        <Typography variant="subtitle2" style={{ marginBottom: 8 }}>
          Route model
        </Typography>
        <Typography variant="body2">
          <strong>/docs</strong> now serves the curated AI Backstage docs hub.
          Native TechDocs is still available separately at <strong>/techdocs</strong>.
        </Typography>
      </Paper>
      <SimpleTable
        columns={['Name', 'Owner', 'Language', 'Description', 'Docs path']}
        rows={snapshot.repositories.map(repository => [
          <RepoLink
            key={`${repository.name}-repo`}
            href={repository.github_url}
          >
            {repository.name}
          </RepoLink>,
          repository.owner,
          repository.language || '—',
          repository.description,
          'GitHub README today, TechDocs next',
        ])}
      />
    </SectionBlock>
  </AiPage>
);

export const renderPlatformPage = (snapshot: AiBackstageSnapshot) => (
  <AiPage
    eyebrow="Platform overview"
    title="Show what this Backstage platform can actually do."
    description="This page exists to make the shell visible as a platform, not just a frame around the AI directory. It explains the installed capabilities, the major plugins in play, and the operating workflows teams can expect from this deployment."
    metrics={[
      {
        label: 'Frontend plugins',
        value: '12+',
        helper:
          'Catalog, Scaffolder, Search, TechDocs, Notifications, Signals, and more',
      },
      {
        label: 'Backend services',
        value: '10+',
        helper:
          'Auth, permissions, catalog, search, proxy, Kubernetes, and docs services',
      },
      {
        label: 'AI pages',
        value: String(
          snapshot.agents.length + snapshot.models.length > 0 ? 9 : 8,
        ),
        helper:
          'Custom AI Backstage product pages now living inside the platform shell',
      },
      {
        label: 'Direction',
        value: 'Platform',
        helper:
          'Directory content plus native Backstage workflows in one place',
      },
    ]}
  >
    <SectionBlock
      eyebrow="Core workflows"
      title="What teams can do in this platform"
      description="These are the highest-value platform motions visible from the installed plugin set and current app configuration."
    >
      <DomainCardGrid
        items={[
          {
            key: 'catalog',
            title: 'Catalog and ownership',
            eyebrow: 'Software Catalog',
            description:
              'Track components, APIs, systems, ownership, and relationships so teams navigate software as a map rather than a file tree.',
            footer: (
              <IconHeadline
                icon={StorageIcon}
                title="Entity graph"
                description="Catalog, org, and graph plugins support ownership and dependency views."
              />
            ),
          },
          {
            key: 'search',
            title: 'Search across the platform',
            eyebrow: 'Discovery',
            description:
              'Search spans catalog records and documentation so teams can find systems, docs, and metadata from one place.',
            footer: (
              <IconHeadline
                icon={SearchIcon}
                title="Unified lookup"
                description="Backed by the search frontend and backend modules plus TechDocs indexing."
              />
            ),
          },
          {
            key: 'scaffolder',
            title: 'Create software and templates',
            eyebrow: 'Golden paths',
            description:
              'Scaffolder lets teams create services, repos, and templates using guided workflows instead of copying one-off setup steps.',
            footer: (
              <IconHeadline
                icon={CreateNewFolderIcon}
                title="Template workflows"
                description="Includes scaffolder frontend and backend modules with GitHub support."
              />
            ),
          },
          {
            key: 'docs',
            title: 'Publish and read documentation',
            eyebrow: 'TechDocs',
            description:
              'Documentation can live close to the code and surface in a consistent reader experience inside the same portal.',
            footer: (
              <IconHeadline
                icon={MenuBookIcon}
                title="Docs in flow"
                description="TechDocs frontend and backend are installed in the app stack."
              />
            ),
          },
          {
            key: 'auth',
            title: 'Handle access and identity',
            eyebrow: 'Authentication',
            description:
              'The app already includes guest auth and the backend auth service, which is the base for stronger provider-driven access models.',
            footer: (
              <IconHeadline
                icon={LockOpenIcon}
                title="Identity foundation"
                description="Auth and permission services are in the backend composition."
              />
            ),
          },
          {
            key: 'operations',
            title: 'Operate beyond the directory',
            eyebrow: 'Platform operations',
            description:
              'Notifications, signals, Kubernetes, and visualizer support move the portal toward an operational workspace, not just a static hub.',
            footer: (
              <IconHeadline
                icon={CloudQueueIcon}
                title="Operational plugins"
                description="Signals, notifications, Kubernetes, and app visualizer are installed."
              />
            ),
          },
        ]}
      />
    </SectionBlock>
    <SectionBlock
      eyebrow="Installed plugins"
      title="Major capabilities visible from this deployment"
      description="This is the practical plugin inventory a stakeholder can understand without reading package manifests."
    >
      <SimpleTable
        columns={['Area', 'Plugin(s)', 'What it enables']}
        rows={[
          [
            'Core software map',
            'Catalog, Catalog Graph, Org',
            'Browse entities, ownership, relationships, and system context',
          ],
          [
            'Creation workflows',
            'Scaffolder, Catalog Import',
            'Create new software or bring existing repos into the platform',
          ],
          [
            'Documentation',
            'TechDocs, TechDocs addons',
            'Render and search technical documentation inside Backstage',
          ],
          [
            'Discovery',
            'Search',
            'Search across catalog and documentation surfaces',
          ],
          [
            'Operations',
            'Notifications, Signals, Kubernetes',
            'Expose runtime and operational signals in the same portal',
          ],
          [
            'Developer utilities',
            'App Visualizer, API Docs, User Settings',
            'Inspect app composition, APIs, and user-level configuration',
          ],
          [
            'Custom product surface',
            'AI Backstage frontend + backend',
            'The AI directory, docs hub, and platform pages you are reviewing now',
          ],
        ]}
      />
    </SectionBlock>
    <SectionBlock
      eyebrow="Docs and Discovery"
      title="Serious documentation needs diagrams and search"
      description="This section makes those capabilities explicit with two diagram formats and a working search experience, so the platform reads more like a real documentation environment."
    >
      <DomainCardGrid
        items={[
          {
            key: 'platform-mermaid',
            title: 'Mermaid architecture',
            description: (
              <DiagramCard
                title="Backstage platform flow"
                kind="mermaid"
                source={`flowchart LR
  users[Engineering teams] --> shell[Backstage shell]
  shell --> catalog[Catalog and ownership]
  shell --> docs[TechDocs and knowledge]
  shell --> scaffolder[Templates and golden paths]
  shell --> ai[AI Backstage product surface]
  ai --> snapshot[Snapshot data bridge]
  snapshot --> backend[Backstage backend services]`}
              />
            ),
          },
          {
            key: 'platform-plantuml',
            title: 'PlantUML deployment',
            description: (
              <DiagramCard
                title="Backstage deployment view"
                kind="plantuml"
                source={`@startuml
skinparam shadowing false
skinparam packageStyle rectangle
actor "Engineering Team" as User
rectangle "Backstage Frontend" {
  component "Catalog"
  component "Search"
  component "TechDocs"
  component "Scaffolder"
  component "AI Backstage"
}
rectangle "Backstage Backend" {
  component "Auth"
  component "Permissions"
  component "Search Backend"
  component "TechDocs Backend"
  component "AI Snapshot API"
}
database "Catalog Data"
database "AI Snapshot Data"
User --> "Backstage Frontend"
"AI Backstage" --> "AI Snapshot API"
"Catalog" --> "Catalog Data"
"Search" --> "Search Backend"
"TechDocs" --> "TechDocs Backend"
"AI Snapshot API" --> "AI Snapshot Data"
@enduml`}
              />
            ),
          },
          {
            key: 'native-search',
            title: 'Native search entry point',
            description:
              'The platform also keeps the native Backstage search route available when teams want the full search experience outside the embedded showcase.',
            footer: <RepoLink href="/search">Open Backstage search</RepoLink>,
          },
        ]}
      />
      <SearchShowcase snapshot={snapshot} />
    </SectionBlock>
    <SectionBlock
      eyebrow="Why It Matters"
      title="Why this platform page belongs here"
      description="The AI directory is more useful when people can see that it is not isolated content. It sits inside a broader platform capable of ownership mapping, docs, search, template creation, auth, and operational workflows."
    >
      <DomainCardGrid
        items={[
          {
            key: 'stakeholder',
            title: 'For stakeholders',
            description:
              'Makes it obvious that Backstage is the operating platform and the AI pages are one product surface within it.',
            footer: (
              <IconHeadline
                icon={AppsIcon}
                title="Platform framing"
                description="Prevents the portal from reading like a disconnected microsite."
              />
            ),
          },
          {
            key: 'engineering',
            title: 'For engineering teams',
            description:
              'Connects the AI directory to native Backstage workflows teams already understand: catalog, docs, templates, and search.',
            footer: (
              <IconHeadline
                icon={CreateNewFolderIcon}
                title="Workflow bridge"
                description="Reduces the gap between content curation and platform adoption."
              />
            ),
          },
          {
            key: 'operations',
            title: 'For platform operators',
            description:
              'Creates a clearer narrative for why notifications, signals, permissions, and backend services matter to the user experience.',
            footer: (
              <IconHeadline
                icon={NotificationsActiveIcon}
                title="Operational story"
                description="Helps explain the backend composition without forcing people into package.json."
              />
            ),
          },
        ]}
      />
    </SectionBlock>
  </AiPage>
);

export const renderShowcasePage = (snapshot: AiBackstageSnapshot) => {
  const classes = useAiBackstageStyles();

  return (
    <AiPage
      eyebrow="Design showcase"
      title="Use the showcase as the migration contract for visual parity."
      description="This page replaces the static component gallery and makes the translated f(dx) theme inspectable inside Backstage. It also records the explicit design token mapping used during the rewrite."
      metrics={[
        {
          label: 'Token mappings',
          value: '7',
          helper:
            'Core mappings from legacy CSS variables into MUI/theme semantics',
        },
        {
          label: 'Parity goal',
          value: 'Intentional',
          helper: 'Preserve tone and hierarchy, not pixel-perfect HTML cloning',
        },
      ]}
    >
      <SectionBlock
        eyebrow="Theme bridge"
        title="Design token map"
        description="This makes the migration explicit: legacy CSS tokens were translated into a nested MUI theme and reusable page primitives."
      >
        <SimpleTable
          columns={['Legacy token', 'Backstage/MUI target']}
          rows={[
            ['--font-family-open-sans', 'theme.typography.fontFamily'],
            ['--fdx-brand-red', 'theme.palette.primary.main'],
            ['--fdx-primary-blue', 'theme.palette.secondary.main'],
            ['--surface', 'theme.palette.background.paper'],
            ['--bg', 'theme.palette.background.default'],
            ['--line', 'Paper and table borders'],
            ['--shadow', 'Paper box-shadow override'],
          ]}
        />
      </SectionBlock>
      <SectionBlock eyebrow="States" title="Shared status semantics">
        <div className={classes.tags}>
          <StatusBadge label="Approved for build" tone="approved" />
          <StatusBadge label="Review board" tone="review" />
          <StatusBadge label="Cost-optimized" tone="optimized" />
          <StatusBadge label="Preview only" tone="preview" />
          <StatusBadge label="Open evaluation" tone="evaluation" />
          <StatusBadge label="Research track" tone="research" />
          <StatusBadge label="Monitoring" tone="monitoring" />
          <StatusBadge label="Foundation" tone="foundation" />
        </div>
      </SectionBlock>
      <SectionBlock
        eyebrow="Reference data"
        title="Live seed counts from the backend bridge"
        description="This page intentionally proves the showcase is not decorative; it is connected to the same typed snapshot used by the rest of the product."
      >
        <DomainCardGrid
          columns={4}
          items={[
            {
              key: 'models',
              title: 'Models',
              description: `Loaded: ${snapshot.models.length} model records`,
            },
            {
              key: 'skills',
              title: 'Skills',
              description: `Loaded: ${snapshot.skills.length} skill records`,
            },
            {
              key: 'communities',
              title: 'Communities',
              description: `Loaded: ${snapshot.communities.length} community records`,
            },
            {
              key: 'agents',
              title: 'Agents',
              description: `Loaded: ${snapshot.agents.length} agent records`,
            },
          ]}
        />
      </SectionBlock>
    </AiPage>
  );
};
