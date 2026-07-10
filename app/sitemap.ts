import type { MetadataRoute } from "next";

const siteUrl = "https://zivoraai.co.in";

const publicRoutes = [
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
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
