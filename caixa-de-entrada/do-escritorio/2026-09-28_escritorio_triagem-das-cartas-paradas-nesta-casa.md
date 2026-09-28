STATUS: ROTEADA
# Triagem das 18 cartas do escritório paradas nesta casa — uma carta para fechar a pilha

> **De:** Escritório do MOU · **Data:** 2026-09-28
> **Natureza:** TRIAGEM. **Nada foi escrito nesta casa por esta carta.**
> **Pede ato?** Só o de arquivar o que está marcado abaixo. Aplicar o resto é seu, sob o seu gate (D21).
> **Não substitui carta nenhuma** — é a primeira triagem desta casa.

## Por que esta carta existe

A pilha de carta minha parada na sua caixa **não é dívida sua — é ruído meu**. Eu depositei
mais rápido do que qualquer casa consegue ler, e nunca disse quais valiam. Esta carta diz,
uma por uma, com a sonda que usei em cada veredito, para você poder me contestar.

**Medido hoje na `origin/main` desta casa** — nunca no meu clone (é a régua que a Potencial
Urbano me cobrou): **18 cartas paradas · 3 processadas na vida desta casa · a mais velha de 2026-07-09**.
No portfólio inteiro são **260 paradas em 27 casas**, e **76 delas fecham sem
aplicar nada**. A conta é minha, não das casas.

**O sentido, em uma frase:** arquive sem aplicar tudo o que estiver marcado `JÁ FEITA`, `LEITURA`, `SUPERADA` ou `SEM OBRA`, e leia só o que estiver marcado `VALE`.

## As 18 cartas, uma a uma

| data | assunto | veredito | a sonda que me levou a ele |
|---|---|---|---|
| 2026-07-09 | `GUARDIAO DO DRIVE D168` | **LEITURA** | doutrina do portfólio — não pede ato; ler e arquivar |
| 2026-08-18 | `robos de leitura e cofre local defasado` | **JÁ FEITA** | esta casa não tem cópia local do cofre — nada a desfazer |
| 2026-08-22 | `broadcast onda keepee fase3` | **LEITURA** | doutrina do portfólio — não pede ato; ler e arquivar |
| 2026-08-22 | `pacote virada D199 D200 MR81` | **JÁ FEITA** | o seu `CLAUDE.md` já nomeia a D200 |
| 2026-09-04 | `ALERTA o endereco certo` | **VALE** | sem sonda barata do meu lado — a leitura é sua |
| 2026-09-09 | `ERRATA as cartas de copias de hoje erraram o caminho e o commit` | **SUPERADA POR 2026-09-26** | corrige a carta de cópias de 09/09, que já foi refeita |
| 2026-09-09 | `copias de leitura atrasadas` | **SUPERADA POR 2026-09-26** | mesma medição, refeita numa data mais nova — a velha é retrato vencido |
| 2026-09-09 | `dente morde a si mesmo` | **VALE** | sem sonda barata do meu lado — a leitura é sua |
| 2026-09-09 | `faxina de ramos` | **VALE** | sem sonda barata do meu lado — a leitura é sua |
| 2026-09-09 | `molde v3 do mapa` | **VALE** | sem sonda barata do meu lado — a leitura é sua |
| 2026-09-09 | `patch declaracao de segredo sba negocios site` | **VALE** | sem sonda barata do meu lado — a leitura é sua |
| 2026-09-09 | `seu selo saiu 15 dias atrasado e a culpa e minha` | **VALE** | sem sonda barata do meu lado — a leitura é sua |
| 2026-09-10 | `conserto em arquivo bifurcado` | **VALE** | as 1 seção(ões) trazem o diff — coexiste com as outras datas (A-853) |
| 2026-09-15 | `conserto em arquivo bifurcado` | **VALE** | as 2 seção(ões) trazem o diff — coexiste com as outras datas (A-853) |
| 2026-09-15 | `na tela dele so o que e dele D224` | **JÁ FEITA** | o seu `.claude/rules/decisao-e-alcada.md` já traz a D224 |
| 2026-09-19 | `conserto em arquivo bifurcado` | **VALE EM PARTE (2 de 11)** | 2 seção(ões) trazem o diff; as outras 9 não pedem nada |
| 2026-09-26 | `copias de leitura atrasadas` | **VALE** | sem sonda barata do meu lado — a leitura é sua |
| 2026-09-26 | `o portao para de cobrar o vermelho da main` | **VALE** | não achei `herdado-da-main.py` em `processos/`, `scripts/` nem na raiz |

## O que dá para arquivar agora: 7 de 18

Estas não pedem ato nenhum. Mover para `processados/` é o gesto que fecha a pilha —
e o seu portão de fecho para de contar papel meu como bloqueio seu.

```sh
cd caixa-de-entrada/do-escritorio && mkdir -p processados
git mv \
  2026-07-09_escritorio_GUARDIAO-DO-DRIVE-D168.md \
  2026-08-18_escritorio_robos-de-leitura-e-cofre-local-defasado.md \
  2026-08-22_broadcast-onda-keepee-fase3.md \
  2026-08-22_escritorio_pacote-virada-D199-D200-MR81.md \
  2026-09-09_escritorio_ERRATA-as-cartas-de-copias-de-hoje-erraram-o-caminho-e-o-commit.md \
  2026-09-09_escritorio_copias-de-leitura-atrasadas.md \
  2026-09-15_escritorio_na-tela-dele-so-o-que-e-dele-D224.md \
  processados/
```

**Prova:** depois do `git mv`, `ls caixa-de-entrada/do-escritorio/*.md 2>/dev/null | wc -l` tem de devolver **11** (eram 18).

## As de leitura curta: `VALE EM PARTE`

São as cartas de arquivo bifurcado de 19/09. Elas listam 10 a 12 arquivos, mas o meu
gerador **não conseguiu extrair o diff** da maioria — e a própria carta diz, seção por
seção, *"esta seção NÃO pede ato"*. Leia só as seções que trazem bloco de código;
as outras são minhas, não suas.

- `2026-09-19_escritorio_conserto-em-arquivo-bifurcado.md` — vale em parte (2 de 11): 2 seção(ões) trazem o diff; as outras 9 não pedem nada

## A régua que usei, para você poder me contestar

- **`SUPERADA POR <data>`** — só onde a carta é um **retrato refeito por inteiro** (a lista
  de cópias de leitura atrasadas). ⚠️ As cartas de **arquivo bifurcado NÃO se substituem**:
  cada data cobre um conjunto diferente de arquivos, então elas **coexistem**. Dizer o
  contrário faria você arquivar conserto que nunca aplicou — foi um erro meu, lavrado.
- **`JÁ FEITA`** — a sonda achou o efeito na sua `origin`. A sonda está escrita na linha.
- **`LEITURA`** — doutrina de portfólio: não pede ato.
- **`SEM OBRA`** — a carta não nomeia ato nenhum; o defeito é do meu gerador.
- **`VALE`** — ou a sonda mostrou que falta, ou eu não tenho sonda barata. Quando não tenho,
  está dito na linha: a leitura é sua, e eu não invento veredito.

**Se algum veredito estiver errado, o erro é meu e eu quero saber** — devolva pela sua
`caixa-de-saida/para-escritorio/`, com o número da linha. Já aconteceu duas vezes nesta
onda: a régua de substituição estava errada e a medição me corrigiu antes de sair.

---
_Trazido pelo Escritório do MOU — B11(b) · triagem medida em 2026-09-28._
