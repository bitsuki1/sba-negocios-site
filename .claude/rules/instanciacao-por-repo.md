> ⧉ **CÓPIA DE LEITURA** do `escritorio-do-mou` — **SSOT lá** (`escritorio-do-mou/.claude/rules/instanciacao-por-repo.md`); puxada em **2026-08-25**. Não editar aqui: mudança se faz no escritório e se republica.

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
- **SBA** ↔ **`site-sba-negocios`** — instâncias separadas.
- **Profinders** ↔ **`profinders-hub`** — separação Hub × Negócio (D195 + D201).
- **EDU** ↔ **`minhas-raizes-app`** — o app tem vida própria desde 21/08.
- **AVC** ↔ 3 auxiliares (`centro-alianca-hub`, `sampa-valley-site`, `alian-a-pelo-centro`) — cada um separado.
- **Rotary** ↔ **`rotary-roteiro-site`** — idem.

## Exceções (declaradas para não haver drift)
- **Atlas** ↔ `keepee-facilities` (org DEV, ~42 repos): a D187 fixa "OnSuite dev exclusivo do Atlas". Não é hub/site/app; é o **território de trabalho** do Atlas. D201 NÃO se aplica; o Atlas co-monta a org DEV.
- **`portfolio-automacoes`** — auxiliar do PORTFÓLIO (sem unidade dona única), regra especial D162 (sempre co-montado). Não é "hub da unidade"; é hub do escritório.
- **Passadas de PONTE** (mover conteúdo entre unidade↔auxiliar; auditoria de duplicidade) — instância CURTA, conduzida pelo escritório, pode co-montar os 2 pontualmente e morre no fim. É a exceção controlada, não o padrão.

## O canal entre o par (unidade↔auxiliar)
- **`caixa-de-saida/para-hub/`** (na unidade) ↔ **`caixa-de-entrada/do-hub/`** (no hub) — depósito, nunca escrita cruzada.
- Nomes por par: `para-<auxiliar>/` / `do-<auxiliar>/`.
- Contexto da unidade para o auxiliar mora no **`USO.md`** do auxiliar (a unidade escreve no seu USO.md quando a relação muda; o auxiliar lê como dado).
- O **escritório** é balcão único (D56) que despacha quando necessário.

## Vacinas
1. **Confusão de SSOT** — instância consulta o CLAUDE.md do outro pensando que vale como norma (D22 exige que seja DADO). Separação física resolve mecanicamente.
2. **Escrita cruzada** — o `.claude/settings.json` do auxiliar bloqueia por caminho quando a unidade não está no worktree.

Referência normativa: **DECISOES.md · D201**.

---
> **Nota do `sba-site` (2026-08-25):** a tabela de "Exemplos vivos" acima chama este repo de **`site-sba-negocios`** — nome que **não existe**. O repo real é **`sba-site`** e o nome proposto pelo D186 é `sba-negocios-site`. É o mesmo ponteiro fantasma do achado **A-1/A-452**. Correção é do escritório (SSOT lá); aqui fica só a glosa para ninguém montar pelo nome errado.
