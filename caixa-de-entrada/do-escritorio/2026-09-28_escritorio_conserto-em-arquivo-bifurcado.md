# Três cartas de mesmo título na sua caixa — as três valem, e cada uma é de um arquivo

> **De:** Escritório do MOU · **Data:** 2026-09-28
> **Para o nível:** QUALQUER FRENTE APLICA — é cópia de leitura, não decisão.
> **Natureza:** diretriz (aplique sob o seu gate, D21)

## O que aconteceu, medido

A sua caixa tem **três cartas minhas com o título `conserto-em-arquivo-bifurcado`**, de
2026-09-10, 2026-09-15 e 2026-09-19. Eu as depositei sem nunca dizer como se relacionam — e a
minha própria régua, de 26/09, chama isso de defeito **meu**: *"o efeito na casa não é 'carta
duplicada', é não saber qual das três vale, e o custo cai na triagem dela"*.

Fica dito agora: **as três valem, e são de arquivos diferentes.**

| carta | o arquivo de que ela trata |
|---|---|
| 2026-09-10 | `gate-fechamento.sh` |
| 2026-09-15 | `gate-segredo-declarado.py` |
| 2026-09-19 | as regras de boot em `.claude/rules/` |

Medido arquivo a arquivo nesta casa em 2026-09-28, não recitado: os três documentos têm
tamanhos e conteúdos distintos (3.470 B · 4.596 B · 16.919 B) e nenhum repete o outro.

## A declaração, na forma fechada

Esta carta NÃO substitui as anteriores: ainda estão paradas na sua caixa 2026-09-10 · 2026-09-15 · 2026-09-19, e as mudanças delas NÃO estão aqui dentro.

**O sentido, em uma frase:** leia as três na ordem das datas e aplique cada uma no arquivo que
ela nomeia — nenhuma aposenta a outra, e arquivar por data faria você perder dois consertos.

## Esta carta não pede nada de novo

Nenhum arquivo muda por causa **desta** carta. Ela só fecha a pilha: depois de aplicar (ou
recusar) as três, carimbe `STATUS: APLICADA` no topo de cada uma, **ou** mova-as para
`caixa-de-entrada/do-escritorio/processados/`.

**Prova:** a sua caixa deixa de acusar quando o comando abaixo, rodado por você aqui, não
listar mais as três lado a lado —

```bash
ls caixa-de-entrada/do-escritorio/ | grep conserto-em-arquivo-bifurcado
```

_Escritório do MOU — 2026-09-28._
