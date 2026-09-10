'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCommerce } from './CommerceProvider';

export default function ProductCard({ product, index = 0, featured = false, homeMode = false }) {
  const { addItem, setCartOpen } = useCommerce();
  const add = () => { addItem(product); setCartOpen(true); };
  const imageSrc = homeMode ? (product.homeImage || product.image) : product.image;
  return (
    <article className={`product-card tone-${product.accent} ${featured ? 'featured' : ''} ${homeMode ? 'home-product-card' : ''}`}>
      <div className="product-card-media-wrap">
        <Link href={`/shop/${product.slug}`} className="product-card-media" aria-label={`View ${product.name}`}>
          {!homeMode && <span className="product-index">{String(index + 1).padStart(2, '0')}</span>}
          <Image src={imageSrc} alt={product.name} fill sizes={homeMode ? '(max-width: 640px) 48vw, (max-width: 980px) 45vw, 18vw' : '(max-width: 640px) 100vw, (max-width: 980px) 50vw, 46vw'} className="cover-image" />
          {!homeMode && <span className="product-arrow">↗</span>}
        </Link>
        <button className="quick-add" onClick={add} aria-label={`Add ${product.name} to bag`}><span>+</span><b>Add</b></button>
      </div>
      <Link href={`/shop/${product.slug}`} className="product-card-copy-link">
        <div className="product-card-copy">
          <div>
            {!homeMode && <p className="micro">{product.category}</p>}
            <h3>{product.name}</h3>
          </div>
          {!homeMode && <p>${product.price}</p>}
        </div>
        <p className={homeMode ? 'home-product-benefit' : 'product-short'}>{homeMode ? product.eyebrow : product.short}</p>
      </Link>
    </article>
  );
}
