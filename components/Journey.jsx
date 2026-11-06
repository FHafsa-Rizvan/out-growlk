"use client";
// "How we work" section: an arrow flies along a growth path as you scroll,
// and each stage lights up when the arrow reaches it.
import { useEffect, useRef, useState } from "react";

const steps = [
  { t: "Brief", d: "Tell us about your business and what you’d like to build. No technical words needed." },
  { t: "Design", d: "We show you the look and layout before anything is built, so there are no surprises." },
  { t: "Build", d: "We build it and test it on real phones." },
  { t: "Security check", d: "A strict security check before anything is published." },
  { t: "Launch", d: "We take it live on secure hosting, and our ads and tracking start bringing in customers." },
];
const R = [8, 12, 16, 21, 28]; // each stage is bigger than the last
const X = [100, 300, 500, 700, 900];
const T = X.map((x) => (x - 40) / 920); // progress at which each stage lights up

export default function Journey() {
  const box = useRef(null), line = useRef(null), ship = useRef(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = (p) => {
      line.current.style.strokeDashoffset = 100 * (1 - p);
      ship.current.setAttribute("transform", `translate(${40 + p * 920} ${260.4 - p * 220.8}) rotate(-13.5)`);
      setLit(T.filter((t) => p >= t - 0.001).length);
    };
    const update = () => {
      if (still) return set(1);
      const r = box.current.getBoundingClientRect(), vh = window.innerHeight;
      set(Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.15 + r.height))));
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <div className="space" ref={box}>
      <h2>From idea to live website, in five clear steps.</h2>
      <p className="sub">Typically 7 to 10 days from brief to launch, depending on the project.</p>
      <svg className="track" viewBox="0 0 1000 300" aria-hidden="true">
        <path className="trk" d="M40 260.4L960 39.6" />
        <path ref={line} className="trk-on" pathLength="100" d="M40 260.4L960 39.6" />
        {X.map((x, i) => {
          const y = 260.4 - (x - 40) * 0.24;
          return (
            <g key={x} className={i < lit ? "nd on" : "nd"}>
              <circle className="halo" cx={x} cy={y} r={R[i] + 10} />
              <circle className="core" cx={x} cy={y} r={R[i]} />
            </g>
          );
        })}
        <g ref={ship} id="ship" transform="translate(40 260.4) rotate(-13.5)"><polygon points="16,0 -10,-11 -10,11" fill="#ff4a1c" /></g>
      </svg>
      <ol className="steps">
        {steps.map((s, i) => (
          <li key={s.t} className={i < lit ? "on" : ""}><h3>{s.t}</h3><p>{s.d}</p></li>
        ))}
      </ol>
    </div>
  );
}
