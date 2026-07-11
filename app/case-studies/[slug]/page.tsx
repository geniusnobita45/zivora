import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyContentPage } from "@/components/ContentPage";
import { caseStudyPages, getCaseStudyPage } from "@/lib/seo-pages";

const siteUrl = "https://zivoraai.co.in";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudyPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCaseStudyPage(slug);
  if (!page) return {};

  const url = `${siteUrl}/case-studies/${page.slug}`;

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
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Zivora AI`,
      description: page.description,
    },
  };
}

export default async function CaseStudyPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const page = getCaseStudyPage(slug);

  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    author: {
      "@type": "Person",
      name: "Aryan Sharma",
    },
    publisher: {
      "@type": "Organization",
      name: "Zivora AI",
      url: siteUrl,
    },
    url: `${siteUrl}/case-studies/${page.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyContentPage page={page} />
    </>
  );
}