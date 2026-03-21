import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    subtotal, 
    clearCart,
    customerData,
    updateCustomerData 
  } = useCart();

  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  // Reset scroll position when drawer opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  // Manejar el scroll para asegurar que el botón sea visible
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        lastScrollTop.current = contentRef.current.scrollTop;
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Función para hacer scroll al botón de WhatsApp cuando sea necesario
  const scrollToBottom = () => {
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollTo({
          top: contentRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const bankDetails = {
    bank: 'AZTECA',
    cardNumber: '4027 6658 6096 5525',
    name: 'Ayde Salazar'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppMessage = () => {
    const itemsList = items.map(item => {
      let itemText = `🍽 *${item.quantity}x ${item.name}*`;
      
      if (item.selectedOptions?.length) {
        itemText += `\n   🧈 Untables: ${item.selectedOptions.join(', ')}`;
      }
      
      if (item.selectedExtras?.length) {
        itemText += `\n   🍓 Frutas extra: ${item.selectedExtras.join(', ')}`;
      }
      
      if (item.observations) {
        itemText += `\n   📝 Nota: ${item.observations}`;
      }
      
      itemText += `\n   💰 Subtotal: $${item.price * item.quantity}`;
      return itemText;
    }).join('\n\n');

    let message = `*NUEVO PEDIDO - LA CASITA*\n\n`;
    message += `👤 *Cliente:* ${customerData.nombre}\n`;
    message += `📍 *Dirección:* ${customerData.direccion || 'No especificada'}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📋 *DETALLE DEL PEDIDO:*\n\n`;
    message += itemsList;
    message += `\n\n━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `💰 *SUBTOTAL: $${subtotal}*\n`;
    message += `🚚 *Envío: Gratis*\n`;
    message += `💵 *TOTAL: $${subtotal}*\n\n`;
    
    if (customerData.metodoPago === 'efectivo') {
      message += `💵 *Método de pago:* Efectivo\n`;

      if (customerData.necesitaCambio && customerData.pagoCon) {
        const cambio = customerData.pagoCon - subtotal;
        message += `   💵 Paga con: $${customerData.pagoCon}\n`;
        message += `   💰 Cambio: $${cambio}\n`;
      }
    } else {
      message += `💳 *Método de pago:* Transferencia\n\n`;
      message += `🏦 *DATOS BANCARIOS:*\n`;
      message += `   Banco: ${bankDetails.bank}\n`;
      message += `   💳 Número: ${bankDetails.cardNumber}\n`;
      message += `   👤 Titular: ${bankDetails.name}\n\n`;
      message += `📸 *IMPORTANTE:* Enviar comprobante de pago por este chat\n`;
    }
    
    message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `⏰ *Tiempo de preparación:* 25-30 minutos\n`;
    message += `🙏 ¡Gracias por tu pedido!\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🏠 *La Casita Desayunos* 🏠`;
    
    return message;
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = '529961332194';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  // Efecto para hacer scroll cuando se abre el teclado
  useEffect(() => {
    const handleFocus = () => {
      setTimeout(scrollToBottom, 300);
    };

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', () => {
        setTimeout(() => {
          if (contentRef.current && lastScrollTop.current > 0) {
            contentRef.current.scrollTop = lastScrollTop.current;
          }
        }, 100);
      });
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
      });
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Icon name="shopping-cart" className={styles.titleIcon} />
            Tu Pedido
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <Icon name="x-mark" className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.content} ref={contentRef}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <Icon name="shopping-cart" className={styles.emptyCartIcon} />
              <p>Tu carrito está vacío</p>
              <Button variant="primary" onClick={onClose}>
                Ver Menú
              </Button>
            </div>
          ) : (
            <>
              {/* ITEMS DEL CARRITO */}
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemQuantity}>
                        <Icon name="queue-list" className={styles.itemIcon} />
                        Cantidad: {item.quantity}
                      </p>
                      <p className={styles.itemPrice}>
                        <Icon name="currency-dollar" className={styles.itemIcon} />
                        ${item.price} c/u
                      </p>

                      {Array.isArray(item.selectedOptions) && item.selectedOptions.length > 0 && (
                        <p className={styles.itemDetails}>
                          <Icon name="cake" className={styles.itemIcon} />
                          Untables: {item.selectedOptions.join(', ')}
                        </p>
                      )}

                      {Array.isArray(item.selectedExtras) && item.selectedExtras.length > 0 && (
                        <p className={styles.itemDetails}>
                          <Icon name="gift" className={styles.itemIcon} />
                          Frutas: {item.selectedExtras.join(', ')}
                        </p>
                      )}

                      {item.observations && (
                        <p className={styles.itemNote}>
                          <Icon name="pencil" className={styles.itemIcon} />
                          Nota: {item.observations}
                        </p>
                      )}
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="minus" className={styles.quantityIcon} />
                        </button>

                        <span className={styles.quantityValue}>
                          {item.quantity}
                        </span>

                        <button
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="plus" className={styles.quantityIcon} />
                        </button>
                      </div>

                      <button
                        className={styles.removeButton}
                        onClick={() => removeItem(item.id)}
                      >
                        <Icon name="trash" className={styles.removeIcon} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DATOS DEL CLIENTE */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <Icon name="user" className={styles.sectionIcon} />
                  Tus datos
                </h3>

                <div className={styles.formGroup}>
                  <div className={styles.inputWrapper}>
                    <Icon name="user" className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={customerData.nombre}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData({ nombre: e.target.value })
                      }
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputWrapper}>
                    <Icon name="map-pin" className={styles.inputIcon} />
                    <input
                      type="text"
                      placeholder="Dirección de entrega"
                      value={customerData.direccion}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomerData({ direccion: e.target.value })
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              {/* MÉTODO DE PAGO */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <Icon name="credit-card" className={styles.sectionIcon} />
                  Método de pago
                </h3>

                <div className={styles.paymentOptions}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={customerData.metodoPago === 'efectivo'}
                      onChange={() =>
                        updateCustomerData({
                          metodoPago: 'efectivo',
                          necesitaCambio: false,
                          pagoCon: undefined
                        })
                      }
                    />
                    <Icon name="cash" className={styles.radioIcon} />
                    <span>Efectivo</span>
                  </label>

                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={customerData.metodoPago === 'transferencia'}
                      onChange={() =>
                        updateCustomerData({ metodoPago: 'transferencia' })
                      }
                    />
                    <Icon name="banknotes" className={styles.radioIcon} />
                    <span>Transferencia</span>
                  </label>
                </div>

                {customerData.metodoPago === 'efectivo' && (
                  <div className={styles.changeSection}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={customerData.necesitaCambio}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          updateCustomerData({
                            necesitaCambio: e.target.checked,
                            pagoCon: e.target.checked
                              ? customerData.pagoCon
                              : undefined
                          })
                        }
                      />
                      <Icon name="currency-dollar" className={styles.checkboxIcon} />
                      <span>¿Necesitas cambio?</span>
                    </label>

                    {customerData.necesitaCambio && (
                      <div className={styles.inputWrapper}>
                        <Icon name="cash" className={styles.inputIcon} />
                        <input
                          type="number"
                          placeholder="¿Con cuánto pagas?"
                          value={customerData.pagoCon || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateCustomerData({
                              pagoCon: Number(e.target.value)
                            })
                          }
                          className={styles.input}
                        />
                      </div>
                    )}
                  </div>
                )}

                {customerData.metodoPago === 'transferencia' && (
                  <>
                    <button
                      className={styles.showBankButton}
                      onClick={() =>
                        setShowPaymentDetails(!showPaymentDetails)
                      }
                    >
                      <Icon name={showPaymentDetails ? 'eye-slash' : 'eye'} className={styles.buttonIcon} />
                      {showPaymentDetails
                        ? 'Ocultar datos bancarios'
                        : 'Ver datos bancarios'}
                    </button>

                    {showPaymentDetails && (
                      <div className={styles.bankDetails}>
                        <div className={styles.bankRow}>
                          <Icon name="banknotes" className={styles.bankIcon} />
                          <span>Banco:</span>
                          <span className={styles.bankValue}>{bankDetails.bank}</span>
                        </div>
                        
                        <div className={styles.bankRow}>
                          <Icon name="credit-card" className={styles.bankIcon} />
                          <span>Número de tarjeta:</span>
                          <div className={styles.copyContainer}>
                            <span className={styles.bankValue}>{bankDetails.cardNumber}</span>
                            <button
                              className={styles.copyButton}
                              onClick={() => copyToClipboard(bankDetails.cardNumber)}
                              title="Copiar número de tarjeta"
                            >
                              <Icon name="clipboard-document" className={styles.copyIcon} />
                            </button>
                          </div>
                        </div>
                        
                        <div className={styles.bankRow}>
                          <Icon name="user" className={styles.bankIcon} />
                          <span>Titular:</span>
                          <span className={styles.bankValue}>{bankDetails.name}</span>
                        </div>
                        
                        {copied && (
                          <p className={styles.copySuccess}>
                            <Icon name="check" className={styles.successIcon} />
                            ¡Número copiado!
                          </p>
                        )}
                        
                        <p className={styles.note}>
                          <Icon name="phone" className={styles.noteIcon} />
                          IMPORTANTE: Enviar comprobante de pago por WhatsApp
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* TOTAL */}
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>
                    <Icon name="currency-dollar" className={styles.summaryIcon} />
                    Subtotal:
                  </span>
                  <span>${subtotal}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>
                    <Icon name="truck" className={styles.summaryIcon} />
                    Envío:
                  </span>
                  <span>Gratis</span>
                </div>

                <div className={styles.totalRow}>
                  <span>
                    <Icon name="banknotes" className={styles.totalIcon} />
                    TOTAL:
                  </span>
                  <span>${subtotal}</span>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className={styles.actions}>
                <Button variant="outline" onClick={clearCart} fullWidth>
                  <Icon name="trash" className={styles.buttonIcon} />
                  Vaciar carrito
                </Button>

                <Button
                  variant="whatsapp"
                  onClick={handleWhatsAppClick}
                  fullWidth
                  disabled={!customerData.nombre || !customerData.direccion}
                >
                  <Icon name="whatsapp" className={styles.buttonIcon} />
                  Enviar pedido por WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};