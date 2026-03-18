import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
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

  const bankDetails = {
    bank: 'BBVA',
    cardNumber: '1234 5678 9012 3456',
    name: 'La Casita Desayunos'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppMessage = () => {
    // Usar caracteres simples en lugar de emojis complejos
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

    // Construir mensaje con emojis básicos que WhatsApp soporta bien
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
    message += `⏰ *Tiempo de preparación:* 15-20 minutos\n`;
    message += `🙏 ¡Gracias por tu pedido!\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🏠 *La Casita Desayunos* 🏠`;
    
    return message;
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = '529961136244';
    
    // Codificar el mensaje correctamente
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>🍽️ Tu Pedido</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>🛒 Tu carrito está vacío</p>
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
                      <p className={styles.itemQuantity}>📦 Cantidad: {item.quantity}</p>
                      <p className={styles.itemPrice}>💰 ${item.price} c/u</p>

                      {Array.isArray(item.selectedOptions) && item.selectedOptions.length > 0 && (
                        <p className={styles.itemDetails}>
                          🧈 Untables: {item.selectedOptions.join(', ')}
                        </p>
                      )}

                      {Array.isArray(item.selectedExtras) && item.selectedExtras.length > 0 && (
                        <p className={styles.itemDetails}>
                          🍓 Frutas: {item.selectedExtras.join(', ')}
                        </p>
                      )}

                      {item.observations && (
                        <p className={styles.itemNote}>
                          📝 Nota: {item.observations}
                        </p>
                      )}
                    </div>

                    <div className={styles.itemActions}>
                      <div className={styles.quantityControls}>
                        <button
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>

                        <span className={styles.quantityValue}>
                          {item.quantity}
                        </span>

                        <button
                          className={styles.quantityButton}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className={styles.removeButton}
                        onClick={() => removeItem(item.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* DATOS DEL CLIENTE */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>👤 Tus datos</h3>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={customerData.nombre}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateCustomerData({ nombre: e.target.value })
                    }
                    className={styles.input}
                  />

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

              {/* MÉTODO DE PAGO */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>💳 Método de pago</h3>

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
                    <span>💵 Efectivo</span>
                  </label>

                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={customerData.metodoPago === 'transferencia'}
                      onChange={() =>
                        updateCustomerData({ metodoPago: 'transferencia' })
                      }
                    />
                    <span>💳 Transferencia</span>
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
                      <span>💵 ¿Necesitas cambio?</span>
                    </label>

                    {customerData.necesitaCambio && (
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
                      {showPaymentDetails
                        ? '🔒 Ocultar datos bancarios'
                        : '🔓 Ver datos bancarios'}
                    </button>

                    {showPaymentDetails && (
                      <div className={styles.bankDetails}>
                        <div className={styles.bankRow}>
                          <span>🏦 Banco:</span>
                          <span className={styles.bankValue}>{bankDetails.bank}</span>
                        </div>
                        
                        <div className={styles.bankRow}>
                          <span>💳 Número de tarjeta:</span>
                          <div className={styles.copyContainer}>
                            <span className={styles.bankValue}>{bankDetails.cardNumber}</span>
                            <button
                              className={styles.copyButton}
                              onClick={() => copyToClipboard(bankDetails.cardNumber)}
                              title="Copiar número de tarjeta"
                            >
                              📋
                            </button>
                          </div>
                        </div>
                        
                        <div className={styles.bankRow}>
                          <span>👤 Titular:</span>
                          <span className={styles.bankValue}>{bankDetails.name}</span>
                        </div>
                        
                        {copied && (
                          <p className={styles.copySuccess}>✓ ¡Número copiado!</p>
                        )}
                        
                        <p className={styles.note}>
                          📸 *IMPORTANTE:* Enviar comprobante de pago por WhatsApp
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* TOTAL */}
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>💰 Subtotal:</span>
                  <span>${subtotal}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>🚚 Envío:</span>
                  <span>Gratis</span>
                </div>

                <div className={styles.totalRow}>
                  <span>💵 TOTAL:</span>
                  <span>${subtotal}</span>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN */}
              <div className={styles.actions}>
                <Button variant="outline" onClick={clearCart} fullWidth>
                  🗑️ Vaciar carrito
                </Button>

                <Button
                  variant="whatsapp"
                  onClick={handleWhatsAppClick}
                  fullWidth
                  disabled={!customerData.nombre || !customerData.direccion}
                >
                  📱 Enviar pedido por WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};