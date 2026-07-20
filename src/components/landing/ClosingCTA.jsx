import { useState, useEffect } from "react";
export default function ClosingCTA() {
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
useEffect(() => {
const handleResize = () => setIsMobile(window.innerWidth <= 768);
window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, []);
return (
    <section style={{background:"#0F172A",padding:isMobile?"60px 24px 0":"100px 24px 0",margin:0}}>
      <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
        <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:"#FFFFFF",maxWidth:"600px",margin:"0 auto 20px",lineHeight:1.3}}>You Could Have a Practical AI Workflow by This Time Tomorrow.</h2>
        <p style={{color:"#CBD5E1",fontSize:"17px",maxWidth:"540px",margin:"0 auto",lineHeight:1.7}}>Book a free 20-minute call. I'll tell you exactly what I'd build for you and how long it would take. If it sounds right, we book the session. If not, no problem. You lose nothing.</p>
      </div>
    </section>
  );
}
