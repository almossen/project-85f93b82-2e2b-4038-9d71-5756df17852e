import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/kids")({
  server: {
    handlers: {
      GET: () =>
        new Response(null, {
          status: 302,
          headers: { Location: "/kids/index.html", "Cache-Control": "no-store" },
        }),
    },
  },
  beforeLoad: () => {
    throw redirect({ href: "/kids/index.html" });
  },
  head: () => ({
    meta: [
      { title: "عالم سما للأطفال — سما" },
      {
        name: "description",
        content: "منصة مخصصة للأطفال للتعلّم بطريقة قريبة منهم ضمن عالم سما.",
      },
      { property: "og:title", content: "عالم سما للأطفال — سما" },
      {
        property: "og:description",
        content: "منصة مخصصة للأطفال للتعلّم بطريقة قريبة منهم ضمن عالم سما.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});