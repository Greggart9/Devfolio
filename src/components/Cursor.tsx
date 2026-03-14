"use client";
import { useEffect, useRef } from "react";
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let mx=0,my=0,rx=0,ry=0;
    const mv = (e:MouseEvent)=>{ mx=e.clientX; my=e.clientY; if(dot.current){dot.current.style.left=mx+"px";dot.current.style.top=my+"px";} };
    const tick=()=>{ rx+=(mx-rx)*.13; ry+=(my-ry)*.13; if(ring.current){ring.current.style.left=rx+"px";ring.current.style.top=ry+"px";} requestAnimationFrame(tick); };
    window.addEventListener("mousemove",mv); tick();
    const on=()=>document.body.classList.add("cursor-grow");
    const off=()=>document.body.classList.remove("cursor-grow");
    const attach=()=>{ document.querySelectorAll("a,button,[data-h]").forEach(el=>{ el.addEventListener("mouseenter",on); el.addEventListener("mouseleave",off); }); };
    attach(); const t=setInterval(attach,1500);
    return ()=>{ window.removeEventListener("mousemove",mv); clearInterval(t); };
  },[]);
  return <><div id="cur-dot" ref={dot}/><div id="cur-ring" ref={ring}/></>;
}
