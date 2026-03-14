"use client";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function Counter({ end, suffix }: { end:number; suffix:string }) {
  const [n,setN]=useState(0); const el=useRef<HTMLSpanElement>(null); const done=useRef(false);
  useEffect(()=>{
    const io=new IntersectionObserver(([e])=>{ if(e.isIntersecting&&!done.current){ done.current=true; let cur=0; const inc=end/55; const t=setInterval(()=>{ cur+=inc; if(cur>=end){setN(end);clearInterval(t);}else setN(Math.floor(cur)); },1700/55); } },{threshold:.5});
    if(el.current)io.observe(el.current); return()=>io.disconnect();
  },[end]);
  return <span ref={el}>{n}{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="py-20 border-y border-[#1c1c24]">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-[#1c1c24]">
          {stats.map(s=>(
            <div key={s.label} className="md:px-10 first:pl-0 last:pr-0 text-center md:text-left">
              <div className="font-display text-5xl md:text-6xl font-bold g-text mb-2">
                <Counter end={s.value} suffix={s.suffix}/>
              </div>
              <p className="text-[#333] text-sm font-mono">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
