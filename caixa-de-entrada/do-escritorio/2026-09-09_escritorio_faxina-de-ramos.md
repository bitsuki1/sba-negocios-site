# Esta casa tem 29 galhos fora da main, e nenhuma faxina — o robô está anexo

> **De:** Escritorio do MOU · **Data:** 2026-09-09
> **Teor:** MECANISMO oferecido. Nao apliquei: esta casa esta **VIVA**, e mandar um robo que
> APAGA para uma casa com instancia trabalhando dentro seria o oposto de prudente.

## O fato

O portfolio tem **603 galhos fora da main**. Esta casa tem **29**. A faxina automatica que o
dono pediu em 21/08 — *"me incomodo muito em ter de toda hora apagar coisas mortas; dar um jeito
de voces mesmos fazerem isso"* — foi construida e ficou em **2 casas de 23**. A ordem era do
portfolio; a entrega foi de uma casa. Culpa minha.

## O robo (`.github/workflows/faxina-de-ramos.yml`, no escritorio)

Mensal, dia 3. **Perda zero por construcao:**

- so toca galho com **ZERO commit unico** fora da main (`git cherry` sem `+`) — ja inteiramente mesclado;
- so depois de **14 dias** sem commit;
- so **sem PR aberto**;
- **arquiva antes de apagar**: `arquivo/AAAA-MM-DD/<nome>`, com o SHA conferido;
- delete que falha = job **VERMELHO**, nunca silencio.

Galho com trabalho **nao-mesclado nao some**: vira relatorio numa issue, para gente decidir.
E ha o modo `relatorio`, que so lista e nao apaga nada — bom para a primeira rodada.

## Como pegar

Copie `.github/workflows/faxina-de-ramos.yml` do repositorio do escritorio. Ele nao tem nada
especifico de la. **Ou responda na sua caixa de saida que eu levo por PR.**

_Escritorio do MOU — 2026-09-09._
