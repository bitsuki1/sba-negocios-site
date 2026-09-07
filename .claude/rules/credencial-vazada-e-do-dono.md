# Regra — CREDENCIAL VAZADA: a decisão de trocar é do DONO, e SOMENTE dele (ordem do dono, 2026-09-07)
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`; C36 nível 3). Vigência: ATIVO desde 2026-09-07. **Vale para TODOS os repositórios do portfólio** — o dono mandou escrever *"aqui e em todos os projetos e repos"*.
> **Por que é regra de boot:** o escritório trouxe ao dono um item chamado *"Trocar o token…"* com passo a passo, como se a decisão já estivesse tomada — e ele nem sabia **por quê**. Ele corrigiu a postura inteira. Regra de boot sobrevive à compactação; mecanismo > memória (D71).

## A ordem do dono (verbatim, 2026-09-07)
> *"trocar senhas vazadas é decisão minha e somente minha e qualquer instância deve me alertar e dar o risco e nunca me mandar fazer sem eu saber, vcs não têm essa autonomia de executar sem minha permissão"*

## A regra, em 3 gestos — e 2 proibições
Quando uma instância — de qualquer casa — descobre credencial vazada (em git, log, chat, print, e-mail, histórico):

| gesto | o que é |
|---|---|
| 1. **ALERTAR** | dizer **o que** vazou, **onde**, **desde quando** e **quem já pode ter visto** — medido, com data e fonte, nunca de memória |
| 2. **DAR O RISCO** | dizer **o que aquela chave abre**, **o que acontece se ninguém mexer** e **o que quebra se trocar** (a lista de consumidores — `segredo-e-consumidor.md`) — os dois lados, sem inflar nenhum |
| 3. **ESPERAR** | a decisão é dele. Levar em **caixa de clique** (D203), com *"não trocar — aceito o risco"* como opção **legítima**, ao lado de *"trocar"* e *"adiar"* |

- ❌ **NUNCA mandar fazer.** Item que começa com verbo no imperativo (*"Trocar…"*, *"Rotacionar…"*, *"Revogar…"*) na fila do dono é ordem disfarçada. O título é *"Credencial X vazou em Y — sua decisão"*, e o corpo é o alerta e o risco.
- ❌ **NUNCA executar.** Nenhuma instância rotaciona, revoga, apaga ou desliga credencial por conta própria — nem "para ajudar", nem "porque é óbvio". Sem a permissão explícita dele, **não se toca**. (Já era D200 + D208 para o escritório; agora é para **todo o portfólio**, e inclui a postura.)

## O que muda na prática
- **"Risco aceito" é uma resposta que fecha o item.** Registra-se com a explicação do lado (o que vazou, o que abre, por que ele aceitou) e **para de trazer**. Reabrir só se o fato mudar (uso indevido no log, exposição nova).
- **Alerta sem risco medido é alerta inválido** — volta para quem alertou. A lista de quem quebra é obrigatória (`segredo-e-consumidor.md`); o *"o que aquela chave abre"* também.
- **A postura vale para senha de conta, token, chave de API, segredo de robô, chave de banco** — qualquer coisa que abra porta.

## Vacinas
1. **`V-ITEM-DO-DONO-NO-IMPERATIVO`** — o Q8 do escritório nasceu como *"Trocar o token do robô"* + 6 passos, e o dono perguntou *"por que vamos trocar de novo?"*. O motivo não estava escrito; a decisão não era dele; o item era ordem. (A-559)
2. **`V-AUTONOMIA-NAO-E-DA-INSTANCIA`** — a instância mede, alerta e leva. Executar mexida em credencial é ato de quem paga a conta.

Referência normativa: **DECISOES.md · D219** · D200 · D203 · D208 · `segredo-e-consumidor.md`.
