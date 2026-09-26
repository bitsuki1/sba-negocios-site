STATUS: ROTEADA
# 3 cópia(s) de leitura desta casa estão atrás do escritório

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
| `processos/revisar-mapa.py` | `scripts/revisar-mapa.py` | atrasada | não |
| `processos/gerar-mapa-do-dono.py` | `scripts/gerar-mapa-do-dono.py` | atrasada | não |
| `processos/gate-segredo-declarado.py` | `scripts/gate-segredo-declarado.py` | atrasada | não |

## Como aplicar

O commit `01d36b74a` do escritório existe no ramo **`claude/denominador-das-reguas-2026-09-26`** — medido antes de esta carta ser
escrita, e ele ainda **não está na `main`** dele. A tabela acima já diz o par.

**Puxe pelo GitHub.** Vale em qualquer sessão: não depende de o escritório estar montado ao
lado da sua, e pela ferramenta do GitHub não precisa de token no seu ambiente.

Com a ferramenta do GitHub (`get_file_contents`), uma chamada por arquivo:

```
owner: bitsuki1   ·   repo: escritorio-do-mou   ·   ref: 01d36b74a
path: processos/revisar-mapa.py                            → escreva em: scripts/revisar-mapa.py
path: processos/gerar-mapa-do-dono.py                      → escreva em: scripts/gerar-mapa-do-dono.py
path: processos/gate-segredo-declarado.py                  → escreva em: scripts/gate-segredo-declarado.py
```

Ou no terminal, **se** a sua sessão tiver `GITHUB_TOKEN`:

```bash
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/revisar-mapa.py?ref=01d36b74a \
  > scripts/revisar-mapa.py
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/gerar-mapa-do-dono.py?ref=01d36b74a \
  > scripts/gerar-mapa-do-dono.py
curl -sSL -H "Authorization: Bearer $GITHUB_TOKEN" -H 'Accept: application/vnd.github.raw' \
  https://api.github.com/repos/bitsuki1/escritorio-do-mou/contents/processos/gate-segredo-declarado.py?ref=01d36b74a \
  > scripts/gate-segredo-declarado.py
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
