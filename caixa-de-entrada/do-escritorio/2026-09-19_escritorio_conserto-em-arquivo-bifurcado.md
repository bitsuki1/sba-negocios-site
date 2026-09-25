STATUS: ROTEADA
# O escritório mudou 11 arquivo(s) que aqui tem versão SUA

> **De:** Escritório do MOU · **Data:** 2026-09-19
> **Natureza:** conserto DESCRITO (não é cópia; quem aplica é você, sob o seu gate — D21)
> **Nada foi escrito nesta casa por esta carta.**

## Por que descrito, e não copiado

O motor de propagação media se o arquivo **existe** aqui e, existindo, copiava o meu por
cima. Media a forma. Hoje ele mede o fato: **este arquivo, aqui, não descende de nenhuma
versão que o escritório já teve** — vocês partiram da semente e a fizeram crescer. Copiar
por cima apagaria isso em silêncio, e a onda de hoje ia fazer exatamente isso em 21 casas.

Então o conteúdo continua sendo de vocês. O que desce é a MUDANÇA, para vocês julgarem.

## `.claude/rules/README.md`

- **no escritório:** `.claude/rules/README.md`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `.claude/rules/decisao-e-alcada.md`

- **no escritório:** `.claude/rules/decisao-e-alcada.md`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `.claude/rules/instanciacao-por-repo.md`

- **no escritório:** `.claude/rules/instanciacao-por-repo.md`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `.claude/rules/linguagem-e-ferramentas.md`

- **no escritório:** `.claude/rules/linguagem-e-ferramentas.md`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `.claude/rules/regua-de-admissao.md`

- **no escritório:** `.claude/rules/regua-de-admissao.md`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `.claude/rules/segredo-e-consumidor.md`

- **no escritório:** `.claude/rules/segredo-e-consumidor.md`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `scripts/revisar-mapa.py`

- **no escritório:** `processos/revisar-mapa.py`
- **última mudança minha:** `b99793f94` — triagem 19/09: 52 cartas processadas com veredito + 12 itens classe B + 2 lentes e 3 consertos no kit

O diff (aplique o SENTIDO, não o texto — os arredores são seus):

```diff
diff --git a/processos/revisar-mapa.py b/processos/revisar-mapa.py
index f7c72d5..ecd2b05 100644
--- a/processos/revisar-mapa.py
+++ b/processos/revisar-mapa.py
@@ -142,11 +142,18 @@ def _instrucao_de_resposta(lin, cod):
 
 
 def secoes(texto):
-    """Divide o markdown nas seções `# 🔒`, `# ⚙️`, `# 📌`, guardando o número da linha."""
+    """Divide o markdown nas seções `# 🔒`, `# 🧊`, `# ⚙️`, `# 📌`, guardando o número da linha.
+
+    ⚠️ **A 🧊 faltava nesta lista, e o custo era silencioso** (achado da L10, 19/09, na 1ª rodada
+    dela contra o mapa desta casa): `# 🧊 CONGELADO` não casava o padrão, então tudo o que vinha
+    depois dele continuava sendo atribuído à pista ANTERIOR — a 🔒. Toda lente que lê 🔒 (L5, L6,
+    L9, L10, L11) vinha julgando conteúdo CONGELADO como se fosse fila ativa. A lente nova achou
+    um defeito do próprio instrumento antes de achar um defeito de mapa: é para isso que serve o
+    canário (E-086)."""
     out, atual = {}, None
     cab = []
     for i, lin in enumerate(texto.split("\n"), 1):
-        m = re.match(r"^# (🔒|⚙️|📌|📅|💬)", lin)
+        m = re.match(r"^# (🔒|🧊|⚙️|📌|📅|💬)", lin)
         if m:
             atual = m.group(1)
             out[atual] = []
@@ -373,6 +380,70 @@ def revisar(texto):
                      "cita “%s” pelo nome, sem link que abra" % alvo,
                      "troque por link: %s%s — nome de arquivo ele copia, procura e não "
                      "acha (ordem dele, 09/09)" % (_base_do_repo(), alvo)))
+
+    # ── L10 · item 🔒 que não diz se JÁ foi à caixa de clique — COLHEITA DO `portfolio-automacoes` ──
+    # A D203 manda que decisão dele vá em CAIXA DE CLIQUE; a D222 recorta — o mapa é onde a coisa
+    # MORA, a caixa continua sendo o gesto de DECIDIR. Entre as duas sobra um vão: um item pode
+    # morar no 🔒 por dias sem que ninguém tenha perguntado nada a ele, e nenhuma superfície
+    # registra a diferença. Item que espera decisão sem ter sido perguntado NÃO está esperando —
+    # está parado, e quem lê o mapa não distingue os dois. Medido pela casa em 18/09: dois itens
+    # 🔒 desde 17/09, e `grep -ri "caixa de clique"` no log dela devolvia ZERO.
+    # ⚠️ LIMITE DECLARADO, e ele importa: esta lente NÃO prova que a caixa foi aberta na tela dele.
+    # Gate nenhum lê o chat (D224 diz isso com todas as letras; prometer o contrário repetiria o
+    # A-622). Ela move o erro de "ninguém reparou que a pergunta não foi feita" para "alguém
+    # escreveu que foi" — que é MENOS, e dizer que é menos é a parte honesta.
+    # ⚠️ A pista 🧊 fica DE FORA de propósito: congelado é decisão que ELE já tomou ("você congelou
+    # em …"), logo a pergunta já chegou. Cobrar a declaração ali seria pedir prova de uma caixa que
+    # a própria linha do item registra — falso-vermelho, e falso-vermelho custa o mesmo que
+    # falso-verde.
+    if "🔒" in sec:
+        bloco, cab_ln = [], None
+        def _fecha(bloco, cab_ln):
+            if cab_ln is None:
+                return
+            txt = "\n".join(bloco)
+            if "caixa de clique" not in txt.lower():
+                achados.append(
+                    ("L10 sem dizer se foi à caixa", cab_ln,
+                     "item 🔒 não diz se já foi à caixa de clique",
+                     "acrescente UMA linha: `**Levado em caixa de clique:** AAAA-MM-DD` ou "
+                     "`**Ainda não levado em caixa de clique** — vai na resposta de hoje`"))
+        for i, l in sec["🔒"]:
+            if l.startswith("## "):
+                _fecha(bloco, cab_ln)
+                bloco, cab_ln = [l], i
+            elif cab_ln is not None:
+                bloco.append(l)
+        _fecha(bloco, cab_ln)
+
+    # ── L11 · pista SEM item, mas COM prosa — COLHEITA DO `portfolio-automacoes` ────────────────
+    # A regra nº 1 do molde é "só PENDÊNCIA; o que foi feito SAI do mapa, inteiro, com o item". A
+    # lente que existe para isso (L2, obra feita) caça uma LISTA DE VERBOS escrita à mão. Contra
+    # texto escrito pela mesma instância que conhece a lista, ela vale zero — não por má-fé, por
+    # composição: cada frase nova sorteia outro sinônimo. Medido pela casa em 18/09: as duas
+    # decisões fecharam, os dois itens saíram, e a pista 🔒 ficou com ZERO itens e 8 linhas
+    # recapitulando o que ele acabara de decidir — a L2 passou, porque os verbos usados não
+    # estavam na lista dela.
+    # O DENTE não olha vocabulário nenhum, olha a FORMA: pista com zero itens e mais de 2 linhas
+    # de texto está narrando em vez de listar. Teto 2 porque pista vazia se diz em UMA linha — e
+    # uma segunda para o link de onde o que fechou foi morar.
+    # ⚠️ LIMITE DECLARADO: não pega pista COM itens e prosa demais em volta. Isso é da L2/L5 e do
+    # olho; fazê-la acender por tamanho trocaria "defeito" por "comprimento", e comprimento não é
+    # defeito.
+    for s_p, e_item in (("🔒", lambda l: l.startswith("## ")),
+                        ("⚙️", lambda l: l.strip().startswith("|"))):
+        if s_p not in sec:
+            continue
+        corpo = [(i, l) for i, l in sec[s_p] if not l.startswith(">")]
+        itens = [1 for _, l in corpo if e_item(l)]
+        prosa = [l for _, l in corpo if l.strip() and not e_item(l)]
+        if not itens and len(prosa) > 2:
+            achados.append(
+                ("L11 pista sem item, com prosa", min([i for i, _ in corpo], default=1),
+                 "a pista %s tem ZERO itens e %d linhas de texto" % (s_p, len(prosa)),
+                 "pista vazia se diz em UMA linha (mais uma para o link de onde o que fechou foi "
+                 "morar) — o resto é narrar, e narrar sai do mapa"))
+
     return achados
 
 
@@ -405,6 +476,7 @@ def prova():
 # 🔒 SUAS — 1
 
 ## P1 · 🟧 Apagar as branches
+> **Levado em caixa de clique:** 2026-09-09
 > As três, uma por linha:
 > - https://github.com/x/y/branches/all?query=a
 > - https://github.com/x/y/branches/all?query=b
@@ -596,6 +668,56 @@ def prova():
             "conferida nesta rodada.\n",
             None,
         ),
+        # ── L10 (colheita do `portfolio-automacoes`, 18/09): o item 🔒 tem de DIZER se já foi à
+        # caixa de clique. A mutação tira a linha — e a lente acende. Limite declarado no corpo
+        # dela: isto prova que alguém ESCREVEU, nunca que a caixa abriu na tela dele.
+        (
+            "L10 item 🔒 sem dizer se foi à caixa de clique",
+            bom.replace("> **Levado em caixa de clique:** 2026-09-09\n", ""),
+            "L10",
+        ),
+        (
+            "L10 · a forma NEGATIVA também vale (dizer que ainda não foi é declaração)",
+            bom.replace(
+                "> **Levado em caixa de clique:** 2026-09-09",
… (cortado; o commit inteiro está em `b99793f94`)
```

## `scripts/varredura-de-segredos.mjs`

- **no escritório:** `scripts/varredura-de-segredos.mjs`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `scripts/gerar-mapa-do-dono.py`

- **no escritório:** `processos/gerar-mapa-do-dono.py`
- **última mudança minha:** `b99793f94` — triagem 19/09: 52 cartas processadas com veredito + 12 itens classe B + 2 lentes e 3 consertos no kit

O diff (aplique o SENTIDO, não o texto — os arredores são seus):

```diff
diff --git a/processos/gerar-mapa-do-dono.py b/processos/gerar-mapa-do-dono.py
index c3f55a8..6d1a855 100644
--- a/processos/gerar-mapa-do-dono.py
+++ b/processos/gerar-mapa-do-dono.py
@@ -182,7 +182,10 @@ def inline(md):
         r'<a href="\1" target="_blank" rel="noopener">\1</a>',
         s,
     )
-    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
+    # ⚠️ `re.S`: em markdown, linhas consecutivas são UM parágrafo e o `**negrito**` atravessa
+    # a quebra. Sem a flag, o asterisco saía CRU na tela dele — medido pelo
+    # `portfolio-automacoes` na página republicada em 18/09, na 1ª linha de uma resposta a ele.
+    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s, flags=re.S)
     s = re.sub(r"~~(.+?)~~", r"<s>\1</s>", s)
     s = re.sub(r"(?<![\w*])\*(?!\s)([^*\n]+?)\*(?![\w*])", r"<i>\1</i>", s)
     s = re.sub(r"(?<![\w_])_(?!\s)([^_\n]+?)_(?![\w_])", r"<i>\1</i>", s)
@@ -662,8 +665,12 @@ def render(doc, casa_kicker):
                     + "</tbody></table>"
                 )
         else:
-            for x in linhas_c:
-                out.append(f'  <p class="sec-note">{inline(x.strip())}</p>')
+            # ⚠️ Uma linha do markdown NÃO é um parágrafo. Este caminho abria um `<p>` por
+            # linha e partia a frase ao meio na tela dele (o `- ` do bullet aparecia como
+            # texto). O caminho da 💬 já dividia por BLOCO separado de linha em branco;
+            # os dois passam a usar a mesma divisão. Achado do `portfolio-automacoes`, 18/09.
+            for bloco in [b.strip() for b in "\n".join(linhas_c).split("\n\n") if b.strip()]:
+                out.append(f'  <p class="sec-note">{inline(bloco)}</p>')
     # 💬 RESPOSTAS (molde v2): a pista que ele pediu — "as mensagens e respostas se perdem nas
     # conversas". Renderiza a prosa como está: aqui não há tabela nem card, é conversa registrada.
     if "💬" in S:
```

## `scripts/gate-segredo-declarado.py`

- **no escritório:** `processos/gate-segredo-declarado.py`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## `gate-fechamento.sh`

- **no escritório:** `processos/templates/gate-fechamento.sh`
- **última mudança minha:** `01ee1d9bf` — Mapa do planejamento v2 + auditoria do escritório (PR #337)

⚠️ **Não consegui extrair o diff desta mudança, então esta seção NÃO pede ato.**
Ela existe só para você saber que mexi no meu arquivo — o seu continua sendo seu.
Se quiser ver o que mudou: <https://github.com/bitsuki1/escritorio-do-mou/commit/01ee1d9bfd7fba6f425645b0c69ee3d36cda9d4e>
(endereço completo de propósito: o `01ee1d9bf` é commit do MEU repositório e **não resolve**
no seu `git show`.)

## Como fechar

`STATUS: APLICADA` no topo — **ou** `STATUS: RECUSADA` com o motivo, que vale tanto quanto:
recusa por escrito entra no meu motor e ele para de reenviar (foi o que a Potencial Urbano
fez em 10/09 e estava certa).

_Escritório do MOU — 2026-09-19._
