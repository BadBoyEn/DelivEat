// -- COMMENTO -- MenuGallery: overlay in-page, 3/2/1 immagini visibili, scroll a blocchi
// -- COMMENTO -- qua puoi inserire le foto del catagolo menu
import React, { useMemo, useState, useEffect } from "react";
import "./GestioneHomePage.css";

// -- COMMENTO -- Import immagini (assicurati che i file esistano in src/Images con questi nomi)
import carbonara from "../../Images/carbonara.jpg";
import panna from "../../Images/panna.jpg";
import pesto from "../../Images/pesto.jpg";
import cotoletta from "../../Images/cotoletta.jpg";
import tiramisu from "../../Images/tiramisu.jpg";
import ciocco from "../../Images/ciocco.jpg";
import sorbetto from "../../Images/sorbetto.jpg";
// import pizza from "../../Images/pizza.jpg"; // -- COMMENTO -- RIMOSSO per evitare ReferenceError
import insalata from "../../Images/insalata.jpg";
import frittura from "../../Images/frittura.jpg";

export default function MenuGallery({ onClose }) {
  // -- COMMENTO -- Elenco immagini (nessun riferimento a 'pizza' per evitare errori)
  const items = useMemo(
    () => [
      { title: "Carbonara", src: carbonara },
      { title: "Panna", src: panna },
      { title: "Pesto", src: pesto },
      { title: "Cotoletta", src: cotoletta },
      { title: "Insalata", src: insalata },
      { title: "Frittura", src: frittura },
      { title: "Tiramisù", src: tiramisu },
      { title: "Souflè al cioccolato", src: ciocco },
      { title: "Sorbetto", src: sorbetto },
    ],
    []
  );

  // -- COMMENTO -- Quante card mostrare: 3 desktop, 2 tablet, 1 mobile
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w < 600) return 1;
    if (w < 900) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [start, setStart] = useState(0);

  useEffect(() => {
    const handler = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const visibleItems = useMemo(() => {
    if (!items?.length) return [];
    const out = [];
    for (let i = 0; i < Math.min(visibleCount, items.length); i++) {
      out.push(items[(start + i) % items.length]);
    }
    return out;
  }, [start, items, visibleCount]);

  const goPrev = () => {
    if (!items.length) return;
    setStart((prev) => (prev - visibleCount + items.length) % items.length);
  };

  const goNext = () => {
    if (!items.length) return;
    setStart((prev) => (prev + visibleCount) % items.length);
  };

  return (
    <div className="mg-overlay">
      <div
        className="mg-frame"
        style={{ "--mg-visible": String(visibleCount) }}  // -- COMMENTO -- CSS var come stringa
      >
        <div className="mg-header">
          <h4 className="mg-title">Catalogo menù</h4>
        </div>

        {visibleItems.length ? (
          <div className="mg-rail">
            {visibleItems.map((it, idx) => (
              <div key={`${it.title}-${idx}`} className="mg-card">
                <img src={it.src} alt={it.title} className="mg-img" />
                <div className="mg-caption">{it.title}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mg-empty">Nessuna immagine trovata in <code>src/Images</code>.</div>
        )}

        <button type="button" className="mg-arrow mg-left" onClick={goPrev} aria-label="precedente">‹</button>
        <button type="button" className="mg-arrow mg-right" onClick={goNext} aria-label="successivo">›</button>

        <button className="close-btn" onClick={onClose} aria-label="chiudi">×</button>
      </div>
    </div>
  );
}
