# HANDOFF-ÚLTIMO — delta da sessão de 2026-08-22 (padrão D139 do escritório)
> **Este é o PRIMEIRO documento operacional que uma sessão nova neste repo deve ler**, DEPOIS do `CLAUDE.md`. Antes do `ESTADO`/`REGISTRO` extensos. Delta puro: FEITO · PENDENTE · INCERTO. Nada aqui repete o `CLAUDE.md` — só o que mudou.
> **Sessão:** `claude/governanca-sba-negocios-d4ec7i` (branch única, 3 ondas encadeadas em 2026-08-22). **Estado ao encerrar:** `main` == branch (FF limpo), gate 🟩 verde, tudo empurrado. Modo autônomo (D191), método de mapa por caixas (D191/E-064).

---

## ✅ FEITO — provado no git (tudo na `main`)

### Onda 1 · Governança kit-repo-app (D196)
- Aplicado o **kit-repo-app** (`escritorio-do-mou/processos/kit-repo-app/`) ao `sba-site`: `CLAUDE.md`, `SELO.md` (**TAG do kit D196**, não selo de fecho de onda D194 — a unidade SBA ainda está em fila em `SELOS-DE-FECHO.md`), `TAREFAS-DO-DONO.md` (T-001 rename D186), `REGISTRO-DE-INSTANCIAS.md`, `.claude/settings.json` (deny anti-escrita fora do escopo).
- **Gate universal ᵁ** (já herdado do kit-clone A-206) mantido — variância aceita pelo `GOVERNANCA-REPOS-APP.md` (é governança a MAIS, não a menos).
- Linha `sba-site` adicionada em `escritorio-do-mou/portfolio/GOVERNANCA-REPOS-APP.md` com variâncias ᵁ + ᴷ (ᴷ = SELO=TAG do kit, não de onda).
- ACK depositado em `escritorio-do-mou/caixa-de-entrada/sba/2026-08-22_sba-site_kit-d196-provisionado.md`.

### Onda 2 · SEO + eixo Usina de Resíduos (V6 aprovado pelo dono nas caixas · a-e todos)
- **`src/lib/seo-routes.json` `/residuos`:** title e description reescritos com 6 palavras-chave-alvo (usina, RSU, prefeituras, consórcios, biometano, Novo Marco/PNRS). Novo title: _"Usina de Resíduos Sólidos Urbanos (RSU) para prefeituras e consórcios | SBA Negócios"_.
- **`src/pages/Residuos.tsx`:**
  - Bloco **projeto-farol Congonhas do Campo — MG** ampliado (correção honesta ao mapa v1: "Volta Redonda" era invenção minha — puxar sempre do `PARCEIRO_CSTR.projeto`, nunca da memória). Destaque para a tecnologia de explosão a vapor + prêmio Startup do Ano 2025 + link ao parceiro.
  - **Seção FAQ** com 6 perguntas do setor (aterro × usina · biometano municipal · consórcio intermunicipal · quem paga · escala município pequeno · Novo Marco), respostas curtas, factuais, com fonte pública (SNIS/MDR).
  - **JSON-LD Service + FAQPage** injetados via novo helper `applyPageSchema()` em `src/lib/seo.ts` (usa `data-page-schema`, limpa ao trocar de rota).
- **`index.html`:** JSON-LD **Organization** com `data-site-schema` (constante do site — nome, logo, endereço, telefone, email da SBA).
- **Build `npm run build` 🟩 verde** — 18 rotas prerender-og geradas; `dist/residuos/index.html` estático já traz o title novo (WhatsApp/LinkedIn preview corretos para robôs sem JS).
- **Vercel auto-deploy:** o push na `main` dispara publicação (o `scripts/deploy-producao.sh` é LEGADO desde 2026-07-03; host oficial é Vercel).

### Onda 3 · Corpo de processos do escritório incorporado (ordem viva MOU 2026-08-22)
- Estratégia **HÍBRIDO/PUXAR** (MOU 2026-06-28) — não esperei o maestro empurrar; puxei o kit curado direto.
- **10 processos** em `processos/`: HANDOFF-SEM-PERDAS (D66), IGNICAO-PADRAO (D109), CASACO-POR-TEMA (D137), PADRAO-DE-REPO, PADRAO-OURO-MAPA-DE-PENDENCIAS, PLAYBOOK-ARRUMACAO-PROJETO, POLITICA-VIGENCIA, PREVENCAO-DE-PERDAS, MATRIZ-ADMISSAO-LICOES (A-209), TEMPLATE-MAPA-DE-PENDENCIAS.
- **3 subagentes** em `.claude/agents/`: `documentador`, `escrutinador` (D108), `curador`.
- **4 regras modulares** em `.claude/rules/`: README + linguagem-e-ferramentas (D159/D160) + ordem-normativa (C36/C120) + nomenclatura-repos (D186).
- **Canais D144 nos dois sentidos:** `caixa-de-saida/para-escritorio/` + `caixa-de-entrada/do-escritorio/processados/` com READMEs.
- **Índice + regra de manutenção:** `processos/HERDADO-DO-ESCRITORIO.md`.
- **`CLAUDE.md` §8 (corpo herdado) + §9 (canais D144).**
- **CARTA formal ao maestro** em `caixa-de-saida/para-escritorio/2026-08-22_sba-site_pedido-corpo-processos.md` — pede homologação da curadoria + virar padrão do kit-repo-app D196.
- **ACK depositado** em `escritorio-do-mou/caixa-de-entrada/sba/2026-08-22_sba-site_corpo-processos-puxado.md`.

### Mapa D172 + Artifact
- `MAPA-DE-PENDENCIAS.md` **v1→v2→v3→v4** (esta edição inclui achados da varredura de handoff).
- Artifact D172 publicado e republicado no **MESMO endereço** (regra do padrão): https://claude.ai/code/artifact/a2d0ecf3-8181-445f-ac6c-9418db470fde — design honra a marca SBA (Poppins + Inter · azul institucional `#2E5AAC` · traços dourados · light + dark).

---

## 🔒 PENDENTE — o que a próxima instância vai encontrar aberto

**Do dono** (mapa v4 · caixas de decisão já feitas na sessão · sem cobrança):
1. **V1** · Renomear repo `sba-site` → `sba-negocios-site` no GitHub Settings (você já disse "sim, renomear agora"). Assim que fizer, a próxima instância abre a onda de varredura de ~7 ponteiros — **inclui agora o ponteiro fantasma A-1 no escritório** (`portfolio/MAPA-DO-PORTFOLIO.md` chama de `site-sba-negocios`, invertido do D186; nem casa com o nome atual nem com o proposto).
2. **V2** · Google Search Console (verificar domínio + submeter sitemap).
3. **V3** · Google Analytics 4 (criar propriedade e colar `G-XXXXXXX` na conversa). Assim que colar, próxima instância cabla (M8).
4. **V4** · Perfil de Empresa no Google (baixo esforço, uma-vez-só).
5. **V5** · Pedir ao parceiro CSTR (`cstr.eco.br`) o link de volta para o site.
6. **V7** · Aprovar as 3 sub-páginas long-tail (`/residuos/usina-biometano-municipal` · `/residuos/rsu-prefeitura` · `/residuos/consorcio-intermunicipal-residuos`).
7. **T-002 (opcional, em `TAREFAS-DO-DONO.md`):** foto do canteiro Congonhas + link para notícia externa. Não bloqueia.

**Do maestro do escritório** (na caixa `escritorio-do-mou/caixa-de-entrada/sba/`, aguarda o próximo co-monte dele):
- Homologar a curadoria do corpo puxado (Onda 3) — ou pedir ajuste via `sba-site/caixa-de-entrada/do-escritorio/`.
- Considerar virar padrão do kit-repo-app D196 (seção "Corpo estendido opcional") para outros repos AUXILIARES USO/APP que o dono pedir governança extendida.
- Corrigir o ponteiro fantasma A-1 (`portfolio/MAPA-DO-PORTFOLIO.md` — trocar `site-sba-negocios` pelo nome real).

**Da máquina (⚙️ Minhas, todas destravadas):**
- M3/M4/M5 aguardam V7 · M8 aguarda V3 · M6/M7/M9/M10 independentes (posso disparar quando você quiser).

---

## ⚠️ INCERTO / PONTOS CEGOS DECLARADOS (regra D24 — melhor declarado que oculto)

1. **`sba-unidades-de-negocios` NÃO está co-montado nesta sessão.** É o repo canônico da unidade SBA (SSOT do dossiê da unidade). O que existe lá relevante para meu trabalho: `START-HERE-ORQUESTRADOR-TEMA-1130.md` (régua v5.12), `MESTRE-TEMA-1130.md`, `MESTRE-RESIDUOS.md`, `CODEX-TEMA-1130.md`, `DO_ESCRITORIO.md`, `HANDOFF-SURFACES.txt`. **Não perdi nada nesta onda** porque o produto que toquei (site) tem SSOT AQUI e não lá — mas a próxima sessão que trabalhar CONTEÚDO do site (números, textos jurídicos, cases) deve co-montar `sba-unidades-de-negocios` para não inventar.
2. **Onda de SEO tocou SÓ o eixo Resíduos.** O outro projeto da SBA — **Tema 1130 (rota `/recuperacao-tributaria`)** — não foi trabalhado nesta sessão. Se o dono pedir uma onda análoga para Tema 1130, seguir o mesmo padrão (V6-like: aprovar em bloco a-e; M1-like: executar meta + FAQ + JSON-LD + case).
3. **`sba-unidades-de-negocios` tem `HANDOFF-SURFACES.txt` mas eu criei o meu só nesta sessão** — se o formato do meu divergir do canônico da unidade, o certo é o da unidade (leio quando co-montar).
4. **`scripts/deploy-producao.sh` é LEGADO** (Vercel auto-deploy oficial desde 2026-07-03). O `USO.md` deste repo ainda diz "PRODUÇÃO no GitHub Pages" — desalinhamento pequeno, não urgente. Fica para próxima onda de arrumação.
5. **Bloqueio B5 da SBA** (solver de captcha SICOM, mencionado no dossiê PMO) — **fora do escopo deste repo**. O escritório já arbitrou. Só cito para a próxima instância não achar que é dela.

---

## 🎯 REGISTRO DA ONDA (sessão FECHADA em 2026-08-22)
Onda de 3 ciclos encadeados na mesma branch: **governança kit D196** → **SEO+Resíduos (V6 aprovado)** → **corpo herdado do escritório (ordem viva)**. Gate 🟩 verde em cada ciclo antes do merge. Nenhuma pendência silenciosa. Nenhum "achado órfão" — todos os achados desta sessão fizeram fan-out para as superfícies obrigatórias (mapa D172, TAREFAS-DO-DONO, REGISTRO, ACK ao PMO, HANDOFF).
