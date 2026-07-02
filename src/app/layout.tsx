import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Olúwadámiláre Ogundare — Frontend Developer",
  description:
    "Frontend engineer specialising in React, Next.js, and high-performance web applications. 5+ years, 38+ projects shipped.",
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Olúwadámiláre Ogundare — Frontend Developer",
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
    title: "Olúwadámiláre Ogundare — Frontend Developer",
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
        <Cursor />
        <Reveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

