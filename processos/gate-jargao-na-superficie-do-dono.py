#!/usr/bin/env python3
"""GATE DO JARGÃO NA SUPERFÍCIE DO DONO — D159, o dente que a A-772 mediu e ninguém tinha escrito

## A ordem dele, e o buraco

No GO de 17/09 o dono pediu, verbatim:

> *"faça uma varredura a lugares com linguagem de maquina e termos especificos do projeto,
> **isso atrapalha os entendimentos dos humanos**"*

A A-772 foi procurar a "varredura de jargão" que o próprio `CLAUDE.md` do escritório menciona de
passagem — e **ela não existia**: zero arquivo, zero check, zero ocorrência em `.sh`/`.py`/`.yml`.
A constituição, lida em todo boot, ensinava que o mecanismo existia (é o A-622, na pior superfície).
Este arquivo é o dente. O item de alçada é o **B12**.

## A RÉGUA — e ela NÃO é "o termo existe?"

A D159 não proíbe a palavra; ela manda **glosar**:

> *"Código interno (M-78, DE-50, RLS…) só como etiqueta pequena e **sempre glosada**."*

Então o teste é **"está glosado?"**. `merge` sozinho na frase dele é achado; *"juntada (merge)"* não é
— e foi exatamente assim que o escritório levou o próprio mapa de 9 para 0 em 17/09, por GLOSA e não
por apagamento. Quem quiser ver a diferença: `git show` do commit daquele dia.

## O que a régua NÃO conta (calibrado contra linha real, antes de virar número)

A primeira passada da A-772 devolveu **247** e estava inflada. Saíram três classes que não são fala:

  (a) **URL** — `…/settings/secrets/…` é endereço, não frase;
  (b) **trecho entre crases** — é código CITADO, não prosa ao dono;
  (c) **nome de BOTÃO/RÓTULO de tela** — a tela chama assim, e a D159 manda **glosar**, não traduzir
      o que ele vai procurar com os olhos. A A-772 media só a forma em negrito (`**Create Token**`);
      ao rodar este dente contra o mapa REAL do escritório apareceram outras duas formas, e as duas
      são a mesma coisa: o rótulo **entre aspas** (`Não marque "Require a pull request"` — é o texto
      literal da tela do GitHub) e **`o botão Merge`** (a palavra `botão`/`campo`/`clique em` antes do
      termo). Calibrar contra a linha real, outra vez: a régua de 17/09 teria condenado três linhas
      que estão CERTAS.

E aqui entram duas isenções mais, medidas na construção deste dente:

  (d) **A ISENÇÃO DO `[carta-anexa]`** — a linha que **nomeia** o termo para dizer que ele tem de
      sumir é legítima. O `pu-consulta-plataforma` tem um item que é uma *"faxina de linguagem"*
      escrita em `RLS`/`schema`; condenar essa linha seria mandar apagar a descrição do defeito, que
      é o oposto de zero-perda (D24). Reconhece-se por vocabulário fechado: `glosa`/`glosar`,
      `jargão`, `linguagem de máquina`, `faxina de linguagem`, `D159`, ou o carimbo `[jargão-citado]`.
  (e) **⚰️ LÁPIDE** — linha que cita o termo para contar que ele estava ali. Mesma lógica do
      `gate-carta-anexa-nao-aponta.py`.

  (g) **comentário de HTML** (`<!-- … -->`) — não é renderizado; ele nunca vê. É a nota interna da
      ficha, o mesmo papel do handoff, e a D159 é regra de SUPERFÍCIE, não de substrato.

  (f) **`repositório` NÃO está no vocabulário** — é a palavra portuguesa. Medido em 26/09: são 163
      ocorrências nas 40 superfícies, e nenhuma é jargão. Contá-las era o `V-CONTADOR-QUE-SOBE-QUANDO-
      SE-TRABALHA`: inflar o placar com a tradução certa.

## O FURO, dito em voz alta (a régua do A-622)

A isenção (d) é **falsificável**: bastaria escrever "glosa" numa linha qualquer para calar o dente.
Não há mecanismo que leia intenção, e não vou fingir que há. O que segura é o mesmo que segura o
`Pede ato?` do molde de carta: a superfície é versionada, e o `git log` mostra quem escreveu.
E o vocabulário **cresce por medição, nunca de cabeça** — cada termo entra com a sua glosa em
português ao lado, senão o dente acusa sem dizer o que escrever no lugar.

## Fronteira (D104 · a parte (c) do B12)

Aqui dentro, o gate **cobra**: a superfície do escritório fica em zero. Nas casas ele **mede e
entrega a lista** (`--casas`) — glosar o texto do mapa de uma casa é gesto DELA, sob o gate dela
(D21). Escrever por cima seria o erro de 25/08: executar a instância em nome da classe.

    python3 processos/gate-jargao-na-superficie-do-dono.py             # mede esta casa (o escritório)
    python3 processos/gate-jargao-na-superficie-do-dono.py --casas     # mede as casas montadas ao lado
    python3 processos/gate-jargao-na-superficie-do-dono.py --relatorio # escreve a lista por casa
    python3 processos/gate-jargao-na-superficie-do-dono.py --prova     # bateria por mutação
"""
import os
import re
import sys

def _raiz():
    """A raiz é onde está o `.git`, não "um nível acima deste arquivo".

    ⚠️ 2026-09-27, ao descer este gate ao kit (B12(b)): a versão do escritório supunha
    `dirname(dirname(__file__))` — verdade aqui, porque ele mora em `processos/`. Numa casa que
    guarde processo em `scripts/` funciona igual; numa casa que o ponha na RAIZ, a conta subia um
    nível a MAIS e o gate mediria o diretório que contém o repositório. Gate que erra a raiz não
    acusa nada e sai verde — o pior estado possível (A-855).
    """
    d = os.path.dirname(os.path.abspath(__file__))
    while True:
        if os.path.isdir(os.path.join(d, ".git")) or os.path.isfile(os.path.join(d, ".git")):
            return d
        pai = os.path.dirname(d)
        if pai == d:                      # cheguei em `/` sem achar `.git`
            return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        d = pai


RAIZ = _raiz()
VIZINHAS = os.path.dirname(RAIZ)


def pasta_de_convencao():
    """Onde ESTA casa guarda processo: `processos/` no escritório, `scripts/` na maioria das casas,
    a raiz quando nenhuma existe. O caminho estava fixo em `processos/` e, numa casa sem essa
    pasta, o relatório simplesmente não nascia (A-855)."""
    for d in ("processos", "scripts", "tools"):
        if os.path.isdir(os.path.join(RAIZ, d)):
            return d
    return ""


EU = os.path.relpath(os.path.abspath(__file__), RAIZ)   # como me chamar nesta casa

# As DUAS superfícies que ele efetivamente abre (A-772 mediu nestas, nas 24 casas).
SUPERFICIES = ("MAPA-DE-PENDENCIAS.md", "TAREFAS-DO-DONO.md")

# VOCABULÁRIO — termo → a glosa em português que o dente SUGERE. Entra por medição, com a glosa ao
# lado; sem glosa, o termo não entra (acusar sem dizer o que escrever é o que faz a casa apagar).
# As 4 primeiras são as que o próprio escritório glosou em 17/09, e servem de precedente.
VOCABULARIO = {
    "force-push": "apague e reescreva o passado",
    "force push": "apague e reescreva o passado",
    "merge": "juntada — o botão verde do GitHub que junta na versão principal",
    "commit": "o trabalho salvo (cada gravação no histórico)",
    "branch": "ramo de trabalho",
    "rebase": "reempilhar o trabalho sobre outra base",
    "rollback": "voltar à versão anterior",
    "deploy": "publicação (o que vai ao ar)",
    "build": "montagem do site/app",
    "staging": "ambiente de ensaio (antes do ar)",
    "migration": "mudança na estrutura do banco",
    "schema": "a estrutura das tabelas do banco",
    "RLS": "a trava do banco que decide quem vê cada linha",
    "endpoint": "endereço de consulta do sistema",
    "webhook": "aviso automático que um sistema manda a outro",
    "cron": "horário fixo em que o robô roda",
    "kanban": "quadro de cartões (a fazer · fazendo · feito)",
    "sprint": "ciclo de trabalho",
    "hotfix": "correção de urgência",
    "worktree": "cópia de trabalho do repositório",
    "pull request": "pedido de juntada",
    "dashboard": "painel",
}
# Uma palavra pode aparecer dentro de outra (`merge` em `mergeable`); a fronteira é de PALAVRA.
_RX = {t: re.compile(r"(?<![\w-])" + re.escape(t) + r"(?![\w-])",
                     0 if t.isupper() else re.I) for t in VOCABULARIO}

CRASE = re.compile(r"`[^`]*`")
URL = re.compile(r"https?://\S+|\S+\.(?:com|com\.br|br|org|app|dev|io|lovable\.app)\b\S*")
# (c) as TRÊS formas de rótulo de tela — negrito, entre aspas, e anunciado por "botão/campo/clique"
BOTAO = re.compile(r"\*\*[A-Z][A-Za-z ]{2,30}\*\*"                    # **Create Token**
                   r'|"[^"\n]{2,60}"'                                  # "Require a pull request"
                   r"|“[^”\n]{2,60}”"                                  # aspas curvas
                   r"|(?:bot[ãa]o|campo|caixa|menu|aba|marque|clique em|aperta?r?\s+o)\s+"
                   r"(?:verde\s+|o\s+)?\*{0,2}[A-Za-z][\w -]{1,24}\*{0,2}")
# a linha FALA sobre o jargão (isenção (d)) — vocabulário fechado, como o ⚰️ do `[carta-anexa]`
FALA_DO_JARGAO = re.compile(r"glosa|glosar|glosad|jargão|jargao|linguagem de m[áa]quina|"
                            r"faxina de linguagem|\bD159\b|\[jarg[ãa]o-citado\]|termo de m[áa]quina",
                            re.I)
LAPIDE = "⚰️"
# (g) nota interna da ficha: não é renderizada, ele nunca lê — substrato, não superfície (D159)
COMENTARIO = re.compile(r"<!--.*?-->", re.S)


def limpa(linha):
    """Tira o que a régua NÃO conta: crase, URL e nome de botão (A-772, classes a-c)."""
    return BOTAO.sub(" ", URL.sub(" ", CRASE.sub(" ", COMENTARIO.sub(" ", linha))))


def glosado(linha, termo):
    """A D159 aceita o termo UMA vez, glosado. Reconhece as duas formas que o escritório usa:
    `juntada (merge)` — o termo entre parênteses depois do português; e
    `merge (juntada — o botão…)` — o português entre parênteses depois do termo."""
    t = re.escape(termo)
    if re.search(r"\([^()]{0,40}\*?" + t + r"\*?[^()]{0,40}\)", linha, re.I):
        return True                      # termo DENTRO de parênteses = etiqueta pequena
    if re.search(t + r"\*?\s*\([^()]{6,120}\)", linha, re.I):
        return True                      # termo seguido de explicação entre parênteses
    return False


def julga_linha(linha):
    """Devolve [(termo, glosa sugerida)] do que está CRU nesta linha. Lista vazia = linha limpa."""
    if LAPIDE in linha or FALA_DO_JARGAO.search(linha):
        return []                        # isenções (d) e (e): a linha fala SOBRE o termo
    seca = limpa(linha)
    fora = []
    for termo, glosa in VOCABULARIO.items():
        if not _RX[termo].search(seca):
            continue
        if glosado(seca, termo):
            continue                     # D159: etiqueta pequena e glosada — passa
        fora.append((termo, glosa))
    # `force push` e `force-push` são a mesma dor; não contar duas vezes a mesma linha
    vistos, unico = set(), []
    for termo, glosa in fora:
        chave = termo.replace(" ", "-")
        if chave in vistos:
            continue
        vistos.add(chave)
        unico.append((termo, glosa))
    return unico


def mede(raiz, superficies=SUPERFICIES):
    """[(arquivo relativo, nº da linha, termo, glosa)] de cada termo cru."""
    fora = []
    for rel in superficies:
        p = os.path.join(raiz, rel)
        if not os.path.isfile(p):
            continue
        for i, linha in enumerate(open(p, encoding="utf-8", errors="replace"), 1):
            for termo, glosa in julga_linha(linha):
                fora.append((rel, i, termo, glosa))
    return fora


def casas():
    """As casas montadas ao lado (o escritório sai: ele é medido pelo modo normal)."""
    if not os.path.isdir(VIZINHAS):
        return []
    eu = os.path.basename(RAIZ)
    fora = []
    for d in sorted(os.listdir(VIZINHAS)):
        if d == eu:
            continue
        p = os.path.join(VIZINHAS, d)
        if not os.path.isdir(p):
            continue
        if any(os.path.isfile(os.path.join(p, s)) for s in SUPERFICIES):
            fora.append(d)
    return fora


def modo_casas():
    linhas = casas()
    if not linhas:
        print("🟩 [jargão-casas] nenhuma casa montada ao lado com superfície do dono — nada a medir")
        return 0
    total, comdivida = 0, []
    for casa in linhas:
        r = mede(os.path.join(VIZINHAS, casa))
        total += len(r)
        if r:
            comdivida.append((casa, r))
    comdivida.sort(key=lambda x: -len(x[1]))
    print("MEDIÇÃO DO JARGÃO NAS SUPERFÍCIES DO DONO — %d casa(s) montada(s), %d termo(s) cru(s)"
          % (len(linhas), total))
    print("(a glosa é gesto DA casa, sob o gate dela — D21/D104; aqui só a lista)\n")
    for casa, r in comdivida:
        porarq = {}
        for rel, i, termo, _ in r:
            porarq.setdefault(rel, []).append((i, termo))
        print("• %-42s %3d" % (casa, len(r)))
        for rel, itens in sorted(porarq.items()):
            amostra = ", ".join("%s:%d" % (t, i) for i, t in itens[:6])
            print("    %s (%d) — %s%s" % (rel, len(itens), amostra,
                                          " …" if len(itens) > 6 else ""))
    print("\nGLOSA SUGERIDA por termo (o que escrever no lugar):")
    usados = sorted({t for _, r in comdivida for (_, _, t, _) in r})
    for t in usados:
        print("   %-13s → %s" % (t, VOCABULARIO[t]))
    return 0


RELATORIO = os.path.join(RAIZ, pasta_de_convencao(), "JARGAO-NAS-SUPERFICIES-DO-DONO.md")


def modo_relatorio():
    """Escreve a lista POR CASA — é o que se entrega. Número colado ao comando, nunca de memória."""
    import datetime
    linhas = casas()
    dados = [(c, mede(os.path.join(VIZINHAS, c))) for c in linhas]
    dados = [(c, r) for c, r in dados if r]
    dados.sort(key=lambda x: -len(x[1]))
    total = sum(len(r) for _, r in dados)
    hoje = datetime.date.today().isoformat()
    fora = ["# Jargão nas superfícies que o dono lê — lista MEDIDA por casa",
            f"> Gerado por `python3 {EU} --relatorio` em "
            f"**{hoje}**. **Não editar à mão** — o número aqui é medição, não memória.",
            "> **A glosa é gesto DA casa** (D21/D104): o escritório mede e entrega a régua; quem passa "
            "a caneta no texto do próprio mapa é a casa. O escritório já fez a dele (A-772/B12).",
            "",
            f"**{total} termo(s) cru(s)** em **{len(dados)}** casa(s), de {len(linhas)} montada(s) "
            f"com superfície do dono. Régua: D159 — o termo pode ficar UMA vez, **glosado**.", ""]
    for casa, r in dados:
        fora.append(f"## {casa} — {len(r)}")
        por = {}
        for rel, i, termo, glosa in r:
            por.setdefault(rel, []).append((i, termo, glosa))
        for rel, itens in sorted(por.items()):
            fora.append(f"- `{rel}` ({len(itens)}): " +
                        " · ".join(f"linha {i} `{t}`" for i, t, _ in itens))
        fora.append("")
    fora += ["## Glosa sugerida — o que escrever no lugar", "", "| termo | em português |", "|---|---|"]
    usados = sorted({t for _, r in dados for (_, _, t, _) in r})
    for t in usados:
        fora.append(f"| `{t}` | {VOCABULARIO[t]} |")
    fora += ["", "_As três formas que o gate NÃO conta (calibradas contra linha real): rótulo de tela "
             "(negrito, entre aspas ou anunciado por \"botão\"), trecho entre crases, URL, comentário "
             "de HTML, lápide ⚰️ e a linha que fala do próprio jargão para condená-lo._"]
    open(RELATORIO, "w", encoding="utf-8").write("\n".join(fora) + "\n")
    print(f"✅ {os.path.relpath(RELATORIO, RAIZ)}: {total} termo(s) em {len(dados)} casa(s)")
    return 0


def prova():
    ok = True

    def caso(rot, cond):
        nonlocal ok
        print("%s %s" % ("✅" if cond else "🟥", rot))
        ok &= bool(cond)

    termos = lambda l: [t for t, _ in julga_linha(l)]

    caso("MUTAÇÃO: termo CRU na frase dele acende",
         "merge" in termos("- o trabalho está lá, esperando o seu merge"))
    caso("GLOSADO na forma que o escritório usa (termo entre parênteses) passa",
         termos("- esperando o seu aceite (o botão verde *merge* do GitHub)") == [])
    caso("GLOSADO na outra forma (termo + explicação entre parênteses) passa",
         termos("- falta o merge (a juntada na versão principal, botão verde)") == [])
    caso("MUTAÇÃO: trecho entre CRASES não conta (código citado, classe b)",
         termos("- rode `git merge --ff-only` e pronto") == [])
    caso("MUTAÇÃO: URL não conta (classe a)",
         termos("- abra https://vercel.com/deploy/settings e confira") == [])
    caso("MUTAÇÃO: nome de BOTÃO em negrito não conta (classe c)",
         termos("- clique em **Create Token** na tela") == [])
    caso("classe c ampliada: RÓTULO ENTRE ASPAS é o texto da tela, não fala minha",
         termos('- **Não** marque "Require a pull request" — quebra a publicação') == [])
    caso("classe c ampliada: `o botão Merge` é o nome do botão dele",
         termos("- você apertou o botão Merge em 14 casas") == [])
    caso("MUTAÇÃO: sem a palavra `botão`, o mesmo termo volta a acender",
         "merge" in termos("- você apertou o Merge em 14 casas"))
    caso("ISENÇÃO (d): a linha que fala do jargão para condená-lo é legítima",
         termos("- faxina de linguagem: tirar RLS, schema e migration do texto") == [])
    caso("ISENÇÃO (d): o carimbo [jargão-citado] também isenta",
         termos("- [jargão-citado] o item citava deploy e branch") == [])
    caso("ISENÇÃO (e): lápide ⚰️ que cita o termo não acende",
         termos("- ⚰️ dizia force-push aqui; saiu em 17/09") == [])
    caso("MUTAÇÃO da isenção: a MESMA linha SEM o ⚰️ volta a acender",
         "force-push" in termos("- dizia force-push aqui; saiu em 17/09"))
    caso("classe g: comentário de HTML não é superfície (ele nunca vê)",
         termos("<!-- pago em 25/09: a CI forçou a fiação no mesmo commit -->") == [])
    caso("`repositório` NÃO é jargão (isenção f — é a palavra portuguesa)",
         termos("- o repositório da AVC está em dia") == [])
    caso("fronteira de PALAVRA: `mergeable` não é `merge`",
         termos("- as 4 PRs continuam mergeable pelo GitHub") == [])
    caso("RLS é caixa-alta e só casa em caixa-alta",
         "RLS" in termos("- a trava RLS decide quem vê") and
         termos("- ele conferiu os rls antigos") == [])
    caso("linha sem termo nenhum não vira achado",
         termos("- pagar o boleto do domínio até sexta") == [])
    caso("duas grafias do mesmo termo contam UMA vez na linha",
         len([t for t in termos("- nada de force push nem force-push aqui")
              if "force" in t]) == 1)

    import tempfile
    with tempfile.TemporaryDirectory() as t:
        open(os.path.join(t, "MAPA-DE-PENDENCIAS.md"), "w", encoding="utf-8").write(
            "- falta o deploy\n- juntada (*merge*) pendente\n- ⚰️ dizia branch\n")
        r = mede(t)
        caso("MUTAÇÃO no arquivo: mede e acha só o cru (linha 1)",
             len(r) == 1 and r[0][1] == 1 and r[0][2] == "deploy")

    # a régua da glosa é "existe e é OUTRA palavra, em português" — não comprimento: `painel`
    # tem 6 letras e é a glosa certa de `dashboard`. Medir tamanho aqui seria régua inventada.
    caso("todo termo do vocabulário tem glosa em português, e ela não repete o termo",
         all(isinstance(g, str) and len(g) >= 5 and t.lower() not in g.lower()
             for t, g in VOCABULARIO.items()))
    caso("o vocabulário cobre os termos que o dono citou no GO (force-push, RLS, deploy, migration)",
         all(t in VOCABULARIO for t in ("force-push", "RLS", "deploy", "migration")))
    print("\nPROVA DO GATE DE JARGÃO:", "passou" if ok else "FALHOU")
    return 0 if ok else 1


def main():
    if "--prova" in sys.argv:
        return prova()
    if "--relatorio" in sys.argv:
        return modo_relatorio()
    if "--casas" in sys.argv:
        return modo_casas()
    r = mede(RAIZ)
    quais = [s for s in SUPERFICIES if os.path.isfile(os.path.join(RAIZ, s))]
    if r:
        print("🟨 [jargão] %d termo(s) de máquina CRU(s) na superfície que o dono lê — a D159 pede "
              "etiqueta pequena e SEMPRE glosada:" % len(r))
        for rel, i, termo, glosa in r[:6]:
            print("   • %s:%d — `%s` → %s" % (rel, i, termo, glosa))
        if len(r) > 6:
            print("   • … e %d outro(s)" % (len(r) - 6))
        print("   → glose (não apague): o termo fica UMA vez, entre parênteses (A-772/B12)")
        return 0        # 🟨 por desenho: é passivo de redação, como o `[lacuna]`
    print("🟩 [jargão] nenhum termo de máquina cru nas %d superfície(s) que ele lê "
          "(%d termos no vocabulário; casas: --casas)" % (len(quais), len(VOCABULARIO)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
