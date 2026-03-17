import React from 'react';
import { Button } from '../ui/Button';
import styles from './Hero.module.css';  // ← CAMBIAR a "./Hero.module.css"

interface HeroProps {
  onNavigate: (section: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Bienvenidos a
            <br />
            <span className={styles.highlight}>La Casita</span>
          </h1>
          <p className={styles.subtitle}>
            Desayunos y Masa · Hechos con amor
          </p>
          <p className={styles.description}>
            Disfruta de los mejores desayunos, hot cakes, sándwiches y más.
            Todo preparado al momento con ingredientes frescos y de calidad.
          </p>
          <div className={styles.buttons}>
            <Button size="lg" onClick={() => onNavigate('menu')}>
              Ver Menú
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('promotions')}>
              Ver Promocion
            </Button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img 
              src="./logo2.png" 
              alt="La Casita"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
};