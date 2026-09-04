STATUS: ROTEADA
# 📣 Diretriz do Escritório a todas as unidades — o que a Keepee colheu (onda Fase 3, 2026-08-22)

> **De:** Escritório do MOU (PMO) · **Para:** todas as unidades de negócio do portfólio · **Fila:** MR-77 · **Desce:** JÁ (política/doutrina, D121).
> **Como aplicar:** o orquestrador de cada unidade lê esta carta no boot (ela é depositada em `caixa-de-entrada/do-escritorio/` do seu repo), aplica sob o gate do próprio projeto (D21), e move para `processados/`. Diretriz é proposta fundamentada, não ordem cega.
> **Idioma humano (D159):** os códigos entre parênteses (E-062, MR-77…) são só a etiqueta para rastrear — o que importa é a ideia em português, abaixo.

A Keepee acabou de fazer uma auditoria profunda de tudo que decidiu nas últimas semanas e uma "banca" de 25+ lentes. O resultado tem **4 lições que valem para todo mundo**. Nenhuma delas é urgência sua hoje — são jeitos de trabalhar que evitam erros que já custaram tempo e dinheiro numa unidade e podem custar na sua.

## 1. Corrigir um fato num lugar só não basta — o fato mora em vários lugares (a "doença-mãe")
Quando o dono **congela, apaga, renomeia ou muda um número**, esse fato normalmente é atualizado em UM documento — e os outros que repetem o fato antigo **apodrecem** e passam a mentir. Nossos controles (gate, linter, CI) checam se o ESTADO está certo, mas **nenhum checa se a mudança se ESPALHOU** para todas as superfícies.
- Caso real caro: uma cobrança de R$ 1,4 milhão saiu pedindo ~R$ 19 mil **a menos** porque o número foi atualizado em 3 arquivos, mas **não na carta que já tinha ido para o devedor**.
- **O que fazer (barato):** ao mudar um FATO, antes de fechar, **procure o valor ANTIGO no repositório inteiro** e veja onde ele ainda sobrevive. E dê prioridade ao **documento que já SAIU de casa** (carta, e-mail, anexo, número enviado) — é o que dói mais.
- **Regra de ouro nova:** nenhuma instância afirma "está exposto / congelado / no ar" a partir de um documento — **verifique ao vivo** e carimbe a data, ou marque `[A VERIFICAR]`. *(Foi assim que a Keepee descobriu que um app dado como "congelado" na verdade estava apagado há dias.)*

## 2. Infra que para em silêncio (o robô mudo)
Um robô compartilhado da casa (o "runner brasil") **ficou ~5 a 7 dias sem rodar nada** e ninguém viu — porque quando um agendamento é cancelado, o GitHub **não manda e-mail** (só manda quando FALHA). Resultado: dados que deviam ser coletados todo dia foram perdidos em silêncio.
- **O que fazer:** todo robô crítico ganha um **"vigia"** — um robôzinho que roda algumas vezes por dia, olha se cada robô importante teve sucesso recente e, se algum ficou mudo, **ele falha de propósito** (falha dispara e-mail, então você fica sabendo). O kit `vigia-robos` está pronto no `PADRAO-DE-REPO.md` — não precisa de senha nova.
- **E:** um robô próprio (runner dedicado) que não está pegando trabalho é uma **armadilha, não economia** — mantenha o agendamento crítico no runner público (visível) até provar que o próprio está funcionando.

## 3. Régua que apaga/revoga coisa precisa de "contra-argumento" de verdade
A Keepee escreveu uma régua para decidir "quando um arquivo pesado pode sair do git" — e ela tinha um defeito grave: **autorizava apagar a cópia única de um dado** que a empresa vai perder acesso, e se autodestruía (a receita de refazer lia justamente o arquivo que mandava apagar).
- **Lição:** toda régua cuja consequência é **destrutiva ou irreversível** (apagar dado, encerrar acesso, despublicar, revogar) só vale se o campo **ANTÍTESE** (o "e se isso der errado?") estiver preenchido **de verdade**, não como formulário. "Régua destrutiva sem antítese é formulário preenchido, não doutrina cumprida."
- Régua boa de exemplo: só apague um arquivo pesado se **as 4 coisas** valerem juntas — a tabela está cheia e conferida ao vivo + **existe backup do banco fora do banco e fora do git, com data** + a carga se refaz de uma fonte que **não é** o arquivo que você vai apagar + o documento diz de que lado está a fonte original. E dado de sistema que a empresa vai perder: **nunca** se apaga sem cópia durável em terceiro lugar, verificada.

## 4. Como se faz uma auditoria profunda de verdade (10 regras)
Se você for rodar uma banca/auditoria grande na sua unidade, use o método que a Keepee provou (está no `AUDITORIA-TRIPLO-LIMPO.md` do escritório). Os destaques em linguagem simples: **conte "o tudo" antes de auditar** (não dá pra auditar "tudo" sem saber o tamanho); as lentes **não** recebem a lista de pendências que a casa já conhece (senão confirmam em vez de achar); **"só leitura" tem que ser um mecanismo**, não uma promessa; **número entregue ao dono diz o recorte na mesma linha** e é reconferido por outra mão; e **nunca abra sessão nova durante a banca** — cada lente é um subagente. Auditoria que só levanta problemas é diferente de auditoria que também conserta — o "triplo limpo" é calibrado diferente para cada.

---

## O que é seu (por unidade)
- **Todas:** adotem a regra "verificar ao vivo antes de afirmar" e a "varredura pós-mudança" (item 1) — são baratas e evitam mentir para o dono. Ao fechar sua próxima sessão, considerem o **check de data-do-selo** e o **vigia-robos** (se você tem robôs).
- **Quem tem robô/cron:** peguem o `vigia-robos` do `PADRAO-DE-REPO.md`. E **não migrem crons para o runner `brasil`** até o escritório confirmar que ele voltou a pegar trabalho (item 2).
- **EDU:** só a estrutura/gate desta carta se aplica — nada de conteúdo (D-EDU-2).
- **ACK:** confirmem na sua `caixa-de-entrada/do-escritorio/processados/` quando aplicarem, para o escritório fechar a célula da MR-77.

*Detalhe técnico e as candidatas de codex (E-062/063/064 + vacinas) estão em `escritorio-do-mou/caixa-de-entrada/keepee/2026-08-22_keepee_colheita-onda-fase3.md`. Origem: unidade Keepee, banca K3 + auditoria de decisões de 22/08.*
