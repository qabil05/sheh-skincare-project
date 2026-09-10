'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function TemplateTransition({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out' });
  }, []);
  return <div ref={ref}>{children}</div>;
}
