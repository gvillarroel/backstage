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
  neutralSurface: '#ffffff',
  neutralSurfaceMuted: '#f7f7f7',
  borderLight: 'rgba(51, 62, 72, 0.12)',
  borderStrong: 'rgba(51, 62, 72, 0.2)',
  shadow: '0 18px 44px rgba(51, 62, 72, 0.08)',
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
      primary: '#1c1c1c',
      secondary: '#4f4f4f',
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
    borderRadius: 4,
  },
  overrides: {
    MuiPaper: {
      root: {
        border: `1px solid ${equifaxDesignTokens.borderLight}`,
        boxShadow: equifaxDesignTokens.shadow,
      },
      rounded: {
        borderRadius: 4,
      },
    },
    MuiTableCell: {
      head: {
        backgroundColor: '#e7e7e7',
        color: '#1c1c1c',
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
      color: '#004d66',
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
