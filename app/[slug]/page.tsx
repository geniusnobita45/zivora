import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingContentPage } from "@/components/ContentPage";
import { getMarketingPage, marketingPages } from "@/lib/seo-pages";

const siteUrl = "https://zivoraai.co.in";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return marketingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getMarketingPage(slug);
  if (!page) return {};

  const url = `${siteUrl}/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${page.metaTitle} | Zivora AI`,
      description: page.description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Zivora AI`,
      description: page.description,
    },
  };
}

export default async function MarketingPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = getMarketingPage(slug);

  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    provider: {
      "@type": "Organization",
      name: "Zivora AI",
      url: siteUrl,
    },
    areaServed: "India",
    url: `${siteUrl}/${page.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingContentPage page={page} />
    </>
  );
}