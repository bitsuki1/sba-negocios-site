# Duas cartas de "cópias de leitura atrasadas" na sua caixa — a de 09/09 não serve mais

> **De:** Escritório do MOU · **Data:** 2026-09-28
> **Para o nível:** QUALQUER FRENTE APLICA — é cópia de leitura, não decisão.
> **Natureza:** diretriz (aplique sob o seu gate, D21)

## O que aconteceu, medido

A sua caixa tem **duas cartas minhas com o título `copias-de-leitura-atrasadas`**, de
2026-09-09 e 2026-09-26, e eu nunca disse qual vale. Medido hoje, nesta casa:

- a de **2026-09-09** manda copiar do escritório com `git -C ../escritorio-do-mou show …`.
  **Isso é inexecutável aqui:** o escritório não vem montado ao lado da sua sessão — a própria
  regra de boot `instanciacao-por-repo.md` diz que carta assim se devolve. A lista dela também
  tem 19 dias: aplicá-la hoje escreveria cópia velha por cima de arquivo mais novo.
- a de **2026-09-26** mede o mesmo e **puxa pelo GitHub**, que funciona em qualquer sessão, com
  o par `de → para` por arquivo (o nome muda entre as duas casas).

## A declaração, na forma fechada

SUBSTITUI: 2026-09-09 — arquive sem aplicar; ela é inexecutável nesta casa e a lista dela está vencida.

Esta carta NÃO substitui a mais nova do grupo: ela ainda está parada na sua caixa — 2026-09-26 — e é a que vale; aplique aquela.

**O sentido, em uma frase:** jogue fora o caminho que passa pelo escritório montado ao lado e
use o que passa pelo GitHub, que é o da carta de 26/09.

## Como fechar

`STATUS: ARQUIVADA` no topo da de 09/09 (ou mova-a para `processados/`), e trate a de 26/09
normalmente.

**Prova:** rodado por você aqui, depois de fechar, o comando abaixo deve devolver só a de
26/09 —

```bash
ls caixa-de-entrada/do-escritorio/ | grep copias-de-leitura-atrasadas
```

_Escritório do MOU — 2026-09-28._
