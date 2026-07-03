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
<div style={{ fontFamily: "'Inter', sans-serif" }}>
<ScrollProgress />
<Navbar />
<Hero />
<PainSection />
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
