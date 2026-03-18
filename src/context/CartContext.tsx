import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { CartItem, CartState, CustomerData, CartAction } from './types';

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  customerData: CustomerData;
  updateCustomerData: (data: Partial<CustomerData>) => void;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0
};

const initialCustomerData: CustomerData = {
  nombre: '',
  direccion: '',  // Cambiado de 'apellido' a 'direccion'
  metodoPago: 'efectivo',
  necesitaCambio: false,
  pagoCon: undefined
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => 
          item.productId === action.payload.productId &&
          JSON.stringify(item.selectedOptions) === JSON.stringify(action.payload.selectedOptions) &&
          JSON.stringify(item.selectedExtras) === JSON.stringify(action.payload.selectedExtras)
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        newItems = [...state.items, action.payload];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return { items: newItems, totalItems, subtotal };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: newItems, totalItems, subtotal };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return { items: newItems, totalItems, subtotal };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [customerData, setCustomerData] = React.useState<CustomerData>(initialCustomerData);

  // Persistir carrito en localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        if (parsed.items && Array.isArray(parsed.items)) {
          parsed.items.forEach((item: CartItem) => {
            dispatch({ type: 'ADD_ITEM', payload: item });
          });
        }
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
      }
    }
  }, []);

  // Persistir datos del cliente en localStorage
  useEffect(() => {
    const savedCustomerData = localStorage.getItem('customerData');
    if (savedCustomerData) {
      try {
        const parsed = JSON.parse(savedCustomerData);
        setCustomerData(parsed);
      } catch (error) {
        console.error('Error al cargar datos del cliente:', error);
      }
    }
  }, []);

  // Guardar carrito cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({ items: state.items }));
  }, [state.items]);

  // Guardar datos del cliente cuando cambien
  useEffect(() => {
    localStorage.setItem('customerData', JSON.stringify(customerData));
  }, [customerData]);

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    } else {
      removeItem(id);
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  };

  const updateCustomerData = (data: Partial<CustomerData>) => {
    setCustomerData(prev => ({ ...prev, ...data }));
  };

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      customerData,
      updateCustomerData
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};