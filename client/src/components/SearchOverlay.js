'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { useCommerce } from './CommerceProvider';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useCommerce();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchOpen) return;
    setQuery('');
    const timer = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (event) => event.key === 'Escape' && setSearchOpen(false);
    window.addEventListener('keydown', onKey);
    return () => { clearTimeout(timer); window.removeEventListener('keydown', onKey); };
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products.filter((product) => [
      product.name, product.category, product.short, product.eyebrow,
      ...(product.ingredients || [])
    ].join(' ').toLowerCase().includes(q));
  }, [query]);

  return (
    <div className={`search-overlay ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
      <button className="overlay-backdrop" aria-label="Close search" onClick={() => setSearchOpen(false)} />
      <section className="search-panel" role="dialog" aria-modal="true" aria-label="Search products">
        <div className="search-panel-top">
          <p className="micro">Search the Sheh collection</p>
          <button className="round-close" onClick={() => setSearchOpen(false)} aria-label="Close search">×</button>
        </div>
        <label className="search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.8"/><path d="m16.2 16.2 4.1 4.1"/></svg>
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search serum, cream, aloe…" />
        </label>
        <div className="search-results-meta"><span>{query ? `${results.length} results` : 'Suggested essentials'}</span><span>Type to filter instantly</span></div>
        <div className="search-results">
          {results.map((product) => (
            <Link key={product.slug} href={`/shop/${product.slug}`} className="search-result" onClick={() => setSearchOpen(false)}>
              <div className={`search-result-image tone-${product.accent}`}>
                <Image src={product.homeImage || product.image} alt="" fill sizes="90px" className="cover-image" />
              </div>
              <div><p className="micro">{product.category}</p><h3>{product.name}</h3><span>{product.eyebrow}</span></div>
              <strong>${product.price}</strong>
            </Link>
          ))}
          {!results.length && <div className="search-empty"><h3>No quiet match yet.</h3><p>Try “serum”, “cream”, “aloe” or “hydration”.</p></div>}
        </div>
      </section>
    </div>
  );
}
