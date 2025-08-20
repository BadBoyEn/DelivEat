import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useMemo, createContext, useEffect } from 'react';

import './Dark.css';
import './Light.css';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function AppTheme({ children }) {
  // Inizializza dal localStorage o dal prefers-color-scheme
  const getInitial = () => {
    const saved =
      typeof window !== 'undefined' ? localStorage.getItem('color-mode') : null;
    if (saved === 'light' || saved === 'dark') return saved;

    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  };

  const [mode, setMode] = useState(getInitial);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: (maybeMode) => {
        setMode((prev) => {
          const next =
            typeof maybeMode === 'string'
              ? maybeMode
              : prev === 'light'
              ? 'dark'
              : 'light';

          if (typeof window !== 'undefined') {
            localStorage.setItem('color-mode', next);
          }
          return next;
        });
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#FFFFFF',
          },
          secondary: {
            main: mode === 'dark' ? '#FF6B00' : '#FF6B00',
          },
          background: {
            default: mode === 'dark' ? '#121212' : '#ffffff',
            paper: mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
          },
          text: {
            primary: mode === 'dark' ? '#ffffff' : '#000000',
          },
        },
      }),
    [mode]
  );

  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    document.documentElement.classList.add(`theme-${mode}`);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
