import DelivEat_logo from '../../Images/DelivEat_logo.png';
import './GestioneHomePage.css';

export function SitemarkIcon() {
  return (
    <img
      src={DelivEat_logo}
      alt="SitemarkLogo"
      className="logo-home"
    />
  );
}