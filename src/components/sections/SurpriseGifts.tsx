import React, { useState } from 'react';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import styles from './SurpriseGifts.module.css';

// Datos de ejemplo para la galería de desayunos sorpresa
const surpriseGallery = [
  {
    id: 1,
    image: '/src/assets/sorpresa/sorpresa-cumple.jpg',
    alt: 'Desayuno completo con club sandwich, waffles, fruta y flores',
    category: 'Cumpleaños'
  },
  {
    id: 2,
    image: '/src/assets/sorpresa/sor2.jpg',
    alt: 'Desayuno de cumpleaños con flores y globo',
    category: 'Cumpleaños'
  },
  {
    id: 3,
    image: '/src/assets/sorpresa/cumpleaños.jpg',
    alt: 'Paquete personalizado',
    category: 'Cumpleaños'
  },
  {
    id: 4,
    image: '/src/assets/sorpresa/cumple.jpg',
    alt: 'Desayuno sorpresa con hot cakes, club sandwich, fruta y golosinas',
    category: 'Sorpresa'
  },
  {
    id: 5,
    image: '/src/assets/sorpresa/desayuno-romantico.jpg',
    alt: 'Desayuno sorpresa con hot cakes, club sandwich, fruta y golosinas',
    category: 'Sorpresa'
  },
  {
    id: 6,
    image: '/src/assets/sorpresa/cua.jpg',
    alt: 'Desayuno completo con hot cakes, club sandwich, fruta y golosinas',
    category: 'Cumpleaños'
  }
];

export const SurpriseGifts: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

        {/* Galería de imágenes */}
        <div className={styles.galleryGrid}>
          {surpriseGallery.map((item) => (
            <div 
              key={item.id} 
              className={styles.galleryItem}
              onClick={() => openModal(item.id)}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className={styles.galleryImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}>
                  <span className={styles.categoryTag}>{item.category}</span>
                  <span className={styles.viewIcon}>🔍</span>
                </div>
              </div>
            </div>
          ))}
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
              <WhatsAppButton
                message="Hola, me gustaría encargar un desayuno sorpresa personalizado. ¿Podemos hablar sobre las opciones?"
                variant="primary"
                size="lg"
                className={styles.contactButton}
              />
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