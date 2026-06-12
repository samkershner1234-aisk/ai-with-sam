import { CTA_URL } from "./constants";
const ts=[
  {init:"GK",bg:"#7C3AED",q:"I'm a marketing manager and I was drowning in repetitive tasks. In one session Sam built me a prompt system that now writes my first draft for every brief. I save at least 4 hours a week.",n:"Gideon K.",t:"Senior Growth Marketing Manager · Tel Aviv"},
  {init:"MR",bg:"#0891B2",q:"I came in thinking I had no idea how to use AI. Within one hour, Sam built me a system that now handles all my client follow-ups automatically. I got back at least 5 hours in the first week alone.",n:"Michal R.",t:"Marketing Manager · Tel Aviv"},
  {init:"ES",bg:"#059669",q:"I'd tried ChatGPT before and got nowhere. Sam came to the session already knowing my business and built something that actually works for how I operate. I use it every single day.",n:"Eitan S.",t:"Operations Lead · Tel Aviv"},
  {init:"NK",bg:"#DC2626",q:"Genuinely the most practical 60 minutes I've invested in my career this year. No fluff, no theory. Just a real working solution I could use before I even closed my laptop.",n:"Noa K.",t:"Freelance Operations Consultant · Tel Aviv"},
];
export default function Testimonials() {
  return (
    <section style={{background:"#0F172A",padding:"100px 24px"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto"}}>
        <p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.1em",color:"#F97316",textTransform:"uppercase",textAlign:"center",marginBottom:"16px"}}>Real Results From Real Sessions</p>
        <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:"#FFFFFF",textAlign:"center",marginBottom:"12px"}}>Working Professionals Who Got Their Time Back</h2>
        <p style={{color:"#94A3B8",fontSize:"15px",textAlign:"center",fontStyle:"italic",marginBottom:"48px"}}>Every client leaves with a working AI system they use the same day. Here's what they said:</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px",marginBottom:"48px"}} className="tg">
          {ts.map((t,i)=><div key={i} style={{background:"#1E293B",border:"1px solid #334155",borderRadius:"16px",padding:"32px"}}>
            <span style={{fontSize:"48px",fontWeight:800,color:"#F97316",display:"block",lineHeight:1}}>"</span>
            <p style={{color:"#CBD5E1",fontSize:"15px",lineHeight:1.7,fontStyle:"italic",margin:"8px 0 24px"}}>{t.q}</p>
            <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <div style={{width:"60px",height:"60px",borderRadius:"50%",background:t.bg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#FFFFFF",fontSize:"16px",flexShrink:0}}>{t.init}</div>
              <div>
                <p style={{fontWeight:700,color:"#FFFFFF",fontSize:"15px",margin:0}}>{t.n}</p>
                <p style={{color:"#94A3B8",fontSize:"13px",margin:0}}>{t.t}</p>
              </div>
            </div>
          </div>)}
        </div>
        <div style={{textAlign:"center"}}>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#F97316",color:"#FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none"}}>Book Your Free 20-Minute Call</a>
          <p style={{color:"#94A3B8",fontSize:"13px",marginTop:"10px"}}>Free call. No credit card. No commitment.</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.tg{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
