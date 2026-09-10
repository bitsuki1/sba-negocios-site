# Regra — CANAL DE DECISÃO DO DONO (caixa de clique) + CLASSES DE ALÇADA (D203/D202)
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`; C36 nível 3). Vigência: ATIVO desde 2026-08-22.
> **Por que é regra de boot:** o dono sinalizou que a forma de trazer decisão a ele é **dor RECORRENTE** ("as perguntas devem vir em caixas de clique na tela… são dores recorrentes"). Regra de boot sobrevive à compactação — mecanismo > memória (D71).

## D203 — Decisão do dono vem em CAIXA DE CLIQUE, nunca em prosa
Toda vez que o escritório precisa de **APROVAÇÃO, DEFINIÇÃO ou ESCOLHA** do MOU, a pergunta vai na **caixa de clique** (ferramenta `AskUserQuestion` — chips clicáveis na tela dele), **NÃO** como parágrafo no fim de uma resposta longa.
- **Por quê:** ele opera no CELULAR (D85), decide em 1 toque. Pergunta em prosa = ele não vê, a fila para. Já reclamou disso mais de uma vez.
- **Como fica:** recomendação do escritório = **1ª opção, marcada "(Recomendado)"** (D40 dentro da caixa); no máximo 4 caixas por vez; contexto curto ANTES da caixa se precisar; a resposta termina no selo (D85). Decisão que precisa de contexto longo → o contexto vem curto antes, e a caixa carrega a escolha (opção "Explique melhor" quando couber).
- **Fronteira:** o `MAPA-DE-PENDENCIAS.md` segue sendo a superfície de **LEITURA** do estado (D191); a **AÇÃO** de decidir passa pela caixa.
- **VACINA:** "trouxe a decisão em prosa no fim da resposta" — reincidente até 2026-08-22. Não repetir.

## D222 — A conversa com o dono é PELO MAPA (ordem dele, 2026-09-09, para TODAS as casas)
> *"conversa a partir de agora só pelo mapa, com vc e com todos, as mensagens que ficam na conversa se perdem, aqui eu leio e nao perco, regra nova para todos"*

O `MAPA-DE-PENDENCIAS.md` da casa **é o canal**, não o painel. Resposta a pergunta dele → pista **`💬`** (com a pergunta nas palavras dele e a data; sai quando ele resolve). Item que depende dele → **`🔒`** (decisão · recomendação · minutos · passo numerado). O que é seu → **`⚙️`**, uma linha. **A resposta no chat encolhe:** o que aconteceu + o link. O que precisa sobreviver não mora na janela.
**Não revoga a D203 — recorta:** a caixa de clique segue sendo o gesto de DECIDIR; o mapa é onde a coisa MORA.
_(Esta regra entrou aqui, e não em arquivo próprio, porque as regras de boot têm teto de 32 KB desde 09/09 — régua trazida pela Moderação: regra nova entra com uma saindo, ou entra encolhida.)_

## D202 — Classes de alçada: o que o escritório decide sozinho × o que leva ao dono
| Classe | O quê | Ação |
|---|---|---|
| **A** | Reversível, vive no git (docs, mapas, padrão interno, faxina, consolidação) | **Decide e informa** — sem espera. Era prática (D85); agora é alçada escrita. |
| **B** | Padrão · nomenclatura · estrutura · propagação de kit às unidades · reorg de pastas do escritório | **Propõe com recomendação e EXECUTA se o dono não objetar em 3 dias** (prazo escolhido por ele, 2026-08-22). Item entra em fila datada; passados 3d sem veto, executo e aviso. |
| **C** | Irreversível · externo (Drive/rede/2FA/e-CAC/produção) · financeiro · societário · marca · o que encosta na regra de ouro (perna b/LGPD) | **Só o dono**, e trago em CAIXA DE CLIQUE (D203). |

- **ANTÍTESE da classe B:** pode executar algo que o dono vetaria se visse a tempo. **CONCILIAÇÃO:** (a) só cobre o REVERSÍVEL (git desfaz); (b) toda entrada da fila B tem recomendação + prazo visível; (c) o dono veta a qualquer momento nos 3 dias. Risco de veto-tardio aceito contra o custo da fila parada.
- **MECANISMO — EXISTE desde 2026-09-07** _(⚠️ até 09/09 esta linha dizia "a construir… enquanto o dente não existe, vale por disciplina": regra lida em todo boot ensinando que ela mesma não tinha dente, quando tinha — A-622)_: fila datada `processos/AGUARDANDO-ALCADA.md` com `item · classe · proposto-em · executa-em(+3d) · recomendação`, e o check **`[alçada]`** do `processos/linter-estado.sh` acende quando um item B passa do prazo sem execução nem veto (a fila não vira cemitério).
- **A fila de PERGUNTAS ao dono é outra** — `processos/AGUARDANDO-CAIXA.md`, tabela `Q<n>` — e ganhou dente no mesmo check `[9]` em 09/09 (A-619): antes ele lia só a tabela `B`, e a **Q4** ficou 19 dias sem virar pergunta enquanto o arquivo afirmava, no presente, que o linter a acusaria.

Referência normativa: **DECISOES.md · D202 · D203**.
