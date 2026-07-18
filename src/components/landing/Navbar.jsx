import { useState, useEffect } from "react";
import { CTA_URL } from "./constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    {label:"How It Works",href:"#how-it-works"},
    {label:"The Offer",href:"#offer"},
    {label:"Guarantee",href:"#guarantee"},
    {label:"FAQ",href:"#faq"},
  ];
  return (
    <nav style={{background:"#0F172A",height:"64px",position:"sticky",top:0,zIndex:1000,borderBottom:scrolled?"1px solid #1E293B":"none"}}>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"0 24px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div onClick={() => window.scrollTo({top:0,behavior:"smooth"})} style={{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}}>
          <img src="/logo.png" alt="AI With Sam Logo" style={{height:"36px",width:"36px",objectFit:"contain"}} />
          <span style={{fontWeight:800,color:"#FFFFFF",fontSize:"20px"}}><span style={{color:"#F97316"}}>AI</span> With Sam</span>
        </div>
        <div className="desk-nav" style={{display:"flex",gap:"32px",alignItems:"center"}}>
          {links.map(l=><a key={l.href} href={l.href} style={{color:"#CBD5E1",fontSize:"15px",fontWeight:500,textDecoration:"none"}}>{l.label}</a>)}
        </div>
        <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className="desk-cta" style={{background:"#F97316",color:"#FFFFFF",fontWeight:700,fontSize:"14px",padding:"12px 24px",borderRadius:"50px",textDecoration:"none"}}>Book Your Free 20-Minute Call</a>
        <button onClick={()=>setOpen(!open)} className="mob-burger" style={{background:"none",border:"none",cursor:"pointer",color:"#FFFFFF",padding:"8px"}}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open?<path d="M6 18L18 6M6 6l12 12"/>:<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
          </svg>
        </button>
      </div>
      {open&&<div style={{background:"#0F172A",borderTop:"1px solid #1E293B",padding:"16px 24px 24px"}}>
        {links.map(l=><a key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{display:"block",color:"#CBD5E1",fontSize:"16px",fontWeight:500,padding:"12px 0",textDecoration:"none",borderBottom:"1px solid #1E293B"}}>{l.label}</a>)}
        <a href={CTA_URL} target="_blank" rel="noopener noreferrer" style={{display:"block",marginTop:"16px",background:"#F97316",color:"#FFFFFF",fontWeight:700,fontSize:"16px",padding:"16px 24px",borderRadius:"50px",textDecoration:"none",textAlign:"center"}}>Book Your Free 20-Minute Call</a>
      </div>}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.desk-cta{display:none!important}.mob-burger{display:block!important}}@media(min-width:769px){.mob-burger{display:none!important}}`}</style>
    </nav>
  );
}
