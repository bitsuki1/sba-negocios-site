#!/usr/bin/env bash
# TEMPLATE — gate de fechamento mínimo de um repo de projeto (kit-clone A-206; adicionado 2026-07-03,
# auditoria do escritório — lacuna achada na CCEV: o kit nascia sem gate nem ata-viva).
# Copie para <repo>/gate-fechamento.sh (+ chmod +x) e ajuste os checks extras do projeto.
# Check UNIVERSAL [1]: carta do escritório não-aplicada TRAVA o fechamento (D144).
set -u
FAIL=0
DIR="$(cd "$(dirname "$0")" && pwd)"
fail(){ echo "🟥 $1"; FAIL=1; }
ok(){ echo "🟩 $1"; }

# [1/4] caixa v2 — toda carta em caixa-de-entrada/do-escritorio/ (e de-<projeto>/) precisa de par em processados/
pend=$(find "$DIR/caixa-de-entrada" -type f -name '*.md' ! -path '*/processados/*' ! -name 'README.md' 2>/dev/null)
if [ -n "$pend" ]; then
  while IFS= read -r f; do
    base="$(basename "$f")"
    [ -f "$DIR/caixa-de-entrada/processados/$base" ] && continue
    # MR-53 (2026-07-05): aceita marcador 'STATUS: APLICADA' inline — o hábito real é RESPONDER, não `git mv`;
    # exigir só par-por-nome deixava o gate VERMELHO mesmo com o trabalho feito (bitsuki: 8+ dias).
    grep -qE '^STATUS:[[:space:]]*(APLICADA|RESPONDIDA|RECUSADA|CONTRAPROPOSTA)' "$f" 2>/dev/null && continue
    fail "carta NÃO-APLICADA: ${f#$DIR/} (aplique e mova p/ processados/ OU marque 'STATUS: APLICADA' no topo)"
  done <<< "$pend"
fi
[ $FAIL -eq 0 ] && ok "[1/4] caixa-de-entrada sem carta pendente"

# [2/4] saída staged — aviso (o ESCRITÓRIO carrega no próximo co-monte; não trava)
# B.8 (2026-08-25): exclui README.md — o [1/4] ja excluia, o [2/4] nao, e o README da pasta
# era contado como "carta staged". Contador inflado = aviso que ninguem confia (falso sinal).
out=$(find "$DIR/caixa-de-saida" -type f -name '*.md' ! -path '*/processados/*' ! -name 'README.md' 2>/dev/null | wc -l)
[ "$out" -gt 0 ] && echo "⚠️  [2/4] $out carta(s) staged em caixa-de-saida/ — o escritório carrega no próximo co-monte (não trava)" || ok "[2/4] caixa-de-saida limpa"

# [3/4] REGISTRO-DE-INSTANCIAS — linha ABERTA da PRÓPRIA branch TRAVA; de OUTRA branch só AVISA
# (A-289, onda 2026-07-03: gate que filtra só a branch corrente deixa órfã alheia invisível para sempre —
#  falso controle. FAIL na alheia bloquearia você pela negligência de outro; por isso: própria=FAIL, alheia=WARN.)
REG="$DIR/REGISTRO-DE-INSTANCIAS.md"
if [ -f "$REG" ]; then
  BR=$(git -C "$DIR" branch --show-current 2>/dev/null || echo "?")
  # B.6 (2026-07-05, achado E2 na CCEV): regex TOLERANTE. Antes exigia '\| ABERTA \|' isolado + branch entre crases —
  #   ficava CEGO ao formato colado ('| ABERTA — confirmar chapéu |') e sem-crase (falso-controle: parecia gate, não travava).
  #   Agora casa ABERTA como PALAVRA (| ABERTA |, | ABERTA — nota, **ABERTA**), exclui FECHADA, e o branch por substring.
  # B.7 (2026-07-05, achado convergente CCEV+Keepee+Profinders no sweep): ancorar em `^\|` (linhas de TABELA).
  #   Sem isso, a PROSA do cabeçalho/how-to ("Linha ABERTA órfã = instância perdida") casava `-w ABERTA` = falso-positivo.
  minha=$(grep -E '^\|' "$REG" 2>/dev/null | grep -F "$BR" | grep -w ABERTA | grep -vw FECHADA)
  if [ -n "$minha" ]; then
    fail "[3/4] sua linha no REGISTRO-DE-INSTANCIAS ainda está ABERTA — marque FECHADA + handoff antes de sair"
  else
    ok "[3/4] sem linha ABERTA da sua branch no REGISTRO"
  fi
  outras=$(grep -E '^\|' "$REG" 2>/dev/null | grep -w ABERTA | grep -vw FECHADA | grep -vF "$BR" | wc -l)
  [ "$outras" -gt 0 ] && echo "⚠️  [3/4] $outras linha(s) ABERTA de OUTRA(s) branch(es) no REGISTRO — instância órfã? investigue/feche se puder (não trava)"
fi

# [4/4] ata-viva roteada — item da ATA-VIVA-SESSAO.md ainda não-roteado só AVISA (não trava: a ata é rede,
# o roteamento é do gen). Sem este aviso, fala do dono capturada morre sem virar DECISÃO/AGENDA/tarefa.
ATA="$DIR/ATA-VIVA-SESSAO.md"
if [ -f "$ATA" ]; then
  # B.7: SEM `|| echo 0` — grep -c já imprime "0" em zero-match; o `|| echo 0` concatenava "0\n0" → `[: integer expression expected`.
  naoroteado=$(grep -cE '^> \[ \] ROTEADO' "$ATA" 2>/dev/null); naoroteado=${naoroteado:-0}
  [ "$naoroteado" -gt 0 ] && echo "⚠️  [4/4] $naoroteado item(ns) da ATA-VIVA ainda NÃO-ROTEADO(s) — roteie ao lar canônico (DECISOES/AGENDA/tarefa) antes de sair (não trava)" || ok "[4/4] ata-viva sem item pendente de roteamento"
fi

exit $FAIL
