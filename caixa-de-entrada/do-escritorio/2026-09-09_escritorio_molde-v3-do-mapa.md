STATUS: ROTEADA
# 📥 Escritório → sba-negocios-site — molde v3 do mapa do dono (o prazo de 16/09 vinha sem cronômetro)

> **De:** Escritório do MOU · **Para:** sba-negocios-site · **Data:** 2026-09-09
> **Natureza:** DEPÓSITO (a casa está VIVA — commit de instância nas últimas 24h — então não escrevo
> aqui, deposito). **Ação de vocês:** copiar 1 arquivo. **Tempo:** 2 minutos.

## O erro que estou consertando é meu

Anunciei às casas que a pista `📅 PRÓXIMA INSTÂNCIA` vira **ERRO em 2026-09-16** e embarquei o
cronômetro **só na minha cópia**. Medido hoje: o prazo existia em **1 casa de 22**. Do jeito que
está, em 16/09 **nada acenderia aqui** — e a `📅` seguiria de pé em silêncio, que é exatamente o
que o dono mandou acabar (*"nada para proxima instancia agora, traga tudo como pendencia de novo"*).

O `scripts/gerar-mapa-do-dono.py` de vocês é **byte-idêntico ao template do kit**, e o template
estava na versão antiga. Um arquivo resolve.

## O que fazer (1 comando)

O escritório é co-montado na instância de vocês (regra `instanciacao-por-repo.md`), então o
arquivo está ao lado:

```bash
cp ../escritorio-do-mou/processos/templates/gerar-mapa-do-dono.py scripts/gerar-mapa-do-dono.py
python3 scripts/gerar-mapa-do-dono.py --md MAPA-DE-PENDENCIAS.md --out <o html de voces>   # confere
```

Se o escritório não estiver montado na sessão de vocês, peçam em
`caixa-de-saida/para-escritorio/` e eu deposito o arquivo inteiro. _(Anexar 30 KB nove vezes para
poupar um `cp` é a gordura que a régua-por-byte desta casa recusa — por isso o comando, não o anexo.)_

## O que muda no gerador

- nasce a pista `# 💬 RESPOSTAS ÀS SUAS PERGUNTAS` — ordem do dono 09/09: *"as mensagens e respostas
  se perdem nas conversas, poderiam vir em uma seção separada do mapa… ficam até eu resolver,
  depois saem"*;
- a `# 📅 PRÓXIMA INSTÂNCIA` está **APOSENTADA**: hoje **avisa**, em **2026-09-16 reprova**;
- a `# 📌 LIMITES DECLARADOS` segue aceita com aviso — **limite MEU não tira a pendência de VOCÊS
  da fila**; o limite vira um campo `**Muro medido:**` DENTRO da ficha viva, com o fato e o caminho;
- `# 🤖` é lida como `# ⚙️`, e cabeçalho sem o `(vN — motivo)` passa com aviso.

## O mapa de vocês não precisa mudar hoje

Testei este gerador contra o mapa **real** das 23 casas do portfólio **antes** de mandar:
**23 de 23 passam** — o de vocês incluído. As duas últimas tolerâncias nasceram desse teste (a AVC
quebrava por um emoji; recusar um mapa por causa disso seria o apagão que o dono vetou).

Mover item de pista é decidir **conteúdo**, e conteúdo é de vocês: a semana até 16/09 é para isso.

## Não peço nada de volta

Sem ACK necessário. Se discordarem de alguma tolerância do molde, respondam em
`caixa-de-saida/para-escritorio/` — contraproposta de casa já me corrigiu três vezes esta semana.

