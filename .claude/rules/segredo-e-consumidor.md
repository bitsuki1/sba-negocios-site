# Regra — SEGREDO TEM CONSUMIDOR: nenhum pedido de mexer em segredo chega ao dono sem a lista de quem quebra
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`; C36 nível 3). Vigência: ATIVO desde 2026-08-25.
> **Por que é regra de boot:** o dono descreveu a dor com todas as letras e ela é RECORRENTE (*"toda hora"*). Regra de boot sobrevive à compactação — mecanismo > memória (D71).

## A dor do dono (verbatim, 2026-08-25)
> *"Segredos é outro problema, toda hora alguém pede, eu vou lá apago e refaço e prejudico outro projeto, **ninguém olha se mais alguém usa o segredo**, desligamos coisas na Vercel e atrapalhamos os projetos, para isso temos o portfólio, **tudo deveria estar lá, mesmo que dos projetos, o portfólio deveria saber para não permitir isso**."*

## A TRAVA (a regra, em uma frase)
> **Pedido de mexer em segredo SEM a lista de consumidores anexada é pedido INVÁLIDO.** O escritório devolve à casa; não chega ao dono.

"Mexer" = **rotacionar · revogar · apagar · desligar · trocar de casa · reconectar**. Vale para segredo, chave, token, **conta**, projeto de plataforma, domínio, runner e banco.

**O que isso muda para o dono:** ele deixa de precisar lembrar de perguntar *"quem mais usa?"*. **Quem pede é obrigado a responder antes de pedir.**

## Como o pedido tem de chegar (emenda à D203)
A caixa de clique carrega, no texto curto ANTES dela, a lista de consumidores **medida na hora** — não escrita de memória:

```
Trocar a senha da conta Resend
• Quebra: aviso de lead do site da SBA · aviso de acesso ao acervo da CCEV · convites do bitsuki
• Depois da troca, 3 lugares precisam ser atualizados (o escritório faz)
[ Trocar agora ] [ Trocar quando eu disser ] [ Não trocar ]
```
Uma opção é sempre **"Adiar — quero ver quem usa primeiro"**.

## Onde mora a lista
**`portfolio-automacoes/SEGREDOS-E-CONSUMIDORES.md`** — indexado por **SEGREDO**, não por ferramenta. O `portfolio-automacoes` é co-montado em toda sessão (D162), então toda casa lê sem pedir nada.
⚠️ **Não confundir com o cofre** (`ACESSOS-FERRAMENTAS.md`): o cofre é indexado por FERRAMENTA e responde *"como uso isto?"*. Este responde *"quem quebra se eu mexer?"*. Eixos diferentes, SSOTs diferentes (A-002).

## As 3 coisas que não se negociam
1. **A coluna "quem usa" NUNCA se escreve de cabeça.** Gera-se por medição (grep/API), com data e fonte. _(A banca do portfólio já provou o oposto uma vez: pelo menos 4 das 10 linhas do Top-10 do cofre tinham "quem PODERIA usar" copiado para dentro de "quem JÁ usa". Coluna de consumidor sem data lê-se como "poderia".)_
2. **Consumidor de segredo tem UM lugar.** Qualquer outra menção é ponteiro. Duas listas de consumidor para o mesmo segredo são piores que nenhuma — a errada faz agir.
3. **O que a máquina não vê, declara-se.** Painel da Vercel, conector do claude.ai, Bitwarden, painel do Supabase: o gerador não alcança. A coluna dessas fontes é manual **e marcada como não-verificável**, nunca omitida.

## Declaração no ponto de consumo (o que alimenta a lista)
Todo lugar que LÊ um segredo carrega uma linha, no formato fechado:
```
# segredo: RESEND_API_KEY — envia o aviso de acesso ao acervo — casa: ccev
```
Exigida em: `.github/workflows/*.yml` · `supabase/functions/**` · `tools/**` · `scripts/**` · `.env.example`.
_(O precedente existe e morde: `portfolio-automacoes/tools/ci/gate_runner_declarado.py` já obriga todo workflow a declarar por que usa o runner `brasil`, com vocabulário fechado e falha real.)_

## Alçada (D202)
| peça | dono | classe |
|---|---|---|
| a regra e o registro | escritório | **B** |
| a declaração no código | cada casa, no ponto de consumo | **A** (dela) |
| o dente no gate + kit | escritório | **B** |
| **rotacionar / revogar / desligar** | **o dono** — é o único que alcança painel e cofre | **C**, sempre em caixa de clique |

⚠️ **O escritório NUNCA rotaciona, apaga chave ou reescreve histórico** (D200 + D208). Ele mede, lista e leva.

## Vacinas
1. **`V-PORTA-DE-ENTRADA-SEM-PORTA-DE-SAIDA`** — o portfólio instrumentou *"está entrando segredo no git?"* em 7 repos e **nunca** instrumentou *"posso mexer neste segredo?"*. São perguntas opostas; **o dano passa pela saída**.
2. **`V-CAMPO-QUEM-USA-ESCRITO-DE-CABECA`** — coluna de consumidor escrita à mão infla nos dois sentidos: nomes a mais fazem preservar o morto, nomes a menos fazem apagar o vivo.
3. **`V-MODELO-CERTO-COM-DENOMINADOR-DE-1`** — quando uma linha resolve bem um problema de classe, medir **quantos itens da classe ela cobre** antes de dar o problema por resolvido. 1 de 25 é protótipo, não solução.
4. **`V-LACUNA-DECLARADA-NAO-E-LACUNA-TRATADA`** — este buraco foi declarado pelo próprio escritório em **19/06** como `[A VERIFICAR]` e ficou **67 dias** sem dono enquanto os incidentes aconteciam. Todo `[A VERIFICAR]` em superfície canônica nasce com **dono + data de revisão**, ou o linter o conta como ABERTO.
5. **`V-DESCOBRIR-O-DANO-PELO-ESTRAGO`** — o procedimento de rotação escrito no cofre era *"robô que falhar: pedir o valor novo"*. Esperar quebrar **é** o método que o dono está reclamando; não escrever isso como se fosse processo.

Referência normativa: **D200 · D202 · D203 · D206 · D208 · D71** · achados da lente de segredos (2026-08-25).
