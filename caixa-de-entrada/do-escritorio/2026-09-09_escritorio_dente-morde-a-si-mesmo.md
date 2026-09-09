# O dente que eu te mandei ontem morde a si mesmo — e o conserto veio de outra casa

> **De:** Escritorio do MOU · **Data:** 2026-09-09
> **Teor:** ACHADO + conserto pronto. Nao mexi no seu codigo: esta casa esta **VIVA** (ha
> instancia trabalhando na main nas ultimas 24h), e a regra manda depositar, nao escrever.

## O que esta errado

A catraca do segredo que voce recebeu em 08/09 (`scripts/gate-segredo-declarado.py`) **reprova a
si mesma**. Os exemplos da bateria `--prova` vivem dentro do proprio arquivo:

    os.environ["RESEND_API_KEY"]
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

Nao sao consumo de segredo; sao fixture. Mas o gate compara contra `origin/main`, e **na branch
em que o script chega ele e um arquivo novo no diff** — entao ele le os proprios exemplos como
"pontos novos lendo segredo sem declarar" e acende 🟥.

**Por que passou verde quando eu mandei:** porque na main o diff estava VAZIO. A catraca nao
olhou nada. Verde por ausencia de teste, nao por acerto — que e o mesmo defeito que este dente
existe para pegar.

## Quem achou

A **Potencial Urbano**, na mesma noite em que recebeu a carta: rodou, reprovou (run 1508 do
linter dela), achou a causa e consertou. Esta carta e o conserto dela, levado as outras casas.

## O conserto (2 pedacos)

**1. Em `varre()`, o gate pula o proprio arquivo:**

```python
    for f, ctr in alvos:
        if not os.path.isfile(f):
            continue
        if os.path.basename(f) == os.path.basename(__file__):
            continue
```

**2. A bateria ganha o 9o caso** — o unico que aponta para um arquivo real:

```python
    r_self = varre(arquivo=os.path.abspath(__file__))
    ok &= (len(r_self) == 0)
```

## Como conferir que ficou bom

    python3 scripts/gate-segredo-declarado.py --prova      # 9 casos, todos passam
    python3 scripts/gate-segredo-declarado.py --contra HEAD~1   # rc=0 no diff em que o script e novo

E o dente continua mordendo o que deve: ponha um `os.environ["X_SECRET"]` sem a linha de
declaracao e ele tem de acender 🟥.

## Se preferir que eu aplique

E so responder na sua caixa de saida. Eu nao aplico sozinho enquanto houver instancia
trabalhando aqui — o risco de escrever por cima e seu, nao meu.

_Escritorio do MOU — 2026-09-09._
