import { CTA_URL } from "./constants";
export default function GuaranteeSection() {
return (
<section id="guarantee" style={{background:" #0F172A",padding:"100px 24px"}}>
<div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
<p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.1em",color:" #F97316",textTransform:"uppercase",marginBottom:"16px"}}>My Guarantee</p>
<div style={{fontSize:"56px",marginBottom:"24px"}}>&#128737;</div>
<h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:" #FFFFFF",maxWidth:"600px",margin:"0 auto 32px",lineHeight:1.3}}>If You Don't Save 5 Hours in Week One, I Book You a Free Follow-Up Session. No Questions Asked.</h2>
<div style={{marginBottom:"28px"}}>
{["No questions asked","No forms to fill in","No hoops to jump through"].map((item,i)=><p key={i} style={{color:" #CBD5E1",fontSize:"18px",marginBottom:"16px"}}>&#9989; {item}</p>)}
</div>
<p style={{color:" #94A3B8",fontSize:"15px",fontStyle:"italic",maxWidth:"560px",margin:"0 auto 16px",textAlign:"center"}}>In every session delivered so far, no one has ever needed to claim it. But it&#39;s there if you do.</p>
<p style={{color:" #CBD5E1",fontSize:"16px",lineHeight:1.7,maxWidth:"560px",margin:"0 auto 16px"}}>You get results or you get more of my time, free. Message me on WhatsApp within the first 7 days if you haven't saved 5 hours and I will schedule a free follow-up session immediately. No forms. No questions.</p>
<p style={{color:" #94A3B8",fontSize:"15px",lineHeight:1.7,maxWidth:"560px",margin:"0 auto 32px"}}>Your session also includes 14 days of direct WhatsApp access to me. Got a prompt that's not working, or a new task to automate? Message me directly. Not a ticket system. Direct access. I respond within 24 hours.</p>
<a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"block",background:" #F97316",color:" #FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none",marginBottom:"10px"}}>Book Your Free 20-Minute Call</a>
<p style={{color:" #64748B",fontSize:"13px",marginTop:"10px"}}>Free call. No credit card. No commitment.</p>
</div>
</section>
);
}
