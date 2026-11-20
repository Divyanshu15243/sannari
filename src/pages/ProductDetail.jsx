import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Heart, Star, Truck, ShieldCheck, RotateCcw, Video, Minus, Plus, Ruler, MessageCircle, Share2 } from 'lucide-react';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import { Breadcrumb, SectionHead } from '../components/Common';
import { BRAND, PRODUCTS, TYPES, getProduct, discount, inr } from '../data/store';
import { useShop } from '../context/ShopContext';
import NotFound from './NotFound';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const STITCH = [
  { v: 'semi', title: 'Semi-stitched', note: 'Same-day dispatch · blouse fabric unstitched', extra: 0 },
  { v: 'ready', title: 'Ready to wear', note: 'Standard size · ships in 3–5 days', extra: 0 },
  { v: 'custom', title: 'Custom fit to your measurements', note: 'Free on prepaid orders · ships in 10–12 days', extra: 1500 },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const p = getProduct(slug);
  return p ? <Detail key={slug} p={p} /> : <NotFound />;
}

function Detail({ p }) {
  const { addToCart, wishlist, toggleWish, notify } = useShop();
  const navigate = useNavigate();
  const [view, setView] = useState(0);
  const [size, setSize] = useState('');
  const [stitch, setStitch] = useState(p.type === 'western' ? '' : 'semi');
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState('');
  const [pin, setPin] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const T = TYPES[p.type];
  const extra = STITCH.find((s) => s.v === stitch)?.extra || 0;
  const saved = wishlist.includes(p.id);
  const related = PRODUCTS.filter((x) => x.type === p.type && x.id !== p.id).slice(0, 4);

  const add = (buyNow) => {
    if (!size) { setErr('Please choose a size.'); return; }
    addToCart(p.id, size, stitch, qty);
    if (buyNow) navigate('/checkout');
  };
  const checkPin = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pin)) { setPinMsg('Enter a valid 6-digit pincode.'); return; }
    const fmt = (d) => new Date(Date.now() + d * 864e5).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    setPinMsg(`Estimated delivery ${fmt(5)} – ${fmt(7)} · COD available`);
  };

  return (
    <div className="container">
      <Breadcrumb items={[{ label: T.label, to: `/collections/${p.type}` }, { label: p.name }]} />
      <div className="pdp">
        <div className="gallery">
          <div className="thumbs">
            {[0, 1, 2, 3].map((v) => (
              <button key={v} className={view === v ? 'on' : ''} onClick={() => setView(v)} aria-label={`View image ${v + 1}`}><ProductArt product={p} view={v} /></button>
            ))}
          </div>
          <div className="main-image"><ProductArt product={p} view={view} /><span className="badge">{discount(p)}% off</span></div>
        </div>

        <div className="pdp-info">
          <span className="kicker dark">{T.label} · {p.occasion}</span>
          <h1>{p.name}</h1>
          <div className="rating"><span className="stars">{[...Array(5)].map((_, k) => <Star key={k} size={15} fill="currentColor" />)}</span>{p.rating} · {p.reviews} reviews</div>
          <div className="price big"><b>{inr(p.price + extra)}</b><s>MRP {inr(p.mrp)}</s><em>{discount(p)}% off</em></div>
          <small className="muted">Inclusive of all taxes</small>

          <div className="option">
            <div className="option-head"><b>Size</b><Link to="/size-chart" className="text-link"><Ruler size={15} /> Size chart</Link></div>
            <div className="size-row">{SIZES.map((s) => <button key={s} className={size === s ? 'on' : ''} onClick={() => { setSize(s); setErr(''); }}>{s}</button>)}</div>
            {err && <p className="error">{err}</p>}
          </div>

          {p.type !== 'western' && (
            <div className="option">
              <b>Stitching</b>
              <div className="radio-cards">
                {STITCH.map((s) => (
                  <label key={s.v} className={stitch === s.v ? 'on' : ''}>
                    <input type="radio" name="stitch" checked={stitch === s.v} onChange={() => setStitch(s.v)} />
                    <span><b>{s.title}{s.extra ? ` · +${inr(s.extra)}` : ''}</b><small>{s.note}</small></span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="buy-row">
            <div className="qty big">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease"><Minus size={16} /></button><span>{qty}</span>
              <button onClick={() => setQty(Math.min(5, qty + 1))} aria-label="Increase"><Plus size={16} /></button>
            </div>
            <button className="btn grow" onClick={() => add(false)}>Add to bag</button>
            <button className={`icon-btn boxed ${saved ? 'on' : ''}`} onClick={() => toggleWish(p.id)} aria-label="Wishlist"><Heart size={20} fill={saved ? 'currentColor' : 'none'} /></button>
          </div>
          <button className="btn outline block" onClick={() => add(true)}>Buy it now</button>
          <div className="btn-row mt-s">
            <a className="btn whatsapp-btn grow" href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Ask on WhatsApp</a>
            <button className="btn outline" onClick={() => { navigator.clipboard?.writeText(window.location.href).catch(() => {}); notify('Link copied'); }}><Share2 size={18} /> Share</button>
          </div>

          <div className="perks">
            <span><Truck size={18} /> Free shipping on prepaid</span><span><ShieldCheck size={18} /> Secure checkout</span>
            <span><RotateCcw size={18} /> Easy 7-day exchange</span><span><Video size={18} /> See it live on video</span>
          </div>

          <form className="pin-check" onSubmit={checkPin}>
            <b>Check delivery</b>
            <div className="inline-form"><input value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" maxLength={6} placeholder="Enter pincode" aria-label="Pincode" /><button className="btn outline">Check</button></div>
            {pinMsg && <small className="muted">{pinMsg}</small>}
          </form>

          <div className="accordion">
            <details open><summary>Description</summary><p>A {p.color.toLowerCase()} {p.type === 'saree' ? 'saree' : p.type === 'western' ? 'gown' : 'set'} in {p.fabric.toLowerCase()} with {p.work.toLowerCase()} detailing, designed for {p.occasion.toLowerCase()} celebrations.</p></details>
            <details><summary>Product details</summary>
              <dl className="specs"><dt>Fabric</dt><dd>{p.fabric}</dd><dt>Work</dt><dd>{p.work}</dd><dt>Colour</dt><dd>{p.color}</dd><dt>Occasion</dt><dd>{p.occasion}</dd><dt>Care</dt><dd>Dry clean only</dd></dl>
            </details>
            <details><summary>Shipping & returns</summary><p>Semi-stitched orders ship the same day; custom fit in 10–12 working days. Exchange within 7 days on unused, unaltered pieces. <Link className="text-link" to="/policies/return-policy">Return policy</Link></p></details>
          </div>
        </div>
      </div>

      <section className="section">
        <SectionHead title="You may also like" />
        <div className="product-grid">{related.map((r) => <ProductCard key={r.id} product={r} />)}</div>
      </section>
    </div>
  );
}
