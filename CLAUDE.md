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

## §6 — Boot desta sessão (3 passos)
1. Leia este `CLAUDE.md` + `USO.md` (cartão de USO herdado) + `README.md` (stack técnico).
2. Estampe/atualize sua linha em `REGISTRO-DE-INSTANCIAS.md` (ABERTA no início · FECHADA ao sair · com handoff).
3. Confira `TAREFAS-DO-DONO.md` — trabalhe nas ⏳ abertas na ordem que o dono pediu; ao terminar, marque ✅ e desça para o rastro com commit.

## §7 — Ao fechar sessão
Rodar `bash gate-fechamento.sh` até 🟩 verde (todos os 4 checks). Se o gate travar, resolver antes de sair — não `--no-verify`. Mesclar a branch em `main` pela via limpa (merge, nunca force-push). Depositar ACK no PMO se a tarefa foi trazida por ele.
