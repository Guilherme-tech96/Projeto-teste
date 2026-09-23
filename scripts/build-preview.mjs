// Folds the static export (out/) into a single self-contained HTML file that
// can be hosted anywhere as a browsable preview: CSS, Latin web fonts and all
// JavaScript are inlined. Run with `npm run build:preview`.
import { readFileSync, writeFileSync } from "node:fs";

const OUT = new URL("../out/", import.meta.url);
const read = (path) => readFileSync(new URL(path.replace(/^\//, ""), OUT));

let html = read("index.html").toString();

// Stylesheet: inline, keeping only Latin font subsets (embedded as data URIs).
const cssHref = html.match(/<link rel="stylesheet" href="([^"]+)"/)[1];
let css = read(cssHref).toString();
css = css.replace(/@font-face\{[^}]*\}/g, (face) => {
  const range = face.match(/unicode-range:([^;}]*)/)?.[1] ?? "";
  if (!/U\+0000-00FF|U\+0100-02BA/i.test(range)) return "";
  return face.replace(/url\(([^)]+\.woff2)\)/g, (_, url) => {
    const file = url.replace(/^["']|["']$/g, "").replace(/^\.\.\//, "/_next/static/");
    return `url(data:font/woff2;base64,${read(file).toString("base64")})`;
  });
});

// Scripts: webpack runtime first, the app bootstrap (main-app) last so every
// chunk it needs is already registered, the rest in document order.
const srcs = [...html.matchAll(/<script src="([^"]+)"[^>]*><\/script>/g)].map((m) => m[1]).filter((s) => !s.includes("polyfills"));
const rank = (s) => (s.includes("/webpack-") ? 0 : s.includes("/main-app-") ? 2 : 1);
srcs.sort((a, b) => rank(a) - rank(b));
// Next.js derives its asset prefix from document.currentScript.src, which is
// empty for inline scripts; give it a stand-in so hydration can proceed.
let patched = 0;
const inline = (code) =>
  code.replace(/new URL\((\w+)\.src\)/g, (_, v) => (patched++, `new URL(${v}.src||"http://localhost/_next/")`));
const scripts = srcs
  .map((s) => `<script>${inline(read(s).toString()).replace(/<\/script/gi, "<\\/script")}</script>`)
  .join("\n");
if (!patched) throw new Error("Asset-prefix patch did not apply; Next.js internals may have changed.");

const title = "<title>NAVA Maritime Transport</title>";
const body = html
  .match(/<body[^>]*>([\s\S]*)<\/body>/)[1]
  .replace(/<script src="[^"]+"[^>]*><\/script>/g, "");

// Hosts that wrap this file in their own <body> leave the <title>/<style> tags
// inside it, which React treats as a hydration mismatch. Move them into
// <head> (and drop stray whitespace) before the app boots.
const HEAD_FIXUP = `for (const n of [...document.body.childNodes]) {
  if (n.nodeType === 3 && !n.textContent.trim()) n.remove();
  else if (/^(TITLE|META|STYLE|LINK)$/.test(n.nodeName)) document.head.appendChild(n);
}
document.currentScript.remove();`;

const page = `${title}
<meta name="description" content="Browsable preview of the NAVA Maritime Transport website.">
<style>${css}</style>
<style>html{scroll-behavior:smooth}body{margin:0;background:#fff;color:#051430;font-family:"Inter Variable",ui-sans-serif,system-ui,sans-serif;font-size:16px;line-height:1.5}</style>
${body}
<script>${HEAD_FIXUP}</script>
${scripts}
`;
writeFileSync(new URL("nava-preview.html", OUT), page);
console.log(`Wrote out/nava-preview.html (${(page.length / 1024).toFixed(0)} KB)`);
