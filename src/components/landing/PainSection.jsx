import { useState, useEffect, useRef, useCallback } from "react";

const clockIcon = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const xIcon = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);
const trendIcon = (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

const cards = [
  {
    icon: clockIcon,
    title: "You're Wasting Hours Every Day",
    body: "You spend more time trying to figure out AI tools than actually using them. YouTube tutorials are generic and don't apply to your specific job or the way you actually work.",
  },
  {
    icon: xIcon,
    title: "Nothing You Try Actually Sticks",
    body: "You've tried ChatGPT, Copilot, Gemini, Perplexity, Claude. You played around. You got nowhere. Nothing produced anything useful for your real day-to-day work.",
  },
  {
    icon: trendIcon,
    title: "You're Falling Behind at Work",
    body: "Everyone around you is talking about AI. You're nodding along in meetings, but secretly you have no idea how to make it actually work for your specific role.",
  },
];

export default function PainSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % cards.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + cards.length) % cards.length);
  }, []);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setPaused(true);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 3000);
  }, [next]);

  const handleArrow = useCallback((dir) => {
    setPaused(false);
    if (dir === 'next') next(); else prev();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 3000);
  }, [next, prev]);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  return (
    <section style={{background:"#f8f9fb", padding:"80px 0 72px"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 24px"}}>
        {/* Header */}
        <p style={{color:"#F97316",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:13,textAlign:"center",marginBottom:12}}>SOUND FAMILIAR?</p>
        <h2 style={{fontSize:"clamp(28px,4vw,40px)",fontWeight:800,color:"#1E293B",textAlign:"center",lineHeight:1.2,marginBottom:12}}>
          You Know AI Could Help You.<br/>But Nothing Actually Works.
        </h2>
        <p style={{color:"#64748B",textAlign:"center",fontSize:17,marginBottom:48}}>
          It's not your fault. Here's what most working professionals are dealing with:
        </p>

        {/* Desktop: 3 cards in a row */}
        <div className="pain-desktop-grid">
          {cards.map((c, i) => (
            <div key={i} style={{background:"#fff",borderRadius:16,padding:"36px 28px",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",flex:1}}>
              <div style={{marginBottom:18}}>{c.icon}</div>
              <h3 style={{fontWeight:700,fontSize:19,color:"#1E293B",marginBottom:12,lineHeight:1.3}}>{c.title}</h3>
              <p style={{color:"#64748B",fontSize:15,lineHeight:1.65}}>{c.body}</p>
            </div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="pain-mobile-carousel">
          <div style={{position:"relative",overflow:"hidden",borderRadius:16}}>
            {/* Cards wrapper */}
            <div style={{display:"flex",transition:"transform 0.4s cubic-bezier(0.4,0,0.2,1)",transform:`translateX(-${current * 100}%)`}}>
              {cards.map((c, i) => (
                <div key={i} style={{minWidth:"100%",background:"#fff",borderRadius:16,padding:"36px 28px",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",boxSizing:"border-box"}}>
                  <div style={{marginBottom:18}}>{c.icon}</div>
                  <h3 style={{fontWeight:700,fontSize:19,color:"#1E293B",marginBottom:12,lineHeight:1.3}}>{c.title}</h3>
                  <p style={{color:"#64748B",fontSize:15,lineHeight:1.65}}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Controls: arrows + dots */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginTop:24}}>
            <button onClick={() => handleArrow('prev')} aria-label="Previous" style={{width:38,height:38,borderRadius:"50%",border:"2px solid #F97316",background:"transparent",color:"#F97316",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,transition:"all 0.2s"}}>&#8592;</button>
            {cards.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i+1}`} style={{width: i===current?28:10,height:10,borderRadius:5,border:"none",background: i===current?"#F97316":"#CBD5E1",cursor:"pointer",transition:"all 0.3s",padding:0}}/>
            ))}
            <button onClick={() => handleArrow('next')} aria-label="Next" style={{width:38,height:38,borderRadius:"50%",border:"2px solid #F97316",background:"transparent",color:"#F97316",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,transition:"all 0.2s"}}>&#8594;</button>
          </div>
          <p style={{textAlign:"center",fontSize:12,color:"#94A3B8",marginTop:8}}>{current + 1} / {cards.length}</p>
        </div>

        {/* Bottom CTA text */}
        <p style={{textAlign:"center",fontSize:"clamp(20px,3vw,28px)",fontWeight:800,color:"#1E293B",marginTop:56,lineHeight:1.3}}>
          The problem isn't you.<br/>No one has ever built an AI solution for YOUR<br/>specific job. Until now.
        </p>
      </div>

      <style>{`
        .pain-desktop-grid { display: flex; gap: 24px; }
        .pain-mobile-carousel { display: none; }
        @media (max-width: 767px) {
          .pain-desktop-grid { display: none; }
          .pain-mobile-carousel { display: block; }
        }
      `}</style>
    </section>
  );
}
