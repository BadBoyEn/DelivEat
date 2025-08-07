import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import DelivEat_logo from '../../Images/DelivEat_logo.png';

import './GestionePersonale.css';

export function SitemarkIcon() {
  return (
    <img
      src={DelivEat_logo}
      alt="SitemarkLogo"
      className="logo-img"
    />
  );
}
