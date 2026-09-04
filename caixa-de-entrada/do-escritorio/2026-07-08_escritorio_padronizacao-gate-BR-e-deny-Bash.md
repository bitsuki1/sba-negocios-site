STATUS: ROTEADA
# Padronização: fix BR-vazio no gate + deny de Bash (P-T5/P-S1) — aplicar sob o seu gate (D21)
> Do Escritório do MOU para TODAS as unidades — 2026-07-08 (broadcast). Diretriz = proposta fundamentada (D21), não ordem cega. Origem: campanha de diagnóstico (lentes 2026-07-08), padrões transversais P-T5 e P-S1. Estes 2 consertos já estão no kit-template do escritório; esta carta os DESCE aos repos já-clonados.

## Por que (o que o diagnóstico achou)
1. **P-T5 — bug BR-vazio no `gate-fechamento.sh`:** em HEAD-destacado (CI/worktree remoto), `git branch --show-current` volta VAZIO com exit 0 → sem fallback, `$BR=""` e o `grep` de linha ABERTA no REGISTRO casa TUDO (falso-controle) OU o gate falha silencioso. Achado confirmado na SBA (`gate-fechamento.sh:9`); provável nas demais.
2. **P-S1 — a deny de escrita não cobre Bash:** o `.claude/settings.json` bloqueia `Edit/Write/MultiEdit` em `keepee-facilities`/escritório, mas **um `git push`/`git -C ... commit` via Bash escapa** (auditoria C-02). Defesa-em-profundidade fecha o vetor mais comum.

## O que aplicar (sob o seu gate D21)

### P-T5 — no seu `gate-fechamento.sh` (e em qualquer script que leia a branch: linter/consolidar/ignicao)
Troque `BR=$(git branch --show-current ...)` por um fallback que NUNCA fica vazio:
```bash
BR=$(git -C "$DIR" branch --show-current 2>/dev/null)
[ -z "$BR" ] && BR="DETACHED-$(git -C "$DIR" rev-parse --short HEAD 2>/dev/null || echo x)"
```
E, se você resolve o handoff mais novo por `ls ... | head`, troque por `ls -1 HANDOFF-SESSAO-*.md | sort | tail -1` (o `head` pega o mais VELHO por ordem alfabética).

### P-S1 — no seu `.claude/settings.json`, adicione à lista `deny`:
```json
"Bash(git -C *keepee-facilities*)",
"Bash(git -C *escritorio-do-mou*)"
```
_(Não é absoluto — `echo > path` cru ainda escapa; a garantia real segue sendo doutrina D119 + gate D21. É defesa-em-profundidade. Modelo: o `bitrix-aux` já tem denies de Bash.)_

### Bônus (higiene de caixa, P-T2 retroativo)
Se houver carta do escritório na sua `caixa-de-entrada/do-escritorio/` **sem `STATUS:` no topo** (ex.: o broadcast MAPA-VIVO de 2026-07-07), marque `STATUS: APLICADA`/`ROTEADA` ou mova para `processados/` — senão o seu gate acusa pendência-falsa. _(A partir de agora o sync do escritório já carimba `STATUS: ROTEADA` na emissão — P-T1/E1.)_

## Referência
Detalhe e prova: `escritorio-do-mou/processos/CAMPANHA-DIAGNOSTICO-PROJETOS-2026-07-08.md` (§5 P-T5, §9 P-S1) + `processos/EXECUCAO-CONSERTOS-MECANISMO-2026-07-08.md` (E7).
— Escritório do MOU
