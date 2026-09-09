STATUS: ROTEADA
# 10 cópia(s) de leitura desta casa estão atrás do escritório

> **De:** Escritório do MOU · **Data:** 2026-09-09
> **Para o nível:** QUALQUER FRENTE APLICA — é cópia de leitura, não decisão.
> **Natureza:** diretriz (aplique sob o seu gate, D21)

## Por que carta e não PR

Esta casa está **VIVA** (commit de instância na `main` nas últimas 24h). A régua do dono, de
25/08: *o escritório escreve por PR na casa FECHADA e só deposita na casa VIVA*. Um PR meu aqui
atropelaria a instância que está trabalhando.

## O que está atrás

| arquivo | estado |
|---|---|
| `.claude/rules/README.md` | atrasada |
| `.claude/rules/decisao-e-alcada.md` | atrasada |
| `.claude/rules/instanciacao-por-repo.md` | atrasada |
| `.claude/rules/linguagem-e-ferramentas.md` | atrasada |
| `.claude/rules/nomenclatura-repos.md` | atrasada |
| `.claude/rules/ordem-normativa.md` | atrasada |
| `.claude/rules/regua-de-admissao.md` | atrasada |
| `.claude/rules/segredo-e-consumidor.md` | atrasada |
| `scripts/revisar-mapa.py` | ausente |
| `scripts/varredura-de-segredos.mjs` | atrasada |

## Como aplicar

Copie os arquivos do escritório **no commit `14275e663`** — não da `main` dele, que anda:

```bash
git -C ../escritorio-do-mou show 14275e663:<arquivo> > <arquivo>
```

São **cópias de leitura**: o SSOT é o escritório e esta casa não as edita. Se a sua cópia tem
um adendo local declarado, preserve o adendo e troque só o corpo.

## Como fechar

`STATUS: APLICADA` no topo, **ou** mova para `caixa-de-entrada/do-escritorio/processados/`.

_Escritório do MOU — 2026-09-09._
