import { CTA_URL } from "./constants";
const cards=[
  {icon:<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke=" #F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>svg>,title:"You're Wasting Hours Every Day",body:"You spend more time trying to figure out AI tools than actually using them. YouTube tutorials are generic and don't apply to your specific job or the way you actually work."},
  {icon:<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke=" #F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>svg>,title:"Nothing You Try Actually Sticks",body:"You've tried ChatGPT, Copilot, Gemini, Perplexity, Claude. You played around. You got nowhere. Nothing produced anything useful for your real day-to-day work."},
  {icon:<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke=" #F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>svg>,title:"You're Falling Behind at Work",body:"Everyone around you is talking about AI. You're nodding along in meetings, but secretly you have no idea how to make it actually work for your specific role."},
  ];
export default function PainSection() {
  return (
    <section style={{background:" #F8FAFC",padding:"100px 24px"}}>
    <div style={{maxWidth:"1100px",margin:"0 auto"}}>
    <p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.1em",color:" #F97316",textTransform:"uppercase",textAlign:"center",marginBottom:"16px"}}>Sound Familiar?</p>p>
    <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:" #1E293B",textAlign:"center",lineHeight:1.3,marginBottom:"16px"}}>You Know AI Could Help You.<br/>But Nothing Actually Works.</h2>h2>
    <p style={{color:" #64748B",fontSize:"17px",textAlign:"center",maxWidth:"600px",margin:"0 auto 56px"}}>It's not your fault. Here's what most working professionals are dealing with:</p>p>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"24px",marginBottom:"56px"}} className="pg">
      {cards.map((c,i)=><div key={i} style={{background:" #FFFFFF",border:"1px solid #E2E8F0",borderRadius:"16px",padding:"32px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
      <div style={{marginBottom:"16px"}}>{c.icon}</div>div>
      <h3 style={{fontWeight:700,color:" #1E293B",fontSize:"20px",marginBottom:"12px"}}>{c.title}</h3>h3>
      <p style={{color:" #64748B",fontSize:"15px",lineHeight:1.7}}>{c.body}</p>p>
      </div>div>)}
    </div>div>
    <div style={{textAlign:"center"}}>
    <p style={{fontSize:"clamp(22px,3vw,28px)",fontWeight:800,color:" #1E293B",maxWidth:"700px",margin:"0 auto 32px",lineHeight:1.4}}>The problem isn't you.<br/>No one has ever built an AI solution for YOUR specific job. Until now.</p>p>
    <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:" #F97316",color:" #FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none"}}>Book Your Free 20-Minute Call</a>a>
    </div>div>
    </div>div>
    <style>{`@media(max-width:768px){.pg{grid-template-columns:1fr!important}}`}</style>style>
    </section>section>
    );
}</svg>
