import React, { useRef, useState, useEffect } from 'react';
import { surpriseGifts, SurpriseGift } from '../../data/surpriseGifts';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { Icon } from '../ui/Icon';
import styles from './SurpriseGifts.module.css';

interface SurpriseGiftsProps {
  onWhatsAppClick?: (message: string) => void;
}

export const SurpriseGifts: React.FC<SurpriseGiftsProps> = ({ onWhatsAppClick }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('todos');
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Obtener ocasiones únicas para los filtros
  const occasions = ['todos', ...new Set(surpriseGifts.map(gift => gift.occasion))];
  
  // Filtrar por ocasión
  const filteredGifts = selectedOccasion === 'todos' 
    ? surpriseGifts 
    : surpriseGifts.filter(gift => gift.occasion === selectedOccasion);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };

  const formatPrice = (gift: SurpriseGift) => {
    if (gift.price === 0) return 'Precio variable';
    return `$${gift.price} MXN`;
  };
 //@ts-ignore
  const handleWhatsApp = (gift: SurpriseGift) => {
    const message = gift.whatsappMessage;
    if (onWhatsAppClick) {
      onWhatsAppClick(message);
    } else {
      const phoneNumber = '521234567890';
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    }
  };

  // Obtener etiqueta de ocasión en español
  const getOccasionLabel = (occasion: string) => {
    const gift = surpriseGifts.find(g => g.occasion === occasion);
    return gift?.occasionLabel || occasion;
  };

  return (
    <section id="sorpresas" className={styles.surpriseSection}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Desayunos Sorpresa</h2>
          <p className={styles.subtitle}>
            Para ocasiones especiales: cumpleaños, aniversarios, San Valentín y más
          </p>
        </div>

        {/* Filtros por ocasión */}
        <div className={styles.occasionFilters}>
          {occasions.map((occasion) => (
            <button
              key={occasion}
              className={`${styles.occasionButton} ${selectedOccasion === occasion ? styles.active : ''}`}
              onClick={() => setSelectedOccasion(occasion)}
            >
              {occasion === 'todos' ? 'Todos' : getOccasionLabel(occasion)}
            </button>
          ))}
        </div>

        {/* Carrusel de regalos sorpresa */}
        <div className={styles.carouselContainer}>
          {showLeftArrow && (
            <button 
              className={`${styles.arrow} ${styles.leftArrow}`}
              onClick={() => scroll('left')}
              aria-label="Ver anteriores"
            >
              <Icon name="chevron-left" className={styles.arrowIcon} />
            </button>
          )}

          {showRightArrow && (
            <button 
              className={`${styles.arrow} ${styles.rightArrow}`}
              onClick={() => scroll('right')}
              aria-label="Ver más"
            >
              <Icon name="chevron-right" className={styles.arrowIcon} />
            </button>
          )}

          <div 
            className={styles.giftsCarousel}
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
          >
            {filteredGifts.map((gift) => (
              <div key={gift.id} className={styles.giftCard}>
                {gift.isPopular && (
                  <span className={styles.popularBadge}>Más popular</span>
                )}
                
                <div className={styles.giftImageContainer}>
                  <img src={gift.image} alt={gift.title} className={styles.giftImage} />
                  <span className={styles.occasionTag}>{gift.occasionLabel}</span>
                </div>

                <div className={styles.giftContent}>
                  <h3 className={styles.giftTitle}>{gift.title}</h3>
                  <p className={styles.giftDescription}>{gift.description}</p>

                  <div className={styles.includesBox}>
                    <p className={styles.includesTitle}>Incluye:</p>
                    <ul className={styles.includesList}>
                      {gift.includes.slice(0, 4).map((item, index) => (
                        <li key={index} className={styles.includeItem}>• {item}</li>
                      ))}
                      {gift.includes.length > 4 && (
                        <li className={styles.includeItem}>+ {gift.includes.length - 4} más...</li>
                      )}
                    </ul>
                  </div>

                  <div className={styles.giftPrice}>
                    {formatPrice(gift)}
                  </div>

                  <WhatsAppButton
                    message={gift.whatsappMessage}
                    size="sm"
                    fullWidth
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Banner de personalización */}
        <div className={styles.customBanner}>
          <div className={styles.customContent}>
            <h3>✨ ¿Tienes una ocasión especial?</h3>
            <p>Podemos personalizar un desayuno sorpresa exactamente como lo imaginas</p>
            <WhatsAppButton
              message="Hola, quiero personalizar un desayuno sorpresa para una ocasión especial"
              variant="primary"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};