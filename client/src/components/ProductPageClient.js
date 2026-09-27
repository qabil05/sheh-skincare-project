'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products, getProduct } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { useCommerce } from '@/components/CommerceProvider';

export default function ProductPageClient({ slug }) {
  const p = getProduct(slug);
  const { addItem, setCartOpen } = useCommerce();

  if (!p) {
    return (
      <main className="page-shell">
        <section className="page-intro">
          <h1>Product not found.</h1>
          <Link href="/shop">Return to collection →</Link>
        </section>
      </main>
    );
  }

  const add = () => {
    addItem(p);
    setCartOpen(true);
  };

  return (
    <main className="product-page">
      <section className={`product-hero tone-${p.accent}`}>
        <div className="product-hero-copy">
          <p className="micro">{p.category} / {p.eyebrow}</p>
          <h1>{p.name}</h1>
          <p className="product-lead">{p.short}</p>
          <div className="product-buy">
            <strong>${p.price}</strong>
            <span>{p.size}</span>
            <button onClick={add}>Add to bag ↗</button>
          </div>
        </div>
        <div className="product-hero-media">
          <Image src={p.image} alt={p.name} fill priority quality={94} sizes="(max-width: 980px) 100vw, 58vw" className="product-detail-image" />
        </div>
      </section>

      <section className="product-story-grid section-pad">
        <div>
          <p className="micro">The feeling</p>
          <h2>A formula developed<br />through touch first.</h2>
        </div>
        <div>
          <p>{p.description}</p>
          <dl>
            <div><dt>How to use</dt><dd>{p.usage}</dd></div>
            <div><dt>Key notes</dt><dd>{p.ingredients.join(' · ')}</dd></div>
          </dl>
        </div>
      </section>

      {p.storyImage && (
        <section className="product-story-visual">
          <Image src={p.storyImage} alt={`${p.name} botanical composition`} fill quality={92} sizes="100vw" className="cover-image" />
          <div>
            <p className="micro">Botanical composition</p>
            <h2>Freshness you can see.</h2>
          </div>
        </section>
      )}

      <section className="texture-duo">
        <div className="texture-image">
          <Image src={p.texture} alt={`${p.name} texture`} fill sizes="(max-width: 980px) 100vw, 50vw" className="cover-image" />
        </div>
        <div className={`texture-copy tone-${p.accent}`}>
          <p className="micro">Texture study</p>
          <h2>Made to disappear<br />into the ritual.</h2>
          <p>Soft slip. Clean finish. No drama between your fingertips and the next step.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="section-heading">
          <p className="micro">Continue the ritual</p>
          <h2>Pairs quietly with.</h2>
        </div>
        <div className="related-grid">
          {products.filter((x) => x.slug !== p.slug).slice(0, 3).map((x, i) => (
            <ProductCard key={x.slug} product={x} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
