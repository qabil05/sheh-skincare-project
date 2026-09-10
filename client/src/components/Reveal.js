'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Reveal({ children, className = '', delay = 0, y = 28, eager = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }

    if (eager) {
      const tween = gsap.to(el, { opacity: 1, y: 0, duration: 1.08, delay, ease: 'power3.out' });
      return () => tween.kill();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.05, delay, ease: 'power3.out' });
        observer.disconnect();
      }
    }, { threshold: 0.18 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, y, eager]);
  return <div ref={ref} className={`reveal ${className}`} style={{ transform: `translateY(${y}px)` }}>{children}</div>;
}
