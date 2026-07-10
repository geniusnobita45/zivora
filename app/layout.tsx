import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zivora.example.com"),
  title: {
    default: "ZIVORA — Automate · Innovate · Elevate",
    template: "%s — ZIVORA",
  },
  description:
    "Zivora builds intelligent digital systems — AI automation, premium websites, custom AI tools, content engines and paid growth — so your business grows on autopilot.",
  keywords: [
    "AI automation agency India",
    "premium website development",
    "custom AI tools",
    "social media management",
    "digital growth agency",
    "business automation",
  ],
  openGraph: {
    title: "ZIVORA — Automate · Innovate · Elevate",
    description:
      "We design intelligent systems across automation, websites, AI tools, content and growth — one connected engine for modern businesses.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030308",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

