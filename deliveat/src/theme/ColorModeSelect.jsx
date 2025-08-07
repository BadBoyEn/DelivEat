import * as React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from './AppTheme';
import { alpha } from '@mui/material/styles';

export default function ColorModeSelect(props) {
  const theme = useTheme(); 
  const colorMode = React.useContext(ColorModeContext); 

  const handleChange = (event) => {
    colorMode.toggleColorMode(event.target.value); 
  };

  return (
    <Select
      value={theme.palette.mode}
      onChange={handleChange}
      size="small"
      {...props}
    >
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
}