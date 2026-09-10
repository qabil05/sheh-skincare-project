import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { ingredients, textureStudies } from '@/lib/data';

export const metadata = { title: 'Ingredients' };

export default function Ingredients() {
  return <main className="page-shell">
    <section className="page-intro tone-sage"><Reveal><p className="micro">Ingredient library</p><h1>Botanical by nature.<br /><em>Modern by edit.</em></h1><p>A sensory ingredient index for the Sheh collection.</p></Reveal></section>
    <section className="ingredient-lab-banner"><Image src="/images/ingredients/botanical-laboratory.webp" alt="Sheh botanical laboratory glassware and fresh extracts" fill priority quality={93} sizes="100vw" className="cover-image" /><div><p className="micro">The formulation table</p><h2>Clear glass.<br/>Quiet botanicals.</h2></div></section>
    <section className="ingredient-library section-pad">{ingredients.map((item,i)=><Reveal key={item.name}><article className={`ingredient-row tone-${item.tone}`}><div className="ingredient-row-number">{String(i+1).padStart(2,'0')}</div><div className="ingredient-row-image"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 70vw, 38vw" className="cover-image" /></div><div><p className="micro">{item.role}</p><h2>{item.name}</h2><p>{item.copy}</p></div></article></Reveal>)}</section>
    <section className="material-studies section-pad tone-blue"><Reveal className="section-heading split"><div><p className="micro">Material studies</p><h2>Texture is part<br/>of the formula.</h2></div><p>Water, serum, gel and cream are treated as visual materials throughout the Sheh world.</p></Reveal><div className="material-grid">{textureStudies.map((item,i)=><Reveal key={item.name} delay={i*.05}><article className="material-card"><div className="material-card-image"><Image src={item.image} alt={`${item.name} skincare texture`} fill sizes="(max-width: 640px) 100vw, 50vw" className="cover-image" /></div><span>{String(i+1).padStart(2,'0')}</span><h3>{item.name}</h3><p>{item.copy}</p></article></Reveal>)}</div></section>
  </main>;
}
