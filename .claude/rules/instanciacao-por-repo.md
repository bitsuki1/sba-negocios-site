# Regra — INSTANCIAÇÃO POR REPO (D201, 2026-08-22) · hub/site/app NÃO se co-montam com o repo de negócio
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`). Vigência: ATIVO desde 2026-08-22.
> **Por que é regra de boot:** o dono deu esta ordem em 22/08 (verbatim: *"os hubs, sites, app, eles nao irao mais ser abertos com os projetos de negocios"*); precisa sobreviver à compactação, ser lida por qualquer instância nova.

## A regra
Um repo AUXILIAR sabor **USO/FERRAMENTA** (hub, site, app) **NÃO se co-monta** com o repo de **NEGÓCIO** da unidade dona. Cada um vive na sua própria instância.

## Como instanciar cada tipo

| Repo | Instância padrão co-monta… | NÃO co-monta |
|---|---|---|
| **Unidade de negócio** (`<unidade>-unidade-de-negocios`) | ela + `escritorio-do-mou` + `portfolio-automacoes` | os auxiliares dela |
| **Auxiliar USO** (hub/site/app de uma unidade) | ele + `escritorio-do-mou` + `portfolio-automacoes` | a unidade dona |
| **Escritório** (esta sessão-maestro) | ele sozinho (o resto lê como DADO co-montado quando preciso) | — |

## Exemplos vivos
- **SBA** ↔ **`sba-negocios-site`** — instâncias separadas. _(⚰️ 2026-09-04: esta linha dizia `site-sba-negocios`, nome que **nunca existiu como repositório** — é o nome do projeto na **Vercel**, copiado do painel de deploy. A casa pediu a correção em 25/08 (carta `rename-executado`) e ela ficou 10 dias de pé numa regra lida em TODO boot do portfólio. Cadeia real: `sba-site` → `sba-negocios-site` (25/08).)_
- **Profinders** ↔ **`profinders-hub`** — separação Hub × Negócio (D195 + D201).
- **EDU** ↔ **`minhas-raizes-app`** — o app tem vida própria desde 21/08.
- **AVC** ↔ 3 auxiliares (`avc-clube-site`, `avc-sampa-valley-site`, `avc-alianca-app` — ⚰️ nomes antigos `centro-alianca-hub`/`sampa-valley-site`/`alian-a-pelo-centro`, D186 24/08; corrigido 02/09, LD-10) — cada um separado.
- **Rotary** ↔ **`rotary-roteiro-site`** — idem.

## Exceções (declaradas para não haver drift)
- **Atlas** ↔ `keepee-facilities` (org DEV, **44 repos** — censo 2026-08-25, SSOT `portfolio/atlas/REPOS-DA-ORG-2026-08-25.md`; ⚰️ o "~42" daqui era número recitado de cabeça, A-459): a D187 fixa "OnSuite dev exclusivo do Atlas". Não é hub/site/app; é o **território de trabalho** do Atlas. D201 NÃO se aplica; o Atlas co-monta a org DEV.
- **`portfolio-automacoes`** — auxiliar do PORTFÓLIO (sem unidade dona única), regra especial D162 (sempre co-montado). É a **caixa de ferramentas/automações do portfólio**. **⚰️ NOMENCLATURA (D205, ordem do dono 24/08):** o apelido **"hub" para este repo está APOSENTADO** — "hub" designa só auxiliar de UNIDADE (ex.: `profinders-hub`); chamar `portfolio-automacoes` de "hub" causou colisão real na re-selagem Profinders. Chame-o pelo nome do repo (ou "a caixa de ferramentas"). Menção antiga "o hub (do escritório/portfólio)" em doc datado = leia como `portfolio-automacoes` (rastro, não reescrever).
- **Potencial Urbano — a plataforma fica JUNTO, por ordem dele** (24/08, verbatim: *"a plataforma… o projeto ainda precisa estar junto… arrumado, mas ainda junto"*). Exceção à D201 até ele dizer o contrário. _(⚠️ entrou só em 09/09: a ordem viveu 16 dias numa ata arquivada, fora desta lista de exceções — instância nova separaria o que ele mandou manter junto.)_
- **Passadas de PONTE** (mover conteúdo unidade↔auxiliar; auditoria de duplicidade) — instância CURTA do escritório co-monta os 2 e morre no fim. Exceção controlada, não padrão.

## O canal entre o par (unidade↔auxiliar)
- **`caixa-de-saida/para-hub/`** (na unidade) ↔ **`caixa-de-entrada/do-hub/`** (no hub) — depósito, nunca escrita cruzada.
- Nomes por par: `para-<auxiliar>/` / `do-<auxiliar>/`.
- Contexto da unidade para o auxiliar mora no **`USO.md`** do auxiliar (a unidade escreve no seu USO.md quando a relação muda; o auxiliar lê como dado).
- O **escritório** é balcão único (D56) que despacha quando necessário.

## Vacinas
1. **Confusão de SSOT** — instância consulta o CLAUDE.md do outro pensando que vale como norma (D22 exige que seja DADO). Separação física resolve mecanicamente.
2. **Escrita cruzada** — o `.claude/settings.json` do auxiliar bloqueia por caminho quando a unidade não está no worktree.

Referência normativa: **DECISOES.md · D201**.
