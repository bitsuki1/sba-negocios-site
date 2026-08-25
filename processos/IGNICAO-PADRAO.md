> ⧉ **CÓPIA DE LEITURA** do `escritorio-do-mou` — **SSOT lá** (`escritorio-do-mou/processos/IGNICAO-PADRAO.md`); puxada em **2026-08-22**. Não editar aqui: mudança se faz no escritório e se republica (regra em `processos/HERDADO-DO-ESCRITORIO.md`).

# IGNIÇÃO PADRÃO — o que cada chapéu lê ao abrir sessão (ordem fixa)

> **Vigência:** ATIVO desde 2026-06-20 — D109 (P-011 E4). SSOT do método de ignição.
> **Por que existe:** sem ordem fixa de leitura, cada instância improvisa o boot — gasta contexto antes de produzir, ou pior, age sobre documento morto. Três chapéus possíveis; cada um tem uma ordem.
> **Casa com:** `CLAUDE.md §"Como retomar"` (ritual do maestro) · `.claude/hooks/surface-agenda.sh` (surface automático) · `processos/POLITICA-VIGENCIA.md` (não confundir vivo com fóssil).

## §1 — Qual chapéu? (regra de desempate, D22/D104)
- Montou **só o escritório** (`escritorio-do-mou`) → você é o **MAESTRO**. §2.
- Montou **só um repo de projeto** (o MOU disse "você é o orquestrador de X") → **ORQUESTRADOR DE PROJETO**. §3.
- Montou o escritório **+ um projeto** → continua MAESTRO (o projeto é DADO a ler). §2.
- Foi instanciado para uma **lane/tarefa específica** (ex.: Drive, um pedido do `PEDIDOS_DO_ESCRITORIO.md`) → **SUB-INSTÂNCIA EXECUTORA**. §4.
- **Na dúvida, o chapéu é o do escritório (maestro).**

## §1.5 — Qual CASACO? (tema, D137) — depois do chapéu, antes de executar
O **chapéu** (§1) é o PAPEL; o **casaco** é o TEMA sobre o qual se trabalha. Regra:
- O maestro **instancia no GERAL** (escritório). Após o boot surfaçar a agenda, **pergunta ao MOU qual tema trabalhar** (com recomendação, D40) — NÃO sai executando sobre um tema sem o casaco.
- **Vestir o casaco** = ler o **ponto único do tema** (índice em `processos/CASACO-POR-TEMA.md`: unidade → `portfolio/<u>/MAPA-DA-UNIDADE.md`; projeto → dossiê) **+ a caixa do tema** (`caixa-de-entrada/<tema>/`) e se atualizar ANTES de agir.
- **Trocar de tema na mesma sessão = trocar de casaco** (ler o novo ponto único). O **chapéu NÃO muda** (o maestro continua maestro vestindo o casaco do SBA).
- O orquestrador de projeto (§3) já entra com o casaco do seu projeto vestido (montou o repo do tema).

## §1.6 — REGISTRO DE INSTÂNCIA (vale para TODO chapéu — MOU 2026-06-25)
Para as instâncias **não se perderem** e o MOU poder **investigar onde deu problema**: o hook de boot AUTO-ESTAMPA sua linha em `processos/REGISTRO-DE-INSTANCIAS.md` (data+branch+HEAD+chapéu provável). **1ª ação obrigatória de toda instância:** CONFIRMAR o chapéu e ESCREVER o objetivo (1 linha) na sua entrada. A **ATA** (`caixa-de-entrada/ATA-VIVA-SESSAO.md`) acumula sozinha (hook `ata-viva.sh`). Ao FECHAR, o gate marca FECHADA. Linha ABERTA órfã de outra branch = instância perdida → investigar.

## §2 — Chapéu MAESTRO (escritório) — ordem fixa
1. `CLAUDE.md` (constituição — começa pela REGRA DE OURO AMORAL D106 no topo).
2. `MAESTRO.md` (system prompt operacional).
2.5. **`HANDOFF-ULTIMO.md`** (raiz) — delta da última sessão: FEITO (provado) · PENDENTE (roteado) · INCERTO. Surfaçado automaticamente pelo hook de boot (D139). Leia ANTES da agenda — é o contexto operacional da sessão anterior que ESTADO §PRÓXIMO não repete.
3. **Hook de boot** `.claude/hooks/surface-agenda.sh` (automático: HANDOFF-ULTIMO D139 + MOBILE-FIRST D85 + `AGENDA_MOU.md` + `DETERMINACOES-EM-ABERTO.md` + **`ACHADOS-DE-AUDITORIA.md` abertos** D108).
4. `ESTADO_IMPLANTACAO.md` (campo PRÓXIMO).
5. `DECISOES.md` (histórico do porquê — sob demanda).
6. Varre `caixa-de-entrada/_geral/` + cabeçalho das subpastas de unidade (entradas novas) e `caixa-de-entrada/PEDIDOS_DO_ESCRITORIO.md` (saídas em aberto).
7. `cadastro/INDICE-CAIXAS.md` (para saber das caixas dos projetos sem montá-los).
8. **CASACO (§1.5, D137) — passo OBRIGATÓRIO antes de executar:** após surfaçar a agenda, **pergunte ao MOU qual TEMA** trabalhar (com recomendação, D40) e **vista o casaco** = leia o ponto único do tema (`processos/CASACO-POR-TEMA.md` → `portfolio/<u>/MAPA-DA-UNIDADE.md` ou o dossiê) + `caixa-de-entrada/<tema>/`. NÃO saia executando sobre um tema sem o casaco. (Antes este passo só vivia no §1.5 fora da sequência numerada — A-210.)
8.5. **VERIFICAR MONTAGEM/ESCOPO ANTES DE OFERECER AÇÃO DE PROJETO (V-VERIFICAR-MONTAGEM, MOU 2026-06-29).** Antes de oferecer QUALQUER ação que toque um repo de projeto (co-montar, editar, rodar playbook, "eu faço X no repo Y"), CONFIRME que o repo está montado E no escopo de GitHub desta sessão. Não está montado / fora do escopo → você **NÃO pode** agir; ofereça apenas o que cabe ao escritório (PREPARAR prompt de lançamento na `caixa-de-saida/para-<u>/`, depositar laudo). Erro a não repetir: oferecer co-montar AVC/PU/Keepee quando só `escritorio-do-mou` estava montado (MOU: "não pode sair oferecendo o que não pode fazer").
9. **Se há sinal de problema, escolha a auditoria certa:** `processos/AUDITORIAS.md` §"Árvore de decisão" (A-211) diz qual rodar.
10. AO FECHAR: `python3 processos/fechar-instancia.py` (GATE — "declarei feito" ≠ "gate verde").

## §3 — Chapéu ORQUESTRADOR DE PROJETO — ordem fixa (vale para qualquer projeto)
> **Padronização A-114/A-113 (auditoria 2026-06-24):** TODO repo de projeto/unidade/hub do portfólio agora tem (a) `CLAUDE.md` na raiz — o único arquivo que o harness auto-lê; (b) `.claude/settings.json` com **deny anti-escrita-no-escritório** (e anti-`keepee-facilities` onde lê o DEV) — D104/D29 viraram MECANISMO, não prosa; (c) `.claude/hooks/ignicao-projeto.sh` (SessionStart) que **surfaça o handoff canônico do repo no boot**. O nome do handoff varia por projeto (START-HERE / ESTADO / HANDOFF-… / HANDOFF-ULTIMO / PROXIMA-INSTANCIA) — o que NÃO varia mais é que o **hook o surfaça automaticamente**. A antiga cláusula "ou o equivalente nomeado" não é mais brecha: o hook é a fonte única de "qual handoff ler".
1. `<projeto>/CLAUDE.md` (constituição do projeto — auto-lido pelo harness).
2. Hook de boot do projeto `.claude/hooks/ignicao-projeto.sh` (SessionStart — surfaça o handoff canônico; instalado em todos por A-114).
3. O **handoff canônico que o hook surfaçou** (delta da última sessão). É o nome próprio do projeto; o hook diz qual é.
4. `<projeto>/PENDENCIAS.md` / `BACKLOG` do projeto (estado vivo) — quando existir.
5. `<projeto>/DO_ESCRITORIO.md` (diretrizes do escritório a aplicar, sob gate D21).
6. `<projeto>/caixa-de-entrada/do-escritorio/` (depósitos novos do escritório — naming SSOT v2/D143; quando a estrutura existir).
7. `<projeto>/CODEX-DO-PROJETO.md` ou equivalente (doutrina/codex específico).
8. Estado vivo (`MANIFESTO.json` / dashboards do projeto).
9. `<projeto>/caixa-de-saida/para-escritorio/` (o que você manda ao escritório — naming SSOT v2; substitui o antigo `PARA_ESCRITORIO.md`).
- **Guardrails (D104):** NÃO escreve no escritório (DECISOES/ESTADO/AGENDA/painel/processos) nem toca o Drive; o que for para o escritório vai por depósito na `caixa-de-entrada/<unidade>/` do escritório.

## §4 — Chapéu SUB-INSTÂNCIA EXECUTORA (lane/tarefa) — ordem fixa
1. O **briefing auto-contido** que te trouxe (ex.: a seção do seu pedido em `caixa-de-entrada/PEDIDOS_DO_ESCRITORIO.md`, ou o handoff da lane).
2. Apenas os ponteiros que o briefing cita (não vá além do escopo).
3. NÃO lê `CLAUDE.md`/`MAESTRO.md` do escritório como identidade — não é o seu chapéu (respeita D56: só o maestro com a caneta escreve o canônico).
4. Ao terminar: deposita relatório de contexto total na `caixa-de-entrada/` (subpasta certa) para o maestro consumir pela TRIAGEM.

## §5 — Variante SESSÃO-ESCRITÓRIO-SYNC (modelo de caixas v2 — DE-39) — frase de disparo: "rode o sync de caixas"
> É o chapéu MAESTRO em modo sincronizador. O MOU monta o escritório + os repos dos projetos a sincronizar.
1. Boot normal do maestro (§2) — você tem a caneta.
2. **Monte os repos a sincronizar** (escritório + ≥1 projeto). Os não-montados ficam `[NÃO-VERIFICADO]` no gate de manifesto.
3. **Sync — rode o motor:** `python3 processos/sync-caixas.py` (dry-run) e depois `--execute`. Ele faz o ciclo do `PROTOCOLO-DE-CAIXAS §3`: lê `<projeto>/caixa-de-saida/`; `para-escritorio/*`→`caixa-de-entrada/<slug>/` do escritório; `para-<outro>/*`→`<outro>/caixa-de-entrada/de-<origem>/` (se montado; senão `[PENDENTE-ENTREGA]`); move lidos→`caixa-de-saida/processados/` do projeto. Projeto do manifesto NÃO montado = `[NÃO-VERIFICADO]` (sem falso-verde). Diretrizes novas do escritório→`<projeto>/caixa-de-entrada/do-escritorio/` (à mão). `pull --rebase` antes do push em cada repo.
4. **Deny da sessão-sync:** o escritório só escreve `<projeto>/caixa-de-entrada/**`; tocar fora disso = pedido explícito+ordenado do MOU + riscos listados (defense-in-depth honesto — shell fura).
5. **Fechar:** `python3 processos/fechar-instancia.py` — FALHA se sobrou `caixa-de-saida/` de projeto montado não-sincronizada OU projeto do manifesto não-montado (`[NÃO-VERIFICADO]`, não falso-verde).
> **Estado (2026-06-27):** o MODELO está NORMATIVO-VIGENTE; o MOTOR de sync (passos 3-5 mecanizados) ainda é manual — **piloto SBA em curso** (DE-39). Não vender como automático até provar 2×.

## §6 — Variante SESSÃO-ESCRITÓRIO-REGULARIZA-PROJETO (MOU 2026-06-28) — frase de disparo: "regulariza o projeto X" / "roda o playbook de arrumação"
> O chapéu MAESTRO entra NO projeto co-montado para arrumá-lo numa passada (padroniza + instala trilho PUXAR + limpa lixo).
> Ordem do rollout: **PU → Keepee → AVC → bitsuki → Atlas → Profinders → SBA (por último)**.
1. Boot normal do maestro (§2) — você tem a caneta. Monte o repo do projeto + o escritório.
2. **Rode o `processos/PLAYBOOK-ARRUMACAO-PROJETO.md`** (Fases 0→4): padronizar (trilho + checklist D130) · limpar lixo (**PRs + branches velhas** + docs→_legado + Drive + órfãos) · governança/saúde (D133 + Supabase advisors + CI + AS-BUILT) · laudo na caixa.
3. **Guarda-rail:** o escritório arruma org/docs/branches/Drive/governança — NÃO código de produto nem decisão de negócio (vira laudo na caixa). Branch/atribuído/sob o gate do projeto (D38/D21).
4. **Fechar:** gate dos 2 lados; consolidar ao main (PR+API, D147); mini-laudo na `caixa-de-entrada/<u>/`.

## Registro dialético
- **TESE:** ordem fixa por chapéu = instância nova produz valor sem gastar contexto procurando o que ler.
- **ANTÍTESE:** ordem pode envelhecer se a estrutura mudar (ex.: nome de arquivo de handoff varia por projeto).
- **CONCILIAÇÃO (provisória):** §3 usa "ou equivalente nomeado" para tolerar variação; o hook de boot surfa o essencial automaticamente, então a ordem é rede de segurança, não única fonte.
- **VACINA:** não duplicar o conteúdo do `CLAUDE.md §"Como retomar"` aqui — este arquivo é o MÉTODO por chapéu; o CLAUDE aponta para cá. Se divergirem, o CLAUDE manda na identidade e este detalha a ordem.
