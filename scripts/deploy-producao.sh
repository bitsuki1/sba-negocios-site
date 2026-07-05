#!/usr/bin/env bash
# ============================================================================
# ⚠️  LEGADO / FALLBACK — a partir de 2026-07-03 o host oficial é a VERCEL.
# ============================================================================
# Deploy para GitHub Pages (branch gh-pages) — Site SBA Negócios.
#
# ▸ HOST OFICIAL AGORA É A VERCEL: o projeto está conectado ao Git e faz
#   **deploy automático a cada push na `main`**. NÃO é preciso rodar nada
#   à mão para publicar. Detalhes em docs/HANDOFF-2026-07-03.md §5.
#
# ▸ Este script só serve ENQUANTO o DNS ainda apontar `sbanegocios.com.br`
#   para o GitHub Pages (antes do cutover de DNS na GoDaddy). Depois que o
#   DNS virar para a Vercel (A @ → 216.198.79.1 e CNAME www →
#   a6cc1438ad279349.vercel-dns-017.com), o GitHub Pages deixa de receber
#   tráfego e ESTE SCRIPT FICA OBSOLETO — pode ser removido junto com a
#   branch gh-pages.
#
# Uso (fallback): rode da raiz do repo, com a branch de conteúdo pronta.
#   bash scripts/deploy-producao.sh
#   (pule o aviso com CONFIRMAR_PAGES=1 bash scripts/deploy-producao.sh)
# ============================================================================
set -euo pipefail

cd "$(dirname "$0")/.."

# Aviso de host legado — Vercel é o oficial. Não bloqueia se CONFIRMAR_PAGES=1.
if [ "${CONFIRMAR_PAGES:-0}" != "1" ]; then
  echo "⚠️  ATENÇÃO: o host oficial agora é a VERCEL (deploy automático por push na main)."
  echo "    Este deploy publica no GitHub Pages, que só vale ANTES do cutover de DNS."
  echo "    Se o DNS já foi migrado para a Vercel, você NÃO precisa rodar isto."
  printf "    Continuar mesmo assim? [s/N] "
  read -r resposta || resposta=""
  case "$resposta" in
    s|S|sim|SIM) : ;;
    *) echo "==> abortado (nada publicado)."; exit 0 ;;
  esac
fi

echo "==> build de produção (base '/', sem BASE_PATH)"
unset BASE_PATH || true
npm install --no-audit --no-fund
npm run build

echo "==> arquivos de domínio próprio"
printf 'sbanegocios.com.br\n' > dist/CNAME   # custom domain do GitHub Pages
cp dist/index.html dist/404.html             # SPA: deep-link / refresh sem 404
touch dist/.nojekyll                         # não processar com Jekyll

echo "==> publicando dist/ na branch gh-pages (force)"
REMOTE="$(git remote get-url origin)"
NAME="$(git log -1 --format='%an')"
EMAIL="$(git log -1 --format='%ae')"
TMP="$(mktemp -d)"
cp -a dist/. "$TMP/"
rm -rf "$TMP/.git"   # caso um deploy anterior tenha deixado .git dentro de dist/
(
  cd "$TMP"
  git init -q
  git checkout -q -b gh-pages
  git add -A
  git -c user.name="$NAME" -c user.email="$EMAIL" \
      commit -qm "deploy: produção sbanegocios.com.br"
  git push -f "$REMOTE" gh-pages:gh-pages
)
rm -rf "$TMP"

echo "==> OK — https://sbanegocios.com.br"
echo "    (No 1º deploy o GitHub provisiona o certificado TLS em minutos.)"
