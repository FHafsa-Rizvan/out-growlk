"use client";
// Light / dark switch. It remembers the choice, and follows the device setting until you pick one.
// The colours live in app/globals.css (the :root[data-theme] rules).
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const root = document.documentElement, mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setMode(root.dataset.theme || (mq.matches ? "dark" : "light"));
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const flip = () => {
    const next = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setMode(next);
  };

  return (
    <button className="tg" type="button" data-mode={mode} onClick={flip} aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} theme`}>
      <svg className="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" /><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3L7 7M17 17l1.7 1.7M5.3 18.7L7 17M17 7l1.7-1.7" /></svg>
      <svg className="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" /></svg>
    </button>
  );
}
