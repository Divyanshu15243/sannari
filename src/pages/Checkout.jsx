import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Lock } from 'lucide-react';
import ProductArt from '../components/ProductArt';
import { Breadcrumb } from '../components/Common';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, inr } from '../data/store';

const STATES = ['Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other'];
const PAY = [['upi', 'UPI', 'GPay, PhonePe, Paytm'], ['card', 'Card / Net banking', 'All major banks'], ['cod', 'Cash on delivery', '+₹99 · no custom fitting']];

export default function Checkout() {
  const { cart, subtotal, linePrice, setCart } = useShop();
  const [pay, setPay] = useState('upi');
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState(0);
  const [couponMsg, setCouponMsg] = useState('');
  const [done, setDone] = useState(null);

  const disc = Math.round(subtotal * coupon);
  const freeFit = pay === 'cod' ? 0 : cart.filter((l) => l.stitch === 'custom').reduce((s, l) => s + 1500 * l.qty, 0);
  const cod = pay === 'cod' ? 99 : 0;
  const ship = pay === 'cod' && subtotal < 4999 ? 149 : 0;
  const total = subtotal - disc - freeFit + cod + ship;

  if (done) return (
    <div className="container narrow done">
      <CheckCircle2 size={64} strokeWidth={1.3} />
      <h1>Thank you, {done.name}!</h1>
      <p>Order <b>{done.no}</b> is confirmed. This is a UI demo, so no payment was taken.</p>
      <Link className="btn" to="/collections/new-arrivals">Continue shopping</Link>
    </div>
  );
  if (!cart.length) return <div className="container empty"><h1>Checkout</h1><p>Your bag is empty.</p><Link className="btn" to="/collections/all">Shop now</Link></div>;

  const submit = (e) => {
    e.preventDefault();
    const name = new FormData(e.target).get('name').split(' ')[0];
    setDone({ name, no: 'MH-' + String(Date.now()).slice(-6) });
    setCart([]);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Bag', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="page-title">Checkout</h1>
      <form className="checkout-grid" onSubmit={submit}>
        <div className="form card">
          <h3>Contact</h3>
          <div className="two"><label>Full name<input name="name" required /></label><label>Mobile number<input required inputMode="tel" pattern="[0-9+ ]{10,14}" /></label></div>
          <label>Email<input type="email" required /></label>
          <h3>Delivery address</h3>
          <label>Address<input required /></label>
          <div className="two"><label>City<input required /></label><label>Pincode<input required inputMode="numeric" pattern="[0-9]{6}" /></label></div>
          <label>State<select required defaultValue=""><option value="" disabled>Select state</option>{STATES.map((s) => <option key={s}>{s}</option>)}</select></label>
          <h3>Payment</h3>
          <div className="radio-cards">
            {PAY.map(([v, t, n]) => (
              <label key={v} className={pay === v ? 'on' : ''}><input type="radio" name="pay" checked={pay === v} onChange={() => setPay(v)} /><span><b>{t}</b><small>{n}</small></span></label>
            ))}
          </div>
        </div>
        <aside className="card summary">
          <h3>Order summary</h3>
          {cart.map((l, i) => {
            const p = PRODUCTS.find((x) => x.id === l.id);
            return <div className="mini-line" key={i}><div className="mini-thumb"><ProductArt product={p} /><i>{l.qty}</i></div><span>{p.name}<small>Size {l.size}</small></span><b>{inr(linePrice(l) * l.qty)}</b></div>;
          })}
          <div className="inline-form">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" />
            <button type="button" className="btn outline" onClick={() => { const ok = code.trim().toUpperCase() === 'FESTIVE10'; setCoupon(ok ? 0.1 : 0); setCouponMsg(ok ? 'FESTIVE10 applied: 10% off' : 'That code isn’t valid'); }}>Apply</button>
          </div>
          {couponMsg && <small className="muted">{couponMsg}</small>}
          <div className="sum-row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
          {disc > 0 && <div className="sum-row"><span>Coupon</span><span>−{inr(disc)}</span></div>}
          {freeFit > 0 && <div className="sum-row"><span>Free custom fitting</span><span>−{inr(freeFit)}</span></div>}
          {cod > 0 && <div className="sum-row"><span>COD fee</span><span>{inr(cod)}</span></div>}
          <div className="sum-row"><span>Shipping</span><span>{ship ? inr(ship) : 'Free'}</span></div>
          <div className="sum-row total"><span>Total</span><span>{inr(total)}</span></div>
          <button className="btn block"><Lock size={16} /> Place order</button>
        </aside>
      </form>
    </div>
  );
}
