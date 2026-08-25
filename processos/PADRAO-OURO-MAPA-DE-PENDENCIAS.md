> ⧉ **CÓPIA DE LEITURA** do `escritorio-do-mou` — **SSOT lá** (`escritorio-do-mou/processos/PADRAO-OURO-MAPA-DE-PENDENCIAS.md`); puxada em **2026-08-22**. Não editar aqui: mudança se faz no escritório e se republica (regra em `processos/HERDADO-DO-ESCRITORIO.md`).

# PADRÃO-OURO do MAPA DE PENDÊNCIAS (D172 + D159 + D181 + D182) — a NORMA
> **Vigência:** ATIVO desde 2026-08-20 (ordem do MOU: "quero que lance lentes… para termos um padrão ouro aqui"). Nasce da lente C (censo completo + anti-padrões punidos: `processos/estudos-2026-08-20/03-LENTE-C-padrao-ouro-mapa.md`). **Template pronto para copiar: `processos/templates/TEMPLATE-MAPA-DE-PENDENCIAS.md`** (T1). Vale para TODO projeto do portfólio; propaga na fase 3 (kit item 18, emendado).

## 🆕 MÉTODO OFICIAL DO DONO (MOU 2026-08-22) — 3 preferências que MANDAM neste padrão
> Ordem verbatim do MOU: *"as perguntas, quero que me traga aqui na tela em caixas para eu te responder uma a uma. esse é o método oficial para o mapa de pendências. no mapa nunca deve haver campos de explicações do que foi feito e nada do que foi feito, somente pendências. os códigos de tarefas devem ser fáceis para eu te responder neles."*

1. **PERGUNTA EM CAIXA NA TELA (não no arquivo).** Toda decisão **🔒 SUA** vai ao dono por **caixa interativa na tela** (ferramenta `AskUserQuestion`), **uma a uma**, com opções + recomendação embutida. O mapa só LISTA a pendência e seu código; a resposta acontece na caixa. Substitui "pergunta escrita no arquivo".
2. **SÓ PENDÊNCIA — ZERO "FEITO".** O mapa **nunca** carrega o que já foi feito — nem tabela "MINHAS ✅ concluído", nem "rastro do dia", nem explicação do que foi entregue. O feito vive no git / `HANDOFF-ULTIMO.md`. **Endurece o §1.4/C128** (que ainda permitia 1 linha de rastro — REMOVIDA).
3. **CÓDIGO FÁCIL DE RESPONDER.** Cada pendência ganha um código **curto e sequencial (P1, P2, P3…)** que o dono usa para responder ("resolve o P2"). Sigla técnica (AT-NN, M-NN, C-NN) vira só **nota interna invisível**, nunca o código que o dono digita.
> **Propagação:** desce a TODO mapa de pendências do portfólio (fila em `MELHORIAS-A-REDISTRIBUIR.md`). Adotado JÁ no Atlas (v3, 2026-08-22).

## §1 — Estrutura obrigatória (nesta ordem)
1. **Cabeçalho de 4 linhas:** título · **URL estável DENTRO do arquivo** (foto do SSOT, republicar sempre com `url=` — C130) · `Atualizado: data (vN — motivo)` + "só pendência" · as regras do mapa inline.
2. **🔒 SUAS** — anatomia fixa por item: `## n. <emoji-sev> Título em linguagem de gente — placar` → **O que é** (1-3 linhas, termo técnico glosado) → **Placar** (com a regra de contagem declarada) → **Passo a passo numerado com 1 LINK por ação** (rótulo textual junto; passo 0 = o clique que mata a CLASSE do problema, quando existir; avisos de NÃO-fazer explícitos) → **Rec.** fechada, POR sub-decisão quando houver (a)(b)(c) → histórico em `<details>` dentro do item (padrão SBA), nunca em doc à parte.
3. **📅 PRÓXIMA INSTÂNCIA** — a fila já combinada, com ordem e gatilho (a lacuna que nenhum mapa tinha; ordem do MOU 20/08: "no mapa devemos ter as dessa e as da próxima instância").
4. **⚙️ MINHAS** — tabela 1-linha, rotulada "para VER, não para cobrar"; **zero ✅ de concluído** (C128); rastro do dia = 1 linha "sai na próxima edição" (e sai).
5. **📌 LIMITES DECLARADOS** — "ficam para não sumirem, não para serem cobrados": risco aceito (D106), não-fazer decidido, bloqueio externo, migrado, aposentado.
6. **Rodapé** — reafirma D176/D181/D182 + "onde mora o detalhe" (ponteiros ao SSOT).

## §2 — Régua de linguagem (D159)
Linguagem de gente; jargão só glosado na 1ª vez ("galho (*branch*) = …"). PROIBIDO: "olhe o arquivo X" (C114) · pedir o que a máquina obtém sozinha (C115) · sigla nua (RLS, 403, mcp__*) (C113) · item-paredão "não aja" que enterra decisão (C110) · pergunta seca sem recomendação (C116/D40).

## §3 — Regra de contagem (vacinas D4/D12)
Placar conta por **PREFIXO de célula**, nunca por símbolo solto — e DECLARA como conta. Proibido artigo definido sobre subconjunto ("as 7" quando são 20 — D5): escreve-se "as 7 mais urgentes de N; o resto em <lugar>". O placar do mapa = o das demais superfícies (divergência é defeito). Todo item com id único (vacina PU: id duplicado cobrou o já-pago).

## §4 — Frescor: VER-ANTES-DE-COBRAR (D182)
Nada entra numa edição sem re-medição pelo canal que existir; sem canal = rótulo "não-verificável por mim — confirme". O mapa MOSTRA o rastro ("a lista de 14/08 dizia 32; hoje são 20"). Nenhum passo pede ao dono guardar/colar/lembrar — ou o escritório busca, ou registra a perda aceita. Carimbo do topo = data real do commit (C45). Vigiado por `check_frescor_superficies`.

## §5 — Espelho HTML/Artifact
Fonte HTML versionada no repo + tabela arquivo→URL (anti-duplicata, modelo `scratchpad/README.md`). Republicar SEMPRE com `url=` (C130 — 3 duplicatas já cunhadas no portfólio). URL morta citada em superfície viva = defeito (SBA carrega 2 hoje). Privacidade do Artifact: só o dono confirma no painel (o fetch da instância autentica como ele — verde falso, C97).

## §6 — Dente mecânico
`test_mapa_espelho.py` (md↔HTML 1:1 + URL presente) na CI — cópia no kit (`processos/templates/`, T4). O gate-template [11/12] acha `MAPA-DE-PENDENCIAS*.md` em qualquer profundidade e recomenda o canônico **`MAPA-DE-PENDENCIAS.md` na RAIZ** (T2). Gerador por script (E-044) = ALVO, não vigente (C74 ⏸, revisar 09-15) — espelho-com-dente é o padrão de hoje.

## §7 — Estado do portfólio (censo 20/08, resumo)
Mapas vivos: escritório (v6, o padrão-de-facto) · SBA · PU · EDU (frente) · Keepee (2 frentes). Sem mapa: Atlas, AVC, CCEV, Profinders (SSOT=Hub — vista gerada, decidir com o MOU), Rotary, bitsuki. **10 cartas D172 sem ACK desde 08-11** — cobrar na fase 3 junto com este padrão. Detalhe integral e delta por unidade: lente C §5.

---

## 🎯 O PADRÃO DEFINITIVO (D191, ordem do dono 2026-08-21) — 2 PISTAS, RESOLVIDO SAI, MODO AUTÔNOMO
Todo mapa de pendências do portfólio segue ISTO, sem variação por sessão:

### Pista 🔒 SEU (o dono FAZ) — SEMPRE didático
Cada item obrigatoriamente com:
1. **Link direto para a TELA exata** (a URL mais funda possível — não a home, a tela do clique; D181).
2. **Passos numerados** (1, 2, 3…) — o "como" nunca fica para ele descobrir.
3. **"Pronto quando:"** — o que ele VÊ na tela ao terminar (para saber que deu certo).
> Item 🔒 sem link-de-tela + passos = **defeito do mapa**. O dono nunca deve precisar perguntar "como faço?".

### Pista 🤖 MEU (a máquina FAZ) — MUDO
Cada item = **1 linha do que é** + **o estado**: `⏳ posso fazer` · `🔄 rodando` · `✅ feito`. **Zero explicação** do trabalho (o dono despacha "vai" ou vê rodando; o detalhe técnico vive no git, não aqui).

### Resolvido SAI da vista
O mapa mostra **só o ABERTO**. Feito → rastro (git). Nada de "coisa resolvida" poluindo a superfície.

### Modo autônomo (o "boi esperando acordar")
Toda onda roda com: *"execute TUDO ao seu alcance sem parar para perguntar; só pare para (a) decisão que só o dono toma ou (b) fim; e ao parar, diga em 1 linha SE terminou ou O QUE espera."* Sessão parada em silêncio = falha de fecho de turno. O dono pergunta à torre "está trabalhando?" → a torre mede o estado real (RUNNING/IDLE) por API.

### Link a link + máquina-primeiro (D192, ordem do dono 2026-08-21)
Quando um item 🔒 tem **N coisas parecidas** (galhos a apagar, registros de DNS, contas a transferir), **cada uma vem com o SEU próprio link** para a tela mais funda (ex.: galho → `…/branches/all?query=<nome>` filtra a página para AQUELE galho). Uma tela + lista de nomes = defeito (o dono se perde). E **antes de virar clique do dono, a instância TENTA fazer pela ferramenta**; só o que a ferramenta nega (ex.: apagar galho = 403 no push + sem tool no MCP) vira 🔒 — nunca empurrar como clique dele o que a máquina faz sozinha.

### Escopo do mapa (D193, ordem do dono 2026-08-21)
O **mapa do escritório** carrega **só escritório + ações de PORTFÓLIO do dono** (hub/infra, custo, contas, domínios). **Resíduo interno de uma unidade** (apagar galho da unidade X, reconectar o Lovable da unidade Y) **vive no mapa DAQUELA unidade** (D172), não no do escritório. O maestro reflete só o ESTADO da onda (✅/🔄) e aponta "resíduo no mapa DA unidade" — não copia a lista para cá. Misturar pendência de projeto no mapa do escritório = ruído que confunde o dono.
