#!/usr/bin/env bash
# prova-herdado-da-main.sh — a BATERIA do `herdado-da-main.py`, escrita ANTES do código (B40).
#
# POR QUE A BATERIA VEM PRIMEIRO, e por que em repositório git DE VERDADE:
# a régua que este canário prova vai mudar o portão que 22 casas rodam, e ela responde com o GIT,
# não com palavra. Uma bateria que finge o git (mock de `merge-base`) prova a minha imaginação do
# git, não o git — e o defeito que originou o item (`B40`, medido pela frente `estudo-bulky-log` da
# Keepee em 17/09) nasceu exatamente de raciocinar sobre ranges sem rodar. Cada caso abaixo cria um
# repositório temporário, commita de verdade, cria branch de verdade, e mede.
#
# O CASO QUE O ITEM NÃO PREVIU, e é o mais perigoso: **na própria `main`, nada é herdado de outra
# pessoa.** Se a régua responder HERDADO ali, ela transforma todo vermelho do portão em aviso e o
# portão deixa de morder — o oposto do que se quer. O caso 4 mede isso, e o caso 10 prova que a
# guarda é a peça que segura (defeito plantado: sem ela, o caso 4 vira HERDADO).
#
# Uso: bash processos/prova-herdado-da-main.sh
set -uo pipefail
AQUI="$(cd "$(dirname "$0")" && pwd)"
REGUA="${REGUA_SOB_TESTE:-$AQUI/herdado-da-main.py}"
[ -f "$REGUA" ] || { echo "🟥 régua não encontrada: $REGUA"; exit 2; }

falhas=0; casos=0
GIT="git -c user.email=t@t -c user.name=t -c init.defaultBranch=main -c commit.gpgsign=false"

_novo_repo(){  # $1 = dir
  rm -rf "$1"; mkdir -p "$1"; ( cd "$1" && $GIT init -q . ) || return 1
}
_espera(){ # $1 rótulo · $2 esperado · $3 obtido
  casos=$((casos+1))
  if [ "$2" = "$3" ]; then printf '  ✅ %s\n' "$1"
  else printf '  ❌ %s\n     esperado: %s\n     obtido:   %s\n' "$1" "$2" "$3"; falhas=$((falhas+1)); fi
}
_veredito(){ # roda a régua no repo $1 com args $2..  → imprime só a 1ª palavra
  local d="$1"; shift
  ( cd "$d" && python3 "$REGUA" "$@" 2>&1 | head -1 | awk '{print $1}' )
}

T="$(mktemp -d)"; trap 'rm -rf "$T"' EXIT
echo "── bateria da régua do bloqueio herdado (repos git reais em $T)"

# ── 1) DEFEITO HERDADO NÃO REPROVA: veio da main, a branch não tocou nada.
d="$T/c1"; _novo_repo "$d"
( cd "$d" && printf 'linha boa\ndefeito herdado\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main \
  && $GIT checkout -q -b frente && printf 'outro arquivo\n' > b.md && $GIT add -A && $GIT commit -qm frente )
_espera "1 · defeito que já estava na main → HERDADO" "HERDADO" "$(_veredito "$d" a.md)"

# ── 2) DEFEITO INTRODUZIDO PELA BRANCH REPROVA.
d="$T/c2"; _novo_repo "$d"
( cd "$d" && printf 'linha boa\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main \
  && $GIT checkout -q -b frente && printf 'linha boa\ndefeito NOVO\n' > a.md && $GIT add -A && $GIT commit -qm frente )
_espera "2 · defeito que a branch introduziu → DESTA-BRANCH" "DESTA-BRANCH" "$(_veredito "$d" a.md)"

# ── 3) HERDADO NÃO SOME DA TELA: a régua responde, nunca fica calada.
d="$T/c3"; _novo_repo "$d"
( cd "$d" && printf 'defeito herdado\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main \
  && $GIT checkout -q -b frente )
saida="$( cd "$d" && python3 "$REGUA" a.md 2>&1 | wc -l | tr -d ' ' )"
_espera "3 · herdado vira AVISO, não silêncio (1 linha de saída)" "1" "$saida"

# ── 4) 🔴 NA PRÓPRIA MAIN NADA É HERDADO — o caso que o item não previu.
d="$T/c4"; _novo_repo "$d"
( cd "$d" && printf 'defeito\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main )
_espera "4 · rodando NA main → NAO-MEDIDO (na main o defeito é seu)" "NAO-MEDIDO" "$(_veredito "$d" a.md)"

# ── 5) SEM REFERÊNCIA DE MAIN: falha FECHADA, nunca aberta.
d="$T/c5"; _novo_repo "$d"
( cd "$d" && printf 'defeito\n' > a.md && $GIT add -A && $GIT commit -qm base && $GIT checkout -q -b frente )
_espera "5 · sem origin/main nem main → NAO-MEDIDO (não rebaixa)" "NAO-MEDIDO" "$(_veredito "$d" a.md)"

# ── 6) ARQUIVO NOVO NA BRANCH é da branch.
d="$T/c6"; _novo_repo "$d"
( cd "$d" && printf 'x\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main \
  && $GIT checkout -q -b frente && printf 'defeito\n' > novo.md && $GIT add -A && $GIT commit -qm frente )
_espera "6 · arquivo que nasceu na branch → DESTA-BRANCH" "DESTA-BRANCH" "$(_veredito "$d" novo.md)"

# ── 7) 🔴 GRANULARIDADE DE LINHA: a branch mexeu no arquivo, mas NÃO na linha acusada.
#      É o primo do caso da Keepee: 24 erros de gramática de OUTRO nó, já na main, num arquivo
#      que a frente até encostou. Régua por ARQUIVO erraria aqui e reprovaria a frente.
d="$T/c7"; _novo_repo "$d"
( cd "$d" && printf 'topo\nmeio\ndefeito herdado\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main \
  && $GIT checkout -q -b frente && printf 'topo MUDADO\nmeio\ndefeito herdado\n' > a.md && $GIT add -A && $GIT commit -qm frente )
_espera "7 · linha herdada em arquivo que a branch mudou → HERDADO" "HERDADO" "$(_veredito "$d" a.md:3)"

# ── 8) LINHA NOVA no mesmo arquivo mexido é da branch.
_espera "8 · linha que a branch escreveu → DESTA-BRANCH" "DESTA-BRANCH" "$(_veredito "$d" a.md:1)"

# ── 9) ARQUIVO QUE NÃO ESTÁ NA ÁRVORE: não se julga o que não se lê.
_espera "9 · caminho inexistente → NAO-MEDIDO" "NAO-MEDIDO" "$(_veredito "$d" nao-existe.md)"

# ── 11) 🔴 FRENTE RECÉM-ABERTA, AINDA SEM COMMIT — o caso que a bateria imaginada NÃO previu.
#      Achado pelo teste do bloco do gate (`prova-dente-de-conteudo.sh`, caso 8), não aqui: a 1ª
#      versão da guarda era "base == HEAD", e nesta situação ela cobrava da frente TODO o vermelho
#      da main no minuto em que a frente não tinha escrito uma linha. Frente que não divergiu não
#      introduziu nada. O que ela mexeu na ÁRVORE ainda aparece, porque a comparação é árvore×base.
d="$T/c11"; _novo_repo "$d"
( cd "$d" && printf 'defeito herdado\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main \
  && $GIT checkout -q -b frente )
_espera "11 · branch sem commit ainda → HERDADO (ela não introduziu nada)" "HERDADO" "$(_veredito "$d" a.md)"

# ── 12) …e o que essa MESMA frente editou na árvore de trabalho é dela.
( cd "$d" && printf 'defeito herdado\ndefeito NOVO na arvore\n' > a.md )
_espera "12 · linha só na árvore de trabalho → DESTA-BRANCH" "DESTA-BRANCH" "$(_veredito "$d" a.md:2)"

# ── 10) 🧪 DEFEITO PLANTADO: sem a guarda do caso 4, a régua rebaixa tudo na própria main.
d="$T/c10"; _novo_repo "$d"
( cd "$d" && printf 'defeito\n' > a.md && $GIT add -A && $GIT commit -qm base \
  && $GIT branch -q -f origin-main main && $GIT symbolic-ref refs/remotes/origin/main refs/heads/origin-main )
mutante="$T/regua-mutante.py"
grep -v '__GUARDA_DA_MAIN__' "$REGUA" > "$mutante"
mut="$( cd "$d" && python3 "$mutante" a.md 2>&1 | head -1 | awk '{print $1}' )"
casos=$((casos+1))
if [ "$mut" = "NAO-MEDIDO" ]; then
  printf '  ❌ 10 · MUTAÇÃO: tirei a guarda da main e a régua NÃO mudou de resposta\n     → a guarda não é a peça que segura; o caso 4 estaria passando por outro motivo\n'
  falhas=$((falhas+1))
else
  printf '  ✅ 10 · MUTAÇÃO: sem a guarda, a main devolve "%s" — a guarda é a peça que segura\n' "$mut"
fi

echo
if [ "$falhas" -eq 0 ]; then echo "🟩 bateria ok — $casos caso(s), 0 falharam"; exit 0
else echo "🟥 bateria REPROVOU — $falhas de $casos caso(s)"; exit 1; fi
