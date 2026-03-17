import type { MenuItem } from '../../types/menu';
import { Button } from './Button';
import styles from './MenuCard.module.css';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart }) => {
  const {
    id,
    name,
    description,
    price,
    image,
    category,
    isPopular,
    isNew
  } = item;

  const formatPrice = () => {
    if (price.regular) return `$${price.regular}`;
    
    const parts = [];
    if (price.small) parts.push(`Chica $${price.small}`);
    if (price.medium) parts.push(`Mediana $${price.medium}`);
    if (price.large) parts.push(`Grande $${price.large}`);
    return parts.join(' · ');
  };

  const isHotCake = id.includes('hotcakes') || category.includes('Hot Cakes');
  const isMini   = id.includes('minis')    || category.includes('Minis');
  const isLicuado = category.includes('Licuados') || category.includes('Luciados');

  // Obtener inicial para el icono
  const getInitial = () => {
    if (isHotCake) return '';
    if (isLicuado) return '';
    if (category.includes('Chilaquiles')) return '';
    if (category.includes('Sándwich'))    return '';
    if (category.includes('Hamburguesa')) return '';
    return '🍽️';
  };

  return (
    <div className={styles.card}>
      {/* Badges */}
      <div className={styles.badgeContainer}>
        {isPopular && <span className={`${styles.badge} ${styles.popularBadge}`}>Popular</span>}
        {isNew     && <span className={`${styles.badge} ${styles.newBadge}`}>Nuevo</span>}
        {isMini && !isPopular && !isNew && (
          <span className={`${styles.badge} ${styles.miniBadge}`}>Mini</span>
        )}
      </div>
      
      {/* Imagen */}
      <div className={styles.imageContainer}>
        <img 
          src={image} 
          alt={name}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (isLicuado) {
              target.src = '/src/assets/menu/licuado-default.jpg';
            } else if (isHotCake) {
              target.src = '/src/assets/menu/hotcakes-default.jpg';
            } else {
              target.src = '/src/assets/menu/default-food.jpg';
            }
          }}
        />
        <div className={styles.imageOverlay}></div>
      </div>
      
      <div className={styles.content}>
        {/* Título con icono */}
        <div className={styles.titleSection}>
          <span className={styles.titleIcon}>{getInitial()}</span>
          <h3 className={styles.name}>{name}</h3>
        </div>
        
        {/* Descripción */}
        {description && <p className={styles.description}>{description}</p>}
        
        {/* Detalles del producto */}
        {isHotCake && !isMini && (
          <div className={styles.productDetails}>
            <span className={styles.pieceBadge}>3 piezas</span>
          </div>
        )}
        
        {/* Precio */}
        <div className={styles.priceSection}>
          <span className={styles.priceLabel}>Precio</span>
          <span className={styles.price}>
            {formatPrice()} <small>MXN</small>
          </span>
        </div>
        
        {/* Botón */}
        <Button 
          onClick={() => onAddToCart(item)}
          fullWidth
          className={styles.addButton}
        >
          Agregar al pedido
        </Button>
      </div>
    </div>
  );
};