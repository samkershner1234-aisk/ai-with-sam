import { SAM_PHOTO, CTA_URL, WHATSAPP_URL } from "./constants";
export default function BioSection() {
  return (
    <section style={{background:"#F8FAFC",padding:"100px 24px"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"40% 60%",gap:"64px",alignItems:"center"}} className="bg">
        <div style={{display:"flex",justifyContent:"center"}}>
          <img src={SAM_PHOTO} alt="Sam Kershner" style={{width:"clamp(200px,25vw,320px)",height:"clamp(200px,25vw,320px)",borderRadius:"50%",objectFit:"cover",objectPosition:"center top",boxShadow:"0 16px 48px rgba(0,0,0,0.15)"}}/>
        </div>
        <div>
          <p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.1em",color:"#F97316",textTransform:"uppercase",marginBottom:"12px"}}>Who You're Working With</p>
          <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:"#1E293B",marginBottom:"16px"}}>Hi, I'm Sam</h2>
          <p style={{color:"#1E293B",fontSize:"18px",fontWeight:600,marginBottom:"16px",lineHeight:1.7}}>You don't need to figure out AI. That's Sam's job. Every session produces a working system you use the same day.</p>
          <p style={{color:"#475569",fontSize:"16px",lineHeight:1.7,marginBottom:"12px"}}>Sam has worked with professionals and business owners in Israel, the UK, and the US. Every single person left the call with something they could use immediately.</p>
          <p style={{color:"#475569",fontSize:"16px",lineHeight:1.7,marginBottom:"20px"}}>You don't sit through a course. You don't watch a tutorial. In 60 minutes, you walk away with a working AI system built for exactly how you do your job. No theory. No homework. Just results.</p>
          <a href="https://www.linkedin.com/in/sam-kershner/" target="_blank" rel="noopener noreferrer" style={{display:"block",color:"#F97316",fontSize:"15px",textDecoration:"underline",marginBottom:"28px"}}>View Sam's LinkedIn Profile →</a>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#F97316",color:"#FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none",marginBottom:"12px"}}>Book Your Free 20-Minute Call</a>
          <p style={{fontSize:"15px",color:"#475569"}}>Prefer to message first? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{color:"#F97316",textDecoration:"underline"}}>Message Sam on WhatsApp before booking.</a></p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.bg{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
