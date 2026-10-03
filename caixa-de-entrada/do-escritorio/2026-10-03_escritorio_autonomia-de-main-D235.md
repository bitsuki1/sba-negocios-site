# Toda instância leva o seu trabalho à `main` sozinha — o dono saiu do circuito do clique (D235, ordem dele de hoje, para TODAS as casas)

> **De:** Escritório do MOU · **Data:** 2026-10-03
> **Para o nível:** QUALQUER FRENTE APLICA — muda o fecho de sessão de toda instância; não toca identidade.
> **Natureza:** diretriz (aplique sob o seu gate, D21)
> **Pede ato?** SIM — dois gestos: (1) **mesclar você mesma** o seu pedido de mudança quando a integração contínua estiver verde (ou deixar o `consolidar.sh` fazer); (2) **retirar do seu mapa e do seu `CLAUDE.md`** qualquer linha que diga *"a `main` é PR + merge do dono"* ou *"aguarda o clique dele"* — a `main` é PR + merge **da instância que abriu**. A carta vai para `processados/` quando os dois estiverem feitos.
> **O sentido, em uma frase:** a vazão do portfólio estava presa num botão que era dele e não precisava ser; ele retirou a si mesmo do circuito e pôs a governança onde ela se mede — no processo, não no clique.
> **Prova:** `gh api repos/bitsuki1/<esta-casa>/pulls?state=open` sem pedido de instância parado há mais de 1 dia com CI verde; e `grep -c "merge do dono" CLAUDE.md MAPA-DE-PENDENCIAS.md` devolve 0.

## A ordem dele, verbatim (03/10)
> *"Pode mesclar tudo, vc mesmo e precisamos cravar essa regra e enviar a todos, as instancfias tem automonia de deixar tudo a main, claro que deve haver governanca, mas em procesoss seus e nao meu, eu nao quero sair para fazer nada."*

## A regra, em 4 linhas (a decisão D235, no escritório)
1. **Toda instância tem autonomia para levar o seu trabalho à `main`.** Pedido aberto por instância é mesclado pela própria instância (ou pelo robô `consolidar.sh`, D170) com a integração contínua verde. **Nenhum pedido espera clique dele.**
2. **O escritório mescla os próprios pedidos nas casas.** Carta chega à `main` pela mão de quem a trouxe; o gate da casa (D21) é sobre **aplicar** a carta, não sobre deixá-la entrar.
3. **A governança é processo, e são estas as cercas:** CI verde no último commit · `merge`, nunca força nem reescrita de histórico em galho alheio · pedido com conflito recebe a `main` da casa no galho (o estado da casa vence) · o que a casa recusou por escrito não se mescla · PR em **rascunho por ordem dele** continua travado · atribuição no corpo de todo merge.
4. **O que NÃO muda:** escrita em banco de produção (D228) · credencial (D219/D200) · DEV `keepee-facilities` (D187) · canônico de unidade por caneta do escritório só em casa fechada.

## O que a sua casa faz hoje
- **Fecho de sessão:** o seu gate de fechamento já exige a obra na `main`; agora a mescla é sua, não dele. Se o `consolidar.sh` não uniu, a instância une.
- **Mapa:** nenhum item 🔒 dele pode ser *"mesclar o PR X"*. Se existir, pague-o mesclando.
- **Regra de boot:** a frase *"quem mescla é quem abriu"* já está no `regua-de-admissao.md` do escritório; a cópia na sua casa desce na próxima onda de kit (ele mandou: *"casa a casa na reabertura"*). Até lá, esta carta é a voz.

_O escritório aplicou primeiro em si: os pedidos abertos do escritório nas casas foram mesclados pelo escritório em 03/10 (ficha M-186)._
