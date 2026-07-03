// ============================================================================
// SEO por rota — aplicado de forma central no Layout (sem editar cada página).
//
// Observação honesta: este site é uma SPA estática (GitHub Pages, sem SSR).
// O título e a meta-descrição abaixo são setados no cliente — ótimos para o
// Google (que renderiza JS) e para a aba/bookmark. Já o PREVIEW ao compartilhar
// (WhatsApp/LinkedIn/Facebook) usa as tags estáticas do index.html, porque
// esses robôs NÃO executam JavaScript. Preview por página exigiria pré-render.
// ============================================================================

import { MARCA } from "@/data/site";

interface PageSeo {
  title: string;
  description: string;
}

export const SEO_DEFAULT: PageSeo = {
  title: `${MARCA.nome} — Desenvolvimento de Negócios e Consultoria`,
  description:
    "A SBA Negócios estrutura projetos para os setores público e privado: recuperação tributária (Tema 1130 do STF), resíduos e infraestrutura ambiental.",
};

export const SEO_MAP: Record<string, PageSeo> = {
  "/": SEO_DEFAULT,
  "/setor-publico": {
    title: `Setor Público — ${MARCA.nome}`,
    description:
      "Para prefeituras e consórcios: recuperação de receita (Tema 1130), resíduos urbanos, energia e infraestrutura — com dado público e método auditável.",
  },
  "/setor-privado": {
    title: `Setor Privado — ${MARCA.nome}`,
    description:
      "Destinação e valorização de resíduos para indústria, comércio, agro e saúde — conformidade legal, rastreabilidade e parceiros que operam.",
  },
  "/solucoes": {
    title: `Soluções — ${MARCA.nome}`,
    description:
      "O portfólio da SBA por tema: recuperação tributária, resíduos, energia, ambiental, infraestrutura e cultura.",
  },
  "/recuperacao-tributaria": {
    title: `Recuperação Tributária (Tema 1130) — ${MARCA.nome}`,
    description:
      "Recuperação tributária municipal pelo Tema 1130 do STF: o IRRF retido dos fornecedores é do município. Dado público e honorários só no êxito.",
  },
  "/residuos": {
    title: `Resíduos & Valorização — ${MARCA.nome}`,
    description:
      "Tratamento e valorização de resíduos sólidos urbanos com tecnologia parceira (CSTR) — do estudo ao contrato.",
  },
  "/residuos-hospitalares": {
    title: `Resíduos Hospitalares (RSS) — ${MARCA.nome}`,
    description:
      "Tratamento de resíduos de serviços de saúde (RSS) com rastreabilidade do recolhimento à destinação final e conformidade ANVISA.",
  },
  "/estabilizador-de-solo": {
    title: `Estabilizador de Solo (ConAid CBR Plus) — ${MARCA.nome}`,
    description:
      "Estabilização de solo com ConAid CBR Plus para estradas e pátios: firmeza o ano todo, menos manutenção e custo de material menor.",
  },
  "/solucoes/energia-fotovoltaica": {
    title: `Energia Fotovoltaica — ${MARCA.nome}`,
    description:
      "Usinas solares para abastecer prédios e equipamentos públicos — economia previsível na conta de energia do município, com engenharia e jurídico parceiros.",
  },
  "/solucoes/iluminacao-publica": {
    title: `Iluminação Pública (LED) — ${MARCA.nome}`,
    description:
      "Modernização da iluminação municipal para LED e telegestão: conta de energia menor e cidade mais segura, do diagnóstico ao modelo de contratação.",
  },
  "/solucoes/reflorestamento-carbono": {
    title: `Reflorestamento & Crédito de Carbono — ${MARCA.nome}`,
    description:
      "Restauração e reflorestamento de áreas, com potencial de geração de crédito de carbono — conformidade ambiental e nova fonte de receita.",
  },
  "/solucoes/saneamento-agua": {
    title: `Saneamento & Água (ETA/ETE) — ${MARCA.nome}`,
    description:
      "Projetos de tratamento de água e esgoto alinhados ao Novo Marco do Saneamento, com o arranjo técnico e financeiro estruturado.",
  },
  "/solucoes/eventos-cultura": {
    title: `Eventos & Projetos Culturais — ${MARCA.nome}`,
    description:
      "Estruturação e captação de recursos para eventos e projetos culturais do município, inclusive por leis de incentivo.",
  },
  "/sobre": {
    title: `Sobre — ${MARCA.nome}`,
    description:
      "A SBA Negócios é uma gestora de projetos para os setores público e privado: origina, estrutura e coordena — sem executar a obra.",
  },
  "/seja-um-parceiro": {
    title: `Seja um parceiro — ${MARCA.nome}`,
    description:
      "Seja parceiro da SBA: técnicos, jurídicos, operadores e representantes que somam com a SBA em cada projeto.",
  },
  "/contato": {
    title: `Contato — ${MARCA.nome}`,
    description:
      "Fale com a SBA Negócios. Solicite o estudo da sua cidade ou converse sobre um projeto — sem compromisso.",
  },
  "/privacidade": {
    title: `Política de Privacidade — ${MARCA.nome}`,
    description:
      "Como a SBA Negócios trata os dados pessoais enviados pelo site, conforme a LGPD (Lei 13.709/2018).",
  },
};

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
}
