import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useMemo, createContext, useEffect } from 'react';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppTheme({ children }) {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(() => ({
    toggleColorMode: (newMode) => {
      setMode(newMode);
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  useEffect(() => {
    const id = 'theme-style';
    const existing = document.getElementById(id);
    if (existing) {
      existing.remove();
    }

    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `/theme/${mode === 'dark' ? 'Dark.css' : 'Light.css'}`;
    document.head.appendChild(link);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
