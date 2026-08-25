# USO — repo de USO da SBA Negócios (D128)
> **Trazido pelo Escritório do MOU (PMO) — 2026-07-03 (auditoria do escritório; checklist D130 §3).**
> **Atualizado 2026-07-05 (Escritório do MOU):** estado de deploy corrigido para **PRODUÇÃO no ar** — estava stale como "preview / DNS pendente", mas o `docs/HANDOFF-2026-06-28.md` já registrava a virada preview→produção.
> Este repo já tem `README.md` técnico (build/stack) — este `USO.md` é só o cartão de USO, não um 2º cérebro (FUN-001).

## (a) O que é
**Site institucional da SBA Negócios** — a frente de MKT da unidade SBA. Vite + React + TS + Tailwind + shadcn/ui;
React Router; captação de leads no Supabase com fallback por e-mail. Conteúdo: 10 produtos com landing própria
(incl. Tema 1130 — recuperação de IRRF municipal — e Resíduos/WtE). **Em PRODUÇÃO no ar em `https://sbanegocios.com.br`, hospedado na VERCEL** (projeto `site-sba-negocios`, time `bitsuki`),
com **deploy automático a cada push na `main`** — não há passo manual para publicar.
> **⚠️ Corrigido em 2026-08-25.** Este cartão dizia "GitHub Pages via `gh-pages` … deploy manual" — estado de ANTES do cutover de 2026-07-03.
> **Prova:** o apex resolve para **`216.198.79.1`** (IP da Vercel documentado em `scripts/deploy-producao.sh`); o laudo `docs/INCIDENTE-2026-08-17-loop-redirect-apex.md` fechou com "apex → 200, `server: Vercel`".
> `gh-pages` + `scripts/deploy-producao.sh` = **legado/fallback**, não a via de publicação.

## (b) Quem usa / quem mexe
- **Unidade dona:** **SBA Negócios** (`bitsuki1/sba-unidades-de-negocios`) — o site é entrega da frente MKT dela.
- **Quem mexe:** o orquestrador da SBA (sessões do projeto), em branch e sob o gate da unidade (D21).
  O escritório só registra/audita (D128 §3); mudança de produto é da esteira da SBA.
- **Registro no PMO:** linha no `escritorio-do-mou/portfolio/MAPA-DO-PORTFOLIO.md` (TAG=USO, dona=SBA).

## (c) git = SSOT — NÃO reescrever história publicada (anti-rebase/force-push)
> Regra padrão de repo de USO (trazida pela auditoria tripla do Escritório, 2026-07-13 — era a única USO sem esta cláusula).
- **git é a fonte da verdade.** A produção (`https://sbanegocios.com.br`, servida pela **Vercel**) reflete a `main`: **todo push na `main` republica o site**. Mudança de produto entra por commit em branch, sob o gate da SBA (D21).
- **NUNCA `git push --force` / `rebase` / `reset --hard` em branch publicada** (`main`/`gh-pages`): reescrever história publicada quebra o histórico — e a `main` é o **gatilho de deploy da Vercel**, então republica o site a partir de uma história falsificada. Em conflito, reconcilie por UNIÃO (merge), nunca sobrescrevendo.
- **Publicar = dar merge na `main`.** A Vercel republica sozinha. O `scripts/deploy-producao.sh` é **legado** (publica no GitHub Pages, que não recebe mais tráfego) — não é a via de deploy e não deve ser rodado sem ordem explícita.
