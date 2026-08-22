# SELO DO KIT DE GOVERNANÇA — sba-site (D196)
> **⚠️ Isto NÃO é um selo de fecho de onda (D194).** A unidade SBA Negócios **ainda NÃO está selada** — ela consta como onda pendente na `escritorio-do-mou/SELOS-DE-FECHO.md` §"Fila".
> Este arquivo é o **TAG do KIT** (D196): marca que este repo-app carrega o **kit-repo-app** aplicado — identidade + canal de tarefas + gate + registro + settings + robô "chega na main" (quando aplicável).
> Quando a unidade SBA for selada (onda fechar), este arquivo GANHA a seção "Selo de Onda" com o nome do selo emitido em `SELOS-DE-FECHO.md`. Até lá, só o kit.

## Estado do KIT (medido 2026-08-22)

| item | arquivo | estado | observação |
|---|---|---|---|
| identidade + contrato D195 + regras de espelho | `CLAUDE.md` | ✅ presente | criado nesta onda |
| canal de tarefas (a "API/caixa" do dono, D195) | `TAREFAS-DO-DONO.md` | ✅ presente | criado nesta onda (T-001 = rename D186 aguardando o dono) |
| porta de fecho | `gate-fechamento.sh` | ✅ presente (universal ᵁ) | herdado do kit-clone A-206; governança a MAIS que o `gate-app.sh` enxuto — aceita pela variância ᵁ do `GOVERNANCA-REPOS-APP.md` |
| linter de estado | `linter-estado.sh` | ✅ presente | herdado do kit-clone A-206 |
| registro entre sessões | `REGISTRO-DE-INSTANCIAS.md` | ✅ presente | criado nesta onda; linha ABERTA da governança em curso |
| TAG do kit | `SELO.md` | ✅ presente | este arquivo |
| deny anti-escrita fora do escopo | `.claude/settings.json` | ✅ presente | bloqueia `escritorio-do-mou/**` e `keepee-facilities*/**` |
| robô "chega na main" (D170) | `.github/workflows/consolidar.yml` + `consolidar.sh` | ⬜ **falta** | não faz parte desta onda — precisa de segredo de Actions por repo; fica na lista da próxima varredura (ver `GOVERNANCA-REPOS-APP.md`) |

## Como este selo evolui
- **Hoje:** SBA em fila (não selada). Este arquivo carimba só o **KIT D196**.
- **Amanhã (quando a unidade SBA for selada):** o escritório emite o selo de onda em `SELOS-DE-FECHO.md` e este arquivo ganha a seção **"Selo de Onda"** com o nome do selo, a data e a prova. Não substitui, complementa.
- **Sempre:** um repo-app fora do `GOVERNANCA-REPOS-APP.md` = achado a fechar (o registro-garantia é a rede que não deixa esquecer).
