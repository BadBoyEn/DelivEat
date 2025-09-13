// -- COMMENTO -- MenuGallery: overlay in-page, 3/2/1 immagini visibili, scroll a blocchi
// -- COMMENTO -- qua puoi inserire le foto del catagolo menu
import React, { useMemo, useState, useEffect } from "react";
import { Info } from "lucide-react";
import "./GestioneHomePage.css";

import carbonara from "../../Images/carbonara.jpg";
import panna from "../../Images/panna.jpg";
import pesto from "../../Images/pesto.jpg";
import cotoletta from "../../Images/cotoletta.jpg";
import tiramisu from "../../Images/tiramisu.jpg";
import ciocco from "../../Images/ciocco.jpg";
import sorbetto from "../../Images/sorbetto.jpg";
import insalata from "../../Images/insalata.jpg";
import frittura from "../../Images/frittura.jpg";

export default function MenuGallery({ onClose }) {
  const items = useMemo(
    () => [
      {
        title: "Spaghetti alla carbonara",
        src: carbonara,
        price: "15€",
        ingredients: "Spaghetti, uova, guanciale, pecorino romano, pepe",
      },
      {
        title: "Penne alla panna",
        src: panna,
        price: "10€",
        ingredients: "Penne, panna, prosciutto cotto, parmigiano",
      },
      {
        title: "Fusilli al pesto",
        src: pesto,
        price: "15€",
        ingredients: "Fusilli, pesto di basilico, pinoli, parmigiano",
      },
      {
        title: "Cotoletta milanese",
        src: cotoletta,
        price: "8€",
        ingredients: "Carne di vitello, pangrattato, uova, olio",
      },
      { title: "Insalata", src: insalata, price: "5€", ingredients: "Verdure miste fresche" },
      { title: "Frittura", src: frittura, price: "13€", ingredients: "Calamari, gamberi, farina, olio" },
      { title: "Tiramisù", src: tiramisu, price: "5€", ingredients: "Mascarpone, savoiardi, caffè, cacao" },
      { title: "Soufflé al cioccolato", src: ciocco, price: "7€", ingredients: "Cioccolato fondente, uova, zucchero" },
      { title: "Sorbetto", src: sorbetto, price: "3€", ingredients: "Limone, zucchero, acqua" },
    ],
    []
  );

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 600) return 1;
    if (w < 900) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);
  const [start, setStart] = useState(0);
  const [expanded, setExpanded] = useState(null); // per gli ingredienti

  useEffect(() => {
    const handler = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const visibleItems = useMemo(() => {
    if (!items?.length) return [];
    return items.slice(start, start + visibleCount); // NIENTE più loop
  }, [start, items, visibleCount]);

  const toggleIngredients = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const goPrev = () => {
    if (start > 0) setStart((prev) => prev - visibleCount);
  };

  const goNext = () => {
    if (start + visibleCount < items.length) setStart((prev) => prev + visibleCount);
  };

  return (
    <div className="mg-overlay">
      <div className="mg-frame" style={{ "--mg-visible": String(visibleCount) }}>
  <div className="mg-header">
    <h4 className="mg-title">Catalogo menù</h4>
  </div>

  {visibleItems.length ? (
    <div className="mg-rail">
      {visibleItems.map((it, idx) => {
        const globalIdx = start + idx; // indice reale nell'array completo
        return (
          <div key={`${it.title}-${globalIdx}`} className="mg-card">
            <img src={it.src} alt={it.title} className="mg-img" />
            <div className="mg-caption">{it.title}</div>
            <div className="mg-price">{it.price}</div>
            <button
              className="mg-info-btn"
              onClick={() =>
                setExpanded(expanded === globalIdx ? null : globalIdx)
              }
            >
              <Info size={18} />
            </button>
            {expanded === globalIdx && (
              <div className="mg-ingredients">{it.ingredients}</div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="mg-empty">
      Nessuna immagine trovata in <code>src/Images</code>.
    </div>
  )}

  <button
    type="button"
    className="mg-arrow mg-left"
    onClick={goPrev}
    aria-label="precedente"
    disabled={start === 0}
  >
    ‹
  </button>
  <button
    type="button"
    className="mg-arrow mg-right"
    onClick={goNext}
    aria-label="successivo"
    disabled={start + visibleCount >= items.length}
  >
    ›
  </button>
  <button className="close-btn" onClick={onClose} aria-label="chiudi">
    ×
  </button>
</div>
    </div>
  );
}
