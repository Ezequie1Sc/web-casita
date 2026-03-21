import React from 'react';
import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';

export type IconName = 
  | 'fire'
  | 'layers'
  | 'circle-stack'
  | 'beaker'
  | 'rectangle-stack'
  | 'minus'
  | 'chevron-right'
  | 'chevron-left'
  | 'queue-list'
  | 'shopping-cart'
  | 'x-mark'
  | 'plus'
  | 'magnifying-glass'
  | 'user'
  | 'map-pin'
  | 'cash'
  | 'banknotes'
  | 'credit-card'
  | 'check'
  | 'clipboard'
  | 'clipboard-document'
  | 'trash'
  | 'whatsapp'
  | 'truck'
  | 'currency-dollar'
  | 'eye'
  | 'eye-slash'
  | 'pencil'
  | 'cake'
  | 'gift'
  | 'phone'
  | 'envelope'
  | 'clock'
  // Nuevos iconos para el modal
  | 'exclamation-circle'
  | 'information-circle'
  | 'warning'
  | 'alert'
  | 'sun';

interface IconProps {
  name: IconName;
  className?: string;
  outline?: boolean;
}

const iconMap: Record<IconName, any> = {
  // Iconos existentes
  'fire': SolidIcons.FireIcon,
  'layers': SolidIcons.Squares2X2Icon,
  'circle-stack': SolidIcons.CircleStackIcon,
  'beaker': SolidIcons.BeakerIcon,
  'rectangle-stack': SolidIcons.RectangleStackIcon,
  'minus': SolidIcons.MinusIcon,
  'chevron-right': SolidIcons.ChevronRightIcon,
  'chevron-left': SolidIcons.ChevronLeftIcon,
  'queue-list': SolidIcons.QueueListIcon,
  'shopping-cart': SolidIcons.ShoppingCartIcon,
  'x-mark': SolidIcons.XMarkIcon,
  'plus': SolidIcons.PlusIcon,
  'magnifying-glass': SolidIcons.MagnifyingGlassIcon,
  
  // Nuevos iconos para CartDrawer
  'user': SolidIcons.UserIcon,
  'map-pin': SolidIcons.MapPinIcon,
  'cash': SolidIcons.BanknotesIcon,
  'banknotes': SolidIcons.BanknotesIcon,
  'credit-card': SolidIcons.CreditCardIcon,
  'check': SolidIcons.CheckIcon,
  'clipboard': SolidIcons.ClipboardIcon,
  'clipboard-document': SolidIcons.ClipboardDocumentIcon,
  'trash': SolidIcons.TrashIcon,
  'whatsapp': SolidIcons.PhoneIcon,
  'truck': SolidIcons.TruckIcon,
  'currency-dollar': SolidIcons.CurrencyDollarIcon,
  'eye': SolidIcons.EyeIcon,
  'eye-slash': SolidIcons.EyeSlashIcon,
  'pencil': SolidIcons.PencilIcon,
  'cake': SolidIcons.CakeIcon,
  'gift': SolidIcons.GiftIcon,
  'phone': SolidIcons.PhoneIcon,
  'envelope': SolidIcons.EnvelopeIcon,
  'clock': SolidIcons.ClockIcon,
  
  // Nuevos iconos para notificaciones y modal
  'exclamation-circle': SolidIcons.ExclamationCircleIcon,
  'information-circle': SolidIcons.InformationCircleIcon,
  'warning': SolidIcons.ExclamationTriangleIcon,
  'alert': SolidIcons.ExclamationTriangleIcon,
  
  // Icono para proteína (huevo) - usando SunIcon que representa un huevo frito
  'sun': SolidIcons.SunIcon,
};

const outlineIconMap: Record<IconName, any> = {
  // Iconos existentes
  'fire': OutlineIcons.FireIcon,
  'layers': OutlineIcons.Squares2X2Icon,
  'circle-stack': OutlineIcons.CircleStackIcon,
  'beaker': OutlineIcons.BeakerIcon,
  'rectangle-stack': OutlineIcons.RectangleStackIcon,
  'minus': OutlineIcons.MinusIcon,
  'chevron-right': OutlineIcons.ChevronRightIcon,
  'chevron-left': OutlineIcons.ChevronLeftIcon,
  'queue-list': OutlineIcons.QueueListIcon,
  'shopping-cart': OutlineIcons.ShoppingCartIcon,
  'x-mark': OutlineIcons.XMarkIcon,
  'plus': OutlineIcons.PlusIcon,
  'magnifying-glass': OutlineIcons.MagnifyingGlassIcon,
  
  // Nuevos iconos para CartDrawer
  'user': OutlineIcons.UserIcon,
  'map-pin': OutlineIcons.MapPinIcon,
  'cash': OutlineIcons.BanknotesIcon,
  'banknotes': OutlineIcons.BanknotesIcon,
  'credit-card': OutlineIcons.CreditCardIcon,
  'check': OutlineIcons.CheckIcon,
  'clipboard': OutlineIcons.ClipboardIcon,
  'clipboard-document': OutlineIcons.ClipboardDocumentIcon,
  'trash': OutlineIcons.TrashIcon,
  'whatsapp': OutlineIcons.PhoneIcon,
  'truck': OutlineIcons.TruckIcon,
  'currency-dollar': OutlineIcons.CurrencyDollarIcon,
  'eye': OutlineIcons.EyeIcon,
  'eye-slash': OutlineIcons.EyeSlashIcon,
  'pencil': OutlineIcons.PencilIcon,
  'cake': OutlineIcons.CakeIcon,
  'gift': OutlineIcons.GiftIcon,
  'phone': OutlineIcons.PhoneIcon,
  'envelope': OutlineIcons.EnvelopeIcon,
  'clock': OutlineIcons.ClockIcon,
  
  // Nuevos iconos para notificaciones y modal
  'exclamation-circle': OutlineIcons.ExclamationCircleIcon,
  'information-circle': OutlineIcons.InformationCircleIcon,
  'warning': OutlineIcons.ExclamationTriangleIcon,
  'alert': OutlineIcons.ExclamationTriangleIcon,
  
  // Icono para proteína (huevo) - usando SunIcon que representa un huevo frito
  'sun': OutlineIcons.SunIcon,
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', outline = false }) => {
  const IconComponent = outline ? outlineIconMap[name] : iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icono ${name} no encontrado`);
    return null;
  }

  return <IconComponent className={className} />;
};