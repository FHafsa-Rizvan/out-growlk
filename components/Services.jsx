"use client";
// "Two things, done properly": two live panels. The demos start when scrolled into view,
// and a light follows your cursor across each panel.
import { useEffect, useRef } from "react";

function Card({ cls, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px");
    e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px");
  };
  return <div ref={ref} className={"svc " + cls} onPointerMove={glow}>{children}</div>;
}

export default function Services() {
  return (
    <>
      <p className="eye">What we do</p>
      <h2>Two things, done properly.</h2>
      <div className="two">
        <Card cls="a">
          <span className="pi"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M9.5 7.5L7.5 10l2 2.5M14.5 7.5l2 2.5-2 2.5"/></svg></span><h3>Web design and development</h3><p>Fast, mobile-first sites and web apps that look like they cost more than they did. Built from scratch or on WordPress, whichever suits the business.</p><ul><li>Business websites</li><li>Web apps</li><li>WordPress</li><li>Hosting and launch</li></ul>
        </Card>
        <Card cls="b">
          <span className="pi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg></span><h3>Performance marketing</h3><p>Meta and Google Ads set up around one goal: enquiries and sales you can count.</p><ul><li>Meta Ads</li><li>Google Ads</li><li>Tracking</li><li>Reporting</li></ul>
        </Card>
      </div>
    </>
  );
}
