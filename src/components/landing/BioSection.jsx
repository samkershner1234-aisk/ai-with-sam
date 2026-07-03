import { CTA_URL, WHATSAPP_URL, SAM_PHOTO } from "./constants";

const LINKEDIN_URL = "https://www.linkedin.com/in/samkershner/";

const stats = [
  { value: "4+", label: "Years AI-native" },
  { value: "100%", label: "Same-day results" },
  { value: "3", label: "Countries served" },
  { value: "0", label: "Guarantee claims" },
];

const tags = [
  "ChatGPT", "Claude", "Gemini", "N8N", "Base44",
  "Fintech", "Media", "Gaming", "Israel · UK · US",
];

export default function BioSection() {
  return (
    <section style={{background:"#f8f9fb",padding:"72px 0"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
        <p style={{color:"#F97316",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:13,textAlign:"center",marginBottom:12}}>WHO YOU'RE WORKING WITH</p>

        <div className="bio-card">

          {/* Left: photo + name + links */}
          <div className="bio-left">
            <div style={{position:"relative",marginBottom:16}}>
              <img
                src={SAM_PHOTO}
                alt="Sam Kershner"
                style={{width:130,height:130,borderRadius:"50%",objectFit:"cover",border:"4px solid #F97316",display:"block",boxShadow:"0 0 30px rgba(249,115,22,0.25)"}}
              />
              {/* Online badge */}
              <div style={{position:"absolute",bottom:6,right:6,width:22,height:22,borderRadius:"50%",background:"#22C55E",border:"3px solid #fff",boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}/>
            </div>
            <div style={{fontWeight:800,fontSize:20,color:"#1E293B",marginBottom:2}}>Sam Kershner</div>
            <div style={{color:"#64748B",fontSize:13,marginBottom:18,textAlign:"center"}}>AI Systems Builder · Tel Aviv</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:20,border:"1.5px solid #CBD5E1",background:"#fff",color:"#1E293B",fontSize:13,fontWeight:600,textDecoration:"none"}}>
                💼 LinkedIn
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:20,border:"1.5px solid #22C55E",background:"#F0FDF4",color:"#15803D",fontSize:13,fontWeight:600,textDecoration:"none"}}>
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Right: headline + text + stats strip + tags + CTA */}
          <div className="bio-right">
            <h2 style={{fontSize:"clamp(20px,3vw,28px)",fontWeight:800,color:"#1E293B",marginBottom:8,lineHeight:1.3}}>
              I Build Working AI Systems.<br/>One Session. Real Results.
            </h2>
            <p style={{color:"#64748B",fontSize:15,marginBottom:24,lineHeight:1.65}}>
              Before this, I spent 4+ years as an AI-native professional. I don't just talk about AI tools — I build with them. Every client leaves with something they can use immediately.
            </p>

            {/* Stats strip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
              {stats.map((s, i) => (
                <div key={i} style={{background:"#fff",border:"1.5px solid #E2E8F0",borderRadius:12,padding:"12px 8px",textAlign:"center"}}>
                  <div style={{fontWeight:900,fontSize:22,color:"#F97316",lineHeight:1}}>{s.value}</div>
                  <div style={{color:"#64748B",fontSize:11,fontWeight:600,marginTop:3,lineHeight:1.3}}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tech & background tags */}
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
              {tags.map((tag, i) => (
                <span key={i} style={{background:"#F1F5F9",color:"#475569",fontSize:12,fontWeight:600,padding:"4px 10px",borderRadius:20,border:"1px solid #E2E8F0"}}>
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#F97316",color:"#fff",fontWeight:700,fontSize:15,padding:"13px 26px",borderRadius:10,textDecoration:"none",transition:"opacity 0.2s"}}>
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
          padding: 44px 40px;
          align-items: flex-start;
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
          border: 1.5px solid #E2E8F0;
        }
        .bio-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          min-width: 160px;
        }
        .bio-right {
          flex: 1;
        }
        @media (max-width: 767px) {
          .bio-card {
            flex-direction: column;
            padding: 28px 20px;
            gap: 20px;
          }
          .bio-left {
            min-width: unset;
            width: 100%;
          }
          .bio-right > div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
