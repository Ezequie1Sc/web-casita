import React from 'react';
import styles from './Footer.module.css';
import { Icon } from '../ui/Icon';
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* IZQUIERDA - MARCA */}
        <div className={styles.brand}>
          <div className={styles.logoWrapper}>
            <img 
              src="/logo2.png" 
              alt="La Casita" 
              className={styles.logo}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className={styles.logoFallback}>
              <span className={styles.logoText}>La Casita</span>
            </div>
          </div>
          <p className={styles.description}>
            "Desayunos preparados con amor, ingredientes frescos y el sabor auténtico de casa."
          </p>
        </div>

        {/* CENTRO - INFO */}
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <Icon name="clock" className={styles.infoIcon} outline />
            <div>
              <h4>Horario</h4>
              <p>Martes a Domingo</p>
              <span>8:00 am - 12:00 pm</span>
            </div>
          </div>

          <div className={styles.infoItem}>
            <Icon name="phone" className={styles.infoIcon} outline />
            <div>
              <h4>Teléfono</h4>
              <a href="tel: 9961332194" className={styles.phone}>
                996-133-2194
              </a>
            </div>
          </div>
        </div>

        {/* DERECHA - CONTACTO */}
        <div className={styles.contact}>
          <h4>Ordena o contáctanos</h4>

          <a
            href="https://wa.me/529961332194"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <Icon name="whatsapp" className={styles.ctaIcon} />
            Pedir por WhatsApp
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=61573747828139"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social}
          >
            <Icon name="envelope" className={styles.socialIcon} outline />
            Síguenos en Facebook
          </a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <p>© {currentYear} La Casita · Todos los derechos reservados</p>
      </div>
    </footer>
  );
};