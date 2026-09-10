'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { products } from '@/lib/data';
import { useCommerce } from '@/components/CommerceProvider';

export default function CheckoutPage() {
  const { cart, setQuantity, removeItem, clearCart } = useCommerce();
  const [shipping, setShipping] = useState('standard');
  const [complete, setComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const items = useMemo(() => Object.entries(cart).map(([slug, quantity]) => ({
    product: products.find((item) => item.slug === slug),
    quantity
  })).filter((item) => item.product), [cart]);

  const subtotal = items.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  const shippingCost = shipping === 'express' ? 14 : subtotal >= 80 ? 0 : 6;
  const total = subtotal + shippingCost;

  const submit = (event) => {
    event.preventDefault();
    const id = `SH-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    try {
      const saved = JSON.parse(window.localStorage.getItem('sheh-orders') || '[]');
      saved.unshift({ id, createdAt: new Date().toISOString(), items, subtotal, shipping: shippingCost, total });
      window.localStorage.setItem('sheh-orders', JSON.stringify(saved.slice(0, 12)));
    } catch (_) {}
    setOrderNumber(id);
    clearCart();
    setComplete(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (complete) {
    return <main className="checkout-shell checkout-complete">
      <section className="checkout-confirmation tone-sage">
        <p className="micro">Order confirmed / {orderNumber}</p>
        <h1>Thank you.<br/><em>Your ritual is on its way.</em></h1>
        <p>A confirmation has been prepared for your order. We’ll keep you updated as it moves through packing and delivery.</p>
        <Link href="/shop" className="pill dark">Continue shopping <span>→</span></Link>
      </section>
    </main>;
  }

  if (!items.length) {
    return <main className="checkout-shell checkout-empty">
      <section className="checkout-confirmation tone-ivory">
        <p className="micro">Your bag</p>
        <h1>Nothing here<br/><em>just yet.</em></h1>
        <p>Explore the Sheh collection and build a ritual that feels like yours.</p>
        <Link href="/shop" className="pill dark">Explore the collection <span>→</span></Link>
      </section>
    </main>;
  }

  return <main className="checkout-shell">
    <section className="checkout-intro">
      <p className="micro">Secure checkout</p>
      <h1>Complete<br/><em>your ritual.</em></h1>
      <p>Thoughtful care, packed simply and sent with attention.</p>
    </section>

    <form className="checkout-grid" onSubmit={submit}>
      <div className="checkout-form-column">
        <section className="checkout-panel">
          <div className="checkout-panel-head"><span>01</span><h2>Contact</h2></div>
          <label>Email<input type="email" name="email" autoComplete="email" required placeholder="you@example.com" /></label>
        </section>

        <section className="checkout-panel">
          <div className="checkout-panel-head"><span>02</span><h2>Delivery</h2></div>
          <div className="checkout-two"><label>First name<input name="firstName" autoComplete="given-name" required /></label><label>Last name<input name="lastName" autoComplete="family-name" required /></label></div>
          <label>Address<input name="address" autoComplete="street-address" required /></label>
          <div className="checkout-two"><label>City<input name="city" autoComplete="address-level2" required /></label><label>Postal code<input name="postalCode" autoComplete="postal-code" required /></label></div>
          <div className="checkout-two"><label>Country / region<select name="country" defaultValue="AZ"><option value="AZ">Azerbaijan</option><option value="TR">Türkiye</option><option value="GB">United Kingdom</option><option value="DE">Germany</option><option value="US">United States</option></select></label><label>Phone<input name="phone" type="tel" autoComplete="tel" /></label></div>
        </section>

        <section className="checkout-panel">
          <div className="checkout-panel-head"><span>03</span><h2>Shipping</h2></div>
          <label className={`shipping-choice ${shipping === 'standard' ? 'selected' : ''}`}><input type="radio" name="shipping" value="standard" checked={shipping === 'standard'} onChange={() => setShipping('standard')} /><span><b>Standard delivery</b><small>3–5 business days</small></span><strong>{subtotal >= 80 ? 'Complimentary' : '$6'}</strong></label>
          <label className={`shipping-choice ${shipping === 'express' ? 'selected' : ''}`}><input type="radio" name="shipping" value="express" checked={shipping === 'express'} onChange={() => setShipping('express')} /><span><b>Express delivery</b><small>1–2 business days</small></span><strong>$14</strong></label>
        </section>

        <section className="checkout-panel">
          <div className="checkout-panel-head"><span>04</span><h2>Payment</h2></div>
          <div className="payment-note"><div><b>Card or cash on delivery</b><p>Complete payment securely when your order arrives.</p></div><span>✓</span></div>
        </section>
      </div>

      <aside className="checkout-summary">
        <div className="checkout-summary-inner">
          <div className="checkout-panel-head"><span>Bag</span><h2>Order summary</h2></div>
          <div className="checkout-items">{items.map(({ product, quantity }) => <article key={product.slug} className="checkout-item">
            <Link href={`/shop/${product.slug}`} className={`checkout-item-image tone-${product.accent}`}><Image src={product.homeImage} alt={product.name} fill sizes="96px" className="cover-image" /></Link>
            <div><Link href={`/shop/${product.slug}`}><h3>{product.name}</h3></Link><p>{product.size}</p><div className="checkout-qty"><button type="button" onClick={() => setQuantity(product.slug, quantity - 1)}>−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity(product.slug, quantity + 1)}>+</button></div></div>
            <div className="checkout-item-price"><strong>${(product.price * quantity).toFixed(2)}</strong><button type="button" onClick={() => removeItem(product.slug)}>Remove</button></div>
          </article>)}</div>
          <div className="checkout-totals"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><div><span>Shipping</span><strong>{shippingCost ? `$${shippingCost.toFixed(2)}` : 'Complimentary'}</strong></div><div className="checkout-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div></div>
          <button className="checkout-submit" type="submit">Place order <span>↗</span></button>
          <p className="checkout-fineprint">By placing your order, you agree to Sheh’s terms and privacy policy.</p>
        </div>
      </aside>
    </form>
  </main>;
}
