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

  const bankDetails = {
    bank: 'BBVA',
    account: '1234 5678 9012 3456',
    clabe: '012345678901234567',
    name: 'La Casita Desayunos'
  };

  const generateWhatsAppMessage = () => {
    let message = `*NUEVO PEDIDO - LA CASITA*\n\n`;
    message += `Cliente: ${customerData.nombre} ${customerData.apellido}\n\n`;
    message += `----------------------------------------\n\n`;
    
    items.forEach((item) => {
      message += `${item.quantity}x ${item.name}\n`;
      
      if (item.selectedOptions?.length) {
        message += `  Untables: ${item.selectedOptions.join(', ')}\n`;
      }
      
      if (item.selectedExtras?.length) {
        message += `  Frutas extra: ${item.selectedExtras.join(', ')}\n`;
      }
      
      if (item.observations) {
        message += `  Nota: ${item.observations}\n`;
      }
      
      const itemTotal = item.price * item.quantity;
      message += `  Subtotal: $${itemTotal}\n\n`;
    });
    
    message += `----------------------------------------\n`;
    message += `SUBTOTAL: $${subtotal}\n`;
    
    if (customerData.metodoPago === 'efectivo') {
      message += `Método de pago: Efectivo\n`;

      if (customerData.necesitaCambio && customerData.pagoCon) {
        const cambio = customerData.pagoCon - subtotal;
        message += `Paga con: $${customerData.pagoCon}\n`;
        message += `Cambio: $${cambio}\n`;
      }
    } else {
      message += `Método de pago: Transferencia\n\n`;
      message += `DATOS BANCARIOS:\n`;
      message += `Banco: ${bankDetails.bank}\n`;
      message += `Cuenta: ${bankDetails.account}\n`;
      message += `CLABE: ${bankDetails.clabe}\n`;
      message += `Titular: ${bankDetails.name}\n\n`;
      message += `IMPORTANTE: Enviar comprobante de pago por este chat\n`;
    }
    
    message += `\n----------------------------------------\n`;
    message += `LA CASITA - Desayunos y Masa\n`;
    message += `Tiempo de preparación: 15-20 minutos\n`;
    message += `Gracias por tu pedido!`;
    
    return message;
  };

  const handleWhatsAppClick = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = '529961136244';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      
      <div className={styles.drawer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tu Pedido</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Tu carrito está vacío</p>
              <Button variant="primary" onClick={onClose}>
                Ver Menú
              </Button>
            </div>
          ) : (
            <>
              {/* ITEMS */}
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <h4 className={styles.itemName}>{item.name}</h4>
                      <p className={styles.itemQuantity}>Cantidad: {item.quantity}</p>
                      <p className={styles.itemPrice}>${item.price} c/u</p>

                     {Array.isArray(item.selectedOptions) && item.selectedOptions.length > 0 && (
  <p className={styles.itemDetails}>
    Untables: {item.selectedOptions.join(', ')}
  </p>
)}

{Array.isArray(item.selectedExtras) && item.selectedExtras.length > 0 && (
  <p className={styles.itemDetails}>
    Frutas: {item.selectedExtras.join(', ')}
  </p>
)}

                      {item.observations && (
                        <p className={styles.itemNote}>
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

              {/* DATOS */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Tus datos</h3>

                <div className={styles.formRow}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={customerData.nombre}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateCustomerData({ nombre: e.target.value })
                    }
                    className={styles.input}
                  />

                  <input
                    type="text"
                    placeholder="Apellido"
                    value={customerData.apellido}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateCustomerData({ apellido: e.target.value })
                    }
                    className={styles.input}
                  />
                </div>
              </div>

              {/* PAGO */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Método de pago</h3>

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
                      <span>¿Necesitas cambio?</span>
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
                        ? 'Ocultar datos bancarios'
                        : 'Ver datos bancarios'}
                    </button>

                    {showPaymentDetails && (
                      <div className={styles.bankDetails}>
                        <p>Banco: {bankDetails.bank}</p>
                        <p>Cuenta: {bankDetails.account}</p>
                        <p>CLABE: {bankDetails.clabe}</p>
                        <p>Titular: {bankDetails.name}</p>
                        <p className={styles.note}>
                          Enviar comprobante por WhatsApp
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* TOTAL */}
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>Subtotal:</span>
                  <span>${subtotal}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>

                <div className={styles.totalRow}>
                  <span>TOTAL:</span>
                  <span>${subtotal}</span>
                </div>
              </div>

              {/* BOTONES */}
              <div className={styles.actions}>
                <Button variant="outline" onClick={clearCart} fullWidth>
                  Vaciar carrito
                </Button>

                <Button
                  variant="whatsapp"
                  onClick={handleWhatsAppClick}
                  fullWidth
                  disabled={!customerData.nombre || !customerData.apellido}
                >
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