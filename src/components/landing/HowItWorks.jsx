import { useState, useEffect, useRef, useCallback } from "react";

const steps = [
  {
    num: "01",
    title: "We Identify Exactly What AI Can Do For Your Job",
    body: "On a free 20-minute call, you describe how you work and I map out exactly what I'd build for you. Free. In 20 minutes.",
    tag: "20 minutes · Free",
  },
  {
    num: "02",
    title: "Your AI System Gets Built Live, On the Call",
    body: "60 minutes on Google Meet. You get a working AI solution built in real time, tailored to your exact workflow. Not a template. Not generic advice. A real custom prompt, tool, or automation. Built for your job.",
    tag: "60 minutes · Live on Google Meet",
  },
  {
    num: "03",
    title: "You Use It Before You Close Your Laptop",
    body: "You leave with a working system, a full session recording, a written recap of every step, and 14 days of direct WhatsApp access to Sam. Start saving time immediately. The same day.",
    tag: "Same day · No tech skills needed",
  },
];

export default function HowItWorks() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const next = useCallback(() => setCurrent(p => (p + 1) % steps.length), []);
  const prev = useCallback(() => setCurrent(p => (p - 1 + steps.length) % steps.length), []);

  const handleArrow = useCallback((dir) => {
    if (dir === 'next') next(); else prev();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 3000);
  }, [next, prev]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 3000);
    return () => clearInterval(intervalRef.current);
  }, [next]);

  return (
    <section style={{background:"#f8f9fb", padding:"80px 0 72px"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
        {/* Header */}
        <p style={{color:"#F97316",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:13,textAlign:"center",marginBottom:12}}>THE PROCESS</p>
        <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:"#1E293B",textAlign:"center",lineHeight:1.2,marginBottom:48}}>
          Here's Exactly What Happens
        </h2>

        {/* Desktop: 3 cards in a row with connector */}
        <div className="how-desktop-grid">
          {steps.map((s, i) => (
            <div key={i} style={{position:"relative",background:"#fff",borderRadius:16,padding:"36px 28px",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",flex:1}}>
              <div style={{fontSize:42,fontWeight:900,color:"#F97316",marginBottom:14,lineHeight:1}}>{s.num}</div>
              <h3 style={{fontWeight:700,fontSize:19,color:"#1E293B",marginBottom:12,lineHeight:1.3}}>{s.title}</h3>
              <p style={{color:"#64748B",fontSize:15,lineHeight:1.65,marginBottom:20}}>{s.body}</p>
              <span style={{display:"inline-block",background:"#F1F5F9",color:"#64748B",fontSize:12,fontWeight:600,padding:"4px 12px",borderRadius:20}}>{s.tag}</span>
              {i < steps.length - 1 && (
                <div style={{position:"absolute",top:"50%",right:-16,transform:"translateY(-50%)",color:"#F97316",fontSize:22,fontWeight:700,zIndex:2}}>&#8594;</div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical step carousel (flip-card style) */}
        <div className="how-mobile-carousel">
          {/* Progress bar */}
          <div style={{display:"flex",gap:6,marginBottom:24,justifyContent:"center"}}>
            {steps.map((_, i) => (
              <div key={i} style={{height:4,flex:1,borderRadius:2,background: i===current ? "#F97316" : "#E2E8F0",transition:"background 0.3s",maxWidth:80}}/>
            ))}
          </div>

          <div style={{overflow:"hidden",borderRadius:16}}>
            <div style={{display:"flex",transition:"transform 0.45s cubic-bezier(0.4,0,0.2,1)",transform:`translateX(-${current * 100}%)`}}>
              {steps.map((s, i) => (
                <div key={i} style={{minWidth:"100%",background:"#fff",borderRadius:16,padding:"36px 28px",boxSizing:"border-box",boxShadow:"0 2px 16px rgba(0,0,0,0.07)"}}>
                  {/* Step indicator */}
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
                    <div style={{width:44,height:44,borderRadius:"50%",background:"#FFF7ED",border:"2px solid #F97316",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:18,color:"#F97316"}}>{s.num}</div>
                    <div style={{height:2,flex:1,background:"#FEF3C7",borderRadius:1}}/>
                  </div>
                  <h3 style={{fontWeight:700,fontSize:20,color:"#1E293B",marginBottom:12,lineHeight:1.3}}>{s.title}</h3>
                  <p style={{color:"#64748B",fontSize:15,lineHeight:1.65,marginBottom:20}}>{s.body}</p>
                  <span style={{display:"inline-block",background:"#F1F5F9",color:"#64748B",fontSize:12,fontWeight:600,padding:"4px 12px",borderRadius:20}}>{s.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow navigation */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:20,padding:"0 4px"}}>
            <button onClick={() => handleArrow('prev')} aria-label="Previous step" style={{width:42,height:42,borderRadius:12,border:"2px solid #F97316",background:"transparent",color:"#F97316",fontSize:18,cursor:"pointer",fontWeight:700,transition:"all 0.2s"}}>&#8592;</button>
            <span style={{fontSize:13,color:"#94A3B8",fontWeight:600}}>Step {current+1} of {steps.length}</span>
            <button onClick={() => handleArrow('next')} aria-label="Next step" style={{width:42,height:42,borderRadius:12,border:"2px solid #F97316",background:"transparent",color:"#F97316",fontSize:18,cursor:"pointer",fontWeight:700,transition:"all 0.2s"}}>&#8594;</button>
          </div>
        </div>
      </div>

      <style>{`
        .how-desktop-grid { display: flex; gap: 24px; }
        .how-mobile-carousel { display: none; }
        @media (max-width: 767px) {
          .how-desktop-grid { display: none; }
          .how-mobile-carousel { display: block; }
        }
      `}</style>
    </section>
  );
}
