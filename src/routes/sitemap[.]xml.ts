import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://t1d-ar.com";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/simplified-guide", changefreq: "weekly", priority: "0.9" },
          { path: "/listen", changefreq: "monthly", priority: "0.8" },
          { path: "/what-to-do-now", changefreq: "monthly", priority: "0.9" },
          { path: "/family-tools", changefreq: "monthly", priority: "0.8" },
          { path: "/parent-experiences", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "yearly", priority: "0.5" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/kids/index.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/adventure-02.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/adventure-03.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/adventure-04.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/adventure-05.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/adventure-06.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/adventure-07.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/adventure-08.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/energy-keys.html", changefreq: "monthly", priority: "0.7" },
          { path: "/kids/sama-road.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/index.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/about.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/faith.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/faq.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/journey.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/safety.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-01.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-02.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-03.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-04.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-05.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-06.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-07.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-08.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-09.html", changefreq: "monthly", priority: "0.7" },
          { path: "/teens/lesson-10.html", changefreq: "monthly", priority: "0.7" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
