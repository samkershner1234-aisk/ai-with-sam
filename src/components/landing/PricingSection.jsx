import { useState } from "react";
import { CTA_URL } from "./constants";

const ILS_URL = "https://buy.stripe.com/ILS";
const USD_URL = "https://buy.stripe.com/USD";
const GBP_URL = "https://buy.stripe.com/GBP";

const included = [
  "60-minute 1:1 session on Google Meet — fully focused on your role, workflow, and biggest time drain",
  "We pinpoint the single task eating your time every day and fix it together, live",
  "A working AI solution built on the call — a custom prompt or workflow for exactly how you work",
  "Full session recording sent to you after the call — revisit every step",
  "Written recap document — all your custom prompts and next steps in one clear document",
];

const bonus = [
  { icon: "🎁", title: "Custom AI Prompt Kit", desc: "I start building your kit before we meet using your intake form. A personalised set of 10+ prompts for your specific role. Yours to keep forever." },
  { icon: "💬", title: "14 Days WhatsApp Access", desc: "Got a prompt that's not working? Message me directly — not a ticket system. I respond within 24 hours." },
];

export default function PricingSection() {
  const [showIncluded, setShowIncluded] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  return (
    <section style={{background:"#f8f9fb",padding:"80px 0 72px"}}>
      <div style={{maxWidth:700,margin:"0 auto",padding:"0 24px"}}>

        {/* Header */}
        <p style={{color:"#F97316",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:13,textAlign:"center",marginBottom:12}}>THE OFFER</p>
        <h2 style={{fontSize:"clamp(24px,4vw,36px)",fontWeight:800,color:"#1E293B",textAlign:"center",lineHeight:1.2,marginBottom:8}}>
          One Session. One Working AI System.<br/>Results Before You Close Your Laptop.
        </h2>
        <p style={{color:"#64748B",textAlign:"center",fontSize:15,marginBottom:36}}>
          Backed by a 5-hour guarantee. If you don't save 5 hours in week one, I work for free. No questions. No forms.
        </p>

        {/* Pricing card */}
        <div style={{background:"#fff",borderRadius:20,padding:"36px 32px",boxShadow:"0 4px 32px rgba(0,0,0,0.09)",border:"1.5px solid #E2E8F0",position:"relative"}}>

          {/* Badge */}
          <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"#F97316",color:"#fff",fontWeight:700,fontSize:12,padding:"4px 16px",borderRadius:20,letterSpacing:"0.05em",whiteSpace:"nowrap"}}>FOR WORKING PROFESSIONALS</div>

          {/* Title + price */}
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{fontWeight:800,fontSize:22,color:"#1E293B",marginBottom:4}}>Your AI System, Built Live</div>
            <div style={{color:"#64748B",fontSize:14,marginBottom:16}}>One session. Working AI built for your job. Results before you close your laptop.</div>
            <div style={{fontSize:"clamp(40px,8vw,56px)",fontWeight:900,color:"#F97316",lineHeight:1}}>₪400</div>
            <div style={{color:"#94A3B8",fontSize:13,marginTop:4}}>one-time · $135 USD · £100 GBP</div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#FFF7ED",border:"1.5px solid #FED7AA",borderRadius:10,padding:"8px 14px",marginTop:14,fontSize:13,fontWeight:600,color:"#C2410C"}}>
              🛡 5-Hour Guarantee: free follow-up session if you don't save 5 hours in week one
            </div>
          </div>

          {/* Collapsible: What's Included */}
          <div style={{marginBottom:12}}>
            <button onClick={() => setShowIncluded(p => !p)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background: showIncluded ? "#FFF7ED" : "#F8FAFC",border: showIncluded ? "1.5px solid #F97316" : "1.5px solid #E2E8F0",borderRadius:12,padding:"14px 18px",cursor:"pointer",transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18}}>✅</span>
                <span style={{fontWeight:700,fontSize:15,color:"#1E293B"}}>What's Included in Your Session</span>
                <span style={{background:"#F97316",color:"#fff",borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:700}}>{included.length} items</span>
              </div>
              <span style={{color:"#F97316",fontWeight:700,fontSize:18,transition:"transform 0.2s",display:"inline-block",transform: showIncluded ? "rotate(180deg)" : "rotate(0deg)"}}>▼</span>
            </button>
            {showIncluded && (
              <div style={{background:"#FFFBF5",border:"1.5px solid #FED7AA",borderTop:"none",borderRadius:"0 0 12px 12px",padding:"16px 18px"}}>
                {included.map((item, i) => (
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom: i < included.length-1 ? 12 : 0}}>
                    <span style={{color:"#16A34A",fontWeight:700,flexShrink:0,marginTop:2}}>✓</span>
                    <span style={{color:"#374151",fontSize:14,lineHeight:1.55}}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible: Included With Your Session */}
          <div style={{marginBottom:24}}>
            <button onClick={() => setShowBonus(p => !p)} style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background: showBonus ? "#FFF7ED" : "#F8FAFC",border: showBonus ? "1.5px solid #F97316" : "1.5px solid #E2E8F0",borderRadius:12,padding:"14px 18px",cursor:"pointer",transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:18}}>🎁</span>
                <span style={{fontWeight:700,fontSize:15,color:"#1E293B"}}>Included With Your Session</span>
                <span style={{background:"#16A34A",color:"#fff",borderRadius:20,padding:"1px 8px",fontSize:11,fontWeight:700}}>2 bonuses</span>
              </div>
              <span style={{color:"#F97316",fontWeight:700,fontSize:18,transition:"transform 0.2s",display:"inline-block",transform: showBonus ? "rotate(180deg)" : "rotate(0deg)"}}>▼</span>
            </button>
            {showBonus && (
              <div style={{background:"#FFFBF5",border:"1.5px solid #FED7AA",borderTop:"none",borderRadius:"0 0 12px 12px",padding:"16px 18px"}}>
                {bonus.map((b, i) => (
                  <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom: i < bonus.length-1 ? 16 : 0}}>
                    <span style={{fontSize:22,flexShrink:0}}>{b.icon}</span>
                    <div>
                      <div style={{fontWeight:700,fontSize:14,color:"#1E293B",marginBottom:3}}>{b.title}</div>
                      <div style={{color:"#64748B",fontSize:13,lineHeight:1.55}}>{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"block",background:"#F97316",color:"#fff",fontWeight:800,fontSize:16,padding:"16px",borderRadius:12,textDecoration:"none",textAlign:"center",marginBottom:12,transition:"opacity 0.2s"}}>
            Book Your Free 20-Minute Call
          </a>
          <p style={{textAlign:"center",color:"#94A3B8",fontSize:13,marginBottom:16}}>Already had your free call? Reserve your session below.</p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
            {[{label:"Pay ₪400 ILS", url: ILS_URL}, {label:"Pay $135 USD", url: USD_URL}, {label:"Pay £100 GBP", url: GBP_URL}].map((btn, i) => (
              <a key={i} href={btn.url} target="_blank" rel="noopener noreferrer" style={{padding:"10px 20px",borderRadius:10,border:"1.5px solid #E2E8F0",background:"#fff",color:"#1E293B",fontWeight:600,fontSize:14,textDecoration:"none",transition:"all 0.2s"}}>
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
