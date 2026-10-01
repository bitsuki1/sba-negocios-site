#!/usr/bin/env python3
"""herdado-da-main.py — O BLOQUEIO É SEU, OU JÁ ESTAVA NA MAIN? (item B40 da fila de alçada)

O DEFEITO QUE ORIGINOU ISTO, medido pela frente `estudo-bulky-log` da Keepee em 2026-09-17:
o `gate-fechamento.sh` devolveu **❌ NÃO FECHE com 5 bloqueios e nenhum era dela** — 24 erros de
gramática de OUTRO nó que **já estavam na `main`**, 3 cartas do escritório de 14/09, e commits fora
da `main` por desenho. O risco é o pior da família: **portão sempre vermelho é portão que se aprende
a ignorar**, e aí o vermelho verdadeiro passa batido. Fica maior com a onda de instâncias que o dono
abriu em 19/09: cada frente confinada que abrir bate no mesmo vermelho alheio.

A RÉGUA, e por que ela serve às 22 casas sem saber o que é um "nó":
  para cada bloqueio, pergunte ao GIT se aquilo já existia na `origin/main` **antes** desta branch
  divergir (`git merge-base`). Se já existia, **não é desta sessão** — vira AVISO com endereço
  ("não é seu"), nunca reprovação. Nenhuma linha aqui precisa saber da árvore da Keepee, do nome do
  branch ou da coluna de uma tabela: só do git, que toda casa tem.

NÃO É INVENÇÃO DO ESCRITÓRIO — duas casas chegaram nela, independentes, por caminhos diferentes:
a Keepee no item `A1-C21` do nó `A1-diretoria-executiva` (28/08), descrevendo o mesmo defeito no
`escopo-por-no` dela (*"o check roda no range do push, que inclui o commit de união com arquivos
vindos da main → reprova a frente que apenas integrou a main como a D135 manda"*) e propondo
exatamente `merge-base`; e a frente de 17/09, medindo o portão. Mesmo diagnóstico, mesmo conserto.

AS TRÊS COISAS QUE ESTA RÉGUA NÃO FAZ, ditas em voz alta:
  1. **Não silencia.** Bloqueio herdado sai na tela como aviso COM ENDEREÇO. "Não é seu" é diferente
     de "não existe": quem lê precisa saber que a main está vermelha, para alguém pagar.
  2. **Não mede na própria `main`.** Ali nada é herdado de outra pessoa: o defeito é seu, e o portão
     tem de morder. É a guarda marcada `__GUARDA_DA_MAIN__` — sem ela, a régua rebaixaria TODO
     vermelho da main a aviso e o portão deixaria de existir. O caso 10 da bateria prova isso por
     defeito plantado.
     ⚠️ E a guarda é por **NOME DO RAMO**, não por "base == HEAD". A 1ª versão usava a segunda forma,
     e a bateria de 10 casos passou inteira — quem reprovou foi o teste do bloco do gate, com um
     cenário que eu não tinha imaginado: **branch de frente RECÉM-ABERTA, ainda sem commit**. Ali
     `base == HEAD` e a régua respondia NAO-MEDIDO, ou seja, cobrava da frente todo o vermelho da
     main justamente no minuto em que ela não tinha escrito uma linha. Frente que não divergiu não
     introduziu nada; o que ela editou na árvore de trabalho ainda aparece, porque a comparação é
     **árvore × base**, nunca commit × commit. É a lição de sempre: a bateria prova o imaginado, a
     casa real prova o não-imaginado (caso 11).
  3. **Não chuta quando não consegue medir.** Sem `origin/main` alcançável, ou com histórico raso
     onde o `merge-base` não resolve, a resposta é `NAO-MEDIDO` e **o portão mantém a reprovação**.
     Falha FECHADA: uma régua que rebaixa por não ter medido é pior que régua nenhuma.

POR QUE SÓ REF REMOTA (`origin/main`), e não a `main` local: é a lição A-642 deste mesmo portfólio —
*o instrumento media a MINHA CÓPIA (a forma) em vez da `main` DELA (o fato)*. `main` local
pode estar dias atrás; medir contra ela devolveria "isto é seu" para defeito que já está
publicado. O erro nesse
sentido é conservador (mantém a reprovação), mas é erro, e a referência certa é a remota.

USO
    python3 processos/herdado-da-main.py <caminho>[:<linha>] [...]

    Um veredito por argumento, na ordem: `HERDADO` · `DESTA-BRANCH` · `NAO-MEDIDO`, seguido do
    argumento e do porquê. Sem `:linha`, compara o ARQUIVO inteiro; com `:linha`, pergunta se aquele
    TEXTO existia na versão-base — mais preciso, e robusto a linha que andou de lugar.

    Código de saída: 0 sempre que conseguiu responder (o veredito está na saída, não no código);
    2 quando nem o git respondeu. Quem decide reprovar é o portão, não esta régua.

BATERIA: `bash processos/prova-herdado-da-main.sh` — 10 casos em repositórios git REAIS, criados e
commitados na hora. Escrita ANTES deste arquivo, por ordem do próprio item: régua que muda o portão
de 22 casas não se escreve por raciocínio.
"""
import os
import subprocess
import sys

CANDIDATOS = ("origin/main", "origin/master")


def git(*args):
    """(rc, saída) — sem levantar. bytes, porque arquivo do portfólio tem acento e emoji."""
    p = subprocess.run(("git",) + args, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    return p.returncode, p.stdout


def base_de_comparacao():
    """(base_sha, motivo_se_nao_deu) — a referência remota, nunca a cópia local (A-642)."""
    rc, head = git("rev-parse", "HEAD")
    if rc != 0:
        return None, "não é repositório git, ou não há commit"
    head = head.strip().decode()
    ref = None
    for c in CANDIDATOS:
        if git("rev-parse", "--verify", "--quiet", c)[0] == 0:
            ref = c
            break
    if ref is None:
        return None, ("sem `origin/main` nem `origin/master` alcançáveis"
                      " — não rebaixo o que não medi")
    rc, base = git("merge-base", ref, "HEAD")
    if rc != 0 or not base.strip():
        return None, (f"`git merge-base {ref} HEAD` não resolveu"
                      " (histórico raso ou sem ancestral comum)")
    base = base.strip().decode()
    ramo = git("branch", "--show-current")[1].strip().decode()
    if (ramo in ("main", "master")) or (not ramo and base == head):  # __GUARDA_DA_MAIN__
        return None, (f'na própria `{ramo or ref}`: aqui não existe "herdado de outra'
                      ' pessoa" — o defeito é SEU')
    return base, None


def conteudo_na_base(base, caminho):
    rc, out = git("show", f"{base}:{caminho}")
    return out if rc == 0 else None


def julga(arg, base):
    """(veredito, porque) para um `caminho` ou `caminho:linha`."""
    caminho, _, linha = arg.rpartition(":")
    if caminho and linha.isdigit():
        n = int(linha)
    else:
        caminho, n = arg, None

    if not os.path.isfile(caminho):
        return "NAO-MEDIDO", "não está na árvore de trabalho — não se julga o que não se lê"

    antes = conteudo_na_base(base, caminho)
    if antes is None:
        return "DESTA-BRANCH", "o arquivo não existia na base: nasceu nesta branch"

    with open(caminho, "rb") as fh:
        agora = fh.read()

    if n is None:
        if agora == antes:
            return "HERDADO", "arquivo byte-a-byte igual à base: o que o portão acusou já estava lá"
        return "DESTA-BRANCH", (f"esta branch mexeu no arquivo — cite `{caminho}:<linha>`"
                                " para medir a linha")

    linhas_agora = agora.splitlines()
    if not (1 <= n <= len(linhas_agora)):
        return "NAO-MEDIDO", f"o arquivo tem {len(linhas_agora)} linha(s); a {n} não existe"
    texto = linhas_agora[n - 1].strip()
    if not texto:
        return "NAO-MEDIDO", "linha vazia — nada a comparar"
    if texto in [linha.strip() for linha in antes.splitlines()]:
        return "HERDADO", "este texto já existia no arquivo na base (linha pode ter andado)"
    return "DESTA-BRANCH", "este texto não existe na versão-base: entrou nesta branch"


def main(argv):
    alvos = [a for a in argv[1:] if not a.startswith("--")]
    if not alvos:
        print(__doc__.strip().split("USO", 1)[-1].strip())
        return 0
    base, motivo = base_de_comparacao()
    if base is None:
        for a in alvos:
            print(f"NAO-MEDIDO {a} — {motivo}")
        return 0
    for a in alvos:
        v, porque = julga(a, base)
        print(f"{v} {a} — {porque}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
