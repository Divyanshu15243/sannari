import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Crown, Gem, Hand, Sun, Music, Sparkles, ArrowRight, Star } from 'lucide-react';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import { SectionHead } from '../components/Common';
import { SERVICES } from '../components/Footer';
import { PRODUCTS, REVIEWS, BLOGS, BRAND, discount } from '../data/store';

const luxe = PRODUCTS.filter((p) => p.luxe);
const SLIDES = [
  { kicker: 'Heritage Luxe', title: 'Heirlooms, hand-finished in zari and pearl', text: 'Our finest silks and tissues, embroidered over weeks by master karigars.', cta: ['Shop Heritage Luxe', '/collections/luxe'], items: luxe.slice(0, 3) },
  { kicker: 'End of Season Sale', title: 'Festive favourites, up to 64% off', text: 'Last-season lehengas and sets at their lowest prices, while sizes last.', cta: ['Shop the sale', '/collections/sale'], items: PRODUCTS.filter((p) => discount(p) >= 60).slice(0, 3) },
  { kicker: 'Bridal', title: 'For the moment you walk in', text: 'Bridal lehengas in reds, wines and golds, with free custom fitting on prepaid orders.', cta: ['Explore bridal', '/collections/bridal'], items: PRODUCTS.filter((p) => p.occasion === 'Bridal').slice(0, 3) },
  { kicker: 'House favourites', title: 'The pieces everyone asks about', text: 'Our best-loved silhouettes, restocked in new colours.', cta: ['Shop best sellers', '/collections/best-sellers'], items: PRODUCTS.filter((p) => p.bestSeller).slice(0, 3) },
];
const first = (t, n = 0) => PRODUCTS.filter((p) => p.type === t)[n];
const CATEGORIES = [
  ['Heritage Luxe', 'luxe', luxe[3]], ['Bridal', 'bridal', PRODUCTS.find((p) => p.occasion === 'Bridal')], ['New Arrivals', 'new-arrivals', PRODUCTS[3]],
  ['Indo Western', 'indo-western', first('indo-western')], ['Lehenga', 'lehenga', first('lehenga', 4)], ['Western Wear', 'western', first('western')], ['Noor Edit', 'noor', PRODUCTS.filter((p) => p.noor)[2]],
];
const OCCASION_TILES = [['Bridal', Crown], ['Wedding', Gem], ['Engagement', Sparkles], ['Mehendi', Hand], ['Haldi', Sun], ['Sangeet', Music]];
const TABS = { 'new-arrivals': ['New arrivals', (p) => p.isNew], 'best-sellers': ['Best sellers', (p) => p.bestSeller], noor: ['Noor Edit', (p) => p.noor] };

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);
  const go = (d) => { setPaused(true); setI((x) => (x + d + SLIDES.length) % SLIDES.length); };
  const s = SLIDES[i];
  return (
    <section className="hero" aria-roledescription="carousel">
      <div className="container hero-inner" key={i}>
        <div className="hero-copy">
          <span className="kicker">{s.kicker}</span>
          <h1>{s.title}</h1>
          <p>{s.text}</p>
          <div className="btn-row">
            <Link className="btn gold" to={s.cta[1]}>{s.cta[0]} <ArrowRight size={18} /></Link>
            <Link className="btn outline-light" to="/contact">Book a video call</Link>
          </div>
        </div>
        <div className="arches">
          {s.items.filter(Boolean).map((p, j) => (
            <Link key={p.id} to={`/products/${p.slug}`} className={`arch ${j === 1 ? 'tall' : ''}`}><ProductArt product={p} /></Link>
          ))}
        </div>
      </div>
      <button className="hero-arrow prev" onClick={() => go(-1)} aria-label="Previous slide"><ChevronLeft /></button>
      <button className="hero-arrow next" onClick={() => go(1)} aria-label="Next slide"><ChevronRight /></button>
      <div className="hero-dots">
        {SLIDES.map((_, j) => <button key={j} className={j === i ? 'on' : ''} onClick={() => { setPaused(true); setI(j); }} aria-label={`Slide ${j + 1}`} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const [tab, setTab] = useState('new-arrivals');
  return (
    <>
      <Hero />
      <div className="marquee"><div>Semi-stitched orders ship the same day · Custom-fit orders ship in 10–12 days · Cash on delivery across India · Video shopping Mon–Sat, 9 AM–6 PM · Semi-stitched orders ship the same day · Custom-fit orders ship in 10–12 days ·</div></div>

      <section className="section">
        <div className="container cat-row">
          {CATEGORIES.map(([label, slug, p]) => (
            <Link key={slug} to={`/collections/${slug}`} className="cat-tile">
              <div className="cat-frame"><ProductArt product={p} view={3} /></div>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="services-band">
        <div className="container services">
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="service"><Icon size={30} strokeWidth={1.5} /><div><b>{title}</b><small>{text}</small></div></div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Curated for you" text="Edits our stylists are loving right now." />
          <div className="curated">
            {[['Heritage Luxe', 'luxe', luxe[4] || PRODUCTS[1]], ['New this season', 'new-arrivals', PRODUCTS[6]], ['House favourites', 'best-sellers', PRODUCTS[9]], ['Indo Western', 'indo-western', first('indo-western', 2)]].map(([t, s, p], k) => (
              <Link key={s} to={`/collections/${s}`} className={`curated-card ${k === 0 ? 'wide' : ''}`}>
                <ProductArt product={p} view={1} />
                <div className="curated-label"><span>{t}</span><ArrowRight size={18} /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <SectionHead title="For every celebration" text="Find the right look for each function." />
          <div className="occasions">
            {OCCASION_TILES.map(([o, Icon]) => (
              <Link key={o} to={`/collections/occasion-${o.toLowerCase()}`} className="occasion"><span className="ring"><Icon size={30} strokeWidth={1.4} /></span>{o}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Our all-time favourites" action={
            <div className="tabs" role="tablist">
              {Object.entries(TABS).map(([k, [label]]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>)}
            </div>} />
          <div className="product-grid">{PRODUCTS.filter(TABS[tab][1]).slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}</div>
          <div className="center mt"><Link className="btn outline" to={`/collections/${tab}`}>View all</Link></div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container split">
          <div>
            <span className="kicker">Made to measure</span>
            <h2>Custom fitting, free on every prepaid order</h2>
            <p>Choose “Custom fit” on any lehenga, share your measurements with our stylist, and we tailor and dispatch your outfit in 10–12 working days.</p>
            <Link className="btn gold" to="/policies/stitching-policy">How stitching works</Link>
          </div>
          <ol className="steps">
            <li><b>Choose your piece</b><span>Pick custom fit while adding to bag.</span></li>
            <li><b>Share measurements</b><span>Our stylist guides you on a call or WhatsApp.</span></li>
            <li><b>Stitched and shipped</b><span>Tailored, checked and dispatched in 10–12 days.</span></li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={`The ${BRAND.name} experience`} text="Sample reviews: replace with your real customer reviews." />
          <div className="reviews">
            {REVIEWS.slice(0, 3).map((r) => (
              <figure key={r.name} className="review">
                <div className="stars">{[...Array(5)].map((_, k) => <Star key={k} size={16} fill="currentColor" />)}</div>
                <blockquote>{r.text}</blockquote>
                <figcaption><b>{r.name}</b> · {r.city}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="container">
          <SectionHead title="Latest stories" action={<Link className="text-link" to="/blog">All stories <ArrowRight size={16} /></Link>} />
          <div className="blog-grid">
            {BLOGS.slice(0, 3).map((b) => (
              <Link key={b.slug} to={`/blog/${b.slug}`} className="blog-card">
                <div className="blog-media"><ProductArt product={b.product} view={1} /></div>
                <small>{b.date}</small><h3>{b.title}</h3><p>{b.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Follow our story" text={`${BRAND.instagram} on Instagram, YouTube and Pinterest`} />
          <div className="insta">{PRODUCTS.slice(10, 16).map((p) => <Link key={p.id} to={`/products/${p.slug}`}><ProductArt product={p} view={2} /></Link>)}</div>
        </div>
      </section>
    </>
  );
}
