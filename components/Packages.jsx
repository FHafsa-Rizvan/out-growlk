"use client";
// Packages: hover to lift a card, click one to select it. The choice is sent to the message
// builder below, so the first message starts with the package the visitor picked.
import { useEffect, useState } from "react";
import { packages } from "../data/packages";

export default function Packages() {
  const [sel, setSel] = useState("");
  useEffect(() => {
    const on = (e) => setSel(e.detail || "");
    window.addEventListener("package", on);
    return () => window.removeEventListener("package", on);
  }, []);
  const pick = (name) => window.dispatchEvent(new CustomEvent("package", { detail: name }));

  return (
    <>
      <p className="eye">Packages</p>
      <h2>Pick a starting point.</h2>
      <p className="pk-sub">Every project is tailored to your business. Typical turnaround is 7 to 10 days, depending on the project.</p>
      <div className="pk-grid">
        {packages.map((p) => (
          <article
            key={p.name}
            className={"pk rv" + (p.featured ? " feat" : "") + (sel === p.name ? " sel" : "")}
            onClick={() => pick(sel === p.name ? "" : p.name)}
          >
            <p className="pk-tag">{p.tag}</p>
            <h3>{p.name}</h3>
            <p className="pk-pr">{p.price}</p>
            <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <a className={"btn" + (p.featured ? "" : " ghost")} href="#contact" onClick={(e) => { e.stopPropagation(); pick(p.name); }}>Get a quote</a>
          </article>
        ))}
      </div>
      <p className="pk-note">Every package includes our strict security check before launch. Choose one and we’ll start your message with it.</p>
    </>
  );
}
