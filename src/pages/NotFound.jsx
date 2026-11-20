import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container empty tall">
      <h1>Page not found</h1>
      <p>The page you’re looking for has moved or doesn’t exist.</p>
      <Link className="btn" to="/">Back to home</Link>
    </div>
  );
}
