STATUS: ROTEADA
# 9 cópia(s) de leitura desta casa estão atrás do escritório

> **De:** Escritório do MOU · **Data:** 2026-09-26
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
| `.claude/rules/regua-de-admissao.md` | `.claude/rules/regua-de-admissao.md` | atrasada | não |
| `.claude/rules/segredo-e-consumidor.md` | `.claude/rules/segredo-e-consumidor.md` | atrasada | não |
| `processos/revisar-mapa.py` | `scripts/revisar-mapa.py` | atrasada | não |
| `scripts/varredura-de-segredos.mjs` | `scripts/varredura-de-segredos.mjs` | atrasada | não |
| `processos/gerar-mapa-do-dono.py` | `scripts/gerar-mapa-do-dono.py` | atrasada | não |
| `processos/gate-segredo-declarado.py` | `scripts/gate-segredo-declarado.py` | atrasada | não |
| `processos/herdado-da-main.py` | `scripts/herdado-da-main.py` | ausente | não |
| `processos/prova-herdado-da-main.sh` | `scripts/prova-herdado-da-main.sh` | ausente | não |

## Como aplicar

O commit `82523683a` do escritório **existe na `main` remota dele** — medido antes de esta carta
ser escrita. A tabela acima já diz o par — o nome MUDA entre as duas casas.

**Puxe pelo GitHub.** Vale em qualquer sessão: não depende de o escritório estar montado ao
lado da sua, e pela ferramenta do GitHub não precisa de token no seu ambiente.

Com a ferramenta do GitHub (`get_file_contents`), uma chamada por arquivo:

```
owner: bitsuki1   ·   repo: escritorio-do-mou   ·   ref: 82523683a
path: .claude/rules/instanciacao-por-repo.md               → escreva em: .claude/rules/instanciacao-por-repo.md
path: .claude/rules/regua-de-admissao.md                   → escreva em: .claude/rules/regua-de-admissao.md
path: .claude/rules/segredo-e-consumidor.md                → escreva em: .claude/rules/segredo-e-consumidor.md
path: processos/revisar-mapa.py                            → escreva em: scripts/revisar-mapa.py
path: scripts/varredura-de-segredos.mjs                    → escreva em: scripts/varredura-de-segredos.mjs
path: processos/gerar-mapa-do-dono.py                      → escreva em: scripts/gerar-mapa-do-dono.py
path: processos/gate-segredo-declarado.py                  → escreva em: scripts/gate-segredo-declarado.py
path: processos/herdado-da-main.py                         → escreva em: scripts/herdado-da-main.py
path: processos/prova-herdado-da-main.sh                   → escreva em: scripts/prova-herdado-da-main.sh
```

Ou no terminal, **se** a sua sessão tiver `GITHUB_TOKEN`:

```bash
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/.claude/rules/instanciacao-por-repo.md?ref=82523683a \
  > .claude/rules/instanciacao-por-repo.md
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/.claude/rules/regua-de-admissao.md?ref=82523683a \
  > .claude/rules/regua-de-admissao.md
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/.claude/rules/segredo-e-consumidor.md?ref=82523683a \
  > .claude/rules/segredo-e-consumidor.md
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/revisar-mapa.py?ref=82523683a \
  > scripts/revisar-mapa.py
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/scripts/varredura-de-segredos.mjs?ref=82523683a \
  > scripts/varredura-de-segredos.mjs
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/gerar-mapa-do-dono.py?ref=82523683a \
  > scripts/gerar-mapa-do-dono.py
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/gate-segredo-declarado.py?ref=82523683a \
  > scripts/gate-segredo-declarado.py
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/herdado-da-main.py?ref=82523683a \
  > scripts/herdado-da-main.py
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/prova-herdado-da-main.sh?ref=82523683a \
  > scripts/prova-herdado-da-main.sh
```

São **cópias de leitura**: o SSOT é o escritório e esta casa não as edita. Se a sua cópia tem
um adendo local declarado, preserve o adendo e troque só o corpo.

> **Esta carta não manda rodar nada dentro da árvore do escritório — e é regra minha, não
> preferência.** A D201 diz que cada casa roda na sua instância; a `ccev-sempre-vale-a-pena-site`
> mediu isso e escreveu no `CLAUDE.md` dela que o escritório não vem junto, e que por isso carta
> minha desse tipo era impossível de cumprir. Até 26/09 eu ensinava o atalho primeiro e a saída
> que funciona depois; agora vai só a que funciona em toda casa.

E **me diga**, pela sua caixa de saída, se nenhum dos dois caminhos rodar na sua sessão: o furo
é meu, não seu, e eu preciso medir em quantas casas ele vale antes de mandar a próxima onda.

## Como fechar

`STATUS: APLICADA` no topo, **ou** mova para `caixa-de-entrada/do-escritorio/processados/`.

_Escritório do MOU — 2026-09-26._
