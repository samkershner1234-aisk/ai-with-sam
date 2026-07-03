import { useState } from "react";
import { CTA_URL } from "./constants";

const LINKEDIN_URL = "https://www.linkedin.com/in/samkershner/";
const WHATSAPP_URL = "https://wa.me/972501234567";

const credentials = [
  { icon: "🤖", label: "AI-native", detail: "4+ years building with ChatGPT, Gemini, Claude & N8N" },
  { icon: "📈", label: "Background", detail: "Affiliate & influencer programs across fintech, media, gaming" },
  { icon: "🌍", label: "Global reach", detail: "Clients in Israel, UK & US — every one left with working AI" },
  { icon: "⚡", label: "Same-day results", detail: "No courses. No theory. You use it before you close your laptop." },
];

export default function BioSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section style={{background:"#f8f9fb",padding:"72px 0"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
        <p style={{color:"#F97316",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:13,textAlign:"center",marginBottom:12}}>WHO YOU'RE WORKING WITH</p>

        <div className="bio-card">

          {/* Left: avatar + name */}
          <div className="bio-left">
            {/* Avatar circle */}
            <div style={{width:110,height:110,borderRadius:"50%",background:"linear-gradient(135deg,#1E293B,#0F172A)",border:"4px solid #F97316",display:"flex",alignItems:"center",justifyContent:"center",fontSize:52,marginBottom:16,boxShadow:"0 0 30px rgba(249,115,22,0.25)"}}>
              👨‍💻
            </div>
            <div style={{fontWeight:800,fontSize:22,color:"#1E293B",marginBottom:4}}>Sam</div>
            <div style={{color:"#64748B",fontSize:14,marginBottom:16,textAlign:"center"}}>AI Systems Builder · Tel Aviv</div>

            {/* Social links */}
            <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:20,border:"1.5px solid #CBD5E1",background:"#fff",color:"#1E293B",fontSize:13,fontWeight:600,textDecoration:"none",transition:"all 0.2s"}}>
                <span>💼</span> LinkedIn
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:20,border:"1.5px solid #22C55E",background:"#F0FDF4",color:"#15803D",fontSize:13,fontWeight:600,textDecoration:"none",transition:"all 0.2s"}}>
                <span>💬</span> WhatsApp
              </a>
            </div>
          </div>

          {/* Right: headline + credential tiles + CTA */}
          <div className="bio-right">
            <h2 style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:800,color:"#1E293B",marginBottom:8,lineHeight:1.3}}>
              I Build Working AI Systems.<br/>One Session. Real Results.
            </h2>
            <p style={{color:"#64748B",fontSize:15,marginBottom:24,lineHeight:1.6}}>
              Before this, I spent 4+ years as an AI-native professional. I don't just talk about AI tools — I build with them. Every client leaves with something they can use immediately.
            </p>

            {/* Expandable credential tiles */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
              {credentials.map((c, i) => (
                <button key={i} onClick={() => setExpanded(expanded===i ? null : i)} style={{textAlign:"left",background: expanded===i ? "#FFF7ED" : "#fff",border: expanded===i ? "1.5px solid #F97316" : "1.5px solid #E2E8F0",borderRadius:12,padding:"12px 14px",cursor:"pointer",transition:"all 0.2s"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom: expanded===i ? 6 : 0}}>
                    <span style={{fontSize:20}}>{c.icon}</span>
                    <span style={{fontWeight:700,fontSize:14,color:"#1E293B"}}>{c.label}</span>
                    <span style={{marginLeft:"auto",color:"#F97316",fontSize:12,fontWeight:700}}>{expanded===i ? "▲" : "▼"}</span>
                  </div>
                  {expanded===i && (
                    <p style={{color:"#64748B",fontSize:13,margin:0,lineHeight:1.5}}>{c.detail}</p>
                  )}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#F97316",color:"#fff",fontWeight:700,fontSize:15,padding:"14px 28px",borderRadius:10,textDecoration:"none",transition:"opacity 0.2s"}}>
              Book Your Free 20-Minute Call
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .bio-card {
          display: flex;
          gap: 48px;
          background: #fff;
          border-radius: 20px;
          padding: 48px 44px;
          align-items: flex-start;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
          border: 1.5px solid #E2E8F0;
        }
        .bio-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          min-width: 180px;
        }
        .bio-right {
          flex: 1;
        }
        @media (max-width: 767px) {
          .bio-card {
            flex-direction: column;
            padding: 32px 24px;
            gap: 24px;
          }
          .bio-left {
            min-width: unset;
            width: 100%;
          }
          .bio-right > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
