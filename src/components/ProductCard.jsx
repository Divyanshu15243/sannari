import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import ProductArt from './ProductArt';
import { discount, inr } from '../data/store';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product: p }) {
  const { wishlist, toggleWish, addToCart } = useShop();
  const saved = wishlist.includes(p.id);
  return (
    <article className="pcard">
      <div className="pcard-media">
        <Link to={`/products/${p.slug}`} aria-label={p.name}><ProductArt product={p} /></Link>
        <span className="badge">{discount(p)}% off</span>
        {p.isNew && <span className="badge new">New</span>}
        <button className={`icon-btn wish ${saved ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Save to wishlist">
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-add" aria-label="Quick add to bag" onClick={() => addToCart(p.id, 'M', p.type === 'western' ? '' : 'semi')}>
          <ShoppingBag size={16} /> <span>Quick add</span>
        </button>
      </div>
      <Link to={`/products/${p.slug}`} className="pcard-body">
        <span className="pcard-rating"><Star size={13} fill="currentColor" /> {p.rating} <em>({p.reviews})</em></span>
        <h3>{p.name}</h3>
        <div className="price"><b>{inr(p.price)}</b><s>{inr(p.mrp)}</s></div>
      </Link>
    </article>
  );
}
