import React from 'react';
import StorageIcon from '@material-ui/icons/Storage';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ExtensionIcon from '@material-ui/icons/Extension';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import MemoryIcon from '@material-ui/icons/Memory';
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
    return <EmptyState title="No data available" message="The AI Backstage snapshot is empty." />;
  }
  return children(snapshot);
};

export const renderHomePage = (snapshot: AiBackstageSnapshot) => {
  const featuredRepos = snapshot.repositories.filter(repository =>
    repository.show_on.includes('index'),
  );

  return (
    <AiPage
      eyebrow="Equifax AI operating surface"
      title="One place to navigate models, communities, skills, repositories, and AI agents."
      description="This plugin reinterprets the static proof of concept as a Backstage-native internal product surface. The architecture of information, tone, and visual language remain Equifax-led while the experience now lives inside the real Backstage shell."
      metrics={[
        {
          label: 'Domains',
          value: '8',
          helper: 'Home, Models, Skills, Communities, Agents, Foundations, Docs, Showcase',
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
                <RepoLink href={repository.github_url}>Open repository</RepoLink>
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
        value: String(new Set(snapshot.models.map(model => model.provider)).size),
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
        value: String(new Set(snapshot.skills.map(skill => skill.category)).size),
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

export const renderAgentsPage = (snapshot: AiBackstageSnapshot) => (
  <AiPage
    eyebrow="Agent directory"
    title="List AI agents as managed assets, not one-off experiments."
    description="Ownership, channel, status, and purpose stay central. This page mirrors the original intent closely, but now exists in the same internal portal where related platforms and repos can later be connected natively."
    metrics={[
      {
        label: 'Agents',
        value: String(snapshot.agents.length),
        helper: 'Tracked as product-like assets',
      },
      {
        label: 'Statuses',
        value: String(new Set(snapshot.agents.map(agent => agent.status)).size),
        helper: 'Lifecycle posture remains explicit',
      },
    ]}
  >
    <SectionBlock eyebrow="Directory" title="Managed agent assets">
      <DomainCardGrid
        items={snapshot.agents.map(agent => ({
          key: agent.name,
          title: agent.name,
          eyebrow: agent.owner,
          description: agent.description,
          footer: (
            <>
              <StatusBadge label={agent.status} tone={agent.uiStatus} />
              <MetadataRow>
                <span>Channel: {agent.channel}</span>
              </MetadataRow>
            </>
          ),
        }))}
      />
    </SectionBlock>
  </AiPage>
);

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
            snapshot.capabilities.filter(cap => cap.show_on.includes('foundations'))
              .length,
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
                <RepoLink href={repository.github_url}>Open repository</RepoLink>
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
  shell --> users[Equifax teams]`}
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
      <SimpleTable
        columns={['Name', 'Owner', 'Language', 'Description', 'Docs path']}
        rows={snapshot.repositories.map(repository => [
          <RepoLink key={`${repository.name}-repo`} href={repository.github_url}>
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

export const renderShowcasePage = (snapshot: AiBackstageSnapshot) => {
  const classes = useAiBackstageStyles();

  return (
    <AiPage
      eyebrow="Design showcase"
      title="Use the showcase as the migration contract for visual parity."
      description="This page replaces the static component gallery and makes the translated Equifax theme inspectable inside Backstage. It also records the explicit design token mapping used during the rewrite."
      metrics={[
        {
          label: 'Token mappings',
          value: '7',
          helper: 'Core mappings from legacy CSS variables into MUI/theme semantics',
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
            ['--efx-brand-red', 'theme.palette.primary.main'],
            ['--efx-primary-blue', 'theme.palette.secondary.main'],
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
