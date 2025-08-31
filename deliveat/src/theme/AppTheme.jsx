import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo, createContext, useEffect } from 'react';

import './Dark.css';
import './Light.css';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function AppTheme({ children }) {
  const getInitial = () => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('color-mode');
    if (saved === 'light' || saved === 'dark') return saved;
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  const [mode, setMode] = useState(getInitial);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prev => {
          const next = prev === 'light' ? 'dark' : 'light';
          if (typeof window !== 'undefined') localStorage.setItem('color-mode', next);
          return next;
        });
      },
    }),
    []
  );

  useEffect(() => {
    const root = document.documentElement; // <html>
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(`theme-${mode}`);
    root.style.colorScheme = mode; // 'light' | 'dark' 
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primaryHome: {
            main: 'var(--appbar-bg)',
            contrastText: 'var(--appbar-fg)',
          },
          footer: {
            main: 'var(--footer-bg)',
            contrastText: 'var(--footer-fg)',
          },
        },
        shape: { borderRadius: 12 },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
