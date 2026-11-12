#!/usr/bin/env bash
# consolidar.sh — leva o trabalho do galho até a PORTA da main, e para na porta.
# Trazido pelo Escritório do MOU em 12/11/2026 (S05 do kit v2.11.1: casa sem regra de pedido de mudança
# na main precisa de um consolidar.sh que varra o diff antes de juntar — a porta da D200).
# Modelo: `ccev-sempre-vale-a-pena-site/consolidar.sh` (outro site que publica sozinho na Vercel).
#
# ⚠️ POR QUE ESTE NÃO MESCLA NEM EMPURRA A MAIN — leia antes de "corrigir"
#   A Vercel está ligada a este repositório (projeto `site-sba-negocios`): todo envio na `main`
#   vai ao ar em sbanegocios.com.br, sem botão e sem confirmação (CLAUDE.md §2 e §3). O
#   `consolidar.sh` do modelo do portfólio faz `merge` + `push origin main`; aqui isso seria
#   publicar o site sozinho. Então este script NUNCA empurra a `main` e NUNCA mescla: ele confere,
#   prova e empurra o GALHO, e entrega o pedido de mudança pronto. Publicar continua sendo a junção
#   do pedido, com a conferência verde.
#
# O QUE ELE CONFERE, NESTA ORDEM
#   1. árvore limpa;
#   2. o e-mail dos commits (sem `contato@bitsuki.com.br` a Vercel recusa publicar, e em silêncio — §2b);
#   3. segredo entrando no git (D200): `node scripts/varredura-de-segredos.mjs` no diff do galho;
#   4. se o galho toca produto (src/, index.html, public/, package.json, vercel.json…): aí a junção
#      é ATO PÚBLICO, e o aviso diz isso.
#
# COMO SE USA
#   bash consolidar.sh              (o galho em que você está)
#   bash consolidar.sh meu-galho
#
# SAÍDA
#   0 = pronto para o pedido de mudança · 1 = há o que consertar antes
#   3 = conferiu, mas não conseguiu empurrar o galho

set -uo pipefail
cd "$(git rev-parse --show-toplevel)" || exit 1

GALHO="${1:-$(git branch --show-current)}"
EMAIL_QUE_PUBLICA="contato@bitsuki.com.br"
falhas=0
ok()   { echo "  ✅ $1"; }
ruim() { echo "  ❌ $1"; falhas=1; }
aviso(){ echo "  ⚠️  $1"; }

echo "═══ consolidar — '$GALHO' rumo à main ═══"
echo

if [ -z "$GALHO" ] || [ "$GALHO" = "main" ]; then
  echo "❌ Você está na main (ou sem galho). Aqui a main É o site no ar: não se trabalha nela."
  echo "   Crie um galho, mova o trabalho para ele e rode de novo."
  exit 1
fi

# ---------------------------------------------------------------------------
echo "[1/4] árvore de trabalho"
if [ -n "$(git status --porcelain)" ]; then
  ruim "há mudança não-commitada — faça o commit antes de consolidar:"
  git status --short | sed 's/^/       /'
else
  ok "árvore limpa"
fi

# ---------------------------------------------------------------------------
echo
echo "[2/4] o e-mail dos commits publica? (CLAUDE.md §2b)"
git fetch origin main --quiet 2>/dev/null || aviso "sem rede para buscar a main; comparando com o que há aqui"
BASE=$(git merge-base origin/main "$GALHO" 2>/dev/null || git merge-base main "$GALHO" 2>/dev/null || echo "")
if [ -z "$BASE" ]; then
  aviso "não achei a base comum com a main — conferindo só o último commit"
  EMAILS=$(git log -1 --format='%ae' "$GALHO" 2>/dev/null)
else
  EMAILS=$(git log --no-merges --format='%ae' "$BASE..$GALHO" 2>/dev/null | sort -u)
fi
FORA=$(printf '%s\n' "$EMAILS" | grep -v -x -F "$EMAIL_QUE_PUBLICA" | grep -v '^$' || true)
if [ -n "$FORA" ]; then
  ruim "commit(s) com e-mail que a Vercel não liga a uma conta — a publicação ficaria 'Blocked':"
  printf '%s\n' "$FORA" | sed 's/^/       /'
  echo "       conserto: git config user.email \"$EMAIL_QUE_PUBLICA\" e refaça os commits do galho"
else
  ok "todos os commits do galho assinados com $EMAIL_QUE_PUBLICA"
fi

# ---------------------------------------------------------------------------
echo
echo "[3/4] segredo entrando no git (D200)"
if [ -n "$BASE" ]; then
  node scripts/varredura-de-segredos.mjs --intervalo "$BASE" "$GALHO" || falhas=1
else
  node scripts/varredura-de-segredos.mjs --arvore || falhas=1
fi

# ---------------------------------------------------------------------------
echo
echo "[4/4] este galho PUBLICA alguma coisa?"
TOCA_PRODUTO=""
if [ -n "$BASE" ]; then
  TOCA_PRODUTO=$(git diff --name-only "$BASE" "$GALHO" -- src/ public/ index.html package.json \
    package-lock.json bun.lockb vercel.json vite.config.ts tailwind.config.ts postcss.config.js \
    'tsconfig*.json' supabase/ 2>/dev/null)
fi
if [ -n "$TOCA_PRODUTO" ]; then
  echo "  🟥 SIM — este galho mexe no produto (o que o público vê):"
  echo "$TOCA_PRODUTO" | sed 's/^/       /'
  echo
  echo "  Juntar isto na main É PUBLICAR em sbanegocios.com.br. Só com ordem explícita do dono"
  echo "  (CLAUDE.md §5) e, depois da junção, com a publicação conferida verde na Vercel."
else
  ok "não toca o produto — a junção é ajuste interno (governança, robôs, documentos)"
fi

# ---------------------------------------------------------------------------
echo
if [ "$falhas" -ne 0 ]; then
  echo "═══ 🔴 NÃO consolidei: conserte o que está acima e rode de novo. ═══"
  exit 1
fi

echo "═══ ✅ o galho está pronto. Empurrando o galho (nunca a main). ═══"
if git push -u origin "$GALHO"; then
  echo
  echo "Feito. O que falta: abrir o pedido de mudança de '$GALHO' para a main; quem o abriu junta"
  echo "com a conferência verde (D235). Este script não mescla e não empurra a main, de propósito:"
  echo "aqui juntar é publicar."
  exit 0
else
  echo
  echo "⚠️  Não consegui empurrar o galho. O trabalho está commitado aqui — nada se perdeu."
  echo "    Confira a rede e as permissões, e empurre com: git push -u origin $GALHO"
  exit 3
fi
