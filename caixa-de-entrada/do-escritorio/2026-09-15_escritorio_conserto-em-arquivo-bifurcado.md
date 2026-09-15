# O escritório mudou 2 arquivo(s) que aqui tem versão SUA

> **De:** Escritório do MOU · **Data:** 2026-09-15
> **Natureza:** conserto DESCRITO (não é cópia; quem aplica é você, sob o seu gate — D21)
> **Nada foi escrito nesta casa por esta carta.**

## Por que descrito, e não copiado

O motor de propagação media se o arquivo **existe** aqui e, existindo, copiava o meu por
cima. Media a forma. Hoje ele mede o fato: **este arquivo, aqui, não descende de nenhuma
versão que o escritório já teve** — vocês partiram da semente e a fizeram crescer. Copiar
por cima apagaria isso em silêncio, e a onda de hoje ia fazer exatamente isso em 21 casas.

Então o conteúdo continua sendo de vocês. O que desce é a MUDANÇA, para vocês julgarem.

## `scripts/gate-segredo-declarado.py`

- **no escritório:** `processos/gate-segredo-declarado.py`
- **última mudança minha:** `52b0c4952` — Merge pull request #335 from bitsuki1/claude/zen-cray-ez13vg

O diff (aplique o SENTIDO, não o texto — os arredores são seus):

```diff
(sem diff legível — veja o commit acima)
```

## `gate-fechamento.sh`

- **no escritório:** `processos/templates/gate-fechamento.sh`
- **última mudança minha:** `27f70a543` — moer: A-725 · A-726 · A-727 — o pacote de 14/08 da Keepee (32 dias num galho), as 6 perguntas de 25/08, e as 3 "divergentes" medidas nos dois sentidos

O diff (aplique o SENTIDO, não o texto — os arredores são seus):

```diff
diff --git a/processos/templates/gate-fechamento.sh b/processos/templates/gate-fechamento.sh
index d3900b2..75a3ffe 100755
--- a/processos/templates/gate-fechamento.sh
+++ b/processos/templates/gate-fechamento.sh
@@ -124,14 +124,22 @@ if git fetch origin main --quiet 2>/dev/null; then
   elif [ "$CONSOLIDATE" = "1" ]; then
     if [ -f processos/consolidar.sh ] || [ -f consolidar.sh ]; then
       say "      ⚠️ ESTE COMANDO VAI ESCREVER NA \`main\` — $presos commit(s) preso(s), --consolidate pedido (D141)"
-      # ⚠️ A saída NÃO vai mais para /dev/null (achado da Moderação Profinders, 09/09, T-02):
-      # *"se ele falhar no meio, o gate não mostra o quê"*. Um portão que esconde o erro de uma
-      # escrita na main é pior que um portão que não escreve: quem lê o vermelho não sabe onde parou.
-      _saida_cons=$(bash "$( [ -f processos/consolidar.sh ] && echo processos/consolidar.sh || echo consolidar.sh )" 2>&1)
+      # ⚠️ A saída NÃO vai para /dev/null (achado da Moderação Profinders, 09/09, T-02): *"se ele falhar
+      # no meio, o gate não mostra o quê"*. Um portão que esconde o erro de uma escrita na main é pior
+      # que um portão que não escreve. ⊕ 15/09 (A-725): o consolidar agora também ABORTA com a CI
+      # vermelha (TLA-1, nascido na Keepee) — então o gate DEIXOU de afirmar a causa que não mediu:
+      # lê o CÓDIGO de saída e diz qual foi, em vez de chutar "conflito textual".
+      _saida_cons=$(bash "$( [ -f processos/consolidar.sh ] && echo processos/consolidar.sh || echo consolidar.sh )" 2>&1); _cod_cons=$?
       presos2=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 0)
       if [ "$presos2" = "0" ]; then ok "consolidado agora ($presos commit(s))"
       else
-        fail "$presos2 preso(s) — consolidação não fechou (conflito textual real: a INSTÂNCIA resolve por união, não o MOU)"
+        case "$_cod_cons" in
+          5) fail "$presos2 preso(s) — o consolidar PAROU: a CI está VERMELHA no commit (TLA-1). Conserte o check e rode de novo." ;;
+          6) fail "$presos2 preso(s) — o consolidar PAROU: não deu para CONFIRMAR a CI (rede/auth). Exporte GITHUB_TOKEN ou rode o consolidar com --force-sem-ci, por decisão sua." ;;
+          3) fail "$presos2 preso(s) — o push ao main falhou (main protegido/sem permissão): abra PR da branch e faça merge squash." ;;
+          4) fail "$presos2 preso(s) — sem rede para falar com o origin." ;;
+          *) fail "$presos2 preso(s) — consolidação não fechou (código $_cod_cons; conflito textual real: a INSTÂNCIA resolve por união, não o MOU)" ;;
+        esac
         printf '%s\n' "$_saida_cons" | tail -12 | sed 's/^/      │ /'
       fi
     else fail "$presos commit(s) preso(s) e sem consolidar.sh — consolide ao main antes de fechar"; fi
```

## Como fechar

`STATUS: APLICADA` no topo — **ou** `STATUS: RECUSADA` com o motivo, que vale tanto quanto:
recusa por escrito entra no meu motor e ele para de reenviar (foi o que a Potencial Urbano
fez em 10/09 e estava certa).

_Escritório do MOU — 2026-09-15._
