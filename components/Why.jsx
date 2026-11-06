"use client";
// "Why OutgrowLK exists": the promise, with the closing line lighting up word by word as you scroll.
import { useEffect, useRef } from "react";

const VOW = "Nobody will care about your business the way we do. We work through it with you, and treat it as our own.";
const ICONS = {
  Quality: <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M8 9l4 12 4-12M9 3L8 9M15 3l1 6" /></>,
  Secure: <><path d="M12 2.5l8 3v6.2c0 4.6-3.2 8.2-8 9.8-4.8-1.6-8-5.2-8-9.8V5.5z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>,
  Affordable: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><path d="M7 7h.01" /></>,
  Care: <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></>,
};
const pillars = [
  ["Quality", "Built properly: fast, mobile-first, and designed to make a small business look established."],
  ["Secure", "Every website passes a strict security check before we publish it, and goes live on secure hosting with HTTPS."],
  ["Affordable", "Fair price ranges for every stage of business, so budget never holds the dream back."],
  ["Care", "Your business gets the attention we’d give our own."],
];

export default function Why() {
  const box = useRef(null), quote = useRef(null);
  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ws = [...quote.current.querySelectorAll(".w")];
    const update = () => {
      const r = box.current.getBoundingClientRect(), vh = window.innerHeight;
      box.current.style.setProperty("--p", still ? 1 : Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (r.height + vh * 0.2))));
      const q = Math.max(0, Math.min(1, (vh * 0.85 - quote.current.getBoundingClientRect().top) / (vh * 0.5)));
      ws.forEach((w, i) => w.classList.toggle("on", still || i < q * ws.length));
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <div className="why" ref={box}>
      <div className="ring r2" />
      <div className="ring" />
      <p className="eye">Why OutgrowLK exists</p>
      <h2>Your dream shouldn’t be limited by your budget.</h2>
      <div className="why-grid">
        <p className="lead">We know how big a dream it is to build a website for a small business. With us, it’s within reach: a quality, secure website at a price that fits a small-business budget.</p>
        <ul className="pillars rv">
          {pillars.map(([t, d]) => (
            <li key={t}>
              <span className="pi"><svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[t]}</svg></span>
              <b>{t}</b>
              <span className="pd">{d}</span>
            </li>
          ))}
        </ul>
      </div>
      <svg className="qi" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 8c-3 0-5 2-5 5v5h5v-5H7c0-1.7 1-3 3-3zm9 0c-3 0-5 2-5 5v5h5v-5h-3c0-1.7 1-3 3-3z" /></svg>
      <blockquote className="vow" ref={quote}>
        {VOW.split(" ").map((w, i) => (<span key={i}>{i ? " " : ""}<span className="w">{w}</span></span>))}
      </blockquote>
    </div>
  );
}
