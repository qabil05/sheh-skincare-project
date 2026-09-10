'use client';

import { useRef } from 'react';

export default function ParallaxMedia({ children, className = '' }) {
  const ref = useRef(null);
  const frame = useRef(null);
  const point = useRef({ x: 0, y: 0 });

  const paint = () => {
    frame.current = null;
    const el = ref.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const x = (point.current.x - box.left) / box.width - 0.5;
    const y = (point.current.y - box.top) / box.height - 0.5;
    el.style.setProperty('--px', `${x * 11}px`);
    el.style.setProperty('--py', `${y * 9}px`);
  };

  const move = (event) => {
    if (typeof window !== 'undefined' && (window.innerWidth < 981 || window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    point.current = { x: event.clientX, y: event.clientY };
    if (!frame.current) frame.current = requestAnimationFrame(paint);
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = null;
    el.style.setProperty('--px', '0px');
    el.style.setProperty('--py', '0px');
  };

  return <div ref={ref} className={`parallax-media ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</div>;
}
