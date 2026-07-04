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
import ClosingCTA from "../components/landing/ClosingCTA";
import Footer from "../components/landing/Footer";
import MobileStickyBar from "../components/landing/MobileStickyBar";

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0F172A" }}>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <PainSection />
      {/* "The problem isn't you" highlight box */}
      <section style={{ background: "#0F172A", padding: "0 24px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.04))", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: 18, padding: "36px 40px", textAlign: "center", boxShadow: "0 0 40px rgba(249,115,22,0.08)" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
            <p style={{ fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 800, color: "#fff", lineHeight: 1.4, margin: 0 }}>
              The problem isn't you.<br />
              <span style={{ color: "#F97316" }}>No one has ever built an AI solution for YOUR specific job.</span>
              <br />Until now.
            </p>
          </div>
        </div>
      </section>
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <GuaranteeSection />
      <BioSection />
      <FAQSection />
      <ClosingCTA />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
