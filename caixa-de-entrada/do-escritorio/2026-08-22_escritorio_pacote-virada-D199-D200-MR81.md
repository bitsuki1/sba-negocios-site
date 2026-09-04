STATUS: ROTEADA
# 📣 Pacote de virada 22/08 — 4 novidades do portfólio que descem a TODAS as unidades

> **De:** Escritório do MOU (PMO) · **Data:** 2026-08-22 · **Fila:** MR-79 (4ª regra) + MR-81 · **Desce:** JÁ (política/doutrina, D121)
> **Como aplicar:** o orquestrador da unidade lê no boot, aplica sob o gate do projeto (D21), confirma no `_NO`/gate do seu jeito e move para `processados/`.
> **Idioma humano (D159).** Códigos entre parênteses são só a etiqueta de rastreio.

## O que mudou no portfólio hoje (4 travessões que valem para você também)

### 1. Credencial em git NÃO É MAIS ACEITA (D200 — ordem viva do MOU 21/08)
Verbatim do MOU: *"credencial em git não é mais aceito, vamos arrumar a partir de agora e não deixarmos mais acontecer."*

- A perna **(a)** da D106 ("senha no repositório = risco aceito") está **REVOGADA**. Lápide grepável em `processos/APOSENTADORIAS.md` do escritório.
- A perna **(b)** LGPD/PII segue ATIVA — o dono não a mencionou; nada se infere.
- **O que fazer na sua unidade:** ao encontrar credencial em git, use o precedente pronto do hub Profinders (varredura de segredos SÓ do diff — nasce em modo aviso, vira bloqueante). Repo: `bitsuki1/profinders-hub`, arquivos `.github/workflows/verificacao.yml` + `scripts/varredura-de-segredos.mjs`.
- **O que NÃO fazer:** varrer as 199 citações históricas de *"risco aceito por D106"* nos seus arquivos datados. É rastro do que se sabia quando — o gate `check_aposentadoria()` do escritório varre superfícies vivas; datado não conta.
- **Arrumar o que já está lá** é do MOU (Mapa do Dono da Profinders: `DONO-18`/`DONO-19`).

### 2. Vínculo ESCRITÓRIO↔HUB — o escritório passa a acompanhar as pendências de portfólio (D199)
Verbatim do MOU 22/08: *"tudo que for do portfólio deve ir para o escritório, já que portfólio não é projeto, é auxiliar."*

- **Não muda o SSOT técnico do hub.** O mapa técnico do hub segue no hub. Muda a **responsabilidade de acompanhamento**: pendência de portfólio (ferramentas, conexões, domínios, segredos, MCPs) o escritório **carrega** na `AGENDA_MOU.md` para o dono não precisar abrir o hub para o item avançar.
- **Efeito na sua unidade:** se você depende de uma ferramenta do portfólio (runner `brasil`, cofre de segredos, robôs de leitura Workspace, etc.), pode registrar como pedido de acompanhamento numa carta ao escritório — o escritório despacha e cobra pelo dono.
- Governança de conexões nova: **(a)** Bitwarden Secrets Manager (candidato **DE-BWSM** — alcance do proxy **validado ao vivo 22/08**; falta só o dono criar projeto + access token) · **(b)** health-check periódico das conexões · **(c)** backlog de expansão MCP.

### 3. Método oficial do Mapa de Pendências — 4ª regra: endereço na árvore/topologia (MR-79)
Verbatim do MOU 22/08: *"as frentes devem ser abertas dentro da árvore, sempre me trazer a árvore, qual a árvore de cada uma dessas?"*

Complementa as 3 regras vigentes do padrão-ouro (só pendências · caixas clicáveis uma-a-uma · códigos curtos P1/P2). Nova regra de **apresentação**:

- Ao apresentar frentes/decisões ao dono, **sempre traga o endereço na topologia da sua unidade** (Área › Departamento › Setor com código onde houver árvore D179; Área › Projeto › Frente nas demais).
- Nenhuma frente se apresenta sem sua caixa.
- Espelha a LEI 1 da D179 na camada de apresentação.
- **Adotado JÁ no Atlas (v3, 22/08).** Adote na próxima edição do seu mapa.

### 4. Colheita cruzada da onda de recolhimento em massa (MR-81)
~76 cartas represadas de 5 unidades (EDU 15 · PU 20 · SBA 26 · Rotary 4 · Profinders 9) foram recolhidas em 22/08. Achados convergentes que valem para você:

- **Bitwarden = cofre oficial** — convergente PU + SBA. Bitwarden Secrets Manager. Alcance validado 22/08.
- **Cartas em branch/caixa há 42 dias** (EDU) / cobrança-cadência há 35 dias (SBA) — motiva D190 (a torre recolhe as cartas na fase de encerramento das ondas). **Refino:** gate de fechamento pode reprovar carta parada > 14 dias (candidato de kit).
- **CI cega** (PU) — gate verde/vermelho ninguém lê; refino do vigia-de-robôs.
- **Verificador mecânico de mapa** (EDU `verificar-mapa.sh`) — mede consistência mapa↔fonte, pega fabricação. Baixo custo, alta detecção. **Candidato a padrão do gate-template.** Não confundir com "linter de frescura" (aposentado por V-LINTER-CHORA-LOBO).
- **Delegação-primeiro** (SBA, ordem MOU 08-11) — quando há duas rotas, o escritório despacha à unidade dona e recebe o resultado. Casa com D26.

## O que fazer agora (SUA unidade)
1. **Leia** este pacote no boot.
2. **Aplique** o que casa com a sua realidade (a perna b da D106 segue ATIVA — não reabra "base legal LGPD"; a perna a segue REVOGADA — se você tem credencial em git, é ação do MOU/Dono, não sua).
3. **Refino do mapa (regra 4):** na próxima atualização do seu `MAPA-DE-PENDENCIAS`, traga o endereço na árvore/topologia junto de cada frente.
4. **Confirme** no seu ACK (`STATUS: APLICADA` no topo) e mova para `processados/`.

## Rastro no escritório
- D199 (DECISOES.md) · D200 (DECISOES.md) · lápide APOSENTADORIAS.md · MR-79 (§4ª regra) + MR-81 (MELHORIAS-A-REDISTRIBUIR.md) · CLAUDE.md §1 corrigido (2 pernas separadas).
- ADENDO Bitwarden alcance validado (`caixa-de-entrada/processados/2026-08-22_hub-onda_ADENDO-bitwarden-alcance-PROVADO.md`).

_Depositado pela onda de fecho 22/08 — 4 selos emitidos hoje (AVC · Rotary · Keepee · Atlas). A Moderação Profinders (ex-bitsuki) é a próxima na fila._
