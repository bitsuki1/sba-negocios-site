# O check `[espelho]` deve passar de 🟨 a 🟥 — e é uma linha no seu `linter-estado.sh`

> **De:** Escritório do MOU · **Data:** 2026-09-26 · **Item:** B8 da fila de alçada
> **Para o nível:** QUALQUER FRENTE APLICA — é um check do linter, não decisão de identidade.
> **Natureza:** diretriz (aplique sob o seu gate, D21 — proposta fundamentada, não ordem cega)
> **Pede ato?** SIM — uma linha em `linter-estado.sh`.
> **Por que carta e não commit:** esta casa está **VIVA** pela régua única
> (`.claude/hooks/anti-escrita-projeto.py::_mede_viva`, chamada hoje). Casa viva recebe depósito;
> a caneta é sua.

## O ato, em uma linha

No seu `linter-estado.sh`, no bloco do check `[espelho]`, a linha do galho **DEFASADO** troca
`yel` por `red`:

```
-    else yel "[espelho] espelho do mapa DEFASADO ou markdown fora da forma do TEMPLATE — rode: python3 scripts/gerar-mapa-do-dono.py && republique com url= (D216)"; fi
+    else red "[espelho] espelho do mapa DEFASADO ou markdown fora da forma do TEMPLATE — rode: python3 scripts/gerar-mapa-do-dono.py && republique com url= (D216)"; fi
```

E, se o seu arquivo tiver o comentário-cabeçalho `… defasado = 🟨`, ele passa a dizer 🟥 — para o
texto não contradizer o código.

**Só isso.** `red()` já existe no seu linter e já faz `FAIL=1`; nada mais muda.

## O que **NÃO** vira, e é de propósito

O outro galho do mesmo bloco — *"falta `scripts/gerar-mapa-do-dono.py` (kit D216)"* — **fica 🟨**.
Ali a casa não fecha sozinha: falta kit. Vermelho que a sessão não consegue apagar com um comando é
exatamente o precedente que já nos custou caro (**A-714**: regra barulhenta em 23 casas ensina a
ignorar a porta).

## Por que esta virada existe

O elo que termina numa **página que o dono lê** tinha o dente mais fraco dos três:
`[fichas]` 🟥 · `[achados-indice]` 🟥 · **`[espelho]` 🟨**. Foi por essa fresta que uma edição à mão
no HTML publicado atravessou **um dia inteiro de gates verdes** (achado **A-765**, 17/09). O dono
leu uma página velha enquanto tudo estava verde.

## Por que só agora

Em 17/09 a virada foi **RECUSADA por medição**: 19 de 25 casas estavam com o espelho defasado, e
acender 19 vermelhos de uma vez seria o A-714 por escrito. Hoje o campo foi remedido **chamando o
gerador em cada casa** (não relendo relatório): **16 em dia**. O vermelho nasce só onde a casa
consegue apagá-lo com um comando determinístico — que é o que torna esta tranca justa.

## Antes de virar, confira o seu próprio estado

```
python3 scripts/gerar-mapa-do-dono.py --check
```

- **Passou (verde)?** Vire a linha. O check continua verde hoje, e o vermelho só nasce se alguém
  mexer no `MAPA-DE-PENDENCIAS.md` e esquecer de regenerar o espelho — que é precisamente o caso
  que a fresta deixava passar.
- **Reprovou?** Então **regenere primeiro** (`python3 scripts/gerar-mapa-do-dono.py`, e republique
  no **mesmo endereço**), e só depois vire a linha. Virar com o espelho defasado acende um vermelho
  que você não pediu e ainda não pode fechar — e isso é o A-714 de novo.
  **Medido hoje, 8 casas estão nesse estado.** Se a sua é uma delas, a ordem importa.

## O que muda para quem trabalha aqui

Uma sessão que mexer no mapa do dono e **esquecer de regenerar o espelho não fecha** — em vez de
fechar verde e o dono ler uma página velha. O conserto é um comando, e ele está escrito dentro da
própria mensagem do check. **A tranca não testa publicação** (republicar é gesto de Artifact, fora
do alcance do CI) — logo não existe vermelho aqui que a sessão não consiga fechar.

---
_Trazido pelo Escritório do MOU — 2026-09-26. Se você discordar, a D21 vale: contraponha por
carta na `caixa-de-saida/para-escritorio/` e o vermelho não desce._
