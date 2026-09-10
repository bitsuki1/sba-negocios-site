#!/usr/bin/env python3
"""gerar-mapa-do-dono.py — o GERADOR ÚNICO do espelho HTML do MAPA-DE-PENDENCIAS.md (D216, ordem do dono 2026-09-02).

POR QUE EXISTE. O dono, 02/09 (verbatim): "quanto ao artefato mapa de pendências, cada um tem um padrão, se bagunçam,
se confundem, perdem sempre o fio da meada e eu preciso sempre ficar orientando". A norma (PADRAO-OURO) e o template
(TEMPLATE-MAPA-DE-PENDENCIAS.md) já existiam — mas cada casa desenhava o HTML à mão, e "à mão" = um padrão por casa.
E-044 mandava GERAR desde 10/08; o gerador ficou ⏸ (C74). Este arquivo o torna VIGENTE: o markdown é o SSOT, o HTML
sai daqui, igual em todas as casas, e o teste `test_mapa_espelho.py` + `--check` impedem que o espelho apodreça.

O QUE LÊ (a forma do TEMPLATE — quem foge da forma recebe erro com a linha, não HTML torto):
  # MAPA DE PENDÊNCIAS — <Casa>
  > **🌐 Sua página:** <URL> …                       (a URL estável do Artifact — republicar SEMPRE com url=)
  > **Atualizado: AAAA-MM-DD (vN — motivo)** <estado>
  # 🔒 SEUS|SUAS — <resumo>       → itens `## P1 · 🟥 Título` (aceita Q5, M-NN, "1.")
                                    corpo: o que é · passos numerados com link ·
                                    **Pronto quando:** · **Rec.:**
  # 📅 PRÓXIMA INSTÂNCIA …        → tabela | código | o quê | gatilho |
  # ⚙️ MINHAS …                   → tabela | # | o quê | estado |
  # 💬 RESPOSTAS ÀS SUAS PERGUNTAS → prosa (títulos ##, parágrafos, tabelas)   [MOLDE v2, 09/09]
  # 📌 LIMITES DECLARADOS …       → bullets   [HERDADA — aposentada no molde v2, ainda aceita]
  rodapé (blockquotes)

MOLDE v2 (ordem do dono, 2026-09-09, verbatim): "as mensagens e respostas se perdem nas conversas,
poderiam vir em uma seção separada do mapa… os limites declarados estão virando cemitério e não
deveria, SEUS limites não são os limites do projeto e não deveriam sair de pendências… se não é
pendência, sai; as respostas ao que pergunto ficam até eu resolver, depois saem também."
  · nasce a 💬 — a conversa vira registro, e sai quando ele resolve;
  · morre a 📌 — limite MEU não tira a pendência do PORTFÓLIO da fila. Vira um campo
    `**Muro medido:**` DENTRO da ficha viva, com o fato e o caminho;
  · obrigatórias passam a ser 3 (🔒 📅 ⚙️); 💬 e 📌 são opcionais, nesta ordem.
As 22 casas com conteúdo na 📌 continuam válidas e recebem AVISO com a rota de saída — o dono
pediu padrão melhor, não apagão.

USO:
  python3 processos/gerar-mapa-do-dono.py                     # lê MAPA-DE-PENDENCIAS.md, escreve scratchpad/mapa-pendencias.html
  python3 processos/gerar-mapa-do-dono.py --md X.md --out Y.html
  python3 processos/gerar-mapa-do-dono.py --check             # regenera e compara com o commitado; drift = exit 1 (CI)
Sai 0 = ok · 1 = drift (--check) · 2 = markdown fora da forma (mensagem diz a linha).
"""

# ruff: noqa: E501
# ── por que ESTE arquivo é isento SÓ da régua de comprimento de linha (09/09) ──────────────────────
# Todo o resto do lint (E7xx, F, I, UP, B) está LIMPO aqui e nos outros arquivos que o escritório
# manda às casas — este é o único desvio, e é declarado, não escondido.
# O MOTIVO: mais de 50 linhas longas deste arquivo são o CSS e o HTML do molde. Quebrar uma regra de
# CSS ao meio para caber em 100 colunas não a torna legível: torna-a difícil de conferir contra o
# que aparece na tela, e foi exatamente uma quebra malfeita ali (um `\n` escrito dentro de string
# CRUA) que deixou 4 regras de tabela MORTAS no mapa do dono, em 22 casas, sem ninguém ver.
# A casa `portfolio-comercial` já tinha escrito o mesmo precedente para o gerador de planilha dela:
# "código de layout, denso por natureza… legibilidade aqui vem da densidade, não da quebra".
# A diferença é que a isenção mora AQUI, no arquivo, e viaja com ele — nenhuma casa precisa remendar
# a própria configuração para receber o kit. Cerca que cada casa tem de reconstruir não é cerca.

import argparse
import datetime
import html
import os
import re
import sys

CSS = r"""
  :root{--ground:#FAF7F1;--surface:#FFFFFF;--surface-2:#F3EEE4;--ink:#22201C;--ink-soft:#5C574E;--ink-faint:#8A8377;
    --line:#E4DDCF;--line-strong:#D4CABA;--gold:#B07A22;--gold-soft:#F0E4CC;--gold-ink:#7A4E0E;--steel:#4E6A76;--steel-soft:#E1EAED;
    --done:#4E7A4F;--wait:#B07A22;--idle:#8A8377;--alert:#9C3A2E;--alert-soft:#F4E0DB;--say-ink:#FFFFFF;
    --shadow:0 1px 2px rgba(40,34,24,.05),0 4px 16px rgba(40,34,24,.05);--r:16px}
  @media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--ground:#17150F;--surface:#211E17;--surface-2:#2A261D;--ink:#EEE8DA;
    --ink-soft:#B4AC9A;--ink-faint:#847D6D;--line:#332E23;--line-strong:#443E30;--gold:#E0A94A;--gold-soft:#3A2F17;--gold-ink:#F0CE8A;
    --steel:#8FB3C0;--steel-soft:#1E2A30;--done:#7FB080;--wait:#E0A94A;--idle:#847D6D;--alert:#E08070;--alert-soft:#3A211C;--say-ink:#17150F;
    --shadow:0 1px 2px rgba(0,0,0,.3),0 6px 20px rgba(0,0,0,.28)}}
  :root[data-theme="dark"]{--ground:#17150F;--surface:#211E17;--surface-2:#2A261D;--ink:#EEE8DA;--ink-soft:#B4AC9A;--ink-faint:#847D6D;
    --line:#332E23;--line-strong:#443E30;--gold:#E0A94A;--gold-soft:#3A2F17;--gold-ink:#F0CE8A;--steel:#8FB3C0;--steel-soft:#1E2A30;
    --done:#7FB080;--wait:#E0A94A;--idle:#847D6D;--alert:#E08070;--alert-soft:#3A211C;--say-ink:#17150F;--shadow:0 1px 2px rgba(0,0,0,.3),0 6px 20px rgba(0,0,0,.28)}
  *{box-sizing:border-box}
  body{margin:0;background:var(--ground);color:var(--ink);font-family:"Instrument Sans",system-ui,sans-serif;line-height:1.5;-webkit-font-smoothing:antialiased;padding:0 0 64px}
  .wrap{max-width:680px;margin:0 auto;padding:0 18px}
  header.top{padding:34px 18px 22px;max-width:680px;margin:0 auto}
  .kicker{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);font-weight:500}
  h1{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:clamp(30px,8vw,42px);line-height:1.04;letter-spacing:-.01em;margin:.28em 0 .35em;text-wrap:balance}
  .lede{font-size:15.5px;color:var(--ink-soft);margin:0;max-width:60ch}.lede b{color:var(--ink);font-weight:600}
  .updated{font-family:"JetBrains Mono",monospace;font-size:11.5px;color:var(--ink-faint);margin-top:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .dot{width:6px;height:6px;border-radius:50%;background:var(--done);display:inline-block}
  h2.sec{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:22px;letter-spacing:-.01em;margin:38px 0 4px;display:flex;align-items:baseline;gap:9px}
  h2.sec .n{font-family:"JetBrains Mono",monospace;font-size:13px;color:var(--ink-faint);font-weight:500}
  .sec-note{font-size:13.5px;color:var(--ink-soft);margin:0 0 16px;max-width:58ch}
  .cards{display:flex;flex-direction:column;gap:14px}
  .card{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:var(--r);padding:17px 17px 15px;box-shadow:var(--shadow)}
  .card.red{border-left-color:var(--alert)}.card.green{border-left-color:var(--done)}
  .card h3{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:18.5px;margin:0 0 9px;letter-spacing:-.01em;line-height:1.15}
  .card h3 .num{font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--ink-faint);font-weight:500;margin-right:6px;vertical-align:middle}
  .card p{margin:0 0 9px;font-size:14.5px;color:var(--ink-soft)}.card p:last-child{margin-bottom:0}.card b{color:var(--ink);font-weight:600}
  .card a{color:var(--steel);font-weight:600;text-decoration:underline;text-underline-offset:2px;word-break:break-word}
  .card ol{margin:6px 0 10px;padding-left:22px;font-size:14.5px;color:var(--ink-soft)}.card ol li{margin:4px 0}
  .ready{font-size:13px;color:var(--ink-faint);border-top:1px dashed var(--line-strong);padding-top:9px;margin-top:11px}.ready b{color:var(--done)}
  .warn{background:var(--gold-soft);color:var(--gold-ink);border-radius:10px;padding:9px 12px;font-size:13px;margin:9px 0 0}.warn.red{background:var(--alert-soft);color:var(--alert)}
  .mach{width:100%;border-collapse:collapse;font-size:13.5px;margin-top:4px}.mach td{padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:top}
  .mach tr td:first-child{color:var(--ink-soft)}.mach tr td:last-child{white-space:nowrap;text-align:right;font-family:"JetBrains Mono",monospace;font-size:11.5px}
  .mach tr:last-child td{border-bottom:none}.mach b{color:var(--ink)}
  .card .mach{margin:4px 0 10px}
  .card .mach th{text-align:left;font-size:12px;color:var(--ink-faint);font-weight:600;padding:6px 10px;border-bottom:1px solid var(--line-strong)}
  .card .mach td{font-size:13.5px;padding:8px 10px}
  .card .mach tr td:last-child{white-space:normal;text-align:left;font-family:inherit;font-size:13.5px}
  .st-now{color:var(--steel);font-weight:600}.st-wait{color:var(--wait)}.st-idle{color:var(--idle)}.st-ok{color:var(--done)}.st-red{color:var(--alert)}
  code{font-family:"JetBrains Mono",monospace;font-size:.86em;background:var(--surface-2);border:1px solid var(--line);border-radius:5px;padding:1px 5px;word-break:break-word}
  ul.limits{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px}
  ul.limits li{font-size:13.5px;color:var(--ink-soft);padding-left:18px;position:relative}ul.limits li::before{content:"—";position:absolute;left:0;color:var(--ink-faint)}
  ul.limits li b{color:var(--ink);font-weight:600}
  footer{margin-top:40px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--ink-faint)}footer p{margin:0 0 9px}footer .say-sm{color:var(--gold);font-weight:600}
  h3.resp{font-family:"Fraunces",Georgia,serif;font-weight:600;font-size:17px;margin:22px 0 8px;letter-spacing:-.01em;line-height:1.2;color:var(--ink)}
  p.resp-p{font-size:14.5px;color:var(--ink-soft);margin:0 0 10px;max-width:62ch}
  p.resp-p b{color:var(--ink);font-weight:600}
  .empty{font-size:14px;color:var(--ink-faint);font-style:italic}
"""
FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap">'
)

SEV_CLASS = {"🟥": "red", "🔴": "red", "🟧": "", "🟡": "", "🟨": "", "🟢": "green", "✅": "green"}
ST_CLASS = [
    ("✅", "st-ok"),
    ("🔄", "st-now"),
    ("🟡", "st-now"),
    ("🔴", "st-red"),
    ("🟥", "st-red"),
    ("⏳", "st-idle"),
    ("❄️", "st-idle"),
    ("⏸", "st-idle"),
]


def paras_com_tabela(paras):
    """Parágrafos de uma ficha, convertendo bloco de TABELA markdown em <table>.

    Uma tabela é: uma linha `| … |`, a linha separadora `|---|---|`, e as linhas seguintes.
    Sem isto, a ficha que traz tabela chega ao dono com os `|` crus na tela do celular — o oposto
    do mapa didático que ele pediu. Aconteceu duas vezes (domínios e apps) antes de eu reler o HTML.
    """
    out, i = [], 0
    while i < len(paras):
        p = paras[i]
        eh_cab = p.strip().startswith("|") and p.strip().endswith("|")
        eh_sep = i + 1 < len(paras) and re.fullmatch(r"\|[\s:|-]+\|", paras[i + 1].strip())
        if eh_cab and eh_sep:

            def celulas(linha):
                return [c.strip() for c in linha.strip().strip("|").split("|")]

            cab = celulas(p)
            linhas, j = [], i + 2
            while j < len(paras) and paras[j].strip().startswith("|"):
                linhas.append(celulas(paras[j]))
                j += 1
            out.append(
                '      <table class="mach"><thead><tr>'
                + "".join(f"<th>{inline(c)}</th>" for c in cab)
                + "</tr></thead><tbody>"
            )
            for L in linhas:
                out.append("        <tr>" + "".join(f"<td>{inline(c)}</td>" for c in L) + "</tr>")
            out.append("      </tbody></table>")
            i = j
            continue
        out.append(f"      <p>{inline(p)}</p>")
        i += 1
    return out


def inline(md):
    """Markdown inline → HTML (negrito, itálico, código, link, riscado). Escapa o resto."""
    s = html.escape(md, quote=False)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(
        r"\[([^\]]+)\]\((https?://[^)\s]+)\)",
        r'<a href="\2" target="_blank" rel="noopener">\1</a>',
        s,
    )
    s = re.sub(
        r"(?<![\w\"'>])(https?://[^\s<)\]]+)",
        r'<a href="\1" target="_blank" rel="noopener">\1</a>',
        s,
    )
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"~~(.+?)~~", r"<s>\1</s>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)([^*\n]+?)\*(?![\w*])", r"<i>\1</i>", s)
    s = re.sub(r"(?<![\w_])_(?!\s)([^_\n]+?)_(?![\w_])", r"<i>\1</i>", s)
    return s


def erro(msg, ln=None):
    print(f"❌ gerar-mapa-do-dono: {msg}" + (f" (linha {ln})" if ln else ""), file=sys.stderr)
    sys.exit(2)


AVISOS = []  # molde v2: o que a casa ainda usa e vai sair (não é erro, é rota de saída)


def parse(md_text):
    L = md_text.split("\n")
    doc = {
        "titulo": None,
        "url": None,
        "fonte": None,
        "atualizado": None,
        "estado": "",
        "regras": [],
        "secoes": {},
        "rodape": [],
    }
    ordem = []
    sec = None
    for i, raw in enumerate(L, 1):
        lin = raw.rstrip()
        if lin.startswith("<!--") or (sec is None and lin.startswith("     ")):
            continue
        if doc["titulo"] is None:
            m = re.match(r"^# MAPA DE PENDÊNCIAS\s*[—-]\s*(.+)$", lin)
            if m:
                doc["titulo"] = m.group(1).strip()
                continue
            if lin.startswith("# "):
                erro("o título tem de ser `# MAPA DE PENDÊNCIAS — <Casa>`", i)
            continue
        if sec is None and lin.startswith(">"):
            body = lin.lstrip("> ").strip()
            m = re.search(r"(https://claude\.ai/code/artifact/[A-Za-z0-9-]+)", body)
            if "Sua página" in body or (m and doc["url"] is None):
                doc["url"] = m.group(1) if m else None
                f = re.search(r"Fonte:\s*`([^`]+)`", body)
                doc["fonte"] = f.group(1) if f else None
                continue
            # O `(vN — motivo)` é DESEJÁVEL, não load-bearing: quem lê no celular precisa da DATA.
            # A AVC escreve `**Atualizado: 2026-08-29 — motivo**`, sem o parêntese de versão, e por
            # isso o molde recusava o mapa inteiro. Recusar um cabeçalho que traz data e motivo por
            # causa do número da versão é o apagão de novo. Aceita-se, com aviso. (Medido ao testar
            # o template contra as 23 casas antes de descê-lo.)
            m = re.match(r"\*\*Atualizado:\s*(\d{4}-\d{2}-\d{2})\s*\(([^)]*)\)\*\*\s*(.*)$", body)
            if not m:
                m2 = re.match(
                    r"\*\*Atualizado:\s*(\d{4}-\d{2}-\d{2})\s*[—–-]\s*(.*?)\*\*\s*(.*)$", body
                )
                if m2:
                    AVISOS.append(
                        "o cabeçalho traz data e motivo mas não o `(vN — motivo)`; "
                        "acrescente a versão quando reescrever — é o que diz ao dono se "
                        "ele já viu esta folha"
                    )
                    doc["atualizado"] = (m2.group(1), m2.group(2).strip())
                    doc["estado"] = m2.group(3)
                    continue
            if m:
                doc["atualizado"] = (m.group(1), m.group(2))
                doc["estado"] = m.group(3)
                continue
            doc["regras"].append(body)
            continue
        # A AVC escreveu a MESMA pista com outro emoji: `# 🤖 DA MÁQUINA — o que eu faço sozinho`
        # é, palavra por palavra, a `# ⚙️ MINHAS`. Descoberto ao testar este molde contra o mapa
        # REAL
        # das 23 casas ANTES de descer o template — 22 passaram e só a AVC quebrou. Recusar por
        # causa
        # do emoji deixaria a casa sem mapa para consertar um defeito de grafia: é o apagão que o
        # dono
        # vetou. Aceita-se como sinônimo, com aviso e rota de saída, igual à 📌 e à 📅.
        SINONIMOS = {"🤖": "⚙️"}
        m = re.match(r"^# (🔒|📅|⚙️|📌|💬|🤖)\s*(.*)$", lin)
        if m:
            sec = SINONIMOS.get(m.group(1), m.group(1))
            if m.group(1) in SINONIMOS:
                AVISOS.append(
                    f"a pista `# {m.group(1)}` (linha {i}) é a `# {sec}` com outro emoji — "
                    f"lida como {sec}; renomeie quando reescrever o mapa, o molde tem uma grafia só"
                )
            doc["secoes"][sec] = {"titulo": m.group(2).strip(), "linhas": [], "ln": i}
            ordem.append(sec)
            continue
        if sec is None:
            if lin.startswith("# "):
                erro(
                    f"seção desconhecida `{lin[:40]}` — as pistas são # 🔒 · # ⚙️ · # 💬 "
                    f"(e as herdadas # 📅 e # 📌, que estão sendo aposentadas; `# 🤖` é lida como `# ⚙️`)",
                    i,
                )
            continue
        if lin.startswith("# "):
            erro(f"seção desconhecida `{lin[:40]}`", i)
        if lin.startswith("---"):
            continue
        doc["secoes"][sec]["linhas"].append((i, lin))
    if doc["titulo"] is None:
        erro("faltou o título `# MAPA DE PENDÊNCIAS — <Casa>`")
    if not doc["url"]:
        erro(
            "faltou a URL estável do Artifact no cabeçalho (`> **🌐 Sua página:** https://claude.ai/code/artifact/…`) — PADRAO-OURO §1"
        )
    if not doc["atualizado"]:
        erro("faltou `> **Atualizado: AAAA-MM-DD (vN — motivo)** …` no cabeçalho")
    # MOLDE v2 (ordem do dono, 2026-09-09). Duas mudanças, e as duas vieram da mesma frase dele:
    #   "os limites declarados estão virando cemitério… SEUS limites não são os limites do
    #    projeto e não deveriam sair de pendências"
    # 1. Nasce a pista `# 💬 RESPOSTAS` — "as mensagens e respostas se perdem nas conversas,
    #    poderiam vir em uma seção separada do mapa… ficam até eu resolver, depois saem".
    # 2. A pista `# 📌 LIMITES DECLARADOS` está APOSENTADA. Ela virou o lugar onde o item ia
    #    morrer: eu declarava um limite MEU e a pendência do PORTFÓLIO saía da fila. No molde
    #    novo o limite não é pista — é um campo `**Muro medido:**` DENTRO da ficha viva, com o
    #    fato e o caminho. A ficha não sai.
    # Compatibilidade: a 📌 continua ACEITA e renderizada, com aviso. São 22 casas com conteúdo
    # nela; recusar de um dia para o outro quebraria o mapa de todas — e o dono pediu um padrão
    # melhor, não um apagão. A casa migra quando reescrever a pista.
    # MOLDE v3 (09/09, ordem que ele deu à SBA na mesma madrugada): "nada para proxima instancia
    # agora, traga tudo como pendencia de novo". A `📅` está APOSENTADA — item adiado para uma
    # instância que ninguém sabe quando abre é esquecimento com data marcada: ou depende dele
    # (🔒) ou é meu (⚙️).
    # PRAZO, não apagão: hoje é AVISO; vira ERRO em 2026-09-16. Motivo — mover item de pista é
    # decidir CONTEÚDO, e conteúdo é da casa (a lição da AVC, 08/09). Recusar de um dia para o
    # outro deixaria sem mapa toda casa com item na 📅, para consertar um defeito que é meu, de
    # padrão. A semana é para a casa mover; depois dela o gerador recusa.
    VIRA_ERRO_EM = "2026-09-16"
    for s in ("🔒", "⚙️"):
        if s not in doc["secoes"]:
            erro(f"faltou a seção `# {s} …` (as 2 obrigatórias são 🔒 ⚙️)")
    if "📅" in doc["secoes"]:
        msg = (
            "a pista `# 📅 PRÓXIMA INSTÂNCIA` foi APOSENTADA em 2026-09-09 (ordem do dono: "
            '"nada para proxima instancia agora, traga tudo como pendencia de novo"). '
            "Mova cada item para `# 🔒` (se depende dele) ou `# ⚙️` (se é seu) e apague a pista."
        )
        if datetime.date.today().isoformat() >= VIRA_ERRO_EM:
            erro(msg, doc["secoes"]["📅"]["ln"])
        AVISOS.append(msg + f" — vira ERRO em {VIRA_ERRO_EM}.")
    # A ordem que importa: o que é DELE primeiro, a pista herdada por último. Entre a `⚙️` (minhas,
    # "só para você ver") e a `💬` (respostas às perguntas DELE) não há ordem certa — e a SBA pôs a
    # `💬` antes, o que é MELHOR que a minha norma: o que é dele fica junto, e o meu vai para o fim.
    # Eu tinha travado a ordem que EU escrevi primeiro e a casa fez melhor. Aceitar as duas é o
    # certo;
    # recusar o mapa de uma casa por causa disso seria impor forma sobre juízo. (09/09)
    MIOLO = {"⚙️", "💬"}

    def forma(seq):
        return [("miolo" if s in MIOLO else s) for s in seq]

    esperada = [s for s in ("🔒", "📅", "⚙️", "💬", "📌") if s in doc["secoes"]]
    if forma(ordem) != forma(esperada):
        erro(
            f"ordem das seções é {ordem}; a norma manda 🔒 primeiro e 📌 por último "
            f"(a `⚙️` e a `💬` podem vir em qualquer ordem entre elas)"
        )
    if "📌" in doc["secoes"]:
        AVISOS.append(
            "a pista `# 📌 LIMITES DECLARADOS` está aposentada (molde v2, 09/09): "
            "limite meu não tira a pendência da fila — vira `**Muro medido:**` dentro "
            "da ficha viva, com o fato e o caminho. Migre quando reescrever o mapa."
        )
    # regra 1 do molde (C128, A-526 03/09): o que foi FEITO sai do mapa — ✅ ou linha riscada em ⚙️/🔒
    # é recusado
    for ln, lin in doc["secoes"]["⚙️"]["linhas"]:
        if lin.startswith("|") and ("✅" in lin or "~~" in lin):
            erro(
                f"linha {ln}: item ✅/riscado em ⚙️ MINHAS — regra 1 do molde: o que foi feito SAI do mapa (vive no git/HANDOFF)"
            )
    for ln, lin in doc["secoes"]["🔒"]["linhas"]:
        if lin.startswith("## ") and ("✅" in lin or lin.startswith("## ~~")):
            erro(
                f"linha {ln}: item ✅/riscado em 🔒 SEUS — regra 1 do molde: o que foi feito SAI do mapa"
            )
    # MR-77 (prometida em 22/08, construída em 04/09): código repetido no mapa faz o dono responder
    # "resolve o P3"
    # e duas coisas diferentes atenderem. Aborta com as duas linhas.
    vistos = {}
    for ln, lin in doc["secoes"]["🔒"]["linhas"]:
        m = re.match(r"^## ((?:P|Q|N|M-?)?\d+)\s*[.·]", lin)
        if not m:
            continue
        if m.group(1) in vistos:
            erro(
                f"linha {ln}: o código {m.group(1)} já foi usado na linha {vistos[m.group(1)]} — cada item do dono tem um código só (MR-77)"
            )
        vistos[m.group(1)] = ln
    # E4 (pedido da SBA, 04/09): item roteado à PRÓXIMA INSTÂNCIA sem GATILHO é esquecimento com
    # data
    # marcada — ninguém sabe o que faz o item acordar. A coluna existe no molde desde o início e
    # vinha
    # sendo preenchida com "—". Casa com a ordem do dono de 04/09 (rotear o que é da casa PARA a
    # casa):
    # roteamento só é roteamento se o item acorda sozinho lá.
    # (a pista pode não existir — molde v3 a aposentou; o check só vale para quem ainda a tem)
    for ln, lin in doc["secoes"].get("📅", {"linhas": []})["linhas"]:
        if not lin.startswith("|"):
            continue
        cels = [c.strip() for c in lin.strip().strip("|").split("|")]
        if len(cels) < 3 or set(cels[0]) <= set("-: ") or cels[0].lower() in ("código", "codigo"):
            continue
        if not cels[2] or cels[2] in ("—", "-", "?", "a definir", "A DEFINIR"):
            erro(
                f"linha {ln}: item da pista 📅 sem GATILHO — diga o que faz este item acordar "
                f"(uma data, um evento, 'quando a casa X abrir'). Item roteado sem gatilho é "
                f"esquecimento com data marcada (E4, pedido da SBA 04/09)",
                ln,
            )

    # rodapé = blockquotes ao fim da ÚLTIMA pista (era sempre a 📌; no molde v2 ela pode não
    # existir, e aí o rodapé fecha a 💬 ou a ⚙️ — a última que a casa escreveu)
    ultima = next((s for s in ("📌", "💬", "⚙️", "📅", "🔒") if s in doc["secoes"]), None)
    if ultima:
        lim = doc["secoes"][ultima]["linhas"]
        while lim and (lim[-1][1].startswith(">") or not lim[-1][1].strip()):
            if lim[-1][1].startswith(">"):
                doc["rodape"].insert(0, lim[-1][1].lstrip("> ").strip())
            lim.pop()
    return doc


def itens_suas(linhas):
    """`## P1 · 🟥 Título` (ou Q5 · / M-NN · / `## 1. `) → cards. Corpo: parágrafos, passos `1.`, **Pronto quando:**, **Rec.:**, > avisos."""
    itens, cur, prosa = [], None, []
    for ln, lin in linhas:
        m = re.match(
            r"^## (?:(P\d+|Q\d+|N\d+|M-?\d+|\d+)\s*[.·]\s*)?(🟥|🟧|🟡|🟨|🟢|🔴|✅)?\s*(.+)$", lin
        )
        if m:
            cur = {
                "cod": m.group(1) or "",
                "sev": m.group(2) or "",
                "titulo": m.group(3).strip(),
                "paras": [],
                "passos": [],
                "pronto": None,
                "rec": None,
                "avisos": [],
                "ln": ln,
            }
            itens.append(cur)
            continue
        if cur is None:
            if lin.strip():
                prosa.append(lin)
            continue
        s = lin.strip()
        if not s:
            continue
        mp = re.match(r"^(\d+)\.\s+(.*)$", s)
        if mp:
            cur["passos"].append(mp.group(2))
            continue
        if s.lower().startswith("**pronto quando:**"):
            cur["pronto"] = s.split("**", 2)[2].strip()
            continue
        if re.match(r"^\*\*rec\.?:?\*\*", s, re.I):
            cur["rec"] = re.sub(r"^\*\*rec\.?:?\*\*\s*", "", s, flags=re.I)
            continue
        if s.startswith(">"):
            cur["avisos"].append(s.lstrip("> ").strip())
            continue
        cur["paras"].append(s)
    return prosa, itens


def tabela(linhas):
    rows = []
    for _ln, lin in linhas:
        if not lin.startswith("|"):
            continue
        cells = [c.strip() for c in lin.strip().strip("|").split("|")]
        if all(re.match(r"^:?-{3,}:?$", c) for c in cells if c):
            continue
        rows.append(cells)
    if rows and rows[0] and rows[0][0].lower() in ("código", "codigo", "#", "cod"):
        rows = rows[1:]
    return rows


def st_class(txt):
    for k, c in ST_CLASS:
        if k in txt:
            return c
    return "st-idle"


def render(doc, casa_kicker):
    S = doc["secoes"]
    prosa, itens = itens_suas(S["🔒"]["linhas"])
    data, ver = doc["atualizado"]
    dd = datetime.date.fromisoformat(data).strftime("%d/%m")
    out = [
        f"<title>Mapa do Dono — {html.escape(doc['titulo'])}</title>",
        '<meta name="viewport" content="width=device-width, initial-scale=1">',
        FONTS,
        f"<style>{CSS}</style>",
    ]
    out.append('<header class="top">')
    out.append(f'  <div class="kicker">mapa de pendências · {html.escape(casa_kicker)}</div>')
    out.append(f"  <h1>{html.escape(doc['titulo'])}</h1>")
    if doc["estado"]:
        out.append(f'  <p class="lede">{inline(doc["estado"])}</p>')
    out.append(
        f'  <div class="updated"><span class="dot"></span> Atualizado {dd} · {html.escape(ver.split("—")[0].strip())} &nbsp;·&nbsp; 🔒 você faz &nbsp;·&nbsp; ⚙️ eu faço</div>'
    )
    out.append("</header>")
    out.append('<main class="wrap">')
    # 🔒
    out.append(
        f'  <h2 class="sec">🔒 Suas <span class="n">{inline(S["🔒"]["titulo"].split("—", 1)[1].strip() if "—" in S["🔒"]["titulo"] else "")}</span></h2>'
    )
    for p in prosa:
        out.append(f'  <p class="sec-note">{inline(p.lstrip("> ").strip())}</p>')
    if itens:
        out.append('  <div class="cards">')
        for it in itens:
            cls = SEV_CLASS.get(it["sev"], "")
            out.append(f'    <div class="card{(" " + cls) if cls else ""}">')
            num = ('<span class="num">' + html.escape(it["cod"]) + "</span>") if it["cod"] else ""
            sev = (it["sev"] + " ") if it["sev"] else ""
            out.append("      <h3>" + num + sev + inline(it["titulo"]) + "</h3>")
            out.extend(paras_com_tabela(it["paras"]))
            if it["passos"]:
                out.append(
                    "      <ol>" + "".join(f"<li>{inline(p)}</li>" for p in it["passos"]) + "</ol>"
                )
            for a in it["avisos"]:
                out.append(
                    f'      <div class="warn{" red" if "⚠️" in a or "NÃO" in a else ""}">{inline(a)}</div>'
                )
            if it["pronto"]:
                out.append(
                    f'      <p class="ready"><b>Pronto quando:</b> {inline(it["pronto"])}</p>'
                )
            if it["rec"]:
                out.append(f'      <p class="ready">Recomendo: {inline(it["rec"])}</p>')
            out.append("    </div>")
        out.append("  </div>")
    elif not prosa:
        out.append(
            '  <p class="empty">Nenhuma — e o mapa não diz de qual rodada. (Defeito: escreva "🔒 SEUS: nenhum — medido na rodada de …".)</p>'
        )
    # 📅 — pista APOSENTADA (molde v3). Só desenha se a casa ainda a tiver, e diz na tela que ela
    # está saindo: o dono lê a PÁGINA, não o log do gerador, e é ele quem vai cobrar a mudança.
    if "📅" in S:
        out.append(
            '  <h2 class="sec">📅 Próxima instância '
            '<span class="n">pista aposentada — mova para 🔒 ou ⚙️</span></h2>'
        )
        rows = tabela(S["📅"]["linhas"])
        if rows:
            out.append(
                '  <table class="mach">'
                + "".join(
                    f'<tr><td>{inline(r[0])} — {inline(r[1]) if len(r) > 1 else ""}</td><td class="st-idle">{inline(r[2]) if len(r) > 2 else ""}</td></tr>'
                    for r in rows
                )
                + "</table>"
            )
        else:
            out.append('  <p class="empty">nada combinado para a próxima instância.</p>')
    # ⚙️
    out.append('  <h2 class="sec">⚙️ Minhas <span class="n">só para você ver</span></h2>')
    rows = tabela(S["⚙️"]["linhas"])
    if rows:
        out.append(
            '  <table class="mach">'
            + "".join(
                f'<tr><td>{inline(r[0])} — {inline(r[1]) if len(r) > 1 else ""}</td><td class="{st_class(r[2]) if len(r) > 2 else "st-idle"}">{inline(r[2]) if len(r) > 2 else ""}</td></tr>'
                for r in rows
            )
            + "</table>"
        )
    else:
        out.append('  <p class="empty">nada rodando.</p>')
    # 💬 RESPOSTAS (molde v2): a pista que ele pediu — "as mensagens e respostas se perdem nas
    # conversas". Renderiza a prosa como está: aqui não há tabela nem card, é conversa registrada.
    if "💬" in S:
        out.append(
            '  <h2 class="sec">💬 Respostas às suas perguntas '
            '<span class="n">ficam até você resolver, depois saem</span></h2>'
        )
        corpo = "\n".join(lin for ln, lin in S["💬"]["linhas"] if not lin.startswith(">"))
        for bloco in [b.strip() for b in corpo.split("\n\n") if b.strip()]:
            if bloco.startswith("## "):
                out.append(f'  <h3 class="resp">{inline(bloco[3:].strip())}</h3>')
            elif bloco.startswith("|"):
                linhas = [x for x in bloco.split("\n") if x.strip().startswith("|")]
                cels = [[c.strip() for c in x.strip().strip("|").split("|")] for x in linhas]
                cels = [c for c in cels if not (c and set("".join(c)) <= set("-: "))]
                out.append(
                    '  <table class="mach">'
                    + "".join(
                        "<tr>" + "".join(f"<td>{inline(c)}</td>" for c in linha) + "</tr>"
                        for linha in cels
                    )
                    + "</table>"
                )
            elif bloco.startswith("---"):
                continue
            else:
                out.append(f'  <p class="resp-p">{inline(bloco)}</p>')
    # 📌 — pista HERDADA. Só desenha se a casa ainda a tiver (ver nota do molde v2 no parse).
    if "📌" in S:
        out.append(
            '  <h2 class="sec">📌 Limites declarados '
            '<span class="n">pista herdada — está sendo aposentada</span></h2>'
        )
        bul = [lin.strip()[2:] for ln, lin in S["📌"]["linhas"] if lin.strip().startswith("- ")]
        out.append(
            '  <ul class="limits">' + "".join(f"<li>{inline(b)}</li>" for b in bul) + "</ul>"
            if bul
            else '  <p class="empty">nenhum limite declarado.</p>'
        )
    out.append("  <footer>")
    for r in doc["rodape"]:
        out.append(f"    <p>{inline(r)}</p>")
    out.append(
        '    <p>O que sempre vale é o arquivo <code>MAPA-DE-PENDENCIAS.md</code> no git; esta página é a foto, gerada por máquina (<code>gerar-mapa-do-dono.py</code>). Se abrir vazia, diga <span class="say-sm">"republica o meu mapa"</span>.</p>'
    )
    out.append("  </footer>")
    out.append("</main>")
    return "\n".join(out) + "\n"


# ── RECORTE POR FRENTE (DE-83 · ordem do dono 2026-09-02: "cada frente tenha seu próprio mapa")
# ────
# O molde único de 04/09 gera UMA página por casa. A Moderação Profinders cobrou em 09/09: as duas
# páginas por frente dela ficaram **congeladas em 25/08**, porque o molde aposentou o gerador
# caseiro
# que as fazia. A casa recomendou DESPUBLICAR; o escritório recusou por um motivo só: despublicar
# desfaz **em silêncio** a ordem dele de 02/09. Então o molde ganha o recorte — mesma forma, mesma
# régua, uma página por frente.
#
# O CONTRATO, e ele é deliberadamente simples: o item declara a frente no PRÓPRIO corpo, com
# `frente: <nome>` (em qualquer lugar do bloco, com ou sem crase). Sem tag = não entra em recorte
# nenhum. Não se adivinha frente por título, por seção nem por proximidade — adivinhar é como o
# instrumento passa a medir a forma do texto em vez do fato.
# ⚠️ A 1ª versão aceitava `frente:` SEM crase e casou a frase de uma ficha minha — *"Mapa por
# FRENTE:
# você pediu em 02/09…"* — inventando uma frente com 90 caracteres de nome. É a família de defeito
# desta casa em miniatura: o instrumento casando a FORMA do texto em vez do FATO. Agora a marca tem
# **uma grafia só**, entre crases, e o nome é curto: `frente: comercial`. Prosa não vira tag.
RX_FRENTE = re.compile(r"`frente:\s*([^`\n|]{1,40}?)\s*`", re.I)


def frentes_declaradas(doc):
    """{nome_normalizado: nome_como_escrito} — toda frente que aparece em alguma linha do mapa."""
    achadas = {}
    for sec in doc["secoes"].values():
        for _, lin in sec["linhas"]:
            m = RX_FRENTE.search(lin)
            if m:
                nome = m.group(1).strip()
                achadas.setdefault(nome.lower(), nome)
    return achadas


def recorta(doc, frente):
    """Devolve uma CÓPIA do doc com só as linhas da frente pedida. Levanta se a frente não existe —
    página vazia é o defeito de denominador zero: sai verde dizendo que não há pendência."""
    alvo = frente.strip().lower()
    tem = frentes_declaradas(doc)
    if alvo not in tem:
        nomes = ", ".join(sorted(tem.values())) or "nenhuma"
        erro(
            f"nenhum item do mapa declara `frente: {frente}`. As frentes declaradas hoje são: "
            f"{nomes}. Marque os itens da frente com `frente: {frente}` no corpo — o recorte não "
            f"adivinha por título nem por seção."
        )
    novo = {k: (dict(v) if isinstance(v, dict) else v) for k, v in doc.items()}
    novo["secoes"] = {}
    for pista, sec in doc["secoes"].items():
        linhas = [
            (i, lin)
            for i, lin in sec["linhas"]
            if RX_FRENTE.search(lin) and RX_FRENTE.search(lin).group(1).strip().lower() == alvo
        ]
        # A 💬 RESPOSTAS não se recorta: resposta a pergunta DELE vale para a casa toda, e sumir
        # com ela numa folha de frente seria esconder a resposta de quem abriu justamente essa
        # folha.
        if pista == "💬":
            linhas = sec["linhas"]
        novo["secoes"][pista] = {**sec, "linhas": linhas}
    d, motivo = doc["atualizado"]
    novo["atualizado"] = (d, f"{motivo} · RECORTE DA FRENTE {tem[alvo]}")
    novo["titulo"] = f"{doc['titulo']} · frente {tem[alvo]}"
    return novo


# ── bateria por mutação do RECORTE (DE-83) — gate que nunca reprova não é dente
# ────────────────────
def prova_frente():
    import subprocess
    import tempfile

    falhas = []

    def caso(nome, cond):
        print(("  ✅ " if cond else "  ❌ ") + nome)
        if not cond:
            falhas.append(nome)

    caso(
        "a marca exige crase — prosa com 'frente:' no meio NÃO vira tag",
        RX_FRENTE.search("Mapa por FRENTE: você pediu em 02/09 e o molde atropelou") is None,
    )
    caso(
        "a marca reconhece a grafia única `frente: comercial`",
        (
            RX_FRENTE.search("| M-1 | `frente: comercial` | ⏳ |")
            or type("x", (), {"group": lambda s, n: ""})()
        ).group(1)
        == "comercial",
    )
    caso(
        "MUTAÇÃO: nome longo (frase) não vira frente",
        RX_FRENTE.search("`frente: " + "x" * 60 + "`") is None,
    )

    md = os.path.join(os.path.dirname(__file__), "..", "MAPA-DE-PENDENCIAS.md")
    if os.path.isfile(md):
        base = open(md, encoding="utf-8").read()
        if "## S-" in base:
            with tempfile.TemporaryDirectory() as d:
                p = os.path.join(d, "m.md")
                cod = base.split("## S-", 1)[1][:3].rstrip(" ·")
                open(p, "w", encoding="utf-8").write(
                    base.replace("## S-" + cod, f"## S-{cod} · `frente: teste`", 1)
                )
                exe = [sys.executable, os.path.abspath(__file__), "--md", p]
                r = subprocess.run(
                    exe + ["--frente", "teste", "--out", os.path.join(d, "f.html")],
                    capture_output=True,
                    text=True,
                )
                caso("recorta a frente declarada", r.returncode == 0)
                r = subprocess.run(
                    exe + ["--frente", "nao-existe", "--out", os.path.join(d, "g.html")],
                    capture_output=True,
                    text=True,
                )
                caso(
                    "MUTAÇÃO: frente inexistente REPROVA (não emite folha vazia)", r.returncode != 0
                )
                r = subprocess.run(exe + ["--frente", "teste"], capture_output=True, text=True)
                caso(
                    "MUTAÇÃO: recorte no --out padrão REPROVA (não apaga o mapa da casa)",
                    r.returncode != 0,
                )

    # ── o CAMINHO DE ERRO também se executa (09/09) ──────────────────────────────────────────────
    # POR QUE: ao arrumar o lint deste arquivo eu renomeei uma variável por TOKEN, e o tokenizador
    # do Python 3.11 não vê dentro de f-string — duas referências ficaram apontando para um nome que
    # não existia mais. O mapa continuou saindo BYTE A BYTE IDÊNTICO, porque as duas linhas só rodam
    # quando o mapa está torto. Regressão invisível: o oráculo passou por não visitar o caminho.
    # Quem pegou foi o próprio lint. Este caso é para não depender disso de novo.
    with tempfile.TemporaryDirectory() as d:
        p = os.path.join(d, "torto.md")
        open(p, "w", encoding="utf-8").write(
            "# MAPA DE PENDÊNCIAS — Casa de Teste\n"
            "> **Atualizado: 2026-09-09 (v1 — caso de erro)**\n\n"
            "# 🧨 PISTA QUE NÃO EXISTE\n\n"
            "## 1. item\n"
        )
        r = subprocess.run(
            [sys.executable, os.path.abspath(__file__), "--md", p, "--out", os.path.join(d, "x.html")],
            capture_output=True,
            text=True,
        )
        saida = (r.stdout or "") + (r.stderr or "")
        caso("MUTAÇÃO: pista desconhecida REPROVA", r.returncode != 0)
        caso(
            "o caminho de erro DIZ qual pista é, sem estourar em traceback",
            "Traceback" not in saida and "🧨" in saida,
        )

    marca = "🟥 BATERIA REPROVADA" if falhas else "🟩 bateria ok"
    print(f"\n{marca} — {len(falhas)} caso(s) falharam")
    return 1 if falhas else 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md", default="MAPA-DE-PENDENCIAS.md")
    ap.add_argument("--out", default=os.path.join("scratchpad", "mapa-pendencias.html"))
    ap.add_argument(
        "--casa", default=None, help="rótulo pequeno no topo (padrão: nome da pasta do repo)"
    )
    ap.add_argument(
        "--check",
        action="store_true",
        help="regenera e compara com o arquivo existente; drift = exit 1",
    )
    ap.add_argument(
        "--frente",
        default=None,
        help="emite a folha de UMA frente (itens marcados `frente: <nome>` no corpo) — DE-83",
    )
    ap.add_argument(
        "--frentes", action="store_true", help="lista as frentes declaradas no mapa e sai"
    )
    ap.add_argument(
        "--prova", action="store_true", help="bateria por mutação do recorte por frente"
    )
    a = ap.parse_args()
    if a.prova:
        return prova_frente()
    if not os.path.isfile(a.md):
        erro(f"não achei {a.md} — o mapa canônico é MAPA-DE-PENDENCIAS.md na raiz (PADRAO-OURO §6)")
    doc = parse(open(a.md, encoding="utf-8").read())
    if a.frentes:
        tem = frentes_declaradas(doc)
        if not tem:
            print("nenhum item deste mapa declara `frente: <nome>` — não há recorte a fazer.")
        else:
            print("frentes declaradas neste mapa: " + " · ".join(sorted(tem.values())))
            print(
                "emita a folha de uma delas com: --frente '<nome>' --out scratchpad/mapa-<nome>.html"
            )
        return 0
    if a.frente:
        doc = recorta(doc, a.frente)
        # A folha de frente NUNCA pode cair no arquivo de saída padrão: publicar um recorte no
        # endereço do mapa da casa esconderia dele todo o resto da casa. Exigir `--out` é o dente.
        if os.path.abspath(a.out) == os.path.abspath(
            os.path.join("scratchpad", "mapa-pendencias.html")
        ):
            erro(
                "recorte de frente precisa do seu próprio `--out` (ex.: "
                "`--out scratchpad/mapa-frente-<nome>.html`) e do seu próprio endereço de Artifact. "
                "Gravar o recorte no arquivo do mapa da casa apagaria o resto da casa da tela dele."
            )
    # O rótulo vem do PRÓPRIO markdown (título) — nunca de argumento — para que `--check` na CI
    # produza o mesmo byte.
    casa = doc["titulo"]
    novo = render(doc, casa)
    if a.check:
        atual = open(a.out, encoding="utf-8").read() if os.path.isfile(a.out) else ""
        if atual != novo:
            print(
                f"❌ gerar-mapa-do-dono --check: {a.out} está DEFASADO em relação a {a.md} — rode o gerador e republique (url= do cabeçalho)."
            )
            return 1
        print(f"✅ gerar-mapa-do-dono --check: espelho em dia com {a.md}.")
        return 0
    os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
    open(a.out, "w", encoding="utf-8").write(novo)
    n = len(itens_suas(doc["secoes"]["🔒"]["linhas"])[1])
    print(
        f"✅ {a.out} gerado ({len(novo)} B) — {n} item(ns) 🔒 · URL do Artifact: {doc['url']} · republicar com url= (C130)."
    )
    # Aviso que ninguém lê é o mesmo que aviso que não existe — e a rota de saída da 📅 depende
    # de a casa VER que ela vai virar erro. Sai na tela, e no --check também.
    for av in AVISOS:
        print(f"🟨 [molde v3] {av}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
