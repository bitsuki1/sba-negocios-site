> ⧉ **CÓPIA DE LEITURA** do `escritorio-do-mou` — **SSOT lá** (`escritorio-do-mou/referencia/MATRIZ-ADMISSAO-LICOES.md`); puxada em **2026-08-22**. Não editar aqui: mudança se faz no escritório e se republica (regra em `processos/HERDADO-DO-ESCRITORIO.md`).

# MATRIZ DE ADMISSÃO DE LIÇÕES — onde cada aprendizado MORA (fim da confusão das 3 casas)

> **Vigência:** ATIVO desde 2026-06-27 (A-209 — auditoria multi-ótica dos projetos).
> **Por que existe:** três docs guardam "lição aprendida" com lógica de admissão diferente; um achado/vacina novo não tinha regra de destino e caía no lugar errado (ou se perdia). Esta matriz é a ENTRADA ÚNICA: "tenho uma lição — vai em qual?". Mecanismo > memória (D71).
> **Casa com:** `referencia/CODEX-DOS-PROCESSOS.md` · `referencia/APRENDIZADOS.md` · `processos/PREVENCAO-DE-PERDAS.md` · `processos/ACHADOS-DE-AUDITORIA.md`.

## A REGRA EM UMA TABELA

| Se a lição é… | Vai em | Prefixo | Forma | Quem alimenta |
|---|---|---|---|---|
| **Mudança ESTRUTURAL de processo/política** (uma regra/mecanismo do escritório evoluiu e tem de não-regredir) | `referencia/CODEX-DOS-PROCESSOS.md` | **E-NN** | dialética completa (TESE/ANTÍTESE/CONCILIAÇÃO/VACINA) **+ MECANISMO** | maestro (decisão estrutural, D111) |
| **Vacina OPERACIONAL do dia a dia** ("já fizemos X; X falha por Y; não repetir X") | `referencia/APRENDIZADOS.md` | **V-<NOME>** | aforismo curto + evidência do caso real | maestro **ou** subagente (beta-contínuo) |
| **MODO DE FALHA sistêmico** (uma classe de erro que reincide e pede prevenção desenhada) | `processos/PREVENCAO-DE-PERDAS.md` | **F-NN** | modo de falha + causa-raiz + mecanismo de prevenção | comissão/maestro (design de solução) |
| **DEFEITO concreto achado numa auditoria** (item a corrigir, com DoD) | `processos/ACHADOS-DE-AUDITORIA.md` | **A-NNN** | linha com Onde/DoD/Status (D108) | escrutinador → maestro aplica |

## COMO DECIDIR EM 10 SEGUNDOS (árvore)
1. **É um item a CORRIGIR agora, com DoD?** → `ACHADOS-DE-AUDITORIA.md` (A-NNN). *(Fila de trabalho, não de sabedoria.)*
2. Não — é SABEDORIA a guardar. **Ela muda uma REGRA/MECANISMO do escritório?** → `CODEX-DOS-PROCESSOS.md` (E-NN, dialética + mecanismo).
3. Não muda regra, mas é uma CLASSE de erro que volta a acontecer? → `PREVENCAO-DE-PERDAS.md` (F-NN).
4. É só "não pise nessa pedra de novo" (caso pontual)? → `APRENDIZADOS.md` (V-<NOME>).

## FRONTEIRAS (para não duplicar)
- **CODEX (E) × APRENDIZADOS (V):** E muda a REGRA (e carrega o mecanismo que a trava); V é a cicatriz do caso. Se a lição vira regra nova, é E; se é "lembrete de não repetir", é V. Uma E pode CITAR a V que a originou; não copiar o conteúdo.
- **PREVENCAO (F) × APRENDIZADOS (V):** F é a CLASSE (reincide, pede desenho); V é a INSTÂNCIA. Vários V do mesmo tipo viram um F.
- **ACHADOS (A) × o resto:** A é trabalho PENDENTE (tem Status ABERTO→APLICADO). Quando um A aplicado ensina algo durável, destile a lição para E/V/F ao fechá-lo — o A não é a casa da sabedoria, é a casa da tarefa.

## Registro dialético
- **TESE:** uma matriz de destino única acaba com "lição cai no lugar errado / se perde" (a confusão que o MOU sentiu).
- **ANTÍTESE:** a fronteira E/V/F nem sempre é nítida (uma lição pode caber em duas).
- **CONCILIAÇÃO (provisória):** na dúvida, registre onde for mais ÚTIL de reencontrar e CITE de lá para as outras (ponteiro, não cópia); a árvore de 10s resolve a maioria.
- **VACINA:** não criar uma 4ª casa de lição — esta matriz ROTEIA para as 3 que já existem, não inventa uma nova.
