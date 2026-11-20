import { createContext, useContext, useState, useCallback } from 'react';
import { PRODUCTS } from '../data/store';

// UI-only state for bag, wishlist, drawers and toasts (no backend).
const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [drawer, setDrawer] = useState(null); // 'cart' | 'menu' | 'search' | null
  const [toast, setToast] = useState('');

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(window.__toastT);
    window.__toastT = setTimeout(() => setToast(''), 2400);
  }, []);

  const addToCart = (id, size = 'M', stitch = 'semi', qty = 1) => {
    setCart((c) => {
      const hit = c.find((l) => l.id === id && l.size === size && l.stitch === stitch);
      if (hit) return c.map((l) => (l === hit ? { ...l, qty: l.qty + qty } : l));
      return [...c, { id, size, stitch, qty }];
    });
    notify('Added to bag');
    setDrawer('cart');
  };
  const updateQty = (i, d) => setCart((c) => c.map((l, j) => (j === i ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0));
  const removeLine = (i) => setCart((c) => c.filter((_, j) => j !== i));
  const toggleWish = (id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    notify(wishlist.includes(id) ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  const linePrice = (l) => PRODUCTS.find((p) => p.id === l.id).price + (l.stitch === 'custom' ? 1500 : 0);
  const subtotal = cart.reduce((s, l) => s + linePrice(l) * l.qty, 0);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  return (
    <ShopContext.Provider value={{ cart, wishlist, drawer, setDrawer, toast, notify, addToCart, updateQty, removeLine, toggleWish, linePrice, subtotal, count, setCart }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => useContext(ShopContext);
