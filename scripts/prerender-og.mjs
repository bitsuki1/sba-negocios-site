// ============================================================================
// Pré-render de SEO/OG por rota (pós-build).
//
// Roda depois do `vite build`. Lê `dist/index.html` (o shell da SPA) e, para
// cada rota do `src/lib/seo-routes.json`, grava um `dist/<rota>/index.html` com
// título + metas (description/OG/Twitter/canonical/og:url) já embutidos.
//
// Por quê: robôs de preview (WhatsApp/LinkedIn/Facebook) NÃO rodam JS, então
// veriam sempre as metas do index.html raiz. Com um HTML por rota, o preview
// fica correto por página. O app React continua hidratando normalmente — o
// #root está vazio nos dois casos; só as metas do <head> mudam.
//
// Fonte-da-verdade única: `src/lib/seo-routes.json` (mesmo arquivo lido pelo
// cliente em `src/lib/seo.ts`). Editar SEO = editar aquele JSON.
// ============================================================================
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dist = join(root, "dist");
const ORIGIN = "https://sbanegocios.com.br";

const seoRoutes = JSON.parse(
  readFileSync(join(root, "src/lib/seo-routes.json"), "utf8"),
);

const shell = readFileSync(join(dist, "index.html"), "utf8");

/** Escapa aspas/e-comercial para uso seguro em atributos HTML. */
function attr(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Reescreve as metas do shell para uma rota. Casa as tags por nome/propriedade
 * (tolerante a atributos multi-linha) e troca só o `content`.
 */
function renderForRoute(pathname, seo) {
  const url = pathname === "/" ? `${ORIGIN}/` : `${ORIGIN}${pathname}`;
  const t = attr(seo.title);
  const d = attr(seo.description);

  let html = shell;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);

  // Substitui o content de uma meta identificada por (attr, valor).
  const setContent = (idAttr, idVal, value) => {
    const re = new RegExp(
      `(<meta\\s+[^>]*${idAttr}="${idVal}"[^>]*content=")[\\s\\S]*?(")`,
      "i",
    );
    if (re.test(html)) {
      html = html.replace(re, `$1${value}$2`);
    }
  };

  setContent("name", "description", d);
  setContent("property", "og:title", t);
  setContent("property", "og:description", d);
  setContent("property", "og:url", url);
  setContent("name", "twitter:title", t);
  setContent("name", "twitter:description", d);

  // canonical (link, não meta)
  html = html.replace(
    /(<link\s+rel="canonical"\s+href=")[\s\S]*?(")/i,
    `$1${url}$2`,
  );

  // Rota não-listada (noindex no JSON): robots noindex já no HTML estático,
  // para valer também para robôs que não rodam JS.
  if (seo.noindex) {
    html = html.replace(
      "</head>",
      '  <meta name="robots" content="noindex, nofollow" />\n  </head>',
    );
  }

  return html;
}

let count = 0;
for (const [pathname, seo] of Object.entries(seoRoutes.routes)) {
  const html = renderForRoute(pathname, seo);
  if (pathname === "/") {
    // A raiz é o próprio index.html (fica com as metas do default).
    writeFileSync(join(dist, "index.html"), html);
  } else {
    const dir = join(dist, pathname.replace(/^\//, ""));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "index.html"), html);
  }
  count++;
}

console.log(`prerender-og: ${count} rotas geradas em dist/`);

// ============================================================================
// GUARDA DE COERÊNCIA rota × sitemap  (2026-08-26)
//
// POR QUE EXISTE: adicionar uma rota exige editar DOIS arquivos —
// `src/lib/seo-routes.json` e `public/sitemap.xml`. Esquecer o segundo não
// quebra nada visivelmente: o site funciona, o build passa, e a página
// simplesmente nunca é descoberta pelo buscador. É uma falha SILENCIOSA, que
// é a pior espécie. Esta guarda transforma o silêncio em erro de build.
//
// Regra: toda rota indexável (sem `noindex`) precisa estar no sitemap, e todo
// endereço do sitemap precisa ser uma rota conhecida.
// ============================================================================
const sitemapPath = join(dist, "sitemap.xml");
let sitemapXml = "";
try {
  sitemapXml = readFileSync(sitemapPath, "utf8");
} catch {
  console.error("prerender-og: ERRO — dist/sitemap.xml não existe.");
  process.exit(1);
}

const noSitemap = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(ORIGIN, "").replace(/\/$/, "") || "/",
  ),
);
const indexaveis = Object.entries(seoRoutes.routes)
  .filter(([, seo]) => !seo.noindex)
  .map(([p]) => p);

const faltamNoSitemap = indexaveis.filter((p) => !noSitemap.has(p));
const sobramNoSitemap = [...noSitemap].filter(
  (p) => !(p in seoRoutes.routes),
);
const indexadasMasNoindex = [...noSitemap].filter(
  (p) => seoRoutes.routes[p]?.noindex,
);

const problemas = [];
if (faltamNoSitemap.length)
  problemas.push(
    `rota(s) indexável(is) FORA do sitemap (o buscador nunca vai achar): ${faltamNoSitemap.join(", ")}`,
  );
if (sobramNoSitemap.length)
  problemas.push(
    `endereço(s) no sitemap sem rota correspondente (link quebrado p/ o buscador): ${sobramNoSitemap.join(", ")}`,
  );
if (indexadasMasNoindex.length)
  problemas.push(
    `rota(s) marcada(s) noindex MAS listada(s) no sitemap (sinal contraditório): ${indexadasMasNoindex.join(", ")}`,
  );

if (problemas.length) {
  console.error("prerender-og: ERRO de coerência rota × sitemap");
  for (const p of problemas) console.error("  - " + p);
  process.exit(1);
}
console.log(
  `prerender-og: guarda ok — ${indexaveis.length} rotas indexáveis batem com o sitemap`,
);
