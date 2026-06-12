import { useState } from "react";
import { CTA_URL } from "./constants";
const faqs=[
  {q:"What if I'm not technical at all?",a:"Perfect. That's exactly who this is for. I explain everything in plain language and I do all the technical work during the session. You just need to show up and answer questions about how you work. No tech knowledge required."},
  {q:"Is the 20-minute call a sales pitch?",a:"No. It's a genuine working call. I ask about your workflow, I tell you exactly what I'd build for you, and I give you a clear picture of what the session would look like. If it doesn't feel right, we end the call and that's absolutely fine. No pressure. No pitch."},
  {q:"Is 250₪ worth it?",a:"If the minimum guarantee delivers 5 hours saved in week one, you've already recouped the cost in time alone — every week after that is pure profit. Most clients are still using their systems months later and saving time every single day."},
  {q:"What if I've never used AI before?",a:"Even better. Clients who have never used AI before often get the most out of the session because we start completely fresh. I won't assume any prior knowledge. We build something from zero, together."},
  {q:"What does a typical session look like?",a:"We start the session on Google Meet with a quick 5-minute review of what we identified on the discovery call. Then I build your AI system live. You watch, ask questions, and we test it together in real time. By the end of the 60 minutes, you have a working system and you've already used it at least once before we hang up."},
  {q:"Do I need to prepare anything before the session?",a:"Just come ready to describe how you work. Before the session I'll send you a short 3-question form so I can research your role and workflow in advance. The more specific you are on that form, the faster we can build something powerful on the day."},
  {q:"How do I know this will actually work for my specific job?",a:"Before every session I research your role and workflow. On the discovery call, I tell you exactly what I'd build — so you know what you're getting before you pay anything. And if the result doesn't save you 5 hours in week one, I book a free follow-up. There is zero risk to you."},
  {q:"What happens after the session?",a:"You receive a full recording of the session, a written recap document with all your custom prompts and next steps, and 14 days of WhatsApp support. If you get stuck at any point in the first two weeks, message me and I respond within 24 hours."},
  {q:"What if I want more support after the 14 days?",a:"Just message me on WhatsApp. Most clients find the system is self-sufficient after two weeks, but if you want additional sessions or ongoing support, we can arrange that."},
  {q:"What's the guarantee again?",a:"If you haven't saved 5 hours in your first week, message me on WhatsApp within 7 days and I will book you a free follow-up session immediately. No questions asked. No forms. Zero risk to you."},
  {q:"How do I book?",a:"Click any 'Book Your Free 20-Minute Call' button on this page. You'll land on a Calendly page where you can pick a time that works for you. Payment is confirmed after the discovery call, once you've decided you want to go ahead."},
];
export default function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{background:"#FFFFFF",padding:"100px 24px"}}>
      <div style={{maxWidth:"720px",margin:"0 auto"}}>
        <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:"#1E293B",textAlign:"center",marginBottom:"48px"}}>Still on the Fence? Here's What Others Asked First.</h2>
        {faqs.map((f,i)=>(
          <div key={i} style={{borderBottom:"1px solid #E2E8F0"}}>
            <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px 0",textAlign:"left"}}>
              <span style={{fontSize:"17px",fontWeight:600,color:"#1E293B",paddingRight:"16px"}}>{f.q}</span>
              <span style={{fontSize:"20px",color:"#F97316",flexShrink:0,transform:open===i?"rotate(45deg)":"none",transition:"transform 0.2s"}}>+</span>
            </button>
            {open===i&&<p style={{color:"#475569",fontSize:"15px",lineHeight:1.7,paddingBottom:"20px",margin:0}}>{f.a}</p>}
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:"48px"}}>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#F97316",color:"#FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none"}}>Book Your Free 20-Minute Call</a>
          <p style={{color:"#64748B",fontSize:"13px",marginTop:"10px"}}>Free call. No credit card. No commitment.</p>
        </div>
      </div>
    </section>
  );
}
