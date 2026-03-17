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
                <span className={styles.featureNumber}>01</span>
                <span>Diseño personalizado</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureNumber}>02</span>
                <span>Mensaje incluido</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureNumber}>03</span>
                <span>Entrega a domicilio</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureNumber}>04</span>
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