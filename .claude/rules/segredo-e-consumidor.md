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
**Duas metades, fronteira escrita** _(retificado 09/09 — antes mandava usar só a 1ª, que a casa já provara errada em 6 linhas: A-624)_:
- **medido pela máquina** → `CONSUMIDORES-DE-SEGREDO-MEDIDO.md` (no escritório, gerado por medição, com data e fonte) = *"quem JÁ usa"*. **Comece aqui.**
- **fora do alcance da máquina** (painel Vercel/Supabase, conector claude.ai, Bitwarden) → `SEGREDOS-E-CONSUMIDORES.md` na **caixa de ferramentas** (repo `portfolio-automacoes`, **ao lado** desta casa, não dentro), por **SEGREDO**, marcado não-verificável. Co-montado em toda sessão (D162).

⚠️ **Não revoga "consumidor tem UM lugar"**: são dois EIXOS (*medido* × *declarado porque a máquina não vê*), não duas listas do mesmo fato. Linha nos dois com valores diferentes = defeito, e o medido vence.
⚠️ **Não confundir com o cofre** (`ACESSOS-FERRAMENTAS.md`): ele é indexado por FERRAMENTA e responde *"como uso isto?"*; este responde *"quem quebra se eu mexer?"*. Eixos e SSOTs diferentes (A-002).

## As 4 coisas que não se negociam
1. **A coluna "quem usa" NUNCA se escreve de cabeça.** Gera-se por medição (grep/API), com data e fonte. _(4 das 10 linhas do Top-10 do cofre tinham "quem PODERIA usar" dentro de "quem JÁ usa": coluna sem data lê-se como "poderia".)_
2. **Consumidor de segredo tem UM lugar.** Qualquer outra menção é ponteiro. Duas listas de consumidor para o mesmo segredo são piores que nenhuma — a errada faz agir.
3. **O que a máquina não vê, declara-se** — a coluna dessas fontes (as da 2ª metade acima) é manual, **marcada não-verificável**, nunca omitida.
4. **O VERIFICADOR NUNCA CARREGA O SEGREDO.** Teste *"a senha vazou?"* **não se escreve como busca pelo texto literal da senha** — escrever o teste grava o valor dentro da ferramenta feita para impedi-lo, e ela vai ao git no commit seguinte. Busque pelo **nome da variável**, pela **forma** (regex do formato) ou pelo **hash**; valor indispensável entra por env-var no ato, nunca no arquivo. _(Dois dentes: o `varredura-de-segredos.mjs` na entrada — A-813, Keepee 17/09 — e a **2ª lente do `gate-segredo-declarado.py`** (26/09), que acende em linha NOVA com FORMA de credencial e **nunca reproduz o valor**; crachá público é isento, D206 — A-833.)_

## Declaração no ponto de consumo (o que alimenta a lista)
Todo lugar que LÊ um segredo carrega uma linha, no formato fechado — **no comentário da linguagem
daquele arquivo**:
```
# segredo: RESEND_API_KEY — envia o aviso de acesso ao acervo — casa: ccev     ← shell, Python, YAML
// segredo: RESEND_API_KEY — envia o aviso de acesso ao acervo — casa: ccev    ← TypeScript, Deno, JS
```
**A linha vai ACIMA da leitura, dentro de 6 linhas.** _(⚰️ 14/09: exigir só `#` tornava a regra
incumprível em TypeScript, justo nas funções Deno onde moram as credenciais — A-680.)_
Exigida em: `.github/workflows/*.yml` · `supabase/functions/**` · `tools/**` · `scripts/**` · `.env.example`.
_(Precedente que morde: o `gate_runner_declarado.py` da caixa de ferramentas.)_

## Alçada (D202)
| peça | dono | classe |
|---|---|---|
| a regra e o registro | escritório | **B** |
| a declaração no código | cada casa, no ponto de consumo | **A** (dela) |
| o dente no gate + kit | escritório | **B** |
| **rotacionar / revogar / desligar** | **o dono** — é o único que alcança painel e cofre | **C**, sempre em caixa de clique |

⚠️ **O escritório NUNCA rotaciona, apaga chave ou reescreve histórico** (D200 + D208). Ele mede, lista e leva.

## Vacinas
1. **`V-PORTA-DE-ENTRADA-SEM-PORTA-DE-SAIDA`** — o portfólio instrumentou *"está entrando segredo no git?"* em 7 repos e **nunca** *"posso mexer neste segredo?"*. Perguntas opostas; **o dano passa pela saída**.
2. **`V-CAMPO-QUEM-USA-ESCRITO-DE-CABECA`** — coluna escrita à mão erra nos dois sentidos: nome a mais preserva o morto, nome a menos apaga o vivo.
3. **`V-MODELO-CERTO-COM-DENOMINADOR-DE-1`** — linha que resolve bem um problema de classe: medir **quantos itens da classe ela cobre** antes de dar o problema por resolvido. 1 de 25 é protótipo.
4. **`V-LACUNA-DECLARADA-NAO-E-LACUNA-TRATADA`** — este buraco ficou 67 dias como `[A VERIFICAR]` sem dono, enquanto os incidentes aconteciam. Todo `[A VERIFICAR]` em superfície canônica nasce com **dono + data de revisão**; dente no check `[lacuna]` do `linter-estado.sh` (AUD-6).
5. **`V-DESCOBRIR-O-DANO-PELO-ESTRAGO`** — o procedimento de rotação no cofre era *"robô que falhar: pedir o valor novo"*. Esperar quebrar **é** a dor que o dono relatou; não se escreve isso como processo.

Referência normativa: **D200 · D202 · D203 · D206 · D208 · D71** · achados da lente de segredos (2026-08-25).
