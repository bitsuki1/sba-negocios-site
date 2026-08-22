# PADRÃO DE REPO — os 3 mecanismos obrigatórios em todo repo do portfólio

> **Vigência:** ATIVO desde 2026-06-24 (auditoria profunda do meta-processo — A-112/A-113/A-114). SSOT do padrão de estampagem de repo.
> **Por que existe:** a auditoria 2026-06-24 achou que metade do portfólio bootava sem identidade, sem trava anti-contaminação e sem surfaçamento de handoff. As regras (D104/D29/D116/D120/D139) eram PROSA; viraram MECANISMO. Este doc é o checklist do que TODO repo tem de ter — para que "todos tenham padrão" não dependa de memória.

## §0 — CONSTELAÇÃO DA PADRONIZAÇÃO = O PADRÃO DO PROJETO (entrada única — começe AQUI)
> **Este §0 é a ENTRADA ÚNICA do "padrão de trabalho do projeto"** (A-205, MOU 2026-06-27): "o que TODO projeto precisa ter" não está espalhado sem dono — está mapeado aqui, **cada item seu EIXO** (não são duplicatas — mesma lógica do A-002 para os 3 mapas). Em dúvida sobre "onde mora a regra de X", **este mapa manda**.

| Pergunta | SSOT |
|---|---|
| Quais **MECANISMOS** todo repo precisa ter (estampagem de boot)? | **este doc** (`PADRAO-DE-REPO.md`) — os 3+1 |
| **CHECKLIST DE QUALIDADE** (o que a auditoria roda em cada unidade) — **CANÔNICO** | `ONBOARDING-E-CHECKLIST-QUALIDADE.md §2` (15 itens) |
| **TEMPLATES PRONTOS (kit-clone)** — colar num repo novo sem reimplementar na mão | `processos/templates/` (`CLAUDE-projeto.md` · `DO_ESCRITORIO-projeto.md` · `settings-projeto.json` · `ignicao-projeto.sh`) |
| **Taxonomia** ESCRITÓRIO/UNIDADE/USO (D128)? | `ONBOARDING-E-CHECKLIST-QUALIDADE.md §0` (espelho: `MAPA-DO-PORTFOLIO`) |
| Que **CÉREBRO** depositar sem colidir + área-trabalho×produto? | `IDENTIDADE-NOS-PROJETOS.md` (FUN-001..006 + D120) |
| Trazer um projeto **AO padrão** (onda/**placar**, não checklist concorrente)? | `CAMPANHA-ADEQUACAO-360.md` (motor = este doc + D141) |
| **Topologia/termos** (escada elástica)? | `ESTRUTURA-E-TERMOS.md` (D73/D142) |
| Como uma melhoria **DESCE** (beta) + propagação? | `MELHORIAS-A-REDISTRIBUIR.md` (D121) |
| Onde **MORA cada LIÇÃO** (vacina/codex/modo-de-falha/achado)? | `referencia/MATRIZ-ADMISSAO-LICOES.md` (A-209) |
| Onde ficam os **achados**? | `ACHADOS-DE-AUDITORIA.md` (D108) |
| Como funcionam as **CAIXAS** (projeto↔escritório↔projeto)? | `COMO-FUNCIONAM-AS-CAIXAS.md` (D144) |

> ⚖️ **RECONCILIAÇÃO ONBOARDING §2 × CAMPANHA §3 (A-205):** o **checklist CANÔNICO de qualidade é `ONBOARDING-E-CHECKLIST-QUALIDADE.md §2`** (é o que a auditoria do escritório RODA, D130). O `CAMPANHA-ADEQUACAO-360.md` é o **placar/onda** (quem já foi adequado), **não** um checklist concorrente — em divergência de itens, **§2 do ONBOARDING manda**. (Fecha o "padrão não é UNO".)

> 🛡️ **VACINA ANTI-DRIFT (regra-mãe da auditoria 2026-06-27):** ao lavrar decisão que muda TIPO/ESTADO de uma entidade **OU** encerra uma DE, **varrer e atualizar TODOS os docs dependentes no MESMO commit** (foi o furo: D129/DE-12). A virada Atlas (D146) foi o 1º teste — varreu D129/D117/MAPA/DE-40/pastas juntos. Candidata a trava no `fechar-instancia.py`.

## Nomenclatura de repo — o SUFIXO diz o tipo (D186, MOU 2026-08-21) — **SSOT do padrão de nome vive AQUI**
> **REVISADO 21/08 (dono, com a AVC): a RAIZ vem PRIMEIRO — `<unidade>-<projeto>-<tipo>`, ex. `avc-sampa-valley-site`.** Regra de boot espelho: `.claude/rules/nomenclatura-repos.md`.
> O dono cravou (21/08): *"padrões de repos de sites… quando for app, deve ter o nome app… um padrão que deve ficar no escritório ou no portfolio-automacoes."* **Decisão: o SSOT do padrão fica no ESCRITÓRIO (esta seção) — é norma de governança (C36); o hub `portfolio-automacoes` carrega só um PONTEIRO para cá (discoverabilidade, já que é co-montado sempre — D162).**

| tipo (taxonomia D128) | sufixo | exemplo |
|---|---|---|
| Unidade de negócio | `-unidade-de-negocios` | `avc-unidade-de-negocios` |
| Auxiliar ferramenta/integração | `-aux` | `bitrix-aux` |
| **Site** (institucional/landing/deck) | **`<unidade>-<nome>-site`** | `avc-sampa-valley-site` · `rotary-roteiro-site` |
| **App** (aplicação com login/estado) | **`<unidade>-<nome>-app`** | `avc-alianca-app` |
| Plataforma (SaaS maior) | `-plataforma` | (extensão; confirmar caso a caso) |

**Aplicação GRADUAL** (o dono renomeia aos poucos, unidade a unidade). **O dono ACEITA a quebra do rename e manda arrumar os ponteiros** (postura decisiva, D106-like) — logo o protocolo não é "evitar renomear", é **"renomear e a onda varre/conserta tudo atrás no mesmo commit"** (E-055): (1) se for espelho Lovable/Base44 e a sincronia quebrar, reconectar/consertar e reportar — nunca deixar o site fora do ar em silêncio; (2) grep do nome antigo em TODAS as superfícies vivas e corrigir; (3) sessões novas montam o nome novo. Ponteiro não-corrigido = 404 (A-AVC-AUD-2).

## Os 3 mecanismos (obrigatórios em todo repo de UNIDADE/HUB; USO tem variante)

1. **`CLAUDE.md` na raiz** — o ÚNICO arquivo que o harness do Claude Code auto-lê no boot. Sem ele, a instância nasce sem identidade. Conteúdo mínimo (modelo: `keepee-unidade-de-negocios/CLAUDE.md`, template-piloto): §1 Identidade e chapéu (tipo D128 + quem é + regra D104) · §2 Doutrina herdada (espelho do escritório) · §3 Topologia · §4 Estado vivo (ponteiro ao handoff canônico) · §5 Canal D44. Se a lei do projeto vive noutro arquivo (`AGENTS.md`), o CLAUDE.md APONTA para ele.

2. **`.claude/settings.json` com `deny` anti-contaminação** — D104/D29 viram trava, não memória (D71):
   - SEMPRE: `Edit/Write/MultiEdit(**/escritorio-do-mou/**)` — orquestrador não escreve no PMO (D104).
   - Onde lê o DEV: `Edit/Write/MultiEdit(**/keepee-facilities*/**)` (D29/D119) — **exceto a Keepee**, que é a dona do toque.
   - Registra também o `SessionStart` hook (item 3).

3. **`.claude/hooks/ignicao-projeto.sh` (SessionStart)** — surfaça no boot a identidade + o handoff canônico do repo + pendências. O NOME do handoff varia por repo (START-HERE / ESTADO / HANDOFF-… / HANDOFF-ULTIMO / PROXIMA-INSTANCIA); o que NÃO varia é que o hook o surfaça. Template: `processos/templates/ignicao-projeto.sh`.

4. **Registro de instância + ata (MOU 2026-06-25)** — todo repo tem `REGISTRO-DE-INSTANCIAS.md` (raiz ou `processos/`) que o hook de boot AUTO-ESTAMPA (data+branch+HEAD+chapéu provável) para CONTAR instâncias e rastrear chapéu — instância perdida deixa linha ABERTA órfã. A 1ª ação da instância CONFIRMA o chapéu + escreve o objetivo. A **ata** (`ATA-VIVA-SESSAO.md` ou equivalente) acumula o que o MOU disse + o que a instância fez. Mecanismo > memória (D71). (Detalhe no `processos/REGISTRO-DE-INSTANCIAS.md` do escritório, que é o modelo.)

## Variante para repo de USO (Tipo=USO, D128 — sites Lovable, git=SSOT)
- `USO.md` na raiz (cartão de identidade: tipo USO, dono, "git é SSOT via Lovable").
- Regra anti-rebase/force-push no `USO.md` (reescrever história publicada quebra o sync Lovable e perde histórico).
- NÃO criar `.claude/` (o Lovable é o editor; evitar interferência).

## Como verificar (DoD)
- `ls <repo>/CLAUDE.md` (ou `USO.md` em repo de USO).
- `python3 -c "import json;json.load(open('<repo>/.claude/settings.json'))"` + confirmar bloco `deny`.
- `bash -n <repo>/.claude/hooks/ignicao-projeto.sh` + bit de execução.

## Estado em 2026-06-24 (pós-campanha de padronização)
CLAUDE.md, deny e hook estampados em: SBA · Profinders · bitsuki · Keepee · AVC · OnSuite · Potencial Urbano. USO.md+anti-rebase em: centro-cresce · centro-alianca-hub · preview-pal-66. **Todo repo NOVO entra por este padrão na ENTRADA (D24)** — não é opcional.
> ⚠️ **Estado DECLARADO, não re-verificado por artefato neste doc (A-171, 2026-06-27).** A prova por repo (`ls CLAUDE.md` + `json.load(settings.json)` + `bash -n hook`) está nos relatórios de sessão `processos/_historico/auditoria-profunda-2026-06-24.md` (estampagem) e, para o OnSuite, `processos/_historico/auditoria-padronizacao-2026-06-27.md`. **Cada onda RE-VERIFICA** — "estampado" sem re-conferência ao vivo é declaração, não garantia (D83).

## Registro dialético
- **TESE:** padrão uniforme de 3 mecanismos por repo elimina "cada orquestrador improvisa o boot".
- **ANTÍTESE:** padronizar pode virar cerimônia (D15) se inflar.
- **CONCILIAÇÃO (provisória):** os 3 são o mínimo que JÁ causou dor real (boot cego, contaminação, handoff perdido) — não é simetria por simetria.
- **VACINA:** doc de identidade em nome que o harness não lê (só `AGENTS.md`, sem `CLAUDE.md`) = identidade ausente na prática. Guardrail em prosa sem deny = memória, não mecanismo.

## §Desenvolvimento — a unidade planeja, o repo-app/site desenvolve (D195, MOU 2026-08-22)
Fronteira dura do portfólio: **DESENVOLVIMENTO × PLANEJAMENTO**.
- **Unidade de negócio** (`-unidade-de-negocios`) = PLANEJA (visão, roadmap, decisões, negócio). **Não desenvolve, não guarda código.**
- **Repo-app/site** (`<unidade>-<projeto>-site`/`-app`, `profinders-hub`…) = DESENVOLVE, com **VIDA PRÓPRIA** (instanciável sozinho: CLAUDE.md próprio + gate + governança). A unidade escreve nele só por **API/caixa** (tarefa/doc), **nunca** dev.
- **CLAUDE.md obrigatório em todo repo-app** — declara: *sou o app/site X da unidade Y · EU desenvolvo · a unidade só planeja e me manda tarefa/doc por API/caixa · git = espelho do builder (não desconectar/reconectar).*
- **EXCEÇÃO ÚNICA — Atlas:** planeja E manda ao OnSuite (dev em `keepee-facilities`), pois não há repo-app com governança própria na org de código keepee (D187/D119).
- Modelo replicável da separação: `profinders-unidades-de-negocio/SEPARACAO-HUB-E-NEGOCIOS.md` ("aqui mora o negócio, lá mora a ferramenta").
