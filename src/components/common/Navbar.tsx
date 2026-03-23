import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Icon } from '../ui/Icon';
import styles from './Navbar.module.css';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'menu', 'sorpresas', 'promociones'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
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
    setActiveSection(section);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo más grande */}
          <div 
            className={styles.logo}
            onClick={() => handleNavigate('hero')}
          >
            <div className={styles.logoWrapper}>
              <img 
                src="./logo2.png" 
                alt="La Casita"
                className={styles.logoImage}
              />
              <div className={styles.logoGlow}></div>
            </div>
            <span className={styles.logoText}>La Casita</span>
          </div>

          {/* Desktop Navigation */}
          <ul className={styles.menu}>
            {menuItems.map((item) => (
              <li key={item.section}>
                <button
                  className={`${styles.menuLink} ${activeSection === item.section ? styles.active : ''}`}
                  onClick={() => handleNavigate(item.section)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <button 
              className={styles.cartButton}
              onClick={onCartClick}
              aria-label="Carrito"
            >
              <Icon name="shopping-cart" className={styles.cartIcon} outline={false} />
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </button>

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
        </div>
      </nav>

      {/* Mobile Menu Overlay and Panel */}
      <div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.active : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <div className={styles.mobileLogo}>
            <img src="./logo2.png" alt="La Casita" />
            <span>La Casita</span>
          </div>
          <button 
            className={styles.closeButton}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Cerrar"
          >
            <Icon name="x-mark" className={styles.closeIcon} outline={false} />
          </button>
        </div>
        <ul className={styles.mobileMenuList}>
          {menuItems.map((item) => (
            <li key={item.section}>
              <button
                className={`${styles.mobileMenuLink} ${activeSection === item.section ? styles.active : ''}`}
                onClick={() => handleNavigate(item.section)}
              >
                {item.label}
                <Icon name="chevron-right" className={styles.mobileArrow} outline={true} />
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.mobileMenuFooter}>
          <div className={styles.footerInfo}>
            <p>Horario: 8:00 AM - 12:00 PM</p>
            <p>Martes a Domingo</p>
          </div>
        </div>
      </div>
    </>
  );
};