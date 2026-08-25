> ⧉ **CÓPIA DE LEITURA** do `escritorio-do-mou` — **SSOT lá** (`escritorio-do-mou/processos/PREVENCAO-DE-PERDAS.md`); puxada em **2026-08-22**. Não editar aqui: mudança se faz no escritório e se republica (regra em `processos/HERDADO-DO-ESCRITORIO.md`).

# COMISSÃO — Como EVITAR as perdas recorrentes do escritório (estudo + projeto para a próxima instância)
> **Vigência:** ATIVO — processo/referência vivo do escritório. Revisar sob mudança material; mover a `_legado/` se aposentado.

> **Aberta por:** maestro, 2026-06-20, a pedido do MOU ("deixe para a próxima instância estudar como evitar essas
> inúmeras perdas; precisa existir uma forma de evitar isso; explique todas as falhas para ela corrigir").
> **Natureza:** trabalho de PROCESSO/META do escritório (o PMO melhorando a si mesmo). Sob gate (D1).
> **Entregável esperado:** não é "mais uma regra" — é **um MECANISMO** (ou conjunto) que IMPEÇA estas perdas, validado.

## 0. O diagnóstico em uma frase
As perdas **NÃO são por falta de REGRA** — as regras existem (D24, D66, D67, D82, o método). São por **falta de MECANISMO
que as force** quando o maestro **satura de contexto** ou **troca de instância**. Prevenção por DISCIPLINA falha
exatamente nesses dois momentos; prevenção por MECANISMO sobrevive a eles. **Esta comissão é sobre mover o máximo de
regras de "o maestro lembra" para "o sistema garante".**

## 1. CATÁLOGO DAS FALHAS (todas, com evidência real — zero eufemismo)
| # | Falha | O que é | Evidência (já aconteceu) |
|---|---|---|---|
| **F1** | **Dívida de PROPAGAÇÃO** *(a dominante)* | uma decisão/fato entra no lugar canônico mas NÃO se espalha a todas as superfícies que o referenciam; o canônico "anda à frente" das vitrines. | D88 (ordem das ondas) entrou no plano-mestre e ficou velha em **6 sub-planos + 2 mapas**; contagem do PU (14×15) vazou por ~10 docs; hash `fc38f1b`→`13f9572` corrigido em todo lugar MENOS a AGENDA; M-40 resolvido mas citado vivo; marca "SBN" sobrevivendo no ledger. |
| **F2** | **Maestro MEXE e ESQUECE** | confiar na memória do maestro como fonte do que mudou/foi decidido. | recorrente; o método criou a "Etapa-1-cruzamento" (lista do que mudou × conversa crua) **mas ela só funciona se for rodada** — e foi pulada/parcial várias vezes. |
| **F3** | **Pular passo OBRIGATÓRIO de fechamento** | declarar "fechado" sem rodar o checklist que o próprio método exige. | nesta sessão pulei a entrada no `APRENDIZADOS.md` (§8 obriga) — o MOU pegou; registro datado já tinha sido esquecido antes (L1 da auditoria de 2026-06-20). |
| **F4** | **JARGÃO na FALA** | a regra "linguagem de produção" é vigiada nos arquivos, mas escapa nas RESPOSTAS ao vivo do maestro. | o MOU avisou **≥2×** que não sabe o que é "main/branch/FF" e mesmo assim reincidi na mesma sessão. |
| **F5** | **FALSA CONVERGÊNCIA** | declarar "limpo" re-rodando a MESMA lente, sem cobrir as outras famílias. | auditoria de 2026-06-20: 3 passadas da mesma família "3→0→0" → o MOU pegou → virou D82. |
| **F6** | **Decisão no CHAT não registrada** | a conversa é a FONTE; o que se decide só nela e não vira arquivo, some na troca de instância. | a razão de a Etapa-1 existir; sintoma do F2. |
| **F7** | **Caminho cross-repo sem rótulo / link a abrir** | citar arquivo de outro repo como clicável, ou caminho deste repo como "ação", ao MOU. | reincidência apesar do D65/D78; o `na-tela-check.py` pega na FALA, mas não pega caminho cross-repo SEM rótulo dentro de arquivos. |
| **F8** | **Rótulo de ESCOPO enganoso** | chamar uma rodada de "completa" quando cobriu só parte. | "auditoria completa" que era só-escritório (L2 de 2026-06-20). |
| **F9** | **TRIAGEM como dispositivo de PROCRASTINAÇÃO** | carimbar "TRIADO-DIFERIDO p/ onda" um depósito que contém item NÃO-diferível (segurança/LGPD/propagação/fact-check) → fecha a entrada sem aplicar o conteúdo. É prima do F1+F3. | reconciliação de 2026-06-20: 4 depósitos diferidos "p/ onda" continham **credencial vazada (C1), 9.398 PII no git (C2), drift de exclusão errada (A4), fact-check do PU (M1)** — não-diferíveis. A 2ª auditoria (vista-chapeu) pegou. **VACINA (regra):** `TRIADO-DIFERIDO` só vale para item **genuinamente onda-específico** (ex.: dedup de cidade na onda da unidade). **Segurança, LGPD, propagação cross-repo e fact-check NUNCA são diferíveis** — viram item ATIVO no MESMO ciclo (AGENDA/PEDIDOS), ou a urgência é rebaixada com justificativa explícita. "Consumido" sem aplicar = selo sem lastro. |

## 2. CAUSA-RAIZ (por que persistem — atacar AQUI, não os sintomas)
1. **Prevenção por DISCIPLINA, não MECANISMO.** Toda regra acima depende do maestro LEMBRAR de aplicá-la. Sob saturação/troca-de-instância, a memória é o elo que arrebenta (F2 é a mãe das outras).
2. **DUPLICAÇÃO de conteúdo.** O MESMO fato copiado em N superfícies = N pontos a propagar e a apodrecer (F1). O D67 ("documento vivo": estável inline, volátil por ponteiro) ataca isso, mas **não está completo** — ainda copiamos demais.
3. **Blast-radius DESCONHECIDO.** Quando uma decisão muda, ninguém sabe DE CABEÇA todas as superfícies que a citam → impossível garantir propagação completa sem um mapa "o que referencia o quê".
4. **Fechamento não-AUDITÁVEL.** "Feito" é uma afirmação do maestro, não um estado verificado. Nada confere que os passos obrigatórios (APRENDIZADOS, registro datado, links, agenda) de fato rodaram.

## 3. O que JÁ EXISTE hoje (e exatamente ONDE falha) — não reinventar
- **`.claude/hooks/verificar_links.py`** — pega link MORTO (404). **NÃO** pega propagação (valor velho que ainda existe e "resolve"), nem jargão, nem cross-repo-sem-rótulo.
- **`.claude/hooks/na-tela-check.py`** (Stop) — vigia a FALA do maestro (caminho solto/jargão de caminho). **NÃO** vigia o conteúdo dos ARQUIVOS nem da AGENDA injetada no boot.
- **`processos/verificar-handoff.py`** — confere superfícies de handoff, mas é calibrado **por-frente** (um marco), dá falso-positivo em rodada transversal.
- **Método (`AUDITORIA-TRIPLO-LIMPO.md`), Etapa-1-cruzamento + D82 (lentes diferentes)** — corretos, mas **dependem de serem RODADOS** (F2/F3).
- **D67 (documento vivo por ponteiro)** — a direção certa contra F1, mas aplicação incompleta.

## 4. A COMISSÃO — o que a próxima instância deve ENTREGAR
**Estudar as falhas acima e PROJETAR uma prevenção sistêmica.** Requisitos inegociáveis: **(i) mecanismo > disciplina**
(o que não depende da memória do maestro); **(ii) barato e não-inflado** (D15 — não criar aparato que ninguém usa);
**(iii) generalizável aos projetos** (D23 — o que servir ao escritório deve descer às unidades). **Sementes a avaliar
(NÃO são prescrição — a instância projeta a melhor):**
- **(a) Sweep de PROPAGAÇÃO determinístico** *(ataca F1, a dominante)*: dado o valor/termo ANTIGO que mudou, um script
  varre TODAS as superfícies e lista o que ainda o referencia — rodado **antes de declarar fechado**. Candidato:
  `verificar_propagacao.py <termo-antigo> [<termo-antigo>...]`. Pergunta de design: como o maestro ALIMENTA os
  "termos antigos" sem esquecer? (talvez derivar do `git diff` da sessão automaticamente.)
- **(b) Checklist de FECHAMENTO enforçada por mecanismo** *(ataca F3)*: um hook (Stop/SessionEnd) que CONFIRMA que os
  passos obrigatórios rodaram — ex.: existe entrada em `APRENDIZADOS.md` com a data de hoje? existe registro datado da
  rodada? `verificar_links` verde? AGENDA com `Atualizado:` de hoje? Se não, AVISA (ou bloqueia).
- **(c) Reduzir DUPLICAÇÃO de verdade (D67 levado ao limite)** *(ataca a causa de F1)*: mapear onde copiamos fato em vez
  de apontar; converter cópia→ponteiro onde der. Menos cópias = menos a propagar. **A cura, não só o detector.**
- **(d) Mapa de BLAST-RADIUS** *(ataca F1/causa-3)*: um índice "decisão/termo canônico → superfícies que o citam", para
  uma mudança conhecer seu raio. Pode nascer do próprio sweep (a).
- **(e) Lint de JARGÃO** *(ataca F4)*: na AGENDA (no boot) e, se possível, um lembrete na FALA — lista de termos
  (`main/branch/FF/commit/merge/RLS/schema/...`) que dispara aviso de "traduzir".
- **(f) Garantia anti-FALSA-CONVERGÊNCIA (F5)** e **rótulo de escopo (F8)**: já cobertos pelo D82/método em texto —
  avaliar se merecem mecanismo (ex.: a rodada tem de DECLARAR quais famílias de lente usou antes de fechar).

## 5. Régua de sucesso (como saber que a prevenção FUNCIONA)
A prevenção funciona quando: **(1)** uma decisão estrutural mudada **não deixa NENHUMA superfície viva desatualizada**
sem que o mecanismo aponte; **(2)** o fechamento **não pode ser declarado** sem os passos obrigatórios verificados;
**(3)** isso roda **sem depender de o maestro lembrar**. Medir por **perda EVITADA** (o mecanismo pegou antes do MOU),
não por documento produzido.

## 6. Registro dialético
- **TESE:** as perdas têm causa comum (memória do maestro como elo + duplicação) e cura comum (mover de disciplina para mecanismo + reduzir cópia); um pequeno conjunto de mecanismos baratos elimina a maioria.
- **ANTÍTESE:** mais mecanismos = mais aparato a manter (D15); um sweep de propagação mal calibrado vira ruído (falso-positivo) e é ignorado, como já quase aconteceu com o verificador de handoff por-frente.
- **CONCILIAÇÃO (provisória):** por isso o entregável é **estudado e VALIDADO** (prova que pega uma perda real sem floodar), começando pelo de maior retorno (o sweep de propagação, F1, a dominante) e crescendo só se provar valor; o resto entra sob gatilho (D77c).
- **VACINA:** não responder a esta comissão com "mais uma regra escrita" (seria F3/F4 de novo); não criar um detector que ninguém roda (resolver o "como é DISPARADO automaticamente"); não atacar só o sintoma (detectar) sem atacar a causa (duplicação, D67).

## F-INFRA-MUDA — falha silenciosa de infra (colhida da Keepee, onda FASE 3, 2026-08-22)
Um recurso compartilhado (runner, cron) para de funcionar **sem gritar** porque o sinal de parada não é uma "falha" que dispara alerta (no GitHub, `cancelled` ≠ `failure` para e-mail). **Causa-raiz:** o controle verifica presença de sucesso, não ausência de execução (é a Cara 2 da doença-mãe, E-065). **Prevenção:** vigia que FALHA na ausência de sucesso recente (E-065, dente 3) + carimbo honesto do estado real da ferramenta no cofre. _(Casa com o B-DEV-5 da carta de banca da Keepee.)_
