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

  // Toggle robusto: se arriva un evento o un valore non-stringa, fa semplicemente toggle
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

  // Tema MUI (puoi lasciarlo così: i colori visivi della UI li prendi da CSS vars)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'dark' ? '#90caf9' : '#1976d2',
          },
          secondary: {
            main: mode === 'dark' ? '#f48fb1' : '#d81b60',
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

  // Applica la classe all'html per attivare le variabili CSS dei file Dark.css/Light.css
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
