import { products } from '@/lib/data';
import ProductPageClient from '@/components/ProductPageClient';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export default async function ProductPage({ params }) {
  const { slug } = await params;
  return <ProductPageClient slug={slug} />;
}
