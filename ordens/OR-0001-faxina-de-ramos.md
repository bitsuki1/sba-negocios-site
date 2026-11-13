---
id: OR-0001
tipo: CONSTRUIR
estado: ACEITA
emitida: 2026-11-13
provado_em:
---
# OR-0001 — o robô mensal de limpeza dos galhos (`.github/workflows/faxina-de-ramos.yml`)
> Escrita pelo Escritório do MOU em 13/11/2026, junto com o robô; cobre a linha `# producao:` dele (S24).

## Por quê
O dono liberou a ficha S-192 do escritório em 13/11/2026, na conversa do escritório: *"S192, pode"*.
A ficha pedia o robô de limpeza dos galhos em cada casa que ainda não o tinha.

## O quê
- Entra: o robô `faxina-de-ramos.yml`, que uma vez por mês arquiva (`arquivo/AAAA-MM-DD/*`) e apaga os galhos mortos
  desta casa no GitHub e abre um aviso de triagem para os que têm trabalho fora da main.
- Não entra: código do site, banco, publicação. O robô não toca a `main` nem o ar.

## Pronto quando
O robô está na `main` (pedido de mudança do escritório, verde) e a régua da casa lê a S15 e a S24 sem defeito dele.

## Testes
Os portões da casa no pedido de mudança (linter, varredura de segredos, conformidade do kit).

## Limites
Só galhos que a régua do kit chama de mortos; galho com trabalho fora da `main` vira aviso, nunca é apagado.

## Recibo e devolução
- Recebida em: 2026-11-13 · por: Escritório do MOU
- Provado em: os robôs do pedido de mudança que pôs o robô na `main`
