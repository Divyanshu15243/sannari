// ─── Brand settings: change these to your own ───
export const BRAND = {
  name: 'Mayuri House',
  tagline: 'Indian Couture',
  phone: '+91 90000 00000',
  whatsapp: '919000000000',
  email: 'care@mayurihouse.in',
  city: 'Surat, Gujarat',
  instagram: '@mayurihouse',
};

// ─── Sample catalogue (UI demo data) ───
export const COLORS = [
  { name: 'Red', c1: '#a8102c', c2: '#e3b04b' },
  { name: 'Maroon', c1: '#6b1328', c2: '#d9a441' },
  { name: 'Pink', c1: '#e0789c', c2: '#f6d77e' },
  { name: 'Green', c1: '#24704d', c2: '#e8c35a' },
  { name: 'Yellow', c1: '#e6b422', c2: '#a8102c' },
  { name: 'Golden', c1: '#c9a14a', c2: '#7a1f2b' },
  { name: 'Blue', c1: '#1f4f9a', c2: '#e9c46a' },
  { name: 'Purple', c1: '#6a2c8a', c2: '#f0c75e' },
  { name: 'Ivory', c1: '#ece2cc', c2: '#b08d3c' },
  { name: 'Wine', c1: '#5a1030', c2: '#e2b553' },
  { name: 'Orange', c1: '#e3672b', c2: '#f3d27c' },
  { name: 'Mint', c1: '#86cfb0', c2: '#c79a3b' },
];
export const FABRICS = ['Silk', 'Net', 'Organza', 'Georgette', 'Cotton', 'Satin', 'Tissue', 'Velvet'];
const WORKS = ['Sequin Embroidered', 'Zari Work', 'Pearl Embellished', 'Mirror Work', 'Thread Embroidered', 'Gota Patti', 'Beads Embroidered', 'Resham Work'];
export const OCCASIONS = ['Bridal', 'Wedding', 'Engagement', 'Mehendi', 'Haldi', 'Sangeet', 'Reception', 'Festive'];

export const TYPES = {
  lehenga: { label: 'Lehenga', suffix: 'Lehenga Choli', min: 4999, max: 17999 },
  'ready-to-wear': { label: 'Ready to Wear', suffix: 'Ready to Wear Lehenga Set', min: 9999, max: 26999 },
  'indo-western': { label: 'Indo Western', suffix: 'Indo Western Cape Set', min: 3499, max: 8999 },
  western: { label: 'Western Wear', suffix: 'Embellished Gown', min: 1999, max: 5499 },
  saree: { label: 'Saree', suffix: 'Saree', min: 2499, max: 8999 },
};

let seed = 11;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const plan = ['lehenga', 'ready-to-wear', 'lehenga', 'indo-western', 'western', 'lehenga', 'saree', 'ready-to-wear', 'lehenga', 'indo-western'];

export const PRODUCTS = Array.from({ length: 44 }, (_, i) => {
  const type = plan[i % plan.length];
  const T = TYPES[type];
  const color = COLORS[(i * 5 + Math.floor(i / 12)) % COLORS.length];
  const fabric = FABRICS[Math.floor(rnd() * FABRICS.length)];
  const work = WORKS[Math.floor(rnd() * WORKS.length)];
  const occasion = color.name === 'Yellow' ? 'Haldi' : ['Mint', 'Green'].includes(color.name) ? 'Mehendi' : OCCASIONS[Math.floor(rnd() * OCCASIONS.length)];
  const price = Math.round((T.min + rnd() * (T.max - T.min)) / 100) * 100 - 1;
  const mrp = Math.round((price * (2.2 + rnd() * 0.6)) / 100) * 100 - 1;
  return {
    id: i + 1,
    slug: `${color.name}-${fabric}-${work}-${T.suffix}`.toLowerCase().replace(/\s+/g, '-') + '-' + (i + 1),
    type,
    name: `${color.name} ${fabric} ${work} ${T.suffix}`,
    color: color.name, c1: color.c1, c2: color.c2,
    fabric, work, occasion, price, mrp,
    rating: +(4.2 + rnd() * 0.8).toFixed(1),
    reviews: 8 + Math.floor(rnd() * 140),
    isNew: i % 3 === 0, bestSeller: i % 4 === 1, noor: i % 5 === 2, luxe: price >= 17000,
  };
});

export const discount = (p) => Math.round((1 - p.price / p.mrp) * 100);
export const inr = (n) => '₹' + n.toLocaleString('en-IN');
export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);

export const PRICE_BANDS = [
  { label: 'Under ₹5,000', slug: 'under-5000', test: (p) => p.price < 5000 },
  { label: 'Under ₹10,000', slug: 'under-10000', test: (p) => p.price < 10000 },
  { label: '₹10,000 – ₹15,000', slug: '10000-15000', test: (p) => p.price >= 10000 && p.price < 15000 },
  { label: '₹15,000 – ₹20,000', slug: '15000-20000', test: (p) => p.price >= 15000 && p.price < 20000 },
  { label: 'Premium collection', slug: 'premium', test: (p) => p.price >= 20000 },
];

const SPECIAL = {
  all: ['All Collections', () => true, 'Every piece in the house, in one place.'],
  'new-arrivals': ['New Arrivals', (p) => p.isNew, 'Fresh from the atelier this season.'],
  'best-sellers': ['Best Sellers', (p) => p.bestSeller, 'The pieces our customers keep coming back for.'],
  sale: ['End of Season Sale', (p) => discount(p) >= 60, 'Last-season favourites at their lowest prices.'],
  luxe: ['Heritage Luxe', (p) => p.luxe, 'Heirloom-grade handwork on our finest fabrics.'],
  noor: ['Noor Edit', (p) => p.noor, 'Soft pastels and light, twirl-ready silhouettes.'],
  bridal: ['Bridal Collection', (p) => ['Bridal', 'Wedding'].includes(p.occasion) && p.type !== 'western', 'For the moment you walk in.'],
};

// Resolve /collections/:slug into a title, filter and blurb
export function resolveCollection(slug) {
  if (TYPES[slug]) return { title: TYPES[slug].label, test: (p) => p.type === slug, blurb: `Explore our ${TYPES[slug].label.toLowerCase()}: handpicked fabrics, rich handwork and easy fits.` };
  if (SPECIAL[slug]) { const [title, test, blurb] = SPECIAL[slug]; return { title, test, blurb }; }
  const band = PRICE_BANDS.find((b) => b.slug === slug);
  if (band) return { title: band.label, test: band.test, blurb: 'Beautiful pieces for every budget.' };
  const [kind, ...rest] = slug.split('-');
  const v = rest.join('-');
  const cap = v.charAt(0).toUpperCase() + v.slice(1);
  if (kind === 'occasion') return { title: `${cap} Collection`, test: (p) => p.occasion.toLowerCase() === v, blurb: `Outfits made for ${v} celebrations.` };
  if (kind === 'color') return { title: `${cap} Collection`, test: (p) => p.color.toLowerCase() === v, blurb: `Every shade of ${v} we love.` };
  if (kind === 'fabric') return { title: `${cap} Collection`, test: (p) => p.fabric.toLowerCase() === v, blurb: `Pieces crafted in ${v}.` };
  return null;
}

const list = (prefix, arr) => arr.map((x) => ({ label: x, to: `/collections/${prefix}${x.toLowerCase()}` }));
const priceLinks = PRICE_BANDS.map((b) => ({ label: b.label, to: `/collections/${b.slug}` }));

export const NAV = [
  { label: 'New Arrivals', to: '/collections/new-arrivals' },
  {
    label: 'Collections', to: '/collections/all',
    mega: [
      { title: 'Shop by price', links: priceLinks },
      { title: 'Shop by occasion', links: list('occasion-', OCCASIONS) },
      { title: 'Shop by colour', links: list('color-', COLORS.map((c) => c.name)) },
      { title: 'Shop by fabric', links: list('fabric-', FABRICS) },
    ],
  },
  {
    label: 'Lehenga', to: '/collections/lehenga',
    mega: [
      { title: 'By occasion', links: list('occasion-', OCCASIONS.slice(0, 7)) },
      { title: 'By fabric', links: list('fabric-', FABRICS.slice(0, 6)) },
      { title: 'By price', links: priceLinks },
      { title: 'Featured', links: [{ label: 'Bridal lehenga', to: '/collections/bridal' }, { label: 'Ready to wear', to: '/collections/ready-to-wear' }, { label: 'Heritage Luxe', to: '/collections/luxe' }, { label: 'Noor Edit', to: '/collections/noor' }] },
    ],
  },
  { label: 'Ready to Wear', to: '/collections/ready-to-wear' },
  { label: 'Indo Western', to: '/collections/indo-western' },
  { label: 'Western Wear', to: '/collections/western' },
  { label: 'Saree', to: '/collections/saree' },
  { label: 'Heritage Luxe', to: '/collections/luxe' },
  { label: 'Sale', to: '/collections/sale', sale: true },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

// Sample reviews: replace with real customer reviews
export const REVIEWS = [
  { name: 'Ananya', city: 'Mumbai', text: 'The lehenga looked even richer in person and the custom fitting was spot on. Arrived a week before my sister’s wedding.' },
  { name: 'Priya', city: 'Jaipur', text: 'Booked a video call to see the colours live and it really helped me choose. Packing was beautiful too.' },
  { name: 'Ritika', city: 'Bengaluru', text: 'Semi-stitched set reached in four days. My tailor said the fabric quality is excellent for the price.' },
  { name: 'Megha', city: 'Delhi', text: 'Exchanged a size with no fuss. The team on WhatsApp replied within minutes.' },
  { name: 'Sana', city: 'Hyderabad', text: 'Wore the mint Noor Edit set for my mehendi and got so many compliments.' },
  { name: 'Kavya', city: 'Pune', text: 'The Heritage Luxe piece is heavy, detailed and worth every rupee.' },
];

const byType = (t, n = 0) => PRODUCTS.filter((p) => p.type === t)[n];
export const BLOGS = [
  { slug: 'lehenga-for-every-wedding-function', title: 'How to choose a lehenga for every wedding function', excerpt: 'From haldi yellows to reception golds: a function-by-function guide.', date: '12 Nov 2026', product: byType('lehenga', 2),
    body: ['A wedding week can mean five or six outfits. Start with the main day and work outward: the wedding-day look sets the palette, and every other function should feel related without competing.', 'For haldi and mehendi, choose light cotton, georgette or organza in yellows, mints and greens. Sangeet is the time for movement: lighter flares and sequins that catch the stage lights. Engagement and reception lehengas can go heavier, in tissue, net or velvet.', 'Finally, think about comfort. Semi-stitched pieces let your tailor perfect the fit, while ready-to-wear sets save time when the calendar is packed.'] },
  { slug: 'bridal-colour-trends', title: 'Bridal colour trends we love this season', excerpt: 'Beyond classic red: wine, ivory-gold and soft blush.', date: '2 Nov 2026', product: byType('ready-to-wear', 3),
    body: ['Red will always belong to brides, but this season we are seeing more wines, deep maroons and ivory paired with antique gold zari.', 'Blush pinks and pastels are popular for day weddings, while evening ceremonies lean into rich velvets and heavy dupattas. Whatever you choose, look at the colour in daylight; our video appointments make that easy.'] },
  { slug: 'navratri-picks', title: 'Navratri picks: twirl-ready outfits for nine nights', excerpt: 'Light flares, mirror work and colours for every night.', date: '24 Sep 2026', product: byType('indo-western', 1),
    body: ['Garba nights call for outfits that move. Look for lighter fabrics, generous flare and mirror or gota work that shines without adding weight.', 'Indo western cape sets and cotton lehengas are ideal for back-to-back nights. Plan a colour for each day and mix dupattas to stretch a few pieces across all nine nights.'] },
  { slug: 'semi-stitched-vs-ready-to-wear', title: 'Semi-stitched vs ready to wear: which should you pick?', excerpt: 'Fit, timelines and price compared.', date: '10 Sep 2026', product: byType('lehenga', 5),
    body: ['Semi-stitched lehengas arrive with the skirt mostly finished and the blouse fabric unstitched, so your tailor can fit you exactly. They ship the same day.', 'Ready-to-wear sets come fully stitched in standard sizes, which is perfect when time is short. For the best of both, choose custom fit and we stitch to your measurements.'] },
];

export const FAQS = [
  ['What is a semi-stitched lehenga?', 'The skirt is mostly stitched with room to adjust, and the blouse fabric comes unstitched so your tailor can fit it to you. Semi-stitched orders ship the same day.'],
  ['Do you offer custom stitching?', 'Yes. Choose “Custom fit” on the product page. It is free on prepaid orders and ships in 10–12 working days.'],
  ['Is cash on delivery available?', 'Yes, across India, with a ₹99 COD fee. Custom fitting is available on prepaid orders only.'],
  ['How long does delivery take?', 'Most orders arrive 3–7 days after dispatch, depending on your pincode.'],
  ['Can I exchange or return?', 'Unused, unaltered pieces can be exchanged within 7 days of delivery. Custom-fit pieces cannot be returned.'],
  ['Can I see the outfit before buying?', 'Yes. Book a free video appointment and our stylist will show you the piece live.'],
];

export const POLICIES = {
  'refund-policy': { title: 'Refund policy', sections: [['Eligibility', 'Refunds are issued for orders cancelled before dispatch, or for items that arrive damaged or incorrect. Report damage within 48 hours of delivery with an unboxing video.'], ['Timelines', 'Approved refunds for prepaid orders are credited to the original payment method within 7–10 working days. COD refunds are made by bank transfer or store credit.'], ['Non-refundable', 'Custom-fit pieces, altered items and sale items marked final sale are not refundable.']] },
  'shipping-policy': { title: 'Shipping policy', sections: [['Dispatch', 'Semi-stitched orders ship the same day if placed before 2 PM. Ready to wear ships in 3–5 working days. Custom fit ships in 10–12 working days.'], ['Delivery', 'We ship across India. Delivery usually takes 3–7 days after dispatch. Prepaid orders ship free; COD orders below ₹4,999 carry a ₹149 fee.'], ['Tracking', 'You will receive a tracking link by SMS, WhatsApp and email once your order ships.']] },
  'stitching-policy': { title: 'Stitching policy', sections: [['Custom fitting', 'Custom fitting is free on prepaid orders and costs ₹1,500 otherwise.'], ['How it works', 'Place your order and choose custom fit. Our stylist contacts you within 24 hours to take measurements. We stitch, quality-check and dispatch in 10–12 working days.'], ['Alterations', 'If the fit is off because of our stitching, we alter it free within 7 days of delivery.']] },
  'return-policy': { title: 'Return & exchange', sections: [['Window', 'Exchange unused, unwashed and unaltered pieces with original tags within 7 days of delivery.'], ['How to request', 'WhatsApp us your order number and reason. We arrange a reverse pickup where available, then ship your exchange or issue store credit.'], ['Not eligible', 'Custom-fit, altered and final-sale items.']] },
  'privacy-policy': { title: 'Privacy policy', sections: [['What we collect', 'Your name, contact details, address and measurements, to process orders and provide support.'], ['How we use it', 'To fulfil orders, send updates and, if you opt in, share offers. We never sell your personal data.'], ['Your choices', 'You can ask us to access, correct or delete your data, or opt out of marketing, at any time.']] },
  terms: { title: 'Terms of service', sections: [['General', 'By using this site you agree to these terms. Prices are in Indian Rupees and include applicable taxes.'], ['Products', 'Colours may vary slightly from photographs. Handwork may show small, natural variations.'], ['Orders', 'We may cancel an order in case of pricing errors or stock unavailability, with a full refund.']] },
};
