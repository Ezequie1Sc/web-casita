import { useState, useEffect } from 'react';
import type { MenuItem } from '../../types/menu';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import styles from './AddToCartModal.module.css';

interface AddToCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  onConfirm: (
    item: MenuItem,
    quantity: number,
    size: string,
    selectedExtras: string[],
    observations: string,
    selectedProtein?: string,
    selectedFruit?: string,
    selectedSpread?: string
  ) => void;
}

const SPREAD_OPTIONS = [
  { id: 'lechera', name: 'Lechera', price: 0 },
  { id: 'miel', name: 'Miel', price: 0 },
  { id: 'mermelada', name: 'Mermelada', price: 0 },
  { id: 'hershey', name: "Hershey's", price: 0 },
  { id: 'chocolate', name: 'Chocolate', price: 0 }
];

const MINIS_FRUIT_OPTIONS = [
  { id: 'manzana', name: 'Manzana', price: 0, image: '/src/assets/menu/hotcakes-minis-manzana.jpg' },
  { id: 'platano', name: 'Plátano', price: 0, image: '/src/assets/menu/hotcakes-minis-platano.jpg' },
  { id: 'fresa', name: 'Fresa', price: 0, image: './menu/hotcakes-minis-fresa.jpg' }
];

const MINIS_SIZE_OPTIONS = [
  { id: '10', name: '10 piezas', price: 35 },
  { id: '15', name: '15 piezas', price: 50 },
  { id: '20', name: '20 piezas', price: 60 },
  { id: '25', name: '25 piezas', price: 70 },
  { id: '30', name: '30 piezas', price: 80 }
];

const HAMBURGUESA_OPTIONS = [
  { id: 'clasica', name: 'Clásica', description: 'Carne casera, lechuga, tomate, cebolla frita, jamón, queso, tocino y jalapeño', price: 55 },
  { id: 'con-papas', name: 'Con Papas', description: 'Hamburguesa clásica acompañada de papas a la francesa', price: 75 }
];

const HOTCAKES_EXTRAS = [
  { id: 'lechera-extra', name: 'Lechera extra', price: 10 },
  { id: 'miel-extra', name: 'Miel extra', price: 10 },
  { id: 'mermelada-extra', name: 'Mermelada extra', price: 10 },
  { id: 'hershey-extra', name: "Hershey's extra", price: 10 },
  { id: 'chocolate-extra', name: 'Chocolate extra', price: 10 }
];

const CHILAQUILES_EXTRAS = [
  { id: 'salsa-extra', name: 'Salsa extra', price: 5 },
  { id: 'crema-extra', name: 'Crema extra', price: 5 },
  { id: 'queso-extra', name: 'Queso extra', price: 5 }
];

const SANDWICHES_EXTRAS = [
  { id: 'salsa-extra', name: 'Salsa extra', price: 5 },
  { id: 'queso-extra', name: 'Queso extra', price: 5 },
  { id: 'tocino-extra', name: 'Tocino extra', price: 10 },
  { id: 'jamon-extra', name: 'Jamon extra', price: 10 },
  { id: 'huevo-extra', name: 'Huevo extra', price: 10 }
];

const PAPAS_EXTRAS = [
  { id: 'salsa-extra', name: 'Salsa extra', price: 5 },
  { id: 'queso-extra', name: 'Queso extra', price: 5 },
  { id: 'salsa-queso', name: 'Salsa de queso', price: 10 },
  { id: 'tocino-extra', name: 'Tocino extra', price: 10 }
];

const DEFAULT_EXTRAS = [
  { id: 'salsa-extra', name: 'Salsa extra', price: 5 }
];

type NotificationType = 'error' | 'warning' | 'info';

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

interface Extra {
  id: string;
  name: string;
  price: number;
}

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
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: NotificationType = 'warning') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const validateSelections = (): boolean => {
    if (item?.category === 'Hot Cakes Minis') {
      if (!selectedFruit) {
        addNotification('🍎 Por favor selecciona una fruta para los Hot Cakes Minis', 'error');
        return false;
      }
      if (!selectedSpread) {
        addNotification('🍯 Por favor selecciona un untable para los Hot Cakes Minis', 'error');
        return false;
      }
      return true;
    }

    if (item?.category === 'Hamburguesas') {
      if (!selectedBurgerOption) {
        addNotification('🍔 Por favor selecciona el tipo de hamburguesa', 'error');
        return false;
      }
      return true;
    }

    if (item?.id === 'hotcakes-fruta') {
      if (!selectedFruit) {
        addNotification('🍎 Por favor selecciona una fruta para los Hot Cakes', 'error');
        return false;
      }
      if (!selectedSpread) {
        addNotification('🍯 Por favor selecciona un untable para los Hot Cakes', 'error');
        return false;
      }
      return true;
    }

    if (item?.id === 'hotcakes-fresa-chocolate') {
      if (!selectedSpread) {
        addNotification('🍫 Por favor selecciona un untable para los Hot Cakes', 'error');
        return false;
      }
      if (selectedSpread !== 'chocolate') {
        addNotification('🍫 Este producto solo está disponible con untable de chocolate', 'error');
        return false;
      }
      return true;
    }

    if (item?.category === 'Hot Cakes' && item?.id !== 'hotcakes-sencillo' && item?.id !== 'hotcakes-philadelphia') {
      if (!selectedSpread) {
        addNotification('🍯 Por favor selecciona un untable para los Hot Cakes', 'error');
        return false;
      }
      return true;
    }

    return true;
  };

  const isConfirmDisabled = (): boolean => {
    if (item?.category === 'Hot Cakes Minis') {
      return !selectedFruit || !selectedSpread;
    }
    if (item?.id === 'hotcakes-fruta') {
      return !selectedFruit || !selectedSpread;
    }
    if (item?.id === 'hotcakes-fresa-chocolate') {
      return !selectedSpread || selectedSpread !== 'chocolate';
    }
    if (item?.category === 'Hot Cakes' && item?.id !== 'hotcakes-sencillo' && item?.id !== 'hotcakes-philadelphia') {
      return !selectedSpread;
    }
    if (item?.category === 'Hamburguesas') {
      return !selectedBurgerOption;
    }
    return false;
  };

  useEffect(() => {
    if (item) {
      setCurrentImage(item.image);
      setSelectedSpread(null);
      setSelectedFruit(null);
      setSelectedExtras([]);
      setSelectedProtein(null);
      setObservations('');
      setSelectedBurgerOption('clasica');
      setNotifications([]);

      if (item.category === 'Hot Cakes Minis') {
        setSelectedSize('10');
      } else {
        setSelectedSize('mediana');
      }
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;

    if (item.category === 'Chilaquiles' && selectedProtein) {
      setCurrentImage('./menu/chilaquilesHuevi.jpg');
    } 
    else if (item.category === 'Hot Cakes Minis') {
      if (selectedFruit === 'manzana') {
        setCurrentImage('./menu/mini-manzana.jpg');
      } else if (selectedFruit === 'platano') {
        setCurrentImage('./menu/mini-platano.png');
      } else if (selectedFruit === 'fresa') {
        setCurrentImage('./menu/mini-fresa.jpg');
      } else {
        setCurrentImage(item.image);
      }
    }
    else if (item.id === 'hotcakes-fruta') {
      if (selectedFruit === 'manzana') {
        setCurrentImage('./menu/hotcake-manza.jpg');
      } else if (selectedFruit === 'platano') {
        setCurrentImage('./menu/hotcakes-platano.jpg');
      } else {
        setCurrentImage(item.image);
      }
    } 
    else if (item.id === 'hotcakes-fresa-chocolate') {
      setCurrentImage('./menu/hotcakes-fresa.jpg');
    } 
    else if (item.id === 'hotcakes-philadelphia') {
      setCurrentImage('./menu/hotcakes.jpg');
    }
    else if (item.category === 'Hamburguesas') {
      if (selectedBurgerOption === 'clasica') {
        setCurrentImage('./menu/hamburguesa-a.png');
      } else if (selectedBurgerOption === 'con-papas') {
        setCurrentImage('./menu/hamPapas.jpg');
      } else {
        setCurrentImage(item.image);
      }
    }
    else {
      setCurrentImage(item.image);
    }
  }, [selectedFruit, selectedProtein, selectedBurgerOption, item]);

  if (!isOpen || !item) return null;

  const category = item.category.toLowerCase();

  const isBebida =
    category.includes('bebida') ||
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

  const canHaveFruit =
    isHotCakesMinis ||
    item.id === 'hotcakes-fruta' ||
    item.id === 'hotcakes-fresa-chocolate';

  const canHaveSpread =
    isHotCakesMinis ||
    item.id === 'hotcakes-sencillo' ||
    item.id === 'hotcakes-fruta' ||
    item.id === 'hotcakes-fresa-chocolate';

  const getExtrasList = (): Extra[] => {
    if (isBebida) return [];
    if (isHotCakes || isHotCakesMinis) return HOTCAKES_EXTRAS;
    if (isChilaquiles) return CHILAQUILES_EXTRAS;
    if (isSandwiches || isHamburguesas || isHotDogs || isBurritas) return SANDWICHES_EXTRAS;
    if (isPapas) return PAPAS_EXTRAS;
    return DEFAULT_EXTRAS;
  };

  const handleExtraToggle = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
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
    if (!validateSelections()) {
      return;
    }

    onConfirm(
      item,
      quantity,
      selectedBurgerOption,
      selectedExtras,
      observations,
      selectedProtein || undefined,
      selectedFruit || undefined,
      selectedSpread || undefined
    );

    addNotification('✅ Producto agregado al carrito', 'info');

    setQuantity(1);
    setSelectedSize(isHotCakesMinis ? '10' : 'mediana');
    setSelectedSpread(null);
    setSelectedFruit(null);
    setSelectedExtras([]);
    setSelectedProtein(null);
    setSelectedBurgerOption('clasica');
    setObservations('');
    setNotifications([]);
    
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const extrasList = getExtrasList();
  const selectedExtrasObjects = extrasList.filter(extra => selectedExtras.includes(extra.id));
  const extrasCost = selectedExtrasObjects.reduce((total, extra) => total + extra.price, 0);

  const getBasePrice = () => {
    if (isChilaquiles) return selectedSize === 'mediana' ? 60 : 80;
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

  const hasSelections =
    !!selectedProtein ||
    selectedExtras.length > 0 ||
    !!selectedSpread ||
    !!selectedFruit ||
    (isChilaquiles && selectedSize !== 'mediana') ||
    (isHotCakesMinis && selectedSize !== '10') ||
    (isHamburguesas && selectedBurgerOption !== 'clasica');

  const confirmDisabled = isConfirmDisabled();

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.notificationContainer}>
          {notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`${styles.notification} ${styles[notification.type]}`}
            >
              <Icon 
                name={notification.type === 'error' ? 'exclamation-circle' : 'information-circle'} 
                className={styles.notificationIcon}
              />
              <span>{notification.message}</span>
            </div>
          ))}
        </div>

        <div className={styles.header}>
          <h3 className={styles.title}>Personaliza tu pedido</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <Icon name="x-mark" className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={`${styles.productImageSection} ${hasSelections ? styles.selected : ''}`}>
            <div className={styles.productImageContainer}>
              <img src={currentImage} alt={item.name} className={styles.productImage} />
              <span className={styles.imageBadge}>✓</span>
            </div>

            <div className={styles.productInfo}>
              <h4 className={styles.productName}>{item.name}</h4>
              {item.description && <p className={styles.productDescription}>{item.description}</p>}
              {isBebida && (
                <div className={styles.bebidaTag}>
                  <span>Bebida</span>
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

          {isHamburguesas && (
            <div className={styles.section}>
              <label className={styles.label}>
                Elige tu hamburguesa
                <span className={styles.requiredStar}>*</span>
              </label>
              <div className={styles.burgerOptions}>
                {HAMBURGUESA_OPTIONS.map(option => (
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
              {!selectedBurgerOption && isHamburguesas && (
                <p className={styles.warningText}>⚠️ Es necesario seleccionar un tipo de hamburguesa</p>
              )}
            </div>
          )}

          {isHotCakesMinis && (
            <>
              <div className={styles.section}>
                <label className={styles.label}>Selecciona el tamaño</label>
                <div className={styles.minisSizeOptions}>
                  {MINIS_SIZE_OPTIONS.map(size => (
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

              <div className={styles.section}>
                <label className={styles.label}>
                  Selecciona una fruta
                  <span className={styles.requiredStar}>*</span>
                </label>
                <div className={styles.fruitOptions}>
                  {MINIS_FRUIT_OPTIONS.map(fruit => (
                    <button
                      key={fruit.id}
                      className={`${styles.fruitButton} ${selectedFruit === fruit.id ? styles.active : ''}`}
                      onClick={() => handleFruitSelect(fruit.id)}
                    >
                      <span className={styles.fruitName}>{fruit.name}</span>
                    </button>
                  ))}
                </div>
                {!selectedFruit && isHotCakesMinis && (
                  <p className={styles.warningText}>⚠️ Es necesario seleccionar una fruta</p>
                )}
              </div>

              <div className={styles.section}>
                <label className={styles.label}>
                  Selecciona un untable
                  <span className={styles.requiredStar}>*</span>
                </label>
                <div className={styles.spreadOptions}>
                  {SPREAD_OPTIONS.map(spread => (
                    <button
                      key={spread.id}
                      className={`${styles.spreadButton} ${selectedSpread === spread.id ? styles.active : ''}`}
                      onClick={() => handleSpreadSelect(spread.id)}
                    >
                      <span className={styles.spreadName}>{spread.name}</span>
                    </button>
                  ))}
                </div>
                {!selectedSpread && isHotCakesMinis && (
                  <p className={styles.warningText}>⚠️ Es necesario seleccionar un untable</p>
                )}
              </div>
            </>
          )}

          {isHotCakes && canHaveSpread && (
            <div className={styles.section}>
              <label className={styles.label}>
                Selecciona un untable
                {item.id !== 'hotcakes-sencillo' && item.id !== 'hotcakes-philadelphia' && <span className={styles.requiredStar}>*</span>}
              </label>
              <div className={styles.spreadOptions}>
                {SPREAD_OPTIONS.map(spread => {
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
              {!selectedSpread && item.id !== 'hotcakes-sencillo' && item.id !== 'hotcakes-philadelphia' && (
                <p className={styles.warningText}>⚠️ Es necesario seleccionar un untable</p>
              )}
            </div>
          )}

          {isHotCakes && canHaveFruit && item.id === 'hotcakes-fruta' && (
            <div className={styles.section}>
              <label className={styles.label}>
                Selecciona una fruta
                <span className={styles.requiredStar}>*</span>
              </label>
              <div className={styles.fruitOptions}>
                {MINIS_FRUIT_OPTIONS.filter(f => f.id === 'manzana' || f.id === 'platano').map(fruit => (
                  <button
                    key={fruit.id}
                    className={`${styles.fruitButton} ${selectedFruit === fruit.id ? styles.active : ''}`}
                    onClick={() => handleFruitSelect(fruit.id)}
                  >
                    <span className={styles.fruitName}>{fruit.name}</span>
                  </button>
                ))}
              </div>
              {!selectedFruit && (
                <p className={styles.warningText}>⚠️ Es necesario seleccionar una fruta</p>
              )}
            </div>
          )}

          {isChilaquiles && (
            <>
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

              <div className={styles.section}>
                <label className={styles.label}>Proteína extra (+$10)</label>
                <div className={styles.proteinOptions}>
                  <button
                    className={`${styles.proteinButton} ${selectedProtein === 'huevo' ? styles.active : ''}`}
                    onClick={() => handleProteinToggle('huevo')}
                  >
                    <Icon name="sun" className={styles.proteinIcon} />
                    <span className={styles.proteinName}>Huevo estrellado</span>
                    <span className={styles.proteinPrice}>+$10</span>
                  </button>
                </div>
                {selectedProtein === 'huevo' && (
                  <p className={styles.note}>
                    <Icon name="check" className={styles.noteIcon} />
                    Huevo agregado
                  </p>
                )}
              </div>
            </>
          )}

          {/* SECCIÓN DE CANTIDAD MEJORADA */}
          <div className={styles.quantitySection}>
            <div className={styles.quantityHeader}>
              <Icon name="queue-list" className={styles.quantityHeaderIcon} />
              <span className={styles.quantityLabel}>Cantidad</span>
            </div>
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
              >
                <Icon name="minus" className={styles.quantityIcon} />
              </button>
              <div className={styles.quantityValueContainer}>
                <span className={styles.quantityValue}>{quantity}</span>
                <span className={styles.quantityUnit}>pieza(s)</span>
              </div>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(prev => prev + 1)}
              >
                <Icon name="plus" className={styles.quantityIcon} />
              </button>
            </div>
          </div>

          {/* SECCIÓN DE EXTRAS MEJORADA */}
          {!isBebida && extrasList.length > 0 && (
            <div className={styles.extrasSection}>
              <div className={styles.extrasHeader}>
                <Icon name="gift" className={styles.extrasHeaderIcon} />
                <span className={styles.extrasLabel}>
                  {isHotCakes || isHotCakesMinis ? 'Extras adicionales' : 'Extras'}
                </span>
                <span className={styles.extrasBadge}>+${extrasCost * quantity}</span>
              </div>
              
              <div className={styles.extrasGrid}>
                {extrasList.map(extra => {
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <label 
                      key={extra.id} 
                      className={`${styles.extraCard} ${isSelected ? styles.selected : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleExtraToggle(extra.id)}
                        className={styles.extraCheckbox}
                      />
                      <div className={styles.extraContent}>
                        <span className={styles.extraName}>{extra.name}</span>
                        <span className={styles.extraPrice}>+${extra.price}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
              
              {selectedExtras.length > 0 && (
                <div className={styles.selectedExtrasSummary}>
                  <Icon name="check" className={styles.summaryIcon} />
                  <span>{selectedExtras.length} extra(s) seleccionado(s)</span>
                </div>
              )}
            </div>
          )}

          {isBebida && (
            <div className={styles.infoMessage}>
              <Icon name="information-circle" className={styles.infoIcon} />
              <span>Las bebidas no tienen extras disponibles</span>
            </div>
          )}

          <div className={styles.section}>
            <label className={styles.label}>
              <Icon name="pencil" className={styles.labelIcon} />
              Observaciones
            </label>
            <textarea
              className={styles.textarea}
              placeholder={isBebida ? "Ej: Sin hielo, temperatura ambiente, etc." : "Ej: Sin cebolla, bien cocido, sin azúcar, etc."}
              value={observations}
              onChange={e => setObservations(e.target.value)}
              rows={3}
            />
          </div>

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

          <div className={styles.actions}>
            <Button variant="outline" onClick={onClose} fullWidth>Cancelar</Button>
            <Button 
              variant="primary" 
              onClick={handleConfirm} 
              fullWidth
              disabled={confirmDisabled}
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};