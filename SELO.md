# SELO DO KIT DE GOVERNANÇA — sba-negocios-site (D196)
> **⚠️ Isto NÃO é um selo de fecho de onda (D194).** A unidade SBA Negócios **ainda NÃO está selada** — ela consta como onda pendente na `escritorio-do-mou/SELOS-DE-FECHO.md` §"Fila".
> Este arquivo é o **TAG do KIT** (D196): marca que este repo-app carrega o **kit-repo-app** aplicado — identidade + canal de tarefas + gate + registro + settings + robô "chega na main" (quando aplicável).
> Quando a unidade SBA for selada (onda fechar), este arquivo GANHA a seção "Selo de Onda" com o nome do selo emitido em `SELOS-DE-FECHO.md`. Até lá, só o kit.

## Estado do KIT (medido 2026-08-22 · **re-medido 2026-08-25**)

| item | arquivo | estado | observação |
|---|---|---|---|
| identidade + contrato D195 + regras de espelho | `CLAUDE.md` | ✅ presente | criado nesta onda |
| canal de tarefas (a "API/caixa" do dono, D195) | `TAREFAS-DO-DONO.md` | ✅ presente | em 25/08 a T-001 (rename D186) **saiu daqui por reclassificação** — é decisão do dono, foi para o `MAPA-DE-PENDENCIAS.md` como **V1**. ✅ **T-001 CUMPRIDA em 25/08** — o dono renomeou; o repo é `bitsuki1/sba-negocios-site` e a varredura de ponteiros rodou no mesmo turno (E-055). Aberta restante: T-002 (opcional). |
| porta de fecho | `gate-fechamento.sh` | ✅ presente (universal ᵁ) | herdado do kit-clone A-206; governança a MAIS que o `gate-app.sh` enxuto — aceita pela variância ᵁ do `GOVERNANCA-REPOS-APP.md` |
| linter de estado | `linter-estado.sh` | ✅ presente | herdado do kit-clone A-206 |
| registro entre sessões | `REGISTRO-DE-INSTANCIAS.md` | ✅ presente | criado nesta onda; linha ABERTA da governança em curso |
| TAG do kit | `SELO.md` | ✅ presente | este arquivo |
| deny anti-escrita fora do escopo | `.claude/settings.json` | ✅ presente (**endurecido 25/08**) | bloqueia `escritorio-do-mou/**`, `keepee-facilities*/**`, **`sba-unidades-de-negocios/**` (D201)** e **`portfolio-automacoes/**`**; cobre também `NotebookEdit` |
| corpo de processos herdado | `processos/` + `.claude/rules/` + `.claude/agents/` | ✅ presente (**reconciliado 25/08**) | 10 processos + 3 agentes + **6 regras** (eram 3 em 22/08). Toda cópia agora carrega cabeçalho ⧉ "CÓPIA DE LEITURA — SSOT no escritório". Índice em `processos/HERDADO-DO-ESCRITORIO.md` |
| mapa de pendências | `MAPA-DE-PENDENCIAS.md` | ✅ presente (**v5, 25/08**) | régua de admissão de 25/08 aplicada; só pendência; "Pronto quando:" em cada item |
| robô "chega na main" (D170) | `.github/workflows/consolidar.yml` + `consolidar.sh` | ⬜ **falta — LIMITE DECLARADO, não pendência** | precisa de segredo de Actions configurado **neste** repo = 1 clique do dono. Pela **régua de admissão de 2026-08-25** (só sobe ao mapa do dono o que trava 2+ casas ou é regra para todas), clique de uma casa só **não vira pendência do dono**. Fica declarado; **o escritório decide** se vale o clique. Nada trava por causa disso. |

## Como este selo evolui
- **Hoje:** SBA em fila (não selada). Este arquivo carimba só o **KIT D196**.
- **Amanhã (quando a unidade SBA for selada):** o escritório emite o selo de onda em `SELOS-DE-FECHO.md` e este arquivo ganha a seção **"Selo de Onda"** com o nome do selo, a data e a prova. Não substitui, complementa.
- **Sempre:** um repo-app fora do `GOVERNANCA-REPOS-APP.md` = achado a fechar (o registro-garantia é a rede que não deixa esquecer).


---

## ⚠️ Dúvida registrada (porta P6 do fecho de 2026-08-25) — colisão de nome `SELO.md` × `SELO-DE-FECHO.md`
> **Registrada, não resolvida.** A ordem de abertura mandou **não renomear** este arquivo, porque existe uma colisão viva no portfólio entre `SELO.md` (TAG do kit, o que este arquivo é) e `SELO-DE-FECHO.md` (selo de onda emitido pela torre). O escritório arbitra na onda NORMAS.
> **O risco concreto enquanto não arbitrar:** o nome `SELO.md` faz qualquer leitor apressado concluir "este repo está selado". **Não está.** Este arquivo carimba só o **KIT**. O selo de onda é emitido pela torre em `escritorio-do-mou/SELOS-DE-FECHO.md`, e **quem produz não certifica** (E-071).
> **Enquanto isso:** o aviso no topo deste arquivo é a mitigação. Não renomear sem a arbitragem.

## Estado do fecho de 2026-08-25
- **Relatório entregue:** `caixa-de-saida/para-escritorio/2026-08-25_sba-site_fecho-para-selo.md` (as 7 portas com prova, o que ficou aberto, os limites e a recomendação).
- **Selo de onda:** ✅ **EMITIDO em 2026-09-09** — ver a seção abaixo.

## 🏅 Selo de Onda — **Selo Vitrine em Ordem** (2026-09-09)

**Emitido pelo Escritório do MOU**, por ordem do dono de 25/08 (*"vamos abrir SBA e Site sba… o site vamos selar apenas"*), e registrado em `escritorio-do-mou/SELOS-DE-FECHO.md`.

**Verificado na `main` remota ANTES do carimbo (E-071 — o selo não sai por relato), contra o padrão CERTO — o `kit-repo-app`, não o de unidade:**

| medido | resultado |
|---|---|
| `CLAUDE.md` · `README.md` · `REGISTRO-DE-INSTANCIAS.md` · `TAREFAS-DO-DONO.md` · `MAPA-DE-PENDENCIAS.md` · `SELO.md` · `linter-estado.sh` · `.claude/settings.json` · `scripts/gerar-mapa-do-dono.py` · `scripts/varredura-de-segredos.mjs` · `.github/workflows/varredura-de-segredos.yml` | **11 de 11 presentes** |
| `gate-app.sh` | ausente — **variância ᵁ declarada**: esta casa carrega o `gate-fechamento.sh`, que é governança **a mais**, não a menos |
| regra de boot `credencial-vazada-e-do-dono.md` (D219) | presente |

**O que o selo trava:** selado = **não se reabre nem se re-audita sem ordem do dono**. Vale para a casa e para o escritório.
**O que o selo NÃO diz:** ele **não sela a unidade** `sba-unidades-de-negocios`, que segue na fila.
**Resíduo declarado, não bloqueante:** o robô *"chega na main"* (D170) pede um segredo de Actions **neste** repo — 1 clique de uma casa só, que pela régua de admissão não sobe ao mapa do dono. Esta casa já o classificou como limite, e está correto.

⚠️ **O selo saiu com 15 dias de atraso, e a culpa é do escritório:** a ordem do dono virou linha de FILA sem dono e sem data no registro central, e quem cobrou foi esta casa (o `M8` do mapa). Achado **A-620**, vacina `V-ORDEM-REBAIXADA-A-ITEM-DE-FILA`. _(Confissão de método: a primeira medição do escritório deu 3 faltas porque conferiu um repo-app contra o padrão de UNIDADE. Remedido com a régua certa, deu 11 de 11.)_

_Trazido pelo Escritório do MOU — 2026-09-09._

