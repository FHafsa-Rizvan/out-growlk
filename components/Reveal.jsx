"use client";
// Fades sections in as they scroll into view (elements with the "rv" class).
import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll(".rv")];
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((en) => en.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
