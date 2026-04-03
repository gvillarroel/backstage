import React, { useEffect, useMemo, useState } from 'react';
import {
  Content,
  Header,
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
import Typography from '@material-ui/core/Typography';
import { EquifaxThemeProvider, equifaxDesignTokens } from './theme';
import { useAiBackstageStyles } from './styles';

const toneStyles = {
  approved: { background: '#dbffcc', color: '#294d19' },
  review: { background: '#ffe5cc', color: '#994a00' },
  optimized: { background: '#ffccd5', color: '#6d1222' },
  preview: { background: '#cdf3ff', color: '#004d66' },
  evaluation: { background: '#ffccd5', color: '#6d1222' },
  research: { background: '#ffccd5', color: '#6d1222' },
  monitoring: { background: '#ffe5cc', color: '#994a00' },
  foundation: { background: '#dbffcc', color: '#294d19' },
} as const;

export const AiPage = ({
  eyebrow,
  title,
  description,
  metrics,
  children,
}: {
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  metrics?: Array<{ label: string; value: string; helper: string }>;
  children: React.ReactNode;
}) => {
  const classes = useAiBackstageStyles();

  return (
    <EquifaxThemeProvider>
      <Page themeId="tool">
        <Header title="" subtitle="" type="tool" />
        <Content noPadding>
          <div className={classes.page}>
            <Paper className={classes.hero}>
              <Typography className={classes.eyebrow}>{eyebrow}</Typography>
              <Typography variant="h3">{title}</Typography>
              <Typography className={classes.lede}>{description}</Typography>
              {metrics?.length ? (
                <div className={classes.metricsGrid}>
                  {metrics.map(metric => (
                    <Paper key={metric.label} className={classes.metricCard}>
                      <Typography className={classes.eyebrow}>{metric.label}</Typography>
                      <Typography className={classes.metricValue}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
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
        <Typography variant="h4">{title}</Typography>
        {description ? (
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
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
      border: `1px solid ${equifaxDesignTokens.borderLight}`,
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

export const EmptyState = ({ title, message }: { title: string; message: string }) => (
  <WarningPanel title={title}>{message}</WarningPanel>
);

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
                <TableCell key={`cell-${rowIndex}-${cellIndex}`}>{cell}</TableCell>
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
          <div>
            <Typography component="div" variant="body2" color="textSecondary">
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
  const id = useMemo(
    () => `diagram-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    [title],
  );

  useEffect(() => {
    if (kind !== 'mermaid') {
      return;
    }

    let mounted = true;

    import('mermaid').then(async mermaidModule => {
      const mermaid = mermaidModule.default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: equifaxDesignTokens.brandRed,
          primaryTextColor: '#1c1c1c',
          primaryBorderColor: equifaxDesignTokens.brandRed,
          secondaryColor: '#cdf3ff',
          tertiaryColor: '#f7f7f7',
          lineColor: equifaxDesignTokens.brandBlue,
          fontFamily: equifaxDesignTokens.fontFamily,
        },
      });
      const rendered = await mermaid.render(id, source);
      if (mounted) {
        setSvg(rendered.svg);
      }
    });

    return () => {
      mounted = false;
    };
  }, [id, kind, source]);

  return (
    <Paper className={classes.card}>
      <Typography className={classes.eyebrow}>{kind}</Typography>
      <Typography variant="h6">{title}</Typography>
      <div className={classes.diagramSurface}>
        {kind === 'mermaid' ? (
          svg ? (
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <Progress />
          )
        ) : (
          <Typography variant="body2" color="textSecondary">
            PlantUML support is kept as a component boundary in this first cut.
            The next step is wiring the exact encoding flow from the legacy renderer.
          </Typography>
        )}
      </div>
      <pre className={classes.codeBlock}>{source}</pre>
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
}) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
    <Icon style={{ color: equifaxDesignTokens.brandBlue }} />
    <div>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </div>
  </div>
);
