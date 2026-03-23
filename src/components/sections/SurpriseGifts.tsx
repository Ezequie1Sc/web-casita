import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../ui/Icon';
import styles from './SurpriseGifts.module.css';

// Datos de ejemplo para la galería de desayunos sorpresa
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
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const totalItems = surpriseGallery.length;

  // Función para mover al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  // Función para mover al anterior slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  // Función para ir a un slide específico
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Autoplay del carrusel
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 3000);
  };

  const openModal = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

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

        {/* Carrusel con movimiento automático y navegación manual */}
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

          {/* Botones de navegación */}
          <button 
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevSlide}
            aria-label="Anterior"
          >
            <Icon name="chevron-left" className={styles.navIcon} outline={false} />
          </button>
          <button 
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextSlide}
            aria-label="Siguiente"
          >
            <Icon name="chevron-right" className={styles.navIcon} outline={false} />
          </button>

          {/* Indicadores de página */}
          <div className={styles.indicators}>
            {surpriseGallery.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${currentIndex === index ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Sección de contacto personalizado */}
        <div className={styles.customOrderSection}>
          <div className={styles.customContent}>
            <h3 className={styles.customTitle}>
              ¿Te gustaría sorprender a una persona especial?
            </h3>
            <p className={styles.customDescription}>
              Creamos desayunos personalizados para cualquier ocasión: 
              cumpleaños, aniversarios, San Valentín, o simplemente para 
              hacer feliz a alguien. Tú imaginas la idea, nosotros la hacemos realidad.
            </p>
            
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V20M12 3L8 7M12 3L16 7M5 12H19M5 12C5 12 3 14 3 17C3 20 5 20 5 20H19C19 20 21 20 21 17C21 14 19 12 19 12M5 12C5 12 7 10 12 10C17 10 19 12 19 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Diseño personalizado</span>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 20H20M4 20C4 20 4 16 8 16H16C20 16 20 20 20 20M4 20V8C4 5.8 5.5 4 8 4H16C18.5 4 20 5.8 20 8V20M8 10H16M8 14H12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span>Mensaje incluido</span>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 8H19M5 8C3.9 8 3 7.1 3 6C3 4.9 3.9 4 5 4H19C20.1 4 21 4.9 21 6C21 7.1 20.1 8 19 8M5 8V18C5 19.1 5.9 20 7 20H17C18.1 20 19 19.1 19 18V8M9 12H15M12 12V16M12 16L14 14M12 16L10 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Entrega a domicilio</span>
              </div>

              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5"/>
                    <path d="M12 7V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span>Hora específica</span>
              </div>
            </div>

            <div className={styles.contactActions}>
              <a 
                href="https://wa.me/529961136244?text=Hola%2C%20me%20gustar%C3%ADa%20encargar%20un%20desayuno%20sorpresa%20personalizado.%20%C2%BFPodemos%20hablar%20sobre%20las%20opciones%3F"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                <svg 
                  className={styles.whatsappIcon} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M3.6 20.4L5.1 15.9C4.1 14.3 3.5 12.4 3.5 10.5C3.5 5.6 7.4 1.5 12.5 1.5C15 1.5 17.3 2.5 19 4.2C20.7 5.9 21.5 8.3 21.5 10.8C21.5 15.7 17.6 19.8 12.5 19.8C10.6 19.8 8.7 19.2 7.1 18.1L3.6 20.4Z" 
                    fill="white" 
                    stroke="white" 
                    strokeWidth="1.5"
                  />
                  <path 
                    d="M8.5 8.5C8.8 8.5 9.1 8.5 9.4 8.6C9.6 8.7 9.7 9 9.5 9.2C9.3 9.5 8.9 10.1 8.7 10.4C8.6 10.6 8.6 10.8 8.8 11C9.2 11.5 10.1 12.6 11.2 13.2C11.5 13.4 11.8 13.4 12.1 13.2C12.4 13 13 12.5 13.3 12.2C13.5 12 13.7 11.9 14 12.1C14.3 12.2 15.2 12.6 15.6 12.8C15.9 12.9 16 13.1 15.9 13.4C15.8 13.8 15.4 14.7 15 15C14.6 15.3 13.9 15.4 13.2 15.1C12.2 14.7 10.7 13.7 9.7 12.2C9.2 11.5 8.9 10.7 8.8 10C8.8 9.3 9 8.8 9.4 8.5C9.6 8.4 9.8 8.4 9.9 8.5H10.4C10.6 8.5 10.8 8.5 11 8.9C11.1 9.1 11.5 10.2 11.5 10.4C11.5 10.5 11.4 10.7 11.3 10.8L11 11.2C10.9 11.3 10.9 11.4 11 11.5C11.3 11.8 12 12.5 12.4 12.7C12.5 12.8 12.7 12.8 12.8 12.6L13 12.3C13.1 12.1 13.3 12.1 13.5 12.2C13.7 12.3 14.2 12.6 14.4 12.7C14.6 12.8 14.7 13 14.6 13.2C14.5 13.5 14.2 14 13.9 14.3C13.5 14.7 12.7 15 11.8 14.7C11 14.4 9.9 13.6 9.2 12.6C8.5 11.6 8.2 10.7 8.2 10.1C8.2 9.4 8.4 8.9 8.8 8.6C9 8.4 9.2 8.4 9.5 8.4H8.5Z" 
                    fill="white"
                  />
                </svg>
                Contáctame
              </a>
              <p className={styles.contactNote}>
                Haz clic para contactarnos y crearemos el desayuno perfecto para esa persona especial
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para ver imagen ampliada */}
      {selectedItem && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>×</button>
            <img 
              src={selectedItem.image} 
              alt={selectedItem.alt}
              className={styles.modalImage}
            />
            <p className={styles.modalCaption}>{selectedItem.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
};