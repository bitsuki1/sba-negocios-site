# POLÍTICA DE VIGÊNCIA — anti-regressão por esquecimento

> **Vigência:** ATIVO desde 2026-06-20 — cravado pelo MOU como princípio inegociável: "tudo que não for usar é EXCLUÍDO ou TAGUEADO INATIVO; nada esquecido entre os vivos".
> **Origem:** D111 (2026-06-20) — meta-doutrina que rege todos os eixos do P-012.
> **Casa com:** D24 (nada se descarta sem rastro), D15 (anti-inflação), D26 (destravar > catalogar).
> **⚠️ ESCOPO DO GATE MECÂNICO (declarado 2026-07-03, achado A-281/U-7 — antes a política prometia mais do que o gate cobria):**
> o `check_vigencia()` do `fechar-instancia.py` varre os `.md` de **TOPO** de `processos/` e `referencia/` (não-recursivo,
> por desenho: custo×ruído). **Subpastas** têm regime próprio: `_historico/`+`_legado/` = arquivadas por construção ·
> `biblioteca/corpus/**` = corpus datado (isento) · `templates/` = moldes (isentos) · **demais subpastas** (`campanha-adequacao/`,
> `drive/`, `escrutinio-*/`) = carimbadas em lote 2026-07-03; arquivo NOVO nelas deve nascer com cabeçalho (disciplina,
> não gate). Tornar o gate recursivo = decisão futura registrada em A-281.

## Por que existe (o problema que resolve)

O modo-de-falha estrutural do escritório é a **regressão por esquecimento**: documento criado, processo desenhado, mecanismo armado — depois superado por outro, mas o original FICA na superfície ativa. Próxima instância abre, lê o documento morto, age sobre ele. Drift.

Exemplos rastreados pelos 3 escrutinadores (2026-06-20):
- `MELHORIAS-A-REDISTRIBUIR.md` vazia há semanas — falso controle.
- `processos/escrutinio-identidade/` decapitado (achados sem laudo, sem README).
- Dossiês `portfolio/<unidade>.*.md` na raiz + cópia em `_legado/` — sem rótulo, leitor pega o errado.
- `MAPA-DE-ALTO-NIVEL.md` nasceu porque `MAPA-DO-PORTFOLIO.md` "não estava servindo" — dois mapas concorrendo.
- `doutrina/` vazia + `.claude/rules/` vazia — duas pastas reservando o mesmo papel.

Esses não são problemas individuais — são UM problema: **falta de rótulo de vigência declarado**.

## As 4 classes de vigência

Todo arquivo `.md` (e pasta declarada em manifesto) em `processos/`, `referencia/`, `portfolio/<unidade>/`, `cadastro/`, raiz do escritório carrega rótulo de vigência:

| Classe | Significado | Onde mora | Cabeçalho exigido |
|---|---|---|---|
| **ATIVO** | Vivo, em uso, fonte de verdade. Default. | Superfície de leitura ativa. | `> **Vigência:** ATIVO desde AAAA-MM-DD — <razão curta>` |
| **INATIVO** | Preservado mas NÃO consultar como verdade. Substituído, em pausa, ou aguardando evento. | Pode ficar na superfície ativa com cabeçalho INATIVO + ponteiro para a fonte viva. Se ninguém precisa do ponteiro, mover para `_legado/`/`_arquivo/`. | `> **Vigência:** INATIVO desde AAAA-MM-DD — substituído por <caminho da fonte viva>; preservado para <razão>` |
| **ARQUIVADO** | Preservado em `_arquivo/` ou `_legado/` (D24); fora da superfície de leitura ativa. Histórico. | `<pasta>/_legado/` ou `<pasta>/_arquivo/` ou `docs/historicos/`. | `> **Vigência:** ARQUIVADO desde AAAA-MM-DD — <razão>; contexto vivo em <ponteiro se houver>` |
| **EXCLUÍDO** | Removido fisicamente via `git rm`. Raros casos: placeholder vazio sem valor, duplicata exata, segredo vazado. | Não existe (fora do disco). Rastro só no histórico git. | Justificativa explícita em `DECISOES.md` no commit. |

## Regras

1. **Default é ATIVO.** Documento criado entra ATIVO automaticamente. Mudança de vigência = ato consciente, com data e razão.
2. **EXCLUÍDO é último recurso.** D24 diz "nada se descarta sem rastro". Default é INATIVO ou ARQUIVADO. EXCLUÍDO exige:
   - justificativa em DECISOES com 1 entrada datada;
   - mensagem de commit explícita ("EXCLUÍDO: <arquivo> — razão");
   - confirmação de que o conteúdo não tem valor histórico (placeholder vazio sim; depósito de outra instância NÃO).
3. **INATIVO ≠ ARQUIVADO.** INATIVO fica visível na superfície ativa (cabeçalho declara) porque alguém ainda precisa do PONTEIRO. ARQUIVADO some da superfície ativa (move para `_legado/`/`_arquivo/`).
4. **Mudança de vigência é ato declarado.** Não é silencioso. Cabeçalho do arquivo muda + commit explícito + se for material, entrada no `CODEX-DOS-PROCESSOS.md` (dialético).

## Gate mecânico (no `processos/fechar-instancia.py`)

Em transição (warning → fail):
- **Modo warning (até 2026-07-15):** arquivo `.md` em pasta declarada ativa sem linha `> **Vigência:** ...` → log de aviso, não bloqueia.
- **Modo fail (a partir de 2026-07-15):** mesmo arquivo sem vigência → fail no fechar-instancia.
- **Sempre:** `git rm` de qualquer `.md` sem justificativa em DECISOES no mesmo commit → fail. Cinto e suspensório contra "limpeza por engano".

## TESE / ANTÍTESE / CONCILIAÇÃO / VACINA (dialética desta política)

- **TESE:** vigência obrigatória + 4 classes + gate mecânico → próxima instância NUNCA confunde fonte viva com fóssil.
- **ANTÍTESE:** pode virar burocracia. Cabeçalho em todo arquivo é ritual; se ninguém atualiza, mente.
- **CONCILIAÇÃO (provisória):** começar em modo warning (3 semanas), virar fail só após 1 onda de adequação completa. Cabeçalho tem só 1 linha — fricção mínima. Mudança silenciosa de vigência (sem cabeçalho/commit) → gate pega.
- **VACINA:** já tivemos `MELHORIAS-A-REDISTRIBUIR.md` vazio E `escrutinio-identidade/` decapitado E `doutrina/` placeholder confuso — TODOS eram evitáveis com vigência + dialética obrigatórios. Não reafirmar "documento vivo por inércia".

## Onde a política se aplica HOJE (boot 2026-06-20)

Não retroativo em massa — aplicado **a partir da data de cravação** (2026-06-20). Documentos pré-existentes ganham vigência ATIVO por default; mudança só quando o arquivo for tocado materialmente OU quando a campanha de adequação (DE-12) passar por ele. Excepção: arquivos identificados pelos 3 escrutinadores como fóssil declarado entram em INATIVO/ARQUIVADO imediatamente quando consolidados (ver Eixo 4 de P-012).
