'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCommerce } from './CommerceProvider';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';

const links = [
  ['Home', '/'], ['Shop', '/shop'], ['About', '/about'], ['Ingredients', '/ingredients'], ['Rituals', '/rituals'], ['Journal', '/journal'], ['Contact', '/contact']
];

function SearchIcon(){return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.7"/><path d="m16.1 16.1 4.2 4.2"/></svg>}
function BagIcon(){return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 8.2h13l1 12H4.5l1-12Z"/><path d="M8.7 8.2V6a3.3 3.3 0 0 1 6.6 0v2.2"/></svg>}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setSearchOpen, setCartOpen } = useCommerce();

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);
  return (
    <>
      <header className="site-header home-reference-header">
        <Link href="/" className="brand-lockup" onClick={() => setOpen(false)}>
          <span className="brand-mark">Sheh</span>
          <span className="brand-tagline">THE FIRST TOUCH<br/>OF NATURE ON YOUR SKIN.</span>
        </Link>
        <nav className="desktop-nav">
          {links.map(([label, href]) => <Link key={href} href={href} className={(href === '/' ? pathname === '/' : pathname.startsWith(href)) ? 'active' : ''}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="header-svg-button" aria-label="Search" onClick={() => setSearchOpen(true)}><SearchIcon/></button>
          <button className="header-svg-button bag-svg-button" aria-label={`Bag with ${cartCount} items`} onClick={() => setCartOpen(true)}><BagIcon/><span>{cartCount}</span></button>
          <button className={`menu-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-navigation"><i /><i /></button>
        </div>
        <div id="mobile-navigation" className={`mobile-menu ${open ? 'open' : ''}`}>
          <p className="micro">The first touch of nature on your skin.</p>
          {links.map(([label, href], i) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>{String(i + 1).padStart(2,'0')}</span>{label}</Link>)}
          <div className="mobile-utility-row"><button onClick={() => {setOpen(false);setSearchOpen(true)}}>Search</button><button onClick={() => {setOpen(false);setCartOpen(true)}}>Bag ({cartCount})</button></div>
        </div>
      </header>
      <SearchOverlay />
      <CartDrawer />
    </>
  );
}
