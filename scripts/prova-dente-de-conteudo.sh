#!/usr/bin/env bash
# prova-dente-de-conteudo.sh — O CANÁRIO DO `[conteúdo]` (E-086: todo check nasce com canário)
#
# POR QUE EXISTE (pedido da Keepee, carta 2026-09-17 `dente-de-conteudo-pune-quem-relata-o-caminho-morto`):
#   o dente `[conteúdo]` reprova quando o mapa cita, entre crases, um caminho que ESTE repo já teve
#   versionado e hoje não tem. A premissa é boa — item aberto citando obra já feita. Mas ele não
#   distinguia duas coisas OPOSTAS:
#       cita como PONTEIRO ("ver `x.md`")              → acusar está certo
#       cita como ASSUNTO  ("o item citava `x.md`,     → acusar é punir quem RELATA o defeito
#                            que não existe mais")
#   Custo medido pela casa: o item `A1-C210` da Keepee foi aberto em 12/09 **para relatar** dois
#   endereços mortos; ao escrevê-los entre crases — que é como se escreve caminho — o RELATO virou o
#   defeito, e o gate ficou 5 dias vermelho por uma obra já consertada em 13/09. A única saída que a
#   casa tinha era **apagar o registro para ficar verde** — o oposto de "nada se joga fora" (D24).
#
# O ESCAPE, como a casa recomendou (opção (a) da carta): marcador DECLARATIVO na linha,
#   `<!-- caminho-historico -->`. O autor declara que cita como assunto; o dente respeita.
#
# ⚠️ O FURO DESTE ESCAPE, DITO EM VOZ ALTA (A-622 — não prometer o que não existe):
#   nada impede alguém de carimbar o marcador numa linha que é ponteiro de verdade e ficar verde.
#   Mecanismo nenhum lê intenção. O que este escape faz é o mesmo que a isenção ⚰️ do `[carta-anexa]`:
#   torna o silêncio DELIBERADO e visível no diff, em vez de obrigar a apagar o rastro para passar.
#   Trocar "apagar o registro" por "declarar por escrito que é histórico" é o ganho; não é blindagem.
#
# O QUE ELE PROVA — os DOIS sentidos (régua A-761), extraindo o bloco VIVO do gate (nunca uma cópia:
#   testar cópia prova a cópia, não a casa — lição do A-768):
#   1. caminho VIVO citado             → não acende
#   2. caminho MORTO citado            → acende (o dente continua mordendo)
#   3. caminho morto + marcador        → NÃO acende (o escape funciona)
#   4. o mesmo, SEM o marcador         → volta a acender (o escape não é passe livre)
#   5. escape é por LINHA              → linha marcada cala, outra linha do mesmo mapa acende
#   6. `pronto quando` segue isentando → não regredi o que já existia
#   7. o bloco vivo CONTÉM o marcador  → tirar a linha do gate não deixa a bateria verde
#
# ── ACRESCENTADO EM 2026-09-26 (item B40): O BLOQUEIO É SEU, OU JÁ ESTAVA NA MAIN? ─────────────
# Os 7 casos acima provam a DETECÇÃO (o heredoc Python). Nada provava a DECISÃO que vem depois —
# se o achado reprova ou vira aviso —, e é aí que estava o defeito que a Keepee mediu em 17/09: o
# portão devolveu 5 bloqueios e NENHUM era da frente. Estes 4 casos rodam o **bloco SHELL vivo**
# do gate (não uma cópia: A-768), em repositório git real, e provam os dois sentidos mais o modo
# de falha:
#   8.  bloqueio que já estava na `main`   → 🟨 aviso, e NENHUM ❌ (a frente consegue fechar)
#   9.  bloqueio que a branch introduziu   → ❌ (o portão continua mordendo o que é seu)
#   10. régua AUSENTE no repo              → ❌ mesmo no herdado (falha FECHADA, nunca aberta)
#   11. um herdado + um seu na mesma tela  → ❌ **e** 🟨 (herdado não some: "não é seu" ≠ "não existe")
set -uo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GATE="$ROOT/gate-fechamento.sh"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
OK=0; FALHA=0

# extrai o heredoc VIVO do gate
sed -n "/<<'__GC_PY__'/,/^__GC_PY__$/p" "$GATE" | sed '1d;$d' > "$TMP/dente.py"
[ -s "$TMP/dente.py" ] || { echo "🟥 não consegui extrair o bloco vivo de $GATE"; exit 1; }

caso(){ # nome · esperado(n de achados) · conteúdo do mapa
  local nome="$1" esperado="$2" mapa="$3"
  local R="$TMP/r$RANDOM"; mkdir -p "$R"; cd "$R"
  git init -q .; git config user.email t@t; git config user.name t
  mkdir -p docs; echo vivo > docs/vivo.md; echo morto > docs/morto.md
  git add -A >/dev/null 2>&1; git commit -qm c1 >/dev/null 2>&1
  git rm -q docs/morto.md >/dev/null 2>&1; git commit -qm c2 >/dev/null 2>&1
  printf '%s\n' "$mapa" > MAPA-DE-PENDENCIAS.md
  local out n
  out=$(GATE_MAPA_GLOB='MAPA-DE-PENDENCIAS*.md' python3 "$TMP/dente.py" 2>/dev/null)
  n=$(printf '%s' "$out" | sed -n 's/^__N__\([0-9]*\)__.*/\1/p')
  cd "$ROOT"
  if [ "${n:-x}" = "$esperado" ]; then echo "  ok   $nome"; OK=$((OK+1))
  else echo "  FALHA $nome (esperava $esperado achado(s), veio '${n:-nada}')"; FALHA=$((FALHA+1)); fi
}

echo "PROVA — o dente [conteúdo] do gate-fechamento (bloco VIVO, 7 casos, sem rede)"
caso "CASO SÃO: caminho VIVO entre crases não acende" 0 '- item que aponta para `docs/vivo.md`'
caso "MUTAÇÃO: caminho MORTO entre crases acende (o dente morde)" 1 '- item que aponta para `docs/morto.md`'
caso "ESCAPE: caminho morto + <!-- caminho-historico --> NÃO acende" 0 '- o item citava `docs/morto.md` <!-- caminho-historico -->'
caso "MUTAÇÃO DO ESCAPE: a MESMA linha sem o marcador volta a acender" 1 '- o item citava `docs/morto.md`'
caso "ESCAPE é por LINHA: a marcada cala, a outra do mesmo mapa acende" 1 '- relato: `docs/morto.md` <!-- caminho-historico -->
- ponteiro de verdade: `docs/morto.md`'
caso "NÃO-REGRESSÃO: 'pronto quando' continua isentando" 0 '- pronto quando `docs/morto.md` existir'

if grep -q 'caminho-hist' "$TMP/dente.py"; then
  echo "  ok   o bloco VIVO do gate carrega o marcador (tirá-lo de lá não deixa esta bateria verde)"; OK=$((OK+1))
else
  echo "  FALHA o bloco vivo do gate NÃO tem o marcador — o escape não está no gate, só na bateria"; FALHA=$((FALHA+1))
fi


# ── B40: os 4 casos da DECISÃO (bloco SHELL vivo, repo git real) ────────────────────────────────
# extrai o bloco shell VIVO — do cabeçalho do dente até a linha de fim
sed -n '/^# ── \[conteúdo\] O MAPA MENTE?/,/^# ── fim do dente de conteúdo/p' "$GATE" > "$TMP/bloco.sh"
[ -s "$TMP/bloco.sh" ] || { echo "🟥 não consegui extrair o bloco SHELL de $GATE"; exit 1; }

caso_shell(){ # nome · espera_erro(sim/nao) · espera_aviso(sim/nao) · com_regua(sim/nao) · mapa_na_main · mapa_na_branch
  local nome="$1" esp_e="$2" esp_a="$3" com_regua="$4" mapa_main="$5" mapa_branch="$6"
  local R="$TMP/s$RANDOM"; mkdir -p "$R/processos"; cd "$R"
  git init -q .; git config user.email t@t; git config user.name t
  mkdir -p docs; echo vivo > docs/vivo.md; echo morto > docs/morto.md
  git add -A >/dev/null 2>&1; git commit -qm c1 >/dev/null 2>&1
  git rm -q docs/morto.md >/dev/null 2>&1; git commit -qm c2 >/dev/null 2>&1
  printf '%s\n' "$mapa_main" > MAPA-DE-PENDENCIAS.md
  [ "$com_regua" = "sim" ] && cp "$ROOT/scripts/herdado-da-main.py" ./
  git add -A >/dev/null 2>&1; git commit -qm mapa >/dev/null 2>&1
  # a "main remota": mesma árvore, ref separada — é contra ela que a régua mede
  git branch -q -f origin-main HEAD
  git symbolic-ref refs/remotes/origin/main refs/heads/origin-main
  git checkout -q -b frente
  if [ -n "$mapa_branch" ]; then
    printf '%s\n' "$mapa_branch" >> MAPA-DE-PENDENCIAS.md
    git add -A >/dev/null 2>&1; git commit -qm "item da frente" >/dev/null 2>&1
  fi
  local out; out=$(bash "$TMP/bloco.sh" 2>&1)
  local tem_e=nao tem_a=nao
  printf '%s' "$out" | grep -q '❌' && tem_e=sim
  printf '%s' "$out" | grep -q '🟨' && tem_a=sim
  cd "$ROOT"
  if [ "$tem_e" = "$esp_e" ] && [ "$tem_a" = "$esp_a" ]; then echo "  ok   $nome"; OK=$((OK+1))
  else
    echo "  FALHA $nome (esperava erro=$esp_e aviso=$esp_a; veio erro=$tem_e aviso=$tem_a)"
    printf '%s\n' "$out" | sed 's/^/         | /'
    FALHA=$((FALHA+1))
  fi
}

echo
echo "PROVA — a DECISÃO do [conteúdo]: o bloqueio é seu, ou já estava na main? (B40, bloco SHELL vivo)"
caso_shell "8  HERDADO: bloqueio que já estava na main → 🟨 e NENHUM ❌" \
  nao sim sim '- item que aponta para `docs/morto.md`' ''
caso_shell "9  SEU: bloqueio que a branch introduziu → ❌" \
  sim nao sim '- item são que aponta para `docs/vivo.md`' '- item NOVO que aponta para `docs/morto.md`'
caso_shell "10 FALHA FECHADA: sem a régua no repo, herdado continua ❌" \
  sim sim nao '- item que aponta para `docs/morto.md`' ''
caso_shell "11 OS DOIS NA MESMA TELA: ❌ do seu **e** 🟨 do herdado" \
  sim sim sim '- item que aponta para `docs/morto.md`' '- item NOVO que aponta para `docs/morto.md`'

echo
if [ "$FALHA" = "0" ]; then echo "🟩 $OK provas, 0 falhas — o dente morde o ponteiro, cala no relato declarado, e não cobra da frente o que já estava na main."; exit 0
else echo "🟥 $FALHA de $((OK+FALHA)) prova(s) FALHARAM"; exit 1; fi
