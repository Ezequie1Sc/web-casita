import { useEffect, useState } from 'react';
import { Button } from './Button';
import styles from './ToastNotification.module.css';

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  onViewCart: () => void;
  onContinueShopping: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  isVisible,
  onClose,
  onViewCart,
  onContinueShopping,
  autoClose = true,
  duration = 7000
}) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsLeaving(false);
      onClose();
    }, 300);
  };

  const handleViewCart = () => {
    handleClose();
    onViewCart();
  };

  const handleContinueShopping = () => {
    handleClose();
    onContinueShopping();
  };

  if (!isVisible && !isLeaving) return null;

  return (
    <div className={`${styles.toastContainer} ${isLeaving ? styles.leaving : ''}`}>
      <div className={styles.toast}>
        <div className={styles.contentWrapper}>
          <div className={styles.messageContainer}>
            <div className={styles.successIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className={styles.message}>{message}</p>
          </div>
          
          <div className={styles.actions}>
            <Button 
              variant="outline" 
              size="md" 
              onClick={handleContinueShopping}
              className={styles.continueBtn}
            >
              Seguir comprando
            </Button>
            <Button 
              variant="primary" 
              size="md" 
              onClick={handleViewCart}
              className={styles.cartBtn}
            >
              Ver carrito
            </Button>
          </div>
        </div>

        <button className={styles.closeBtn} onClick={handleClose} aria-label="Cerrar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L13 13M3 13L13 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};