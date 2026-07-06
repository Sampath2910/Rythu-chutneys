import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  nameEn: string;
  nameTe: string;
  weight: '250g' | '500g' | '1kg';
  weightLabel?: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

export interface DeliveryDetails {
  distance: number;
  fee: number;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  eligible: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  deliveryDetails: DeliveryDetails | null;
  setDeliveryDetails: (details: DeliveryDetails | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rythu_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [deliveryDetails, setDeliveryState] = useState<DeliveryDetails | null>(() => {
    const saved = localStorage.getItem('rythu_delivery');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('rythu_cart', JSON.stringify(cart));
  }, [cart]);

  const setDeliveryDetails = (details: DeliveryDetails | null) => {
    setDeliveryState(details);
    if (details) {
      localStorage.setItem('rythu_delivery', JSON.stringify(details));
    } else {
      localStorage.removeItem('rythu_delivery');
    }
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, qty = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === newItem.productId && item.weight === newItem.weight
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += qty;
        return updatedCart;
      }

      return [...prevCart, { ...newItem, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.productId === productId && item.weight === weight))
    );
  };

  const updateQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.weight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDeliveryDetails(null);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryDetails,
        setDeliveryDetails
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
