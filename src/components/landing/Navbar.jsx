import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CTA_URL, TEAM_BOOKING_URL } from "./constants";

// Shared site navigation used on both the Home (individual) page and the
// Teams page. The middle links and destinations stay constant; only the
// primary call-to-action changes by page context via the `variant` prop.
export default function Navbar({ variant = "home" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isTeams = variant === "teams";
  const ctaHref = isTeams ? TEAM_BOOKING_URL : CTA_URL;
  const ctaLabel = isTeams ? "Discuss a Team Pilot" : "Book a Free 20-Min Call";

  const links = [
    { label: "For Individuals", to: "/" },
    { label: "For Teams", to: "/teams" },
    { label: "Free AI Audit", to: "/ai-time-waste-audit" },
    { label: "About Sam", to: "/#about" },
  ];

  return (
    <nav style={{ background: "#0F172A", height: "72px", position: "sticky", top: 0, zIndex: 1000, borderBottom: scrolled ? "1px solid #1E293B" : "none" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flex: "0 0 auto" }}>
          <img src="/logo.png" alt="AI With Sam Logo" style={{ height: "36px", width: "36px", objectFit: "contain" }} />
          <span style={{ fontWeight: 800, color: "#FFFFFF", fontSize: "20px", whiteSpace: "nowrap" }}><span style={{ color: "#F97316" }}>AI</span> With Sam</span>
        </Link>

        <div className="desk-nav" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={{ color: "#CBD5E1", fontSize: "15px", fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap" }}>{l.label}</Link>
          ))}
        </div>

        <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="desk-cta" style={{ background: "#F97316", color: "#FFFFFF", fontWeight: 700, fontSize: "14px", padding: "12px 24px", borderRadius: "50px", textDecoration: "none", whiteSpace: "nowrap", flex: "0 0 auto" }}>{ctaLabel}</a>

        <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="mob-burger" style={{ background: "none", border: "none", cursor: "pointer", color: "#FFFFFF", padding: "8px" }}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 18L18 6M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ background: "#0F172A", borderTop: "1px solid #1E293B", padding: "12px 24px 24px" }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ display: "block", color: "#CBD5E1", fontSize: "16px", fontWeight: 500, padding: "14px 0", textDecoration: "none", borderBottom: "1px solid #1E293B" }}>{l.label}</Link>
          ))}
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} style={{ display: "block", marginTop: "18px", background: "#F97316", color: "#FFFFFF", fontWeight: 700, fontSize: "16px", padding: "16px 24px", borderRadius: "50px", textDecoration: "none", textAlign: "center" }}>{ctaLabel}</a>
        </div>
      )}

      <style>{`@media(max-width:900px){.desk-nav{display:none!important}.desk-cta{display:none!important}.mob-burger{display:block!important}}@media(min-width:901px){.mob-burger{display:none!important}}`}</style>
    </nav>
  );
}
