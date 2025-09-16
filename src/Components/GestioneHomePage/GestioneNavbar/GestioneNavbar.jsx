import React, { useState } from 'react'
import { AppBar, Toolbar, Button, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Link } from 'react-router-dom'
import SitemarkIcon from '../../GestioneIcons/SistemarkIcon.jsx'
import ColorModeSelect from '../../../theme/ColorModeSelect.jsx'
import './GestioneNavbar.css'


export default function GestioneNavbar({ children }) {
const [anchorEl, setAnchorEl] = useState(null)
const open = Boolean(anchorEl)
const handleMenuOpen = (e) => setAnchorEl(e.currentTarget)
const handleMenuClose = () => setAnchorEl(null)


const pages = [
{ label: 'Home', to: '/' },
{ label: 'Rider', to: '/rider' },
{ label: 'Report', to: '/dashboard' },
]


return (
<Box className="page">
<AppBar position="static" color="transparent" elevation={0} className="appbar-custom">
<Toolbar className="toolbar-custom">
<Box className="brand">
<SitemarkIcon className="icon-DelivEat_logo" aria-hidden />
<Typography variant="h6" className="brand-title">DelivEat</Typography>
</Box>


<Box className="nav-links">
{pages.map((p) => (
<Button key={p.to} component={Link} to={p.to} className="nav-btn">{p.label}</Button>
))}
<Button component={Link} to="/home/ordina" className="nav-btn">Ordina</Button>
</Box>


<Box className="actions">
<ColorModeSelect />
<IconButton aria-label="menu" onClick={handleMenuOpen}><MoreVertIcon /></IconButton>
<Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} keepMounted>
<MenuItem component={Link} to="/home/chisiamo" onClick={handleMenuClose}>Chi siamo</MenuItem>
<MenuItem component={Link} to="/home/comefunziona" onClick={handleMenuClose}>Come funziona</MenuItem>
<MenuItem component={Link} to="/home/contatti" onClick={handleMenuClose}>Contatti</MenuItem>
<MenuItem component={Link} to="/home/faq" onClick={handleMenuClose}>FAQ</MenuItem>
<MenuItem component={Link} to="/home/infolegali" onClick={handleMenuClose}>Info legali</MenuItem>
</Menu>
</Box>
</Toolbar>
</AppBar>


<Box className="page-main">{children}</Box>
<Box className="footer-custom"><Typography variant="body2">© DelivEat. All Rights Reserved.</Typography></Box>
</Box>
)
}