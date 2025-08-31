import React from 'react';
import logoPrimary from '../Images/DelivEat_logo.png';
import logoAlt from '../Images/DelivEat_logo2.png';

export default function CustomIcons({
  variant = 'primary',    
  size = 40,              
  style,
  ...props
}) {
  const src = variant === 'alt' ? logoAlt : logoPrimary;

  return (
    <img
      src={src}
      alt="DelivEat logo"
      width={size}
      height="auto"
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      {...props}
    />
  );
}

export const SitemarkIcon = (props) => (
  <CustomIcons variant="primary" size={32} {...props} />
);