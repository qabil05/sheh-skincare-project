import Image from 'next/image';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Our Story' };

export default function About() {
  return <main className="page-shell">
    <section className="page-intro tone-blush"><Reveal><p className="micro">Our story</p><h1>Made for the space<br /><em>between routine & ritual.</em></h1><p>Sheh is a skincare studio built around brightness, restraint and the sensory intelligence of simple care.</p></Reveal></section>
    <section className="about-campaign"><Image src="/images/hero/about-page-hero.webp" alt="Sheh nature-led campaign in water and morning light" fill priority quality={93} sizes="100vw" className="cover-image" /></section>
    <section className="story-manifesto section-pad"><Reveal><p className="micro">A quieter idea of luxury</p><h2>Luxury can be light.<br />It can look like water on glass,<br />a cream that melts cleanly,<br />or ten unhurried minutes.</h2></Reveal></section>
    <section className="philosophy-section reverse"><div className="philosophy-media"><Image src="/images/ingredients/botanical-laboratory.webp" alt="Botanical extracts and clear laboratory glass" fill quality={100} sizes="(max-width: 980px) 100vw, 50vw" className="cover-image" /></div><div className="philosophy-copy tone-sage"><p className="micro">Nature, edited</p><h2>Not wilderness.<br /><em>Not laboratory.</em><br />A conversation.</h2><p>Our visual and product language sits between botanical softness and modern clarity: leaves beside glass, petals beside water, skin feel beside thoughtful formulation.</p></div></section>
    <section className="values-grid section-pad">{[['01','Clarity','Fewer ideas, expressed better.'],['02','Texture','Every product begins with how it should feel.'],['03','Light','Brightness is part of the brand language.'],['04','Restraint','Nothing added simply to look expensive.']].map(v=><div key={v[0]}><span>{v[0]}</span><h3>{v[1]}</h3><p>{v[2]}</p></div>)}</section>
  </main>;
}
