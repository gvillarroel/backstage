import React from 'react';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import type { Theme } from '@material-ui/core/styles';

export const equifaxDesignTokens = {
  fontFamily: '"Open Sans", Arial, sans-serif',
  brandRed: '#9e1b32',
  brandBlue: '#007298',
  brandGray: '#333e48',
  primaryOrange: '#e77204',
  primaryGreen: '#45842a',
  gray100: '#e7e7e7',
  gray200: '#cfcfcf',
  gray300: '#b5b5b5',
  gray400: '#9c9c9c',
  gray500: '#828282',
  gray600: '#696969',
  gray700: '#4f4f4f',
  gray800: '#363636',
  gray900: '#1c1c1c',
  shadowRed: '#6d1222',
  shadowOrange: '#994a00',
  shadowGreen: '#294d19',
  shadowBlue: '#004d66',
  highlightRed: '#ffccd5',
  highlightOrange: '#ffe5cc',
  highlightGreen: '#dbffcc',
  highlightBlue: '#cdf3ff',
  neutralSurface: '#ffffff',
  neutralSurfaceSoft: '#fafbfb',
  neutralSurfaceMuted: '#f4f5f6',
  neutralSurfaceTint: '#fbfbfb',
  neutralSurfaceElevated: '#f7f8fa',
  neutralSurfaceLayer: '#eef2f4',
  tableHeadSurface: '#f1f3f4',
  borderLight: 'rgba(51, 62, 72, 0.1)',
  borderStrong: 'rgba(51, 62, 72, 0.18)',
  shadow: '0 10px 28px rgba(51, 62, 72, 0.05)',
  shadowSoft: '0 8px 20px rgba(51, 62, 72, 0.05)',
  shadowRaised: '0 10px 24px rgba(51, 62, 72, 0.06)',
  shadowCard: '0 12px 28px rgba(51, 62, 72, 0.07)',
  shadowCardStrong: '0 12px 30px rgba(51, 62, 72, 0.07)',
  shadowHero: '0 18px 40px rgba(51, 62, 72, 0.08)',
  shadowSidebar: '10px 0 24px rgba(51, 62, 72, 0.08)',
  shadowDarkPanel: '0 16px 28px rgba(35, 49, 61, 0.16)',
  overlayWhite12: 'rgba(255, 255, 255, 0.12)',
  overlayWhite72: 'rgba(255, 255, 255, 0.72)',
  overlayWhite82: 'rgba(255, 255, 255, 0.82)',
  pageBlueWash: 'rgba(0, 114, 152, 0.04)',
  pageBlueWashStrong: 'rgba(0, 114, 152, 0.06)',
  pageBlueWashCard: 'rgba(0, 114, 152, 0.045)',
  onDarkPrimary: '#ffffff',
  onDarkSecondary: '#f7f9fb',
  onCodeSurface: '#f7f7f7',
} as const;

export const designTokenMap = [
  ['--font-family-open-sans', 'theme.typography.fontFamily'],
  ['--efx-brand-red', 'theme.palette.primary.main'],
  ['--efx-primary-blue', 'theme.palette.secondary.main'],
  ['--surface', 'theme.palette.background.paper'],
  ['--bg', 'theme.palette.background.default'],
  ['--line', 'component borders'],
  ['--shadow', 'paper elevation override'],
] as const;

const equifaxTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: equifaxDesignTokens.brandRed,
    },
    secondary: {
      main: equifaxDesignTokens.brandBlue,
    },
    background: {
      default: equifaxDesignTokens.neutralSurfaceMuted,
      paper: equifaxDesignTokens.neutralSurface,
    },
    text: {
      primary: equifaxDesignTokens.gray900,
      secondary: equifaxDesignTokens.gray700,
    },
  },
  typography: {
    fontFamily: equifaxDesignTokens.fontFamily,
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.03em',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    MuiPaper: {
      root: {
        boxShadow: equifaxDesignTokens.shadow,
        backgroundImage: 'none',
      },
      rounded: {
        borderRadius: 0,
      },
    },
    MuiChip: {
      root: {
        borderRadius: 0,
      },
    },
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiTableCell: {
      head: {
        backgroundColor: equifaxDesignTokens.tableHeadSurface,
        color: equifaxDesignTokens.brandGray,
        fontSize: '0.8rem',
        fontWeight: 800,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
    },
  },
});

const useThemeBridgeStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    '& .BackstagePage': {
      background: 'transparent',
    },
    '& a': {
      color: equifaxTheme.palette.secondary.main,
    },
    '& a:hover': {
      color: equifaxDesignTokens.shadowBlue,
    },
    '& .MuiCard-root, & .MuiPaper-root': {
      borderColor: 'transparent',
      borderRadius: 0,
    },
    '& *:focus-visible': {
      outline: `2px solid ${theme.palette.secondary.main}`,
      outlineOffset: 2,
    },
  },
}));

export const EquifaxThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const classes = useThemeBridgeStyles();

  return (
    <ThemeProvider theme={equifaxTheme}>
      <CssBaseline />
      <div className={classes.root}>{children}</div>
    </ThemeProvider>
  );
};
