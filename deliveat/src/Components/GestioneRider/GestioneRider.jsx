import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
 
import ColorModeSelect from '../../theme/ColorModeSelect';
import './GestioneRider.css';

function AppNavbar() {
  const location = useLocation();
  const [rider, setRider] = useState(null);
  
  useEffect(() => {
    if (location.state) {
      setRider(location.state);
      } else {
        const savedRider = localStorage.getItem("Rider");
        if (savedRider)
            setRider(JSON.parse(savedRider));
        }     
      }, [location.state]);   
  return (
    <header className="gr-appbar">
      <div className="gr-appbar__left"><div className="gr-logo">{rider?.nome} {rider?.cognome}</div></div>
      <div className="gr-appbar__right"><ColorModeSelect /></div>
    </header>
  );
}

export default function GestioneRider() {
  return (
    <div className="gr-root">
      <AppNavbar />
    </div>
  );
}