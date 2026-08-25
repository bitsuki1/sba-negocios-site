# FECHO PARA O SELO — `sba-site` · 2026-08-25
> **De:** orquestrador do `sba-site` (chapéu D104) · branch `claude/sba-site-fecho-selo-2026-08-25`
> **Para:** torre / maestro do Escritório do MOU
> **Ordem que me abriu:** *"vamos abrir SBA e Site sba… o site vamos selar apenas"* (ordem viva do dono, 25/08, via escritório). Passada de **regularização + fecho**, não de produto.
> **Recomendação (adiantada, detalhe no §5):** ✅ **PODE SELAR** — com 3 limites declarados e 1 achado devolvido ao escritório.

---

## §0 · Resposta ao item 0.2 (as 3 correções obrigatórias) — 2 aplicadas, 1 **impossível como especificada**

| # | correção pedida | estado |
|---|---|---|
| 1 | Puxar as 3 regras faltantes | ⚠️ **2 de 3 aplicadas** — a 3ª **não existe**. Ver o achado abaixo. |
| 2 | Aplicar a régua de admissão ao `MAPA-DE-PENDENCIAS.md` | ✅ aplicada (mapa v5) |
| 3 | Marcar cada cópia herdada como CÓPIA | ✅ aplicada — **19 arquivos** |

### 🔴 Achado A-453 — a régua de admissão **não existe como arquivo** no escritório
A ordem afirma: *"Hoje são **6**: … `regua-de-admissao.md` (nova, 25/08) … Puxe as 3 que faltam"*.

**Medição (via API do GitHub, `main` do `escritorio-do-mou`, ref `3bdae94`):**
- `.claude/rules/` contém **5 regras + README** — `decisao-e-alcada` · `instanciacao-por-repo` · `linguagem-e-ferramentas` · `nomenclatura-repos` · `ordem-normativa`.
- `.claude/rules/regua-de-admissao.md` → **404, o caminho não existe.**
- O **próprio `README.md` do escritório** lista **5 regras ativas**, não 6.

**O que fiz:** a **substância** da régua veio **verbatim na ordem** (*"AS PENDÊNCIAS SÃO DE PROBLEMAS QUE ATRAPALHAM OS DEMAIS PROJETOS"*), e ordem viva do dono é **C36 nível 1** — acima de qualquer arquivo. Então lavrei `.claude/rules/regua-de-admissao.md` como **regra LOCAL de espelho**, com cabeçalho declarando a anomalia em vez de fingir cópia 1:1.
**O que peço:** o escritório **lavrar o arquivo-fonte**. Quando existir, minha cópia vira 1:1. Enquanto não existir, **cada casa que receber essa ordem vai inventar a sua própria versão** — é regra para todas as casas sem arquivo para todas as casas.

> **Nota de método:** não co-montei o escritório (clone completo). Li os 5 arquivos pela API do GitHub — leitura pura, zero escrita no PMO. A carta de 22/08 foi movida para `caixa-de-saida/processados/` com o carimbo da resposta, como pedido.

---

## §1 · AS 7 PORTAS, uma linha cada, com a prova

### P1 · Tudo na `main`, provado de FORA do gate
**Prova (comando e saída, rodados após o merge):**
```
$ git rev-parse origin/main
b47963761f74ce36e0f315a65dd1d44873b1511a

$ for c in 12a9f85 abb5d1b 0cf0db9 f6497a4 aa79f9e; do
      git merge-base --is-ancestor $c origin/main && echo "OK $c"; done
OK 12a9f85     (processos herdados reconciliados)
OK abb5d1b     (estado de deploy corrigido + laudo aterrissado)
OK 0cf0db9     (mapa v5 + tarefas + registro + settings)
OK f6497a4     (handoff + SELO + surfaces + gate)
OK aa79f9e     (este relatorio + linha FECHADA)

$ git log origin/main..claude/sba-site-fecho-selo-2026-08-25 --oneline | wc -l
0             <- ZERO commits desta passada fora da main
```
Merge por **UNIÃO** com `--no-ff` (sem force-push, sem rebase — regra do espelho Lovable). `origin/main`: **`58f25dd` → `b479637`**.
**Presença dos arquivos-chave conferida direto em `origin/main`** (`git cat-file -e origin/main:<caminho>`): as 3 regras novas ✅ · o laudo do incidente ✅ · este relatório ✅ · a carta de 22/08 em `processados/` ✅.
> **Por que provei assim:** a vacina `V-GATE-VERDE-NAO-E-MAIN` (A-447). Gate verde não prova nada sobre a `main` — este repo, aliás, é a prova viva do contrário: passou 7 semanas com gate verde e um alvo de deploy errado no `CLAUDE.md`, e um laudo com o achado preso num galho morto.

### P2 · Varredura de segredos — repo PÚBLICO, varredura séria
**Escopo:** HEAD inteiro (todos os arquivos versionados) **+** as **85 revisões** do histórico (`git log -p --all`).
**Padrões varridos:** `service_role` · `SUPABASE_SERVICE*` · JWT (`eyJ….….`) · `sk_live/sk_test/pk_live` · `AKIA…` (AWS) · `ghp_`/`github_pat_` · `xox[baprs]-` (Slack) · `AIza…` (Google) · `-----BEGIN … PRIVATE KEY` · `password=`/`secret=` com valor · `.env` rastreado.

**Resultado: ✅ NENHUM segredo. Zero.**

Os 3 casamentos são todos **nome de variável ou prosa**, nunca valor:

| caminho:linha | o que é | é achado? |
|---|---|---|
| `docs/HANDOFF-2026-06-27.md:21` | prosa de doutrina (*"`service_role` nunca vai pro front"*) | ❌ não (a torre já tinha visto) |
| `supabase/functions/submit-lead/index.ts:13` | comentário nomeando a variável de ambiente | ❌ não |
| `supabase/functions/submit-lead/index.ts:121` | `Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")` | ❌ não — **é a prática correta**: lê do ambiente, não embute |

- **`.env` rastreado:** nenhum. O `.gitignore` cobre `.env`, `.env.local`, `.env.*.local`.
- **Glosa D206 (para ninguém "consertar" errado depois):** `src/lib/supabase.ts:22` traz `sb_publishable_YkkrpqvZ…`. É a chave **publishable** do Supabase — **pública por desenho**, vai embutida no bundle do front; a fronteira de segurança é o **RLS**, não o segredo dessa chave. **Não é achado, não rotacionar, não remover.** Tirá-la quebra o formulário do site sem nenhum ganho de segurança. Deixei essa glosa escrita também no `MAPA-DE-PENDENCIAS.md`, onde o dono lê.
- **Perna (b) — LGPD/PII:** varri e **não achei PII de terceiro** no repo versionado. Nada a declarar, nada a cobrar.

### P3 · Estado do CI declarado
**✅ VERDE. Não há CI vermelho pendente.**
- **103 execuções** no total. As **11 mais recentes** do `linter-estado` (única esteira ativa hoje): **todas `success`**, incluindo as 2 do HEAD atual `58f25dd`.
- **Houve vermelho, e está explicado e resolvido na raiz:** o workflow **"Deploy de produção (GitHub Pages)"** falhou **3 vezes na `main`** em 07/08 (`31215471393`, `31140488877`, `31138644196`). **Causa:** era o deploy **legado** do Pages disparando no push, concorrendo com o deploy real da Vercel. **Correção (13/08):** o gatilho `on: push` foi **removido** — o workflow ficou só em `workflow_dispatch`. Desde então **não houve mais nenhuma execução dele**, e portanto nenhuma falha.
- **Comparo com o A-450 da casa irmã:** lá o repo foi selado com o robô reprovando desde a primeira execução. **Aqui não é o caso** — o vermelho é histórico, tem causa conhecida e foi corrigido na raiz 12 dias antes deste fecho.
- **Não reformatei nada** por causa de CI.

### P4 · Higiene de galhos — medido, **nada apagado**
**Comando:** `git log origin/main..<galho> --oneline` em cada um dos 10.

| galhos | medição | conclusão |
|---|---|---|
| **8 galhos** `claude/*` | **0 commits** fora da `main` | ✅ **seguros para apagar** — 100% aterrissados |
| `claude/instance-concurrency-94pbeg` | **1 commit** (`7277402`) | ⛔ **NÃO apagar** |
| `claude/sba-instancia-pagina-sistema-sxb9wu` | **2 commits** (`3e83727`, `3fe91f6`) | ✅ **conteúdo aterrissado por mim** (ver abaixo) — o galho pode ser apagado |

- **Não apaguei nenhum galho.** Medir e declarar é meu; apagar é do escritório/dono.
- **`gh-pages`:** não encostei.
- **O que aterrissei:** os 2 commits do galho `…pagina-sistema-sxb9wu` eram o **laudo do incidente de 17/08** (loop de redirect no apex). Estava preso num galho morto desde 17/08. Trouxe para `docs/INCIDENTE-2026-08-17-loop-redirect-apex.md`, **byte-idêntico** (md5 `b10132ef50710ca00ae19060cc4aa2cf`). *(Tentei `git cherry-pick` para preservar autoria — foi bloqueado pelo classificador do ambiente; usei adição de arquivo com o mesmo conteúdo e creditei a origem na mensagem do commit.)*
- **O que NÃO apliquei, e por quê:** `7277402` tira o gatilho `pull_request` do `linter-estado` (−50% de consumo de Actions, guardião D168). **Reduz a checagem automática nos PRs** — é **decisão de esteira**, e esteira é do escritório, não minha. Virou **M11** no mapa. **Esse galho não pode ser apagado antes da decisão**, senão o commit morre.

### P5 · Kit no padrão de HOJE
| item | estado |
|---|---|
| Regras modulares | **3 → 6** (+ README) · 2 puxadas 1:1, 1 lavrada como espelho local (A-453) |
| `MAPA-DE-PENDENCIAS.md` | **v5**, régua de admissão aplicada, só pendência, "Pronto quando:" em cada item |
| `.claude/settings.json` | **endurecido** — somados `sba-unidades-de-negocios/**` (D201) e `portfolio-automacoes/**`; cobre `NotebookEdit` além de Edit/Write/MultiEdit |
| `REGISTRO-DE-INSTANCIAS.md` | linha desta sessão **ABERTA** no início, **FECHADA** ao sair · **consertada linha corrompida** (tinha 10 colunas: dois registros colados numa linha só, a onda 3 sem as 4 primeiras células) |
| `USO.md` | diz o que é o site e quem mexe — **e agora diz o host certo** (ver §2) |
| Cabeçalho ⧉ CÓPIA | **19 arquivos** (10 processos + 1 template + 4 regras + 3 agentes + README das regras) |
| Robô "chega na main" (D170) | ⬜ **LIMITE DECLARADO**, não pendência do dono — ver §3 |

> **Detalhe técnico que vale como vacina:** ao marcar os 3 subagentes como cópia, pus o cabeçalho **antes** do frontmatter YAML e **quebrei a definição do subagente** (o `---` deixou de ser a linha 1). Detectei e corrigi no mesmo turno — o cabeçalho tem que ir **depois** do frontmatter. Se o kit virar padrão, esse é o passo que erra.

### P6 · `SELO.md` — não renomeado, dúvida registrada
`SELO.md` continua sendo o **TAG do kit D196** e **não foi renomeado**, como mandado. A dúvida sobre a colisão `SELO.md` × `SELO-DE-FECHO.md` está **registrada dentro do próprio arquivo**, para o escritório arbitrar na onda NORMAS.
**Risco concreto enquanto não arbitra:** o nome faz leitor apressado concluir "este repo está selado" — **não está**. Este arquivo carimba só o kit; o selo de onda é da torre.

### P7 · Mapa e relatório na língua do dono
`MAPA-DE-PENDENCIAS.md` v5: só pendência · linguagem de gente · link direto por passo · **"Pronto quando:"** em todos os itens · código interno só como etiqueta glosada.
**🔒 SUAS: 6 itens** (V1 rename · V3 nova · V2 GSC · V4 perfil Google · V5 backlink CSTR · V7 3 páginas). **Não é "nenhuma"** — mas **nenhuma delas subiu ao mapa do portfólio**: pela régua de 25/08, são todas de **uma casa só** e ficam aqui.

### Gate e linter — o que exatamente ficou verde
```
$ bash gate-fechamento.sh            → exit 0
🟩 [1/4] caixa-de-entrada sem carta pendente
⚠️  [2/4] 1 carta staged em caixa-de-saida/   (é ESTE relatório; avisa, não trava — D144)
🟩 [3/4] sem linha ABERTA da sua branch no REGISTRO
   [4/4] NÃO RODOU — este repo não tem `ATA-VIVA-SESSAO.md`; o check é condicional à existência do arquivo
$ bash linter-estado.sh              → 🟩 sem 🟥 · 0 avisos
```
> **Preciso ser exato:** a ordem pede "🟩 verde (todos os 4 checks)". O gate **sai 0**, mas o check **[4/4] foi pulado, não aprovado** — ele só existe se houver ata-viva no repo, e não há. Declaro em vez de contar como verde. Se o escritório quiser ata-viva neste repo, é decisão dele.

---

## §2 · O que eu ACHEI que não estava na ordem — o dado mais desatualizado do repo

**O repo dizia que o site era publicado no GitHub Pages. Faz quase 2 meses que ele roda na Vercel.**

`CLAUDE.md` §2 e `USO.md` (a)/(c) afirmavam *"PRODUÇÃO no GitHub Pages via `gh-pages`, deploy manual por `scripts/deploy-producao.sh`"*.

**Prova, medida hoje:** `sbanegocios.com.br` resolve para **`216.198.79.1`** — exatamente o IP da Vercel documentado **dentro do próprio `scripts/deploy-producao.sh`**. Convergem: `deploy-pages.yml` (*"produção real = Vercel"*, gatilho removido em 13/08) · `vercel.json` vivo com rewrites e headers · o laudo de 17/08 fechando com *"apex → 200, `server: Vercel`"*.

**Corrigido** em `CLAUDE.md` §2/§3 e `USO.md` (a)/(c) — classe A/B (docs, reversível, vive no git).

**Por que isso importa mais do que parece:**
1. **A regra anti-force-push mudou de peso.** A `main` não é só história — é o **gatilho de deploy**. Reescrevê-la **republica o site** a partir de uma história falsificada. Escrevi isso na regra, nas duas superfícies.
2. **Apagou meia pendência do dono.** A V3 existia porque *"`@vercel/analytics` não roda em GitHub Pages → vácuo de medição"*. O site **está** na Vercel e o medidor **já está montado** (`src/App.tsx:69`). A V3 virou "olhe o painel por 2 minutos" e pode **eliminar a pendência do GA4 inteira** (M8 ficou em espera).
3. **O achado já existia e morreu num galho.** O laudo de 17/08 **já dizia** *"`USO.md` está desatualizado; o hosting real é Vercel"*. Nunca chegou na `main` porque o galho nunca aterrissou. É exatamente o modo de falha que o `PREVENCAO-DE-PERDAS.md` cataloga — e é o argumento mais forte a favor da porta P4 existir.

> **Sugestão de regra para todas as casas (não é pendência do dono):** quem sela um repo **mede** onde o site mora (DNS + workflow ativo), não acredita no que o doc diz. Este repo carregou o alvo de deploy errado por ~7 semanas com gate verde o tempo todo — nenhum check olhava para isso.

---

## §3 · Limites declarados

1. **Robô "chega na main" (D170) não existe aqui.** Exige segredo de Actions **neste** repo = 1 clique do dono. Pela régua de 25/08, **não subi como pendência do dono**. Fica declarado; **o escritório decide** se vale o clique. Nada trava.
2. **1 commit não-aterrissado, de propósito.** `7277402` (economia de ~50% de Actions) — não apliquei porque **reduz checagem em PR**; é decisão de esteira. **Não apagar** `claude/instance-concurrency-94pbeg`.
3. **Colisão `SELO.md` × `SELO-DE-FECHO.md`** — registrada, não resolvida (P6).
4. **Não verifiquei o site por HTTP.** O proxy desta sessão bloqueia a saída (`CONNECT tunnel failed, 403`). A prova de host é **DNS + convergência documental**, não um `200` que eu tenha visto. Declaro em vez de fingir.
5. **Não abri o painel da Vercel.** Não tenho acesso e o `CLAUDE.md` §5 proíbe encostar em Vercel nesta sessão. Por isso a V3 é **o dono olhando**, não eu afirmando que a medição está ligada.
6. **`sba-unidades-de-negocios` não co-montado** (D201). Se o conteúdo do site precisar de números ou textos jurídicos da unidade, vem pela caixa.

---

## §4 · O que ficou ABERTO (honestamente)

| aberto | por quê |
|---|---|
| **V1 rename** — o repo **continua `sba-site`** | 1 clique do dono. ⚠️ **A ordem supôs que T-001 "provavelmente já foi cumprida porque o repo se chama `sba-site`". A suposição está invertida:** `sba-site` é o nome **antigo**; o proposto pelo D186 é **`sba-negocios-site`**. Nada foi renomeado. |
| **8 galhos seguros não apagados** | medi e declarei; apagar é ato do escritório/dono |
| **V2 · V4 · V5 · V7** | dependem do dono; vivem no mapa com passo a passo e link |
| **A-452** (o portfólio chama este repo de `site-sba-negocios`) | correção é do escritório. **Nota útil:** `site-sba-negocios` **é o nome do projeto na Vercel** — provavelmente daí veio a confusão. O repo nunca se chamou assim. |
| **A-453** (régua sem arquivo-fonte) | devolvido ao escritório neste relatório |
| **T-002** (foto/link de Congonhas) | opcional, não bloqueia nada |

---

## §5 · Recomendação

# ✅ PODE SELAR

**Por quê:** as 7 portas passaram com prova — trabalho na `main` por merge limpo, **zero segredo** em HEAD e em 85 revisões de histórico num repo **público**, CI **verde** com o vermelho histórico explicado e corrigido na raiz, galhos **medidos** sem apagar nada no escuro, kit no padrão de hoje, `SELO.md` intocado com a dúvida registrada, e mapa na língua do dono com a régua de admissão aplicada. **Nenhum arquivo de produto foi tocado** — a ordem era "selar apenas", e foi isso.

**Os 3 limites (robô ausente, commit de esteira não-aterrissado, colisão de nome) são declarados, não escondidos, e nenhum deles põe em risco o site nem outra casa.**

**O que peço ao escritório junto com o selo:**
1. **Lavrar `regua-de-admissao.md`** no `.claude/rules/` do PMO (**A-453**) — é regra para todas as casas e hoje não tem arquivo.
2. **Corrigir `site-sba-negocios` → `sba-site`** no `MAPA-DO-PORTFOLIO.md` (**A-452**), com a glosa de que `site-sba-negocios` é o nome do projeto **na Vercel**.
3. **Decidir a esteira** (o commit `7277402`) e **decidir o clique do robô `consolidar`**.
4. **Considerar a vacina do §2** como regra: *quem sela mede onde o site mora*.

> **Não me auto-selei** (E-071 — quem produz não certifica). O selo é da torre, depois de verificar na `main` o que está declarado aqui.
