import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import { useState, useMemo, createContext, useEffect } from 'react'


import './Dark.css'
import './Light.css'


export const ColorModeContext = createContext({ toggleColorMode: () => {} })


export default function AppTheme({ children }) {
const getInitial = () => {
if (typeof window === 'undefined') return 'light'
const saved = localStorage.getItem('deliveat-color-mode')
return saved === 'dark' ? 'dark' : 'light'
}


const [mode, setMode] = useState(getInitial())
useEffect(() => { localStorage.setItem('deliveat-color-mode', mode) }, [mode])


const colorMode = useMemo(() => ({
toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
}), [])


useEffect(() => {
const html = document.documentElement
html.classList.remove('theme-light', 'theme-dark')
html.classList.add(mode === 'dark' ? 'theme-dark' : 'theme-light')
}, [mode])


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