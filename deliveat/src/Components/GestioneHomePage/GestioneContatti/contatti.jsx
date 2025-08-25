import react from 'react';
import styles from '../GestioneContatti/contatti.css';
const Contatti = () => {
    return(
        <section className={styles.contatti} id="contatti">
            <div className={styles.container}>
                <h2 className={styles.title}>Contattaci</h2>
                <div className={styles.info}>
                    <p><strong>Email:</strong> info@deliveat.it</p>
                    <p><strong>Telefono:</strong> +393456789012</p>
                </div>
            </div>
        </section>
    );
};
export default Contatti;