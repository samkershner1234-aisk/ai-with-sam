import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const st = window.scrollY;
      const dh = document.documentElement.scrollHeight - window.innerHeight;
      setP(dh > 0 ? (st/dh)*100 : 0);
    };
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div style={{position:"fixed",top:0,left:0,width:p+"%",height:"3px",background:"#F97316",zIndex:9999,transition:"width 0.1s ease",pointerEvents:"none"}}/>;
}
