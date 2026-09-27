import Image from 'next/image';
import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-art" aria-hidden="true"><Image src="/images/editorial/footer-newsletter.webp" alt="" fill sizes="100vw" className="cover-image" /></div>
      <div className="footer-statement">
        <p className="micro">Sheh / Skin & ritual</p>
        <h2>The first touch<br />of nature on your skin.</h2>
      </div>
      <div className="footer-newsletter">
        <p>Quiet notes on skin, ritual and new releases.</p>
        <NewsletterForm />
      </div>
      <div className="footer-links">
        <div><p className="micro">Explore</p><Link href="/shop">Collection</Link><Link href="/ingredients">Ingredients</Link><Link href="/rituals">Rituals</Link></div>
        <div><p className="micro">Sheh</p><Link href="/about">Our Story</Link><Link href="/journal">Journal</Link><Link href="/contact">Contact</Link></div>
        <div><p className="micro">Follow</p><a href="#">Instagram</a><a href="#">Pinterest</a><a href="#">Are.na</a></div>
      </div>
      <div className="footer-disclaimer">This website was created as a design template and concept showcase. It does not represent a real company, brand or products. Nothing is offered for sale.</div>\n      <div className="footer-base"><span>© 2026 Sheh. All rights reserved.</span><span>Designed around light, water, glass & botanicals.</span></div>
    </footer>
  );
}
