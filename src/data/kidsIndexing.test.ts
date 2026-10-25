import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const names = [
  "index.html",
  "adventure-02.html",
  "adventure-03.html",
  "adventure-04.html",
  "adventure-05.html",
  "adventure-06.html",
  "adventure-07.html",
  "adventure-08.html",
  "energy-keys.html",
  "sama-road.html",
];
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const pages = names.map((name) => ({ name, html: read(`public/kids/${name}`) }));

describe("kids public indexing boundaries", () => {
  it("keeps ten unique titles, descriptions and self-referencing canonicals", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    const canonicals = new Set<string>();
    for (const { name, html } of pages) {
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
      const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1];
      const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
      assert.ok(title, name);
      assert.ok(description, name);
      assert.equal(canonical, `https://t1d-ar.com/kids/${name}`);
      assert.ok(html.includes(`<meta property="og:description" content="${description}">`));
      assert.ok(html.includes(`<meta name="twitter:description" content="${description}">`));
      titles.add(title);
      descriptions.add(description);
      canonicals.add(canonical);
    }
    assert.equal(titles.size, 10);
    assert.equal(descriptions.size, 10);
    assert.equal(canonicals.size, 10);
  });

  it("keeps the kids pages free of indexing prohibitions", () => {
    for (const { name, html } of pages) {
      assert.doesNotMatch(html, /<meta\b[^>]*(?:noindex|none)[^>]*>/i, name);
    }
    assert.match(read("public/robots.txt"), /User-agent: \*\s+Allow: \//);
    assert.doesNotMatch(read("public/robots.txt"), /Disallow: \/(?:kids)?\s*$/m);
  });

  it("provides static contextual anchors to previous, next and index pages", () => {
    for (const { name, html } of pages) {
      const nav = html.match(
        /<nav aria-label="روابط مغامرات عالم سما" data-kids-context-links>([\s\S]*?)<\/nav>/,
      )?.[1];
      assert.ok(nav, name);
      assert.ok(nav.includes('href="index.html#adventureMap"'), name);
      assert.doesNotMatch(nav, /onclick|hidden|disabled/i);
      const position = names.indexOf(name);
      if (position > 0 && position < 8) {
        assert.ok(nav.includes(`href="${names[position - 1]}" rel="prev"`), name);
      }
      if (position < 7) {
        assert.ok(nav.includes(`href="${names[position + 1]}" rel="next"`), name);
      }
      for (const match of nav.matchAll(/href="([^"]+)"/g)) {
        const [destination, fragment] = match[1].split("#");
        const path = `public/kids/${destination}`;
        assert.ok(existsSync(resolve(root, path)), `${name}: ${destination}`);
        if (fragment) assert.ok(read(path).includes(`id="${fragment}"`));
      }
    }
    assert.match(pages[8].html, /data-kids-context-links>[\s\S]*href="sama-road.html"/);
    assert.match(pages[9].html, /data-kids-context-links>[\s\S]*href="energy-keys.html"/);
  });

  it("keeps the 34 substantive sitemap entries and excludes redirect aliases", () => {
    const sitemap = read("src/routes/sitemap[.]xml.ts");
    const paths = [...sitemap.matchAll(/\{ path: "([^"]+)"/g)].map((match) => match[1]);
    assert.equal(paths.length, 34);
    assert.equal(new Set(paths).size, 34);
    for (const alias of ["/sources", "/kids", "/teens"]) assert.ok(!paths.includes(alias));
    assert.match(read("src/routes/sources.tsx"), /throw redirect\(\{ to: "\/about" \}\)/);
    for (const name of names) assert.ok(paths.includes(`/kids/${name}`));
    assert.doesNotMatch(sitemap, /lastmod/i);
  });
});
