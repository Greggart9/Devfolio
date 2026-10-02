"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import { Move, RotateCcw } from "lucide-react";

interface SkillTagItem {
  id: string;
  label: string;
  theme: "white" | "dark" | "accent";
  w: number;
  h: number;
}

const SKILL_TAGS: SkillTagItem[] = [
  { id: "react", label: "React", theme: "white", w: 96, h: 36 },
  { id: "nextjs", label: "Next.js", theme: "dark", w: 106, h: 36 },
  { id: "typescript", label: "TypeScript", theme: "accent", w: 114, h: 36 },
  { id: "tailwind", label: "Tailwind CSS", theme: "dark", w: 122, h: 36 },
  { id: "motion", label: "Framer Motion", theme: "white", w: 132, h: 36 },
  { id: "three", label: "Three.js / 3D", theme: "dark", w: 122, h: 36 },
  { id: "uiux", label: "UI / UX Design", theme: "white", w: 126, h: 36 },
  { id: "typescript", label: "Typescript", theme: "dark", w: 132, h: 36 },
  { id: "perf", label: "Performance & SEO", theme: "white", w: 156, h: 36 },
  { id: "webvitals", label: "Core Web Vitals", theme: "accent", w: 138, h: 36 },
  { id: "figma", label: "Figma to Code", theme: "dark", w: 128, h: 36 },
  { id: "micro", label: "Microinteractions", theme: "white", w: 146, h: 36 },
  { id: "clean", label: "Clean Code", theme: "dark", w: 112, h: 36 },
  { id: "javascript", label: "Javascript", theme: "white", w: 140, h: 36 },
  { id: "responsive", label: "Responsive Layouts", theme: "dark", w: 160, h: 36 },
  { id: "animations", label: "Animations", theme: "accent", w: 150, h: 36 },
  { id: "gsap", label: "GSAP", theme: "accent", w: 150, h: 36 },
];

export default function FallingSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagElementsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [hasTriggered, setHasTriggered] = useState(false);
  const [simKey, setSimKey] = useState(0);

  // Trigger physics drop when scrolled into view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasTriggered]);

  const restartPhysics = useCallback(() => {
    setSimKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!hasTriggered) return;
    const container = containerRef.current;
    if (!container) return;

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Body, Query } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.15, scale: 0.001 },
    });

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // ── Boundary Walls ──
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      friction: 0.2,
      restitution: 0.2,
    };

    const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, wallOptions);
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 3, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 3, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // ── Create Physics Bodies for Each Skill Tag ──
    const tagBodies: { body: Matter.Body; id: string; w: number; h: number }[] = [];

    SKILL_TAGS.forEach((skill, index) => {
      // Stagger initial drop spawn positions across columns
      const col = index % 4;
      const xOffset = width * 0.12 + col * (width * 0.23) + (Math.random() - 0.5) * 35;
      const yOffset = -50 - Math.floor(index / 4) * 80 - Math.random() * 40;

      const body = Bodies.rectangle(xOffset, yOffset, skill.w, skill.h, {
        chamfer: { radius: 10 },
        restitution: 0.45, // Bouncy collision
        friction: 0.15,
        frictionAir: 0.012,
        density: 0.002,
        angle: (Math.random() - 0.5) * 0.45,
      });

      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

      tagBodies.push({
        body,
        id: skill.id,
        w: skill.w,
        h: skill.h,
      });

      Composite.add(engine.world, body);
    });

    // ── Mouse Drag & Toss Constraint ──
    const mouse = Mouse.create(container);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Ensure scrolling over the canvas doesn't get trapped by Matter.js
    // @ts-expect-error - Matter.js mouse event cleanup
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    // @ts-expect-error - Matter.js mouse event cleanup
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    // Cursor grab state feedback
    Events.on(mouseConstraint, "mousemove", () => {
      const bodies = tagBodies.map((t) => t.body);
      const isOver = Query.point(bodies, mouse.position).length > 0;
      container.style.cursor = isOver ? (mouseConstraint.body ? "grabbing" : "grab") : "default";
    });

    Events.on(mouseConstraint, "startdrag", () => {
      container.style.cursor = "grabbing";
    });

    Events.on(mouseConstraint, "enddrag", () => {
      container.style.cursor = "grab";
    });

    Composite.add(engine.world, mouseConstraint);

    // ── Animation Loop: Sync DOM positions with Matter.js Bodies ──
    let animationFrameId: number;

    const updateDOMPositions = () => {
      tagBodies.forEach(({ body, id, w, h }) => {
        const el = tagElementsRef.current[id];
        if (el) {
          const { x, y } = body.position;
          const angle = body.angle;
          el.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0px) rotate(${angle}rad)`;
          el.style.visibility = "visible";
        }
      });
      animationFrameId = requestAnimationFrame(updateDOMPositions);
    };

    const runner = Runner.create();
    Runner.run(runner, engine);
    animationFrameId = requestAnimationFrame(updateDOMPositions);

    // ── Handle Window Resize ──
    const handleResize = () => {
      if (!container) return;
      const newRect = container.getBoundingClientRect();
      Body.setPosition(ground, { x: newRect.width / 2, y: newRect.height + 30 });
      Body.setPosition(rightWall, { x: newRect.width + 30, y: newRect.height / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [hasTriggered, simKey]);

  return (
    <div className="mb-14">
      {/* Subheader Toolbar */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
            Interactive Skills Stack
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
            <Move className="w-3 h-3 text-[var(--accent)]" />
            <span>Click & toss tags</span>
          </div>

          {hasTriggered && (
            <button
              onClick={restartPhysics}
              title="Drop tags again"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-mono text-slate-700 hover:text-slate-900 transition-all active:scale-95"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Drop again</span>
            </button>
          )}
        </div>
      </div>

      {/* Physics Container Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[320px] sm:h-[350px] md:h-[380px] rounded-3xl border border-slate-200 bg-slate-50/70 backdrop-blur-xl overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.04)] select-none"
      >
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[var(--accent)]/10 to-transparent blur-xl pointer-events-none" />

        {/* Initial Prompt when tags are about to drop */}
        {!hasTriggered && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-slate-400 pointer-events-none">
            Scroll to drop skills...
          </div>
        )}

        {/* Rendered Skill Tag HTML Elements (positioned in physical space by Matter.js) */}
        {SKILL_TAGS.map((skill) => {
          let styleClasses = "";

          if (skill.theme === "white") {
            styleClasses =
              "bg-white text-slate-800 border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.06)] font-semibold";
          } else if (skill.theme === "accent") {
            styleClasses =
              "bg-[#3B82F6] text-white border border-[#2563eb] shadow-[0_4px_16px_rgba(59,130,246,0.35)] font-bold";
          } else {
            styleClasses =
              "bg-slate-900 text-white border border-slate-800 shadow-[0_4px_14px_rgba(0,0,0,0.12)] font-medium";
          }

          return (
            <div
              key={skill.id}
              ref={(el) => {
                tagElementsRef.current[skill.id] = el;
              }}
              style={{
                width: `${skill.w}px`,
                height: `${skill.h}px`,
                visibility: "hidden",
                willChange: "transform",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className={`rounded-xl text-xs font-mono select-none pointer-events-none flex items-center justify-center text-center px-2 ${styleClasses}`}
            >
              {skill.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
