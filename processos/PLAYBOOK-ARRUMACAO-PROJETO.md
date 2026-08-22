# Playbook de Arrumação de Projeto — o escritório ENTRA no projeto e regulariza

> **Vigência:** ATIVO desde 2026-06-28 (MOU: *"vamos gravar esse processo; nas próximas instâncias botamos
> escritório + projeto, o escritório entra no projeto e corre tudo isso para regularizar"*).
> **Gatilho:** sessão **co-montada** (repo do projeto + `escritorio-do-mou`) + o MOU diz *"regulariza o projeto X"*
> (ou *"roda o playbook de arrumação"*). **Ordem do rollout:** PU → Keepee → AVC → bitsuki → Atlas → Profinders → **SBA por último**.
> **Por que existe:** unifica numa ÚNICA passada por projeto (a) a padronização/instalação do trilho de propagação
> e (b) a limpeza de lixo velho — sem abrir o repo duas vezes. Mede-se por bloqueio de esteira removido (D26), não por doc.

## ⚠️ GUARDA-RAIL (a única exceção — inegociável)
O escritório, nesta passada, mexe em **organização · docs · branches · Drive · governança**. **NÃO** toca **código de
produto** nem **decisão de negócio da unidade** — isso é do projeto/MOU, sob o gate dele (vacina E-041/alçada + D56).
O que for de produto/decisão vira **laudo depositado na caixa**, não execução. Trabalho em **branch, atribuído** ("trazido
pelo Escritório", datado), sob o gate do projeto (D38/D21). Canônico de unidade → só via caixa (hook `anti-escrita-projeto.py`).

---

## FASE 0 — Boot (provar o estado, não assumir)
- [ ] `git fetch` nos DOIS repos (projeto + escritório). `git status` limpo nos dois.
- [ ] Ler o cérebro do projeto (CLAUDE.md/AGENTS.md) + `portfolio/<u>/MAPA-DA-UNIDADE.md` + o handoff do projeto.
- [ ] Estampar a instância no `REGISTRO-DE-INSTANCIAS` (chapéu + objetivo).

## FASE 1 — PADRONIZAR (organização & processo)
- [ ] **Instalar o trilho PUXAR** (propagação): rodar `processos/instalar-caixas-no-projeto.py` → caixas v2
      (`caixa-de-entrada/` + `caixa-de-saida/`) + **boot-puxa-main** + boot surfaça a caixa + gate de pickup.
      _(é o que faz a melhoria do escritório descer sozinha dali pra frente — ver `ESTRATEGIA-PROPAGACAO.md`)._
      ⚠️ **A-251 ABERTO:** hoje o instalador só CRIA a estrutura — o **boot+gate ainda ficam "à mão"** (não religa ao canal v2), então confira/religue o boot+gate manualmente até o fix mecânico descer. "Instalado" ≠ "religado" (E-042).
- [ ] **Checklist de qualidade D130 §2** (`ONBOARDING-E-CHECKLIST-QUALIDADE.md`): cérebro · DO_ESCRITORIO · HANDOFF ·
      MAPA-DA-UNIDADE · INVENTÁRIO (D24) · **TAG/Tipo D128** · vigência na espinha · gates · backlog no padrão ·
      REGISTRO+ATA · cross-use. ❌ = trabalho do escritório (D127).
- [ ] **Seed de lições** (D130 item 9): avaliar quais MR do `MELHORIAS-A-REDISTRIBUIR.md` cabem no projeto (aplicar OU `N/A`+razão).
- [ ] **Deny correta** no `.claude/settings.json` do projeto (protege canônico, libera a caixa — padrão D119/D144).

## FASE 2 — LIMPAR LIXO VELHO
- [ ] **PRs abertos do repo do projeto** (não esquecer): listar → mergear o que é bom e está pronto · fechar o
      obsoleto/superado (com 1 linha do porquê) · nunca deixar PR-zumbi. _(o gen não dá merge cego — confere antes.)_
- [ ] **Branches velhas** (não esquecer): rodar a verificação de **"ouro preso"** (adaptar `branches-com-ouro-preso.sh`)
      → apagar SÓ as comprovadamente vazias/consolidadas. ⚠️ `git push --delete` dá **403** (egress) → o gen ENTREGA a
      LISTA verificada (apagar × preservar) e o MOU executa na UI do GitHub (padrão M-66/V-DELETE-BRANCH-403).
- [ ] **Docs superseded** → `_legado/` com rótulo "SUPERADO → <vivo>" (nunca delete cego — D24).
- [ ] **Drive da unidade:** dedup + consolidar com o padrão de **Apps Script** (dry-run + lixeira reversível, nunca
      sobrescreve — modelo `caixa-de-saida/APPS-SCRIPT-CONSOLIDAR-PMO-DRIVE.gs`). O passo destrutivo é do MOU.
- [ ] **Higiene do git:** arquivos órfãos/duplicados · links mortos · vigência vencida nos docs de topo.

## FASE 3 — GOVERNANÇA & SAÚDE ("o que mais podemos rodar")
- [ ] **Governança paritária (D133):** git ↔ Drive ↔ Supabase com a MESMA governança (5 dimensões: nomenclatura ·
      caminho · mapeamento D24 · tag D128 · trilha D66). Diff vs padrão → arrumar o que a ferramenta deixa; lista de
      deletes irredutíveis ao MOU (IDs verificados ao vivo, AUD-02).
- [ ] **Supabase advisors** (se o projeto tem Supabase): rodar `get_advisors` (security + performance) → corrigir o
      reversível, depositar o resto. _(PII/senha = risco aceito D106 — registrar 1 linha, não cobrar.)_
- [ ] **CI / build** (se houver): está verde? PRs passam? Workflow não-quebrado.
- [ ] **AS-BUILT / D24 atual:** o manifesto do que existe bate com a realidade do repo (nada não-enumerado).
- [ ] **Auditoria anti-self leve** (1 escrutinador, D108): falso controle · drift · cerimônia-sem-mecanismo no repo do projeto.
- [ ] **Gate de fechamento do projeto** verde + boot surfaça a caixa.

## FASE 4 — LAUDO & HANDOFF (fechar sem perdas)
- [ ] **Mini-laudo** "arrumei X · falta você decidir Y" depositado em `escritorio-do-mou/caixa-de-entrada/<u>/` (a caneta consolida).
- [ ] Achados de **produto/decisão** → caixa do projeto (`DO_ESCRITORIO.md`) — NÃO executados (guarda-rail).
- [ ] Atualizar `portfolio/<u>/MAPA-DA-UNIDADE.md` + placar da campanha + `DIFUSAO-STATUS.md` (trilho instalado ✅).
- [ ] Rodar o gate de fechamento dos dois lados; consolidar ao `main` (PR+API, D147).

---
> **Resumo de bolso:** Fase 1 deixa o projeto NO PADRÃO e recebendo melhorias sozinho; Fase 2 tira o LIXO (PRs,
> branches, docs, Drive, órfãos); Fase 3 confere GOVERNANÇA e SAÚDE; Fase 4 entrega o LAUDO sem perdas.
> O escritório arruma a CASA; o dono (MOU/projeto) decide o NEGÓCIO.

> **⚠️ Antes de levar QUALQUER achado recuperado ao mapa do dono (E-052, 2026-08-20):** passe pelas 2 perguntas obrigatórias — *ainda existe?* e *já tem decisão dele?*. Item com veredito do dono vai por **carta à unidade dona**, nunca como cobrança. Régua completa: `processos/AUDITORIAS.md §desenterrar não é cobrar`.
