import React from 'react';
import { promos, Promo } from '../../data/promos';
import { Button } from '../ui/Button';
import styles from './Promotions.module.css';

interface PromotionsProps {
  onWhatsAppClick: (message: string) => void;
}

export const Promotions: React.FC<PromotionsProps> = ({ onWhatsAppClick }) => {
  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  const handlePromoClick = (promo: Promo) => {
    onWhatsAppClick(promo.whatsappMessage);
  };

  // Icono según el tipo de promoción
  const getPromoIcon = (promo: Promo) => {
    if (promo.title.includes('Hot Cakes')) return '🥞';
    if (promo.title.includes('Hamburguesa')) return '🍔';
    if (promo.title.includes('Burritas')) return '🌯';
    if (promo.title.includes('Chilaquiles')) return '🌶️';
    return '🔥';
  };

  return (
    <section id="promociones" className={styles.promotions}>
      <div className={styles.header}>
        <h2 className={styles.title}>Promociones</h2>
        <p className={styles.subtitle}>
          Las mejores combinaciones al mejor precio
        </p>
      </div>

      <div className={styles.promotionsGrid}>
        {promos.map((promo) => (
          <div key={promo.id} className={styles.promoCard}>
            {/* Badge */}
            <div className={styles.badgeContainer}>
              <span className={styles.badge}>{promo.badge || 'OFERTA'}</span>
            </div>
            
            {/* Imagen - MISMO SISTEMA QUE MENUCARD */}
            <div className={styles.imageContainer}>
              <img 
                src={promo.image} 
                alt={promo.title} 
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay}></div>
            </div>

            {/* Contenido */}
            <div className={styles.content}>
              <div className={styles.titleSection}>
                <span className={styles.titleIcon}>{getPromoIcon(promo)}</span>
                <h3 className={styles.cardTitle}>{promo.title}</h3>
              </div>
              
              <p className={styles.cardDescription}>{promo.description}</p>

              <div className={styles.includesList}>
                {promo.includes.slice(0, 3).map((item, index) => (
                  <div key={index} className={styles.includeItem}>
                    {item}
                  </div>
                ))}
              </div>

              <div className={styles.priceSection}>
                <span className={styles.priceLabel}>Precio</span>
                <div className={styles.priceWrapper}>
                  {promo.originalPrice && (
                    <span className={styles.originalPrice}>
                      {formatPrice(promo.originalPrice)}
                    </span>
                  )}
                  <span className={styles.promoPrice}>
                    {formatPrice(promo.promoPrice)} <small>MXN</small>
                  </span>
                </div>
              </div>

              <Button
                className={styles.promoButton}
                onClick={() => handlePromoClick(promo)}
                fullWidth
              >
                Apartar promoción
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};