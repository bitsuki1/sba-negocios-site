> ⧉ **CÓPIA DE LEITURA** do `escritorio-do-mou` — **SSOT lá** (`escritorio-do-mou/processos/PROTOCOLO-HANDOFF-SEM-PERDAS.md`); puxada em **2026-08-22**. Não editar aqui: mudança se faz no escritório e se republica (regra em `processos/HERDADO-DO-ESCRITORIO.md`).

# PROTOCOLO DE HANDOFF SEM PERDAS
> **Vigência:** ATIVO — processo/referência vivo do escritório. Revisar sob mudança material; mover a `_legado/` se aposentado.
> Processo do Escritório do MOU — **aplica-se a TODOS os projetos do portfólio** (D23).
> Nasceu da dor real da sessão M-26 (2026-06-19): o handoff vazou 3 vezes seguidas. Aqui está por que vazou e como não vazar mais.

## 0. A dor (a experiência que gerou isto)
Na sessão M-26, declarei "gravado / tudo limpo / nada ficou de fora" **três vezes**, e a cada vez o MOU achou algo esquecido.
O esforço estava lá; o **método de fechamento** é que era furado. Causas-raiz (viram VACINAS):

- **EF-H1 — git-limpo ≠ registrado.** Usei "não há arquivo não-commitado" como prova de "está tudo gravado". É FALSO: um
  documento **commitado porém DESATUALIZADO** passa no git-clean. O `PENDENCIAS.md` da Keepee ficou 3 dias velho e "limpo".
- **EF-H2 — atualizei só o lado que eu estava editando.** Toquei as superfícies "quentes" (as que eu já tinha aberto) e
  esqueci as superfícies de **retomada do OUTRO leitor** — os canais do PROJETO (`PENDENCIAS.md`, `DO_ESCRITORIO.md`) que um
  orquestrador que monte SÓ aquele repo lê. Não tinha um **mapa** de todas as superfícies.
- **EF-H3 — handoff reativo, não um passe completo.** Fui remendando o que o MOU apontava, em vez de rodar UMA vez um
  fechamento completo até o fim.
- **EF-H4 — achado órfão (sem fan-out).** Um achado novo (C8/C9) gera obrigações em 4–5 superfícies; eu tocava 1 e seguia.

## 1. O princípio
**O estado tem que viver em TODAS as superfícies de memória — não só na que eu calhei de editar.** A conversa é descartável
(CLAUDE.md); se uma superfície de retomada não reflete o estado, ela **MENTE** para quem abrir por ela. Handoff de qualidade
= qualquer porta de entrada conta a MESMA história atual.

## 2. Definition of Done (o proxy CERTO)
O handoff está pronto **NÃO** quando o `git status` está limpo. Está pronto quando, para **cada** superfície do Mapa (§3):
1. ela carrega a **data de hoje** OU o **marco mais recente** da sessão; e
2. ela aponta (ou não contradiz) o **ponto único de entrada** (o HANDOFF do tema); e
3. a **verificação mecânica (§6) está VERDE**; e
4. SÓ ENTÃO: `git add/commit/push` **e FF da `main`** até a branch de trabalho (`main` == estado atual). **git-clean é o ÚLTIMO passo, não a prova.**

## 3. MAPA DAS SUPERFÍCIES DE MEMÓRIA (D24 aplicado ao handoff — enumerar antes de fechar)
Uma sessão co-montada tem DOIS leitores possíveis; ambos os lados têm que estar atualizados.

### Lado ESCRITÓRIO (quem monta o escritório)
| Superfície | Quando tocar |
|---|---|
| `ESTADO_IMPLANTACAO.md` (PRÓXIMO / TOPO AGORA) | sempre — é o ponto de retomada nº1 |
| `AGENDA_MOU.md` | quando há pendência/decisão que depende do MOU (surfaçada por hook no boot) |
| `DECISOES.md` | quando há decisão nova (D-x) |
| `portfolio/BLOQUEIOS-REMOVIDOS.md` | quando algo foi DESTRAVADO ou ARMADO |
| `caixa-de-entrada/` · `caixa-de-saida/` | quando houve pedido recebido / diretriz emitida |

### Lado PROJETO (quem monta SÓ o repo do projeto) — ⚠️ **o lado que eu esqueci**
| Superfície | Quando tocar |
|---|---|
| `<projeto>/PENDENCIAS.md` (raiz) | sempre que o estado/foco do projeto muda |
| `<projeto>/DO_ESCRITORIO.md` (raiz) | diretriz nova + a tabela "onde ver o estado vivo" (ponteiros) |
| a **SÍNTESE viva** do tema quente (ex.: `SINTESE-CONCILIACAO.md`) | quando há achado/rodada nova |
| o **CODEX/manual + o HANDOFF** do subsistema | quando há capacidade/conexão/diagnóstico novo (ponto único de entrada técnico) |

> Cada projeto declara suas superfícies num arquivo **`HANDOFF-SURFACES.txt`** na raiz (lista de caminhos), para o
> verificador (§6) saber o que conferir. Replicar este arquivo é parte de entrar/manter um projeto.

### ⚠️ SUPERFÍCIES OBRIGATÓRIAS (a lista mínima — esquecidas na M-26, viraram regra EF-H5)
O manifesto de TODO repo **tem que** incluir, no mínimo, estas — além das específicas do tema:
- **Escritório:** `ESTADO_IMPLANTACAO.md`, `AGENDA_MOU.md`, `DECISOES.md`, `portfolio/BLOQUEIOS-REMOVIDOS.md`,
  **`cadastro/PROJETOS.md`** (o painel — a data do projeto vive aqui, MANUTENCAO §3), **`portfolio/<proj>/MAPA-DA-UNIDADE.md`**
  (o dossiê PMO da unidade), **`caixa-de-saida/README.md`** (índice de diretrizes D44), **`portfolio/MAPA-DO-PORTFOLIO.md`** (SSOT do que existe e ONDE — atenção ao ponteiro de BRANCH) e **`portfolio/ROADMAP-DO-PORTFOLIO.md`** (trajetória).
- **Projeto:** **`PENDENCIAS.md`**, **`DO_ESCRITORIO.md`**, **`INDICE.md`** (o manifesto "tudo que existe", D24), a SÍNTESE viva
  do tema, e o CODEX/HANDOFF do subsistema.
> Por que regra: na M-26, mesmo com o verificador VERDE, ainda faltavam `PROJETOS.md`, o dossiê `portfolio/keepee/`, a
> `caixa-de-saida/` e o `INDICE.md` — porque NÃO estavam no manifesto. **O verificador só prova o que você listou** (EF-H5).

## 4. MATRIZ DE FAN-OUT (evento → superfícies que DEVEM ser tocadas)
Quando acontecer um destes, toque TODAS as superfícies da linha **no mesmo fechamento** (não depois):

| Evento na sessão | Superfícies obrigatórias |
|---|---|
| **Achado novo (C-x)** | SÍNTESE + ESTADO + PENDENCIAS(projeto) + AGENDA(se depende do MOU) + MELHORIAS(se vira sugestão de sistema) |
| **Decisão nova (D-x)** | DECISOES + ESTADO + DO_ESCRITORIO(se afeta o projeto) |
| **Bloqueio removido / armado** | BLOQUEIOS-REMOVIDOS + ESTADO |
| **Pendência que depende do MOU** | AGENDA_MOU + ESTADO |
| **Capacidade/conexão/diagnóstico técnico novo** | CODEX/HANDOFF + DO_ESCRITORIO(tabela de ponteiros) + PENDENCIAS |
| **Fim de sessão** | TODAS revistas pelo checklist §5 + verificação §6 |

## 5. CHECKLIST DE FECHAMENTO (rodar ATÉ O FIM — não parcial, EF-H3)
1. **Releia a conversa inteira** e liste tudo que a sessão PRODUZIU, DECIDIU, ACHOU, e o que ficou PENDENTE do MOU.
2. Para cada item, aplique a **matriz de fan-out (§4)** — toque cada superfície obrigatória.
3. Garanta **UM ponto único de entrada** (HANDOFF do tema) e que o primeiro-arquivo-lido de **cada lado** aponte pra ele.
4. Atualize a **DATA** ("Atualizado: AAAA-MM-DD") de cada superfície de retomada tocada.
5. **Rode a VERIFICAÇÃO (§6).** Conserte o que ela apontar. Repita até verde.
5-bis. **Higiene da escada/agenda (anti-drift recorrente EC2-001 — auditoria 2026-06-19):** confira que (a) o **resumo de
   D-números** no `ESTADO`/doutrina cobre o ÚLTIMO `D` do `DECISOES.md` (nada de "D1–DXX" defasado); (b) nenhum **aprendizado
   que JÁ RECORREU** ficou órfão em `APRENDIZADOS.md` sem subir a escada (D18); (c) **toda pendência que depende do MOU está na
   `AGENDA_MOU.md`** (não FORA dela — ponto cego do objetivo O5). É a contramedida do drift "resumo de decisões envelhece / regra fica órfã / pendência some da agenda". (Contexto geral da Regra de Convergência e do beta contínuo: `MELHORIA-CONTINUA.md §3`.)
6. `git add/commit/push` nos dois repos.
7. **FF da `main` (D66/convenção 2026-06-19):** ao FECHAR a frente, fast-forward `main` → branch de trabalho nos repos (FF limpo, 0 conflito) — a `main` vira o estado pronto que uma instância nova encontra. Confirmar `origin/main == origin/<branch>`. Só então declare o handoff pronto.

## 6. VERIFICAÇÃO MECÂNICA (não confiar na memória)
`python3 processos/verificar-handoff.py <AAAA-MM-DD> <MARCO>` — lê o `HANDOFF-SURFACES.txt` de cada repo e, para cada
superfície listada, confere: (a) contém o **marco** da sessão (ex.: `M-26` ou `C9`); (b) se tem linha "Atualizado:", que seja
a data de hoje. **Sai com código ≠ 0 se alguma superfície estiver defasada.** Regra dura: **handoff só fecha com saída VERDE.**

## 6-bis. ESCRUTÍNIO REPETIDO ATÉ CONSOLIDAR (≥3 passadas — regra do MOU 2026-06-19)
Uma passada NÃO basta: cada varredura revela superfícies que a anterior não olhou (na M-26, a passada 1 achou os canais do
projeto; a 2 achou painel/dossiê/caixa-saída/INDICE; a 3 achou o ponteiro de BRANCH errado no `MAPA-DO-PORTFOLIO` e dados
ao vivo computados-mas-não-salvos). **Regra:** varrer repetidamente — **olhar o que ainda não olhou E reconferir o que já
olhou** — até uma passada fechar **SEM achado novo** (CONSOLIDADO); e então rodar **mais uma** para garantir. **Mínimo 3
passadas completas**, registradas (o que cada passada achou). Só declarar o handoff pronto após a consolidação confirmada.

## 6-ter. MAPA DA VARREDURA (zonas a enumerar — pedido do MOU 2026-06-19)
No fechamento, produzir um **mapa da varredura** marcando cada ZONA como ✓ varrida (com resultado) ou ⬜ não-varrida
(ponto cego DECLARADO + risco + recomendação). Zonas mínimas: **(1)** superfícies de retomada (gate §6); **(2)** datas
defasadas (scan §6/EF-H5); **(3)** ponteiros de BRANCH (estado-atual ≠ histórico); **(4)** hooks/`settings.json`
registrados; **(5)** git limpo/empurrado; **(6)** inventário D24 (untracked/ignorados); **(7)** outros projetos do
portfólio (montados? senão, ponto cego); **(8)** merge para `main` (trabalho preso em branch?); **(9)** `[A VERIFICAR]`/TODO
(incompletudes declaradas); **(10)** fontes externas pendentes; **(11)** higiene da escada/agenda (passo 5-bis: resumo de D-números atual · aprendizado recorrente não-órfão · pendência do MOU na agenda). Exemplo trabalhado: `processos/_historico/VARREDURA-M26-2026-06-19.md`.
**Um ponto cego declarado > um não-declarado** (D24).

## 7. ENFORCEMENT (padrão D65 — mecanismo, não boa-vontade) — PROPOSTO
Recomendação ao MOU: um **Stop-hook** que, se a sessão fez commits em superfícies de memória, **bloqueia o encerramento**
até a verificação §6 sair verde — exatamente como o `na-tela-check.py` (D65) faz com a regra NA TELA. Transforma este protocolo
de "disciplina" em "trilho". (Decisão D66 registra a adoção; o hook entra quando o MOU aprovar.)

## VACINAS (não repetir — EF-H1..H6)
- **EF-H1 — git-clean ≠ registrado.** Documento velho e commitado passa no git-clean. Provar pela verificação §6, não pelo `git status`.
- **EF-H2 — sempre os DOIS lados** (escritório E projeto). O leitor que importa pode ser o que monta só o projeto.
- **EF-H3 — passe completo, não reativo.** Não esperar o MOU apontar o que faltou — rodar o checklist inteiro.
- **EF-H4 — todo achado/decisão faz fan-out** (§4) no mesmo fechamento — nada de achado órfão.
- **EF-H5 — o MANIFESTO é um ponto cego.** O verificador só prova o que está LISTADO em `HANDOFF-SURFACES.txt`. Um handoff
  pode estar "VERDE" e ainda assim ter superfícies esquecidas (M-26: faltavam `PROJETOS.md`, dossiê, `caixa-de-saida`,
  `INDICE.md`). **Contramedidas:** (1) o manifesto inclui SEMPRE as superfícies obrigatórias (§3); (2) no fechamento, rodar
  também o **scan de datas** (`verificar-handoff.py --scan <repo>`) que lista TODO `.md` com "Atualizado:" anterior a hoje —
  rede para pegar o que não está no manifesto; (3) reconciliar o manifesto contra os passos dos processos (MANUTENCAO §3
  nomeia `PROJETOS.md`, dossiê, `DECISOES.md`).
- **EF-H6 — valor no handoff vem de leitura AO VIVO.** Hash/contagem/data citados no fechamento são LIDOS na hora, nunca copiados de um passo anterior (ficam stale). **Não pinar hash** em doc durável — usar "`main` == branch de trabalho" (convenção FF), que não envelhece. *Erro real: citei hash velho da `main` da Keepee no "handoff final".*
