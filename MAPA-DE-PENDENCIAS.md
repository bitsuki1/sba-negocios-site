# MAPA DE PENDÊNCIAS — sba-site (site institucional da SBA Negócios)
> **🌐 URL para você olhar (padrão D172):** https://claude.ai/code/artifact/a2d0ecf3-8181-445f-ac6c-9418db470fde — foto do SSOT deste arquivo, republicada no MESMO endereço a cada mudança. Fonte HTML da versão publicada: `<scratchpad>/mapa-sba-site.html`; fonte canônica do conteúdo: `MAPA-DE-PENDENCIAS.md` na raiz deste repo.
> **Atualizado: 2026-08-22 (v3 — corpo de processos do escritório incorporado ao repo por ordem viva do MOU; nenhuma pendência sua nova, tudo puxado por mim).** · **Só pendência.** O que já foi feito vive no git — não se repete aqui.
> Regras (D172/D181/D182/D191/D192): item 🔒 SEU = passos numerados com **link direto** um por ação · item ⚙️ MEU = 1 linha do que é + estado (⏳/🔄) · resolvido SAI · ordem = o que destrava mais vem primeiro · em português, sempre.

**🎯 Vetor mantido da v1:** você pediu (1) o mapa no padrão, (2) melhorar SEO, (3) aparecer mais com **Usina de Resíduos**. **Delta da v3 (esta):** você deu ordem viva para o maestro do escritório incorporar governação de projeto aqui — **feito por PUXAR direto** (não esperei o maestro empurrar; carta formal ao PMO em `caixa-de-saida/para-escritorio/`). O repo agora tem à mão o mesmo corpo de trabalho do escritório (mapa D172, handoff D66, ignição D109, casaco D137, código de repo, política de vigência, matriz de admissão de lições, prevenção de perdas, 3 subagentes, 3 regras modulares — 10 arquivos + 3 agentes + 4 regras). **Nada mais na sua fila desta ordem** — as pendências restantes seguem sendo V1/V2+V3/V4/V5/V7 (as mesmas da v2).

---

# 🔒 SUAS — só você faz (cada passo já traz o link do lugar exato)

## 1. 🟧 V1 · Renomear o repo para `sba-negocios-site` (padrão D186 — você aprovou; agora é executar)
**O que é:** você já disse "sim, renomear agora" na caixa de decisão. Falta o clique no GitHub — depois eu abro a onda de varredura de ponteiros no mesmo turno.
**Placar:** 1 clique seu + ~7 ponteiros que eu corrijo depois no mesmo commit.
**Passo a passo:**
1. **Abrir Settings do repo** → https://github.com/bitsuki1/sba-site/settings (aba geral). *(NÃO clicar em "Transfer" ou "Delete" — só o campo "Repository name" no topo.)*
2. **Trocar `sba-site` para `sba-negocios-site`** → Save. O GitHub segura o redirect do nome antigo (não eterno).
3. Me avisar aqui — abro a varredura (CLAUDE.md da unidade SBA, USO.md, `portfolio/MAPA-DO-PORTFOLIO.md`, `GOVERNANCA-REPOS-APP.md`, cofre, badges).
> **Pronto quando:** https://github.com/bitsuki1/sba-negocios-site abrir o repo.

## 2. 🟧 V2 · Google Search Console — provar que o site é seu e mandar o mapa do site (você aprovou; executar)
**O que é:** você disse "vou fazer os dois agora" (GSC + GA4). GSC é o primeiro degrau — sem ele, o resto da onda de SEO fica cego.
**Placar:** 1 verificação + 1 sitemap submetido (~5 min).
**Passo a passo:**
1. **Abrir o GSC** → https://search.google.com/search-console (login com a conta Google dona do domínio, provavelmente `eduardo@saobentoservicos.com.br`).
2. **Add property** (menu esquerdo) → escolher **Domain** (não URL prefix) → digitar `sbanegocios.com.br` → Continue.
3. O Google mostra um valor `google-site-verification=...` — copiar.
4. **Colar o TXT no GoDaddy** → https://dcc.godaddy.com/manage/sbanegocios.com.br/dns → Add record → Type **TXT**, Name **@**, Value = o valor copiado → Save.
5. Voltar ao GSC → **Verify**. Se disser "não achei", esperar 15 min (DNS propaga) e tentar de novo.
6. **Sitemaps** → New sitemap → digitar `sitemap.xml` → Submit.
7. Me avisar quando aparecer "Success".
> **Pronto quando:** card do domínio ficar verde no GSC e o sitemap com status "Success".

## 3. 🟧 V3 · Google Analytics 4 — medir de verdade (você aprovou; executar)
**O que é:** o `@vercel/analytics` não roda em GitHub Pages (vácuo de medição hoje). GA4 resolve.
**Placar:** 1 propriedade criada + 1 Measurement ID (`G-XXXXXXX`) que você me cola aqui.
**Passo a passo:**
1. **Abrir o GA4** → https://analytics.google.com/analytics/web/ (mesma conta do GSC).
2. **Admin** (engrenagem, canto inferior esquerdo) → **Create → Account** (se não tem conta SBA) → nome "SBA Negócios".
3. Dentro da conta: **Create → Property** → nome "sbanegocios.com.br" → moeda BRL → time zone Brasil.
4. **Data Streams → Web** → URL `https://sbanegocios.com.br` → Stream name "site institucional" → Create.
5. Copiar o **Measurement ID** (formato `G-XXXXXXX`) e colar aqui na conversa.
6. Eu cablo o snippet no `index.html` (M8) no mesmo turno.
> **Pronto quando:** você colar aqui o `G-XXXXXXX`.

## 4. 🟨 V4 · Perfil de Empresa no Google — aparecer no mapa/busca local
**O que é:** card à direita do resultado do Google quando pesquisar "SBA Negócios" ou "consultoria resíduos". Gratuito, alto ROI.
**Passo a passo:**
1. **Abrir o Google Business Profile** → https://www.google.com/business/ → Sign in.
2. **Add business → Add single business** → nome "SBA Negócios".
3. **Categoria** → "Consultor de gestão" ou "Consultoria empresarial".
4. Endereço → o do escritório (mesmo do `src/data/site.ts` `CONTATO`: Rua XV de Novembro, 200 — 15º andar, Sé/SP). Se preferir remoto, escolher "atende clientes na área".
5. Provar por telefone ou carta (o Google escolhe o método).
6. Preencher: telefone, site, horário, logo, 2–3 fotos.
7. Me avisar quando estiver "Publicado" — adiciono a URL do perfil ao `sameAs` do JSON-LD Organization já instalado no `index.html`.
> **Rec.:** **Depois de V2/V3.** Uma-vez-só.
> **Pronto quando:** o card aparecer ao pesquisar "SBA Negócios" na sua conta Google.

## 5. 🟨 V5 · Pedir ao parceiro CSTR o link de volta para o site
**O que é:** hoje `/residuos` linka para o CSTR. Se o CSTR também linkar de volta, é um backlink de qualidade — a autoridade dele empresta para a sua.
**Passo a passo:**
1. **Abrir o site do CSTR** → https://cstr.eco.br (do `PARCEIRO_CSTR.site` do `src/data/site.ts`). ⚠️ **Correção honesta:** a v1 apontava para `centrosustentavel.com.br`, mas o arquivo real diz `cstr.eco.br` — usar este.
2. Achar "Parceiros" ou "Sobre" — se tem lista, ver se a SBA já está.
3. Enviar ao contato do CSTR: _"Vocês teriam como incluir a SBA Negócios (https://sbanegocios.com.br) na página de parceiros? Fortalece o Google dos dois lados."_
4. Me avisar quando aparecer.
> **Rec.:** Mande esta semana. É o backlink mais fácil que você tem à mão.
> **Pronto quando:** aparecer "SBA Negócios" ou o logo em alguma página do site do CSTR.

## 6. 🟨 V7 · Aprovar o plano de 3 sub-páginas long-tail (novas rotas)
**O que é:** hoje `/residuos` é uma página só. Quem busca digita coisa específica: "usina de biometano municipal", "RSU prefeitura pequena", "consórcio intermunicipal resíduos". Cada uma merece página própria — multiplica a superfície de rankeamento.
**As 3 propostas:**
- `/residuos/usina-biometano-municipal` — foca prefeituras que já têm coleta seletiva.
- `/residuos/rsu-prefeitura` — foca prefeituras pequenas/médias (até 100 mil hab) buscando destinação legal.
- `/residuos/consorcio-intermunicipal-residuos` — foca grupos de municípios (o modelo mais viável no interior).
Cada uma reusa o layout de landing (`PaginaSolucao`). Pouco código novo, muito ganho de SEO. Todas apontam para `/contato`.
**Rec.:** **Aprovar as 3.** Se quiser fatiar por prioridade, começo pela **consórcio intermunicipal** (tema quente das prefeituras 2026 pós-Novo Marco).
> **Pronto quando:** você responder "vai as 3" ou "vai só a de consórcio primeiro"; começo no mesmo turno.

---

# 📅 PRÓXIMA INSTÂNCIA — a fila já combinada (você não precisa fazer nada agora)
> O que abro na próxima sessão, na ordem, quando os itens acima destravarem:

1. **Assim que você fizer V1** → varredura de ~7 ponteiros do nome antigo em 1 commit; sessão nova monta com o nome novo.
2. **Assim que colar o `G-XXXXXXX` (V3)** → executo M8 (cabla GA4 no `index.html`). Em paralelo, decido com você o destino do `@vercel/analytics` (remover ou manter para migração futura à Vercel).
3. **Assim que aprovar V7** → executo M3/M4/M5 (as 3 sub-páginas) — 1 commit por sub-página para leitura em blocos.
4. **T-002 (opcional, no `TAREFAS-DO-DONO.md`):** se você tiver 1 foto do canteiro Congonhas do Campo e/ou 1 link para notícia externa, me passa — dou upgrade no bloco projeto-farol. Se não tiver, T-002 fecha com "seguir sem" e o bloco já publicado permanece (é honesto e funcional).
5. **Depois de tudo acima:** onda 2 — blog/notícias, calculadora "quanto vale meu resíduo?" (lead magnet integrado ao n8n do hub), OG image específica por página-produto (M6).
6. **Se quiser escalar rápido:** Google Ads B2G ("usina de tratamento de resíduos", "aterro sanitário destinação") e LinkedIn Ads mirando secretários/prefeitos. Decisão sua de budget.

---

# ⚙️ MINHAS — não precisam de você (estão aqui para você VER, não para cobrar)

| id | o que é | estado |
|---|---|---|
| M3 | Criar sub-página `/residuos/usina-biometano-municipal` (rota + landing + `seo-routes.json` + `sitemap.xml`) | ⏳ posso fazer (depende de V7) |
| M4 | Criar sub-página `/residuos/rsu-prefeitura` (idem) | ⏳ posso fazer (depende de V7) |
| M5 | Criar sub-página `/residuos/consorcio-intermunicipal-residuos` (idem) | ⏳ posso fazer (depende de V7) |
| M6 | Gerar OG image específica de Resíduos (hoje é a mesma da home) | ⏳ posso fazer (independente; baixa prioridade) |
| M7 | Sitemap com `<lastmod>` automático (gerado pelo `prerender-og.mjs` a partir do mtime) e `changefreq` diferenciado por tipo de página | ⏳ posso fazer (independente) |
| M8 | Cablar Google Analytics 4 no `index.html` (snippet oficial, sem cookies extras) e decidir com você o destino do `@vercel/analytics` | ⏳ posso fazer (depende de V3) |
| M9 | Auditoria de Core Web Vitals (LCP/CLS/INP) — rodar Lighthouse local, listar as 3 maiores oportunidades e fazer 1 PR de correção | ⏳ posso fazer (independente) |
| M10 | Robô "chega na main" (D170) — adicionar `.github/workflows/consolidar.yml` + `consolidar.sh` (mesma nota do `rotary-roteiro-site`) | ⏳ posso fazer (independente) |

_(M1 e M2 SAÍRAM — regra "resolvido SAI" do D191. Ficaram no git como commit da onda de 2026-08-22.)_

---

# 📌 LIMITES DECLARADOS — não são pendência, e não se apagam
- **NÃO mexo em produto sem sua ordem explícita** (trilho duro do CLAUDE.md desta sessão). V7 e T-002 são a via limpa para você despachar mais produto.
- **NÃO toco Supabase nem Vercel** por esta sessão. Se algo de SEO exigir mudança em Edge Function (`submit-lead`) ou na config da Vercel, abro pedido a você.
- **Perna (a) da D106 REVOGADA por D200:** se um dia eu achar credencial em git aqui, é ação sua (não minha) — deposito em `TAREFAS-DO-DONO.md` e sigo.
- **Perna (b) LGPD/PII segue amoral (MOU 2026-06-20):** não vira ação nem cobrança.
- **Anúncios pagos (Google/LinkedIn)** — mencionei na fila da próxima instância porque impacta a mesma agulha, mas é decisão sua de investimento.

---

> **Regras deste mapa (leis do dono):** D176 — tudo que você pede e tudo que eu descubro entra AQUI no instante · D181 — ação sua = LINK direto um a um · D182 — nada aqui cobra pendência morta.
> **Onde mora o detalhe:** SSOT do SEO = `src/lib/seo-routes.json`; injeção de structured data por rota = `src/lib/seo.ts` (`applyPageSchema`); Organization schema constante = `index.html`; rotas = `src/App.tsx`; conteúdo produto = `src/pages/Residuos.tsx`; stack e regras de conteúdo = `README.md`; governança = `CLAUDE.md`. Esta é a sua vista; eu a atualizo a cada mudança.
