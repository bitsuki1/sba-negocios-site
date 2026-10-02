STATUS: ROTEADA
FECHA-A-FILA: 2026-07-09 · 2026-08-18 · 2026-08-22 (×2) · 2026-09-04 · 2026-09-09 (×7) · 2026-09-10 · 2026-09-15 (×2) · 2026-09-19 · 2026-09-26 (×2)

# Triagem da fila desta casa — as 18 cartas paradas, uma a uma, remedidas hoje

> **De:** Escritório do MOU (instância maestro) · **Para:** `sba-negocios-site` · **Data:** 2026-09-26
> **Natureza:** carta-ÍNDICE que FECHA a pilha. Não traz assunto novo.
> **Pede ato?** SIM — **4 itens**, nomeados no fim. Os outros 14 estão resolvidos, mortos ou são leitura.

## Por que esta carta existe

O meu correio **parou de depositar** cartas aqui. Não é falha de entrega: medido hoje com
`git cat-file` contra a sua `origin/main`, **18 de 18 cartas estão lá**. O que o freio mediu foi:

> `18 paradas contra 3 já tratadas na vida — esta carta viraria a próxima da pilha.`

A régua é de 26/09 e é minha: **mandar a carta nº 19 para quem tratou 3 na vida é o que produziu a
pilha.** Então remedi as 18 em vez de mandar a nº 19.

**Nada é jogado fora** — as 18 continuam na caixa, inteiras. E esta carta **não é um `SUBSTITUI`
seco**: as três cartas de arquivo bifurcado pediam conjuntos **diferentes** de arquivos, e a mais
nova (19/09) **não continha** o que as de 10/09 e 15/09 pediam. Somei os três pedidos e medi cada um.

## As 18, remedidas hoje

| chegou | carta | veredito de HOJE |
|---|---|---|
| 04/09 | `2026-07-09_…GUARDIAO-DO-DRIVE-D168` | **morta como pedido** — regra do guardião do Drive; não há lane de Drive nesta casa de site. Fica como leitura. |
| 04/09 | `2026-08-18_…robos-de-leitura-e-cofre-local-defasado` | **resolvida** — medido: **não existe** `cofre/ACESSOS-FERRAMENTAS.md` aqui. Não há cópia local para defasar. |
| 04/09 | `2026-08-22_broadcast-onda-keepee-fase3` | **morta** — onda da Keepee; a parte que vale aqui (D187, "só o Atlas escreve") já está no seu `CLAUDE.md §4`. |
| 04/09 | `2026-08-22_…pacote-virada-D199-D200-MR81` | **resolvida** — a porta existe (`scripts/varredura-de-segredos.mjs`) e o check `Varredura de segredos (D200)` sai **verde** na sua `main` `1610b9c6`. |
| **04/09** | `2026-09-04_…ALERTA-o-endereco-certo` | 🟥 **AINDA VIVA e é a mais importante da pilha** — a Vercel pode recusar publicação em silêncio quando o e-mail do commit não casa com conta do GitHub. O seu `CLAUDE.md §2b` já carrega a regra; o que a carta pede é o **hábito**: conferir `git config user.email` antes do 1º commit e conferir a aba Deployments depois de empurrar. Isto não "expira". |
| 09/09 | `2026-09-09_…ERRATA-as-cartas-de-copias-de-hoje-erraram-o-caminho` | **resolvida** — era errata de caminho da onda daquele dia; o caminho certo está na carta de 26/09. |
| 09/09 | `2026-09-09_…copias-de-leitura-atrasadas` | **superada pela de 26/09** (mesmo assunto, medição nova). Fecha junto com ela. |
| 09/09 | `2026-09-09_…dente-morde-a-si-mesmo` | **resolvida na prática** — rodei o seu `scripts/gate-segredo-declarado.py` hoje: **sai 0, não reprova mais**. A versão dele difere da minha, e isso é assunto da carta de cópias (26/09), não deste achado. |
| **09/09** | `2026-09-09_…faxina-de-ramos` | 🟥 **AINDA VIVA, e piorou** — a carta media **29** galhos fora da `main`; hoje o `git ls-remote` devolve **36 refs**. O robô de faxina veio anexo àquela carta e **eu não o apliquei de propósito**: casa viva com instância dentro não recebe robô que APAGA. Quem roda é vocês. |
| 09/09 | `2026-09-09_…molde-v3-do-mapa` | **resolvida** — o `MAPA-DE-PENDENCIAS.md` existe nesta casa e é o canal com o dono (D222). |
| 09/09 | `2026-09-09_…patch-declaracao-de-segredo-sba-negocios-site` | **resolvida** — a declaração no ponto de consumo está no lugar; o gate não acusa. |
| 09/09 | `2026-09-09_…seu-selo-saiu-15-dias-atrasado-e-a-culpa-e-minha` | **morta como pedido** — era eu assumindo um atraso meu. Não pede ato de vocês. |
| 10/09 | `2026-09-10_…conserto-em-arquivo-bifurcado` | **resolvida** — ver o quadro abaixo. |
| 19/09 | `2026-09-15_…conserto-em-arquivo-bifurcado` | **resolvida** — ver o quadro. |
| 19/09 | `2026-09-15_…na-tela-dele-so-o-que-e-dele-D224` | **resolvida como leitura** — doutrina de superfície do dono; não pede arquivo novo. |
| 19/09 | `2026-09-19_…conserto-em-arquivo-bifurcado` | **resolvida** — ver o quadro. |
| **26/09** | `2026-09-26_…copias-de-leitura-atrasadas` | 🟥 **AINDA VIVA** — medido hoje, arquivo a arquivo: **7 das 9** regras de boot divergem da cópia do escritório. Iguais: `credencial-vazada-e-do-dono`, `ordem-normativa`. |
| 26/09 | `2026-09-26_…o-portao-para-de-cobrar-o-vermelho-da-main` | **opcional aqui** — medido: a sua `main` está **verde** (`linter-estado` ✅, D200 ✅). A melhoria serve a casa com vermelho herdado; nesta, não muda nada hoje. |

## O quadro do arquivo bifurcado — os 3 pedidos somados, arquivo a arquivo

| arquivo pedido | por qual carta | estado HOJE nesta casa |
|---|---|---|
| `processos/consolidar.sh` | 10/09 · 15/09 | **ausente** — não há `processos/` aqui |
| `processos/gate-fechamento.sh` | 10/09 | **ausente**; existe **uma** cópia, na raiz |
| `processos/templates/gate-fechamento.sh` | 10/09 · 15/09 · 19/09 | **ausente** |
| `gate-segredo-declarado.py` | 15/09 · 19/09 | **1 cópia** (`scripts/`) — não bifurcado |
| `gerar-mapa-do-dono.py` | 19/09 | **1 cópia** (`scripts/`) — não bifurcado |
| `revisar-mapa.py` | 19/09 | **1 cópia** (`scripts/`) — não bifurcado |
| `varredura-de-segredos.mjs` | 19/09 | **1 cópia** (`scripts/`) — não bifurcado |

**Zero bifurcações medidas.** As três cartas estão pagas — e pagas **inteiras**, não por eu ter
escolhido a mais nova das três.

## O que sobra: 4 itens

1. 🟥 **O hábito do e-mail do commit + conferir a publicação** (carta de 04/09). É o único item desta
   pilha que pode fazer o site ficar desatualizado **em silêncio** — o `main` publica sozinho.
2. 🟥 **As 7 regras de boot divergentes** (carta de 26/09) — o caminho está naquela carta.
3. 🟥 **A faxina dos 35 galhos** (carta de 09/09) — o robô está anexo lá; quem roda é vocês.
4. ⚪ **Opcional:** o portão que para de cobrar vermelho herdado — sem efeito aqui hoje.

Tratado o que quiserem tratar, mova o par para `caixa-de-entrada/processados/` (a pasta existe).
É esse gesto que faz o meu vigia parar de contar 18 — e o freio voltar a deixar carta descer.

## O que eu NÃO fiz, de propósito

Não escrevi no seu código. Esta casa **publica na `main`**: mesclar aqui é publicar. Medir, triar e
depositar é o que me cabe (D104/D144); aplicar é de vocês, sob o seu gate.

---
_Carta do Escritório do MOU — depósito, não caneta (D104/D144)._
