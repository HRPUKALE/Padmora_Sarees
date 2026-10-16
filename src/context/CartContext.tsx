import React, { createContext, useContext, useState, useEffect } from 'react';
import { Saree } from '../types/saree';

export interface CartItem {
  saree: Saree;
  selectedColor: string;
  selectedVariantId?: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (saree: Saree, colorName?: string) => void;
  removeFromCart: (sareeId: number, colorName: string) => void;
  updateQuantity: (sareeId: number, colorName: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('padmora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('padmora_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  const addToCart = (saree: Saree, colorName?: string) => {
    const color = colorName || saree.colour || 'Classic';
    setItems(prev => {
      const existing = prev.find(i => i.saree.id === saree.id && i.selectedColor === color);
      if (existing) {
        return prev.map(i =>
          i.saree.id === saree.id && i.selectedColor === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { saree, selectedColor: color, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (sareeId: number, colorName: string) => {
    setItems(prev => prev.filter(i => !(i.saree.id === sareeId && i.selectedColor === colorName)));
  };

  const updateQuantity = (sareeId: number, colorName: string, delta: number) => {
    setItems(prev =>
      prev
        .map(i => {
          if (i.saree.id === sareeId && i.selectedColor === colorName) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.saree.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
