import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useMemo, createContext } from 'react';

// Creo il context per condividere il cambio tema
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppTheme({ children }) {
  const [mode, setMode] = useState('light'); // Stato per il tema

  // Funzione per cambiare il tema, passata nel context
  const colorMode = useMemo(() => ({
    toggleColorMode: (newMode) => {
      setMode(newMode);
    },
  }), []);

  // Creo il tema in base a "mode"
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}