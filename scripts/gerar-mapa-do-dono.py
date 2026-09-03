#!/usr/bin/env python3
# -*- coding: utf-8 -*-
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
  # 🔒 SEUS|SUAS — <resumo>       → itens `## P1 · 🟥 Título` (aceita Q5, M-NN, "1.") com corpo: o que é ·
                                    passos numerados com link · **Pronto quando:** · **Rec.:**
  # 📅 PRÓXIMA INSTÂNCIA …        → tabela | código | o quê | gatilho |
  # ⚙️ MINHAS …                   → tabela | # | o quê | estado |
  # 📌 LIMITES DECLARADOS …       → bullets
  rodapé (blockquotes)

USO:
  python3 processos/gerar-mapa-do-dono.py                     # lê MAPA-DE-PENDENCIAS.md, escreve scratchpad/mapa-pendencias.html
  python3 processos/gerar-mapa-do-dono.py --md X.md --out Y.html
  python3 processos/gerar-mapa-do-dono.py --check             # regenera e compara com o commitado; drift = exit 1 (CI)
Sai 0 = ok · 1 = drift (--check) · 2 = markdown fora da forma (mensagem diz a linha).
"""
import argparse, html, os, re, sys, datetime

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
  .st-now{color:var(--steel);font-weight:600}.st-wait{color:var(--wait)}.st-idle{color:var(--idle)}.st-ok{color:var(--done)}.st-red{color:var(--alert)}
  code{font-family:"JetBrains Mono",monospace;font-size:.86em;background:var(--surface-2);border:1px solid var(--line);border-radius:5px;padding:1px 5px;word-break:break-word}
  ul.limits{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px}
  ul.limits li{font-size:13.5px;color:var(--ink-soft);padding-left:18px;position:relative}ul.limits li::before{content:"—";position:absolute;left:0;color:var(--ink-faint)}
  ul.limits li b{color:var(--ink);font-weight:600}
  footer{margin-top:40px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--ink-faint)}footer p{margin:0 0 9px}footer .say-sm{color:var(--gold);font-weight:600}
  .empty{font-size:14px;color:var(--ink-faint);font-style:italic}
"""
FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap">')

SEV_CLASS = {"🟥": "red", "🔴": "red", "🟧": "", "🟡": "", "🟨": "", "🟢": "green", "✅": "green"}
ST_CLASS = [("✅", "st-ok"), ("🔄", "st-now"), ("🟡", "st-now"), ("🔴", "st-red"), ("🟥", "st-red"), ("⏳", "st-idle"), ("❄️", "st-idle"), ("⏸", "st-idle")]


def inline(md):
    """Markdown inline → HTML (negrito, itálico, código, link, riscado). Escapa o resto."""
    s = html.escape(md, quote=False)
    s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
    s = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+)\)", r'<a href="\2" target="_blank" rel="noopener">\1</a>', s)
    s = re.sub(r"(?<![\w\"'>])(https?://[^\s<)\]]+)", r'<a href="\1" target="_blank" rel="noopener">\1</a>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"~~(.+?)~~", r"<s>\1</s>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)([^*\n]+?)\*(?![\w*])", r"<i>\1</i>", s)
    s = re.sub(r"(?<![\w_])_(?!\s)([^_\n]+?)_(?![\w_])", r"<i>\1</i>", s)
    return s


def erro(msg, ln=None):
    print(f"❌ gerar-mapa-do-dono: {msg}" + (f" (linha {ln})" if ln else ""), file=sys.stderr)
    sys.exit(2)


def parse(md_text):
    L = md_text.split("\n")
    doc = {"titulo": None, "url": None, "fonte": None, "atualizado": None, "estado": "", "regras": [], "secoes": {}, "rodape": []}
    ordem = []
    sec = None
    for i, raw in enumerate(L, 1):
        l = raw.rstrip()
        if l.startswith("<!--") or (sec is None and l.startswith("     ")):
            continue
        if doc["titulo"] is None:
            m = re.match(r"^# MAPA DE PENDÊNCIAS\s*[—-]\s*(.+)$", l)
            if m:
                doc["titulo"] = m.group(1).strip(); continue
            if l.startswith("# "):
                erro("o título tem de ser `# MAPA DE PENDÊNCIAS — <Casa>`", i)
            continue
        if sec is None and l.startswith(">"):
            body = l.lstrip("> ").strip()
            m = re.search(r"(https://claude\.ai/code/artifact/[A-Za-z0-9-]+)", body)
            if "Sua página" in body or (m and doc["url"] is None):
                doc["url"] = m.group(1) if m else None
                f = re.search(r"Fonte:\s*`([^`]+)`", body); doc["fonte"] = f.group(1) if f else None
                continue
            m = re.match(r"\*\*Atualizado:\s*(\d{4}-\d{2}-\d{2})\s*\(([^)]*)\)\*\*\s*(.*)$", body)
            if m:
                doc["atualizado"] = (m.group(1), m.group(2)); doc["estado"] = m.group(3); continue
            doc["regras"].append(body); continue
        m = re.match(r"^# (🔒|📅|⚙️|📌)\s*(.*)$", l)
        if m:
            sec = m.group(1); doc["secoes"][sec] = {"titulo": m.group(2).strip(), "linhas": [], "ln": i}; ordem.append(sec); continue
        if sec is None:
            if l.startswith("# "):
                erro(f"seção desconhecida `{l[:40]}` — as 4 seções são # 🔒 · # 📅 · # ⚙️ · # 📌", i)
            continue
        if l.startswith("# "):
            erro(f"seção desconhecida `{l[:40]}`", i)
        if l.startswith("---"):
            continue
        doc["secoes"][sec]["linhas"].append((i, l))
    if doc["titulo"] is None: erro("faltou o título `# MAPA DE PENDÊNCIAS — <Casa>`")
    if not doc["url"]: erro("faltou a URL estável do Artifact no cabeçalho (`> **🌐 Sua página:** https://claude.ai/code/artifact/…`) — PADRAO-OURO §1")
    if not doc["atualizado"]: erro("faltou `> **Atualizado: AAAA-MM-DD (vN — motivo)** …` no cabeçalho")
    for s in ("🔒", "📅", "⚙️", "📌"):
        if s not in doc["secoes"]: erro(f"faltou a seção `# {s} …` (as 4 são obrigatórias, nesta ordem: 🔒 📅 ⚙️ 📌)")
    if ordem != ["🔒", "📅", "⚙️", "📌"]: erro(f"ordem das seções é {ordem}; a norma manda 🔒 📅 ⚙️ 📌")
    # rodapé = blockquotes ao fim da 📌
    lim = doc["secoes"]["📌"]["linhas"]
    while lim and (lim[-1][1].startswith(">") or not lim[-1][1].strip()):
        if lim[-1][1].startswith(">"): doc["rodape"].insert(0, lim[-1][1].lstrip("> ").strip())
        lim.pop()
    return doc


def itens_suas(linhas):
    """`## P1 · 🟥 Título` (ou Q5 · / M-NN · / `## 1. `) → cards. Corpo: parágrafos, passos `1.`, **Pronto quando:**, **Rec.:**, > avisos."""
    itens, cur, prosa = [], None, []
    for ln, l in linhas:
        m = re.match(r"^## (?:(P\d+|Q\d+|N\d+|M-?\d+|\d+)\s*[.·]\s*)?(🟥|🟧|🟡|🟨|🟢|🔴|✅)?\s*(.+)$", l)
        if m:
            cur = {"cod": m.group(1) or "", "sev": m.group(2) or "", "titulo": m.group(3).strip(), "paras": [], "passos": [], "pronto": None, "rec": None, "avisos": [], "ln": ln}
            itens.append(cur); continue
        if cur is None:
            if l.strip(): prosa.append(l)
            continue
        s = l.strip()
        if not s: continue
        mp = re.match(r"^(\d+)\.\s+(.*)$", s)
        if mp: cur["passos"].append(mp.group(2)); continue
        if s.lower().startswith("**pronto quando:**"): cur["pronto"] = s.split("**", 2)[2].strip(); continue
        if re.match(r"^\*\*rec\.?:?\*\*", s, re.I): cur["rec"] = re.sub(r"^\*\*rec\.?:?\*\*\s*", "", s, flags=re.I); continue
        if s.startswith(">"): cur["avisos"].append(s.lstrip("> ").strip()); continue
        cur["paras"].append(s)
    return prosa, itens


def tabela(linhas):
    rows = []
    for ln, l in linhas:
        if not l.startswith("|"): continue
        cells = [c.strip() for c in l.strip().strip("|").split("|")]
        if all(re.match(r"^:?-{3,}:?$", c) for c in cells if c): continue
        rows.append(cells)
    if rows and rows[0] and rows[0][0].lower() in ("código", "codigo", "#", "cod"):
        rows = rows[1:]
    return rows


def st_class(txt):
    for k, c in ST_CLASS:
        if k in txt: return c
    return "st-idle"


def render(doc, casa_kicker):
    S = doc["secoes"]
    prosa, itens = itens_suas(S["🔒"]["linhas"])
    data, ver = doc["atualizado"]
    dd = datetime.date.fromisoformat(data).strftime("%d/%m")
    out = [f"<title>Mapa do Dono — {html.escape(doc['titulo'])}</title>", '<meta name="viewport" content="width=device-width, initial-scale=1">', FONTS, f"<style>{CSS}</style>"]
    out.append('<header class="top">')
    out.append(f'  <div class="kicker">mapa de pendências · {html.escape(casa_kicker)}</div>')
    out.append(f"  <h1>{html.escape(doc['titulo'])}</h1>")
    if doc["estado"]: out.append(f'  <p class="lede">{inline(doc["estado"])}</p>')
    out.append(f'  <div class="updated"><span class="dot"></span> Atualizado {dd} · {html.escape(ver.split("—")[0].strip())} &nbsp;·&nbsp; 🔒 você faz &nbsp;·&nbsp; ⚙️ eu faço</div>')
    out.append("</header>")
    out.append('<main class="wrap">')
    # 🔒
    out.append(f'  <h2 class="sec">🔒 Suas <span class="n">{inline(S["🔒"]["titulo"].split("—", 1)[1].strip() if "—" in S["🔒"]["titulo"] else "")}</span></h2>')
    for p in prosa:
        out.append(f'  <p class="sec-note">{inline(p.lstrip("> ").strip())}</p>')
    if itens:
        out.append('  <div class="cards">')
        for it in itens:
            cls = SEV_CLASS.get(it["sev"], "")
            out.append(f'    <div class="card{(" " + cls) if cls else ""}">')
            num = ('<span class="num">' + html.escape(it["cod"]) + '</span>') if it["cod"] else ''
            sev = (it["sev"] + ' ') if it["sev"] else ''
            out.append('      <h3>' + num + sev + inline(it["titulo"]) + '</h3>')
            for p in it["paras"]: out.append(f"      <p>{inline(p)}</p>")
            if it["passos"]:
                out.append("      <ol>" + "".join(f"<li>{inline(p)}</li>" for p in it["passos"]) + "</ol>")
            for a in it["avisos"]: out.append(f'      <div class="warn{" red" if "⚠️" in a or "NÃO" in a else ""}">{inline(a)}</div>')
            if it["pronto"]: out.append(f'      <p class="ready"><b>Pronto quando:</b> {inline(it["pronto"])}</p>')
            if it["rec"]: out.append(f'      <p class="ready">Recomendo: {inline(it["rec"])}</p>')
            out.append("    </div>")
        out.append("  </div>")
    elif not prosa:
        out.append('  <p class="empty">Nenhuma — e o mapa não diz de qual rodada. (Defeito: escreva "🔒 SEUS: nenhum — medido na rodada de …".)</p>')
    # 📅
    out.append(f'  <h2 class="sec">📅 Próxima instância <span class="n">combinado, não é cobrança</span></h2>')
    rows = tabela(S["📅"]["linhas"])
    if rows:
        out.append('  <table class="mach">' + "".join(f"<tr><td>{inline(r[0])} — {inline(r[1]) if len(r) > 1 else ''}</td><td class=\"st-idle\">{inline(r[2]) if len(r) > 2 else ''}</td></tr>" for r in rows) + "</table>")
    else:
        out.append('  <p class="empty">nada combinado para a próxima instância.</p>')
    # ⚙️
    out.append(f'  <h2 class="sec">⚙️ Minhas <span class="n">só para você ver</span></h2>')
    rows = tabela(S["⚙️"]["linhas"])
    if rows:
        out.append('  <table class="mach">' + "".join(f"<tr><td>{inline(r[0])} — {inline(r[1]) if len(r) > 1 else ''}</td><td class=\"{st_class(r[2]) if len(r) > 2 else 'st-idle'}\">{inline(r[2]) if len(r) > 2 else ''}</td></tr>" for r in rows) + "</table>")
    else:
        out.append('  <p class="empty">nada rodando.</p>')
    # 📌
    out.append(f'  <h2 class="sec">📌 Limites declarados <span class="n">ficam para não sumirem, não para cobrar</span></h2>')
    bul = [l.strip()[2:] for ln, l in S["📌"]["linhas"] if l.strip().startswith("- ")]
    out.append('  <ul class="limits">' + "".join(f"<li>{inline(b)}</li>" for b in bul) + "</ul>" if bul else '  <p class="empty">nenhum limite declarado.</p>')
    out.append("  <footer>")
    for r in doc["rodape"]: out.append(f"    <p>{inline(r)}</p>")
    out.append(f'    <p>O que sempre vale é o arquivo <code>MAPA-DE-PENDENCIAS.md</code> no git; esta página é a foto, gerada por máquina (<code>gerar-mapa-do-dono.py</code>). Se abrir vazia, diga <span class="say-sm">"republica o meu mapa"</span>.</p>')
    out.append("  </footer>")
    out.append("</main>")
    return "\n".join(out) + "\n"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md", default="MAPA-DE-PENDENCIAS.md")
    ap.add_argument("--out", default=os.path.join("scratchpad", "mapa-pendencias.html"))
    ap.add_argument("--casa", default=None, help="rótulo pequeno no topo (padrão: nome da pasta do repo)")
    ap.add_argument("--check", action="store_true", help="regenera e compara com o arquivo existente; drift = exit 1")
    a = ap.parse_args()
    if not os.path.isfile(a.md): erro(f"não achei {a.md} — o mapa canônico é MAPA-DE-PENDENCIAS.md na raiz (PADRAO-OURO §6)")
    doc = parse(open(a.md, encoding="utf-8").read())
    # O rótulo vem do PRÓPRIO markdown (título) — nunca de argumento — para que `--check` na CI produza o mesmo byte.
    casa = doc["titulo"]
    novo = render(doc, casa)
    if a.check:
        atual = open(a.out, encoding="utf-8").read() if os.path.isfile(a.out) else ""
        if atual != novo:
            print(f"❌ gerar-mapa-do-dono --check: {a.out} está DEFASADO em relação a {a.md} — rode o gerador e republique (url= do cabeçalho).")
            return 1
        print(f"✅ gerar-mapa-do-dono --check: espelho em dia com {a.md}.")
        return 0
    os.makedirs(os.path.dirname(a.out) or ".", exist_ok=True)
    open(a.out, "w", encoding="utf-8").write(novo)
    n = len(itens_suas(doc["secoes"]["🔒"]["linhas"])[1])
    print(f"✅ {a.out} gerado ({len(novo)} B) — {n} item(ns) 🔒 · URL do Artifact: {doc['url']} · republicar com url= (C130).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
