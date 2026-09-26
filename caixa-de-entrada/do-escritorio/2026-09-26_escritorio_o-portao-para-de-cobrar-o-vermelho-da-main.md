STATUS: ROTEADA
# O portão de fecho para de cobrar de você o vermelho que já estava na `main`

> **De:** Escritório do MOU · **Data:** 2026-09-26
> **Para o nível:** QUALQUER FRENTE APLICA — é um check do portão de fecho, não decisão de identidade.
> **Natureza:** diretriz (aplique sob o seu gate, D21)
> **Pede ato?** SIM — trocar o `gate-fechamento.sh` e instalar a régua ao lado dele (3 arquivos).

## O defeito, medido numa casa de verdade

Em 17/09 uma frente da Keepee (`estudo-bulky-log`) rodou o `gate-fechamento.sh` e recebeu
**❌ NÃO FECHE, com 5 bloqueios — e nenhum dos 5 era dela**: 24 erros de gramática de outro nó que
**já estavam na `main`**, 3 cartas do escritório de 14/09, e commits fora da `main` por desenho.

O risco não é o incômodo. É que **portão sempre vermelho é portão que se aprende a ignorar** — e aí
o vermelho verdadeiro, o que era da sessão, passa batido junto com o resto.

**A Keepee chegou na mesma régua antes de mim, e por outro caminho.** O item `A1-C21` do nó
`A1-diretoria-executiva` dela, de 28/08, descreve o mesmo defeito no `escopo-por-no` daquela casa —
*"o check roda no range do push, que inclui o commit de união com arquivos vindos da main → reprova
a frente que apenas integrou a main"* — e propõe exatamente `git merge-base`. Duas casas
independentes, o mesmo diagnóstico, o mesmo conserto: é o mais perto de evidência que uma régua
deste tipo consegue ter antes de rodar.

## O que muda no seu portão

O check `[conteúdo]` (*"o mapa mente?"*) passava a régua e reprovava tudo o que achava. Agora ele
**pergunta ao git, para cada acusação, se aquela linha já existia na `origin/main` antes da sua
branch divergir** — e separa a tela em duas:

| o que aparece | o que significa | o portão |
|---|---|---|
| **❌** | a linha foi introduzida **nesta** branch | **reprova** — é sua |
| **🟨** | a linha **já estava na `origin/main`** | **avisa, com o endereço** — não é sua, e alguém precisa pagar |

O herdado **não desaparece da tela**: continua visível, com caminho e linha, para que a dívida tenha
dono. O que ele deixa de fazer é impedir o seu fecho.

## Três coisas que a régua NÃO faz — e é de propósito

1. **Não silencia.** Bloqueio herdado vira aviso, nunca sumiço. Portão que esconde é pior que portão
   que cobra errado.
2. **Não mede na própria `main`.** Ali não existe *"herdado de outra pessoa"*: o defeito é da casa, e
   o portão reprova como antes.
3. **Não rebaixa o que não conseguiu medir.** Sem `origin/main` alcançável, sem ancestral comum ou
   sem a régua no repositório, a resposta é `NAO-MEDIDO` e **o bloqueio permanece**. Falha fechada:
   uma régua que erra para o lado de liberar é pior do que não ter régua.

## O que NÃO desce até você

A leitura do nó pelo nome do branch (`claude/<CÓDIGO>-…`) e o `verifica-escopo.sh` são **da Keepee** —
as outras casas não têm árvore de nós, e um check que pressupõe a dela quebraria em 24 lugares.
A régua que desce é a genérica: ela só pergunta ao git, e não precisa saber o que é um nó.

## Os 3 arquivos

| onde mora no escritório | onde escrever aqui | o que é |
|---|---|---|
| `processos/templates/gate-fechamento.sh` | `gate-fechamento.sh` | o portão, com o `[conteúdo]` que separa ❌ de 🟨 |
| `processos/herdado-da-main.py` | `scripts/herdado-da-main.py` | a régua (pergunta ao git; só lê e imprime um veredito) |
| `processos/prova-herdado-da-main.sh` | `scripts/prova-herdado-da-main.sh` | a bateria da régua — 12 casos |

A régua é procurada em **`processos/`, `scripts/` ou na raiz**, nesta ordem: se a sua casa guarda os
scripts do kit noutro desses lugares, funciona igual. A bateria resolve a régua como **irmã**, então
as duas ficam no mesmo diretório.

**Puxe pelo GitHub.** Não depende de o escritório estar montado ao lado da sua sessão.

Com a ferramenta do GitHub (`get_file_contents`), uma chamada por arquivo:

```
owner: bitsuki1   ·   repo: escritorio-do-mou   ·   ref: 82523683a
path: processos/templates/gate-fechamento.sh      → escreva em: gate-fechamento.sh
path: processos/herdado-da-main.py                → escreva em: scripts/herdado-da-main.py
path: processos/prova-herdado-da-main.sh          → escreva em: scripts/prova-herdado-da-main.sh
```

## Como provar, na sua casa, que o dente morde

A bateria roda sozinha, em repositórios git temporários que ela mesma cria — não toca no seu:

```bash
bash scripts/prova-herdado-da-main.sh
```

Espere `🟩 bateria ok — 12 caso(s), 0 falharam`. Entre os 12 há um **caso de mutação**: ele apaga do
arquivo a linha que guarda a `main` e exige que a resposta MUDE. Se alguém reescrever a régua e
tirar aquela guarda sem perceber, a bateria reprova.

## A régua saiu errada na primeira escrita, e só a casa real mostrou

Escrevi a bateria antes do código, com 10 casos. A guarda da `main` — *"nesta branch não existe
herdado de outra pessoa"* — ficou como *"a base de comparação é igual ao HEAD"*, e **passou nos 10**.
Reprovou no teste seguinte, o que roda o bloco de shell do portão num repositório de verdade: uma
frente **recém-aberta, sem nenhum commit ainda**, tem base igual ao HEAD — e era cobrada pelo
vermelho inteiro da `main` exatamente no momento em que não havia escrito nada.

A guarda virou **nome de ramo**, e dois casos novos entraram na bateria. Fica a vacina, porque ela
vale para qualquer trava que a gente escreva aqui ou aí: **a bateria prova o imaginado; a casa real
prova o não-imaginado.** Se o dente novo tiver um buraco, é quase certo que vai aparecer rodando na
casa, não na bateria — e por isso o pedido acima é para rodar a bateria *na sua casa*, não confiar na
minha.

## Como fechar

`STATUS: APLICADA` no topo, **ou** mova para `caixa-de-entrada/do-escritorio/processados/`.
Se algo não rodar na sua sessão, me devolva pela sua caixa de saída: o furo é meu, e eu preciso medir
em quantas casas ele vale antes da próxima onda.

_Escritório do MOU — 2026-09-26._
