import React from 'react';
import styles from './Footer.module.css';  // ← CAMBIAR a "./Footer.module.css"

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: 'fab fa-whatsapp', url: '' },
    { icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/profile.php?id=61573747828139' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>La Casita</h3>
            <p className={styles.text}>
              Desayunos y Masa · Hechos con amor
            </p>
            <p className={styles.text}>
              Los mejores desayunos de la zona
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.subtitle}>Horario</h4>
            <p className={styles.text}>Martes a Domingo</p>
            <p className={`${styles.text} ${styles.bold}`}>8:00 am - 12:00 pm</p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.subtitle}>Síguenos</h4>
            <div className={styles.social}>
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visítanos en ${link.icon.split('-')[1]}`}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            © {currentYear} La Casita. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};