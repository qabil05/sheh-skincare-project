import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import ParallaxMedia from '@/components/ParallaxMedia';
import ProductCard from '@/components/ProductCard';
import { products, ingredients, journal } from '@/lib/data';

export default function Home() {
  return <main className="home-page">
    <section className="reference-hero">
      <div className="reference-hero-copy">
        <Reveal><div className="hero-kicker"><i/><p className="micro spaced">NATURAL SKINCARE. A BRIGHTER YOU.</p></div></Reveal>
        <Reveal delay={.07}><h1>The first touch<br/>of nature<br/>on your skin.</h1></Reveal>
        <Reveal delay={.14}><p className="reference-hero-lead">Sheh is a modern skincare and wellness brand, inspired by nature and guided by a simpler, more intentional way of living.</p></Reveal>
        <Reveal delay={.2}><div className="reference-hero-actions"><Link href="/shop" className="hero-primary-cta">Discover our collection <span>→</span></Link><Link href="/about" className="hero-story-link"><span className="play-circle" aria-hidden="true"><span className="play-glyph" /></span><b>Watch<br/>our story</b></Link></div></Reveal>
        <Reveal delay={.28} className="hero-values"><div><span>01</span><p>Pure Ingredients</p><i/></div><div><span>02</span><p>Visible Rituals</p><i/></div><div><span>03</span><p>A Kinder Tomorrow</p><i/></div></Reveal>
      </div>
      <ParallaxMedia className="reference-hero-media">
        <Image src="/images/hero/homepage-renewal-serum.webp" alt="Sheh Renewal Serum in bright water, stone and botanical light" fill priority quality={94} sizes="100vw" className="cover-image reference-hero-image" />
        <div className="hero-vertical-note"><i/><span>SKINCARE</span><span>WELLNESS</span><span>A BRIGHTER</span><span>TOMORROW</span></div>
      </ParallaxMedia>
    </section>

    <section className="essentials-reference">
      <Reveal className="essentials-intro"><div className="mini-title"><i/><p className="micro">Our essentials</p></div><h2>Skincare<br/>for a brighter<br/>tomorrow.</h2><Link href="/shop" className="outline-cta">Shop all products <span>→</span></Link></Reveal>
      <div className="essentials-product-grid">
        {products.slice(0,4).map((product,index)=><Reveal key={product.slug} delay={index*.05}><ProductCard product={product} index={index} homeMode /></Reveal>)}
      </div>
      <Reveal className="essentials-philosophy"><h3>Nature-led<br/>skincare for real<br/>lives.</h3><p>Thoughtfully crafted formulas that bring out your skin’s natural clarity, day after day.</p><Link href="/about">Our philosophy <span>→</span></Link></Reveal>
    </section>

    <section className="collection-extension">
      <Reveal className="collection-extension-copy"><p className="micro">The collection / 05—09</p><h2>Five more ways<br/>to keep the ritual light.</h2><Link href="/shop" className="text-link animated-text-link"><span>View the full collection</span><b>↗</b></Link></Reveal>
      <div className="collection-extension-grid">
        {products.slice(4).map((product,index)=><Reveal key={product.slug} delay={index*.045}><ProductCard product={product} index={index+4} homeMode /></Reveal>)}
      </div>
    </section>

    <section id="philosophy" className="philosophy-section home-philosophy-v2">
      <div className="philosophy-media"><Image src="/images/editorial/homepage-philosophy.webp" alt="Glass, water, stone and botanical still life" fill quality={92} sizes="(max-width: 980px) 100vw, 50vw" className="cover-image" /></div>
      <div className="philosophy-copy tone-blush"><Reveal><p className="micro">02 / Philosophy</p><h2>Skincare,<br />returned to<br /><em>its simplest form.</em></h2><p>We imagine care as something clear rather than complicated: good textures, considered botanicals, and a ritual you want to return to.</p><Link href="/about" className="text-link animated-text-link"><span>Read our story</span><b>↗</b></Link></Reveal></div>
    </section>

    <section className="ingredients-home section-pad">
      <Reveal className="section-heading"><p className="micro">03 / The ingredient table</p><h2>Botanicals, water,<br />texture & restraint.</h2></Reveal>
      <div className="ingredient-strip">
        {ingredients.slice(0,4).map((item,i)=><Reveal key={item.name} delay={i*.06}><Link href="/ingredients" className={`ingredient-card tone-${item.tone}`}><div className="ingredient-image"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw" className="cover-image" /></div><span>0{i+1}</span><h3>{item.name}</h3><p>{item.role}</p></Link></Reveal>)}
      </div>
    </section>

    <section className="story-product tone-blue">
      <div className="story-sticky"><p className="micro">04 / Product story</p><h2>Renewal<br /><em>Serum</em></h2><p>A fluid first layer for skin that wants water before weight.</p><Link href="/shop/renewal-serum" className="pill">Discover the serum ↗</Link></div>
      <div className="story-scenes">
        <Reveal className="story-scene"><Image src="/images/products/detail/renewal-serum.webp" alt="Renewal Serum product portrait" fill quality={94} sizes="(max-width: 980px) 100vw, 55vw" className="cover-image" /><span className="scene-caption">Frosted glass · pale sage · morning light</span></Reveal>
        <Reveal className="story-scene"><Image src="/images/products/story/renewal-serum-botanical.webp" alt="Renewal Serum botanical composition" fill quality={92} sizes="(max-width: 980px) 100vw, 55vw" className="cover-image" /><span className="scene-caption">Botanical water · aloe · fresh green clarity</span></Reveal>
        <Reveal className="story-scene story-scene-macro"><Image src="/images/products/story/renewal-serum-macro.webp" alt="Macro serum drop texture" fill sizes="(max-width: 980px) 100vw, 55vw" className="cover-image" /><span className="scene-caption">One drop · lucid slip · weightless finish</span></Reveal>
      </div>
    </section>

    <section className="ritual-home section-pad">
      <Reveal className="section-heading split"><div><p className="micro">05 / Daily ritual</p><h2>Morning light.<br />Evening softness.</h2></div><Link href="/rituals" className="pill">See the full ritual ↗</Link></Reveal>
      <div className="ritual-rail">
        {['Cleanse','Prepare','Treat','Seal'].map((step,i)=><div key={step} className="ritual-step"><span>0{i+1}</span><h3>{step}</h3><p>{['Botanical Cleansing Gel','Velvet Dew Essence','Renewal Serum','Quiet Moisture Cream'][i]}</p></div>)}
      </div>
    </section>

    <section className="editorial-pause">
      <Image src="/images/textures/water.webp" alt="Sunlit water texture" fill sizes="100vw" className="cover-image" />
      <div className="editorial-overlay"><p className="micro">A note from Sheh</p><h2>Nothing your skin<br />doesn’t need.</h2></div>
    </section>

    <section className="journal-home section-pad">
      <Reveal className="section-heading split"><div><p className="micro">06 / Journal</p><h2>Notes for a<br />softer pace.</h2></div><p>Small reads on texture, ritual, daylight and the details that make care feel personal.</p></Reveal>
      <div className="journal-grid">{journal.map((post,i)=><Reveal key={post.slug} delay={i*.07}><Link className="journal-card" href={`/journal/${post.slug}`}><div className="journal-media"><Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" className="cover-image" /></div><p className="micro">{post.category} · {post.date}</p><h3>{post.title}</h3><p>{post.excerpt}</p></Link></Reveal>)}</div>
    </section>
  </main>;
}
