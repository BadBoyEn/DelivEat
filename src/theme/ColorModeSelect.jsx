import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import { ColorModeContext } from './AppTheme'
import Brightness7Icon from '@mui/icons-material/Brightness7' // ☀️
import DarkModeIcon from '@mui/icons-material/DarkMode' // 🌙


export default function ColorModeSelect(props) {
const theme = useTheme()
const colorMode = React.useContext(ColorModeContext)


return (
<IconButton
onClick={colorMode.toggleColorMode}
sx={{ ml: 1, display:'inline-flex', alignItems:'center', gap:1 }}
aria-label="toggle color mode"
{...props}
>
<span
style={{ display: 'inline-flex', transition: 'transform 0.4s ease',
transform: theme.palette.mode === 'dark' ? 'rotate(0deg)' : 'rotate(180deg)'}}
>
{theme.palette.mode === 'dark' ? (
<DarkModeIcon sx={{ fontSize: 24 }} />
) : (
<Brightness7Icon sx={{ fontSize: 24 }} />
)}
</span>
</IconButton>
)
}