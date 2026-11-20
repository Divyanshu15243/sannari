import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, Calendar, ChevronDown } from 'lucide-react';
import { BRAND, NAV } from '../data/store';
import { useShop } from '../context/ShopContext';

export default function Header() {
  const { count, wishlist, drawer, setDrawer } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => setOpenMega(null), [pathname]);

  return (
    <>
      <div className="announce">Free shipping across India on prepaid orders · Use code <b>FESTIVE10</b> for 10% off</div>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} onMouseLeave={() => setOpenMega(null)}>
        <div className="container header-bar">
          <div className="header-left">
            <button className="icon-btn only-mobile" onClick={() => setDrawer('menu')} aria-label="Open menu"><Menu size={22} /></button>
            <button className="search-pill only-desktop" onClick={() => setDrawer('search')}>
              <Search size={18} /> Search lehengas, sarees…
            </button>
          </div>
          <Link to="/" className="logo"><b>{BRAND.name}</b><small>{BRAND.tagline}</small></Link>
          <div className="header-right">
            <button className="icon-btn only-mobile" onClick={() => setDrawer('search')} aria-label="Search"><Search size={21} /></button>
            <Link className="icon-btn only-desktop" to="/contact" aria-label="Book appointment" title="Book a video appointment"><Calendar size={21} /></Link>
            <Link className="icon-btn" to="/login" aria-label="Account"><User size={21} /></Link>
            <Link className="icon-btn" to="/wishlist" aria-label="Wishlist"><Heart size={21} />{wishlist.length > 0 && <i className="count">{wishlist.length}</i>}</Link>
            <button className="icon-btn" onClick={() => setDrawer('cart')} aria-label="Bag"><ShoppingBag size={21} />{count > 0 && <i className="count">{count}</i>}</button>
          </div>
        </div>
        <nav className="main-nav only-desktop" aria-label="Main">
          {NAV.map((n) => (
            <div key={n.label} className="nav-item" onMouseEnter={() => setOpenMega(n.mega ? n.label : null)}>
              <NavLink to={n.to} className={`nav-link ${n.sale ? 'sale' : ''}`}>
                {n.label}{n.mega && <ChevronDown size={14} />}
              </NavLink>
            </div>
          ))}
        </nav>
        {NAV.filter((n) => n.mega && n.label === openMega).map((n) => (
          <div className="mega" key={n.label}>
            <div className="container mega-grid">
              {n.mega.map((g) => (
                <div key={g.title}>
                  <h4>{g.title}</h4>
                  {g.links.map((l) => <Link key={l.to} to={l.to}>{l.label}</Link>)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </header>

      {/* Mobile menu */}
      <aside className={`drawer left ${drawer === 'menu' ? 'open' : ''}`} aria-label="Menu">
        <div className="drawer-head"><span className="logo-sm">{BRAND.name}</span><button className="icon-btn" onClick={() => setDrawer(null)} aria-label="Close"><X size={22} /></button></div>
        <div className="drawer-body mobile-nav" onClick={(e) => e.target.closest('a') && setDrawer(null)}>
          {NAV.map((n) => n.mega ? (
            <details key={n.label}><summary>{n.label}<ChevronDown size={16} /></summary>
              <Link to={n.to}>View all</Link>
              {n.mega.flatMap((g) => g.links.slice(0, 5)).map((l) => <Link key={n.label + l.to} to={l.to}>{l.label}</Link>)}
            </details>
          ) : <Link key={n.label} to={n.to}>{n.label}</Link>)}
          <Link to="/login">Log in</Link><Link to="/wishlist">Wishlist</Link><Link to="/faq">FAQs</Link>
        </div>
      </aside>
    </>
  );
}
