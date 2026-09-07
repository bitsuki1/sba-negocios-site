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


# ── [conteúdo] O MAPA MENTE? — 1º dente de CONTEÚDO do portfólio (Escritório do MOU, 2026-09-07) ──
# O DIAGNÓSTICO DO DONO: os gates provam que a carta CHEGOU, que o arquivo EXISTE, que o espelho
# está em dia — tudo TRANSPORTE. Nenhum prova que o CONTEÚDO é verdade: o mapa pode estar em dia
# com o markdown e o markdown inteiro estar mentindo (item resolvido há semanas ainda listado).
# Medido em 07/09 nas 22 casas: dos 95 checks de gate que BLOQUEIAM, 85 medem transporte. Os 2
# únicos checks de conteúdo universais são AVISO em 10 de 10 casas — não mordem. Este morde.
#
# A PERGUNTA, e ela se responde com o GIT, não com palavra:
#   "o mapa cita um arquivo que ESTE repo já teve versionado e hoje não tem mais?"
# Se sim, a obra daquele item JÁ ACONTECEU (o arquivo nasceu e saiu) e o item continua aberto.
#
# ⚠️ POR QUE "JÁ FOI VERSIONADO E SUMIU" E NÃO "NÃO EXISTE" — a lição que custou 3 medições.
#    "Não existe" é armadilha: o mapa cita de propósito arquivo que ainda NÃO deve existir. Rodado
#    cru deu 6 achados numa casa, 4 falsos. Tentei consertar com lista de palavras de futuro
#    ("pronto quando", "falta:") e a lista ESCONDEU UM ACHADO VERDADEIRO. Lista de palavra é
#    palpite; o git não é: arquivo que já esteve versionado não pode ser "ainda vai nascer".
#    Com a regra do git o futuro se exclui sozinho, e a precisão medida foi de 100%.
# ⚠️ SÓ O MAPA CANÔNICO DA RAIZ: abrir para sub-mapas derrubou a precisão de 100% para ~10%
#    (arquivos datados de auditoria, e mapas por frente com caminhos de OUTRO repo). Sub-mapa é
#    declarado NÃO MEDIDO, nunca reprovado.
# ⚠️ FUNÇÕES PRÓPRIAS (`_gc_*`): este bloco não usa `say/warn/fail/ok` da casa de propósito. Os 23
#    gates do portfólio têm vocabulários diferentes e 6 casas não têm essas funções; em 8 casas
#    `fail` é uma VARIÁVEL (`exit $fail`), não uma função. Um dente que quebra o gate ao chegar é
#    pior que dente nenhum.
_gc_say(){ printf '%s\n' "→ $*"; }
_gc_ok(){  printf '%s\n' "✅ $*"; }
_gc_warn(){ printf '%s\n' "🟨 $*"; }
_gc_fail(){ printf '%s\n' "❌ $*"; _GC_FALHOU=1; }
_GC_FALHOU=0
_gc_say "[conteúdo] o mapa diz a verdade? (item aberto citando obra JÁ FEITA)…"
if ! command -v python3 >/dev/null 2>&1; then
  _gc_warn "[conteúdo] python3 ausente — dente pulado (não conte como verificado)"
else
  _gc_out=$(GATE_MAPA_GLOB="${GATE_MAPA_GLOB:-MAPA-DE-PENDENCIAS*.md}" python3 - <<'__GC_PY__' 2>/dev/null
import os, re, subprocess, glob
raiz = os.getcwd()
mapas = sorted(glob.glob(os.environ.get("GATE_MAPA_GLOB", "MAPA-DE-PENDENCIAS*.md")))
EXT   = r'(?:md|sh|py|json|ya?ml|mjs|js|ts|tsx|html|tsv|csv|sql|lock|txt|toml|png|pdf|jsonl)'
CRASE = re.compile(r'`([^`\s]{3,120})`')
PLACE = re.compile(r'[<>*?{}\[\]|→]|\.\.\.|…|\$\{')
FUTURO = re.compile(r'pronto quando', re.I)

def git(*a):
    try: return subprocess.run(a, cwd=raiz, capture_output=True, text=True).stdout.strip()
    except Exception: return ""

def ignorado(p):
    try: return subprocess.run(["git","check-ignore","-q",p], cwd=raiz,
                               capture_output=True).returncode == 0
    except Exception: return False

achados = []
for mp in mapas:
    try: txt = open(mp, encoding="utf-8", errors="replace").read()
    except Exception: continue
    txt = re.sub(r'<!--.*?-->', lambda m: "\n" * m.group(0).count("\n"), txt, flags=re.S)
    for n, linha in enumerate(txt.split("\n"), 1):
        if FUTURO.search(linha):
            continue
        for t in sorted(set(CRASE.findall(linha))):
            if PLACE.search(t) or " " in t or "/" not in t:           continue
            if t.startswith(("http","mailto:","@","#","-","/")):      continue
            if not re.search(r'\.' + EXT + r'$', t):                  continue
            c = t[2:] if t.startswith("./") else t
            if os.path.exists(os.path.join(raiz, c)):                 continue
            if ignorado(c):                                           continue
            if not git("git","log","--all","--oneline","-1","--",c):  continue
            saiu = git("git","log","-1","--format=%ad","--date=short","--diff-filter=D","--",c)
            achados.append((mp,n,t,saiu or "data?"))
for mp,n,t,saiu in achados[:12]:
    print("      %s:%s cita `%s` — versionado ate %s, hoje nao existe" % (mp,n,t,saiu))
print("__N__%d__%d" % (len(achados), len(mapas)))
__GC_PY__
)
  _gc_n=$(printf '%s' "$_gc_out" | sed -n 's/^__N__\([0-9]*\)__.*/\1/p')
  _gc_m=$(printf '%s' "$_gc_out" | sed -n 's/^__N__[0-9]*__\([0-9]*\)$/\1/p')
  if [ -z "${_gc_m:-}" ]; then
    _gc_warn "[conteúdo] o dente não pôde rodar — NÃO conte como verificado"
  elif [ "${_gc_m:-0}" = "0" ]; then
    _gc_warn "[conteúdo] nenhum MAPA-DE-PENDENCIAS na raiz — o dente não tem onde morder"
  elif [ "${_gc_n:-0}" -gt 0 ]; then
    _gc_fail "[conteúdo] $_gc_n item(ns) do mapa citam obra JÁ FEITA — o arquivo existiu neste repo e foi embora, e o item continua aberto. Tire o item (o que foi feito SAI do mapa) ou conserte o caminho:"
    printf '%s\n' "$_gc_out" | grep -v '^__N__'
  else
    _gc_ok "[conteúdo] mapa sem item citando obra já feita ($_gc_m mapa(s) da raiz lido(s); sub-mapas NÃO medidos)"
  fi
fi
[ "${_GC_FALHOU:-0}" = "1" ] && exit 1
# ── fim do dente de conteúdo ──────────────────────────────────────────────────────────────────
exit $FAIL
