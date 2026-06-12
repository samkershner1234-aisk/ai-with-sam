import { SAM_PHOTO, CTA_URL } from "./constants";
const badges=[{icon:"⏱",t:"Results in 1 session"},{icon:"💬",t:"14 days WhatsApp support"},{icon:"🛡",t:"5-Hour Guarantee or Free Follow-Up Session"}];
export default function Hero() {
  return (
    <section style={{background:"#0F172A",minHeight:"100vh",display:"flex",alignItems:"center",padding:"80px 24px"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"55% 45%",gap:"48px",alignItems:"center"}} className="hgrid">
        <div>
          <p style={{fontSize:"13px",fontWeight:600,letterSpacing:"0.15em",color:"#F97316",textTransform:"uppercase",marginBottom:"20px"}}>For Working Professionals</p>
          <h1 style={{fontWeight:800,color:"#FFFFFF",lineHeight:1.15,marginBottom:"20px"}}>
            <span style={{fontSize:"clamp(38px,5vw,64px)",display:"block"}}>Stop Losing Hours</span>
            <span style={{fontSize:"clamp(30px,4vw,52px)",display:"block",color:"#CBD5E1"}}>to Tasks AI Could Handle in Seconds.</span>
          </h1>
          <p style={{color:"#CBD5E1",fontSize:"clamp(17px,2vw,20px)",lineHeight:1.7,marginBottom:"12px"}}>One 60-minute session. One working AI system built live, for your exact job. You use it before you close your laptop.</p>
          <p style={{color:"#FFFFFF",fontSize:"15px",fontWeight:500,marginBottom:"28px"}}>Trusted by professionals in marketing, operations, sales, and admin. Across Israel, the UK, and the US.</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"12px",marginBottom:"32px"}}>
            {badges.map((b,i)=><span key={i} style={{background:"rgba(30,41,59,0.9)",border:"1px solid #334155",borderRadius:"50px",padding:"10px 18px",fontSize:"14px",color:"#FFFFFF",display:"inline-flex",alignItems:"center",gap:"8px"}}>{b.icon} {b.t}</span>)}
          </div>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#F97316",color:"#FFFFFF",fontWeight:700,fontSize:"17px",padding:"18px 36px",borderRadius:"50px",textDecoration:"none",minWidth:"280px",textAlign:"center"}}>Book Your Free 20-Minute Call</a>
          <p style={{color:"#64748B",fontSize:"13px",marginTop:"10px"}}>Free 20-minute call. No credit card. No commitment. No pitch.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <img src={SAM_PHOTO} alt="Sam Kershner" style={{width:"clamp(220px,30vw,380px)",height:"clamp(220px,30vw,380px)",borderRadius:"50%",objectFit:"cover",objectPosition:"center top",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}/>
          <p style={{fontWeight:700,color:"#FFFFFF",fontSize:"16px",marginTop:"16px",marginBottom:"4px"}}>Sam Kershner</p>
          <p style={{color:"rgba(255,255,255,0.8)",fontSize:"13px",margin:0}}>AI Consultant · Tel Aviv</p>
        </div>
      </div>
      <style>{`@media(max-width:768px){.hgrid{grid-template-columns:1fr!important}.hgrid>div:last-child{order:1}.hgrid>div:first-child{order:2}}`}</style>
    </section>
  );
}
