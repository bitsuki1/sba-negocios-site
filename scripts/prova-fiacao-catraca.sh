#!/usr/bin/env bash
# prova-fiacao-catraca.sh — o canário da FIAÇÃO do check [segredo-declarado] (A-768, 17/09).
#
# POR QUE EXISTE. A fiação desta catraca já errou dos dois lados, com meses de distância:
#   • verde-cego (A-738): catraca morta ⇒ stdout vazio ⇒ caía no `else` e imprimia VERDE;
#   • vermelho-mentiroso (A-768): `rc=1` é o código LEGÍTIMO de "achei violação", e as 2 casas
#     que tinham a correção diziam "NÃO RODOU — é cego" quando a catraca tinha ACHADO algo,
#     escondendo o achado. Diagnóstico errado manda a pessoa caçar gate quebrado.
#
# COMO PROVA. Não reescreve a lógica: EXTRAI o bloco vivo do `linter-estado.sh` e o roda contra
# três dublês do gate. Testar uma cópia da fiação seria provar a cópia, não a casa.
#
# RODAR:  bash scripts/prova-fiacao-catraca.sh     (da raiz do repo)
set -u
ROOT_REAL="$(cd "$(dirname "$0")/.." && pwd)"
LINTER="$ROOT_REAL/linter-estado.sh"
BLOCO=$(awk '/^if \[ -f "\$ROOT\/scripts\/gate-segredo-declarado\.py" \]/,/^fi$/' "$LINTER")
[ -n "$BLOCO" ] || { echo "🟥 não achei o bloco vivo no linter — a prova não vale"; exit 1; }

falhas=0
caso() { # $1 nome  $2 corpo-do-dublê  $3 trecho esperado na saída
  local nome="$1" corpo="$2" esperado="$3"
  local tmp; tmp=$(mktemp -d)
  mkdir -p "$tmp/scripts"; printf '%s' "$corpo" > "$tmp/scripts/gate-segredo-declarado.py"
  local saida
  saida=$(ROOT="$tmp" bash -c '
    red(){ echo "🟥 $1"; }; yel(){ echo "🟨 $1"; }; grn(){ echo "🟩 $1"; }
    ROOT="'"$tmp"'"
    '"$BLOCO"'' 2>&1)
  rm -rf "$tmp"
  if printf '%s' "$saida" | grep -q -- "$esperado"; then echo "  ✅ $nome"
  else echo "  ❌ $nome"; echo "     esperava conter: $esperado"; echo "     saiu: $(printf '%s' "$saida" | head -2)"; falhas=$((falhas+1)); fi
}

echo "PROVA DA FIAÇÃO DA CATRACA — 4 mutações"
caso "catraca SÃ e silenciosa (rc=0, 0 byte) sai VERDE" \
     'import sys; sys.exit(0)' '🟩'
caso "catraca que MORREU (traceback, rc=1, sem 🟥) sai VERMELHO de cegueira" \
     'import modulo_que_nao_existe_nenhum' 'NÃO RODOU'
caso "catraca que ACHOU (rc=1 COM 🟥) sai VERMELHO de achado, e mostra o achado" \
     'print("🟥 [segredo-declarado] 1 ponto(s) NOVO(s):"); print("      arquivo.py:30 lê CHAVE_X"); raise SystemExit(1)' \
     'arquivo.py:30'
caso "catraca que não pôde comparar (🟨, rc=0) continua AMARELO" \
     'print("🟨 sem base para comparar"); raise SystemExit(0)' '🟨'

echo
[ "$falhas" = 0 ] && echo "🟩 4 provas, 0 falhas — a fiação distingue catraca morta de catraca que achou." \
                 || echo "🟥 $falhas falha(s) na fiação"
exit "$falhas"
