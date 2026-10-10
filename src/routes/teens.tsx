import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/teens")({
  server: {
    handlers: {
      GET: () =>
        new Response(null, {
          status: 302,
          headers: { Location: "/teens/index.html", "Cache-Control": "no-store" },
        }),
    },
  },
  beforeLoad: () => {
    throw redirect({ href: "/teens/index.html" });
  },
  head: () => ({
    meta: [
      { title: "عالم الشباب السكريين — سما" },
      {
        name: "description",
        content: "عالم الشباب السكريين مساحة موجهة للفئة العمرية من ١٢ إلى ١٨ سنة لفهم السكري من النوع الأول خطوة بخطوة.",
      },
      { property: "og:title", content: "عالم الشباب السكريين — سما" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});
