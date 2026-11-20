# Sannari: React storefront UI

A modern, UI-only ethnic-wear storefront built with **React 19 + Vite + React Router + lucide-react**.
There is no backend: the bag, wishlist and forms work in memory only, for demo purposes.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
```

If your host has no SPA rewrites (for example GitHub Pages), build with hash routing:

```bash
VITE_HASH_ROUTER=true npm run build -- --base=./
```

## Pages / routes

| Route | Page |
|---|---|
| `/` | Home: hero slider, categories, services, curated edits, occasions, product tabs, stitching steps, reviews, blog, Instagram grid |
| `/collections/:slug` | Product listing with price/colour/fabric filters, sorting and active-filter chips |
| `/products/:slug` | Product detail: gallery, sizes, stitching options, qty, wishlist, WhatsApp, pincode check, accordions, related |
| `/about` | About us |
| `/contact` | Contact form + video-appointment booking |
| `/cart`, `/checkout` | Bag and checkout (coupon `FESTIVE10`, UPI/card/COD) |
| `/wishlist`, `/login` | Wishlist, login/register |
| `/blog`, `/blog/:slug` | Blog list and article |
| `/faq`, `/size-chart` | FAQs, size chart |
| `/policies/:slug` | refund, shipping, stitching, return, privacy, terms |

Collection slugs: `all`, `new-arrivals`, `best-sellers`, `sale`, `luxe`, `noor`, `bridal`, `lehenga`, `ready-to-wear`,
`indo-western`, `western`, `saree`, `under-5000`, `under-10000`, `10000-15000`, `15000-20000`, `premium`,
`occasion-<name>`, `color-<name>`, `fabric-<name>`.

## Customise

- **Brand name, phone, WhatsApp, email:** `src/data/store.js` → `BRAND`
- **Colours and fonts:** `src/index.css` → `:root` variables
- **Products:** `src/data/store.js` → `PRODUCTS` (currently generated sample data)
- **Product photos:** product images are drawn by `src/components/ProductArt.jsx`. Add an `image` field to each
  product and render `<img src={product.image} alt={product.name} />` in its place.
- **Menus:** `NAV` in `src/data/store.js`

Sample products, prices, reviews, figures and policy text are placeholders: replace them before going live.

## Structure

```
src/
  data/store.js            brand, products, nav, blogs, FAQs, policies
  context/ShopContext.jsx  bag, wishlist, drawers, toast
  components/              Header (mega menu + mobile drawer), Footer, Overlays (cart drawer, search, toast),
                           ProductCard, ProductArt, Common (breadcrumb, page hero, section heading)
  pages/                   Home, Shop, ProductDetail, About, Contact, Cart, Checkout, Misc (wishlist, login,
                           blog, FAQ, size chart, policies), NotFound
```
