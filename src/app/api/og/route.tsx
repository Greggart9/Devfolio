import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060608",
          padding: "64px",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(0,255,136,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Green glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(0,255,136,0.07)",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(0,196,255,0.05)",
            filter: "blur(100px)",
          }}
        />

        {/* Top — nav bar style */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span style={{ color: "#333", fontSize: "18px" }}>
            ~/
            <span style={{ color: "#00ff88" }}>Olúwadámiláre Ogundare</span>
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(0,255,136,0.25)",
              borderRadius: "999px",
              padding: "8px 16px",
              background: "rgba(0,255,136,0.05)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#00ff88",
              }}
            />
            <span style={{ color: "#00ff88", fontSize: "14px" }}>
              Open to work
            </span>
          </div>
        </div>

        {/* Middle — main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "18px", color: "#00ff88", letterSpacing: "0.15em" }}>
            // FRONTEND DEVELOPER
          </div>
          <div
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-2px",
            }}
          >
            Olúwadámiláre Ogundare
          </div>
          <div
            style={{
              fontSize: "28px",
              background: "linear-gradient(120deg, #00ff88, #00c4ff)",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: "600",
            }}
          >
            React · Next.js · TypeScript · Node.js
          </div>
          <div style={{ fontSize: "18px", color: "#444", maxWidth: "640px", lineHeight: 1.6 }}>
            Building fast, accessible web applications with the modern stack.
            3+ years · 18+ Repos · Open to work
          </div>
        </div>

        {/* Bottom — tech tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "JavaScript"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid #1c1c24",
                  borderRadius: "999px",
                  padding: "6px 16px",
                  color: "#444",
                  fontSize: "14px",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}