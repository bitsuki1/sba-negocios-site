# HANDOFF ÚLTIMO — `sba-negocios-site` · delta puro da última sessão (padrão D139/D66)
> **Para quem abrir este repo depois de mim.** Isto é **delta**, não resumo do repo: só o que **mudou** e o que **você precisa saber para não repetir trabalho nem acreditar em dado velho**.
> **Sessão:** 2026-08-25 · branch `claude/sba-site-fecho-selo-2026-08-25` · chapéu: orquestrador do `sba-negocios-site` (D104).
> **Ordem que me abriu:** o Escritório do MOU mandou **regularizar e fechar para o selo** — "o site vamos selar apenas". Passada de **arrumação**, **não** de produto.

---

## 1. A coisa mais importante que você precisa saber

**O repo estava mentindo sobre onde o site mora.** `CLAUDE.md` e `USO.md` diziam *"PRODUÇÃO no GitHub Pages via `gh-pages`, deploy manual por `scripts/deploy-producao.sh`"*. **Errado desde 2026-07-03.**

**A verdade, medida em 25/08:** o site roda na **Vercel** (projeto `site-sba-negocios`, time `bitsuki`) e **republica sozinho a cada push na `main`**.

- **Prova:** `sbanegocios.com.br` resolve para **`216.198.79.1`** — o IP da Vercel escrito dentro do próprio `scripts/deploy-producao.sh`.
- **Convergem:** `deploy-pages.yml` ("produção real = Vercel", gatilho de push removido em 13/08) · `vercel.json` vivo · o laudo de 17/08 ("apex → 200, `server: Vercel`").
- **Já corrigido** em `CLAUDE.md` §2/§3 e `USO.md` (a)/(c).

**Consequência prática para você:** **publicar = dar merge na `main`.** Não rode `scripts/deploy-producao.sh` — é legado, publica no Pages, que não recebe mais tráfego.

> **Como isso durou 7 semanas:** o laudo do incidente de 17/08 **já trazia** a nota *"`USO.md` está desatualizado; o hosting real é Vercel"* — mas o laudo vivia num **galho que nunca aterrissou** (`claude/sba-instancia-pagina-sistema-sxb9wu`). Achado morto em galho morto. Aterrissei o laudo em `docs/INCIDENTE-2026-08-17-loop-redirect-apex.md`.

---

## 2. O que mudou nesta sessão (delta)

### Corpo de processos — reconciliado com o escritório
- **Regras: 3 → 6.** Puxadas `instanciacao-por-repo.md` (D201) e `decisao-e-alcada.md` (D203/D202).
- ⚠️ **`regua-de-admissao.md` não existe no escritório.** A ordem afirmava 6 regras lá; a medição achou **5 + README**, e o README de lá lista as 5. Lavrei como **regra local de espelho** (a substância veio verbatim na ordem viva, que é C36 nível 1). **Achado A-453** devolvido ao escritório.
- **Toda cópia herdada agora carrega cabeçalho ⧉** "CÓPIA DE LEITURA — SSOT no escritório" (10 processos + 4 regras + 3 agentes). **Nos agentes o cabeçalho vai DEPOIS do frontmatter YAML** — pôr antes quebra a definição do subagente (errei e consertei; não repita).

### Superfícies do dono
- **`MAPA-DE-PENDENCIAS.md` v4 → v5** com a **régua de admissão de 25/08** aplicada (só sobe ao mapa do dono o que trava 2+ casas ou é regra para todas).
- **V3 foi reescrita, não só reordenada.** A premissa velha era *"`@vercel/analytics` não roda em GitHub Pages → vácuo de medição"*. Caiu junto com a correção de deploy: o site **está** na Vercel e o medidor **já está montado** em `src/App.tsx:69`. A V3 virou *"olhe o painel da Vercel por 2 minutos"* — pode apagar a pendência do GA4 inteira. **M8 ficou em espera, não em execução.**
- **T-001 saiu do `TAREFAS-DO-DONO.md`** por reclassificação (estava duplicada com a V1 do mapa) e, **no fim do mesmo dia, foi CUMPRIDA**: o dono renomeou o repositório.

### 🔁 O RENAME ACONTECEU — `sba-site` → `sba-negocios-site` (2026-08-25, fim do dia)
- **Nome atual:** `bitsuki1/sba-negocios-site`. Confirmado pela API (`id 1282269823`, criado em 2026-06-27) — **renomeado, não recriado**: histórico, issues e espelho do Lovable preservados (V-LOVABLE-RENAME confirmada na prática).
- **Varredura E-055 (3º tempo) feita no mesmo turno:** 39 ponteiros de identidade em 13 arquivos + `git remote` local + `package.json` (`name`) + comentário do `vite.config.ts`.
- **O que NÃO foi renomeado, de propósito:** nomes **reais** de branch (`claude/sba-site-fecho-selo-2026-08-25`) e nomes **reais** de cartas já existentes (`2026-08-22_sba-site_…`, `2026-08-25_sba-site_…`). Esses objetos existem com aquele nome — trocá-los no texto criaria ponteiro quebrado, que é justamente o que a varredura serve para evitar. Cartas **novas** usam `_sba-negocios-site_`.
- **A URL antiga ainda redireciona** (o GitHub segura por um tempo, não para sempre). Se algo apontar para `bitsuki1/sba-site` e funcionar, é o redirect — corrija mesmo assim.

### Higiene
- `REGISTRO-DE-INSTANCIAS.md`: consertada **linha corrompida** (10 colunas — dois registros colados numa linha só).
- `gate-fechamento.sh` [2/4]: parou de contar `README.md` como "carta staged" (contador inflado = aviso que ninguém confia).
- `.claude/settings.json`: somados denies de `sba-unidades-de-negocios` (D201) e `portfolio-automacoes`; cobre `NotebookEdit`.
- Carta de 22/08 ao escritório → `caixa-de-saida/processados/` com o carimbo da resposta.

---

## 3. O que eu NÃO fiz (e por quê) — leia antes de "terminar" por mim

| não fiz | por quê |
|---|---|
| **Não apaguei nenhum galho** | Medi os 10: **8 estão 100% na `main`** (seguros para apagar), **2 carregam commit fora dela**. Apagar é ato do escritório/dono — eu meço e declaro, não apago. |
| **Não apliquei a economia de CI** do galho `claude/instance-concurrency-94pbeg` | 1 commit que tira o gatilho de `pull_request` do linter (−50% de Actions). **Reduz checagem nos PRs** = decisão de esteira, e esteira é do escritório. Virou **M11** no mapa. **Não apague esse galho** antes da decisão. |
| **Não instalei o robô `consolidar` (D170)** | Precisa de segredo de Actions neste repo = clique do dono. Pela régua de 25/08, clique de uma casa só **não vira pendência do dono**. Fica como **limite declarado**. |
| **Não renomeei `SELO.md`** | Colisão viva `SELO.md` × `SELO-DE-FECHO.md`; o escritório arbitra na onda NORMAS. Dúvida registrada dentro do próprio `SELO.md`. |
| **Não toquei em produto** | `src/`, `index.html`, `package.json`, configs — intocados. Trilho duro do `CLAUDE.md` §5 e escopo da ordem ("selar apenas"). |
| **Não me auto-selei** | **E-071: quem produz não certifica.** O selo é da torre, depois de verificar na `main`. |
| **Não co-montei `sba-unidades-de-negocios`** | D201. Se precisar de conteúdo da unidade (números, textos jurídicos), peça pela caixa. |

---

## 4. Estado ao sair

- **Segredos:** varri o HEAD inteiro **e** as 85 revisões do histórico. **Nada.** A única chave no código é `sb_publishable_…` do Supabase — **pública por desenho (D206)**, protegida por RLS. **Não é vazamento e não deve ser "consertada"**: mexer nela quebra o formulário sem ganho de segurança.
- **CI hoje:** verde. `linter-estado` (única esteira ativa) passou nas últimas 11 execuções, inclusive nos 2 merges desta passada. **Não há CI vermelho pendente.**
- **CI histórico — anote isto:** o workflow `deploy-pages.yml` rodou **29 vezes e falhou 29 vezes. Zero sucessos, desde a estreia em 27/06.** Nunca publicou nada; o Pages era publicado à mão. Em 13/08 o gatilho de push foi **removido** — ou seja, o desfecho foi **silenciar, não consertar**, e isso não estava escrito em lugar nenhum. Não afeta a produção (que é Vercel), mas **recomendei ao escritório remover o workflow do repo**, não só silenciá-lo: enquanto existir, um `workflow_dispatch` distraído republica o site num host sem tráfego.
- **Gate:** 🟩 nos 4 checks · **linter:** 🟩.
- **Relatório ao escritório:** `caixa-de-saida/para-escritorio/2026-08-25_sba-site_fecho-para-selo.md`.

## 5. Por onde começar (boot)
1. Este arquivo. 2. `CLAUDE.md`. 3. `MAPA-DE-PENDENCIAS.md` (v5). 4. `TAREFAS-DO-DONO.md`. 5. `caixa-de-entrada/do-escritorio/` — **vazia** ao meu fechamento.
