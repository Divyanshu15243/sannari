import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Truck, Headphones, Video, Scissors } from 'lucide-react';
import { BRAND } from '../data/store';
import { useShop } from '../context/ShopContext';

export const SERVICES = [
  { icon: Truck, title: 'Same-day dispatch', text: 'On semi-stitched orders' },
  { icon: Headphones, title: 'Customer care', text: 'Mon–Sat, 9 AM–6 PM' },
  { icon: Video, title: 'Video shopping', text: 'See pieces live before you buy' },
  { icon: Scissors, title: 'Custom fitting', text: 'Free on prepaid orders' },
];

export default function Footer() {
  const { notify } = useShop();
  const [email, setEmail] = useState('');
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="footer-logo">{BRAND.name}</Link>
          <p>Lehengas, sarees and festive sets, made in Surat and delivered across India.</p>
          <p className="contact-line"><Phone size={15} /> {BRAND.phone}</p>
          <p className="contact-line"><Mail size={15} /> {BRAND.email}</p>
          <p className="contact-line"><MapPin size={15} /> {BRAND.city}</p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/collections/new-arrivals">New arrivals</Link><Link to="/collections/lehenga">Lehenga</Link><Link to="/collections/ready-to-wear">Ready to wear</Link><Link to="/collections/indo-western">Indo western</Link><Link to="/collections/saree">Saree</Link><Link to="/collections/sale">Sale</Link>
        </div>
        <div>
          <h4>Help</h4>
          <Link to="/about">About us</Link><Link to="/contact">Contact</Link><Link to="/blog">Blog</Link><Link to="/size-chart">Size chart</Link><Link to="/faq">FAQs</Link><Link to="/policies/shipping-policy">Shipping</Link><Link to="/policies/return-policy">Returns</Link><Link to="/policies/stitching-policy">Stitching</Link>
        </div>
        <div>
          <h4>Join the family</h4>
          <p>New drops, festive edits and early sale access.</p>
          <form className="newsletter" onSubmit={(e) => { e.preventDefault(); notify('Subscribed. Welcome to the family!'); setEmail(''); }}>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" aria-label="Email" />
            <button className="btn gold">Subscribe</button>
          </form>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 {BRAND.name}. All rights reserved.</span>
        <span className="footer-policies">
          <Link to="/policies/privacy-policy">Privacy</Link><Link to="/policies/terms">Terms</Link><Link to="/policies/refund-policy">Refunds</Link>
        </span>
      </div>
    </footer>
  );
}
