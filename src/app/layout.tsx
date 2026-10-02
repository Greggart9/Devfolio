import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import BottomBlur from "@/components/BottomBlur";
import { ThemeProvider } from "@/context/ThemeContext";

// Dynamically import Three.js 3D background with SSR disabled to prevent Webpack SSR chunk errors
const Background3D = dynamic(() => import("@/components/Background3D"), {
  ssr: false,
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Olúwadámiláre Ogundare — Senior Frontend Engineer",
  description:
    "Frontend engineer specialising in React, Next.js, 3D web experiences, and high-performance applications. 3+ years, 38+ projects shipped.",
  icons: {
    icon: [
      { url: "/alien-monster.svg", type: "image/svg+xml" },
    ],
    shortcut: "/alien-monster.svg",
    apple: "/alien-monster.svg",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Olúwadámiláre Ogundare — Senior Frontend Engineer",
    description:
      "Frontend engineer specialising in React, Next.js, and high-performance web applications.",
    siteName: "Olúwadámiláre Ogundare",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Olúwadámiláre Ogundare — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olúwadámiláre Ogundare — Senior Frontend Engineer",
    description:
      "Frontend engineer specialising in React, Next.js, and high-performance web applications.",
    images: ["/api/og"],
    creator: "@Oluwad_amilare",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <Background3D />
            <Navbar />
            {children}
            <Footer />
            <BottomBlur />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
