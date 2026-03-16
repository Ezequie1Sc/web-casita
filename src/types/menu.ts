export interface Price {
  regular?: number;
  small?: number;
  medium?: number;
  large?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: Price;
  image: string;
  category: string;
  options?: string[];
  extras?: string[];
  isPopular?: boolean;
  isNew?: boolean;
  available?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
  icon?: string;
}