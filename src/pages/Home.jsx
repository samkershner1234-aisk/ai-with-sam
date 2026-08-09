// Home page layout
import ScrollProgress from "../components/landing/ScrollProgress";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import PainSection from "../components/landing/PainSection";
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

export default function Home() {
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
      {/* 5. How it works */}
      <HowItWorks />
      {/* 6. Guarantee / risk reversal */}
      <GuaranteeSection />
      {/* 7. About Sam and credibility */}
      <BioSection />
      {/* 8. Free resource for visitors not ready to book */}
      <FreeAuditPromo />
      {/* 9. Enterprise teaser (secondary employer path) */}
      <TeamsPromo />
      {/* 10. FAQ */}
      <FAQSection />
      {/* 11. Final individual CTA */}
      <ClosingCTA />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
