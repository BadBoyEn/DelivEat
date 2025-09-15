import carbonara from '../../../Images/carbonara.jpg';
import panna from '../../../Images/panna.jpg';
import pesto from '../../../Images/pesto.jpg';
import cotoletta from '../../../Images/cotoletta.jpg';
import frittura from '../../../Images/frittura.jpg';
import insalata from '../../../Images/insalata.jpg';
import ciocco from '../../../Images/ciocco.jpg';
import tiramisu from '../../../Images/tiramisu.jpg';
import sorbetto from '../../../Images/sorbetto.jpg';

export const PIATTI = [
  { img: carbonara, title: 'Spaghetti alla carbonara' },
  { img: panna,    title: 'Penne alla panna e speck' },
  { img: pesto,    title: 'Fusilli al pesto' },
  { img: cotoletta,title: 'Cotoletta milanese' },
  { img: frittura, title: 'Frittura di pesce' },
  { img: insalata, title: 'Insalata' },
  { img: ciocco,   title: 'Soufflé al cioccolato' },
  { img: tiramisu, title: 'Tiramisù' },
  { img: sorbetto, title: 'Sorbetto' },
];

export const CATEGORIE = [
  { titolo: 'Primi',   piatti: PIATTI.slice(0, 3) },
  { titolo: 'Secondi', piatti: PIATTI.slice(3, 6) },
  { titolo: 'Dolci',   piatti: PIATTI.slice(6, 9) },
];
