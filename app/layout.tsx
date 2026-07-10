import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

const siteUrl = "https://zivoraai.co.in";
const siteTitle = "Zivora AI | AI Automation, Websites & Digital Growth";
const siteDescription =
  "Zivora AI builds intelligent automation systems, premium websites, AI tools and digital growth solutions for modern businesses.";
const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "ZIVORA AI - Automate. Innovate. Scale.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Zivora AI",
  },
  description: siteDescription,
  keywords: [
    "AI automation agency India",
    "premium website development",
    "custom AI tools",
    "social media management",
    "digital growth agency",
    "business automation",
  ],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Zivora AI",
    locale: "en_IN",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  email: site.email,
  sameAs: [site.social.instagram, site.social.github],
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
