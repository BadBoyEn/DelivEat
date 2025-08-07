import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import DelivEat_logo from '../Images/DelivEat_logo.png';

import './CustomIcons.css';

export function SitemarkIcon() {
  return (
    <img
      src={DelivEat_logo}
      alt="SitemarkLogo"
      className="logo-img"
    />
  );
}

export function GoogleIcon() {
  return (
    <SvgIcon>
      {/* SVG unchanged */}
    </SvgIcon>
  );
}
