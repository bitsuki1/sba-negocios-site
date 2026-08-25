> ⧉ **CÓPIA DE LEITURA** do `escritorio-do-mou` — **SSOT lá** (`escritorio-do-mou/.claude/rules/decisao-e-alcada.md`); puxada em **2026-08-25**. Não editar aqui: mudança se faz no escritório e se republica.

# Regra — CANAL DE DECISÃO DO DONO (caixa de clique) + CLASSES DE ALÇADA (D203/D202)
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`; C36 nível 3). Vigência: ATIVO desde 2026-08-22.
> **Por que é regra de boot:** o dono sinalizou que a forma de trazer decisão a ele é **dor RECORRENTE** ("as perguntas devem vir em caixas de clique na tela… são dores recorrentes"). Regra de boot sobrevive à compactação — mecanismo > memória (D71).

## D203 — Decisão do dono vem em CAIXA DE CLIQUE, nunca em prosa
Toda vez que o escritório precisa de **APROVAÇÃO, DEFINIÇÃO ou ESCOLHA** do MOU, a pergunta vai na **caixa de clique** (ferramenta `AskUserQuestion` — chips clicáveis na tela dele), **NÃO** como parágrafo no fim de uma resposta longa.
- **Por quê:** ele opera no CELULAR (D85), decide em 1 toque. Pergunta em prosa = ele não vê, a fila para. Já reclamou disso mais de uma vez.
- **Como fica:** recomendação do escritório = **1ª opção, marcada "(Recomendado)"** (D40 dentro da caixa); no máximo 4 caixas por vez; contexto curto ANTES da caixa se precisar; a resposta termina no selo (D85). Decisão que precisa de contexto longo → o contexto vem curto antes, e a caixa carrega a escolha (opção "Explique melhor" quando couber).
- **Fronteira:** o `MAPA-DE-PENDENCIAS.md` segue sendo a superfície de **LEITURA** do estado (D191); a **AÇÃO** de decidir passa pela caixa.
- **VACINA:** "trouxe a decisão em prosa no fim da resposta" — reincidente até 2026-08-22. Não repetir.

## D202 — Classes de alçada: o que o escritório decide sozinho × o que leva ao dono
| Classe | O quê | Ação |
|---|---|---|
| **A** | Reversível, vive no git (docs, mapas, padrão interno, faxina, consolidação) | **Decide e informa** — sem espera. Era prática (D85); agora é alçada escrita. |
| **B** | Padrão · nomenclatura · estrutura · propagação de kit às unidades · reorg de pastas do escritório | **Propõe com recomendação e EXECUTA se o dono não objetar em 3 dias** (prazo escolhido por ele, 2026-08-22). Item entra em fila datada; passados 3d sem veto, executo e aviso. |
| **C** | Irreversível · externo (Drive/rede/2FA/e-CAC/produção) · financeiro · societário · marca · o que encosta na regra de ouro (perna b/LGPD) | **Só o dono**, e trago em CAIXA DE CLIQUE (D203). |

- **ANTÍTESE da classe B:** pode executar algo que o dono vetaria se visse a tempo. **CONCILIAÇÃO:** (a) só cobre o REVERSÍVEL (git desfaz); (b) toda entrada da fila B tem recomendação + prazo visível; (c) o dono veta a qualquer momento nos 3 dias. Risco de veto-tardio aceito contra o custo da fila parada.
- **MECANISMO (dente — a construir na fase escritório-perfeito):** fila datada `AGUARDANDO-ALCADA.md` com `item · classe · proposto-em · executa-em(+3d) · recomendação`; o linter acende se um item B passou do prazo sem execução nem veto (a fila não vira cemitério). Enquanto o dente não existe, vale por disciplina (E-040).

Referência normativa: **DECISOES.md · D202 · D203**.

---
> **Nota do `sba-negocios-site` (2026-08-25):** neste repo o **balcão é o escritório (D56)** — a instância do site **não abre caixa de clique direto ao dono**. Decisão classe **C** daqui sai por `caixa-de-saida/para-escritorio/` com recomendação fechada; quem leva ao dono na caixa de clique é o maestro do PMO.
