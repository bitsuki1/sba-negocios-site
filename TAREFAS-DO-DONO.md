# TAREFAS DO DONO — a "API/caixa" deste app (D195)
> **Como funciona (D195):** este repo-app `sba-site` DESENVOLVE; a unidade SBA e/ou o dono só PLANEJAM. Quando a unidade
> (ou o dono) tem uma **tarefa** ou uma **atualização de documentação** para este site, ela deposita AQUI —
> não escreve código na unidade nem empurra produto por fora. O app lê, executa e marca feito.
> É o canal ÚNICO entrada→app. Português sempre. Uma tarefa por bloco. O que está feito desce para o rastro no fim.

## ⏳ Abertas (o app trabalha)

### T-002 · Insumos opcionais para o bloco Congonhas do Campo (projeto-farol da CSTR)
- **Pedido por:** app (auto) · **Data:** 2026-08-22
- **O quê:** o pacote V6 do MAPA-DE-PENDENCIAS foi entregue e o bloco do projeto-farol Congonhas do Campo — MG ficou ampliado. Ele funciona sozinho, mas fica ainda mais forte com dois insumos que só o dono/parceiro consegue: **(i)** 1 foto ou render do canteiro (JPG/PNG, mín. 1200×800) — se você tiver do parceiro CSTR; **(ii)** 1 link para notícia externa sobre o projeto (Portal do Município de Congonhas, jornal local, G1, etc.) — para prova externa.
- **Pronto quando:** você me passa 1 ou os 2 aqui, ou responde "não tenho, seguir sem" (a página já está publicada sem esses; T-002 fecha).
- **Estado:** ⏳ opcional (não bloqueia nada)

### T-001 · Confirmar rename para `sba-negocios-site` (raiz primeiro, D186)
- **Pedido por:** escritório (proposta técnica) · **decide:** o dono · **Data:** 2026-08-22
- **O quê:** a regra viva D186 (`escritorio-do-mou/.claude/rules/nomenclatura-repos.md`) manda o padrão `<unidade>-<projeto>-<tipo>` com a raiz sempre primeiro — o nome atual `sba-site` não carrega a raiz. Nome proposto: **`sba-negocios-site`** (raiz `sba-negocios` = a unidade SBA Negócios; tipo `-site`). Rename é seguro para o espelho Lovable (V-LOVABLE-RENAME); NUNCA desconectar/reconectar.
- **Só o dono decide:** o rename cria dependência de atualização em ponteiros vivos (CLAUDE.md da unidade SBA, USO.md deste repo, `portfolio/MAPA-DO-PORTFOLIO.md`, cofre `ACESSOS-FERRAMENTAS.md`, `GOVERNANCA-REPOS-APP.md`) — o dono aceita a quebra e a onda seguinte varre e corrige todos no mesmo commit (regra E-055 dos 3 tempos).
- **Pronto quando:** o dono OK-a o novo nome (ou recusa) — se OK, abre-se uma tarefa T-002 para o rename + varredura de ponteiros no mesmo commit; se recusa, esta tarefa fecha com o motivo.
- **Estado:** ⏳ aguarda o dono

## ✅ Rastro (feitas)
_(as tarefas concluídas descem para cá com a data e o commit)_
