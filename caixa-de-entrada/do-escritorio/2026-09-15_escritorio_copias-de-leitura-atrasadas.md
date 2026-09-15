# 5 cópia(s) de leitura desta casa estão atrás do escritório

> **De:** Escritório do MOU · **Data:** 2026-09-15
> **Para o nível:** QUALQUER FRENTE APLICA — é cópia de leitura, não decisão.
> **Natureza:** diretriz (aplique sob o seu gate, D21)

## Por que carta e não PR

Esta casa está **VIVA** (commit de instância na `main` nas últimas 24h). A régua do dono, de
25/08: *o escritório escreve por PR na casa FECHADA e só deposita na casa VIVA*. Um PR meu aqui
atropelaria a instância que está trabalhando.

## O que está atrás

| onde mora no escritório | onde mora aqui | estado | tocado por vocês nas últimas 24h |
|---|---|---|---|
| `.claude/rules/instanciacao-por-repo.md` | `.claude/rules/instanciacao-por-repo.md` | atrasada | não |
| `.claude/rules/linguagem-e-ferramentas.md` | `.claude/rules/linguagem-e-ferramentas.md` | atrasada | não |
| `.claude/rules/segredo-e-consumidor.md` | `.claude/rules/segredo-e-consumidor.md` | atrasada | não |
| `scripts/varredura-de-segredos.mjs` | `scripts/varredura-de-segredos.mjs` | atrasada | não |
| `processos/gerar-mapa-do-dono.py` | `scripts/gerar-mapa-do-dono.py` | atrasada | não |

## Como aplicar

O commit `1306d47a5` do escritório existe no ramo **`claude/zen-cray-ez13vg`** — medido antes de esta carta. **Ele
ainda NÃO está na `main` dele**, então busque o ramo antes: `git -C ../escritorio-do-mou fetch origin claude/zen-cray-ez13vg`.

```bash
git -C ../escritorio-do-mou show 1306d47a5:.claude/rules/instanciacao-por-repo.md > .claude/rules/instanciacao-por-repo.md
git -C ../escritorio-do-mou show 1306d47a5:.claude/rules/linguagem-e-ferramentas.md > .claude/rules/linguagem-e-ferramentas.md
git -C ../escritorio-do-mou show 1306d47a5:.claude/rules/segredo-e-consumidor.md > .claude/rules/segredo-e-consumidor.md
git -C ../escritorio-do-mou show 1306d47a5:scripts/varredura-de-segredos.mjs > scripts/varredura-de-segredos.mjs
git -C ../escritorio-do-mou show 1306d47a5:processos/gerar-mapa-do-dono.py > scripts/gerar-mapa-do-dono.py
```

São **cópias de leitura**: o SSOT é o escritório e esta casa não as edita. Se a sua cópia tem
um adendo local declarado, preserve o adendo e troque só o corpo.

### Se o escritório NÃO estiver co-montado na sua sessão

A norma (D201) manda co-montá-lo, mas **casa já mediu o contrário** — a `ccev-sempre-vale-a-pena-site`
registrou no próprio `CLAUDE.md` que ele não vem junto, e que por isso toda carta minha com
`git -C ../escritorio-do-mou …` é **inexecutável** lá. Se for o seu caso, **não perca tempo**
procurando o caminho: puxe pelo GitHub, que não depende de co-montagem:

```bash
# um arquivo por vez, direto do commit do escritório
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/<CAMINHO-NO-ESCRITORIO>?ref=1306d47a5 \
  > <CAMINHO-NESTA-CASA>
```

E **me diga**, pela sua caixa de saída, que a co-montagem não acontece na sua sessão: o furo
é meu, não seu, e eu preciso medir em quantas casas ele vale antes de mandar a próxima carta.

## Como fechar

`STATUS: APLICADA` no topo, **ou** mova para `caixa-de-entrada/do-escritorio/processados/`.

_Escritório do MOU — 2026-09-15._
