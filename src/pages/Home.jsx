// Home page layout
import { useEffect } from "react";
import ScrollProgress from "../components/landing/ScrollProgress";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import PainSection from "../components/landing/PainSection";
import RoleExamples from "../components/landing/RoleExamples";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import PricingSection from "../components/landing/PricingSection";
import GuaranteeSection from "../components/landing/GuaranteeSection";
import BioSection from "../components/landing/BioSection";
import FAQSection from "../components/landing/FAQSection";
import FreeAuditPromo from "../components/landing/FreeAuditPromo";
import TeamsPromo from "../components/landing/TeamsPromo";
import ClosingCTA from "../components/landing/ClosingCTA";
import Footer from "../components/landing/Footer";
import MobileStickyBar from "../components/landing/MobileStickyBar";

const PROD_ORIGIN = "https://www.aiforeveryrole.com";

function upsertNamedMeta(name, content) {
  try {
    let el = document.head.querySelector('meta[name="' + name + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  } catch (e) { /* ignore */ }
}

function upsertPropertyMeta(prop, content) {
  try {
    let el = document.head.querySelector('meta[property="' + prop + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
    el.setAttribute("content", content);
  } catch (e) { /* ignore */ }
}

function upsertCanonical(href) {
  try {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
    el.setAttribute("href", href);
  } catch (e) { /* ignore */ }
}

export default function Home() {
  useEffect(() => {
    document.title = "1-to-1 AI Coaching for Professionals | AI With Sam";
    upsertNamedMeta("description", "Personalised 1-to-1 AI help built around your actual job. Bring one real task and build a practical AI workflow you can start using immediately.");
    upsertNamedMeta("robots", "index, follow");
    upsertCanonical(PROD_ORIGIN + "/");
    upsertPropertyMeta("og:title", "1-to-1 AI Coaching for Professionals | AI With Sam");
    upsertPropertyMeta("og:description", "Personalised 1-to-1 AI help built around your actual job. Bring one real task and build a practical AI workflow you can start using immediately.");
    upsertPropertyMeta("og:type", "website");
    upsertPropertyMeta("og:url", PROD_ORIGIN + "/");
    upsertNamedMeta("twitter:card", "summary_large_image");
    upsertNamedMeta("twitter:title", "1-to-1 AI Coaching for Professionals | AI With Sam");
    upsertNamedMeta("twitter:description", "Personalised 1-to-1 AI help built around your actual job. Bring one real task and build a practical AI workflow you can start using immediately.");
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0F172A" }}>
      <ScrollProgress />
      <Navbar />
      {/* 1. Hero: primary individual offer */}
      <Hero />
      {/* 2. Strongest proof: real client results */}
      <Testimonials />
      {/* 3. Problem and desired outcome */}
      <PainSection />
      {/* "The problem isn't you" highlight box */}
      <section style={{ background: "#0F172A", padding: "0 24px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.04))", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: 18, padding: "36px 40px", textAlign: "center", boxShadow: "0 0 40px rgba(249,115,22,0.08)" }}>
            <p style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 800, color: "#fff", lineHeight: 1.4, margin: 0 }}>
              The problem isn't you.<br />
              <span style={{ color: "#F97316" }}>No one has ever built an AI solution for YOUR specific job.</span>
              <br />Until now.
            </p>
          </div>
        </div>
      </section>
      {/* 4. Individual offer and price */}
      <PricingSection />
      {/* 5. Role-specific examples */}
      <RoleExamples />
      {/* 6. How it works */}
      <HowItWorks />
      {/* 7. Guarantee / risk reversal */}
      <GuaranteeSection />
      {/* 8. About Sam and credibility */}
      <BioSection />
      {/* 9. Free resource for visitors not ready to book */}
      <FreeAuditPromo />
      {/* 10. Teams teaser (secondary employer path) */}
      <TeamsPromo />
      {/* 11. FAQ */}
      <FAQSection />
      {/* 12. Final individual CTA */}
      <ClosingCTA />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
