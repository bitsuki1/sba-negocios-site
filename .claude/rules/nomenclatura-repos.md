# Regra — NOMENCLATURA DE REPOSITÓRIO (D186, revisada 2026-08-21)
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`). Vigência: ATIVO desde 2026-08-21.
> **Por que é regra de boot e não só decisão:** o dono pediu ("tenho medo de vc se perder na compactação"). Regra de boot é lida a cada abertura — sobrevive à compactação. SSOT do padrão = `processos/PADRAO-DE-REPO.md §Nomenclatura`; esta regra é o espelho de boot.

## O padrão: `<unidade-raiz>-<projeto/nome>-<tipo>`  (a RAIZ vem PRIMEIRO)
Decisão do dono (21/08, com a AVC): **o nome do repo começa pela unidade-raiz dona.** Exemplo dele: **`avc-sampa-valley-site`** (unidade AVC → projeto Sampa Valley → tipo site). Assim todos os repos de uma unidade agrupam juntos (avc-*, rotary-*, keepee-*) e o dono bate o olho e sabe de quem é.

| parte | o que é | exemplos |
|---|---|---|
| **`<unidade-raiz>`** | a unidade de negócio dona (prefixo, SEMPRE 1º) | `avc` · `rotary` · `keepee` · `pu` |
| **`<projeto/nome>`** | o projeto/produto dentro da unidade | `sampa-valley` · `clube` · `roteiro` · `alianca` |
| **`<tipo>`** (sufixo) | o que é (SEMPRE por último) | `-site` · `-app` · `-deck` · `-plataforma` |

**Exemplos vivos:** `avc-sampa-valley-site` · `avc-clube-site` · `avc-alianca-app` · `rotary-roteiro-site` · `rotary-clube-site`.
**Casos que já casam:** unidade = `<unidade>-unidade-de-negocios` (raiz 1ª ✅). **Auxiliar de portfólio** (sem unidade dona única, ex.: o hub) NÃO leva prefixo de unidade.

## Aplicação: GRADUAL + rename seguro (E-055 — renomear é ato de 3 tempos)
O dono renomeia aos poucos, unidade a unidade, **e aceita a quebra** ("renomeio mesmo que quebre e arrumo depois"). Toda onda que renomeia: (1) se o repo é espelho Lovable/Base44: **renomear NÃO quebra a sync** (provado no `rotary-roteiro-site`, V-LOVABLE-RENAME) — pode renomear à vontade; o perigo é **DESCONECTAR/RECONECTAR** (cria repo novo), então NUNCA faça isso para "sincronizar"; (2) **varre e corrige TODOS os ponteiros do nome antigo** no mesmo commit (CLAUDE.md das unidades, USO.md, `portfolio/MAPA-DO-PORTFOLIO.md`, cofre, mapas); (3) sessão nova monta o nome novo. Ponteiro não-corrigido = 404 (vacina A-AVC-AUD-2).
