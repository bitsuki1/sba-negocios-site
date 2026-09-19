#!/usr/bin/env python3
"""revisar-mapa.py — as LENTES DE REVISÃO do mapa do dono, rodadas ANTES de publicar.

POR QUE EXISTE (ordem do dono, 2026-09-09, verbatim):
    "Esse mapa nao esta em nosso padrão, eu nao quero saber de nada que nao seja pendencias,
     as minhas, didaticamente e as suas, apenas registradas … muita informaçoes inutil, fica
     confuso, LANCE LENTES DE REVISAO ANTES DE PUBLICAR OS MAPAS … p3, eu ja falei que vou
     apagar, pedi os links, vc fez os links no git, nao trouxe no mapa, RETRABALHO PRA MIM DE
     NOVO … o que foi feito nao me interessa … limites declarados nao podem servir para
     desistencia, se for pendencia, devemos resolver"

O gerador (`gerar-mapa-do-dono.py`) cobra a FORMA (as seções existem? na ordem?). Esta lente cobra
o CONTEÚDO: se o mapa está no padrão que o dono descreveu. Cada lente abaixo nasceu de um defeito
que ELE apontou, com a data. Nenhuma é opinião de estilo.

⚠️ PROCEDÊNCIA (D23 — valor preso num projeto é valor perdido). Este arquivo NÃO nasceu aqui: é
a lente da **SBA Negócios**, escrita por eles na madrugada de 09/09 quando receberam esta ordem,
e depositada no escritório com o pedido de propagar. O escritório acrescentou duas coisas e
nada mais:
  · a pista `💬 RESPOSTAS` (ordem que o dono deu ao ESCRITÓRIO no mesmo dia: *"as mensagens e
    respostas se perdem nas conversas, poderiam vir em uma seção separada do mapa… ficam até eu
    resolver, depois saem"*). Ela é conhecida pelo divisor de seções e **fica de fora da L2**,
    de propósito: em 🔒 e ⚙️ narrar obra feita é ruído, mas RESPONDER ao que ele perguntou é
    exatamente o que aquela pista existe para fazer.
  · a lente **L8**, que recusa a pista `📅 PRÓXIMA INSTÂNCIA` (*"nada para proxima instancia
    agora, traga tudo como pendencia de novo"*).

USO
    python3 scripts/revisar-mapa.py                  # revisa MAPA-DE-PENDENCIAS.md
    python3 scripts/revisar-mapa.py --md OUTRO.md
    python3 scripts/revisar-mapa.py --prova          # auto-teste por mutação (não lê o mapa real)
Sai 0 = passou · 1 = há defeito (a saída diz a linha e o conserto) · 2 = não achei o arquivo.
"""

import argparse
import os
import re
import subprocess
import sys

TETO_CABECALHO_PALAVRAS = 70  # v9 tinha ~430: era o "muita informação inútil"
MIN_LINKS_QUANDO_HA_LISTA = 3  # item que manda o dono agir sobre uma lista traz a lista aqui

# L2 — obra feita narrada no mapa. Verbos de entrega no passado.
OBRA_FEITA = re.compile(
    r"\b(foi (?:feito|medido|conferido|instalado|aplicad[oa]|corrigid[oa]|rodad[oa])|"
    # `conferi\b` com FRONTEIRA: sem ela, "a carta conferida na main" — que é contexto do que
    # FALTA, não obra narrada — acendia a lente. Lente que casa por substring mede a forma da
    # palavra, não o fato; é a mesma família que este arquivo inteiro persegue. (Medido 09/09
    # no mapa do próprio escritório: 1 defeito, 100% falso.)
    r"ficou pronto|entreguei|instalei|apliquei|conferi\b|medi ho[cj]e|"
    r"j[áa] (?:foi|est[áa]) (?:feito|pronto|instalado|conferido)|"
    r"rodou (?:e|,)|nesta rodada|na rodada de|moíd[oa]|mo[íi]do:)",
    re.I,
)

# Negação imediatamente antes do verbo: "nunca conferimos", "não foi medido", "sem ter rodado".
# Isso é declaração de PENDÊNCIA, o contrário de narrar obra feita — a lente L2 tem de deixar
# passar.
NEGADO = re.compile(
    r"\b(?:nunca|jamais|n[ãa]o|sem|nenhum[ao]?|ningu[ée]m|falta|faltou)\b[^.;]{0,40}$", re.I
)

# L4 — limite que na verdade é pendência (some com trabalho).
LIMITE_QUE_E_PENDENCIA = re.compile(
    r"\b(falta[m]?\b|precisa[m]?\b|n[ãa]o foi\b|a fazer\b|pendente\b|bloqueado\b|"
    r"sem coletor\b|sem rota\b|a construir\b|a definir\b|quando (?:houver|existir))",
    re.I,
)

# L4 — as 4 formas em que a palavra aparece SEM ser uma afirmação de pendência (reparo medido pela
# Potencial Urbano, 10/09: *"a causa é casar PALAVRA em vez de AFIRMAÇÃO"*). Ela mediu 4 falsos
# positivos na casa dela e mostrou o desenho brigando consigo mesmo: a doutrina manda **preservar o
# fóssil** (⚰️, nada se joga fora) e a lente acende para sempre em cima do fóssil preservado — e a
# saída fácil, apagar o fóssil, é justamente a que a doutrina proíbe.
L4_NAO_E_AFIRMACAO = (
    # (1) fóssil declarado ou texto tachado — é rastro, não estado
    re.compile(r"⚰️|~~[^~]+~~"),
    # (2) a palavra está DENTRO de aspas — é citação, não afirmação de quem escreve
    re.compile(r"[\"“”']\s*[^\"“”']*\b(falta|precisa|bloqueado|pendente)\b", re.I),
    # (3) enunciado UNIVERSAL — "todo X precisa de Y" é a REGRA, não um caso pendente
    re.compile(r"\b(todo|toda|todos|todas|nenhum|nenhuma)\b[^.]{0,60}?\b"
               r"(falta|precisa|bloqueado|pendente)\b", re.I),
    # (4) o próprio bullet narra o desfecho — acender nele é cobrar o que já foi feito
    re.compile(r"✅|\bRODOU\b|\bresolvid[oa]\b|\bj[áa] (chegou|veio|foi feito|entrou)\b|"
               r"\bdeixou de ser\b|\bera s[óo]\b", re.I),
    # (5) o bullet CONTRAPÕE — diz, na mesma linha, o que aquilo NÃO é. Quem explica uma leitura
    # ("é falta de dado, NÃO resultado ruim") não está abrindo item de trabalho; está impedindo
    # que se leia o número como defeito. Acender aí é o oposto do que a lente quer: empurra a casa
    # a apagar justamente a frase que protege o dono de concluir errado.
    # ⚰️ FALSO POSITIVO MEDIDO — `portfolio-comercial`, 14/09. A casa tem 1 resposta em 23
    # mensagens, e o mapa dizia *"É falta de dado, não resultado ruim"*. A lente leu a palavra
    # `falta` e cobrou pendência. Contornei NA CASA (reescrevi para "É ausência de amostra") e
    # isso estava errado como conserto: a régua ficaria de pé para a próxima casa que escrevesse
    # a frase certa em português. É o mesmo diagnóstico que a Potencial Urbano deu em 10/09 —
    # *"a causa é casar PALAVRA em vez de AFIRMAÇÃO"* — reincidindo numa 5ª forma.
    re.compile(r",\s*n[ãa]o\s+\S|\bn[ãa]o\s+(?:é|e|significa|quer dizer|representa|implica)\b",
               re.I),
)

# L6 — código interno na cara do dono. Ele não lê código: ou some, ou vem glosado na mesma linha.
CODIGO_INTERNO = re.compile(
    r"\b(?:D-?\d{2,3}|C-T-\d{1,4}|PM-\d{1,3}|PD-\d{1,3}|A-\d{2,4}|"
    r"E-?\d{2,3}|MR-\d{1,3}|C\d{2,3}|LD-\d{1,2})\b"
)
GLOSA = re.compile(
    r"[(—–,-]\s*[^)]*\b(regra|decis[ãa]o|achado|ordem|c[óo]digo|item|lei|padr[ãa]o|"
    r"norma|vacina|carta|nota)\b",
    re.I,
)

# ── L6 · supressão quando a CASA DECLARA o código como protocolo de resposta dela ────────────
# 17/09 — medido, depois de uma tentativa revertida. A lente acendia 74× no mapa da Keepee, que
# declara no cabeçalho: *"Responda citando o código curto; a âncora longa (`A2.4.2-C06`) é só o
# endereço na árvore"*. Ali o código NÃO é linguagem de máquina: é o nome que o dono digita para
# responder. Acender nas 74 ensina a ignorar a lente (é o A-714 — regra barulhenta vira ruído).
# A supressão exige as DUAS coisas, nunca uma só:
#   (C) a casa DECLARA o protocolo no cabeçalho, E o código aparece dentro da âncora INTEIRA
#       entre crases (`A2.4.2-C07`) — o endereço escrito por extenso, não o pedaço solto;
#   (B) …ou dentro da instrução de resposta entre aspas (me diga "C07: pode baixar").
# O que CONTINUA acendendo, medido na Keepee: fragmento solto (`C04`, "item C12 abaixo",
# "(A6-C01)") e código de OUTRA casa (D24, D106, D129, D216) — 23 de 74. Esses ele não lê mesmo.
DECLARA_CODIGO = re.compile(r"\bcit(?:e|ando|ar)\b[^.\n]{0,60}\bc[óo]digo\b", re.I)


def _ancora_longa(lin, cod):
    """O código está DENTRO de uma âncora maior entre crases (`A2.4.2-C07`)."""
    for m in re.finditer(r"`([^`]+)`", lin):
        t = m.group(1)
        if cod in t and len(t) > len(cod):
            return True
    return False


def _instrucao_de_resposta(lin, cod):
    """O código É a resposta que ele digita: me diga "C07: pode baixar"."""
    c = re.escape(cod)
    return bool(
        re.search(r'["\u201c\u201d]\s*' + c + r'\s*[:\uff1a]', lin)
        or re.search(r"\b(?:diga|responda|escreva|digite|me mande)\b[^.\n]{0,24}" + c, lin, re.I)
    )


def secoes(texto):
    """Divide o markdown nas seções `# 🔒`, `# ⚙️`, `# 📌`, guardando o número da linha."""
    out, atual = {}, None
    cab = []
    for i, lin in enumerate(texto.split("\n"), 1):
        m = re.match(r"^# (🔒|⚙️|📌|📅|💬)", lin)
        if m:
            atual = m.group(1)
            out[atual] = []
            continue
        if lin.strip() in GERADAS:
            continue  # texto do gerador, não conteúdo — ver a nota em GERADAS
        if atual is None:
            cab.append((i, lin))
        else:
            out[atual].append((i, lin))
    return cab, out


def itens_do_dono(linhas):
    """Cada `## P1 · … Título` com o corpo dele."""
    itens, cur = [], None
    for i, lin in linhas:
        if lin.startswith("## "):
            if cur:
                itens.append(cur)
            cur = {"ln": i, "titulo": lin[3:].strip(), "corpo": []}
        elif cur is not None:
            cur["corpo"].append((i, lin))
    if cur:
        itens.append(cur)
    return itens


# Linhas que o PRÓPRIO GERADOR escreve não são conteúdo do mapa — acusá-las é a lente medindo
# a si mesma. O placeholder de pista vazia ("_Nada aqui nesta rodada._") caiu na L2 por conter
# "nesta rodada"; foi o 2º falso-positivo da L2 no mesmo dia (o 1º casava "conferi" dentro de
# "conferida"). Lente que grita à toa é lente que alguém desliga.
GERADAS = ("_Nada aqui nesta rodada._",)


def _base_do_repo():
    """A URL de blob DESTE repositório, MEDIDA no `git remote` — nunca cravada.

    ⚠️ 14/09. A sugestão da L9 nascia com `bitsuki1/escritorio-do-mou` CRAVADO, e o item da fila
    mandava *"cada casa ajusta a URL do seu repositório"*. Ajuste à mão em arquivo que desce por
    propagação é ajuste que morre no próximo conserto: o propagador sobrescreve, a casa volta a
    sugerir o link do escritório, e a instância cola um endereço que abre a casa errada. Medir o
    remote resolve nos dois sentidos — desce igual para as 22 e sai certo em cada uma.
    """
    raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    try:
        u = subprocess.run(["git", "-C", raiz, "remote", "get-url", "origin"],
                           capture_output=True, text=True, timeout=5).stdout.strip()
    except Exception:
        u = ""
    m = re.search(r"github\.com[:/]([^/]+/[^/\s]+?)(?:\.git)?$", u)
    if not m:
        return ""            # sem remote legível: sugere o caminho sem inventar dono
    return "https://github.com/%s/blob/main/" % m.group(1)


def revisar(texto):
    """Devolve lista de (lente, linha, defeito, conserto). Vazia = passou."""
    achados = []
    cab, sec = secoes(texto)

    # ── L1 · cabeçalho enxuto ────────────────────────────────────────────────────────────────
    for i, lin in cab:
        if lin.startswith("> **Atualizado:"):
            palavras = len(re.sub(r"[*`>\[\]()]", " ", lin).split())
            if palavras > TETO_CABECALHO_PALAVRAS:
                achados.append(
                    (
                        "L1 cabeçalho",
                        i,
                        f"o cabeçalho tem {palavras} palavras (teto {TETO_CABECALHO_PALAVRAS})",
                        "diga a data, a versão e O QUE MUDOU em uma frase; o resto é história e "
                        "história não vai no mapa (ordem do dono 09/09)",
                    )
                )

    # ── L2 · obra feita ──────────────────────────────────────────────────────────────────────
    for s in ("🔒", "⚙️"):
        for i, lin in sec.get(s, []):
            if lin.strip().startswith(">") or not lin.strip():
                continue
            m = OBRA_FEITA.search(lin)
            if m and not NEGADO.search(lin[max(0, m.start() - 40) : m.start()]):
                achados.append(
                    (
                        f"L2 obra feita em {s}",
                        i,
                        f"narra entrega já concluída: “{m.group(0)}”",
                        "o mapa só lista o que FALTA. O que foi feito vive no git e no ledger "
                        "(“o que foi feito nao me interessa”, 09/09)",
                    )
                )

    # ── L3 · pedido sem o material dentro do mapa (o erro do P3) ─────────────────────────────
    for it in itens_do_dono(sec.get("🔒", [])):
        corpo = "\n".join(lin for _, lin in it["corpo"])
        # ⚠️ Reparo (b) medido pela Potencial Urbano (10/09): o gatilho aceitava `link` no SINGULAR,
        # então um item com UM gesto e UM link medido acendia a lente — e a L3 existe para o caso
        # oposto, o de mandar agir sobre VÁRIOS e deixar a lista fora do mapa. Agora o gatilho exige
        # PLURAL MEDIDO: `links`, `lista`, `um a um`, `cada um`. Citar a palavra no singular não é
        # mandar agir sobre uma lista — é a mesma doença de casar palavra em vez de afirmação.
        manda_agir_em_lista = re.search(
            r"\b(lista|links|um a um|uma por uma|link a link|cada (?:uma|um)|nominal)\b",
            corpo,
            re.I,
        )
        aponta_arquivo = re.search(r"`[^`]+\.(md|csv|tsv|txt)`", corpo)
        links = re.findall(r"https?://\S+", corpo)
        if manda_agir_em_lista and aponta_arquivo and len(links) < MIN_LINKS_QUANDO_HA_LISTA:
            achados.append(
                (
                    "L3 lista fora do mapa",
                    it["ln"],
                    f"o item “{it['titulo'][:48]}” manda agir sobre uma lista e só aponta para "
                    f"um arquivo do repositório ({len(links)} link(s) no corpo)",
                    "traga a lista DENTRO do mapa, um link por linha. Ele opera no celular: "
                    "abrir arquivo no git para achar link é retrabalho (reclamação de 09/09)",
                )
            )

    # ── L4 · limite que é pendência disfarçada ───────────────────────────────────────────────
    for i, lin in sec.get("📌", []):
        if not lin.strip().startswith("- "):
            continue
        m = LIMITE_QUE_E_PENDENCIA.search(lin)
        if m and not any(r.search(lin) for r in L4_NAO_E_AFIRMACAO):
            achados.append(
                (
                    "L4 limite é pendência",
                    i,
                    f"o “limite” diz “{m.group(0)}” — some com trabalho, logo é pendência",
                    "mova para 🔒 (se depende dele) ou ⚙️ (se é seu). Em 📌 só fica FATO DO "
                    "MUNDO (“limites declarados nao podem servir para desistencia”, 09/09)",
                )
            )

    # ── L5 · item do dono sem o que fazer ────────────────────────────────────────────────────
    for it in itens_do_dono(sec.get("🔒", [])):
        corpo = "\n".join(lin for _, lin in it["corpo"])
        if not re.search(r"^\s*\d+\.\s+\S", corpo, re.M):
            achados.append(
                (
                    "L5 sem o que fazer",
                    it["ln"],
                    f"o item “{it['titulo'][:48]}” não tem passo numerado",
                    "todo item dele termina em ação: 1. … 2. … O mapa dele é didático",
                )
            )

    # ── L6 · código interno sem glosa na cara do dono ────────────────────────────────────────
    _declara = any(DECLARA_CODIGO.search(l) for _, l in cab)
    for i, lin in sec.get("🔒", []):
        if lin.strip().startswith(">") or not lin.strip():
            continue
        for cod in CODIGO_INTERNO.findall(lin):
            trecho = lin[max(0, lin.find(cod) - 90) : lin.find(cod) + 90]
            if _declara and (_ancora_longa(lin, cod) or _instrucao_de_resposta(lin, cod)):
                continue
            if not GLOSA.search(trecho):
                achados.append(
                    (
                        "L6 código sem glosa",
                        i,
                        f"código interno “{cod}” sem explicação ao lado",
                        "escreva o que o código quer dizer na mesma frase, ou tire. "
                        "Ele não lê código interno (D159 — linguagem de gente)",
                    )
                )
                break

    # ── L7 · pendência que não é de ninguém ──────────────────────────────────────────────────
    if "⚙️" in sec:
        for i, lin in sec["⚙️"]:
            if not lin.strip().startswith("|"):
                continue
            cels = [c.strip() for c in lin.strip().strip("|").split("|")]
            if len(cels) < 2 or set(cels[0]) <= set("-: ") or cels[0].lower() in ("o quê", "o que"):
                continue
            if len(cels) > 1 and cels[1].lower() in ("", "—", "-", "?"):
                achados.append(
                    (
                        "L7 sem estado",
                        i,
                        f"item “{cels[0][:44]}” sem estado",
                        "diga em que pé está: rodando · na fila · à espera de X",
                    )
                )
    # ── L8 · a pista 📅 deixou de existir (ordem do dono 09/09) ──────────────────────────────
    # "nada para proxima instancia agora, traga tudo como pendencia de novo". Item adiado para
    # uma instância que ninguém sabe quando abre é esquecimento com data marcada: ou é dele (🔒)
    # ou é meu (⚙️). Esta lente é do escritório; o resto do arquivo é da SBA.
    if "📅" in sec:
        ln = min([i for i, _ in sec["📅"]], default=1)
        achados.append(
            (
                "L8 pista aposentada",
                ln,
                "o mapa ainda tem a pista `📅 PRÓXIMA INSTÂNCIA`",
                "mova cada item para 🔒 (se depende dele) ou ⚙️ (se é seu) e apague a "
                "pista — “nada para proxima instancia agora, traga tudo como pendencia "
                "de novo” (09/09)",
            )
        )

    # ── L9 · arquivo citado pelo NOME, sem link que abra — COLHEITA DA SBA (carta de 10/09) ───────
    # Ordem do dono, 2026-09-09, verbatim: *"me traga aqui o script ou no mapa de pendencias
    # inteiros ou o link direto, nunca assim no nome, pois quando pesquiso nao acho"*. Caminho em
    # crase é endereço para quem tem o repositório aberto; para ele, no celular, é texto morto —
    # copia, procura, não acha. A SBA escreveu esta lente primeiro, mediu na casa dela e me mandou
    # por carta com a sugestão de virar molde do kit. Adotada aqui (classe A: é o meu instrumento);
    # descer às 22 é classe B e foi para a fila datada.
    # ⚠️ COLISÃO DE NUMERAÇÃO, declarada: lá esta lente é a **L8** e a minha (pista 📅) é a **L9**;
    # aqui é o contrário, porque a minha nasceu antes nesta casa e já está citada em achado. Os dois
    # números existem e a conciliação está escrita nos dois lados — não "consertar" renumerando.
    CAMINHO = re.compile(r"`([A-Za-z0-9_./-]+\.(?:py|sh|md|csv|tsv|yml|yaml|json|xlsx|txt|mjs))`")
    for s in ("🔒", "🧊", "💬"):
        for i, l in sec.get(s, []):
            for m in CAMINHO.finditer(l):
                alvo = m.group(1)
                if ("[`%s`](" % alvo) in l or ("](%s" % alvo) in l:
                    continue            # já é rótulo de link: vale
                achados.append(
                    ("L9 arquivo sem link em %s" % s, i,
                     "cita “%s” pelo nome, sem link que abra" % alvo,
                     "troque por link: %s%s — nome de arquivo ele copia, procura e não "
                     "acha (ordem dele, 09/09)" % (_base_do_repo(), alvo)))
    return achados


def _n_lentes():
    """Quantas lentes existem, MEDIDO no próprio arquivo. ⚠️ até 11/09 o número vivia CRAVADO em
    3 lugares e eu acabei de acrescentar a 8ª (a do link, colheita da SBA) — a frase diria "7 lentes"
    para sempre, que é o instrumento mentindo sobre si mesmo. Conta os cabeçalhos `# ── L<n> ·`."""
    try:
        corpo = open(os.path.abspath(__file__), encoding="utf-8").read()
    except Exception:
        return 0
    return len({m for m in re.findall(r"#\s+──\s+(L\d+)\s+·", corpo)})


def _declarando(mapa):
    """Devolve o mapa com a DECLARAÇÃO do protocolo de resposta no cabeçalho (o que a Keepee tem)."""
    return mapa.replace(
        "> **Atualizado:",
        "> Responda citando o código curto; a âncora longa é só o endereço.\n> **Atualizado:",
        1,
    )


def prova():
    """Auto-teste por mutação: cada lente acende no caso que a criou, e fica quieta no caso bom."""
    bom = """# MAPA DE PENDÊNCIAS — Casa
> **🌐 Sua página:** https://claude.ai/code/artifact/x
> **Atualizado: 2026-09-09 (v1 — três pendências suas, duas minhas)** Nada mais mudou.

# 🔒 SUAS — 1

## P1 · 🟧 Apagar as branches
> As três, uma por linha:
> - https://github.com/x/y/branches/all?query=a
> - https://github.com/x/y/branches/all?query=b
> - https://github.com/x/y/branches/all?query=c
1. Clicar em cada link e usar a lixeira.
2. Me dizer "P1 apaguei".

# ⚙️ MINHAS — 1

| o quê | estado |
|---|---|
| Recalcular as âncoras | rodando no runner |

# 📌 FATOS DO MUNDO

- O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.
"""
    casos = [
        ("bom", bom, None),
        (
            "L1 cabeçalho",
            bom.replace("Nada mais mudou.", "Nada mais mudou. " + "história antiga " * 40),
            "L1",
        ),
        (
            "L2 obra feita",
            bom.replace(
                "| Recalcular as âncoras | rodando no runner |",
                "| A rede foi conferida nesta rodada | feito |",
            ),
            "L2",
        ),
        (
            "L3 lista fora",
            bom.replace(
                "> As três, uma por linha:\n> - https://github.com/x/y/branches/all?query=a\n"
                "> - https://github.com/x/y/branches/all?query=b\n> - https://github.com/x/y/branches/all?query=c",
                "> A lista, uma por uma, está em `docs/governanca/P3-BRANCHES.md`.",
            ),
            "L3",
        ),
        (
            "L4 limite",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "Faltam 8 UFs sem coletor — bloqueado.",
            ),
            "L4",
        ),
        (
            "L5 sem passo",
            bom.replace('1. Clicar em cada link e usar a lixeira.\n2. Me dizer "P1 apaguei".', ""),
            "L5",
        ),
        # ── Reparos medidos pela Potencial Urbano (10/09): a lente casava PALAVRA, não AFIRMAÇÃO ──
        # Os 4 casos abaixo são os 4 falsos positivos que ela mediu na casa dela, um a um.
        (
            "L4 · fóssil ⚰️ preservado NÃO é pendência (a doutrina manda preservá-lo)",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "⚰️ a frase que estava aqui — “quem falta é o CDC” — caiu: o corpo chegou.",
            ),
            None,
        ),
        (
            "L4 · a palavra DENTRO DE ASPAS é citação, não afirmação de quem escreve",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "o “bloqueado” era só desta conversa, e deixou de ser.",
            ),
            None,
        ),
        (
            "L4 · enunciado UNIVERSAL é a REGRA, não um caso pendente",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "todo “não dá” precisa de uma frente com passos — é a régua desta pista.",
            ),
            None,
        ),
        (
            "L4 · bullet que narra o desfecho não é cobrança do que já foi feito",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "o texto precisa de OCR para ser lido — e RODOU, nesta rodada.",
            ),
            None,
        ),
        (
            # A-687 (14/09, falso positivo medido no `portfolio-comercial`): a casa tinha 1 resposta
            # em 23 mensagens e o mapa dizia *"É falta de dado, não resultado ruim"* — a frase que
            # impede o dono de ler o número como defeito. A lente cobrou pendência por causa da
            # palavra `falta`. Quem CONTRAPÕE ("X, não Y") está explicando uma leitura, não abrindo
            # item de trabalho; acender aí empurra a casa a apagar a proteção.
            "L4 · bullet que CONTRAPÕE ('é falta de dado, NÃO resultado ruim') é leitura, não item",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "1 resposta em 23 mensagens: é falta de amostra, não resultado ruim.",
            ),
            None,
        ),
        (
            "L4 · MUTAÇÃO: a MESMA palavra SEM a contraposição volta a acender",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "1 resposta em 23 mensagens: falta amostra para concluir.",
            ),
            "L4",
        ),
        (
            "L4 · MUTAÇÃO: a pendência CRUA, sem fóssil nem aspas nem universal, SEGUE acendendo",
            bom.replace(
                "O cofre é magnitude modelada, nunca reconciliada com dinheiro recebido.",
                "Faltam 8 UFs sem coletor.",
            ),
            "L4",
        ),
        (
            "L3 · UM link medido com a palavra no singular NÃO acende (reparo (b) da PU)",
            bom.replace(
                "> As três, uma por linha:\n> - https://github.com/x/y/branches/all?query=a\n"
                "> - https://github.com/x/y/branches/all?query=b\n"
                "> - https://github.com/x/y/branches/all?query=c",
                # ⚠️ 11/09: este fixtura citava `docs/governanca/P3-BRANCHES.md` em crase solta e,
                # com a L9 nova (arquivo sem link), passou a acender DUAS lentes — o caso reprovava
                # por medir o que não era o seu assunto. A citação virou link, que é justamente o
                # que a L9 exige: a fixtura passou a obedecer o padrão que o instrumento cobra.
                "> O link está aqui: https://github.com/x/y/branches/all?query=a — e o "
                "detalhe em [`docs/governanca/P3-BRANCHES.md`]"
                "(https://github.com/x/y/blob/main/docs/governanca/P3-BRANCHES.md).",
            ),
            None,
        ),
        (
            "L6 código",
            bom.replace("## P1 · 🟧 Apagar as branches", "## P1 · 🟧 Apagar as branches (PM-121)"),
            "L6",
        ),
        # L6 · os 3 casos da supressão de 17/09 — a régua do A-761: todo filtro novo roda nos DOIS
        # sentidos antes de entrar (o que ele deixa passar E o que ele para de ver).
        (
            "L6 · casa que DECLARA o código + âncora INTEIRA não acende",
            _declarando(bom).replace(
                "## P1 · 🟧 Apagar as branches",
                "## P1 · 🟧 Apagar as branches — endereço na árvore: `A2.4.2-C07`",
            ),
            None,
        ),
        (
            "L6 · MUTAÇÃO: a MESMA âncora SEM a declaração no cabeçalho volta a acender",
            bom.replace(
                "## P1 · 🟧 Apagar as branches",
                "## P1 · 🟧 Apagar as branches — endereço na árvore: `A2.4.2-C07`",
            ),
            "L6",
        ),
        (
            "L6 · MUTAÇÃO: o FRAGMENTO solto (`C07`) acende mesmo com a declaração",
            _declarando(bom).replace(
                "## P1 · 🟧 Apagar as branches",
                "## P1 · 🟧 Apagar as branches — veja o `C07`",
            ),
            "L6",
        ),
        (
            "L7 sem estado",
            bom.replace(
                "| Recalcular as âncoras | rodando no runner |", "| Recalcular as âncoras | — |"
            ),
            "L7",
        ),
        # Negação não é obra feita: "nunca conferimos" declara pendência. A lente tem de ficar
        # quieta.
        (
            "negação não acende",
            bom.replace(
                "## P1 · 🟧 Apagar as branches",
                "## P1 · 🟧 O cofre nunca foi conferido contra dinheiro real",
            ),
            None,
        ),
        # L8 (escritório): a pista 📅 deixou de existir. Lente sem caso é promessa.
        ("L8 pista 📅", bom + "\n# 📅 PRÓXIMA INSTÂNCIA\n\n| a | b | c |\n", "L8"),
        # E a pista 💬 é LEGÍTIMA: nela, narrar o que foi feito é a função. Se a L2 mordesse aqui,
        # a ordem "as respostas ficam até eu resolver" seria impossível de cumprir.
        (
            "💬 pode narrar obra feita sem acender a L2",
            bom + "\n# 💬 RESPOSTAS ÀS SUAS PERGUNTAS\n\nO conserto foi aplicado e a rede foi "
            "conferida nesta rodada.\n",
            None,
        ),
    ]
    falhou = 0
    for nome, texto, espera in casos:
        ach = revisar(texto)
        lentes = {a[0].split()[0] for a in ach}
        if espera is None:
            ok = not ach
            detalhe = "" if ok else f" (acendeu à toa: {sorted(lentes)})"
        else:
            ok = espera in lentes
            detalhe = "" if ok else f" (acendeu {sorted(lentes) or 'nada'})"
        print(f"  {'✅' if ok else '🟥'} {nome}{detalhe}")
        falhou += 0 if ok else 1
    veredito = (
        ("🟩 as %d lentes provadas por mutação" % _n_lentes()) if not falhou else f"🟥 {falhou} caso(s) falharam"
    )
    print(f"\n{veredito}")
    return 0 if not falhou else 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--md", default="MAPA-DE-PENDENCIAS.md")
    ap.add_argument(
        "--prova", action="store_true", help="auto-teste por mutação (não lê o mapa real)"
    )
    a = ap.parse_args()
    if a.prova:
        sys.exit(prova())
    if not os.path.isfile(a.md):
        print(f"não achei {a.md}", file=sys.stderr)
        sys.exit(2)
    ach = revisar(open(a.md, encoding="utf-8").read())
    if not ach:
        print("🟩 lentes de revisão: %s está no padrão do dono (%d lentes, 0 defeito)"
              % (a.md, _n_lentes()))
        sys.exit(0)
    print(f"🟥 lentes de revisão: {len(ach)} defeito(s) em {a.md} — NÃO publique assim\n")
    for lente, ln, defeito, conserto in ach:
        print(f"  [{lente}] linha {ln}")
        print(f"      defeito : {defeito}")
        print(f"      conserto: {conserto}\n")
    sys.exit(1)


if __name__ == "__main__":
    main()
