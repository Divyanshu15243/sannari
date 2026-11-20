import { Link } from 'react-router-dom';
import { PageHero } from '../components/Common';
import { CartLines, ShippingMeter } from '../components/Overlays';
import { useShop } from '../context/ShopContext';
import { inr } from '../data/store';

export default function Cart() {
  const { cart, subtotal } = useShop();
  return (
    <>
      <PageHero title="Your bag" />
      <div className="container">
        {cart.length ? (
          <div className="checkout-grid">
            <div className="card"><CartLines /></div>
            <aside className="card summary">
              <ShippingMeter />
              <div className="sum-row"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
              <div className="sum-row"><span>Shipping</span><span>At checkout</span></div>
              <div className="sum-row total"><span>Total</span><span>{inr(subtotal)}</span></div>
              <Link to="/checkout" className="btn block">Proceed to checkout</Link>
              <Link to="/collections/all" className="text-link center">Continue shopping</Link>
            </aside>
          </div>
        ) : (
          <div className="empty"><p>Your bag is empty.</p><Link className="btn" to="/collections/new-arrivals">Shop new arrivals</Link></div>
        )}
      </div>
    </>
  );
}
