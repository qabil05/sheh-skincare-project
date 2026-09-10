import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/data';

export const metadata = { title: 'Rituals' };

function Rail({ title, items, tone }) {
  return <section className={`routine-panel tone-${tone}`}><div className="routine-title"><p className="micro">Guided ritual</p><h2>{title}</h2></div><div className="routine-steps">{items.map((p,i)=><Link href={`/shop/${p.slug}`} key={p.slug} className="routine-step-card"><span>0{i+1}</span><div className="routine-thumb"><Image src={p.homeImage} alt={p.name} fill sizes="150px" className="cover-image" /></div><div><h3>{p.name}</h3><p>{p.eyebrow}</p></div><b>↗</b></Link>)}</div></section>;
}

export default function Rituals() {
  const morning=[products[2],products[3],products[0],products[1]];
  const evening=[products[2],products[3],products[4],products[5]];
  return <main className="page-shell">
    <section className="page-intro tone-blue"><p className="micro">Rituals</p><h1>Care should feel<br /><em>easy to return to.</em></h1><p>Two rhythms. Four steps. Enough space to make them your own.</p></section>
    <section className="ritual-campaign"><Image src="/images/editorial/ritual-morning.webp" alt="Sheh morning skincare ritual" fill priority quality={93} sizes="100vw" className="cover-image" /><div className="ritual-campaign-copy"><p className="micro">Morning / Clear light</p><h2>Begin with water.<br/>Build in light layers.</h2></div></section>
    <Rail title="Morning / Clear light" items={morning} tone="ivory" />
    <section className="ritual-campaign evening"><Image src="/images/editorial/ritual-evening.webp" alt="Sheh evening skincare ritual" fill quality={93} sizes="100vw" className="cover-image" /><div className="ritual-campaign-copy"><p className="micro">Evening / Soft close</p><h2>Cleanse the day.<br/>Leave softness behind.</h2></div></section>
    <Rail title="Evening / Soft close" items={evening} tone="peach" />
  </main>;
}
