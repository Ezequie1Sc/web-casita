import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Inicio', section: 'hero' },
    { label: 'Menú', section: 'menu' },
    { label: 'Sorpresas', section: 'sorpresas' },
    { label: 'Promociones', section: 'promociones' }
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <div 
          className={styles.logo}
          onClick={() => handleNavigate('hero')}
        >
          <img 
            src="./logo2.png" 
            alt="La Casita"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>La Casita</span>
        </div>

        {/* Menú de navegación - visible en desktop */}
        <ul className={styles.menu}>
          {menuItems.map((item) => (
            <li key={item.section}>
              <a
                href={`#${item.section}`}
                className={styles.menuLink}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(item.section);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Sección derecha: carrito + menú móvil */}
        <div className={styles.rightSection}>
          {/* Carrito de compras */}
          <button 
            className={styles.cartButton}
            onClick={onCartClick}
            aria-label="Carrito de compras"
          >
            <svg 
              className={styles.cartIcon} 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M8 22C8.55228 22 9 21.5523 9 21C9 20.4477 8.55228 20 8 20C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M19 22C19.5523 22 20 21.5523 20 21C20 20.4477 19.5523 20 19 20C18.4477 20 18 20.4477 18 21C18 21.5523 18.4477 22 19 22Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M2.05 2.05H4.05L6.71 14.47C6.82 14.99 7.1 15.45 7.5 15.77C7.9 16.09 8.39 16.26 8.89 16.25H18.89C19.39 16.26 19.88 16.09 20.28 15.77C20.68 15.45 20.96 14.99 21.07 14.47L22.95 5.95H5.55" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </button>

          {/* Botón menú móvil */}
          <button 
            className={`${styles.menuButton} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Menú móvil desplegable */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
          <ul className={styles.mobileMenuList}>
            {menuItems.map((item) => (
              <li key={item.section}>
                <a
                  href={`#${item.section}`}
                  className={styles.mobileMenuLink}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.section);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};