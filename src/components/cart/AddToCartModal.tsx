import React, { useState, useEffect } from 'react';
import type { MenuItem } from '../../types/menu';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import styles from './AddToCartModal.module.css';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onConfirm: (item: MenuItem, quantity: number, size: string, selectedExtras: string[], observations: string, selectedProtein?: string, selectedFruit?: string, selectedSpread?: string) => void;
}

// Untables disponibles
const SPREAD_OPTIONS = [
  { id: 'lechera', name: 'Lechera', price: 0 },
  { id: 'miel', name: 'Miel', price: 0 },
  { id: 'mermelada', name: 'Mermelada', price: 0 },
  { id: 'hershey', name: 'Hershey\'s', price: 0 },
  { id: 'chocolate', name: 'Chocolate', price: 0 }
];

// Frutas disponibles para Hot Cakes Minis
const MINIS_FRUIT_OPTIONS = [
  { id: 'manzana', name: 'Manzana', price: 0, image: '/src/assets/menu/hotcakes-minis-manzana.jpg' },
  { id: 'platano', name: 'Plátano', price: 0, image: '/src/assets/menu/hotcakes-minis-platano.jpg' },
  { id: 'fresa', name: 'Fresa', price: 0, image: '/src/assets/menu/hotcakes-minis-fresa.jpg' }
];

// Opciones de tamaño para Hot Cakes Minis
const MINIS_SIZE_OPTIONS = [
  { id: '10', name: '10 piezas', price: 35 },
  { id: '15', name: '15 piezas', price: 50 },
  { id: '20', name: '20 piezas', price: 60 },
  { id: '25', name: '25 piezas', price: 70 },
  { id: '30', name: '30 piezas', price: 80 }
];

// Opciones para Hamburguesas
const HAMBURGUESA_OPTIONS = [
  { id: 'clasica', name: 'Clásica', description: 'Carne casera, lechuga, tomate, cebolla frita, jamón, queso, tocino y jalapeño', price: 55 },
  { id: 'con-papas', name: 'Con Papas', description: 'Hamburguesa clásica acompañada de papas a la francesa', price: 75 }
];

// Extras para Hot Cakes y Minis (solo untables, sin frutas)
const HOTCAKES_EXTRAS = [
  'Lechera extra (+$10)',
  'Miel extra (+$10)',
  'Mermelada extra (+$10)',
  'Hershey\'s extra (+$10)',
  'Chocolate extra (+$10)'
];

// Extras para Chilaquiles
const CHILAQUILES_EXTRAS = [
  'Salsa extra (+$5)',
  'Crema extra (+$5)',
  'Queso extra (+$5)'
];

// Extras para Sándwiches, Hamburguesas y Platillos Salados
const SANDWICHES_EXTRAS = [
  'Salsa extra (+$5)',
  'Queso extra (+$5)',
  'Tocino extra (+$10)',
  'Jamon extra (+$10)',
  'Huevo extra (+$10)'
];

// Extras para Papas
const PAPAS_EXTRAS = [
  'Salsa extra (+$5)',
  'Queso extra (+$5)',
  'Salsa de queso (+$10)',
  'Tocino extra (+$10)'
];

// Bebidas NO tienen extras

// Extras por defecto para otras categorías
const DEFAULT_EXTRAS = [
  'Salsa extra (+$5)'
];

export const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isOpen,
  onClose,
  item,
  onConfirm
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('10');
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);
  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedProtein, setSelectedProtein] = useState<string | null>(null);
  const [selectedBurgerOption, setSelectedBurgerOption] = useState<string>('clasica');
  const [observations, setObservations] = useState('');
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    if (item) {
      setCurrentImage(item.image);
      // Resetear selecciones cuando cambia el item
      setSelectedSpread(null);
      setSelectedFruit(null);
      setSelectedExtras([]);
      setSelectedProtein(null);
      setObservations('');
      setSelectedBurgerOption('clasica');
      
      // Resetear tamaño según el producto
      if (item.category === 'Hot Cakes Minis') {
        setSelectedSize('10');
      } else {
        setSelectedSize('mediana');
      }
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    
    // Cambiar imagen según selecciones
    if (item.category === 'Chilaquiles' && selectedProtein) {
      setCurrentImage('/src/assets/menu/chilaquileshuevi.jpg');
    } 
    else if (item.category === 'Hot Cakes Minis') {
      if (selectedFruit === 'manzana') {
        setCurrentImage('/src/assets/menu/mini-manzana.jpg');
      } else if (selectedFruit === 'platano') {
        setCurrentImage('/src/assets/menu/mini-platano.png');
      } else if (selectedFruit === 'fresa') {
        setCurrentImage('/src/assets/menu/mini-fresa.jpg');
      } else {
        setCurrentImage(item.image);
      }
    }
    else if (item.id === 'hotcakes-fruta') {
      if (selectedFruit === 'manzana') {
        setCurrentImage('/src/assets/menu/hotcakes.jpg');
      } else if (selectedFruit === 'platano') {
        setCurrentImage('/src/assets/menu/hotcakes-platano.jpg');
      } else {
        setCurrentImage(item.image);
      }
    } 
    else if (item.id === 'hotcakes-fresa-chocolate') {
      setCurrentImage('/src/assets/menu/hotcakes-fresa.jpg');
    } 
    else if (item.id === 'hotcakes-philadelphia') {
      setCurrentImage('/src/assets/menu/hotcakes.jpg');
    }
    else if (item.category === 'Hamburguesas') {
      if (selectedBurgerOption === 'con-papas') {
        setCurrentImage('/src/assets/menu/hamburguesa-papas.jpg');
      } else {
        setCurrentImage('/src/assets/menu/hamburguesa.jpg');
      }
    }
    else {
      setCurrentImage(item.image);
    }
  }, [selectedFruit, selectedProtein, selectedBurgerOption, item]);

  if (!isOpen || !item) return null;

  const category = item.category.toLowerCase();
  
  // Determinar si es bebida
  const isBebida = category.includes('bebida') || 
                   category.includes('naturales') || 
                   category.includes('embotellados') || 
                   category.includes('luciados') ||
                   item.category === 'Bebidas Naturales' ||
                   item.category === 'Embotellados' ||
                   item.category === 'Luciados';
  
  const isChilaquiles = item.category === 'Chilaquiles';
  const isHotCakes = category.includes('hot cakes') && item.category !== 'Hot Cakes Minis';
  const isHotCakesMinis = item.category === 'Hot Cakes Minis';
  const isSandwiches = category.includes('sándwich') || category.includes('cuernitos');
  const isPapas = category.includes('papas');
  const isHamburguesas = item.category === 'Hamburguesas';
  const isHotDogs = category.includes('hot dog');
  const isBurritas = category.includes('burritas');

  // Determinar si el producto puede tener fruta
  const canHaveFruit = isHotCakesMinis || item.id === 'hotcakes-fruta' || item.id === 'hotcakes-fresa-chocolate';
  
  // Determinar si el producto puede tener untable
  const canHaveSpread = isHotCakesMinis || 
                        item.id === 'hotcakes-sencillo' || 
                        item.id === 'hotcakes-fruta' || 
                        item.id === 'hotcakes-fresa-chocolate';

  // Determinar qué extras mostrar según la categoría
  const getExtrasList = () => {
    // Bebidas no tienen extras
    if (isBebida) {
      return [];
    }
    
    if (isHotCakes || isHotCakesMinis) {
      return HOTCAKES_EXTRAS;
    }
    
    if (isChilaquiles) {
      return CHILAQUILES_EXTRAS;
    }
    
    if (isSandwiches || isHamburguesas || isHotDogs || isBurritas) {
      return SANDWICHES_EXTRAS;
    }
    
    if (isPapas) {
      return PAPAS_EXTRAS;
    }
    
    return DEFAULT_EXTRAS;
  };

  // Determinar el precio de los extras
  const getExtraPrice = (extra: string) => {
    if (extra.includes('$5')) return 5;
    if (extra.includes('$10')) return 10;
    return 5;
  };

  const handleExtraToggle = (extra: string) => {
    setSelectedExtras(prev =>
      prev.includes(extra)
        ? prev.filter(e => e !== extra)
        : [...prev, extra]
    );
  };

  const handleProteinToggle = (protein: string) => {
    setSelectedProtein(prev => prev === protein ? null : protein);
  };

  const handleSpreadSelect = (spreadId: string) => {
    setSelectedSpread(prev => prev === spreadId ? null : spreadId);
  };

  const handleFruitSelect = (fruitId: string) => {
    setSelectedFruit(prev => prev === fruitId ? null : fruitId);
  };

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSize(sizeId);
  };

  const handleBurgerOptionSelect = (optionId: string) => {
    setSelectedBurgerOption(optionId);
  };

  const handleConfirm = () => {
    onConfirm(
      item, 
      quantity, 
      selectedBurgerOption, // Para hamburguesas, enviamos la opción seleccionada
      selectedExtras, 
      observations, 
      selectedProtein || undefined,
      selectedFruit || undefined,
      selectedSpread || undefined
    );
    
    // Resetear estado
    setQuantity(1);
    setSelectedSize(isHotCakesMinis ? '10' : 'mediana');
    setSelectedSpread(null);
    setSelectedFruit(null);
    setSelectedExtras([]);
    setSelectedProtein(null);
    setSelectedBurgerOption('clasica');
    setObservations('');
    onClose();
  };

  const extrasList = getExtrasList();
  const extrasCost = selectedExtras.reduce((total, extra) => total + getExtraPrice(extra), 0);
  
  const getBasePrice = () => {
    if (isChilaquiles) {
      return selectedSize === 'mediana' ? 60 : 80;
    }
    if (isHotCakesMinis) {
      const sizeOption = MINIS_SIZE_OPTIONS.find(opt => opt.id === selectedSize);
      return sizeOption ? sizeOption.price : 35;
    }
    if (isHamburguesas) {
      const burgerOption = HAMBURGUESA_OPTIONS.find(opt => opt.id === selectedBurgerOption);
      return burgerOption ? burgerOption.price : 55;
    }
    return item.price.regular || item.price.medium || 0;
  };

  const basePrice = getBasePrice();
  const proteinCost = selectedProtein ? 10 : 0;
  const total = (basePrice + extrasCost + proteinCost) * quantity;

  const hasSelections = selectedProtein || 
                        selectedExtras.length > 0 || 
                        selectedSpread || 
                        selectedFruit || 
                        (isChilaquiles && selectedSize !== 'mediana') ||
                        (isHotCakesMinis && selectedSize !== '10') ||
                        (isHamburguesas && selectedBurgerOption !== 'clasica');

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3 className={styles.title}>Personaliza tu pedido</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <Icon name="x-mark" className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Imagen del producto con indicador de selección */}
          <div className={`${styles.productImageSection} ${hasSelections ? styles.selected : ''}`}>
            <div className={styles.productImageContainer}>
              <img 
                src={currentImage} 
                alt={item.name} 
                className={styles.productImage} 
              />
              <span className={styles.imageBadge}>✓</span>
            </div>
            
            <div className={styles.productInfo}>
              <h4 className={styles.productName}>{item.name}</h4>
              {item.description && (
                <p className={styles.productDescription}>{item.description}</p>
              )}
              {isBebida && (
                <div className={styles.bebidaTag}>
                  <span>🍹 Bebida</span>
                </div>
              )}
              {hasSelections && (
                <div className={styles.selectionIndicator}>
                  <span className={styles.selectionDot}></span>
                  <span>Personalizado</span>
                </div>
              )}
            </div>
          </div>

          {/* Selector de opciones para Hamburguesas */}
          {isHamburguesas && (
            <div className={styles.section}>
              <label className={styles.label}>Elige tu hamburguesa</label>
              <div className={styles.burgerOptions}>
                {HAMBURGUESA_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={`${styles.burgerButton} ${selectedBurgerOption === option.id ? styles.active : ''}`}
                    onClick={() => handleBurgerOptionSelect(option.id)}
                  >
                    <span className={styles.burgerName}>{option.name}</span>
                    <span className={styles.burgerDescription}>{option.description}</span>
                    <span className={styles.burgerPrice}>${option.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de tamaño para Hot Cakes Minis */}
          {isHotCakesMinis && (
            <div className={styles.section}>
              <label className={styles.label}>Selecciona el tamaño</label>
              <div className={styles.minisSizeOptions}>
                {MINIS_SIZE_OPTIONS.map((size) => (
                  <button
                    key={size.id}
                    className={`${styles.minisSizeButton} ${selectedSize === size.id ? styles.active : ''}`}
                    onClick={() => handleSizeSelect(size.id)}
                  >
                    <span className={styles.minisSizeName}>{size.name}</span>
                    <span className={styles.minisSizePrice}>${size.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de fruta para Hot Cakes Minis */}
          {isHotCakesMinis && (
            <div className={styles.section}>
              <label className={styles.label}>Selecciona una fruta</label>
              <div className={styles.fruitOptions}>
                {MINIS_FRUIT_OPTIONS.map((fruit) => (
                  <button
                    key={fruit.id}
                    className={`${styles.fruitButton} ${selectedFruit === fruit.id ? styles.active : ''}`}
                    onClick={() => handleFruitSelect(fruit.id)}
                  >
                    <span className={styles.fruitName}>{fruit.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de untable para Hot Cakes Minis */}
          {isHotCakesMinis && (
            <div className={styles.section}>
              <label className={styles.label}>Selecciona un untable</label>
              <div className={styles.spreadOptions}>
                {SPREAD_OPTIONS.map((spread) => (
                  <button
                    key={spread.id}
                    className={`${styles.spreadButton} ${selectedSpread === spread.id ? styles.active : ''}`}
                    onClick={() => handleSpreadSelect(spread.id)}
                  >
                    <span className={styles.spreadName}>{spread.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de untable para Hot Cakes normales */}
          {isHotCakes && canHaveSpread && (
            <div className={styles.section}>
              <label className={styles.label}>Selecciona un untable</label>
              <div className={styles.spreadOptions}>
                {SPREAD_OPTIONS.map((spread) => {
                  const isDisabled = item.id === 'hotcakes-fresa-chocolate' && spread.id !== 'chocolate';
                  return (
                    <button
                      key={spread.id}
                      className={`${styles.spreadButton} ${selectedSpread === spread.id ? styles.active : ''}`}
                      onClick={() => handleSpreadSelect(spread.id)}
                      disabled={isDisabled}
                    >
                      <span className={styles.spreadName}>{spread.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selector de fruta para Hot Cakes con fruta */}
          {isHotCakes && canHaveFruit && item.id === 'hotcakes-fruta' && (
            <div className={styles.section}>
              <label className={styles.label}>Selecciona una fruta</label>
              <div className={styles.fruitOptions}>
                {MINIS_FRUIT_OPTIONS.filter(f => f.id === 'manzana' || f.id === 'platano').map((fruit) => (
                  <button
                    key={fruit.id}
                    className={`${styles.fruitButton} ${selectedFruit === fruit.id ? styles.active : ''}`}
                    onClick={() => handleFruitSelect(fruit.id)}
                  >
                    <span className={styles.fruitName}>{fruit.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Selector de tamaño para chilaquiles */}
          {isChilaquiles && (
            <div className={styles.section}>
              <label className={styles.label}>Tamaño</label>
              <div className={styles.sizeOptions}>
                <button
                  className={`${styles.sizeButton} ${selectedSize === 'mediana' ? styles.active : ''}`}
                  onClick={() => setSelectedSize('mediana')}
                >
                  <span className={styles.sizeName}>Mediana</span>
                  <span className={styles.sizePrice}>$60</span>
                </button>
                <button
                  className={`${styles.sizeButton} ${selectedSize === 'orden' ? styles.active : ''}`}
                  onClick={() => setSelectedSize('orden')}
                >
                  <span className={styles.sizeName}>Orden</span>
                  <span className={styles.sizePrice}>$80</span>
                </button>
              </div>
            </div>
          )}

          {/* Proteína extra para chilaquiles */}
          {isChilaquiles && (
            <div className={styles.section}>
              <label className={styles.label}>Proteína extra (+$10)</label>
              <div className={styles.proteinOptions}>
                <button
                  className={`${styles.proteinButton} ${selectedProtein === 'huevo' ? styles.active : ''}`}
                  onClick={() => handleProteinToggle('huevo')}
                >
                  <span className={styles.proteinEmoji}>🍳</span>
                  <span className={styles.proteinName}>Huevo estrellado</span>
                  <span className={styles.proteinPrice}>+$10</span>
                </button>
              </div>
              {selectedProtein === 'huevo' && (
                <p className={styles.note}>
                  ✓ Huevo agregado - La imagen se actualizó
                </p>
              )}
            </div>
          )}

          {/* Cantidad */}
          <div className={styles.section}>
            <label className={styles.label}>Cantidad</label>
            <div className={styles.quantityControls}>
              <button 
                className={styles.quantityButton}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                <Icon name="minus" className={styles.quantityIcon} />
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button 
                className={styles.quantityButton}
                onClick={() => setQuantity(prev => prev + 1)}
              >
                <Icon name="plus" className={styles.quantityIcon} />
              </button>
            </div>
          </div>

          {/* Extras - SOLO si no es bebida */}
          {!isBebida && extrasList.length > 0 && (
            <div className={styles.section}>
              <label className={styles.label}>
                {isHotCakes || isHotCakesMinis ? 'Extras (+$10 c/u)' : 'Extras'}
              </label>
              <div className={styles.extrasGrid}>
                {extrasList.map((extra) => {
                  const isSelected = selectedExtras.includes(extra);
                  return (
                    <label 
                      key={extra} 
                      className={`${styles.extraItem} ${isSelected ? styles.selected : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleExtraToggle(extra)}
                        className={styles.checkbox}
                      />
                      <span className={styles.extraLabel}>{extra}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mensaje para bebidas (sin extras) */}
          {isBebida && (
            <div className={styles.section}>
              <div className={styles.noExtrasMessage}>
                <span>🍹 Las bebidas no tienen extras disponibles</span>
              </div>
            </div>
          )}

          {/* Observaciones */}
          <div className={styles.section}>
            <label className={styles.label}>Observaciones</label>
            <textarea
              className={styles.textarea}
              placeholder={isBebida 
                ? "Ej: Sin hielo, temperatura ambiente, etc." 
                : "Ej: Sin cebolla, bien cocido, sin azúcar, etc."}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={2}
            />
          </div>

          {/* Resumen de costos */}
          <div className={styles.costBreakdown}>
            <div className={styles.costRow}>
              <span>Precio base:</span>
              <span>${basePrice} × {quantity}</span>
            </div>
            {selectedProtein && (
              <div className={styles.costRow}>
                <span>Huevo extra:</span>
                <span>+${10 * quantity}</span>
              </div>
            )}
            {selectedExtras.length > 0 && (
              <div className={styles.costRow}>
                <span>Extras ({selectedExtras.length}):</span>
                <span>+${extrasCost * quantity}</span>
              </div>
            )}
            <div className={styles.totalRow}>
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Botones */}
          <div className={styles.actions}>
            <Button variant="outline" onClick={onClose} fullWidth>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirm} fullWidth>
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};