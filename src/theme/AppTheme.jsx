// -- COMMENTO -- Wrapper tema MUI + toggle dark/light + classi CSS tema
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { useState, useMemo, createContext, useEffect } from 'react'

import './Dark.css'
import './Light.css'

export const ColorModeContext = createContext({ toggleColorMode: () => {} })

export default function AppTheme({ children }) {
  // -- COMMENTO -- Lettura iniziale (lazy) dal localStorage
  const getInitial = () => {
    if (typeof window === 'undefined') return 'light'
    try {
      const saved = localStorage.getItem('deliveat-color-mode')
      return saved === 'dark' ? 'dark' : 'light'
    } catch { return 'light' }
  }
  const [mode, setMode] = useState(getInitial)

  // -- COMMENTO -- Persisti preferenza
  useEffect(() => {
    try { localStorage.setItem('deliveat-color-mode', mode) } catch {}
  }, [mode])

  // -- COMMENTO -- Applica classi per i CSS di tema
  useEffect(() => {
    const html = document.documentElement
    html.classList.remove('theme-light', 'theme-dark')
    html.classList.add(mode === 'dark' ? 'theme-dark' : 'theme-light')
  }, [mode])

  const colorMode = useMemo(
    () => ({ toggleColorMode: () => setMode(m => (m === 'light' ? 'dark' : 'light')) }),
    []
  )

  // -- COMMENTO -- NIENTE CSS VAR DENTRO LA PALETTE (evita error #9)
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
