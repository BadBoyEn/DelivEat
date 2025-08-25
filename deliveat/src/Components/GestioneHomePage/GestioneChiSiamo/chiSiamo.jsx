import react from 'react';
import styles from '../GestioneChiSiamo/chiSiamo.css';
const ChiSiamo = () => {
    return (
        <section className = {styles.chiSiamo}>
            <div className = {styles.container}>
                <h2 className = {styles.title}>Chi siamo</h2>
                <p className = {styles.subtitle}>
                    Siamo una dark kitchen nata per portare il gusto autentico dei piatti internazionali<br/>
                    direttamente a casa tua.
                </p>
                <div className = {styles.content}>
                    <p>
                        Niente sala, niente camerieri, solo una cucina dedicata al delivery, dove ogni piatto è preparato<br/>
                        al momento con ingredienti freschi e locali.
                    </p>
                    <p>
                        Dietro ai fornelli ci sono chef con anni di esperienza nei ristoranti stellati, uniti<br/>
                        dalla voglia di rivoluzionare il cibo da asporto.
                    </p>
                    <p>
                        Crediamo in un approccio sostenibile e smart alla ristorazione: meno sprechi, più qualità<br/>
                        e tutto il gusto che ti aspetti da un vero ristorante.
                    </p>
                </div>
                <a href="/menu" className = {styles.button}>Scopri il nostro menu</a>
            </div>
        </section>
    );
};
export default ChiSiamo;