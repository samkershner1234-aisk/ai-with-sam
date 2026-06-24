import { useState, useEffect } from "react";
import { CTA_URL } from "./constants";

const PHONE = "0526198680";
const inc=["You get a 60-minute 1:1 session on Google Meet, fully focused on your role, your workflow, and your biggest time drain","You pinpoint the single task at work that is eating your time every day. We fix it together, live.","You get a working AI solution built on the call. A custom prompt or workflow built for exactly how you work. Not a template. Yours.","You get the full session recording sent to you after the call, so you can revisit every step","You get a written recap document. All your custom prompts and next steps in one clear document."];

function ILSModal({ onClose }) {
  const [revealed, setRevealed] = useState(null); // 'bit' | 'paybox' | null
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function handleKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  async function copyPhone() {
    try {
      await navigator.clipboard.writeText(PHONE);
    } catch {
      const el = document.createElement("textarea");
      el.value = PHONE;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleBit(e) {
    e.stopPropagation();
    setRevealed(revealed === "bit" ? "bit" : "bit");
    setCopied(false);
  }
  function handlePaybox(e) {
    e.stopPropagation();
    setRevealed(revealed === "paybox" ? "paybox" : "paybox");
    setCopied(false);
  }
  function handleBank(e) {
    e.stopPropagation();
    onClose();
    window.open("https://wa.link/il8v94", "_blank", "noopener,noreferrer");
  }

  const btnStyle = {background:"#F97316",color:"#FFFFFF",fontWeight:700,fontSize:"16px",padding:"14px 20px",borderRadius:"50px",border:"none",cursor:"pointer",width:"100%",textAlign:"center",display:"block",marginBottom:"10px"};
  const copyBtnStyle = {background:"transparent",color:"#F97316",fontWeight:600,fontSize:"13px",padding:"6px 14px",borderRadius:"50px",border:"1.5px solid #F97316",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0};
  const revealBox = {background:"#0F172A",borderRadius:"12px",padding:"14px 16px",marginBottom:"10px",display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"};

  return (
    <div
      onClick={onClose}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}}
    >
      <div
        onClick={e=>e.stopPropagation()}
        style={{background:"#1a2235",borderRadius:"20px",padding:"32px 28px",width:"100%",maxWidth:"420px",position:"relative",boxShadow:"0 24px 64px rgba(0,0,0,0.5)"}}
      >
        <button
          onClick={onClose}
          style={{position:"absolute",top:"16px",right:"20px",background:"none",border:"none",color:"#94A3B8",fontSize:"20px",cursor:"pointer",lineHeight:1,padding:"4px"}}
          aria-label="Close"
        >✕</button>

        <h3 style={{fontWeight:800,color:"#FFFFFF",fontSize:"22px",marginBottom:"24px",paddingRight:"24px"}}>Choose your payment method</h3>

        {/* Bit */}
        <button style={btnStyle} onClick={handleBit}>
          <a href="https://www.bitpay.co.il" target="_blank" rel="noopener noreferrer"
            onClick={e=>e.stopPropagation()}
            style={{color:"#FFFFFF",textDecoration:"none",pointerEvents:"auto"}}>Bit</a>
        </button>
        {revealed === "bit" && (
          <div style={revealBox}>
            <p style={{color:"#CBD5E1",fontSize:"13px",margin:0,flexShrink:0}}>Send payment to:</p>
            <p style={{color:"#FFFFFF",fontSize:"22px",fontWeight:800,margin:0,letterSpacing:"0.05em"}}>{PHONE}</p>
            <button style={copyBtnStyle} onClick={copyPhone}>{copied ? "Copied ✓" : "Copy number"}</button>
          </div>
        )}

        {/* Paybox */}
        <button style={btnStyle} onClick={handlePaybox}>
          <a href="https://links.payboxapp.com/" target="_blank" rel="noopener noreferrer"
            onClick={e=>e.stopPropagation()}
            style={{color:"#FFFFFF",textDecoration:"none",pointerEvents:"auto"}}>Paybox</a>
        </button>
        {revealed === "paybox" && (
          <div style={revealBox}>
            <p style={{color:"#CBD5E1",fontSize:"13px",margin:0,flexShrink:0}}>Send payment to:</p>
            <p style={{color:"#FFFFFF",fontSize:"22px",fontWeight:800,margin:0,letterSpacing:"0.05em"}}>{PHONE}</p>
            <button style={copyBtnStyle} onClick={copyPhone}>{copied ? "Copied ✓" : "Copy number"}</button>
          </div>
        )}

        {/* Bank Transfer */}
        <button style={{...btnStyle,marginBottom:0}} onClick={handleBank}>Bank Transfer</button>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [showModal, setShowModal] = useState(false);
  return (
    <section id="offer" style={{background:" #F8FAFC",padding:"100px 24px"}}>
      {showModal && <ILSModal onClose={()=>setShowModal(false)}/>}
      <div style={{maxWidth:"800px",margin:"0 auto"}}>
        <p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.1em",color:" #F97316",textTransform:"uppercase",textAlign:"center",marginBottom:"16px"}}>The Offer</p>
        <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:" #1E293B",textAlign:"center",maxWidth:"650px",margin:"0 auto 16px",lineHeight:1.3}}>One Session. One Working AI System. Results Before You Close Your Laptop.</h2>
        <p style={{color:" #64748B",fontSize:"17px",textAlign:"center",maxWidth:"580px",margin:"0 auto 48px"}}>Backed by a 5-hour guarantee. If you don't save 5 hours in week one, I work for free. No questions. No forms.</p>
        <div style={{background:" #0F172A",border:"2px solid #334155",borderRadius:"24px",padding:"clamp(32px,5vw,56px)",boxShadow:"0 8px 40px rgba(0,0,0,0.3)"}}>
          <div style={{display:"inline-block",background:" #1E3A5F",color:" #60A5FA",fontSize:"12px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",borderRadius:"50px",padding:"6px 16px",marginBottom:"20px"}}>For Working Professionals</div>
          <h3 style={{fontSize:"28px",fontWeight:800,color:" #FFFFFF",margin:"0 0 8px"}}>Your AI System, Built Live</h3>
          <p style={{color:" #CBD5E1",fontSize:"16px",marginBottom:"24px"}}>One session. One working AI system built for your job. Results before you close your laptop.</p>
          <p style={{color:" #94A3B8",fontSize:"14px",fontStyle:"italic",marginBottom:"16px"}}>I normally charge &#8362;500/hour for 1:1 consulting. This is 60 minutes of that + your Custom AI Prompt Kit for &#8362;400.</p>
          <div style={{display:"flex",alignItems:"baseline",gap:"16px",flexWrap:"wrap",marginBottom:"16px"}}>
            <span style={{fontSize:"64px",fontWeight:800,color:" #F97316",lineHeight:1}}>&#8362;400</span>
            <div><p style={{color:" #94A3B8",fontSize:"14px",margin:0}}>one-time &middot; everything below included</p><p style={{color:" #64748B",fontSize:"13px",margin:0}}>$135 USD &middot; &pound;100 GBP</p></div>
          </div>
          <div style={{background:" #DCFCE7",color:" #15803D",borderRadius:"50px",padding:"10px 20px",fontSize:"13px",fontWeight:600,display:"inline-block",marginBottom:"32px"}}>&#128737; 5-Hour Guarantee: free follow-up session if you don't save 5 hours in week one</div>
          <div style={{borderTop:"1px solid #334155",margin:"0 0 24px"}}/>
          <p style={{color:" #94A3B8",fontSize:"13px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"16px"}}>What's included:</p>
          {inc.map((item,i)=><div key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start",marginBottom:"12px"}}><span style={{fontSize:"16px",flexShrink:0}}>&#9989;</span><p style={{color:" #CBD5E1",fontSize:"15px",lineHeight:1.6,margin:0}}>{item}</p></div>)}
          <div style={{borderTop:"1px solid #334155",margin:"24px 0"}}/>
          <p style={{color:" #F97316",fontSize:"13px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:"12px"}}>Included With Your Session</p>
          <div style={{background:" #1E293B",borderRadius:"12px",padding:"20px",marginBottom:"24px"}}>
            <p style={{color:" #FFFFFF",fontWeight:700,margin:"0 0 8px"}}>&#127873; Custom AI Prompt Kit</p>
            <p style={{color:" #94A3B8",fontSize:"14px",margin:0}}>The moment you reserve your spot, I start building your Custom AI Prompt Kit using your intake form answers, so by the time we meet, you're already one step ahead. A personalised set of 10+ prompts built for your specific role. Yours to keep and reuse forever.</p>
          </div>
          <div style={{background:" #1E293B",borderRadius:"12px",padding:"20px",marginBottom:"32px"}}>
            <p style={{color:" #FFFFFF",fontWeight:700,margin:"0 0 8px"}}>&#128172; 14 Days of Direct WhatsApp Access to Sam</p>
            <p style={{color:" #94A3B8",fontSize:"14px",margin:0}}>Got a prompt that's not working, or a new task to automate? Message him directly. Not a ticket system. Direct access. He responds within 24 hours.</p>
          </div>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"block",background:" #F97316",color:" #FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none",textAlign:"center",marginBottom:"16px"}}>Book Your Free 20-Minute Call</a>
          <p style={{color:" #94A3B8",fontSize:"14px",textAlign:"center",marginBottom:"16px",fontStyle:"italic"}}>Already had your free call? Reserve your session below.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"12px",justifyContent:"center",marginBottom:"16px"}}>
            <button onClick={()=>setShowModal(true)} style={{background:" #F97316",color:" #FFFFFF",fontWeight:600,fontSize:"14px",padding:"10px 20px",borderRadius:"50px",border:"none",cursor:"pointer",display:"inline-block"}}>Pay &#8362;400 ILS</button>
            <a href="https://www.paypal.com/ncp/payment/FJRZD966GUUWW" target="_blank" rel="noopener noreferrer" style={{background:" #F97316",color:" #FFFFFF",fontWeight:600,fontSize:"14px",padding:"10px 20px",borderRadius:"50px",textDecoration:"none",display:"inline-block"}}>Pay $135 USD</a>
            <a href="https://www.paypal.com/ncp/payment/YTA8589KBMZVS" target="_blank" rel="noopener noreferrer" style={{background:" #F97316",color:" #FFFFFF",fontWeight:600,fontSize:"14px",padding:"10px 20px",borderRadius:"50px",textDecoration:"none",display:"inline-block"}}>Pay &pound;100 GBP</a>
          </div>
        </div>
      </div>
    </section>
  );
}
