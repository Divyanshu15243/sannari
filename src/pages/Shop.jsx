import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PageHero } from '../components/Common';
import { PRODUCTS, COLORS, PRICE_BANDS, resolveCollection, discount } from '../data/store';
import NotFound from './NotFound';

const SORTS = {
  featured: ['Featured', null],
  newest: ['Newest', (a, b) => b.isNew - a.isNew || b.id - a.id],
  low: ['Price: low to high', (a, b) => a.price - b.price],
  high: ['Price: high to low', (a, b) => b.price - a.price],
  discount: ['Biggest discount', (a, b) => discount(b) - discount(a)],
};

function Toggle({ set, value, children }) {
  const [state, setState] = set;
  const on = state.includes(value);
  return (
    <label className="check">
      <input type="checkbox" checked={on} onChange={() => setState(on ? state.filter((x) => x !== value) : [...state, value])} />
      {children}
    </label>
  );
}

export default function Shop() {
  const { slug = 'all' } = useParams();
  return <ShopView key={slug} slug={slug} />;
}

function ShopView({ slug }) {
  const coll = resolveCollection(slug);
  const prices = useState([]), colors = useState([]), fabrics = useState([]);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const base = useMemo(() => (coll ? PRODUCTS.filter(coll.test) : []), [coll]);
  const list = useMemo(() => {
    let l = base.filter((p) =>
      (!prices[0].length || prices[0].some((s) => PRICE_BANDS.find((b) => b.slug === s).test(p))) &&
      (!colors[0].length || colors[0].includes(p.color)) &&
      (!fabrics[0].length || fabrics[0].includes(p.fabric)));
    const fn = SORTS[sort][1];
    return fn ? [...l].sort(fn) : l;
  }, [base, prices, colors, fabrics, sort]);

  if (!coll) return <NotFound />;
  const availColors = COLORS.filter((c) => base.some((p) => p.color === c.name));
  const availFabrics = [...new Set(base.map((p) => p.fabric))];
  const active = [...prices[0].map((s) => [prices, s, PRICE_BANDS.find((b) => b.slug === s).label]), ...colors[0].map((s) => [colors, s, s]), ...fabrics[0].map((s) => [fabrics, s, s])];
  const clear = () => [prices, colors, fabrics].forEach(([, set]) => set([]));

  return (
    <>
      <PageHero title={coll.title} text={coll.blurb} crumbs={[{ label: 'Collections', to: '/collections/all' }, { label: coll.title }]} />
      <div className="container shop">
        <aside className={`filters ${showFilters ? 'open' : ''}`}>
          <div className="filters-head only-mobile"><b>Filters</b><button className="icon-btn" onClick={() => setShowFilters(false)} aria-label="Close filters"><X size={20} /></button></div>
          <details open><summary>Price</summary>{PRICE_BANDS.map((b) => <Toggle key={b.slug} set={prices} value={b.slug}>{b.label}</Toggle>)}</details>
          <details open><summary>Colour</summary>{availColors.map((c) => <Toggle key={c.name} set={colors} value={c.name}><span className="swatch" style={{ background: c.c1 }} />{c.name}</Toggle>)}</details>
          <details open><summary>Fabric</summary>{availFabrics.map((f) => <Toggle key={f} set={fabrics} value={f}>{f}</Toggle>)}</details>
          <button className="btn block only-mobile" onClick={() => setShowFilters(false)}>Show {list.length} products</button>
        </aside>
        <div>
          <div className="toolbar">
            <button className="btn outline small only-mobile" onClick={() => setShowFilters(true)}><SlidersHorizontal size={16} /> Filters</button>
            <span className="muted">{list.length} products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
              {Object.entries(SORTS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </div>
          {active.length > 0 && (
            <div className="active-filters">
              {active.map(([[st, set], v, label]) => <button key={label} className="chip on" onClick={() => set(st.filter((x) => x !== v))}>{label} <X size={13} /></button>)}
              <button className="text-btn" onClick={clear}>Clear all</button>
            </div>
          )}
          {list.length ? (
            <div className="product-grid three">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          ) : (
            <div className="empty"><p>No pieces match these filters.</p><button className="btn outline" onClick={clear}>Clear filters</button></div>
          )}
        </div>
      </div>
    </>
  );
}
