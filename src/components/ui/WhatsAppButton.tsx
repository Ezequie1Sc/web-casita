import React from 'react';
import { Button } from './Button';
import styles from './WhatsAppButton.module.css';

interface WhatsAppButtonProps {
  message: string;
  phoneNumber?: string;
  variant?: 'whatsapp' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message,
  phoneNumber = '529961136244',
  variant = 'whatsapp',
  size = 'md',
  fullWidth = false,
  className = ''
}) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={handleClick}
      icon={<i className="fab fa-whatsapp" />}
      className={`${styles.whatsappButton} ${className}`}
    >
      {variant === 'whatsapp' ? 'Pedir por WhatsApp' : 'WhatsApp'}
    </Button>
  );
};