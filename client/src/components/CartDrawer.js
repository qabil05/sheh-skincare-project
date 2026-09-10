'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';
import { useCommerce } from './CommerceProvider';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQuantity, removeItem } = useCommerce();
  const items = Object.entries(cart).map(([slug, quantity]) => ({
    product: products.find((item) => item.slug === slug), quantity
  })).filter((item) => item.product);
  const subtotal = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);

  return (
    <div className={`cart-shell ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen}>
      <button className="overlay-backdrop" aria-label="Close bag" onClick={() => setCartOpen(false)} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag">
        <div className="cart-head"><div><p className="micro">Your ritual</p><h2>Bag</h2></div><button className="round-close" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>
        <div className="cart-list">
          {items.map(({ product, quantity }) => (
            <article className="cart-item" key={product.slug}>
              <Link className={`cart-thumb tone-${product.accent}`} href={`/shop/${product.slug}`} onClick={() => setCartOpen(false)}>
                <Image src={product.homeImage || product.image} alt={product.name} fill sizes="110px" className="cover-image" />
              </Link>
              <div className="cart-item-copy">
                <p className="micro">{product.category}</p>
                <Link href={`/shop/${product.slug}`} onClick={() => setCartOpen(false)}>{product.name}</Link>
                <span>${product.price}</span>
                <div className="qty-control">
                  <button onClick={() => setQuantity(product.slug, quantity - 1)} aria-label={`Decrease ${product.name}`}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(product.slug, quantity + 1)} aria-label={`Increase ${product.name}`}>+</button>
                </div>
              </div>
              <button className="remove-item" onClick={() => removeItem(product.slug)}>Remove</button>
            </article>
          ))}
          {!items.length && <div className="empty-bag"><p className="micro">0 products</p><h3>Your ritual is still open.</h3><p>Build a calm daily sequence from the Sheh collection.</p><Link className="pill dark" href="/shop" onClick={() => setCartOpen(false)}>Explore essentials <span>→</span></Link></div>}
        </div>
        {!!items.length && <div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><Link className="cart-checkout" href="/checkout" onClick={() => setCartOpen(false)}>Continue to checkout <span>↗</span></Link><p>Complimentary shipping on orders over $80 · Returns within 30 days.</p></div>}
      </aside>
    </div>
  );
}
