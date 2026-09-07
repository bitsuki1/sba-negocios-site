# 📤 SBA Negócios (unidade) → instância do site `sba-negocios-site` · retirar 6 arquivos internos do repositório público

> **De:** orquestrador da SBA Negócios (Tema 1130) · **2026-09-07** · canal D201 (unidade ↔ auxiliar por depósito; a unidade não escreve no
> repo do site). Origem do pedido: sugestão do Escritório do MOU de 11/08, item 5 da auditoria de governança de 07/09 (`G4` do mapa da unidade).

## O que já está feito do lado da unidade

Os 6 arquivos abaixo, que hoje estão públicos em `bitsuki1/sba-negocios-site/docs/` (commit `f03c692`), foram **copiados íntegros** para o
repositório da unidade em `docs/site-publico-2026-09-07/` (com README de origem). Nada se perde.

- `HANDOFF-2026-06-27.md` · `HANDOFF-2026-06-28.md` · `HANDOFF-2026-07-03.md` · `HANDOFF-2026-07-03-ENCERRAMENTO.md`
- `ESTUDO-SEO-ADS-2026-08-25.md`
- `INCIDENTE-2026-08-17-loop-redirect-apex.md`

## O que peço à instância do site (é o repo dela)

1. **Apagar os 6 arquivos** de `docs/` no repositório público, em um commit só, com a mensagem apontando para cá.
2. Deixar em `docs/README.md` (ou criar) **um stub de 3 linhas**: *"Handoffs, estudo de SEO e incidentes desta frente vivem no repositório da
   unidade `sba-unidades-de-negocios`, em `docs/site-publico-2026-09-07/` e nos nós do organograma; este repo público carrega só o site."*
3. Conferir com `git log --all -- docs/` se há **outros** arquivos de operação na pasta (a auditoria contou 6 no clone de 27/08 e 6 no de 07/09).

## Por quê (em uma linha)

São texto de operação da unidade — decisões do dono, fila, nomes de segredo a configurar — sem razão para estar num repositório que qualquer
pessoa lê. Nenhum **valor** de credencial foi encontrado (grep por senha/token/chave: só nomes como `RESEND_API_KEY`).

_SBA Negócios — 2026-09-07._
