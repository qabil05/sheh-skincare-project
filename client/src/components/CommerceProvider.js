'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CommerceContext = createContext(null);
const STORAGE_KEY = 'sheh-cart-v2';

export default function CommerceProvider({ children }) {
  const [cart, setCart] = useState({});
  const [hydrated, setHydrated] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setCart(JSON.parse(saved));
    } catch (_) {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    const locked = searchOpen || cartOpen;
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen, cartOpen]);

  const addItem = (product, quantity = 1) => {
    setCart((current) => ({
      ...current,
      [product.slug]: (current[product.slug] || 0) + quantity
    }));
  };

  const setQuantity = (slug, quantity) => {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[slug];
      else next[slug] = quantity;
      return next;
    });
  };

  const removeItem = (slug) => setQuantity(slug, 0);
  const clearCart = () => setCart({});
  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  return (
    <CommerceContext.Provider value={{
      cart, cartCount, addItem, setQuantity, removeItem, clearCart,
      searchOpen, setSearchOpen, cartOpen, setCartOpen
    }}>
      {children}
    </CommerceContext.Provider>
  );
}

export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) throw new Error('useCommerce must be used inside CommerceProvider');
  return context;
}
