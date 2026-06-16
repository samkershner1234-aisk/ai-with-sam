import { CTA_URL } from "./constants";
const inc=["You get a 60-minute 1:1 session on Google Meet, fully focused on your role, your workflow, and your biggest time drain","You pinpoint the single task at work that is eating your time every day. We fix it together, live.","You get a working AI solution built on the call. A custom prompt or workflow built for exactly how you work. Not a template. Yours.","You get the full session recording sent to you after the call, so you can revisit every step","You get a written recap document. All your custom prompts and next steps in one clear document."];
export default function PricingSection() {
return (
<section id="offer" style={{background:" #F8FAFC",padding:"100px 24px"}}>
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
<a href="https://www.paypal.com/ncp/payment/RXGXCGFBNDBEJ" target="_blank" rel="noopener noreferrer" style={{background:" #F97316",color:" #FFFFFF",fontWeight:600,fontSize:"14px",padding:"10px 20px",borderRadius:"50px",textDecoration:"none",display:"inline-block"}}>Pay &#8362;400 ILS</a>
<a href="https://www.paypal.com/ncp/payment/FJRZD966GUUWW" target="_blank" rel="noopener noreferrer" style={{background:" #F97316",color:" #FFFFFF",fontWeight:600,fontSize:"14px",padding:"10px 20px",borderRadius:"50px",textDecoration:"none",display:"inline-block"}}>Pay $135 USD</a>
<a href="https://www.paypal.com/ncp/payment/YTA8589KBMZVS" target="_blank" rel="noopener noreferrer" style={{background:" #F97316",color:" #FFFFFF",fontWeight:600,fontSize:"14px",padding:"10px 20px",borderRadius:"50px",textDecoration:"none",display:"inline-block"}}>Pay &pound;100 GBP</a>
</div>
<p style={{color:" #64748B",fontSize:"13px",textAlign:"center",margin:0}}>Free call. No credit card. No commitment.</p>
</div>
</div>
</section>
);
}
