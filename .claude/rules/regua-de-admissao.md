# Regra — RÉGUA DE ADMISSÃO: o que mora no ESCRITÓRIO × o que mora na CASA (ordem do dono, 2026-08-25)
> Módulo de regra do escritório, **lido no boot de toda sessão** (referido no `CLAUDE.md`; C36 nível 3). Vigência: ATIVO desde 2026-08-25.
> **Por que é regra de boot:** a régua antiga tinha DUAS peneiras com furos opostos, e a instância rodava a errada. O maestro trouxe 32 pendências de negócio da AVC e 21 da Profinders para a mesa do dono, e ele corrigiu. Regra de boot sobrevive à compactação.

## A ordem do dono (verbatim, 2026-08-25)
> *"AVC, SE É NEGÓCIOS, NADA DISSO DEVERIA ESTAR AQUI ME COBRANDO, PROFINDERS, IDEM E CAIXA DE FERRAMENTAS, AÍ SIM, AS PENDÊNCIAS SÃO DE PROBLEMAS QUE ATRAPALHAM OS DEMAIS PROJETOS, AÍ EU DEVO REALIZAR MESMO."*

**O delta é uma SUBTRAÇÃO:** ele derrubou o critério *"é ato do dono?"* e o substituiu por um critério de **alcance**. O par de teste que ele mesmo deu:
- **nomear DPO · aprovar a marca de um clube** = ato dele, **NÃO** entra aqui.
- **revogar uma chave com poder de administração** = ato dele, **ENTRA** aqui.

## A régua, em 5 linhas
1. O mapa do escritório é a fila de UM homem sobre o **ENCANAMENTO** do portfólio — não é o índice do portfólio.
2. **ENTRA** o que, ficando como está, **para ou põe em risco DUAS OU MAIS casas** — ou o que é **REGRA** que vale para todas (padrão, nome, segurança, acesso-classe).
3. **NÃO ENTRA** o trabalho, a decisão, a entrega, o prazo ou o clique **de UMA casa só** — nem quando é o dono quem faz.
4. O escritório guarda o **RELÓGIO** (a data + de quem é); a casa guarda o **TRABALHO**.
5. Não cabendo aqui, o escritório escreve **UMA linha de ponteiro sem cobrança** — e, se a casa não tiver mapa vivo, guarda **em CUSTÓDIA com data de saída**, nunca para sempre.

## A árvore (3 perguntas — o dono entende sem tradução)
```
P1 ── Se ninguém mexer nisso, QUANTAS CASAS ficam paradas ou em risco?
      ├─ 2 ou mais ......................... ESCRITÓRIO ✔ (pare aqui)
      └─ 1 só, ou nenhuma .................. vá para P2

      ⚠️ CONTA COMO "2 OU MAIS" POR DEFINIÇÃO (é UM só e serve todo mundo):
         conta · chave/segredo do dono · domínio/DNS · cofre · servidor/runner ·
         Google Drive · banco Supabase · titularidade de repositório.

P2 ── Dá para escrever isso como REGRA, sem citar o nome de nenhuma casa?
      ├─ SIM ("credencial não vai para o git", "todo repo se chama assim")
      │        ....... ESCRITÓRIO ✔ (a REGRA; o conserto de cada casa é DA casa)
      └─ NÃO (só dá dizendo "a AVC", "o plano da Profinders") ..... A CASA ✔

P3 ── (só se caiu em "A CASA" e há risco de se perder) A casa tem mapa vivo?
      ├─ SIM ... vai para lá. Aqui, no máximo 1 linha de ponteiro + o RELÓGIO.
      └─ NÃO ... CUSTÓDIA com data de saída — e o item nº 1 é "abrir o mapa dessa casa".
```
**A frase que resume:** *é do encanamento, ou é do trabalho de uma casa? Encanamento é meu aqui; trabalho é lá.*

## Desempates que já custaram erro (não reabrir)
- **CLASSE × INSTÂNCIA.** *"Todo app precisa de espelho no git"* = escritório (a regra). *"Clicar Connect no app X"* = a casa. **O erro de 25/08 foi o escritório executar a instância em nome da classe.**
- **ACESSO.** O acesso de **uma** casa a **uma** ferramenta é **da casa**; a **existência, a titularidade e o pagamento** da conta são do escritório. _(D160 proíbe a casa de se eximir — não determina onde o item mora.)_ O mesmo acesso faltando em 2+ casas vira CLASSE e sobe.
- **ALÇADA ≠ ENDEREÇO.** D202 diz **quem decide** (A/B/C); esta régua diz **onde mora**. *"É classe C"* não admite nada aqui.
- **"CASA" = FAMÍLIA, não repositório.** Unidade + auxiliares contam como UMA casa (mesmo recorte do selo, D194) — senão toda família com 2 auxiliares vira escritório.
- **CANETA × DEPÓSITO (ordem do dono 25/08; régua medida na onda 01/09, LD-03).** O escritório **escreve por PR** (caneta) numa casa **FECHADA** e **só deposita na caixa** numa casa **VIVA**. *Viva* = **commit de INSTÂNCIA** (autor `noreply@anthropic.com` ou o dono) na `main` remota **nas últimas 24h**; push de runner/robô (`github-actions`, `lovable`, consolidar) **não conta**. Mede-se antes de escrever, não se lembra. Selada + sem instância = fechada.
- **Perguntar sobre uma casa é permitido.** Se o dono pergunta *"e a AVC?"*, o escritório **abre o mapa dela e responde na hora**. O que não se faz é **copiar a lista para a fila dele aqui**. Responder ≠ hospedar.

## Travas contra os 2 ralos conhecidos
- **O galho "é regra" engole tudo** se ninguém segurar: só entra por ele se a frase da regra puder ser escrita **sem citar o nome de nenhuma casa**. Precisou dizer "a AVC"? é caso, não regra.
- **A custódia vira mudança de endereço:** teto de **3 itens**, data de saída visível, e o item nº 1 da custódia é sempre *"abrir o mapa daquela casa"*.

## Vacinas
1.5. **`V-ROTEAR-SEM-TIRAR-DA-FILA-DELE`** (ordem do dono, 04/09: *"apenas pendências do escritório, as dos projetos devem ser roteadas ao próprio projeto"*) — levar o item à casa é METADE do trabalho; a outra metade é **tirá-lo da fila dele no mesmo commit**. A onda de 04/09 levou 3 itens corretamente à casa e os deixou também aqui: virou duplicata, e duplicata é o que faz o dono perder o fio. **Dente:** check `[11]` do `processos/linter-estado.sh` varre as pistas 🔒 e 📅 do mapa do escritório e acende quando um item nomeia UMA casa só.
1. **`V-ATO-DO-DONO-NAO-E-CRITERIO`** — *"é ele quem faz, logo é do escritório"*. Nunca foi. (A-424)
2. **`V-AVISO-QUE-VIRA-SEGUNDA-VOZ`** — achou superfície errada numa unidade? **corrija a superfície da unidade**. Pôr o aviso no mapa do escritório não cala a voz errada: **cria uma segunda**, e o dono fica com duas ordens opostas. (A-425)
3. **`V-CUSTODIA-SEM-PRAZO-VIRA-MUDANCA`** — item de casa entra como custódia com data, ou não entra.

Referência normativa: **DECISOES.md · D150 (revisada) · D193 · D202** · achados **A-424 · A-425**.
