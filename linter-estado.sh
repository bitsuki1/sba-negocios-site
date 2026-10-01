#!/usr/bin/env bash
# linter-estado.sh — LINTER DE ESTADO portável (kit de processos A9, propagado pelo Escritório do MOU 2026-07-05).
# Mecânico (grep/git); roda no gate, na GitHub Action (remoto-safe) e à mão. Defensivo: pula o check cujo
# artefato não existe no repo. Exit != 0 se 🟥. Doutrina/origem: escritorio-do-mou A-304 ("o estado se auto-verifica").
set -u
ROOT="$(cd "$(dirname "$0")" && pwd)"   # o script vive na RAIZ do repo do projeto
FAIL=0; WARN=0
red(){ echo "🟥 $1"; FAIL=1; }
yel(){ echo "🟨 $1"; WARN=$((WARN+1)); }
grn(){ echo "🟩 $1"; }
echo "═══ LINTER DE ESTADO — $(basename "$ROOT") ═══"

# [1] RÉGUA-POR-BYTE: a constituição do repo (CLAUDE.md / AGENTS.md) não pode inchar (régua = byte, não linha).
for c in CLAUDE.md AGENTS.md; do
  [ -f "$ROOT/$c" ] || continue
  b=$(wc -c < "$ROOT/$c" | tr -d ' ')
  if [ "$b" -gt 32768 ]; then red "[1] $c INCHADO: $((b/1024))KB > 32KB — enxugar (ponteiro > payload)"
  else grn "[1] $c ok: $((b/1024))KB (≤ 32KB)"; fi
done

# [2] gate de fechamento presente + executável (o kit exige gate).
if [ -f "$ROOT/gate-fechamento.sh" ]; then grn "[2] gate-fechamento.sh presente"
else yel "[2] sem gate-fechamento.sh (kit incompleto)"; fi

# [3] CARTAS paradas na caixa (do-escritorio + de-*/) sem par em processados/ nem marcador STATUS.
if [ -d "$ROOT/caixa-de-entrada" ]; then
  paradas=0
  while IFS= read -r f; do
    base="$(basename "$f")"; dir="$(dirname "$f")"
    case "$base" in README.md) continue;; esac
    [ -f "$dir/processados/$base" ] && continue
    # ⚠️ ROTEADA REMOVIDA (achado da unidade ROTARY, carta 2026-08-20 — trazido pelo Escritório do MOU 2026-08-27).
    # Régua DUPLA real: o `gate-fechamento.sh` tirou ROTEADA em 13/07 e ESTE linter ficou 45 dias
    # aceitando-a. E é o lado que mais importa: em sessão remota o linter é a ÚNICA rede automática
    # (Action a cada push; hooks não disparam, A-291). Pior, `STATUS: ROTEADA` é carimbado SOZINHO
    # pelo `sync-caixas.py:deliver_out()` na ENTREGA, nunca no tratamento — logo, carta
    # entregue-e-nunca-aplicada passava VERDE. Prova de tratamento = status de AÇÃO, ou mover para
    # `processados/`. (Codex E-063: "ROTEADA não é APLICADA".)
    grep -qE '^STATUS:[[:space:]]*(APLICADA|RESPONDIDA|RECUSADA|CONTRAPROPOSTA)' "$f" 2>/dev/null && continue
    paradas=$((paradas+1))
  done < <(find "$ROOT/caixa-de-entrada" -type f -name '*.md' ! -path '*/processados/*' \( -path '*/do-escritorio/*' -o -path '*/de-*/*' \) 2>/dev/null)
  [ "$paradas" -gt 0 ] && yel "[3] $paradas carta(s) na caixa sem processar (aplicar+mover OU STATUS)" || grn "[3] caixa-de-entrada sem carta pendente"
fi

# [4] REGISTRO-DE-INSTANCIAS: linha ABERTA da branch corrente = instância não-fechada (órfã).
if [ -f "$ROOT/REGISTRO-DE-INSTANCIAS.md" ]; then
  BR=$(git -C "$ROOT" branch --show-current 2>/dev/null || echo "?")
  minha=$(grep -F "$BR" "$ROOT/REGISTRO-DE-INSTANCIAS.md" 2>/dev/null | grep -w ABERTA | grep -vw FECHADA)
  [ -n "$minha" ] && yel "[4] sua linha no REGISTRO ainda ABERTA (feche + handoff)" || grn "[4] REGISTRO sem linha ABERTA da sua branch"
fi

# [5] doutrina "escopo é do dono" gravada (só em repo de UNIDADE).
if [ -f "$ROOT/CLAUDE.md" ] && grep -qiE 'Tipo.*UNIDADE|unidade de negócio' "$ROOT/CLAUDE.md" 2>/dev/null; then
  grep -qE 'D157|A-296|Escopo é do dono' "$ROOT/CLAUDE.md" && grn "[5] doutrina 'escopo é do dono' presente" || yel "[5] falta a linha 'escopo é do dono (D157/A-296)' no CLAUDE.md"
fi

# ── [permissões] PERMISSÕES PRÉ-LIBERADAS (D215, 03/09) — a casa carrega o PISO do kit? (o dono não quer prompt para Drive/SQL/leitura) ──
if [ -f "$ROOT/.claude/settings.json" ]; then
  _perm=$(python3 - "$ROOT/.claude/settings.json" <<'PY' 2>/dev/null
import json, sys
MIN = ["Bash", "Read", "Edit", "Write", "Glob", "Grep", "mcp__github", "mcp__Google_Drive", "mcp__Supabase", "mcp__Lovable", "mcp__Claude_Code_Remote"]
try:
    d = json.load(open(sys.argv[1], encoding="utf-8")); a = set((d.get("permissions") or {}).get("allow") or [])
    falta = [m for m in MIN if m not in a]
    print("OK" if not falta else "FALTA " + " ".join(falta))
except Exception as e:
    print("ERRO " + str(e)[:60])
PY
)
  case "$_perm" in
    OK) grn "[permissões] permissões pré-liberadas: piso do kit presente (D215)" ;;
    FALTA*) yel "[permissões] settings.json sem o piso de permissões do kit (D215) — ${_perm#FALTA }: copie permissions.allow de processos/templates/permissoes-kit.json (união; denies ficam)" ;;
    *) yel "[permissões] settings.json ilegível para o check de permissões (${_perm})" ;;
  esac
fi

# ── [espelho] ESPELHO DO MAPA DO DONO (D216, 03/09) — o HTML sai de scripts/gerar-mapa-do-dono.py; defasado = 🟨 ──
if [ -f "$ROOT/MAPA-DE-PENDENCIAS.md" ]; then
  if [ -f "$ROOT/scripts/gerar-mapa-do-dono.py" ]; then
    if (cd "$ROOT" && python3 scripts/gerar-mapa-do-dono.py --check >/dev/null 2>&1); then grn "[espelho] espelho do mapa do dono em dia (gerador D216)"
    else yel "[espelho] espelho do mapa DEFASADO ou markdown fora da forma do TEMPLATE — rode: python3 scripts/gerar-mapa-do-dono.py && republique com url= (D216)"; fi
  else yel "[espelho] falta scripts/gerar-mapa-do-dono.py (kit D216) — o HTML do mapa não pode ser feito à mão"; fi
fi

# ── [segredo-declarado] CATRACA: ponto NOVO que lê segredo diz para que serve (M31/D-segredo) ────
# A dor é do dono, verbatim (25/08): *"toda hora alguém pede, eu vou lá apago e refaço e prejudico
# outro projeto, NINGUÉM OLHA SE MAIS ALGUÉM USA O SEGREDO"*. A regra `segredo-e-consumidor.md`
# manda: todo lugar que LÊ um segredo carrega uma linha dizendo para que serve e de que casa é.
# Medido no portfólio em 07/09: 573 pontos de leitura, ZERO declaram.
# É CATRACA, não cobrança geral: só cobra o que ENTRA ou MUDA no envio. Um dente que reprovasse os
# 573 de uma vez seria desligado no dia seguinte — e dente desligado protege zero.
# A linha, no formato fechado:  # segredo: NOME — para que serve — casa: <casa>
# Bateria: python3 scripts/gate-segredo-declarado.py --prova (8 casos)
if [ -f "$ROOT/scripts/gate-segredo-declarado.py" ] && command -v python3 >/dev/null 2>&1; then
  # ⚠️ ESTA FIAÇÃO ERROU DOS DOIS LADOS EM 2 DIAS — a ordem abaixo é o conserto, não estilo.
  #   A-738 (15/09) VERDE-CEGO: com `2>/dev/null` e o código de saída DESCARTADO, catraca destruída
  #   ⇒ stdout vazio ⇒ nenhum 🟥 ⇒ caía no `else` e imprimia "nenhum ponto novo…", verde byte-
  #   idêntico ao verde saudável. O sinal de vida é o CÓDIGO DE SAÍDA, não a presença de texto:
  #   a catraca SÃ é silenciosa (0 byte, rc 0).
  #   A-768 (17/09) VERMELHO-MENTIROSO: consertado o primeiro, a ordem ficou invertida — `rc != 0`
  #   testado ANTES do 🟥. Como rc=1 é o código de "ACHEI" **e** o de "morri", a catraca que tinha
  #   ACHADO era reportada como "NÃO RODOU" e o achado ficava escondido.
  #   Ordem que vale: **🟥 primeiro, rc depois.** Não reordenar.
  _sd=$(cd "$ROOT" && python3 scripts/gate-segredo-declarado.py 2>&1); _sdrc=$?
  if echo "$_sd" | grep -q '^🟥'; then
    red "[segredo-declarado] ponto NOVO lendo segredo sem dizer para que serve:"
    echo "$_sd" | grep -v '^🟥' | head -5
  elif [ "$_sdrc" != "0" ]; then
    red "[segredo-declarado] a catraca da D200 NÃO RODOU (saiu $_sdrc) — isto não é verde, é cego:"
    echo "$_sd" | tail -3 | sed 's/^/      /'
  elif echo "$_sd" | grep -q '^🟨'; then
    yel "[segredo-declarado] a catraca não pôde comparar — não conte como verificado"
  else
    grn "[segredo-declarado] nenhum ponto novo de leitura de segredo sem declaração (catraca)"
  fi
else
  yel "[segredo-declarado] scripts/gate-segredo-declarado.py ausente — a catraca não existe"
fi

# ── [catraca-fiação] O CANÁRIO DO CHECK ACIMA (E-086 — todo check nasce com canário) ──────────────
# A fiação do `[segredo-declarado]` errou dos DOIS lados em 2 dias: verde-cego (A-738, 15/09) e
# vermelho-mentiroso (A-768, 17/09 — "NÃO RODOU" quando a catraca tinha ACHADO). O canário extrai
# o bloco VIVO do próprio linter e o roda contra 4 dublês; testar uma cópia da fiação provaria a
# cópia. Se ele reprovar, o veredito do check acima não vale hoje — não é detalhe de teste.
if [ -f "$ROOT/scripts/prova-fiacao-catraca.sh" ]; then
  _cfi=$( (cd "$ROOT" && bash scripts/prova-fiacao-catraca.sh 2>&1) ); _cfirc=$?
  if [ "$_cfirc" != "0" ]; then
    red "[catraca-fiação] o canário da fiação REPROVOU (saiu $_cfirc) — o veredito do [segredo-declarado] não vale hoje:"
    printf '%s\n' "$_cfi" | grep '❌' | head -3 | sed 's/^/      /'
  else
    grn "$(printf '%s' "$_cfi" | tail -1 | sed 's/^🟩 //') [catraca-fiação]"
  fi
else
  yel "[catraca-fiação] sem canário da fiação — o [segredo-declarado] fica sem quem prove que ele distingue catraca morta de catraca que achou"
fi


# ── [lentes] AS LENTES DE CONTEÚDO DO MAPA DO DONO (ordem dele, 2026-09-09: "lance lentes de
#    revisao antes de publicar os mapas"). O `[espelho]` cobra a FORMA (o HTML sai do gerador);
#    estas cobram o PADRÃO que ele descreveu: só pendência, a dele didática, a minha registrada,
#    a lista DENTRO do mapa. São eixos diferentes — gerador verde com conteúdo fora do padrão foi
#    exatamente o que ele corrigiu à mão duas vezes.
#    ⚠️ NÃO se recita o número de lentes aqui: ecoa-se a linha do próprio script, que conta as
#    dele mesmo. O bloco que recitava "7" com 11 no código é a V-NUMERO-DE-LENTE-RECITADO.
if [ -f "$ROOT/MAPA-DE-PENDENCIAS.md" ]; then
  if [ -f "$ROOT/scripts/revisar-mapa.py" ]; then
    if _lentes=$(cd "$ROOT" && python3 scripts/revisar-mapa.py 2>/dev/null); then
      grn "[lentes] $(echo "$_lentes" | tail -1 | sed 's/^🟩 lentes de revisão: //')"
    else
      red "[lentes] o mapa do dono TEM DEFEITO de conteúdo — rode: python3 scripts/revisar-mapa.py (ele diz a linha e o conserto)"
    fi
  else
    yel "[lentes] falta scripts/revisar-mapa.py — sem ele o mapa volta a sair confuso (ordem do dono 09/09)"
  fi
fi


# ── [jargão] TERMO DE MÁQUINA CRU NA SUPERFÍCIE QUE O DONO LÊ (D159 · A-772/B12) ──────────────
#    A ordem dele, no GO de 17/09: "faça uma varredura a lugares com linguagem de maquina e termos
#    especificos do projeto, ISSO ATRAPALHA OS ENTENDIMENTOS DOS HUMANOS".
#    A régua NÃO é "a palavra existe?" — a D159 manda GLOSAR: o termo fica UMA vez, com o português
#    ao lado. `juntada (merge)` passa; `merge` sozinho acende.
#    🟨 por desenho, como o [lacuna]: é passivo de REDAÇÃO, e a caneta no texto do mapa é DA CASA
#    (D21/D104) — o escritório mede e entrega a régua, nunca reescreve o mapa de quem o assina.
if [ -f "$ROOT/processos/gate-jargao-na-superficie-do-dono.py" ]; then
  _jrg=$(cd "$ROOT" && python3 processos/gate-jargao-na-superficie-do-dono.py 2>&1)
  case "$?" in
    0) if echo "$_jrg" | grep -q '^🟩'; then grn "[jargão] $(echo "$_jrg" | head -1 | sed 's/^🟩 \[jargão\] //')"
       else yel "[jargão] $(echo "$_jrg" | head -1 | sed 's/^🟨 \[jargão\] //')"
            echo "$_jrg" | sed -n '2,7p' ; fi ;;
    *) yel "[jargão] o gate saiu com rc≠0 e NÃO mediu — verde aqui não vale (A-768): $(echo "$_jrg" | head -1)" ;;
  esac
else
  yel "[jargão] falta processos/gate-jargao-na-superficie-do-dono.py — a superfície do dono sai sem passar pela régua da D159"
fi

echo "─────────────────────────────────────────────"
[ "$FAIL" -eq 0 ] && echo "RESULTADO: 🟩 sem 🟥 · $WARN aviso(s) 🟨" || echo "RESULTADO: 🟥 há bloqueio — corrija antes de fechar"
exit $FAIL
