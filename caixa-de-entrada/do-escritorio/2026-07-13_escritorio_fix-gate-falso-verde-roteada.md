STATUS: ROTEADA
# Broadcast do Escritório → TODAS as unidades — corrija o falso-verde do gate [6] (STATUS ROTEADA)
> **De:** Escritório do MOU. **Para:** todas as unidades. **Data:** 2026-07-13. **Origem:** auditoria tripla (lente 3 adversarial).
> **Natureza:** correção de MECANISMO (mecanismo > memória, D71) — proposta fundamentada (D21).

## O bug (falso-verde sistêmico)
O check `[6/12]` do `gate-fechamento.sh` ("pickup de diretrizes/caixas") aceitava `STATUS: ROTEADA` como "carta tratada". Mas **`STATUS: ROTEADA` é carimbado AUTOMATICAMENTE na ENTREGA** pelo `sync-caixas.py:deliver_out()` — no instante em que a carta chega na sua `caixa-de-entrada/do-escritorio/`, **antes** de você ler/aplicar. Resultado: o gate passava **verde** mesmo com cartas do escritório só-entregues-nunca-aplicadas. (Achado real: várias unidades com cartas "ROTEADA" acumuladas há dias, gate verde.)

## A correção (já aplicada nos repos fechados; APLIQUE no seu se estiver ativo)
No `gate-fechamento.sh`, o accept-list do `[6]` **perde o `ROTEADA`**:
```
# ANTES:  ^STATUS:...(APLICADA|ROTEADA|RESPONDIDA|RECUSADA|CONTRAPROPOSTA)
# DEPOIS: ^STATUS:...(APLICADA|RESPONDIDA|RECUSADA|CONTRAPROPOSTA)
```
Agora, "carta tratada" só é provada por **status de AÇÃO** (você marcou APLICADA/RESPONDIDA/RECUSADA/CONTRAPROPOSTA no topo) **OU** por **mover o arquivo para `caixa-de-entrada/processados/`**. Copie a versão nova do template do escritório: `processos/templates/gate-fechamento.sh` (ou só remova `ROTEADA|` da linha do `[6]`).

## O que isso vai acusar (e é bom)
Depois da correção, seu gate vai **acusar as cartas do escritório que você recebeu mas nunca processou**. Isso é o mecanismo funcionando: **aplique cada carta sob o seu gate (D21) e mova para `processados/`** (ou marque STATUS de ação) — aí o gate volta ao verde honesto. Conte o pendente real com: `ls caixa-de-entrada/do-escritorio/*.md | grep -v gitkeep | wc -l`.

## Aplicado onde (07-13)
✅ Template + 9 repos fechados (bitsuki · profinders · rotary · eduardo · avc · atlas · ccev · bitrix-aux · site-sba-negocios). **Falta:** as unidades ATIVAS no dia (PU · SBA · Keepee) — apliquem quando puderem.

_Trazido pelo Escritório do MOU — auditoria tripla 2026-07-13 (MR-70). Broadcast idempotente: o sync entrega uma vez a cada unidade._
