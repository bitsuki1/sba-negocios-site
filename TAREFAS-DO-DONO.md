# TAREFAS DO DONO — a "API/caixa" deste app (D195)
> **Como funciona (D195):** este repo-app `sba-negocios-site` DESENVOLVE; a unidade SBA e/ou o dono só PLANEJAM. Quando a unidade
> (ou o dono) tem uma **tarefa** ou uma **atualização de documentação** para este site, ela deposita AQUI —
> não escreve código na unidade nem empurra produto por fora. O app lê, executa e marca feito.
> É o canal ÚNICO entrada→app. Português sempre. Uma tarefa por bloco. O que está feito desce para o rastro no fim.

## ⏳ Abertas (o app trabalha)

### T-003 · Guardar a nova senha do portão de parceiros no gerenciador
- **Pedido por:** app (auto) · **Data:** 2026-08-26
- **O quê:** o dono pediu a senha do `/guia-etapas`. Ela **não existia mais** — o repositório guarda só o hash SHA-256, que é de mão única, então não havia o que recuperar. Como estava perdida para **todos**, o portão já estava de fato revogado e definir uma nova **não tirou acesso de ninguém**. A senha nova foi entregue ao dono **no chat, uma vez**.
- **Por que isto é uma tarefa:** é exatamente assim que a anterior se perdeu — *"senha que só existe numa conversa some com a conversa"*, lição já registrada dentro do próprio `PortaoParceiros.tsx`. Se ela ficar só no chat, o ciclo se repete.
- **Pronto quando:** a senha estiver salva no **gerenciador de senhas** do dono (ele tem um). **Não** em documento, **não** no git, **não** no chat.
- **Estado:** ⏳ aguarda o dono

### T-002 · Insumos opcionais para o bloco Congonhas do Campo (projeto-farol da CSTR)
- **Pedido por:** app (auto) · **Data:** 2026-08-22
- **O quê:** o pacote V6 do MAPA-DE-PENDENCIAS foi entregue e o bloco do projeto-farol Congonhas do Campo — MG ficou ampliado. Ele funciona sozinho, mas fica ainda mais forte com dois insumos que só o dono/parceiro consegue: **(i)** 1 foto ou render do canteiro (JPG/PNG, mín. 1200×800) — se você tiver do parceiro CSTR; **(ii)** 1 link para notícia externa sobre o projeto (Portal do Município de Congonhas, jornal local, G1, etc.) — para prova externa.
- **Pronto quando:** você me passa 1 ou os 2 aqui, ou responde "não tenho, seguir sem" (a página já está publicada sem esses; T-002 fecha).
- **Estado:** ⏳ opcional (não bloqueia nada)

## ✅ Rastro (feitas / encerradas)
_(as tarefas concluídas descem para cá com a data e o commit)_

### T-001 · Confirmar rename para `sba-negocios-site` — ✅ **CUMPRIDA pelo dono em 2026-08-25**
- **Data:** 2026-08-25 · **Commit:** (esta passada de regularização)
- **✅ FEITO.** O dono renomeou em 2026-08-25. O repositório é **`bitsuki1/sba-negocios-site`** — confirmado pela API do GitHub (`id 1282269823`, mesmo repo criado em 2026-06-27, portanto **renomeado, não recriado**: histórico, issues e o espelho do Lovable preservados, como a regra V-LOVABLE-RENAME previa).
- **Varredura de ponteiros (E-055, 3º tempo):** feita no mesmo turno — 39 ponteiros de identidade corrigidos em 13 arquivos + o `git remote` local + carta ao escritório para ele corrigir o lado dele. Nomes REAIS de branch (`claude/sba-site-…`) e de arquivos de carta já existentes (`_sba-site_`) **não** foram tocados: existem com aquele nome, trocá-los criaria ponteiro quebrado.
- **Nota histórica — por que ela tinha saído daqui em 25/08:** este arquivo é a caixa de **ENTRADA** (unidade/dono → app manda TAREFA para o app executar). T-001 não é tarefa para o app executar — é **decisão + clique do dono**, e decisão do dono mora no `MAPA-DE-PENDENCIAS.md`. Estava duplicada nos dois lugares (aqui como T-001, lá como V1): duas superfícies cobrando a mesma coisa é o ruído que o próprio padrão do mapa manda eliminar.
- **Onde vivia:** `MAPA-DE-PENDENCIAS.md` → **V1**. Agora que está feito, a V1 **saiu do mapa** (regra "resolvido SAI").
- **Nota de fato:** a ordem de abertura do escritório supôs, de manhã, que T-001 já estivesse cumprida "porque o repo se chama `sba-site`". Naquele momento a suposição estava **invertida** (`sba-site` era o nome ANTIGO). O dono fez o clique no fim do dia, e aí sim ficou cumprida. Registro os dois momentos para o rastro não sugerir que a ordem estava certa desde o início.
