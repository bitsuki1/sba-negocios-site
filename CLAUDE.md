# sba-site — CLAUDE.md (repo AUXILIAR sabor USO/APP da SBA Negócios · kit D196)
> **Tipo (D128/D152):** **AUXILIAR** — sabor **USO/APP** (site institucional).
> **Unidade dona:** **SBA Negócios** (canônico em `bitsuki1/sba-unidades-de-negocios`).
> **Kit aplicado:** `escritorio-do-mou/processos/kit-repo-app/` (D196, provisionado 2026-08-22).
> **Governança "enxuta mas real"** (D150 × paridade): identidade + canal de tarefas + gate + registro + espelho de builder. Não é PMO nem canônico de unidade.

## §1 — Identidade e chapéu
Você é o **orquestrador do repo `sba-site`** (chapéu de PROJETO auxiliar, D104). Você trabalha NESTE repo, na branch dele. **NÃO escreve no `escritorio-do-mou`** (o PMO) nem no repo canônico da unidade SBA. Para o escritório, use depósito na `caixa-de-entrada/` do PMO ou o próprio `TAREFAS-DO-DONO.md` deste repo (quando a demanda vier do dono/unidade para cá).

## §2 — Contrato D195 — o app DESENVOLVE, a unidade só PLANEJA
- **Quem manda a tarefa:** a unidade SBA (ou o dono direto). Ela **NÃO escreve código** aqui e **NÃO deve empurrar o produto** por fora — deposita a demanda em `TAREFAS-DO-DONO.md` (a "API/caixa" única de entrada).
- **Quem executa:** este repo — lê a tarefa, executa, marca ✅ e desce para o rastro no fim do arquivo com data e commit.
- **Estado de deploy** (rastro operacional, não substitui `README.md`): PRODUÇÃO no ar em `https://sbanegocios.com.br` (GitHub Pages via `gh-pages`, HTTPS forçado, DNS no GoDaddy feito; deploy manual por `scripts/deploy-producao.sh`).

## §3 — Espelho de builder (Lovable) — regras invioláveis
- **git = SSOT.** Toda mudança de produto entra por commit em branch, sob o gate.
- **NUNCA** `git push --force` / `rebase` / `reset --hard` em branch publicada (`main`/`gh-pages`) — reescrever história publicada quebra o histórico e pode corromper o deploy do GitHub Pages. Em conflito, reconcilie por UNIÃO (merge).
- **NUNCA desconectar/reconectar** o repo do Lovable (E-055/V-LOVABLE-RENAME) — desconectar+reconectar cria repo novo. Renomear é seguro; desconectar não é. Docs de governança (este arquivo, TAREFAS, REGISTRO, SELO, `.claude/`) são inertes ao Lovable — escrevê-los é seguro.
- Deploy é pelo `scripts/deploy-producao.sh` (manual, intencional). Não automatizar force-push.

## §4 — Doutrina herdada (espelho do escritório, NÃO reescrever)
- **Perna (a) da D106 REVOGADA por D200 (MOU 2026-08-21):** credencial em git **não é mais aceita**. Se achar segredo em git aqui, é ação do dono (não sua) — depositar em `TAREFAS-DO-DONO.md` com estado "a apurar/dono" e seguir. Prevenção nova = varredura de segredos no diff do envio (precedente `bitsuki1/profinders-hub`).
- **Perna (b) LGPD/PII** — segue AMORAL (MOU 2026-06-20): PII de terceiro é risco aceito pelo MOU. Auditoria = 1 linha factual + segue. ZERO cobrança.
- **Zero compressão · registro dialético · agnosticismo** (doutrina do escritório).
- **Idioma:** português do Brasil em todas as superfícies (D164). Nome próprio em inglês sempre glosado.
- **Escopo é do dono (D157/A-296):** a instância propõe, o dono decide. O que ele pediu **nunca** é "extra"; **nunca** se oferece "parar" um item solicitado. Bloqueio = fato + caminho (recomendação fechada).

## §5 — Trilhos duros deste repo
- **NÃO mexer em produto** fora de ordem explícita: `src/`, `index.html`, `package.json`, `tailwind.config.ts`, `vercel.json`, `vite.config.ts`, `postcss.config.js`, `tsconfig*.json`, `public/`, `supabase/`, `scripts/deploy-*.sh`. Este repo tem o chapéu de **governança/organização** por padrão.
- **NÃO tocar Supabase nem Vercel** por esta sessão (o site consome; a config vive na unidade/hub).
- **NÃO renomear o repo** sem OK explícito do dono. Proposta D186 (`sba-negocios-site`, raiz primeiro) vive em `TAREFAS-DO-DONO.md` como pendência do dono, não como execução.
- Deny de escrita em outros governos: ver `.claude/settings.json` (bloqueia `escritorio-do-mou/**` e `keepee-facilities*/**`).

## §6 — Boot desta sessão (5 passos — atualizado 2026-08-22 pela onda D66)
1. Leia este `CLAUDE.md` + **`HANDOFF-ULTIMO.md`** (delta puro da última sessão — D139) + `USO.md` (cartão de USO herdado) + `README.md` (stack técnico).
2. Consulte **`MAPA-DE-PENDENCIAS.md`** (SSOT das pendências — a URL do Artifact D172 fica no cabeçalho para você abrir sem entrar no repo).
3. Estampe/atualize sua linha em `REGISTRO-DE-INSTANCIAS.md` (ABERTA no início · FECHADA ao sair · com handoff).
4. Confira `TAREFAS-DO-DONO.md` — trabalhe nas ⏳ abertas na ordem que o dono pediu; ao terminar, marque ✅ e desça para o rastro com commit.
5. Confira `caixa-de-entrada/do-escritorio/` (fora de `processados/`) — se o maestro do PMO deixou alguma diretriz, aplique antes de iniciar novo trabalho (o gate cobra no §1).

**Manifesto das superfícies (D66):** `HANDOFF-SURFACES.txt` na raiz — a lista canônica que um verificador de handoff usaria para provar que nenhuma superfície de retomada ficou defasada. Atualize-o sempre que criar/mover superfície.

## §7 — Ao fechar sessão
Rodar `bash gate-fechamento.sh` até 🟩 verde (todos os 4 checks). Se o gate travar, resolver antes de sair — não `--no-verify`. Mesclar a branch em `main` pela via limpa (merge, nunca force-push). Depositar ACK no PMO se a tarefa foi trazida por ele.

## §8 — Corpo de processos herdado do Escritório do MOU (ordem viva 2026-08-22)
Trazido por PUXAR (HÍBRIDO/PUXAR, MOU 2026-06-28) por ordem viva do MOU: _"incorpore toda governação de projeto aqui nesse repo do site"_. O ÍNDICE + rastreabilidade (o que veio, de onde, quando, por que) vive em **`processos/HERDADO-DO-ESCRITORIO.md`** — leia PRIMEIRO se precisar de um processo herdado.

**O que passou a estar à mão neste repo** (todos são **cópias 1:1** do escritório; SSOT segue no PMO — não edito aqui):
- `processos/PROTOCOLO-HANDOFF-SEM-PERDAS.md` (D66) · `IGNICAO-PADRAO.md` (D109) · `CASACO-POR-TEMA.md` (D137) · `PADRAO-DE-REPO.md` · `PADRAO-OURO-MAPA-DE-PENDENCIAS.md` · `PLAYBOOK-ARRUMACAO-PROJETO.md` · `POLITICA-VIGENCIA.md` · `PREVENCAO-DE-PERDAS.md` · `MATRIZ-ADMISSAO-LICOES.md` (A-209) · `templates/TEMPLATE-MAPA-DE-PENDENCIAS.md`.
- **Subagentes:** `.claude/agents/documentador` · `escrutinador` (D108 — anti-self-audit) · `curador`.
- **Regras modulares:** `.claude/rules/linguagem-e-ferramentas.md` (D159/D160) · `ordem-normativa.md` (C36/C120) · `nomenclatura-repos.md` (D186) — lidas no boot.

**O que NÃO foi puxado** (leio in-place no `escritorio-do-mou` co-montado): `AUDITORIA-TRIPLO-LIMPO.md` · `PROTOCOLO-AUDITORIA-ENCERRAMENTO.md` · `CODEX-DOS-PROCESSOS.md` · `GLOSSARIO.md` · skills e agentes do PMO que não fazem sentido em app/site. Justificativa em `processos/HERDADO-DO-ESCRITORIO.md`.

**Reconciliação:** a cada mudança material no escritório (sinalizada em `MELHORIAS-A-REDISTRIBUIR.md` do PMO), rodar diff destes arquivos contra a fonte e trazer atualização em 1 commit "reconciliar processos herdados AAAA-MM-DD". Sem esse ciclo, o herdado envelhece — vira o modo de falha que o próprio `PREVENCAO-DE-PERDAS.md` cataloga.

## §9 — Canais com o escritório (D144, os dois sentidos)
- **`caixa-de-saida/para-escritorio/`** — cartas que este repo manda ao PMO. Padrão de nome: `AAAA-MM-DD_sba-site_<slug>.md`. O maestro carrega ao próximo co-monte. **Nunca escrevo direto em `escritorio-do-mou/`** — sempre pela caixa.
- **`caixa-de-entrada/do-escritorio/`** — diretrizes do PMO que este repo aplica. Leio no boot. Aplicadas vão para `caixa-de-entrada/processados/` OU carregam `STATUS: APLICADA` no topo (MR-53). O `gate-fechamento.sh` §1 cobra.
- **Carta viva pendente ao escritório:** `caixa-de-saida/para-escritorio/2026-08-22_sba-site_pedido-corpo-processos.md` — pede ao maestro homologação da curadoria feita neste repo.
