# HANDOFF DE ENCERRAMENTO — Site SBA Negócios (2026-07-03)

> Handoff **honestíssimo** de fim de sessão. É o documento **definitivo** do estado real ao encerrar.
> Supera `HANDOFF-2026-07-03.md` (que ficou como registro incremental da sessão) e os de 06-27/06-28 (históricos).
> Repo: `bitsuki1/site-sba-negocios` · **Produção: https://sbanegocios.com.br** (host: **Vercel**).

---

## 0. TL;DR (a verdade em 6 linhas)
O site está **no ar em `sbanegocios.com.br`, servido pela Vercel**, com deploy automático a cada `git push` na `main`.
Nesta sessão: comunicação reescrita **sem jargão** (linguagem para prefeito/gestor, honestidade preservada), **preview
social por rota**, **fotos de hero próprias**, **Edge Function versionada**, e a **migração completa do GitHub Pages para
a Vercel** (DNS já virado, apex canônico, www→apex, analytics ligado). **Não há pendência técnica minha nem sua.** O que
resta é **limpeza opcional** (aposentar o GitHub Pages) e **decisões que já são fechadas** (não reabrir). Detalhes abaixo,
sem esconder nada.

---

## 1. Onde o site vive agora (infra/host)
- **Host oficial: Vercel.** Projeto `site-sba-negocios`, time **bitsuki** (`team_JjMeEdZ5zxp5jeqkt8lrapvr`).
  Branch **`main` = Production**. **Todo push na `main` publica sozinho** (git nativo). URL técnica: `site-sba-negocios.vercel.app`.
- **Domínios (Vercel):** `sbanegocios.com.br` (**apex = principal, serve direto**) e `www.sbanegocios.com.br`
  (**308 → apex**). Os dois "Valid Configuration". **SSL emitido pela Vercel** automaticamente.
- **DNS final na GoDaddy** (cutover feito nesta sessão, em 2 etapas, sem downtime):
  - `A` `@` → **`216.198.79.1`**
  - `CNAME` `www` → **`a6cc1438ad279349.vercel-dns-017.com`**
  - **Removidos:** os 4 `A` do GitHub Pages (`185.199.108/109/110/111.153`) e os 4 `AAAA` (IPv6).
  - **Intactos** (não fazem parte do cutover): `NS`, `_domainconnect`, `SOA`, `TXT _dmarc`.
- **Conta GitHub `bitsuki1`** foi vinculada à Vercel para importar o repo (o time só tinha `keepee-facilities`).
  O app Vercel já tinha acesso a "All repositories" — sem mudança de permissão.
- **Analytics:** **Vercel Web Analytics ligado** (plano incluso, sem custo). `@vercel/analytics` (`<Analytics/>`) já no
  `App.tsx` — sem cookies/PII, desligado em dev.

## 2. Como publicar e mexer no site
- **Publicar = `git push` na `main`.** A Vercel faz o deploy de produção. Nada manual.
- **Rodar local:** `npm install && npm run dev` (porta 8080).
- **Onde está o conteúdo:** textos centrais em `src/data/site.ts` e `src/data/landings.ts`; páginas em `src/pages/`;
  textos de SEO/preview por rota em **`src/lib/seo-routes.json`** (fonte única — ver §7).
- **Build:** `npm run build` = `vite build && node scripts/prerender-og.mjs` (o pré-render de OG roda no fim). Saída em `dist`.
- ⚠️ **Armadilha do `package.json`:** rodar `npm install` às vezes injeta/remexe `sharp`/`playwright` no `package.json`.
  **Sempre `git checkout -- package.json` antes de commitar** (a menos que a mudança de dependência seja intencional).
  `package-lock.json` **não é versionado**. A única dependência adicionada nesta sessão foi `@vercel/analytics`.

## 3. Backend de leads (formulário)
- **Supabase**, projeto `gestao-integrada-dados` (ref **`lbjudeifksyeqminwlto`**), tabela **`sba_leads`**.
- O site **não escreve direto na tabela** (o papel `anon` é proibido por RLS). Os leads vão pela **Edge Function
  `submit-lead`**, que grava com a *service role* e dispara e-mail (Resend) para **`eduardo@saobentoservicos.com.br`**.
- **Fonte versionada:** `supabase/functions/submit-lead/index.ts` (deploy: `supabase functions deploy submit-lead`).
- Anti-spam no formulário: honeypot + tempo mínimo (validados na função). Fallback `mailto` se a função falhar (nenhum
  lead se perde). `role=status/alert` para acessibilidade.

## 4. Segredos e segurança — a verdade sem maquiagem
- **Repo é PÚBLICO.**
- `src/lib/supabase.ts` tem a **URL + a chave PÚBLICA (publishable/anon)** do Supabase em texto claro. **É seguro por
  design** (RLS bloqueia leitura/escrita anônima); é o padrão do Supabase para front-end.
- ⚠️ **Chave do Resend (a que importa lembrar):** a Edge Function **DEPLOYADA no Supabase** tem uma chave do Resend
  como **fallback embutido em runtime** (risco **conscientemente aceito pelo dono — D106**). **Essa chave NÃO está no
  repositório** (verificado). Consequência prática: **se um dia a função for redeployada a partir da fonte versionada,
  é preciso setar `RESEND_API_KEY` como *secret* no Supabase** — senão o e-mail de aviso para de sair **silenciosamente**
  (o lead continua sendo salvo na tabela; só o aviso por e-mail some).
- Nenhuma *service role key* nem *secret key* está no repositório (verificado).

## 5. Comunicação / conteúdo (a grande mudança desta sessão)
- **Varredura sem jargão** em todas as páginas + dados, pela lente de quem **não** conhece o negócio (prefeito, gestor
  público, gestor privado). ~130 trechos reescritos. Vocabulário padronizado:
  - originar/estruturar → **criar/montar/organizar** · "arranjo montado" → **parte técnica, jurídica e financiamento organizados**
  - orquestra / conecta as pontas → **coordena / reúne todos os envolvidos / interlocutor só** · frentes → **áreas**
  - valorização → **aproveitamento** · destinação → **descarte** · "sob consulta" → **o custo depende do caso e a SBA informa após avaliar**
  - "piso estimado" → **estimativa mínima (um piso)** · "no êxito" → **você só paga sobre o que for de fato recuperado**
  - **toda sigla/lei ganha glossa na 1ª aparição** (IRRF, e-CAC, TCE, PNRS, ANVISA, COSIP/CIP, ETA/ETE, APP, Novo Marco,
    ISC/CBR, INMETRO, BID; PD&I → P&D).
- **Tema renomeado:** "Resíduos & Valorização" → **"Resíduos & Aproveitamento"** (afeta `TEMAS`, `solucoesPorTema`,
  `SUBTITULO_TEMA` e o SEO — tudo já atualizado).
- **Doutrina de honestidade preservada** (regra dura, não afrouxar): tributário nunca "garantido"; é **estimativa mínima**
  e **só paga sobre o que recuperar**; Área B (ambiental/infra) = **"preço conforme o caso"**; **nenhum número inventado**.
- **Marca sempre "SBA Negócios" / "SBA"** (nunca "Ambiental"). **CSTR no feminino** ("a CSTR").

## 6. SEO / preview social
- **Preview por rota** resolvido: `scripts/prerender-og.mjs` roda no build e gera um `index.html` por rota (17 rotas) com
  `title`/`description`/OG/Twitter/`canonical`/`og:url` próprios. Robôs de preview (WhatsApp/LinkedIn/Facebook) não rodam
  JS — por isso o HTML pré-renderizado.
- **Fonte-da-verdade única:** `src/lib/seo-routes.json`, lida **tanto pelo cliente** (`src/lib/seo.ts`) **quanto pelo
  pré-render**. Editar SEO = editar esse JSON (não duplicar).
- **Canônico alinhado:** `canonical` e `og:url` apontam para o **apex** (`https://sbanegocios.com.br/...`), que é o domínio
  principal na Vercel. Sem split apex/www.

## 7. Decisões FECHADAS — não são pendência, não reabrir (D106)
Por decisão **definitiva** do dono:
- **CNPJ e razão social NÃO entram** no site. A Política de Privacidade identifica o controlador sem CNPJ — **estado final e aceito**.
- **Logos de parceiros (ConAid/Dynacal) NÃO entram** (ficam como texto/atribuição). Só a CSTR tem logo.
- **Material do time NÃO entra** (a seção "Quem conduz" é *gated* por `TIME=[]` e simplesmente não aparece — sem estado quebrado).

## 8. Riscos aceitos (não são bugs)
- **LGPD:** controlador identificado sem CNPJ/razão social — decisão fechada, risco assumido. Política de Privacidade **não
  revisada por advogado** (feita em melhor esforço).
- **Conteúdo de parceiros** (CSTR/ConAid) atribuído ao parceiro, **não auditado por 3º**; NEOMAG marcada P&D (em desenvolvimento).
- **Chave do Resend** como fallback em runtime no servidor (ver §4).

## 9. O que eu NÃO consegui verificar (honestidade sobre limites)
- **Certificado SSL real:** o proxy de saída deste ambiente intercepta o TLS (mostra um cert `*.com.br` da Anthropic), então
  **não dá para validar o cert real da Vercel daqui**. O painel da Vercel marcou "Valid Configuration" e o TLS termina na
  Vercel — mas **confirme o cadeado no seu navegador** em `https://sbanegocios.com.br` e `https://www.sbanegocios.com.br`.
- **Analytics coletando de fato:** o código está certo e o toggle ligado, mas só dá para confirmar dados reais com **tráfego
  real + o painel** da Vercel.
- **Revisão visual humana pixel a pixel:** a comunicação foi revisada no nível do código e testada por rota (HTTP/OG), mas
  **não houve conferência humana ao vivo, tela por tela**, de todo o texto renderizado.

## 10. Limpeza OPCIONAL (não é pendência, não bloqueia nada)
Sobrou do tempo de GitHub Pages, agora fora do DNS e sem tráfego:
- Branch **`gh-pages`** — pode ser apagada.
- **`scripts/deploy-producao.sh`** — já marcado como **legado** (avisa ao rodar; pule com `CONFIRMAR_PAGES=1`). Pode ser removido.
- **`.github/workflows/deploy-pages.yml`** — workflow do "Pages via Actions", **nunca ativado** e agora **obsoleto**. Pode ser removido.
Nada disso atrapalha o site na Vercel; é só arrumação futura.

## 11. Estado do git (ao encerrar)
- Branch de trabalho: **`claude/sba-instance-mkt-frontend-vphm5f`** = **`main`** (0/0), **árvore limpa**.
- Histórico de handoffs: `HANDOFF-2026-06-27.md` → `-06-28.md` → `-07-03.md` (incremental) → **`-07-03-ENCERRAMENTO.md` (este, definitivo)**.

---

### Resumo de uma linha
**Site no ar na Vercel (`sbanegocios.com.br`), comunicação clara, deploy automático por push na `main`. Sem pendência —
só limpeza opcional do GitHub Pages e decisões que já são fechadas. Confirme o cadeado SSL no seu navegador e está encerrado.**
