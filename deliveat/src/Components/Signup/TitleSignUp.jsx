import react from 'react';
import './TitleSignUp.css';
import logo from '../../Images/DelivEat_logo.png'


function TitleSignUp () {
    return (
       <div className="title-container">
        <img src={logo} alt="Logo Sito" className="logo" /> 
            <h1 className="title-text">Accedi</h1>
        </div>
    );
}

export default TitleSignUp;
