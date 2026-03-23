import React from 'react';
import { Button } from '../ui/Button';
import styles from './Hero.module.css';

interface HeroProps {
  onNavigate: (section: string) => void;
  onCartClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onCartClick }) => {
  const collageImages = [
    { src: '/menu/chilaquiles.jpg', alt: 'Chilaquiles verdes recién preparados', className: styles.image1 },
    { src: '/menu/hotcake-manza.jpg', alt: 'Hotcakes esponjosos con manzana', className: styles.image2 },
    { src: '/menu/club-con-papas.jpg', alt: 'Club sandwich con papas crujientes', className: styles.image3 },
    { src: '/menu/hamburguesa.jpg', alt: 'Hamburguesa jugosa con acompañamientos', className: styles.image4 },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Eliminado el badge "Sabor casero" */}
          
          <h1 className={styles.title}>
            Desayunos que saben
            <span> a casa</span>
          </h1>

          <p className={styles.description}>
            Chilaquiles, hotcakes esponjosos, sandwiches y postres preparados con amor. 
            Entrega rápida y calientita — ordena fácil por WhatsApp.
          </p>

          <div className={styles.actions}>
            <Button size="lg" onClick={() => onNavigate('menu')}>
              Ver menú
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onCartClick}
            >
              Pedir ahora
            </Button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.collage}>
            {collageImages.map((image, index) => (
              <div
                key={index}
                className={`${styles.collageItem} ${image.className}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};