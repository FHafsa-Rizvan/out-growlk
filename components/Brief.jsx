"use client";
// The contact section: a short step-by-step brief that writes the client's first Instagram message.
import { useEffect, useRef, useState } from "react";
import { INSTAGRAM_URL } from "../data/site";

const BUILD = ["Business website", "Online store", "Web app", "Booking system", "Meta and Google Ads", "Redesign of my current site", "Not sure yet"];
const NEEDS = ["Mobile-friendly design", "WhatsApp button", "Online payments", "Photo gallery", "Contact form", "Google Maps", "Sinhala / Tamil / English"];
const WHEN = ["As soon as possible", "Within a month", "In 2 to 3 months", "I’m flexible"];
const TITLES = [
  ["First, a quick hello", "Tell us your name and a little about your business."],
  ["What would you like us to build?", "Pick all that apply."],
  ["What should it do?", "Pick what matters most."],
  ["Timing and budget", "A rough idea is fine."],
  ["Your message is ready", "Edit anything you like, then tap the button. We’ll copy your message and open our Instagram chat, so you only need to paste and send."],
];

function Chips({ items, value, onPick }) {
  return (
    <div className="chips">
      {items.map((i) => (
        <button key={i} type="button" aria-pressed={value.includes(i)} onClick={() => onPick(i)}>{i}</button>
      ))}
    </div>
  );
}

export default function Brief() {
  const [s, setS] = useState(0);
  const [f, setF] = useState({ name: "", biz: "", extra: "", budget: "" });
  const [build, setBuild] = useState([]);
  const [needs, setNeeds] = useState([]);
  const [when, setWhen] = useState([]);
  const [msg, setMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const head = useRef(null);
  const [pkg, setPkg] = useState("");
  useEffect(() => {
    const on = (e) => setPkg(e.detail || "");
    window.addEventListener("package", on);
    return () => window.removeEventListener("package", on);
  }, []);

  useEffect(() => { if (s > 0) head.current?.focus({ preventScroll: true }); }, [s]);

  const field = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (list, set) => (x) => set(list.includes(x) ? list.filter((i) => i !== x) : [...list, x]);

  const make = () => {
    let m = "Hi OutgrowLK! 👋\n\n";
    m += (f.name.trim() ? "I’m " + f.name.trim() : "I’d like to start a project");
    m += (f.biz.trim() ? ", and my business is: " + f.biz.trim() : "") + ".\n\n";
    if (pkg) m += "I’m interested in your " + pkg + " package.\n";
    if (build.length) m += "I’d like you to build: " + build.join(", ") + ".\n";
    if (needs.length) m += "It should have: " + needs.join(", ") + ".\n";
    if (f.extra.trim()) m += "Also: " + f.extra.trim() + "\n";
    if (when.length) m += "Timeline: " + when[0] + ".\n";
    if (f.budget.trim()) m += "Budget: " + f.budget.trim() + ".\n";
    return m + "\nCould we chat about it? Thank you!";
  };
  const go = (i) => { if (i === 4) setMsg(make()); setS(i); };
  const copy = () => {
    const fallback = () => { const t = document.getElementById("bMsg"); t.select(); document.execCommand("copy"); };
    try { navigator.clipboard.writeText(msg).catch(fallback); } catch { fallback(); }
    setCopied(true); setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="brief">
      <div className="bp" aria-hidden="true">{TITLES.map((_, i) => <i key={i} className={i <= s ? "on" : ""} />)}</div>
      {pkg && (
        <p className="pkchip">Package: <b>{pkg}</b>{" "}
          <button type="button" aria-label="Remove package" onClick={() => window.dispatchEvent(new CustomEvent("package", { detail: "" }))}>✕</button>
        </p>
      )}
      <h3 ref={head} tabIndex={-1}>{TITLES[s][0]}</h3>
      <p className="q">{TITLES[s][1]}</p>

      {s === 0 && (<>
        <label htmlFor="bName">Your name</label>
        <input type="text" id="bName" autoComplete="name" value={f.name} onChange={field("name")} />
        <label htmlFor="bBiz">Your business and what it does</label>
        <input type="text" id="bBiz" placeholder="e.g. A hardware shop in Beruwala" value={f.biz} onChange={field("biz")} />
      </>)}
      {s === 1 && <Chips items={BUILD} value={build} onPick={toggle(build, setBuild)} />}
      {s === 2 && (<>
        <Chips items={NEEDS} value={needs} onPick={toggle(needs, setNeeds)} />
        <label htmlFor="bExtra">Anything else we should know?</label>
        <textarea id="bExtra" style={{ minHeight: 90 }} value={f.extra} onChange={field("extra")} />
      </>)}
      {s === 3 && (<>
        <Chips items={WHEN} value={when} onPick={(x) => setWhen([x])} />
        <label htmlFor="bBud">Budget (optional)</label>
        <input type="text" id="bBud" placeholder="e.g. Rs. 50,000, or not sure yet" value={f.budget} onChange={field("budget")} />
      </>)}
      {s === 4 && (<>
        <textarea id="bMsg" aria-label="Your message" value={msg} onChange={(e) => setMsg(e.target.value)} />
        <div className="cta">
          <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={copy}>Copy and open Instagram</a>
          <button className="btn ghost" type="button" onClick={copy}>{copied ? "Copied ✓" : "Just copy"}</button>
        </div>
        <p className="note" aria-live="polite">{copied ? "Message copied. Paste it into the chat and press send." : "Instagram doesn’t let websites fill in a message, so we copy it for you and open our chat. Just paste and send."}</p>
      </>)}

      <div className="bn">
        {s > 0 ? <button className="btn ghost" type="button" onClick={() => go(s - 1)}>Back</button> : <span />}
        {s < 4 && <button className="btn" type="button" onClick={() => go(s + 1)}>{s === 3 ? "Write my message" : "Next"}</button>}
      </div>
    </div>
  );
}
