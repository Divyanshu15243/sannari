import { Link } from 'react-router-dom';
import { Hand, Scissors, Truck, Award, ArrowRight } from 'lucide-react';
import ProductArt from '../components/ProductArt';
import { Breadcrumb } from '../components/Common';
import { BRAND, PRODUCTS } from '../data/store';

const VALUES = [
  { icon: Hand, title: 'Handwork first', text: 'Zari, gota, mirror and pearl work done by artisans we know by name.' },
  { icon: Scissors, title: 'Fit for you', text: 'Semi-stitched, ready to wear or custom fit: the choice is yours.' },
  { icon: Truck, title: 'Pan-India delivery', text: 'Same-day dispatch on semi-stitched orders, with COD available.' },
  { icon: Award, title: 'Checked by hand', text: 'Every piece is inspected before it is folded into its box.' },
];
const STATS = [['2018', 'Founded in Surat'], ['120+', 'Artisans we work with'], ['28', 'States we deliver to'], ['7-day', 'Easy exchange']];

export default function About() {
  return (
    <>
      <section className="about-hero">
        <div className="container split">
          <div>
            <Breadcrumb items={[{ label: 'About us' }]} />
            <span className="kicker dark">Our story</span>
            <h1>Made in Surat, worn at celebrations across India</h1>
            <p>{BRAND.name} began with a simple idea: occasion wear should feel couture without the couture price. We work directly with weavers and karigars in Surat, so every lehenga, saree and set moves from our workshop to your door with no middlemen.</p>
            <p>Our stylists are a WhatsApp or video call away to help with colours, sizes and custom fitting.</p>
            <Link className="btn" to="/collections/all">Explore the collection <ArrowRight size={18} /></Link>
          </div>
          <div className="arches light">
            {[PRODUCTS[4], PRODUCTS[1], PRODUCTS[8]].map((p, j) => <div key={p.id} className={`arch ${j === 1 ? 'tall' : ''}`}><ProductArt product={p} /></div>)}
          </div>
        </div>
      </section>
      <section className="stats-band">
        <div className="container stats">{STATS.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
        <p className="container muted small-note">Sample figures: replace with your own.</p>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="center">What we stand for</h2>
          <div className="values">
            {VALUES.map(({ icon: Icon, title, text }) => <div key={title} className="value"><span className="ring small"><Icon size={26} strokeWidth={1.5} /></span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section tint">
        <div className="container split">
          <div className="story-art"><ProductArt product={PRODUCTS[12]} view={1} /></div>
          <div>
            <span className="kicker dark">From our workshop</span>
            <h2>Every piece passes through many hands</h2>
            <p>Fabric is sourced and dyed, motifs are traced by hand, and embroidery is built up thread by thread over days or weeks. Finishing, pressing and quality checks happen under one roof before your order is packed.</p>
            <Link className="btn outline" to="/contact">Visit or book a video call</Link>
          </div>
        </div>
      </section>
    </>
  );
}
