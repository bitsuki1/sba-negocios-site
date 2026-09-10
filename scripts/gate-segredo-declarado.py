#!/usr/bin/env python3
"""gate-segredo-declarado.py — CATRACA: todo ponto NOVO que lê segredo diz para que serve.

─────────────────────────────────────────────────────────────────────────────────────────────
POR QUE ISTO EXISTE (M29)

A regra `segredo-e-consumidor.md` manda: todo lugar que LÊ um segredo carrega uma linha, no
formato fechado —

    # segredo: RESEND_API_KEY — envia o aviso de acesso ao acervo — casa: ccev

Medido em 2026-09-07 no portfólio inteiro: **573 pontos de leitura de segredo, e ZERO declaram**.
O registro de quem usa cada segredo está correto hoje (foi remedido do zero na mesma data), mas
ele é medido **de fora**, por varredura. Sem a declaração no ponto de consumo, a lista certa de
hoje envelhece sozinha — e a coluna "quem usa" volta a ser palpite, que é o defeito que a
própria regra proíbe.

─────────────────────────────────────────────────────────────────────────────────────────────
POR QUE CATRACA, E NÃO COBRANÇA GERAL

Um dente que reprovasse os 573 pontos existentes seria desligado no dia seguinte — e um dente
desligado protege zero. É a mesma lição que calibrou o vigia de fatura ("vigia que grita por
trinta centavos é vigia que alguém desliga") e a mesma forma do scanner de segredos do
portfólio, que varre **só o diff do envio**, nunca o repositório inteiro.

Então: **este gate só cobra o que ENTRA ou MUDA.** Os 573 antigos são dívida declarada, não
falta corrente; eles se pagam sozinhos, uma linha por vez, conforme o código é tocado.

O precedente de que a forma funciona existe e morde: `portfolio-automacoes/tools/ci/
gate_runner_declarado.py` obriga todo workflow a declarar por que usa o runner `brasil`, com
vocabulário fechado e falha real.

─────────────────────────────────────────────────────────────────────────────────────────────
USO
    python3 processos/gate-segredo-declarado.py                 # o diff contra origin/main
    python3 processos/gate-segredo-declarado.py --contra HEAD~1
    python3 processos/gate-segredo-declarado.py --arquivo X     # um arquivo inteiro (auditoria)
    python3 processos/gate-segredo-declarado.py --prova         # a bateria

Sai 1 se houver ponto novo sem declaração. Sai 0 quando não há nada novo — inclusive quando o
diff está vazio, que é o caso comum e silencioso de propósito.
"""

import os
import re
import subprocess
import sys

# Como um segredo é LIDO. Não inclui `.env.example` (é declaração, não leitura) nem string
# solta: o que interessa é o gesto de buscar o valor.
LEITURAS = [
    re.compile(r"secrets\.([A-Z][A-Z0-9_]{2,})"),  # GitHub Actions
    re.compile(r"Deno\.env\.get\(\s*[\"']([A-Z][A-Z0-9_]{2,})[\"']"),  # edge function
    re.compile(r"process\.env\.([A-Z][A-Z0-9_]{2,})"),  # node
    re.compile(r"import\.meta\.env\.([A-Z][A-Z0-9_]{2,})"),  # vite
    re.compile(r"os\.environ(?:\.get)?[\[\(]\s*[\"']([A-Z][A-Z0-9_]{2,})[\"']"),
    re.compile(r"os\.getenv\(\s*[\"']([A-Z][A-Z0-9_]{2,})[\"']"),
]
# A declaração, no formato fechado da regra. O `—` pode ser hífen simples (teclado do dono).
DECLARACAO = re.compile(
    r"#\s*segredo:\s*([A-Z][A-Z0-9_]{2,})\s*[—–-]\s*(.+?)\s*[—–-]\s*casa:\s*(\S+)", re.I
)
# Nomes que NÃO são segredo: variável de ambiente pública do próprio CI.
NAO_E_SEGREDO = {
    "GITHUB_TOKEN",
    "GITHUB_REPOSITORY",
    "GITHUB_REF",
    "GITHUB_SHA",
    "GITHUB_ACTOR",
    "GITHUB_WORKSPACE",
    "GITHUB_EVENT_NAME",
    "GITHUB_RUN_ID",
    "GITHUB_OUTPUT",
    "GITHUB_ENV",
    "CI",
    "HOME",
    "PATH",
    "PWD",
    "LANG",
    "TZ",
    "NODE_ENV",
    "PYTHONPATH",
    "RUNNER_OS",
}
# Onde a declaração é exigida (a regra enumera estes escopos).
ESCOPOS = (".github/workflows/", "supabase/functions/", "tools/", "scripts/")
# Janela: a declaração vale para o ponto se estiver até N linhas acima dele.
JANELA = 6


def sh(*a):
    return subprocess.run(a, capture_output=True, text=True).stdout


def pontos_no_texto(linhas, so_linhas=None):
    """Devolve [(n, nome_do_segredo, texto)] dos pontos de leitura. `so_linhas` restringe."""
    achados = []
    for n, lin in enumerate(linhas, 1):
        if so_linhas is not None and n not in so_linhas:
            continue
        if lin.lstrip().startswith("#") and "segredo:" in lin:
            continue  # a própria declaração não é leitura
        for rx in LEITURAS:
            for nome in rx.findall(lin):
                if nome in NAO_E_SEGREDO:
                    continue
                achados.append((n, nome, lin.strip()))
    return achados


def declarado(linhas, n, nome):
    """Há declaração daquele segredo até JANELA linhas acima do ponto?"""
    for i in range(max(0, n - 1 - JANELA), n):
        m = DECLARACAO.search(linhas[i])
        if m and m.group(1).upper() == nome.upper():
            return True
    return False


def linhas_novas(arquivo, contra):
    """Números de linha ADICIONADAS/alteradas no diff — a catraca só olha para elas."""
    d = sh("git", "diff", "-U0", contra, "--", arquivo)
    novas, alvo = set(), 0
    for lin in d.split("\n"):
        m = re.match(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@", lin)
        if m:
            alvo = int(m.group(1))
            n = int(m.group(2) or 1)
            novas.update(range(alvo, alvo + n))
    return novas


def varre(contra=None, arquivo=None):
    faltando = []
    if arquivo:
        alvos = [(arquivo, None)]
    else:
        mudados = [f for f in sh("git", "diff", "--name-only", contra).split("\n") if f.strip()]
        alvos = [
            (f, contra) for f in mudados if any(f.startswith(e) or ("/" + e) in f for e in ESCOPOS)
        ]
    for f, ctr in alvos:
        if not os.path.isfile(f):
            continue
        # A-593 (achado da Potencial Urbano, 08/09): o dente mordia a si mesmo. Os exemplos da
        # bateria --prova vivem DENTRO deste arquivo (os.environ["RESEND_API_KEY"], Deno.env.get
        # ("SUPABASE_SERVICE_ROLE_KEY")) e sao fixture, nao consumo. Toda casa que recebesse o
        # script por BRANCH reprovaria no primeiro linter, porque ai o script e um arquivo novo
        # no diff. Na main passou verde — mas por diff VAZIO, nao por acerto: a catraca nao
        # olhou nada. E a mesma armadilha que este dente existe para pegar, e ela me pegou.
        if os.path.basename(f) == os.path.basename(__file__):
            continue
        try:
            linhas = open(f, encoding="utf-8", errors="replace").read().split("\n")
        except Exception:
            continue
        so = linhas_novas(f, ctr) if ctr else None
        for n, nome, txt in pontos_no_texto(linhas, so):
            if not declarado(linhas, n, nome):
                faltando.append((f, n, nome, txt[:90]))
    return faltando


def prova():
    """A bateria. Um dente sem prova é promessa."""
    import tempfile

    ok = True

    def caso(rotulo, conteudo, espera_falta):
        nonlocal ok
        with tempfile.TemporaryDirectory() as d:
            assert d.startswith("/tmp")
            sub = os.path.join(d, "scripts")
            os.makedirs(sub)
            p = os.path.join(sub, "x.py")
            open(p, "w", encoding="utf-8").write(conteudo)
            r = varre(arquivo=p)
            bom = (len(r) > 0) == espera_falta
            print(f"{'✅' if bom else '🟥'} {rotulo}")
            if not bom:
                print("      obtido:", r)
            ok &= bom

    caso("leitura SEM declaração reprova", 'import os\nk = os.environ["RESEND_API_KEY"]\n', True)
    caso(
        "leitura COM declaração passa",
        "# segredo: RESEND_API_KEY — envia o aviso de acesso ao acervo — casa: ccev\n"
        'import os\nk = os.environ["RESEND_API_KEY"]\n',
        False,
    )
    caso(
        "declaração de OUTRO segredo não vale para este",
        "# segredo: OUTRA_KEY — faz outra coisa — casa: x\n"
        'import os\nk = os.environ["RESEND_API_KEY"]\n',
        True,
    )
    caso(
        "declaração longe demais (fora da janela) não vale",
        "# segredo: RESEND_API_KEY — envia — casa: ccev\n"
        + "\n" * 9
        + 'import os\nk = os.environ["RESEND_API_KEY"]\n',
        True,
    )
    caso(
        "variável pública do CI não é segredo", 'import os\nk = os.environ["GITHUB_TOKEN"]\n', False
    )
    caso(
        "a própria linha de declaração não conta como leitura",
        "# segredo: X_KEY — algo — casa: y\n",
        False,
    )
    caso(
        "hífen simples no lugar do travessão é aceito (o teclado do dono)",
        "# segredo: RESEND_API_KEY - envia o aviso - casa: ccev\n"
        'import os\nk = os.environ["RESEND_API_KEY"]\n',
        False,
    )
    caso(
        "Deno.env.get sem declaração reprova",
        'const k = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")\n',
        True,
    )

    # 9º caso (A-593): o dente NÃO pode morder a si mesmo. Os fixtures acima vivem dentro deste
    # arquivo; sem a guarda, toda casa que recebesse o script por BRANCH reprovaria no primeiro
    # linter. Este caso é o único da bateria que aponta para um arquivo REAL — de propósito: os
    # outros 8 provam o que o dente pega, e só este prova o que ele tem de deixar passar.
    r_self = varre(arquivo=os.path.abspath(__file__))
    bom = len(r_self) == 0
    print(f"{'✅' if bom else '🟥'} o próprio script não é mordido pelos seus fixtures")
    if not bom:
        print("      obtido:", r_self)
    ok &= bom

    print("\nPROVA DA CATRACA:", "passou" if ok else "FALHOU")
    return 0 if ok else 1


def main():
    if "--prova" in sys.argv:
        return prova()
    arquivo = None
    if "--arquivo" in sys.argv:
        arquivo = sys.argv[sys.argv.index("--arquivo") + 1]
    contra = "origin/main"
    if "--contra" in sys.argv:
        contra = sys.argv[sys.argv.index("--contra") + 1]
    if (
        not arquivo
        and subprocess.run(["git", "rev-parse", "--verify", contra], capture_output=True).returncode
    ):
        print(
            f"🟨 [segredo-declarado] não consigo comparar contra `{contra}` — "
            f"a catraca não rodou (não conte como verificado)"
        )
        return 0

    faltando = varre(contra=None if arquivo else contra, arquivo=arquivo)
    if not faltando:
        return 0
    print(
        f"🟥 [segredo-declarado] {len(faltando)} ponto(s) NOVO(s) lêem segredo "
        f"sem dizer para que serve:"
    )
    for f, n, nome, _txt in faltando[:10]:
        print(f"      {f}:{n} lê `{nome}` — sem a linha de declaração acima")
    print("      A linha, no formato fechado da regra `segredo-e-consumidor.md`:")
    print("        # segredo: NOME_DA_CHAVE — para que serve, em linguagem de gente — casa: <casa>")
    print("      Por que isto é cobrado: o registro de quem usa cada segredo é medido DE FORA,")
    print("      por varredura. Sem a declaração no ponto, a lista certa de hoje envelhece")
    print("      sozinha — e apagar o segredo errado quebra a casa que ninguém sabia que usava.")
    print("      (A catraca só cobra o que ENTRA ou MUDA. Os 573 pontos antigos são dívida")
    print("       declarada, e se pagam uma linha por vez, conforme o código é tocado.)")
    return 1


if __name__ == "__main__":
    sys.exit(main())
