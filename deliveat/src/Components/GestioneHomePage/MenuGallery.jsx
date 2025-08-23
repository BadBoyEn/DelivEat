import { useState } from 'react';
import './GestioneHomePage.css';
import galleryImages from '../../assets/galleryImages'; // array con i percorsi delle immagini
import {
  Box, Button
} from '@mui/material';

export default function MenuGallery() {
  const [isOpen, setIsOpen] = useState(false); 
  const [currentIndex, setCurrentIndex] = useState(0); 

  const openGallery = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => setIsOpen(false);

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
    <div className="menu-gallery">
      {/* Immagine principale */}
      <img
        src={galleryImages[0]}
        alt="Menu principale"
        className="menu-cover"
        onClick={() => openGallery(0)}
      />
      <Box className="ordina-ora">
         <Button variant="contained" color="secondary" size="large">Ordina ora</Button>
      </Box>

      {/* Overlay gallery */}
      {isOpen && (
        <div className="gallery-overlay">
          <div className="gallery-frame active">
            <button
              className={`arrow left ${currentIndex === 0 ? 'disabled' : ''}`}
              onClick={prevImage}
              disabled={currentIndex === 0}
            >
              ◀
            </button>

            <img
              src={galleryImages[currentIndex]}
              alt={`Menu ${currentIndex + 1}`}
            />

            <button
              className={`arrow right ${currentIndex === galleryImages.length - 1 ? 'disabled' : ''}`}
              onClick={nextImage}
              disabled={currentIndex === galleryImages.length - 1}
            >
              ▶
            </button>
          </div>

          <button className="close-btn" onClick={closeGallery}>×</button>
        </div>
      )}
    </div>
  );
}