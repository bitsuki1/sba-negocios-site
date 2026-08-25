# Corpo de processos herdado do Escritório do MOU
> **Índice + rastreabilidade** do que foi trazido do `escritorio-do-mou` para este repo em 2026-08-22, por **ordem viva do MOU** ("chame o maestro do escritório e peça para incorporar toda governança de projeto aqui nesse repo do site"). Curadoria feita pelo orquestrador do `sba-site` (chapéu D104) via **estratégia HÍBRIDO/PUXAR** (MOU 2026-06-28) — o repo puxa o que precisa em vez de esperar o escritório empurrar.
> **A CARTA formal** deste pedido vive em `caixa-de-saida/para-escritorio/2026-08-22_sba-site_pedido-corpo-processos.md` — SSOT do pedido; o maestro do escritório vê ao próximo co-monte e homologa/complementa se necessário.

## Regra de manutenção (D111 — codex dos processos)
- **Cada cópia carrega cabeçalho ⧉** (desde 2026-08-25): a 1ª linha de todo arquivo herdado diz que é cópia de leitura, aponta o SSOT no escritório e a data da puxada. Sem isso ninguém distingue original de cópia daqui a um mês (modo de falha vacinado pelo E-055).
- **Não editar aqui.** Todo arquivo abaixo é **cópia 1:1** do escritório na data indicada. Se você achar que precisa mudar, edite no **escritório** (via `caixa-de-entrada/PEDIDOS_DO_ESCRITORIO.md` do PMO) e depois republique aqui — o SSOT do processo é do escritório, não do sba-site.
- **Reconciliação recomendada:** a cada 30 dias (ou quando o escritório sinalizar mudança material em `MELHORIAS-A-REDISTRIBUIR.md`), rodar um diff destes arquivos contra a fonte no escritório e trazer a atualização em bloco (1 commit "reconciliar processos herdados AAAA-MM-DD").
- **O que NÃO foi trazido, por decisão de curadoria** (fica como PONTEIRO — leitura no repo co-montado):
  - `processos/AUDITORIA-TRIPLO-LIMPO.md` (31KB) — método pesado de auditoria por convergência de lentes. Overkill para site institucional; se algum dia precisar, leio no escritório.
  - `processos/PROTOCOLO-AUDITORIA-ENCERRAMENTO.md` (13KB) — para fechar ONDA de múltiplas instâncias paralelas. Não é o padrão deste repo.
  - `referencia/CODEX-DOS-PROCESSOS.md` (69KB!!) — é o codex do escritório; leio in-place, não copio.
  - `referencia/GLOSSARIO.md` (25KB) — jargão do portfólio como um todo; leio in-place.
  - `.claude/agents/bibliotecario` (cuida da biblioteca do PMO) e `inventariante` (só serve na ENTRADA; passou).
  - `.claude/skills/` do escritório — quase todos apontam para o próprio repo do escritório; não fazem sentido no sba-site.

## Índice do trazido (2026-08-22)

### `processos/`
| arquivo | tamanho | de onde veio | por que serve aqui |
|---|---|---|---|
| `PROTOCOLO-HANDOFF-SEM-PERDAS.md` | 11KB | `escritorio-do-mou/processos/` | **D66** — fecho de uma frente/sessão garantindo que nada se perca. Vale sempre que eu terminar uma onda de trabalho aqui. |
| `IGNICAO-PADRAO.md` | 11KB | `escritorio-do-mou/processos/` | **D109** — ordem de boot por chapéu; ancora o §6 do meu `CLAUDE.md` e me lembra o passo-a-passo em qualquer sessão. |
| `CASACO-POR-TEMA.md` | 4KB | `escritorio-do-mou/processos/` | **D137** — chapéu (papel) × casaco (tema). Aqui o repo é mono-tema (o site), mas a doutrina orienta como trocar de frente sem trocar de identidade. |
| `PADRAO-DE-REPO.md` | 10KB | `escritorio-do-mou/processos/` | SSOT do padrão de repo (nomenclatura, kit-clone, gates). Referência ao meu `SELO.md` e ao meu `CLAUDE.md`. |
| `PADRAO-OURO-MAPA-DE-PENDENCIAS.md` | 8KB | `escritorio-do-mou/processos/` | Evolução curada do padrão D172 do mapa (o "padrão-ouro" — o que amadureceu). Complementa o `TEMPLATE-MAPA-DE-PENDENCIAS.md`. |
| `PLAYBOOK-ARRUMACAO-PROJETO.md` | 6KB | `escritorio-do-mou/processos/` | Playbook do MOU 2026-06-28 — "regulariza o projeto X". Se você me pedir "arruma o sba-site", eu sigo isto. |
| `POLITICA-VIGENCIA.md` | 6KB | `escritorio-do-mou/processos/` | Regra viva vs. legado — fundamental para o agnosticismo. Antes de reafirmar qualquer regra, verifico se não está aposentada em `APOSENTADORIAS.md` do escritório. |
| `PREVENCAO-DE-PERDAS.md` | 10KB | `escritorio-do-mou/processos/` | 9 modos de falha do escritório + comissão M-57. Vale como cheklist quando eu for escrever ata/handoff/mapa aqui. |
| `MATRIZ-ADMISSAO-LICOES.md` | 3KB | `escritorio-do-mou/referencia/` | **A-209** — onde cada lição mora (codex E-NN, aprendizado V, modo-de-falha F, achado A). Entrada única para eu não perder aprendizado. |
| `templates/TEMPLATE-MAPA-DE-PENDENCIAS.md` | 7KB | `escritorio-do-mou/processos/templates/` | O template do mapa D172, para eu reusar sempre que o mapa evoluir de versão. |

### `.claude/agents/` (subagentes agora disponíveis nesta sessão)
| agente | de onde veio | quando invocar |
|---|---|---|
| `documentador.md` | `escritorio-do-mou/.claude/agents/` | Captura/atualiza estado sem compressão; se um dia eu precisar mapear TUDO que existe neste repo em detalhe, invoco. |
| `escrutinador.md` | `escritorio-do-mou/.claude/agents/` | **D108** — auditor adversarial anti-self-audit. Se você pedir "audite o que fizemos aqui", NUNCA me auditarei sozinho — invoco o escrutinador. |
| `curador.md` | `escritorio-do-mou/.claude/agents/` | Vigia de drift do padrão. Depois de mudanças materiais, roda para dizer "o repo segue no padrão?". |

### `.claude/rules/` (regras modulares — lidas no boot de toda sessão)
> **Reconciliado em 2026-08-25** (a cópia de 22/08 tinha 3 regras + README; o escritório passou a ter 5 + README).

| regra | de onde veio | o que trava |
|---|---|---|
| `README.md` | `escritorio-do-mou/.claude/rules/` | Índice das regras ativas. |
| `linguagem-e-ferramentas.md` | idem | **D159** português nas superfícies humanas · **D160** ferramentas de todos. |
| `ordem-normativa.md` | idem | **C36** hierarquia (MOU > constituição > regras > decisões > processos > scripts) · **C120** régua do rótulo "SSOT". |
| `nomenclatura-repos.md` | idem | **D186** padrão `<unidade>-<projeto>-<tipo>` (a base da pendência V1 do mapa). |
| **`instanciacao-por-repo.md`** 🆕 | idem (puxada 25/08) | **D201** — hub/site/app NÃO se co-monta com o repo de NEGÓCIO da unidade dona. É a regra que explica por que esta sessão **não** co-monta `sba-unidades-de-negocios`. |
| **`decisao-e-alcada.md`** 🆕 | idem (puxada 25/08) | **D203** decisão do dono em caixa de clique · **D202** classes de alçada A/B/C (o que a instância decide sozinha). |
| **`regua-de-admissao.md`** ⚠️ | **fonte inexistente** — escrita local a partir da ordem viva de 25/08 | Só sobe ao mapa do **DONO** o que trava 2+ casas ou é regra para todas. **Achado A-453** (ver abaixo). |

> **⚠️ Achado A-453 (2026-08-25) — regra sem arquivo-fonte.** A ordem de abertura mandou puxar `escritorio-do-mou/.claude/rules/regua-de-admissao.md` afirmando que o escritório tem **6** regras. **Medição:** a `main` do escritório tem **5 regras + README**, e o próprio `README.md` de lá lista as 5 — o caminho devolve **404**. A substância da régua veio **verbatim na ordem** (ordem viva do dono = C36 nível 1, acima de qualquer arquivo), então foi lavrada aqui como **regra local de espelho**, com o cabeçalho declarando a anomalia. **Ação do escritório:** lavrar o arquivo-fonte; quando existir, esta cópia vira 1:1.

### Estrutura de caixas (D144 — o canal de comunicação com o escritório)
- `caixa-de-saida/para-escritorio/` — onde deposito CARTAS ao PMO (o maestro carrega no próximo co-monte).
- `caixa-de-entrada/do-escritorio/` — onde chegarão diretrizes do PMO para este repo aplicar.
- `caixa-de-entrada/processados/` — para onde vão as diretrizes já aplicadas (rastro).

## O que o CLAUDE.md deste repo passou a apontar (§8)
Este arquivo é referenciado no `CLAUDE.md` §8 ("Corpo de processos herdado do Escritório do MOU"). Uma sessão nova neste repo agora tem, à mão, o mesmo corpo de trabalho que uma sessão no escritório — sem duplicar SSOTs (o dono continua sendo o escritório para todo processo aqui listado; este repo é USO/apricador).
