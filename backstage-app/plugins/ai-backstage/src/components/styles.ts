import { makeStyles } from '@material-ui/core/styles';

export const useAiBackstageStyles = makeStyles(theme => ({
  page: {
    padding: theme.spacing(4, 4, 6),
    display: 'grid',
    gap: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3, 2, 5),
    },
  },
  hero: {
    display: 'grid',
    gap: theme.spacing(2),
    padding: theme.spacing(4),
    background:
      'linear-gradient(160deg, rgba(158, 27, 50, 0.08), rgba(0, 114, 152, 0.04)), #ffffff',
  },
  eyebrow: {
    fontSize: '0.74rem',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: theme.palette.text.secondary,
  },
  lede: {
    maxWidth: 860,
    color: theme.palette.text.secondary,
    fontSize: '1.04rem',
    lineHeight: 1.7,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  metricCard: {
    padding: theme.spacing(2.5),
    display: 'grid',
    gap: theme.spacing(0.75),
  },
  metricValue: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#1c1c1c',
  },
  section: {
    display: 'grid',
    gap: theme.spacing(2),
  },
  sectionHeader: {
    display: 'grid',
    gap: theme.spacing(1),
    maxWidth: 860,
  },
  cardGrid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  cardGrid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  card: {
    padding: theme.spacing(3),
    display: 'grid',
    gap: theme.spacing(1.25),
    minHeight: 210,
    borderTop: '2px solid #007298',
  },
  repoMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '0.88rem',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  tag: {
    padding: theme.spacing(0.5, 1),
    backgroundColor: '#f3f3f3',
    border: '1px solid rgba(51, 62, 72, 0.12)',
    borderRadius: 3,
    fontSize: '0.78rem',
    fontWeight: 700,
    color: theme.palette.text.secondary,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  codeBlock: {
    margin: 0,
    padding: theme.spacing(2),
    borderRadius: 4,
    backgroundColor: '#1c1c1c',
    color: '#f7f7f7',
    overflowX: 'auto',
    fontSize: '0.85rem',
    lineHeight: 1.6,
  },
  diagramSurface: {
    padding: theme.spacing(2),
    border: '1px solid rgba(51, 62, 72, 0.12)',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    minHeight: 180,
    overflowX: 'auto',
  },
}));
