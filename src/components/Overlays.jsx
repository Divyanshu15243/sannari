import { useEffect, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, Search, MessageCircle } from 'lucide-react';
import ProductArt from './ProductArt';
import ProductCard from './ProductCard';
import { BRAND, PRODUCTS, TYPES, inr } from '../data/store';
import { useShop } from '../context/ShopContext';

const FREE_SHIP = 4999;
const STITCH = { semi: 'Semi-stitched', ready: 'Ready to wear', custom: 'Custom fit' };

export function CartLines({ compact }) {
  const { cart, updateQty, removeLine, linePrice, setDrawer } = useShop();
  return cart.map((l, i) => {
    const p = PRODUCTS.find((x) => x.id === l.id);
    return (
      <div className={`cart-line ${compact ? 'compact' : ''}`} key={i}>
        <Link to={`/products/${p.slug}`} className="cart-thumb" onClick={() => setDrawer(null)}><ProductArt product={p} /></Link>
        <div>
          <h4>{p.name}</h4>
          <small>Size {l.size}{l.stitch ? ` · ${STITCH[l.stitch]}` : ''}</small>
          <div className="cart-row">
            <div className="qty">
              <button onClick={() => updateQty(i, -1)} aria-label="Decrease"><Minus size={14} /></button>
              <span>{l.qty}</span>
              <button onClick={() => updateQty(i, 1)} aria-label="Increase"><Plus size={14} /></button>
            </div>
            <b>{inr(linePrice(l) * l.qty)}</b>
          </div>
          <button className="text-btn" onClick={() => removeLine(i)}><Trash2 size={13} /> Remove</button>
        </div>
      </div>
    );
  });
}

export function ShippingMeter() {
  const { subtotal } = useShop();
  return (
    <div className="ship-meter">
      {subtotal >= FREE_SHIP ? 'You’ve unlocked free shipping.' : <>Add <b>{inr(FREE_SHIP - subtotal)}</b> more for free shipping.</>}
      <div className="meter"><i style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} /></div>
    </div>
  );
}

function CartDrawer() {
  const { drawer, setDrawer, cart, subtotal } = useShop();
  return (
    <aside className={`drawer right ${drawer === 'cart' ? 'open' : ''}`} aria-label="Shopping bag">
      <div className="drawer-head"><h3>Your bag</h3><button className="icon-btn" onClick={() => setDrawer(null)} aria-label="Close"><X size={22} /></button></div>
      <div className="drawer-body">
        {cart.length ? <><ShippingMeter /><CartLines compact /></> : (
          <div className="empty"><p>Your bag is empty.</p><Link className="btn" to="/collections/new-arrivals" onClick={() => setDrawer(null)}>Shop new arrivals</Link></div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="drawer-foot">
          <div className="sum-row total"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          <Link to="/checkout" className="btn block" onClick={() => setDrawer(null)}>Checkout</Link>
          <Link to="/cart" className="text-link center" onClick={() => setDrawer(null)}>View bag</Link>
        </div>
      )}
    </aside>
  );
}

function SearchOverlay() {
  const { drawer, setDrawer } = useShop();
  const [q, setQ] = useState('');
  const input = useRef(null);
  useEffect(() => { if (drawer === 'search') setTimeout(() => input.current?.focus(), 60); }, [drawer]);
  const results = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return PRODUCTS.filter((p) => words.every((w) => `${p.name} ${p.occasion} ${TYPES[p.type].label}`.toLowerCase().includes(w))).slice(0, 8);
  }, [q]);
  const popular = [['Red lehenga', 'color-red'], ['Golden', 'color-golden'], ['Maroon', 'color-maroon'], ['Indo western', 'indo-western'], ['Budget-friendly', 'under-10000'], ['Bridal', 'bridal']];
  return (
    <div className={`search-panel ${drawer === 'search' ? 'open' : ''}`} onClick={(e) => e.target.closest('a') && setDrawer(null)}>
      <div className="container">
        <div className="search-row">
          <Search size={22} />
          <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by colour, fabric or style" aria-label="Search" />
          <button className="icon-btn" onClick={() => setDrawer(null)} aria-label="Close search"><X size={22} /></button>
        </div>
        <div className="chips-row"><span>Popular:</span>{popular.map(([l, s]) => <Link key={s} className="chip" to={`/collections/${s}`}>{l}</Link>)}</div>
        {q && (results.length ? <div className="product-grid four">{results.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <p className="muted">No matches for “{q}”. Try “red”, “silk” or “bridal”.</p>)}
      </div>
    </div>
  );
}

export default function Overlays() {
  const { drawer, setDrawer, toast } = useShop();
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setDrawer(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [setDrawer]);
  useEffect(() => { document.body.style.overflow = drawer && drawer !== 'search' ? 'hidden' : ''; }, [drawer]);
  return (
    <>
      <div className={`scrim ${drawer ? 'show' : ''}`} onClick={() => setDrawer(null)} />
      <CartDrawer />
      <SearchOverlay />
      <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
      <a className="whatsapp" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={26} /></a>
    </>
  );
}
