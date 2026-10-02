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
    python3 scripts/gate-segredo-declarado.py                 # o diff contra origin/main
    python3 scripts/gate-segredo-declarado.py --contra HEAD~1
    python3 scripts/gate-segredo-declarado.py --arquivo X     # um arquivo inteiro (auditoria)
    python3 scripts/gate-segredo-declarado.py --prova         # a bateria

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
#
# ⚠️ **A-680 (carta do `ccev-sempre-vale-a-pena-site`, 11/09, recolhida em 14/09) — O FORMATO ERA
# IMPOSSÍVEL DE CUMPRIR ONDE MAIS IMPORTA.** O regex exigia literalmente `#`, e **em TypeScript `#`
# não é comentário**. Nas funções Deno — que são exatamente onde moram as credenciais de verdade
# (chave de serviço do banco, Resend, Gemini, provedor de PIX, segredo de webhook) — a casa tinha de
# escolher entre dois erros: obedecer o formato ao pé da letra e **a função parar de compilar**, ou
# escrever um comentário válido (`//`) e **a catraca não ver, ficando verde**.
#
# Nos arquivos que mais importam, a regra não tinha como ser cumprida — e o silêncio passava por
# acerto. É a família da casa outra vez: o gate media a FORMA (o caractere `#`) e lia como FATO (a
# casa não declarou). A casa consertou o dente DELA e mandou a emenda; este é o ORIGINAL que desce
# às 22 — o conserto tinha de vir aqui, ou as outras 21 seguiriam com o mesmo buraco.
DECLARACAO = re.compile(
    r"(?:\#|//)\s*segredo:\s*([A-Z][A-Z0-9_]{2,})\s*[—–-]\s*(.+?)\s*[—–-]\s*casa:\s*(\S+)",
    re.I,
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
    # ⊕ A-768 (17/09) — FUSÃO: esta lista estava BIFURCADA em três, e o canon era o mais POBRE.
    # Medido nas 23 casas: 21 tinham 19 nomes (esta cópia, a original), a caixa de ferramentas
    # tinha 28 e a SBA 30. A união é 37. Duas casas foram fundo, cada uma no seu terreno, e
    # NINGUÉM trouxe de volta — o mesmo desenho do A-756 (o gerador do mapa bifurcado em dois
    # galhos meus). Aqui é pior num ponto: o canon, que é o que desce às outras 21, era o menor
    # dos três. Nomes abaixo com a procedência, para ninguém desfazer sem saber de onde veio.
    #
    # — achado pela CAIXA DE FERRAMENTAS (`portfolio-automacoes`, 15/09), rodando o gate recém-
    #   trazido contra a própria árvore: caminhos que o RUNNER entrega ao job para escrever.
    "GITHUB_API_URL",
    "GITHUB_EVENT_PATH",
    "GITHUB_PATH",
    "GITHUB_SERVER_URL",
    "RUNNER_TEMP",
    "RUNNER_TOOL_CACHE",
    "RUNNER_WORKSPACE",
    #
    # — achado pela SBA: variáveis de PROXY e de bundle de certificado. O ambiente remoto injeta
    #   `HTTPS_PROXY` e os `*_CA_BUNDLE` em toda sessão; cobrar declaração de segredo neles é
    #   morder o que não é presa, e dente que morde o que não é presa acaba desligado.
    "BB_CA_BUNDLE",
    "CCR_CA_BUNDLE",
    "GITHUB_BASE_REF",
    "GITHUB_HEAD_REF",
    "HTTPS_PROXY",
    "HTTP_PROXY",
    "NO_PROXY",
    "REQUESTS_CA_BUNDLE",
    "SSL_CERT_FILE",
    #
    # — as DUAS casas acharam, cada uma por seu lado (sinal de que o buraco era real):
    "GITHUB_REF_NAME",
    "GITHUB_STEP_SUMMARY",
}
# Onde a declaração é exigida (a regra enumera estes escopos).
ESCOPOS = (".github/workflows/", "supabase/functions/", "tools/", "scripts/")


def escopos_que_existem(raiz="."):
    """Quais dos ESCOPOS existem NESTE repositório.

    ⚠️ **A-680-bis (2ª metade da carta da CCEV-site, 11/09).** A lista de escopos desceu fixa às 22
    casas, e **cada casa guarda as coisas onde quer**: na CCEV-site as 9 funções de borda moram em
    `plataforma/edge-functions/`, e `supabase/functions/` e `tools/` **não existem**. A catraca
    cobria 2 dos 4 escopos — justamente os que ali **não guardam credencial** — e ficava verde **por
    não olhar**.

    Verde por ausência de alvo é o pior verde que existe: ele tem a mesma cor do verde por acerto.
    Não dá para adivinhar a pasta de cada casa daqui; o que dá, e é honesto, é **a catraca declarar
    quantos dos escopos ela encontrou** — e gritar quando não encontra nenhum, porque aí ela está
    vigiando o vazio e o silêncio dela não vale nada.
    """
    return [e for e in ESCOPOS if os.path.isdir(os.path.join(raiz, e.rstrip("/")))]
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
        # ⚠️ 26/09 (B22) — ESTA GUARDA FICOU MEIO-CONSERTADA PELO A-680. Naquele dia a `DECLARACAO`
        # passou a aceitar `#` **ou** `//`, porque em TypeScript `#` não é comentário; esta linha, que
        # existe para dizer *"a própria declaração não é leitura"*, continuou conhecendo só o `#`.
        # ⚠️ E O QUE A MEDIÇÃO MOSTROU, que é diferente do que eu supus ao começar: hoje esta guarda
        # é INALCANÇÁVEL — para `#` e para `//`. A janela da declaração é
        # `range(n-1-JANELA, n)`, e esse `n` **inclui a própria linha do ponto**; logo qualquer linha
        # que declare E leia se justifica sozinha, com ou sem o pulo. Tentei provar a simetria por
        # bateria (plantando um detector de nome solto) e o caso passou COM e SEM o conserto: teste
        # que não distingue não é prova, é cerimônia — tirei-o em vez de deixá-lo dando falsa
        # segurança (A-817). O conserto fica porque é CORRETO e porque a assimetria volta a morder no
        # dia em que alguém estreitar a janela para excluir a linha do ponto. É endurecimento
        # declarado, não defeito consertado — e a diferença tinha de estar escrita aqui.
        _dsp = lin.lstrip()
        if (_dsp.startswith("#") or _dsp.startswith("//")) and "segredo:" in lin:
            continue  # a própria declaração não é leitura
        for rx in LEITURAS:
            for m in rx.finditer(lin):
                nome = m.group(1)
                if nome in NAO_E_SEGREDO:
                    continue
                # A-768 (17/09): ESCREVER no ambiente não é LER o segredo. O
                # `prova_trash_e_orfaos.py`
                # do `portfolio-automacoes` faz `os.environ["GOOGLE_SA_KEY"] = "{}"` na linha 30
                # — põe um valor VAZIO para o módulo sob teste importar sem credencial — e a
                # catraca o
                # acusava de ler segredo sem declarar. O estrago de deixar assim é pior que o falso
                # vermelho: ensina a colar linha de declaração em dublê de teste, e a lista de
                # consumidores — que é MEDIDA por varredura — passa a contar teste como consumidor.
                # Quem apaga um segredo olhando essa lista preserva o morto e erra o vivo.
                # o casamento termina na aspa; o `]`/`)` que fecha o acesso vem depois dele.
                if re.match(r"\s*[\]\)]?\s*=(?!=)", lin[m.end():]):
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


# ═════════════════════════════════════════════════════════════════════════════════════════════
# 2ª LENTE — O VERIFICADOR NUNCA CARREGA O SEGREDO (B39/A-833, regra item 4)
#
# A 1ª lente cobra a DECLARAÇÃO de quem lê segredo pelo NOME. Ela não vê o caso oposto, que a
# Keepee mediu em 17/09: o script de auditoria deles testava *"a senha vazou para algum arquivo?"*
# escrevendo a BUSCA PELO TEXTO LITERAL DA SENHA — e, ao escrever o teste, gravou a senha dentro
# da ferramenta feita para impedi-la. O teste reprovou apontando para si mesmo; foi assim que
# apareceu. Entre as duas regras que já existiam havia um furo: a `segredo-e-consumidor` manda
# DECLARAR no ponto de consumo, a D200 barra o segredo que ENTRA pelo diff, e nenhuma das duas vê
# o valor entrando **dentro do verificador**, como argumento de um `grep`.
#
# ⚠️ A REGRA VALE PARA ESTE ARQUIVO TAMBÉM, E ISSO MUDOU COMO A BATERIA É ESCRITA. Os casos de
# prova precisam de valores COM A FORMA de credencial. Se eu os escrevesse inteiros, este arquivo
# passaria a ser exatamente o que ele condena — e iria ao git no commit seguinte, como o da Keepee.
# Então a bateria MONTA cada valor por concatenação em tempo de execução (`"sk-" + "a"*32`), e
# abaixo só existem FORMAS (classes de caractere), nunca valores. É a própria regra: *"busque pela
# forma ou pelo hash; valor indispensável entra por env-var no ato, nunca no arquivo"*.
#
# ⚠️ E O QUE ELA NÃO ACUSA: **D206** — chave pública por desenho (`anon`, `publishable`) não é
# achado. Um JWT com uma dessas palavras por perto passa; sem ela, acende como `jwt`.
FORMAS = [
    ("chave de API (prefixo sk-)", re.compile(r"\bsk-[A-Za-z0-9_\-]{24,}")),
    ("token do GitHub", re.compile(r"\b(?:ghp|gho|ghs|ghu)_[A-Za-z0-9]{28,}|\bgithub_pat_[A-Za-z0-9_]{20,}")),
    ("token do Slack", re.compile(r"\bxox[baprs]-[A-Za-z0-9\-]{10,}")),
    ("id de chave AWS", re.compile(r"\bAKIA[0-9A-Z]{16}\b")),
    ("jwt", re.compile(r"\beyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}")),
    ("chave privada em PEM", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    # ⚠️ A fatia da senha NÃO pode aceitar interpolação. Medido em 26/09, antes de o dente entrar
    # no kit: das 7 linhas que a lente acendeu nas 26 casas, **4 eram `${VAR}` montando a URL**
    # (`postgresql://${user}:${pass}@${host}`, `x-access-token:${GITHUB_TOKEN}@github.com`) — ou
    # seja, exatamente o jeito CERTO de fazer, acusado como errado. É a família do A-809 (35
    # acusações, 35 falsas). Então `$ { } < > %` estão fora das duas fatias: o que sobra é valor.
    ("senha dentro de string de conexão",
     re.compile(r"\b[a-z][a-z0-9+.\-]*://[^\s:/@\"'${}<>%]+:[^\s:/@\"'${}<>%]{6,}@")),
]

# Um valor com forma de credencial em arquivo de EXEMPLO ou em molde não é o defeito — o defeito é
# o valor de verdade. Estas marcas, na própria linha, isentam.
ISENTA_LINHA = re.compile(
    r"EXEMPLO|exemplo|placeholder|PLACEHOLDER|FORMA:|fixture|xxxx|XXXX|<[a-z_]+>|"
    r"seu[-_ ]token|sua[-_ ]chave|troque|COLE[- ]AQUI",
)
# D206 — crachá público por desenho. Vale só para a forma `jwt`.
PUBLICA_POR_DESENHO = re.compile(r"anon|publishable|publicavel|publicável|PUBLIC_KEY|VITE_", re.I)


def literais_no_texto(linhas, so_linhas=None):
    """Devolve [(n, categoria)] — **nunca o valor**. Reportar valor seria repetir o defeito (D200)."""
    achados = []
    for n, lin in enumerate(linhas, 1):
        if so_linhas is not None and n not in so_linhas:
            continue
        if ISENTA_LINHA.search(lin):
            continue
        for categoria, rx in FORMAS:
            if not rx.search(lin):
                continue
            if categoria == "jwt" and PUBLICA_POR_DESENHO.search(lin):
                continue  # D206: chave pública por desenho não é achado
            achados.append((n, categoria))
            break
    return achados


def varre_literais(contra=None, arquivo=None):
    """A 2ª lente, com a mesma disciplina de CATRACA: só o que ENTRA ou MUDA."""
    fora = []
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
        if os.path.basename(f) == os.path.basename(__file__):
            continue  # A-593: o dente não morde a si mesmo (a bateria monta as formas em runtime)
        try:
            linhas = open(f, encoding="utf-8", errors="replace").read().split("\n")
        except Exception:
            continue
        so = linhas_novas(f, ctr) if ctr else None
        for n, categoria in literais_no_texto(linhas, so):
            fora.append((f, n, categoria))
    return fora


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
    # A-768 (17/09): ESCREVER no ambiente não é LER o segredo. O dublê de teste do
    # `portfolio-automacoes` põe `os.environ["GOOGLE_SA_KEY"] = "{}"` para o módulo importar sem
    # credencial — e a catraca o acusava. Os dois casos abaixo são o dente nos DOIS sentidos: a
    # escrita não conta, e a comparação (`==`) continua contando, para a guarda não virar buraco.
    caso(
        "A-768: ESCREVER no ambiente (dublê de teste) NÃO é leitura",
        'import os\nos.environ["RESEND_API_KEY"] = "{}"\n',
        False,
    )
    caso(
        "A-768: comparar (`==`) CONTINUA sendo leitura — a guarda não virou passe livre",
        'import os\nif os.environ["RESEND_API_KEY"] == "x":\n    pass\n',
        True,
    )
    # A-680 (carta da CCEV-site): em TypeScript `#` não é comentário. Os dois casos abaixo são o
    # dente: um prova que `//` VALE, o outro prova que o `//` não virou passe livre.
    caso(
        "A-680: declaração com `//` PASSA (é a única forma legal em TypeScript/Deno)",
        "// segredo: RESEND_API_KEY — envia o aviso de acesso — casa: ccev\n"
        'const k = Deno.env.get("RESEND_API_KEY")\n',
        False,
    )
    # A-680-bis: verde por ausência de alvo tem a mesma cor do verde por acerto
    import tempfile as _tf
    with _tf.TemporaryDirectory() as _d:
        print("%s A-680-bis: repo SEM nenhum dos escopos é reconhecido (catraca vigiando o vazio)"
              % ("✅" if not escopos_que_existem(_d) else "🟥"))
        ok &= not escopos_que_existem(_d)
        os.makedirs(os.path.join(_d, "scripts"))
        print("%s A-680-bis: repo COM um escopo é reconhecido (a catraca tem o que olhar)"
              % ("✅" if escopos_que_existem(_d) == ["scripts/"] else "🟥"))
        ok &= escopos_que_existem(_d) == ["scripts/"]
    caso(
        "A-680: `//` sem a palavra `segredo:` continua REPROVANDO (não virou passe livre)",
        "// isto aqui é só um comentário qualquer sobre a chave\n"
        'const k = Deno.env.get("RESEND_API_KEY")\n',
        True,
    )
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

    # ── B39/A-833 — a 2ª lente: O VERIFICADOR NUNCA CARREGA O SEGREDO ─────────────────────────
    # ⚠️ Cada valor abaixo é MONTADO por concatenação em tempo de execução. Escrevê-lo inteiro
    # neste arquivo faria dele exatamente o que a lente condena — e ele iria ao git no commit
    # seguinte, que é o caso real que a Keepee mediu em 17/09 (A-813).
    def caso_lit(rotulo, conteudo, espera_achado):
        nonlocal ok
        with tempfile.TemporaryDirectory() as d:
            assert d.startswith("/tmp")
            sub = os.path.join(d, "scripts")
            os.makedirs(sub)
            pth = os.path.join(sub, "v.sh")
            open(pth, "w", encoding="utf-8").write(conteudo)
            r = varre_literais(arquivo=pth)
            bom = (len(r) > 0) == espera_achado
            print(f"{'✅' if bom else '🟥'} {rotulo}")
            if not bom:
                print("      obtido:", r)
            ok &= bom

    _sk = "sk-" + "A1b2C3d4" * 4                     # forma de chave de API
    _gh = "ghp_" + "b" * 36                          # forma de token do GitHub
    _jwt = "eyJ" + "a" * 20 + "." + "b" * 20 + "." + "c" * 20
    _pem = "-----BEGIN RSA PRIVATE" + " KEY-----"
    _conn = "postgresql://robo:" + "S3nh4Qu3V4z0u" + "@banco.example:5432/db"

    caso_lit(
        "B39: o caso REAL da Keepee — grep pelo texto literal da senha ACENDE",
        f'grep -rn "{_sk}" . && echo "a senha vazou"\n',
        True,
    )
    caso_lit("B39: token do GitHub como literal ACENDE", f'if [ "$t" = "{_gh}" ]; then :; fi\n', True)
    caso_lit("B39: chave privada em PEM colada no arquivo ACENDE", _pem + "\n", True)
    caso_lit("B39: senha dentro de string de conexão ACENDE", f'PSQL="{_conn}"\n', True)
    caso_lit(
        "B39: buscar pelo NOME da variável (a forma CERTA) não acende",
        'grep -rn "RESEND_API_KEY" . || true\n',
        False,
    )
    caso_lit(
        "B39: buscar pelo HASH (a outra forma certa) não acende",
        'test "$(printf %s "$v" | sha256sum | cut -c1-16)" = "3b1f9c2d4e5a6b70"\n',
        False,
    )
    caso_lit(
        "B39: valor indispensável por env-var no ato não acende",
        'grep -rqF -- "$SENHA_DO_ATO" . || true\n',
        False,
    )
    caso_lit(
        "B39/D206: JWT com `anon` por perto NÃO é achado (chave pública por desenho)",
        f'SUPABASE_ANON_KEY="{_jwt}"\n',
        False,
    )
    caso_lit(
        "B39: o MESMO JWT sem a marca de público ACENDE (a isenção não virou passe livre)",
        f'TOKEN="{_jwt}"\n',
        True,
    )
    caso_lit(
        "B39/A-809: URL montada por interpolação NÃO acende (é o jeito certo, e era falso positivo)",
        'return `postgresql://${user}:${pass}@${host}:${port}/${db}`\n',
        False,
    )
    caso_lit(
        "B39/A-809: token por interpolação no remote NÃO acende",
        'git remote set-url origin "https://x-access-token:${GITHUB_TOKEN}@github.com/o/r.git"\n',
        False,
    )
    caso_lit(
        "B39: fixture SINTÉTICO escrito inteiro ACENDE — de propósito (o conserto é concatenar)",
        f'CASOS = [("chave", "export TOK={_sk}", True)]\n',
        True,
    )
    caso_lit(
        "B39: linha marcada como EXEMPLO/placeholder não acende (molde não é valor)",
        f'# EXEMPLO de como NÃO fazer: grep "{_sk}" .\n',
        False,
    )

    # 9º caso (A-593): o dente NÃO pode morder a si mesmo. Os fixtures acima vivem dentro deste
    # arquivo; sem a guarda, toda casa que recebesse o script por BRANCH reprovaria no primeiro
    # linter. Este caso é o único da bateria que aponta para um arquivo REAL — de propósito: os
    # outros 8 provam o que o dente pega, e só este prova o que ele tem de deixar passar.
    r_self = varre(arquivo=os.path.abspath(__file__))
    r_self_lit = varre_literais(arquivo=os.path.abspath(__file__))
    bom = len(r_self) == 0 and len(r_self_lit) == 0
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

    if not arquivo and not escopos_que_existem():
        print(
            "🟨 [segredo-declarado] NENHUM dos escopos vigiados existe neste repositório "
            "({}) — a catraca está olhando o vazio, e o silêncio dela não é acerto. "
            "Se esta casa guarda função de borda ou script noutro lugar, acrescente o caminho "
            "em ESCOPOS (A-680-bis, achado da CCEV-site).".format(", ".join(ESCOPOS))
        )
        return 0

    faltando = varre(contra=None if arquivo else contra, arquivo=arquivo)
    literais = varre_literais(contra=None if arquivo else contra, arquivo=arquivo)
    if literais:
        print(
            f"🟥 [segredo-declarado] {len(literais)} linha(s) NOVA(s) carregam um valor com FORMA "
            f"de credencial — o verificador nunca carrega o segredo (regra item 4, B39):"
        )
        for f, n, categoria in literais[:10]:
            print(f"      {f}:{n} — categoria: {categoria}  (o valor NÃO se reproduz aqui: D200)")
        print("      O que fazer: busque pelo NOME da variável, pela FORMA (regex) ou pelo HASH.")
        print("      Valor indispensável entra por env-var no ato da execução, nunca no arquivo —")
        print("      senão a ferramenta feita para impedir o vazamento passa a ser o vazamento,")
        print("      e vai ao git no commit seguinte (A-813, medido pela Keepee em 17/09).")
        print("      Chave PÚBLICA por desenho (anon/publishable) não é achado — D206.")
    if not faltando:
        return 1 if literais else 0
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
