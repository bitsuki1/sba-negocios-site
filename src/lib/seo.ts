// ============================================================================
// SEO por rota — fonte-da-verdade única em `seo-routes.json`.
//
// O MESMO JSON é lido em dois lugares:
//   1) aqui (cliente) — seta título/meta em runtime (ótimo p/ Google e aba);
//   2) `scripts/prerender-og.mjs` (pós-build) — grava um index.html por rota
//      com as metas OG/Twitter já embutidas, para que o PREVIEW ao compartilhar
//      (WhatsApp/LinkedIn/Facebook) fique correto por página. Esses robôs NÃO
//      rodam JS, por isso o preview por rota exige o HTML pré-renderizado.
// Editar textos de SEO = editar `seo-routes.json` (não duplicar aqui).
// ============================================================================

import seoRoutes from "./seo-routes.json";

interface PageSeo {
  title: string;
  description: string;
  /** Página "não listada" (acesso só pela URL): injeta robots noindex. */
  noindex?: boolean;
}

export const SEO_DEFAULT: PageSeo = seoRoutes.default;

export const SEO_MAP: Record<string, PageSeo> = seoRoutes.routes;

function setMeta(key: string, content: string, attr: "name" | "property") {
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Aplica título + metas da rota atual (fallback no default do site). */
export function applySeo(pathname: string) {
  const seo = SEO_MAP[pathname] ?? SEO_DEFAULT;
  document.title = seo.title;
  setMeta("description", seo.description, "name");
  setMeta("og:title", seo.title, "property");
  setMeta("og:description", seo.description, "property");
  setMeta("twitter:title", seo.title, "property");
  setMeta("twitter:description", seo.description, "property");
  // Rota não-listada: robots noindex (e remove a meta ao navegar para fora).
  if (seo.noindex) {
    setMeta("robots", "noindex, nofollow", "name");
  } else {
    document.head.querySelector('meta[name="robots"]')?.remove();
  }
}

/**
 * Structured data (JSON-LD) por página — injetado no <head> com o marcador
 * data-page-schema para permitir a substituição limpa ao trocar de rota.
 * Passar `null` remove qualquer schema anterior sem deixar sujeira.
 * O schema do Organization (constante do site) fica no index.html com o
 * marcador data-site-schema — este helper NÃO toca nele.
 */
export function applyPageSchema(schema: object | null) {
  // Remove qualquer script anterior desta rota.
  document.head
    .querySelectorAll("script[data-page-schema]")
    .forEach((el) => el.remove());
  if (!schema) return;
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.dataset.pageSchema = "true";
  el.textContent = JSON.stringify(schema);
  document.head.appendChild(el);
}
