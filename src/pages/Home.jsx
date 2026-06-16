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
<section style={{background:" #F1F5F9",padding:"40px 24px"}}>
<div style={{maxWidth:"800px",margin:"0 auto",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"20px"}}>
<p style={{color:" #1E293B",fontSize:"16px",lineHeight:1.6,margin:0,flex:1,minWidth:"200px"}}>Not ready to book yet? Message Sam on WhatsApp and ask anything. Usually replies within a few hours.</p>
<a href="https://wa.me/972526198680" target="_blank" rel="noopener noreferrer" style={{background:" #25D366",color:" #FFFFFF",fontWeight:700,fontSize:"15px",padding:"14px 28px",borderRadius:"50px",textDecoration:"none",whiteSpace:"nowrap",flexShrink:0}}>&#128172; Message Sam on WhatsApp</a>
</div>
</section>
<FAQSection />
<ClosingCTA />
<Footer />
<MobileStickyBar />
</div>
);
}
