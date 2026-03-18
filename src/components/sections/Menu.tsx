import React, { useState } from 'react';
import { getMenuData } from '../../data/menu';
import type { MenuItem } from '../../types/menu';
import { MenuCard } from '../ui/MenuCard';
import { AddToCartModal } from '../cart/AddToCartModal';
import { ToastNotification } from '../ui/ToastNotification';
import { useCart } from '../../context/CartContext';
import styles from './Menu.module.css';

export const Menu: React.FC = () => {
  const menuData = getMenuData();
  const [selectedCategory, setSelectedCategory] = useState<string>(menuData[0].id);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<string>('');
  const { addItem } = useCart();

  const categories = menuData.map(cat => ({
    id: cat.id,
    name: cat.name,
    icon: cat.icon
  }));

  const selectedCategoryData = menuData.find(cat => cat.id === selectedCategory);

  // Configuración para filtros de bebidas
  const drinkFilterConfig = [
    { id: 'todos', label: 'Todos', description: 'Todas nuestras bebidas disponibles' },
    { id: 'Embotellados', label: 'Embotellados', description: 'Bebidas embotelladas de las mejores marcas' },
    { id: 'Licuados', label: 'Licuados', description: 'Licuados cremosos preparados con fruta natural' }
  ];

  // Configuración para filtros de hot cakes
  const hotcakesFilterConfig = [
    { id: 'todos', label: 'Todos', description: 'Todos nuestros hot cakes' },
    { id: 'Hot Cakes Normales', label: 'Hot Cakes (3 piezas)', description: 'Hot cakes tradicionales de 3 piezas' },
    { id: 'Hot Cakes Minis', label: 'Hot Cakes Minis', description: 'Hot cakes pequeños en porciones de 10 a 30 piezas' }
  ];

  // Obtener los filtros según la categoría seleccionada
  const getFilterConfig = () => {
    if (selectedCategory === 'bebidas') return drinkFilterConfig;
    if (selectedCategory === 'hotcakes') return hotcakesFilterConfig;
    return [];
  };

  // Filtrar items por subcategoría
  const getFilteredItems = () => {
    if (!selectedCategoryData) return [];
    
    if (selectedSubCategory === 'todos') {
      return selectedCategoryData.items;
    }
    
    return selectedCategoryData.items.filter(item => item.category === selectedSubCategory);
  };

  const handleAddToCart = (item: MenuItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleConfirmAdd = (
    item: MenuItem, 
    quantity: number, 
    size: string,
    selectedExtras: string[], 
    observations: string,
    selectedProtein?: string,
    selectedFruit?: string,
  ) => {
    let basePrice = 0;
    
    if (item.category === 'Chilaquiles' || item.category === 'Enchiladas') {
      basePrice = size === 'mediana' ? 60 : 80;
    } else {
      basePrice = item.price.regular || item.price.medium || 0;
    }
    
    const extrasCost = selectedExtras.reduce((total, extra) => {
      if (extra.includes('$5')) return total + 5;
      if (extra.includes('$10')) return total + 10;
      if (extra.includes('$15')) return total + 15;
      return total;
    }, 0);
    
    const hasHuevo = selectedProtein === 'huevo';
    const proteinCost = hasHuevo ? 10 : 0;
    
    let productName = item.name;
    if (item.category === 'Chilaquiles' || item.category === 'Enchiladas') {
      productName = `${item.name} (${size === 'mediana' ? 'Media' : 'Orden'})`;
      if (hasHuevo) {
        productName += ' con huevo';
      }
    }
    
    if (selectedFruit && (item.category === 'Waffles' || item.category.includes('Hot Cakes'))) {
      productName = `${item.name} con ${selectedFruit}`;
    }
    
    addItem({
      id: `${item.id}-${Date.now()}`,
      productId: item.id,
      name: productName,
      price: basePrice + extrasCost + proteinCost,
      quantity,
      selectedOptions: selectedExtras,
      observations,
      category: item.category
    });
    
    setLastAddedProduct(productName);
    setShowToast(true);
    setModalOpen(false);
  };

  const filterConfig = getFilterConfig();
  const filteredItems = getFilteredItems();
  const hasFilters = filterConfig.length > 0;

  const getActiveDescription = () => {
    const activeFilter = filterConfig.find(f => f.id === selectedSubCategory);
    return activeFilter?.description || '';
  };

  const handleViewCart = () => {
    const cartButton = document.querySelector('[aria-label="Carrito de compras"]');
    if (cartButton) {
      (cartButton as HTMLButtonElement).click();
    }
    setShowToast(false);
  };

  const handleContinueShopping = () => {
    setShowToast(false);
  };

  return (
    <section id="menu" className={styles.menu}>
      <div className="container">
        <h2 className={styles.title}>Menú</h2>
        
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedSubCategory('todos');
              }}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {hasFilters && (
          <div className={styles.filtersContainer}>
            <div className={styles.filtersLabel}>
              {selectedCategory === 'bebidas' ? 'BEBIDAS' : 
               selectedCategory === 'hotcakes' ? 'HOT CAKES' : ''}
            </div>
            
            <div className={styles.filtersGrid}>
              {filterConfig.map((filter) => (
                <button
                  key={filter.id}
                  className={`${styles.filterButton} ${selectedSubCategory === filter.id ? styles.active : ''}`}
                  onClick={() => setSelectedSubCategory(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {selectedSubCategory !== 'todos' && (
              <div className={styles.filterDescription}>
                {getActiveDescription()}
              </div>
            )}
          </div>
        )}

        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <AddToCartModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={selectedItem}
        onConfirm={handleConfirmAdd}
      />

      <ToastNotification
        message={`✓ ${lastAddedProduct} agregado al carrito`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        onViewCart={handleViewCart}
        onContinueShopping={handleContinueShopping}
        autoClose={true}
        duration={4000}
      />
    </section>
  );
};