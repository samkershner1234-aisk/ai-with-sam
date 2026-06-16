import { CTA_URL } from "./constants";
const steps=[
{num:"01",title:"I'll Tell You the One AI Tool You Should Use Right Now",body:"On a free 20-minute call, you describe how you work. I tell you the one AI tool you should be using right now, and exactly what I'd build for you. Free. In 20 minutes. No pitch.",tag:"20 minutes &middot; Free"},
{num:"02",title:"Your AI System Gets Built Live, On the Call",body:"60 minutes on Google Meet. You get a working AI solution built in real time, tailored to your exact workflow. Not a template. Not generic advice. A real custom prompt, tool, or automation. Built for your job.",tag:"60 minutes &middot; Live on Google Meet"},
{num:"03",title:"You Use It Before You Close Your Laptop",body:"You leave with a working system, a full session recording, a written recap of every step, and 14 days of direct WhatsApp access to Sam. Start saving time immediately. The same day.",tag:"Same day &middot; No tech skills needed"},
];
export default function HowItWorks() {
return (
<>
<section id="how-it-works" style={{background:" #F8FAFC",padding:"100px 24px"}}>
<div style={{maxWidth:"1100px",margin:"0 auto"}}>
<p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.1em",color:" #F97316",textTransform:"uppercase",textAlign:"center",marginBottom:"16px"}}>The Process</p>
<h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:" #1E293B",textAlign:"center",marginBottom:"48px"}}>Here's Exactly What Happens</h2>
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"24px",marginBottom:"48px"}} className="sg">
{steps.map((s,i)=><div key={i} style={{background:" #FFFFFF",border:"1px solid #E2E8F0",borderRadius:"16px",padding:"36px",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"}}>
<div style={{fontSize:"48px",fontWeight:800,color:" #F97316",marginBottom:"16px",lineHeight:1}}>{s.num}</div>
<h3 style={{fontWeight:700,color:" #1E293B",fontSize:"20px",marginBottom:"12px"}}>{s.title}</h3>
<p style={{color:" #64748B",fontSize:"15px",lineHeight:1.7,marginBottom:"16px"}}>{s.body}</p>
<span style={{background:" #F1F5F9",color:" #64748B",fontSize:"13px",borderRadius:"50px",padding:"6px 14px"}} dangerouslySetInnerHTML={{__html:s.tag}}/>
</div>)}
</div>
<div style={{textAlign:"center"}}>
<a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:" #F97316",color:" #FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none"}}>Book Your Free 20-Minute Call</a>
<p style={{color:" #64748B",fontSize:"13px",marginTop:"10px"}}>Free call. No credit card. No commitment.</p>
</div>
</div>
<style>{`@media(max-width:768px){.sg{grid-template-columns:1fr!important}}`}</style>
</section>
<section style={{background:" #FFFFFF",padding:"80px 24px"}}>
<div style={{maxWidth:"800px",margin:"0 auto",background:" #F8FAFC",border:"1px solid #E2E8F0",borderRadius:"20px",padding:"clamp(32px,5vw,56px)"}}>
<p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.1em",color:" #F97316",textTransform:"uppercase",marginBottom:"16px"}}>Clarity</p>
<h2 style={{fontSize:"clamp(24px,3vw,36px)",fontWeight:800,color:" #1E293B",marginBottom:"20px"}}>What This Is NOT</h2>
<p style={{color:" #475569",fontSize:"17px",lineHeight:1.8,margin:0}}>This is NOT a course. NOT a tutorial series. NOT a workshop where you take notes and try things at home later. This is one hour, one problem, one working system, built live. If you want theory, there are thousands of YouTube channels for that. If you want something that works by tonight, this is it.</p>
</div>
</section>
</>
);
}
