# MAPA DE PENDÊNCIAS — <Unidade>
> **🌐 URL para o dono olhar (padrão D172):** <URL-do-Artifact> — republicada no MESMO endereço a cada mudança (é foto do SSOT deste arquivo, não um 2º original; republicar SEMPRE com o parâmetro `url=` — sem ele nasce duplicata, C130). Fonte HTML: `<caminho-do-html-no-repo>`.
> **Atualizado: AAAA-MM-DD (v<N> — <motivo desta versão>)** · **Só pendência.** O que já foi feito vive em <ledger/handoff> — não se repete aqui.
> Regras deste mapa (D172 + D159 + D181 + D182): **item SEU** = passo a passo numerado com **LINK DIRETO, um por ação** (rótulo textual do destino junto — se a URL morrer, a prosa resgata) · **item MEU** = o que é e por quê, curto · **ordem = o que destrava mais vem primeiro** · **toda pendência sua foi RE-VERIFICADA nesta edição** (nada aqui cobra o já-feito) · em português, sempre.
> **⭐ MÉTODO OFICIAL (MOU 2026-08-22 — reforça D172/D191):** (1) **SÓ PENDÊNCIAS** — o mapa **nunca** tem campo de "o que foi feito" nem explicação de execução; entregue sai do mapa (registro vive no git/handoff). (2) **Códigos curtos e fáceis** (V1, V2… uma letra + número) para o dono responder direto pelo código. (3) **As PERGUNTAS (decisões do dono) o maestro traz em CAIXAS na tela** (ferramenta de pergunta/opções, uma a uma) — o mapa é o registro, as caixas são o canal de resposta; não deixar o dono garimpar decisão dentro do mapa.
> Este mapa é a SUA vista. O detalhe mora no SSOT apontado — aqui é a superfície para decidir e agir em 1 leitura.

---

# 🔒 SUAS — itens (só você faz; cada passo já vem com o link do lugar exato)

## 1. <🟥|🟧|🟨|🟦> <Título em linguagem de gente> — <placar, se houver>
**O que é:** <1-3 linhas: o que é + por que importa + o que destrava. Termo técnico sempre glosado na 1ª vez — ex.: "galho (*branch*) = linha de trabalho paralela do código">.
**Placar:** <se contável — e declare COMO conta: "por prefixo de célula", nunca por símbolo solto>.
**Passo a passo:**
0. <se existir um clique que mata a CLASSE do problema (ex.: ligar um automático), ele é o passo 0>
1. **<Ação>** → <URL-direta> (<rótulo do destino>). *(<aviso do que NÃO fazer, se houver>)*
2. …
> **Rec.:** <recomendação fechada — e POR SUB-DECISÃO quando o item tem (a)(b)(c), nunca uma genérica só>.
<details><summary>histórico do item</summary>(opcional — o rastro fica DENTRO do item, nunca num doc à parte para o dono procurar)</details>

## 2. …

---

# 📅 PRÓXIMA INSTÂNCIA — a fila já combinada (você não precisa fazer nada agora)
> O que abriremos na próxima sessão, na ordem combinada — para você ver a fila sem perguntar "e depois?".
1. <item combinado + gatilho ("quando você disser X")>
2. …

---

# ⚙️ MINHAS — não precisam de você (estão aqui para você VER, não para cobrar)

| id | o que é | estado |
|---|---|---|
| <id> | <o que é e por quê, 1 linha> | <🤖 fazendo · 🕑 agendado · 👀 acompanhando · ⚙️ na fila> |

_(Nenhum ✅ de item concluído mora aqui — C128. Rastro do dia, se necessário: 1 linha marcada "sai na próxima edição" — e sai mesmo.)_

_(**Estado ⏸️ parado — emenda D172, onda-2 AVC 2026-08-21:** item do DONO que ele decidiu ADIAR mostra o chip **"⏸️ parado (sua ordem)"** — cinza/esmaecido, **NÃO** entra na numeração de alavanca; o cabeçalho conta "N ativas + M parado(s)". Sem esse estado o mapa incha com decisões que o dono já mandou esperar. Implementação de referência: gerador `scripts/gerar_mapa_do_dono.py` da AVC — o item ganha `"parado": true`.)_

---

# 📌 LIMITES DECLARADOS — não são pendência, e não se apagam
> Ficam aqui para não sumirem, não para serem cobrados.
- <risco aceito (D106) · decisão de não-fazer · bloqueio externo · item migrado para outra instância · mecanismo aposentado>

---
> **Regras deste mapa (leis do dono):** D176 — tudo que você pede e tudo que eu descubro entra AQUI no instante · D181 — ação sua = LINK direto um a um; mapa fora do padrão = defeito a corrigir na hora · D182 — nada aqui cobra pendência morta, e nenhum passo pede que você guarde/cole/lembre algo.
> **Onde mora o detalhe:** <ponteiros ao SSOT — 1 linha>. Esta é a sua vista; eu a atualizo a cada mudança.

<!-- ═══ NOTAS PARA A INSTÂNCIA (apagar? NÃO — ficam como comentário invisível no render) ═══
1. NOME CANÔNICO: MAPA-DE-PENDENCIAS.md na RAIZ do repo (o gate procura aí).
2. ESPELHO: manter o HTML no repo + registrar arquivo→URL na tabela anti-duplicata local; portar o
   test_mapa_espelho.py (kit) para vigiar md↔HTML 1:1 na CI.
3. RE-VERIFICAÇÃO (D182): antes de cada edição, re-medir cada item 🔒 pelo canal que existir; sem canal,
   rotular "não-verificável por mim — confirme". Mostrar o rastro ("a lista de X dizia 32; hoje são 20").
4. CONTAGEM (D4): por PREFIXO de célula. Proibido artigo definido sobre subconjunto ("as 7" quando são 20).
5. PROIBIDO no mapa: "olhe o arquivo X" (C114) · pedir o que a máquina obtém sozinha (C115) · jargão sem
   glosa (C113) · item-paredão que diz só "não aja" (C110) · pergunta seca sem recomendação (C116/D40).
═══ -->

---

## 🎯 O PADRÃO DEFINITIVO (D191, ordem do dono 2026-08-21) — 2 PISTAS, RESOLVIDO SAI, MODO AUTÔNOMO
Todo mapa de pendências do portfólio segue ISTO, sem variação por sessão:

### Pista 🔒 SEU (o dono FAZ) — SEMPRE didático
Cada item obrigatoriamente com:
1. **Link direto para a TELA exata** (a URL mais funda possível — não a home, a tela do clique; D181).
2. **Passos numerados** (1, 2, 3…) — o "como" nunca fica para ele descobrir.
3. **"Pronto quando:"** — o que ele VÊ na tela ao terminar (para saber que deu certo).
> Item 🔒 sem link-de-tela + passos = **defeito do mapa**. O dono nunca deve precisar perguntar "como faço?".

### Pista 🤖 MEU (a máquina FAZ) — MUDO
Cada item = **1 linha do que é** + **o estado**: `⏳ posso fazer` · `🔄 rodando` · `✅ feito`. **Zero explicação** do trabalho (o dono despacha "vai" ou vê rodando; o detalhe técnico vive no git, não aqui).

### Resolvido SAI da vista
O mapa mostra **só o ABERTO**. Feito → rastro (git). Nada de "coisa resolvida" poluindo a superfície.

### Modo autônomo (o "boi esperando acordar")
Toda onda roda com: *"execute TUDO ao seu alcance sem parar para perguntar; só pare para (a) decisão que só o dono toma ou (b) fim; e ao parar, diga em 1 linha SE terminou ou O QUE espera."* Sessão parada em silêncio = falha de fecho de turno. O dono pergunta à torre "está trabalhando?" → a torre mede o estado real (RUNNING/IDLE) por API.

### Link a link + máquina-primeiro (D192)
Item 🔒 com N coisas parecidas (galhos, DNS, contas) = **um link por item**, na tela mais funda (galho → `…/branches/all?query=<nome>`). Tela única + lista de nomes = defeito. E a instância **tenta fazer pela ferramenta antes**; só o que a ferramenta nega vira clique do dono.

### Escopo do mapa (D193)
Mapa de UNIDADE carrega o resíduo DELA. O mapa do ESCRITÓRIO carrega só escritório/portfólio — não hospeda pendência interna de unidade (aponta "resíduo no mapa DA unidade" e reflete só o estado ✅/🔄 da onda).
