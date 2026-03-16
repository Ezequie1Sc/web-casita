export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: string[];
  selectedExtras?: string[];
  observations?: string;
  category: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
}

export interface CustomerData {
  nombre: string;
  apellido: string;
  metodoPago: 'efectivo' | 'transferencia';
  necesitaCambio: boolean;
  pagoCon?: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };