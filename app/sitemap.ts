import type { MetadataRoute } from "next";
import { caseStudyPages, marketingPages } from "@/lib/seo-pages";

const siteUrl = "https://zivoraai.co.in";
const lastModified = new Date("2026-07-11T00:00:00.000Z");
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
type PublicRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

const publicRoutes: PublicRoute[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/privacy-policy",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    path: "/terms",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  ...marketingPages.map((page) => ({
    path: `/${page.slug}`,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  })),
  ...caseStudyPages.map((page) => ({
    path: `/case-studies/${page.slug}`,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}