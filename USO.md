# USO — repo de USO da SBA Negócios (D128)
> **Trazido pelo Escritório do MOU (PMO) — 2026-07-03 (auditoria do escritório; checklist D130 §3).**
> Este repo já tem `README.md` técnico (build/stack) — este `USO.md` é só o cartão de USO, não um 2º cérebro (FUN-001).

## (a) O que é
**Site institucional da SBA Negócios** — a frente de MKT da unidade SBA. Vite + React + TS + Tailwind + shadcn/ui;
React Router; captação de leads no Supabase com fallback por e-mail. Conteúdo: 10 produtos com landing própria
(incl. Tema 1130 — recuperação de IRRF municipal — e Resíduos/WtE). Preview no ar via GitHub Pages
(`bitsuki1.github.io/site-sba-negocios/`, publicado da branch `gh-pages`); domínio `sbanegocios.com.br`
comprado (GoDaddy), **DNS pendente (ato do MOU)**.

## (b) Quem usa / quem mexe
- **Unidade dona:** **SBA Negócios** (`bitsuki1/sba-unidades-de-negocios`) — o site é entrega da frente MKT dela.
- **Quem mexe:** o orquestrador da SBA (sessões do projeto), em branch e sob o gate da unidade (D21).
  O escritório só registra/audita (D128 §3); mudança de produto é da esteira da SBA.
- **Registro no PMO:** linha no `escritorio-do-mou/portfolio/MAPA-DO-PORTFOLIO.md` (TAG=USO, dona=SBA).
