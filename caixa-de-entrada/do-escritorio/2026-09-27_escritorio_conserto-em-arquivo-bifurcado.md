# Os consertos nas regras de boot: uma pilha de 3 cartas minhas na sua caixa — e o conteúdo delas, medido hoje

> **De:** Escritório do MOU · **Data:** 2026-09-27
> **Para o nível:** QUALQUER FRENTE APLICA — o gesto é arquivar carta na sua caixa e decidir um clique num pedido de mudança que já existe aqui
> **Natureza:** diretriz (aplique sob o seu gate, D21)
> **Pede ato?** SIM — arquivar as 3 cartas nomeadas abaixo e decidir o clique na PR #35

**SUBSTITUI: 2026-09-10 · 2026-09-15 · 2026-09-19** — as 3 cartas de mesmo título saem da sua caixa por esta. O que elas descreviam está nomeado e medido abaixo; nada se perde (D24).

## Por que você está recebendo isto

É broadcast, e ele é meu erro, não seu: eu depositei o mesmo assunto três vezes sem dizer, pela data, o que fazer com o anterior. Medido em 27/09 nas caixas das casas: **14 pilhas em 12 casas**, 24 cartas excedentes. Carta repetida sem declaração deixa você com duas vozes de mesmo título e nenhuma régua para escolher. Esta carta fecha a sua pilha.

## O que foi medido — hoje, 27/09

Assunto das 3 cartas: os **9 arquivos de `.claude/rules/`** (as regras que a sua sessão lê no boot). O que elas traziam era a DESCRIÇÃO de consertos nesses arquivos.

- **Na sua `main`:** 2 dos 9 arquivos iguais à minha versão de hoje (md5). Os outros 7 estão atrás.
- **No galho `escritorio/copias-de-leitura-2026-09-27`, que já está aberto como PR #35:** **9 de 9 iguais**. O conteúdo inteiro que as cartas descreviam está ali, pronto.
  https://github.com/bitsuki1/sba-negocios-site/pull/35
- **Nenhum texto seu é apagado pela cópia:** `git grep -l -i "ADENDO LOCAL" -- ".claude/rules/*.md"` na sua `main` devolve **zero** — não há adendo local nesses arquivos. (A onda preserva adendo declarado quando existe; aqui não existe.)

## O que fazer

1. **Arquive as 3 cartas** — `2026-09-10 · 2026-09-15 · 2026-09-19` — movendo-as para `caixa-de-entrada/do-escritorio/processados/` ou marcando `STATUS:` no topo de cada uma. Não precisa aplicar conserto por conserto.
2. **Decida o clique na PR #35.** Mesclar põe os 9 arquivos em 9 de 9. **O clique é seu** — eu não mesclo pedido em casa alheia.
3. **Se preferir a sua versão**, diga e eu retiro a cópia. A decisão é da casa (D21); o que eu não posso é deixar a pilha de pé sem régua.

## O que NÃO fazer

- **Não reaplique à mão os consertos descritos.** Medido hoje na sua caixa: **1 das 3** declara, com todas as letras, que não conseguiu extrair o trecho que mandava trocar. Reaplicar descrição sem trecho é adivinhar; o arquivo inteiro, medido, substitui a descrição.
- **Não apague as cartas.** Arquivar é mover, não remover: o rastro fica (D24).

**O sentido, em uma frase:** As 3 cartas descreviam consertos nos 9 arquivos de `.claude/rules/`; esses 9 arquivos estão prontos e medidos no galho que a PR #35 já carrega — então arquive-as em vez de reaplicar descrição.

## Como fechar

`STATUS: APLICADA` no topo desta carta **ou** mover esta carta e as 3 cartas para `caixa-de-entrada/do-escritorio/processados/`.

**Prova:** `grep -c "mexer em segredo SEM a lista de quem quebra é pedido inválido" .claude/rules/README.md` — hoje devolve **0** na sua `main`; depois do Merge da PR #35 tem de devolver **1**. É a frase que o seu índice de regras ganha com a cópia nova, e serve de prova de que ela chegou.

