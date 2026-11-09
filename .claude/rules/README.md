# Regras modulares do Escritório

Pasta das regras modulares do escritório — **lidas no boot de toda sessão** (referidas no `CLAUDE.md`; C36 nível 3). Regra nova sai do `CLAUDE.md` para cá quando o tema justifica corpo próprio; entra também na lista abaixo, no mesmo commit.

## Regras ativas
- `linguagem-e-ferramentas.md` (D159/D160)
- `ordem-normativa.md` (C36/C120)
- **`nomenclatura-repos.md`** (D186 — `<unidade>-<projeto>-<tipo>`, raiz primeiro)
- **`instanciacao-por-repo.md`** (D201 — hub/site/app não se co-montam com o NEGÓCIO da unidade)
- **`regua-de-admissao.md`** (25/08 — ESCRITÓRIO × CASA: *"atrapalha os demais projetos?"*, nunca *"é ato do dono?"*)
- **`segredo-e-consumidor.md`** (25/08 — mexer em segredo sem a lista de quem quebra é pedido inválido)
- **`credencial-vazada-e-do-dono.md`** (D219 — alertar · dar o risco · esperar; trocar é só dele, em todo repo)
- **`decisao-e-alcada.md`** (D202 alçadas A/B/C · D203 recortada pela D238 · **D222** o canal é o mapa · **D224** na tela dele só o que é dele · D228 produção)
- **`persona-da-governanca.md`** (D349, 28/10 — a governança agrada menos e faz mais; o escritório aplica primeiro em si)

## As 2 réguas desta pasta
**Teto em 2 metades (02/10; recalibrado em 13/10): kit ≤ 32.768 · casa ≤ 8.192 · soma ≤ 40.960** — o porquê em `escritorio-do-mou/processos/TETO-DAS-REGRAS-DE-BOOT.md`; medem o `teto_das_regras.py` da caixa de ferramentas e o `[regras]` do linter. **Mede-se sem os comentários HTML que começam a linha** (`<!-- … -->` na coluna 1): a história das regras (lápides, porquês, vacinas) fica no arquivo e não entra no boot (F0A-1, D353, 31/10). **O comentário no meio da linha entra no arranque** (medido em 31/10 no texto que a sessão recebe): comentário novo vai sempre em linha própria.
**Ponteiro:** estes arquivos descem byte-a-byte às casas (a casa só acrescenta, ao pé, uma linha de ponteiro aos adendos dela), então caminho relativo (`processos/…`) resolve em ZERO delas: cite o **nome** do arquivo + quem o guarda (*"no escritório"*) ou um caminho com o **nome do repo no 1º segmento**. Dente: `gate-ponteiro-de-regra-de-boot.py`.
