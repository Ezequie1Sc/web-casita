import React, { useState, useEffect, useRef } from 'react';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { Icon } from '../ui/Icon';
import styles from './SurpriseGifts.module.css';

// Datos...
const surpriseGallery = [
  {
    id: 1,
    image: './sorpresa/sorpresa-cumple.jpg',
    alt: 'Desayuno completo con club sandwich, waffles, fruta y flores',
    category: 'Cumpleaños'
  },
  {
    id: 2,
    image: './sorpresa/sor2.jpg',
    alt: 'Desayuno de cumpleaños con flores y globo',
    category: 'Cumpleaños'
  },
  {
    id: 3,
    image: './sorpresa/cumpleaños.jpg',
    alt: 'Paquete personalizado',
    category: 'Cumpleaños'
  },
  {
    id: 4,
    image: './sorpresa/cumple.jpg',
    alt: 'Desayuno sorpresa con hot cakes, club sandwich, fruta y golosinas',
    category: 'Sorpresa'
  },
  {
    id: 5,
    image: './sorpresa/desayuno-romantico.jpg',
    alt: 'Desayuno sorpresa con hot cakes, club sandwich, fruta y golosinas',
    category: 'Sorpresa'
  },
  {
    id: 6,
    image: './sorpresa/cua.jpg',
    alt: 'Desayuno completo con hot cakes, club sandwich, fruta y golosinas',
    category: 'Cumpleaños'
  }
];

export const SurpriseGifts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const totalItems = surpriseGallery.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleTouchStart = () => setIsHovered(true);

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 3000);
  };

  const openModal = (id: number) => setSelectedImage(id);
  const closeModal = () => setSelectedImage(null);

  const selectedItem = selectedImage !== null 
    ? surpriseGallery.find(item => item.id === selectedImage) 
    : null;

  return (
    <section id="sorpresas" className={styles.surpriseSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Desayunos Sorpresa</h2>
          <p className={styles.subtitle}>
            Creamos momentos inolvidables para esas personas especiales
          </p>
        </div>

        {/* Carrusel */}
        <div 
          className={styles.carouselContainer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {surpriseGallery.map((item) => (
              <div 
                key={item.id} 
                className={styles.carouselSlide}
                onClick={() => openModal(item.id)}
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className={styles.carouselImage}
                    loading="lazy"
                    draggable={false}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.categoryTag}>{item.category}</span>
                    <button className={styles.viewButton}>
                      <Icon name="magnifying-glass" className={styles.viewIcon} outline={false} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevSlide}
          >
            <Icon name="chevron-left" className={styles.navIcon} outline={false} />
          </button>

          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextSlide}
          >
            <Icon name="chevron-right" className={styles.navIcon} outline={false} />
          </button>

          <div className={styles.indicators}>
            {surpriseGallery.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* CONTACTO */}
        <div className={styles.customOrderSection}>
          <div className={styles.customContent}>
            <h3 className={styles.customTitle}>
              ¿Te gustaría sorprender a una persona especial?
            </h3>

            <div className={styles.contactActions}>
              
              {/* 🔥 BOTÓN REUTILIZABLE */}
             <WhatsAppButton
  phoneNumber="529961332194"
  message="Hola, me gustaría encargar un desayuno sorpresa personalizado"
/>

            </div>
          </div>
        </div>
      </div>

      {selectedItem && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal}>×</button>
            <img src={selectedItem.image} alt={selectedItem.alt} />
          </div>
        </div>
      )}
    </section>
  );
};