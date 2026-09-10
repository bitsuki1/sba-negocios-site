STATUS: ROTEADA
# O escritório mudou 1 arquivo(s) que aqui tem versão SUA

> **De:** Escritório do MOU · **Data:** 2026-09-10
> **Natureza:** conserto DESCRITO (não é cópia; quem aplica é você, sob o seu gate — D21)
> **Nada foi escrito nesta casa por esta carta.**

## Por que descrito, e não copiado

O motor de propagação media se o arquivo **existe** aqui e, existindo, copiava o meu por
cima. Media a forma. Hoje ele mede o fato: **este arquivo, aqui, não descende de nenhuma
versão que o escritório já teve** — vocês partiram da semente e a fizeram crescer. Copiar
por cima apagaria isso em silêncio, e a onda de hoje ia fazer exatamente isso em 21 casas.

Então o conteúdo continua sendo de vocês. O que desce é a MUDANÇA, para vocês julgarem.

## `gate-fechamento.sh`

- **no escritório:** `processos/templates/gate-fechamento.sh`
- **última mudança minha:** `f4826b0c1` — T-02 moído: o portão que escondia o erro da escrita na main, e o canal que faltava

O diff (aplique o SENTIDO, não o texto — os arredores são seus):

```diff
diff --git a/processos/templates/gate-fechamento.sh b/processos/templates/gate-fechamento.sh
index 6c37d24..a811431 100755
--- a/processos/templates/gate-fechamento.sh
+++ b/processos/templates/gate-fechamento.sh
@@ -123,10 +123,17 @@ if git fetch origin main --quiet 2>/dev/null; then
   if [ "$presos" = "0" ]; then ok "0 commit preso — tudo no main"
   elif [ "$CONSOLIDATE" = "1" ]; then
     if [ -f processos/consolidar.sh ] || [ -f consolidar.sh ]; then
-      say "      $presos preso(s) — consolidando (ato deliberado --consolidate, D141)…"
-      bash "$( [ -f processos/consolidar.sh ] && echo processos/consolidar.sh || echo consolidar.sh )" >/dev/null 2>&1
+      say "      ⚠️ ESTE COMANDO VAI ESCREVER NA \`main\` — $presos commit(s) preso(s), --consolidate pedido (D141)"
+      # ⚠️ A saída NÃO vai mais para /dev/null (achado da Moderação Profinders, 09/09, T-02):
+      # *"se ele falhar no meio, o gate não mostra o quê"*. Um portão que esconde o erro de uma
+      # escrita na main é pior que um portão que não escreve: quem lê o vermelho não sabe onde parou.
+      _saida_cons=$(bash "$( [ -f processos/consolidar.sh ] && echo processos/consolidar.sh || echo consolidar.sh )" 2>&1)
       presos2=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 0)
-      [ "$presos2" = "0" ] && ok "consolidado agora ($presos commit(s))" || fail "$presos2 preso(s) — consolidação não fechou (conflito textual real: a INSTÂNCIA resolve por união, não o MOU)"
+      if [ "$presos2" = "0" ]; then ok "consolidado agora ($presos commit(s))"
+      else
+        fail "$presos2 preso(s) — consolidação não fechou (conflito textual real: a INSTÂNCIA resolve por união, não o MOU)"
+        printf '%s\n' "$_saida_cons" | tail -12 | sed 's/^/      │ /'
+      fi
     else fail "$presos commit(s) preso(s) e sem consolidar.sh — consolide ao main antes de fechar"; fi
   else
     fail "$presos commit(s) preso(s) fora do main — CONFERIR não publica (C1/A-352): rode \`bash processos/gate-fechamento.sh --consolidate\` para consolidar DELIBERADAMENTE"
```

## Como fechar

`STATUS: APLICADA` no topo — **ou** `STATUS: RECUSADA` com o motivo, que vale tanto quanto:
recusa por escrito entra no meu motor e ele para de reenviar (foi o que a Potencial Urbano
fez em 10/09 e estava certa).

_Escritório do MOU — 2026-09-10._
