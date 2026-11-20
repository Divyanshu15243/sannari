import { useId, useState } from 'react';

// Free stock photos from Unsplash (Unsplash License: free for commercial use, no attribution required).
// Stored in /public/images. Replace with your real product photos: set product.image, or edit these pools.
const PHOTOS = {
  lehenga: [1, 2, 3, 4, 5, 6],
  'ready-to-wear': [2, 3, 5, 6, 4, 1],
  'indo-western': [9, 8, 7, 10],
  western: [9, 10, 8, 7],
  saree: [7, 8, 10, 4],
};
// Different crops per view, so gallery thumbnails don't look identical
const POSITIONS = ['50% 30%', '50% 75%', '50% 15%', '50% 50%'];

function productPhoto(product, view = 0) {
  if (product.image) return product.image;
  const pool = PHOTOS[product.type] || PHOTOS.lehenga;
  return `/images/photo-${pool[(product.id + view) % pool.length]}.jpg`;
}

export default function ProductArt({ product, view = 0 }) {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        className="art"
        src={productPhoto(product, view)}
        alt={product.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        style={{ objectFit: 'cover', objectPosition: POSITIONS[view] || 'center', display: 'block' }}
      />
    );
  }
  return <ProductIllustration product={product} view={view} />;
}

// Illustrated fallback, shown if a photo fails to load
const VIEWS = ['0 0 300 400', '45 160 210 240', '70 24 160 160', '0 0 300 400'];

function ProductIllustration({ product, view = 0 }) {
  const id = useId().replace(/:/g, '');
  const { c1: c, c2: a, type: t } = product;
  const bg = view === 3 ? `color-mix(in srgb, ${a} 24%, #fff)` : `color-mix(in srgb, ${c} 14%, #fbf6f3)`;

  let skirt, band, hem = [40, 260];
  if (t === 'western') { skirt = 'M104 120 Q150 128 196 120 L236 372 Q150 388 64 372Z'; band = 'M68 350 Q150 362 232 350 L236 372 Q150 388 64 372Z'; hem = [70, 230]; }
  else if (t === 'saree') { skirt = 'M104 120 Q150 128 196 120 L214 374 Q150 384 86 374Z'; band = 'M88 354 Q150 362 212 354 L214 374 Q150 384 86 374Z'; hem = [92, 208]; }
  else { skirt = 'M102 120 Q150 130 198 120 L272 370 Q150 394 28 370Z'; band = 'M36 342 Q150 366 264 342 L272 370 Q150 394 28 370Z'; }
  const bodice = 'M108 60 Q150 48 192 60 L199 120 Q150 130 101 120Z';
  const dupatta = 'M114 64 C40 130 30 260 52 366 L78 368 C62 260 82 150 126 72Z';
  const cape = 'M108 62 C70 140 52 240 50 330 Q78 342 98 332 L106 120Z M192 62 C230 140 248 240 250 330 Q222 342 202 332 L194 120Z';
  const pallu = 'M184 60 L206 68 L128 232 L100 216Z';
  const pleats = [1, 2, 3, 4, 5, 6].map((k) => ({ x0: 104 + k * 13.5, x1: hem[0] + ((hem[1] - hem[0]) * k) / 7 }));

  return (
    <svg viewBox={VIEWS[view]} preserveAspectRatio="xMidYMid slice" role="img" aria-label={product.name} className="art">
      <defs>
        <pattern id={`${id}p`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="1.5" fill={a} /><circle cx="0" cy="0" r=".9" fill={a} /><circle cx="12" cy="12" r=".9" fill={a} />
        </pattern>
        <linearGradient id={`${id}s`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".22" /><stop offset=".45" stopColor="#fff" stopOpacity=".08" /><stop offset="1" stopColor="#000" stopOpacity=".26" />
        </linearGradient>
        <radialGradient id={`${id}g`} cy=".3"><stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="300" height="400" style={{ fill: bg }} />
      <circle cx="150" cy="150" r="170" fill={`url(#${id}g)`} />
      <ellipse cx="150" cy="384" rx="125" ry="10" fill="#000" opacity=".1" />
      <circle cx="150" cy="24" r="7" fill="#8c7b70" /><rect x="146" y="28" width="8" height="26" fill="#8c7b70" />
      <path d={skirt} fill={c} /><path d={skirt} fill={`url(#${id}p)`} opacity=".45" />
      {pleats.map((p, i) => <path key={i} d={`M${p.x0} 124 L${p.x1} 372`} stroke="#000" strokeOpacity=".09" strokeWidth="2" />)}
      <path d={skirt} fill={`url(#${id}s)`} />
      <path d={band} fill={a} /><path d={band} fill={`url(#${id}p)`} opacity=".5" />
      <path d={bodice} fill={c} /><path d={bodice} fill={`url(#${id}p)`} />
      <path d="M101 112 Q150 122 199 112 L199 120 Q150 130 101 120Z" fill={a} />
      <path d="M132 56 Q150 74 168 56" fill="none" stroke={a} strokeWidth="3" />
      {(t === 'lehenga' || t === 'ready-to-wear') && <><path d={dupatta} fill={a} opacity=".45" /><path d={dupatta} fill={`url(#${id}p)`} opacity=".7" /></>}
      {t === 'indo-western' && <path d={cape} fill={a} opacity=".6" />}
      {t === 'saree' && <><path d={pallu} fill={a} opacity=".9" /><path d={pallu} fill={`url(#${id}p)`} /></>}
    </svg>
  );
}
