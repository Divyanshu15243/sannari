import { Link } from 'react-router-dom';

export function Breadcrumb({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((it, i) => (
        <span key={i}> / {it.to ? <Link to={it.to}>{it.label}</Link> : it.label}</span>
      ))}
    </nav>
  );
}

export function PageHero({ title, text, crumbs = [] }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumb items={crumbs.length ? crumbs : [{ label: title }]} />
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ title, text, action }) {
  return (
    <div className="section-head">
      <div><h2>{title}</h2>{text && <p>{text}</p>}</div>
      {action}
    </div>
  );
}
