import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductArt from '../components/ProductArt';
import { PageHero, Breadcrumb } from '../components/Common';
import { useShop } from '../context/ShopContext';
import { BLOGS, FAQS, POLICIES, PRODUCTS, BRAND } from '../data/store';
import NotFound from './NotFound';

export function Wishlist() {
  const { wishlist } = useShop();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));
  return (
    <>
      <PageHero title="Wishlist" text={items.length ? `${items.length} saved piece${items.length > 1 ? 's' : ''}` : ''} />
      <div className="container">
        {items.length ? <div className="product-grid">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div> : (
          <div className="empty"><p>Nothing saved yet. Tap the heart on any piece to save it here.</p><Link className="btn" to="/collections/all">Explore collections</Link></div>
        )}
      </div>
    </>
  );
}

export function Login() {
  const { notify } = useShop();
  const [mode, setMode] = useState('login');
  return (
    <div className="container narrow auth">
      <div className="card">
        <h1>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
        <p className="muted">{mode === 'login' ? `Log in to your ${BRAND.name} account.` : 'Track orders, save favourites and check out faster.'}</p>
        <form className="form" onSubmit={(e) => { e.preventDefault(); notify(mode === 'login' ? 'Logged in (UI demo)' : 'Account created (UI demo)'); }}>
          {mode === 'register' && <label>Full name<input required /></label>}
          <label>Email or mobile<input required /></label>
          <label>Password<input type="password" required minLength={6} /></label>
          {mode === 'login' && <button type="button" className="text-btn right">Forgot password?</button>}
          <button className="btn block">{mode === 'login' ? 'Log in' : 'Create account'}</button>
        </form>
        <p className="center">{mode === 'login' ? 'New here? ' : 'Already have an account? '}
          <button className="text-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Create an account' : 'Log in'}</button></p>
      </div>
    </div>
  );
}

export function Blog() {
  return (
    <>
      <PageHero title="Stories & style guides" text="Wedding outfit guides, colour trends and styling tips." crumbs={[{ label: 'Blog' }]} />
      <div className="container blog-grid">
        {BLOGS.map((b) => (
          <Link key={b.slug} to={`/blog/${b.slug}`} className="blog-card">
            <div className="blog-media"><ProductArt product={b.product} view={1} /></div>
            <small>{b.date}</small><h3>{b.title}</h3><p>{b.excerpt}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const b = BLOGS.find((x) => x.slug === slug);
  if (!b) return <NotFound />;
  return (
    <article className="container article">
      <Breadcrumb items={[{ label: 'Blog', to: '/blog' }, { label: b.title }]} />
      <small className="muted">{b.date}</small>
      <h1>{b.title}</h1>
      <div className="article-media"><ProductArt product={b.product} view={1} /></div>
      {b.body.map((t, i) => <p key={i}>{t}</p>)}
      <h2>Shop the story</h2>
      <div className="product-grid">{PRODUCTS.filter((p) => p.type === b.product.type).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </article>
  );
}

export function Faq() {
  return (
    <>
      <PageHero title="Frequently asked questions" />
      <div className="container narrow accordion faq">
        {FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        <p className="center muted">Still have questions? <Link className="text-link" to="/contact">Contact us</Link></p>
      </div>
    </>
  );
}

const SIZE_ROWS = [['XS', 32, 26, 35], ['S', 34, 28, 37], ['M', 36, 30, 39], ['L', 38, 32, 41], ['XL', 40, 34, 43], ['XXL', 42, 36, 45]];
export function SizeChart() {
  return (
    <>
      <PageHero title="Size chart" text="Body measurements in inches. Between sizes? Choose the larger size or custom fit." />
      <div className="container narrow">
        <div className="table-wrap card">
          <table>
            <thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th><th>Lehenga length</th></tr></thead>
            <tbody>{SIZE_ROWS.map((r) => <tr key={r[0]}><td><b>{r[0]}</b></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>42</td></tr>)}</tbody>
          </table>
        </div>
        <h2 className="mt">How to measure</h2>
        <ul className="measure-list">
          <li><b>Bust:</b> around the fullest part of the chest, tape level.</li>
          <li><b>Waist:</b> around the natural waistline, where the lehenga will sit.</li>
          <li><b>Hip:</b> around the fullest part of the hips.</li>
          <li><b>Length:</b> from waist to floor, wearing the heels you plan to wear.</li>
        </ul>
      </div>
    </>
  );
}

export function Policy() {
  const { slug } = useParams();
  const p = POLICIES[slug];
  if (!p) return <NotFound />;
  return (
    <>
      <PageHero title={p.title} crumbs={[{ label: 'Policies' }, { label: p.title }]} />
      <div className="container narrow policy">
        <p className="notice">Template text: review and adjust it for your business before going live.</p>
        {p.sections.map(([h, t]) => <section key={h}><h2>{h}</h2><p>{t}</p></section>)}
        <div className="policy-links">{Object.entries(POLICIES).map(([k, v]) => <Link key={k} className={`chip ${k === slug ? 'on' : ''}`} to={`/policies/${k}`}>{v.title}</Link>)}</div>
      </div>
    </>
  );
}
