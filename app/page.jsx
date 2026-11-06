import Loader from "../components/Loader";
import Mark from "../components/Mark";
import ThemeToggle from "../components/ThemeToggle";
import Workflow from "../components/Workflow";
import Services from "../components/Services";
import Why from "../components/Why";
import Journey from "../components/Journey";
import Packages from "../components/Packages";
import Brief from "../components/Brief";
import Reveal from "../components/Reveal";
import { projects } from "../data/projects";
import { faq } from "../data/faq";
import { INSTAGRAM_URL, INSTAGRAM_PROFILE } from "../data/site";

const tools = ["Next.js", "WordPress", "Framer", "Bootstrap", "PHP", "MySQL", "Python", "Git and GitHub", "Google Maps API", "Vercel", "Netlify", "Meta Ads", "Google Ads"];
const pad = (n) => String(n).padStart(2, "0");

export default function Home() {
  return (
    <>
      <Loader />
      <Reveal />
      <div className="wrap">
        <header>
          <a className="brand" href="#top" aria-label="OutgrowLK home"><Mark /> OutgrowLK</a>
          <nav>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#why">Why us</a>
            <a href="#process">Process</a>
            <a href="#packages">Packages</a>
            <a href="#faq">FAQ</a>
            <a className="pill" href="#contact">Say hello</a>
            <ThemeToggle />
          </nav>
        </header>

        <main id="top">
          <div className="hero">
            <div className="reveal">
              <p className="pill-t">Web design and performance marketing in Sri Lanka</p>
              <h1>Your business, outgrowing its limits.</h1>
              <p>OutgrowLK designs and builds websites for Sri Lankan businesses, then runs the Meta and Google ads that bring customers to them.</p>
              <div className="cta">
                <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">DM us on Instagram</a>
                <a className="btn ghost" href="#work">See live projects</a>
              </div>
              <ul className="hero-tr"><li>Quality build</li><li>Security-checked before launch</li><li>Typically 7 to 10 days</li><li>Fair prices</li></ul>
            </div>
            <div className="reveal" style={{ animationDelay: ".15s" }}><Workflow /></div>
          </div>

          <section className="mq-s">
            <p className="mq-t">The tools we build with</p>
            <div className="mq-r">
              <div className="mq-k">
                <div className="mq-g">{tools.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="mq-g" aria-hidden="true">{tools.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            </div>
          </section>

          <section id="services">
            <Services />
          </section>

          <section id="work">
            <p className="eye">Selected work</p>
            <h2>Live, not mockups.</h2>
            <div className="pj-list">
              {projects.map((p, i) => (
                <a key={p.name} className="pj rv" href={p.url} target="_blank" rel="noopener noreferrer">
                  <div className="pj-art" aria-hidden="true">
                    <div className="pj-win">
                      <div className="pj-bar"><i /><i /><i /><span>{p.host}</span></div>
                      <div className="pj-body"><b>{p.name}</b><s /><s /><u /></div>
                    </div>
                  </div>
                  <div className="pj-info">
                    <p className="pj-n">{pad(i + 1)} / {pad(projects.length)}</p>
                    <h3>{p.name}</h3>
                    <p className="pj-k">{p.type}</p>
                    <p className="pj-d">{p.desc}</p>
                    <ul className="pj-t">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                    <span className="pj-go">Visit live site <i>↗</i></span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="why">
            <Why />
          </section>

          <section id="process">
            <Journey />
          </section>

          <section id="packages">
            <Packages />
          </section>

          <section id="faq">
            <p className="eye">FAQ</p>
            <h2>Common questions.</h2>
            <div className="faq">
              {faq.map(([q, a], i) => (
                <details key={q} className="rv">
                  <summary><em>{pad(i + 1)}</em>{q}<i /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="final" id="contact">
            <h2>Ready to outgrow?</h2>
            <p className="lead2">Answer four quick questions and we’ll write your first message for you. Copy it, send it to us on Instagram, and we’ll reply with a plan and a price.</p>
            <Brief />
          </section>
        </main>

        <footer className="ft">
          <div className="ft-top">
            <div>
              <p className="ft-b">OutgrowLK designs and builds websites for Sri Lankan businesses, then runs the Meta and Google ads that bring customers to them.</p>
              <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">DM us on Instagram</a>
            </div>
            <div className="ft-n">
              <h4>Explore</h4>
              <a href="#services">Services</a><a href="#work">Work</a><a href="#why">Why us</a><a href="#process">Process</a><a href="#packages">Packages</a><a href="#faq">FAQ</a>
            </div>
            <div className="ft-n">
              <h4>Connect</h4>
              <a href={INSTAGRAM_PROFILE} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#contact">Start a project</a>
            </div>
          </div>
          <div className="ft-w" aria-hidden="true">OutgrowLK</div>
          <p className="ft-c">© 2026 OutgrowLK, Sri Lanka. Designed and built in-house.</p>
        </footer>
      </div>
    </>
  );
}
