import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import { products } from '@/lib/data';

export const metadata = { title: 'Collection' };

export default function Shop() {
  return (
    <main className="page-shell shop-page">
      <section className="page-intro shop-intro tone-ivory">
        <Reveal>
          <p className="micro">The Sheh collection / 01—09</p>
          <h1>Daily care,<br /><em>made tactile.</em></h1>
          <p>Nine daily essentials, composed as one calm, luminous family.</p>
        </Reveal>
      </section>
      <section className="shop-grid shop-grid-lift section-pad">
        {products.map((product, index) => (
          <Reveal
            key={product.slug}
            eager={index < 2}
            y={index < 2 ? 42 : 28}
            delay={index < 2 ? 0.22 + index * 0.14 : (index % 3) * 0.05}
          >
            <ProductCard product={product} index={index} />
          </Reveal>
        ))}
      </section>
    </main>
  );
}
