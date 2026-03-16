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
  | 'minus';

interface IconProps {
  name: IconName;
  className?: string;
  outline?: boolean;
}

const iconMap: Record<IconName, any> = {
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
};

const outlineIconMap: Record<IconName, any> = {
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
};

export const Icon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', outline = false }) => {
  const IconComponent = outline ? outlineIconMap[name] : iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icono ${name} no encontrado`);
    return null;
  }

  return <IconComponent className={className} />;
};