//Catalogo da sfogliare, le immagini da images; va a posto di novita' del menu:
import { useState } from "react";
import "./GestioneHomePage.css";
import galleryImages from "../../assets/galleryImages"; // array con le immagini

export default function MenuGallery({ onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (currentIndex < galleryImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="gallery-overlay fullscreen">
      <div className="gallery-frame active">
       <div className="nav-buttons">
        <button
          className={`arrow left ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={prevImage}
          disabled={currentIndex === 0}
        >
          ◀
        </button>

        <img src={galleryImages[currentIndex]} alt={`Menu ${currentIndex + 1}`} />

        <button
          className={`arrow right ${
            currentIndex === galleryImages.length - 1 ? "disabled" : ""
          }`}
          onClick={nextImage}
          disabled={currentIndex === galleryImages.length - 1}
        >
          ▶
        </button>
        </div> 
      </div>

      <button className="close-btn" onClick={onClose}>
        ×
      </button>
    </div>
  );
}