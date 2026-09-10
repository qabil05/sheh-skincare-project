'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function Contact() {
  const [sent,setSent]=useState(false);
  const submit=async(e)=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget));try{await fetch(`${process.env.NEXT_PUBLIC_API_URL||'http://localhost:5001'}/api/contact`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});}catch{}setSent(true);e.currentTarget.reset();};
  return <main className="page-shell"><section className="contact-layout tone-blush"><div className="contact-copy"><p className="micro">Contact / Studio notes</p><h1>A small line<br /><em>is enough.</em></h1><p>For stockists, collaborations, press or simply to say hello.</p><div className="contact-meta"><span>studio@sheh.skin</span><span>Baku · Copenhagen · Worldwide</span></div><div className="contact-visual"><Image src="/images/editorial/contact-page.webp" alt="Sheh contact studio still life" fill priority quality={92} sizes="(max-width: 980px) 100vw, 42vw" className="cover-image" /></div></div><form className="contact-form" onSubmit={submit}><label>Name<input name="name" required /></label><label>Email<input type="email" name="email" required /></label><label>Subject<input name="subject" required /></label><label>Message<textarea name="message" rows="5" required /></label><button className="pill dark">{sent?'Message received ✓':'Send message ↗'}</button></form></section></main>;
}
