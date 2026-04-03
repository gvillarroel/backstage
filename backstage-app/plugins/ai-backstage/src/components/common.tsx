import React, { useEffect, useMemo, useState } from 'react';
import {
  Content,
  Link,
  Page,
  Progress,
  ResponseErrorPanel,
  WarningPanel,
} from '@backstage/core-components';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { EquifaxThemeProvider, equifaxDesignTokens } from './theme';
import { useAiBackstageStyles } from './styles';
import type { AiBackstageSnapshot } from '../types';

const toneStyles = {
  approved: {
    background: equifaxDesignTokens.highlightGreen,
    color: equifaxDesignTokens.shadowGreen,
  },
  review: {
    background: equifaxDesignTokens.highlightOrange,
    color: equifaxDesignTokens.shadowOrange,
  },
  optimized: {
    background: equifaxDesignTokens.highlightRed,
    color: equifaxDesignTokens.shadowRed,
  },
  preview: {
    background: equifaxDesignTokens.highlightBlue,
    color: equifaxDesignTokens.shadowBlue,
  },
  evaluation: {
    background: equifaxDesignTokens.highlightRed,
    color: equifaxDesignTokens.shadowRed,
  },
  research: {
    background: equifaxDesignTokens.highlightRed,
    color: equifaxDesignTokens.shadowRed,
  },
  monitoring: {
    background: equifaxDesignTokens.highlightOrange,
    color: equifaxDesignTokens.shadowOrange,
  },
  foundation: {
    background: equifaxDesignTokens.highlightGreen,
    color: equifaxDesignTokens.shadowGreen,
  },
} as const;

export const AiPage = ({
  eyebrow,
  title,
  description,
  metrics,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  metrics?: Array<{ label: string; value: string; helper: string }>;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const classes = useAiBackstageStyles();

  return (
    <EquifaxThemeProvider>
      <Page themeId="tool">
        <Content noPadding>
          <div className={classes.page}>
            <Paper className={classes.hero}>
              <div className={classes.heroSplit}>
                <div className={classes.heroContent}>
                  <Typography className={classes.eyebrow}>{eyebrow}</Typography>
                  <Typography className={classes.heroTitle}>{title}</Typography>
                  <Typography className={classes.lede}>
                    {description}
                  </Typography>
                </div>
                {aside}
              </div>
              {metrics?.length ? (
                <div className={classes.metricsGrid}>
                  {metrics.map(metric => (
                    <Paper key={metric.label} className={classes.metricCard}>
                      <Typography className={classes.eyebrow}>
                        {metric.label}
                      </Typography>
                      <Typography className={classes.metricValue}>
                        {metric.value}
                      </Typography>
                      <Typography className={classes.metricHelper}>
                        {metric.helper}
                      </Typography>
                    </Paper>
                  ))}
                </div>
              ) : null}
            </Paper>
            {children}
          </div>
        </Content>
      </Page>
    </EquifaxThemeProvider>
  );
};

export const SectionBlock = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const classes = useAiBackstageStyles();

  return (
    <section className={classes.section}>
      <div className={classes.sectionHeader}>
        <Typography className={classes.eyebrow}>{eyebrow}</Typography>
        <Typography className={classes.sectionTitle}>{title}</Typography>
        {description ? (
          <Typography className={classes.bodyText}>{description}</Typography>
        ) : null}
      </div>
      {children}
    </section>
  );
};

export const StatusBadge = ({
  label,
  tone,
}: {
  label: string;
  tone: keyof typeof toneStyles;
}) => (
  <Chip
    label={label}
    size="small"
    style={{
      ...toneStyles[tone],
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
    }}
  />
);

export const LoadingState = () => <Progress />;

export const ErrorState = ({ error }: { error: Error }) => (
  <ResponseErrorPanel error={error} />
);

export const EmptyState = ({
  title,
  message,
}: {
  title: string;
  message: string;
}) => <WarningPanel title={title}>{message}</WarningPanel>;

export const SimpleTable = ({
  columns,
  rows,
}: {
  columns: string[];
  rows: React.ReactNode[][];
}) => {
  const classes = useAiBackstageStyles();

  return (
    <TableContainer component={Paper} className={classes.tableWrapper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((cells, rowIndex) => (
            <TableRow key={`row-${rowIndex}`} hover>
              {cells.map((cell, cellIndex) => (
                <TableCell key={`cell-${rowIndex}-${cellIndex}`}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const DomainCardGrid = ({
  columns = 3,
  items,
}: {
  columns?: 3 | 4;
  items: Array<{
    key: string;
    title: string;
    eyebrow?: string;
    description: React.ReactNode;
    footer?: React.ReactNode;
  }>;
}) => {
  const classes = useAiBackstageStyles();

  return (
    <div className={columns === 4 ? classes.cardGrid4 : classes.cardGrid3}>
      {items.map(item => (
        <Paper key={item.key} className={classes.card}>
          {item.eyebrow ? (
            <Typography className={classes.eyebrow}>{item.eyebrow}</Typography>
          ) : null}
          <Typography variant="h6">{item.title}</Typography>
          <div className={classes.cardBody}>
            <Typography component="div" className={classes.cardBodyText}>
              {item.description}
            </Typography>
          </div>
          {item.footer}
        </Paper>
      ))}
    </div>
  );
};

export const MetadataRow = ({ children }: { children: React.ReactNode }) => {
  const classes = useAiBackstageStyles();
  return <div className={classes.repoMeta}>{children}</div>;
};

export const TagList = ({ tags }: { tags: string[] }) => {
  const classes = useAiBackstageStyles();
  return (
    <div className={classes.tags}>
      {tags.map(tag => (
        <span key={tag} className={classes.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export const RepoLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => <Link to={href}>{children}</Link>;

export const DiagramCard = ({
  title,
  source,
  kind,
}: {
  title: string;
  source: string;
  kind: 'mermaid' | 'plantuml';
}) => {
  const classes = useAiBackstageStyles();
  const [svg, setSvg] = useState<string>();
  const [error, setError] = useState<string>();
  const id = useMemo(
    () => `diagram-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    [title],
  );

  useEffect(() => {
    let mounted = true;
    setSvg(undefined);
    setError(undefined);

    const renderDiagram = async () => {
      try {
        if (kind === 'mermaid') {
          const mermaidModule = await import('mermaid');
          const mermaid = mermaidModule.default;
          mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            themeVariables: {
              primaryColor: equifaxDesignTokens.brandRed,
              primaryTextColor: equifaxDesignTokens.gray900,
              primaryBorderColor: equifaxDesignTokens.brandRed,
              secondaryColor: equifaxDesignTokens.highlightBlue,
              tertiaryColor: equifaxDesignTokens.neutralSurfaceSoft,
              lineColor: equifaxDesignTokens.brandBlue,
              fontFamily: equifaxDesignTokens.fontFamily,
            },
          });
          const rendered = await mermaid.render(id, source);
          if (mounted) {
            setSvg(rendered.svg);
          }
          return;
        }

        const response = await fetch('https://kroki.io/plantuml/svg', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: source,
        });

        if (!response.ok) {
          throw new Error(`PlantUML render failed: ${response.status}`);
        }

        const plantumlSvg = await response.text();
        if (mounted) {
          setSvg(plantumlSvg);
        }
      } catch (renderError) {
        if (mounted) {
          setError((renderError as Error).message);
        }
      }
    };

    renderDiagram();

    return () => {
      mounted = false;
    };
  }, [id, kind, source]);

  return (
    <Paper className={classes.card}>
      <Typography className={classes.eyebrow}>{kind}</Typography>
      <Typography variant="h6">{title}</Typography>
      <div className={classes.diagramSurface}>
        {svg ? (
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        ) : error ? (
          <Typography className={classes.cardBodyText}>
            {kind === 'plantuml'
              ? 'PlantUML could not be rendered from the remote service.'
              : 'The diagram could not be rendered.'}{' '}
            {error}
          </Typography>
        ) : (
          <Progress />
        )}
      </div>
      <pre className={classes.codeBlock}>{source}</pre>
    </Paper>
  );
};

export const SearchShowcase = ({
  snapshot,
}: {
  snapshot: AiBackstageSnapshot;
}) => {
  const classes = useAiBackstageStyles();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return [];
    }

    const entries = [
      ...snapshot.models.map(model => ({
        type: 'Model',
        title: model.model_name,
        meta: model.provider,
        description: model.notes || model.input_types,
      })),
      ...snapshot.skills.map(skill => ({
        type: 'Skill',
        title: skill.name,
        meta: skill.category,
        description: skill.description,
      })),
      ...snapshot.communities.map(community => ({
        type: 'Community',
        title: community.name,
        meta: community.cadence || community.type,
        description: community.description,
      })),
      ...snapshot.agents.map(agent => ({
        type: 'Agent',
        title: agent.name,
        meta: agent.owner,
        description: agent.description,
      })),
      ...snapshot.repositories.map(repository => ({
        type: 'Repository',
        title: repository.name,
        meta: repository.owner,
        description: repository.description,
      })),
    ];

    return entries
      .filter(entry =>
        [entry.title, entry.meta, entry.description]
          .join(' ')
          .toLowerCase()
          .includes(term),
      )
      .slice(0, 8);
  }, [query, snapshot]);

  return (
    <Paper className={classes.searchSurface}>
      <div>
        <Typography className={classes.eyebrow}>Search Explorer</Typography>
        <Typography className={classes.sectionTitle}>
          Explore content like a documentation portal
        </Typography>
        <Typography className={classes.bodyText}>
          This lightweight search view makes discovery visible directly in the
          product. It complements the native Backstage search experience and
          shows how teams can query models, skills, communities, agents, and
          repositories from one surface.
        </Typography>
      </div>
      <TextField
        className={classes.searchInput}
        variant="outlined"
        label="Search the AI Backstage snapshot"
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="Try: agent, github, policy, docs, prompt, model"
      />
      {query.trim() ? (
        <div className={classes.searchResults}>
          {results.length ? (
            results.map(result => (
              <Paper
                key={`${result.type}-${result.title}`}
                className={classes.searchResultCard}
              >
                <div className={classes.searchResultMeta}>
                  <span>{result.type}</span>
                  <span>{result.meta}</span>
                </div>
                <Typography variant="h6">{result.title}</Typography>
                <Typography className={classes.cardBodyText}>
                  {result.description}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography className={classes.bodyText}>
              No results found for "{query}".
            </Typography>
          )}
        </div>
      ) : (
        <Typography className={classes.bodyText}>
          Start typing to see cross-domain results here, or open the native{' '}
          <RepoLink href="/search">Backstage search page</RepoLink>.
        </Typography>
      )}
    </Paper>
  );
};

export const IconHeadline = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => {
  const classes = useAiBackstageStyles();

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <Icon style={{ color: equifaxDesignTokens.brandBlue }} />
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography className={classes.cardBodyText}>{description}</Typography>
      </div>
    </div>
  );
};
