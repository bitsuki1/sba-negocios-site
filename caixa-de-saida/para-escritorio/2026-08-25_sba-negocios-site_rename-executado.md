# RENAME EXECUTADO — `sba-site` → `sba-negocios-site` (2026-08-25)
> **De:** orquestrador do `sba-negocios-site` (chapéu D104) · branch `claude/sba-negocios-site-varredura-rename-2026-08-25`
> **Para:** maestro do Escritório do MOU
> **Assunto:** o dono executou a V1/T-001. Varredura E-055 feita do meu lado; **o lado do escritório é seu**.
> **Urgência:** média — mas **leia antes de corrigir o `MAPA-DO-PORTFOLIO.md`**, senão o A-452 é corrigido para o nome errado.

## 1. O fato
O dono renomeou o repositório em 2026-08-25, fim do dia, cumprindo a **T-001 / V1** (padrão **D186**, raiz primeiro).

| | |
|---|---|
| nome antigo | `bitsuki1/sba-site` |
| **nome atual** | **`bitsuki1/sba-negocios-site`** |
| id do repo | `1282269823` — **inalterado** |
| criado em | `2026-06-27` — **inalterado** |

O `id` e a data de criação idênticos provam que foi **rename**, não recriação. **Histórico, issues e o espelho do Lovable seguem intactos** — a regra **V-LOVABLE-RENAME** ("renomear é seguro; desconectar/reconectar é que cria repo novo") está confirmada na prática mais uma vez. Ninguém desconectou nada.

## 2. ⚠️ ATENÇÃO — o A-452 tem que ser corrigido para o nome CERTO
No `portfolio/MAPA-DO-PORTFOLIO.md` do escritório este repo aparece como **`site-sba-negocios`** — nome que **nunca existiu**.

**Não corrija para `sba-site`.** Esse nome também já morreu, hoje. Este repo teve **dois nomes no mesmo dia**, e uma correção apressada acerta o ponteiro errado.

> ### O alvo correto e final é **`sba-negocios-site`**.

**Nota útil sobre a origem da confusão:** `site-sba-negocios` **é o nome do projeto na Vercel** (time `bitsuki`). Alguém provavelmente copiou o nome do painel de deploy achando que era o nome do repo. Vale registrar essa glosa junto da correção, senão o mesmo erro volta.

## 3. O que eu já fiz (lado do repo — não precisa refazer)
Varredura **E-055, 3º tempo**, no mesmo turno do rename:

- **39 ponteiros de identidade** corrigidos em **13 arquivos** (`CLAUDE.md`, `USO.md`, `SELO.md`, `MAPA-DE-PENDENCIAS.md`, `TAREFAS-DO-DONO.md`, `HANDOFF-ULTIMO.md`, `HANDOFF-SURFACES.txt`, `REGISTRO-DE-INSTANCIAS.md`, `README.md`, `processos/HERDADO-DO-ESCRITORIO.md`, `caixa-de-saida/README.md`, `.claude/settings.json`, as regras `.claude/rules/`).
- **`git remote`** local apontado para o nome novo e **testado** (13 refs respondem).
- **2 arquivos de produto**, ambos **não-funcionais**: campo `name` do `package.json` e um **comentário** do `vite.config.ts` (a linha `base:` **não** foi tocada). O comentário era duplamente obsoleto — citava `BASE_PATH="/sba-site/"`, e o `deploy-pages.yml` nem define `BASE_PATH`.
- **V1 saiu do mapa** (regra "resolvido SAI"), itens renumerados, mapa v5 → **v6**.
- **T-001 fechada** no rastro do `TAREFAS-DO-DONO.md` como **cumprida** — e com o registro honesto de que, de manhã, a ordem de abertura tinha suposto que já estava feita quando ainda não estava.

### O que deliberadamente NÃO renomeei
Nomes que **existem de verdade** com o nome antigo — trocá-los no texto criaria o ponteiro quebrado que a varredura serve para evitar:
- **branches reais:** `claude/sba-site-fecho-selo-2026-08-25` e as demais `claude/sba-site*`.
- **cartas já existentes:** `2026-08-22_sba-site_pedido-corpo-processos.md` e `2026-08-25_sba-site_fecho-para-selo.md` — já referenciadas por esse nome em várias superfícies. Ambas ganharam nota de leitura no topo.
- **Convenção nova:** cartas a partir de agora usam `AAAA-MM-DD_sba-negocios-site_<slug>.md` (esta aqui é a primeira).

## 4. O que peço ao escritório (checklist)
1. **Corrigir para `sba-negocios-site`** — não para `sba-site` — em: `portfolio/MAPA-DO-PORTFOLIO.md` (**A-452**), `portfolio/GOVERNANCA-REPOS-APP.md`, o cofre `ACESSOS-FERRAMENTAS.md`, e o `CLAUDE.md`/`USO.md` da unidade **SBA** se citarem o site.
2. **Corrigir a regra `instanciacao-por-repo.md`** do próprio escritório: a tabela "Exemplos vivos" diz **SBA ↔ `site-sba-negocios`**. Como é regra de **boot lida por toda sessão**, o nome errado ali se propaga sozinho. Alvo: `sba-negocios-site`.
3. **Avisar a instância da unidade SBA** (aberta em paralelo hoje) — se ela gravou o nome antigo em algum ponteiro, precisa do mesmo conserto.
4. **O redirect do GitHub não é eterno.** Enquanto ele durar, um ponteiro errado **funciona** e passa despercebido. Quem for auditar isso não deve confiar em "abriu, então está certo" — tem que bater o nome literal.

## 5. Rastro
- **Branch:** `claude/sba-negocios-site-varredura-rename-2026-08-25` → mesclada em `main` por união.
- **Relatório de fecho** (`2026-08-25_sba-site_fecho-para-selo.md`): ganhou **adendo** no fim registrando o rename e corrigindo o alvo do pedido nº 2.
- **A recomendação de selar não muda: ✅ PODE SELAR.** O rename fecha a maior pendência aberta do dono; nenhuma das 7 portas foi afetada — só passaram a carregar o nome novo.
