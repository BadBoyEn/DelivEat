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
          secondary: {
            main: '#FF6B00',
            contrastText: mode === 'dark' ? 'rgba(13, 16, 18, 0.92)' : '#fff',
          },
        },
        shape: { borderRadius: 12 },
    components: {
    MuiOutlinedInput: {
  styleOverrides: {
    root: {
      borderRadius: "12px",
      backgroundColor: "#fff",
      color: "#000",
      "& .MuiPickersOutlinedInput-notchedOutline": {
        borderColor: "#888888", // default
      },
      "&:hover .MuiPickersOutlinedInput-notchedOutline": {
        borderColor: "#666666", // hover
      },
      "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline, &:focus-within .MuiPickersOutlinedInput-notchedOutline": {
        borderColor: "#FF6B00 !important", // focus arancione
      },
    },
    input: { color: "#000" },
  },
},
      MuiPickersInputBase: {
        styleOverrides: {
          root: {
            color: "#000",
            backgroundColor: "#fff",
            "& .MuiPickersOutlinedInput-notchedOutline": {
              borderColor: "#FF6B00 !important",
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: { color: "#000", "&.Mui-focused": { color: "#000" } },
        },
      },
      MuiButton: {
    styleOverrides: {
      root: {
        "&.MuiButton-outlinedSecondary": {
          borderColor: "#FF6B00 !important",
          color: "#FF6B00 !important",
          "&:hover": {
            backgroundColor: "rgba(255, 107, 0, 0.08) !important",
          },
        },
        "&.MuiButton-outlinedSecondary.Mui-disabled": {
          borderColor: "transparent !important",
          color: "transparent !important",
          backgroundColor: "transparent !important",
        },
      },
    },
  },
      MuiInputAdornment: {
  styleOverrides: {
    root: {
      "& .MuiSvgIcon-root": { color: "#000 !important" },
      // evita che il focus sull’icona cambi il colore
      "&:focus-within + .MuiOutlinedInput-notchedOutline": { borderColor: "#FF6B00 !important" },
    },
  },
},
    }
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
