# caixa-de-entrada/ — o que OUTROS mandam para este repo (D144)
> Canal de entrada. Cada subpasta é uma ORIGEM. Uma carta por ARQUIVO.
> **Regra:** carta que chega aqui é TRABALHO para mim — leio no boot, aplico, e movo para `processados/` (OU marco `STATUS: APLICADA` no topo, ver `gate-fechamento.sh` §1).

## Estrutura
- **`do-escritorio/`** — diretrizes que o Escritório do MOU (o PMO) me manda. O maestro do escritório deposita aqui (via co-monte) — eu aplico e movo para `processados/`.
- **`processados/`** — pasta única de "aplicadas". Rastro de execução; o gate confere que toda carta em `do-escritorio/` tem par em `processados/` OU marcador `STATUS: APLICADA` inline (MR-53).

## Como o gate cobra
O `gate-fechamento.sh` do repo, no check `[1/4]`, verifica que nenhuma carta em `caixa-de-entrada/do-escritorio/` (ou qualquer subpasta ≠ `processados/`) está pendente. Fecho de sessão com carta não-aplicada = 🟥 vermelho.

## Formato aceito (marcador inline — MR-53)
Uma carta permanece na origem, mas com uma linha no topo:
```
STATUS: APLICADA  <!-- ou RESPONDIDA / RECUSADA / CONTRAPROPOSTA -->
```
Isso vale como "aplicada" para o gate; útil quando é resposta rápida (o gesto real é responder, não mover). Recomendo mover para `processados/` só quando é ação executada + fechada; para diálogos, marcador inline é mais honesto.
