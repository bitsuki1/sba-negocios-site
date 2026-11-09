# Regra — INSTANCIAÇÃO POR REPO (D201, 2026-08-22) · hub/site/app NÃO se co-montam com o repo de negócio
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`). Vigência: ATIVO desde 2026-08-22.
<!-- > **Por que é regra de boot:** o dono deu esta ordem em 22/08 (verbatim: *"os hubs, sites, app, eles nao irao mais ser abertos com os projetos de negocios"*). -->

## A regra
Um repo AUXILIAR sabor **USO/FERRAMENTA** (hub, site, app) **NÃO se co-monta** com o repo de **NEGÓCIO** da unidade dona. Cada um vive na sua própria instância.

## Como instanciar cada tipo

| Repo | Instância padrão monta… | NÃO monta |
|---|---|---|
| **Unidade de negócio** (`<unidade>-unidade-de-negocios`) | ela + `portfolio-automacoes` (D162) | os auxiliares dela |
| **Auxiliar USO** (hub/site/app de uma unidade) | ele + `portfolio-automacoes` (D162) | a unidade dona |
| **Escritório** (esta sessão-maestro) | ele sozinho; o resto lê como DADO | — |

⚠️ **O escritório NÃO vem montado ao lado — medido em 2 casas** (CCEV-site 11/09, Keepee 20/09). Ele **chega por PR e pela caixa**: confira `ls -d ../*/` antes de confiar, e carta que manda `git -C ../escritorio-do-mou …` é inexecutável — devolva pela **caixa de saída da sua casa para o escritório**.

⚠️ **O `.claude/settings.json` bloqueia por caminho numa sessão de um repositório só; com vários repositórios montados, nem gancho nem bloqueio do repositório valem** (documentação oficial, lida em 31/10). A cerca é a separação física; na sessão com vários montados, segura a doutrina.

## Exemplos vivos — cada um na SUA instância
**SBA** ↔ `sba-negocios-site` · **Profinders** ↔ `profinders-hub` (Hub × Negócio, D195).
<!-- _(⚰️ arquivados em 03/10/2026, ficam como exemplo da regra: `minhas-raizes-app` (EDU), `avc-clube-site` · `avc-sampa-valley-site` · `avc-alianca-app` (AVC), `rotary-roteiro-site` (Rotary).)_ -->
<!-- _(⚰️ `site-sba-negocios` era projeto na Vercel, nunca repo — A-666.)_ -->

## Exceções (declaradas para não haver drift)
- **Atlas** ↔ `keepee-facilities` (org DEV; quantos repos, diz o censo `REPOS-DA-ORG-2026-08-25.md` no escritório — número recitado envelhece: "~42" e "44", A-459): a D187 fixa "OnSuite dev exclusivo do Atlas". Não é hub/site/app; é o **território de trabalho** do Atlas. D201 NÃO se aplica; o Atlas co-monta a org DEV.
- **`portfolio-automacoes`** — auxiliar do PORTFÓLIO (sem unidade dona), regra D162 (sempre ao lado): a **caixa de ferramentas**. **⚰️ D205 (24/08): o apelido "hub" está APOSENTADO aqui** — "hub" é só auxiliar de UNIDADE. Chame-o pelo nome do repo.
- **Potencial Urbano — a plataforma fica JUNTO, por ordem dele** (24/08, verbatim: *"a plataforma… o projeto ainda precisa estar junto… arrumado, mas ainda junto"*). Exceção à D201 até ele dizer o contrário.
- **Passadas de PONTE** (mover conteúdo unidade↔auxiliar) — instância CURTA do escritório co-monta os 2 e morre no fim. Exceção controlada, não padrão.

## O canal entre o par (unidade↔auxiliar)
- **`caixa-de-saida/para-<auxiliar>/`** (na unidade) ↔ **`caixa-de-entrada/do-<auxiliar>/`** (no auxiliar) — depósito, nunca escrita cruzada. Medidos: a CCEV usa `para-site/` ↔ `do-ccev/`; o `avc-sampa-valley-site` usa `para-avc/` (⚰️ `para-hub/` não existe em casa nenhuma — A-666).
- Contexto da unidade para o auxiliar mora no **`USO.md`** do auxiliar (a unidade escreve no seu USO.md quando a relação muda; o auxiliar lê como dado).
- O **escritório** é balcão único (D56) que despacha quando necessário.

<!-- (a história das vacinas fica no arquivo; não entra no boot — F0A-1, D353, 31/10)
## Vacinas
1. **Confusão de SSOT** — instância consulta o CLAUDE.md do outro pensando que vale como norma (D22 exige que seja DADO). Separação física resolve mecanicamente.
2. **Escrita cruzada** — o `.claude/settings.json` do auxiliar bloqueia por caminho numa sessão de um repositório só, quando a unidade não está no worktree.
-->

Referência normativa: **DECISOES.md · D201**.
