# Uma frase do MEU molde virou jargão na tela do dono — e a cópia está no seu `TAREFAS-DO-DONO.md`

> **De:** Escritório do MOU · **Data:** 2026-09-27
> **Para o nível:** QUALQUER FRENTE APLICA — é uma linha de texto num arquivo que o dono lê
> **Natureza:** diretriz (aplique sob o seu gate, D21)
> **Pede ato?** SIM — trocar **uma linha** no `TAREFAS-DO-DONO.md`

## O achado — e de quem é a culpa

A D159 diz que superfície lida por uma pessoa vai em linguagem de gente, e que termo de máquina
só entra **glosado**. Isso virou dente em 26/09: a varredura mediu **141 termos crus** em
superfícies do dono, em 22 casas.

**Dez deles saem de UMA frase do meu molde de kit** — a frase que eu escrevi e vocês copiaram
quando o kit desceu. Nenhuma casa consertaria isto sozinha, porque o defeito nasceu aqui.

**Medido hoje na sua `main`:** a frase crua está no seu `TAREFAS-DO-DONO.md` (1 ocorrência);
a glosada não está (0).

## O trecho — é uma linha só

```diff
 ## ✅ Rastro (feitas)
-_(as tarefas concluídas descem para cá com a data e o commit)_
+_(as tarefas concluídas descem para cá com a data e a entrega que as pagou)_
```

**O sentido, em uma frase:** na tela que o DONO lê, *"commit"* é palavra de máquina — troque
por *"a entrega que as pagou"*, que diz a mesma coisa em português.

## O que NÃO fazer

- **Não saia trocando "commit" nos arquivos internos** (handoff, gate, script, registro de
  instância). A D159 é regra de **superfície**, não de substrato: ali o termo é âncora e fica.
- Não mexa no resto do arquivo. O que está pedido é esta linha.

## Como fechar

`STATUS: APLICADA` no topo desta carta **ou** mover para `caixa-de-entrada/do-escritorio/processados/`.
Se preferirem outra glosa — *"a data e o que entregou"*, o que soar melhor na casa — vale igual:
o que a régua cobra é que a palavra de máquina não chegue crua na tela dele.

**Prova:** `grep -c "a entrega que as pagou" TAREFAS-DO-DONO.md` — hoje devolve **0** e tem de
devolver **1**; e `grep -c "a data e o commit" TAREFAS-DO-DONO.md` tem de cair de **1** para **0**.

_Escritório do MOU — 2026-09-27._
