import DelivEat_logo from '../../Images/DelivEat_logo.png';
import './GestioneHomePage.css';

export function SitemarkIcon({ className = 'logo-home', ...props }) {
  return (
    <img
      src={DelivEat_logo}
      alt="DelivEat"
      className={className}
      {...props}
    />
  );
}
