import { WHATSAPP_URL } from "./constants";
export default function Footer() {
  return (
    <footer style={{background:"#0A0F1E",padding:"60px 24px 40px",marginTop:0}}>
      <div style={{maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"48px"}} className="fg">
        <div>
          <p style={{fontWeight:800,color:"#FFFFFF",fontSize:"18px",marginBottom:"12px"}}>AI With Sam</p>
          <p style={{color:"#64748B",fontSize:"13px",lineHeight:1.8,margin:0}}>AI Consulting for Working Professionals<br/>Based in Israel · Sessions via Google Meet<br/>🌍 Israel · UK · US · Available Globally</p>
        </div>
        <div>
          <p style={{fontWeight:700,color:"#CBD5E1",fontSize:"14px",letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:"16px"}}>Get In Touch</p>
          <p style={{color:"#94A3B8",fontSize:"13px",fontStyle:"italic",marginBottom:"8px"}}>Have a question before booking?</p>
          <a href="mailto:samtheaicoach@gmail.com" style={{color:"#94A3B8",fontSize:"14px",display:"block",marginBottom:"4px",textDecoration:"none"}}>samtheaicoach@gmail.com</a>
          <p style={{color:"#64748B",fontSize:"13px",fontStyle:"italic",marginBottom:"16px"}}>Usually responds within a few hours.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{display:"inline-block",background:"#25D366",color:"#FFFFFF",fontWeight:600,borderRadius:"50px",padding:"10px 20px",fontSize:"14px",textDecoration:"none"}}>💬 Message on WhatsApp</a>
        </div>
        <div>
          <p style={{fontWeight:700,color:"#CBD5E1",fontSize:"14px",letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:"16px"}}>Quick Links</p>
          {[{label:"How It Works",href:"#how-it-works"},{label:"The Offer",href:"#offer"},{label:"Guarantee",href:"#guarantee"},{label:"FAQ",href:"#faq"}].map(l=><a key={l.href} href={l.href} style={{display:"block",color:"#94A3B8",fontSize:"14px",lineHeight:2.2,textDecoration:"none"}}>{l.label}</a>)}
        </div>
      </div>
      <div style={{maxWidth:"1100px",margin:"48px auto 0",borderTop:"1px solid #1E293B",paddingTop:"24px",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
        <p style={{color:"#475569",fontSize:"12px",margin:0}}>© 2026 AI With Sam. All rights reserved.</p>
        <p style={{color:"#475569",fontSize:"12px",margin:0}}>For Working Professionals</p>
      </div>
      <style>{`@media(max-width:768px){.fg{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}
