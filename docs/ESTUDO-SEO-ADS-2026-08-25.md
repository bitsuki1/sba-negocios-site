# ESTUDO — SEO das landings (Tema 1130 · Resíduos), Ads e ferramentas
> **Data:** 2026-08-25 · **Pedido por:** o dono, verbatim: *"lance lentes de melhoria para as landing pages de recuperação tributária e de resíduos sólidos para melhorarmos nosso SEO e aparecermos mais em pesquisas do google e penso em fazer uma campanha de ads"*.
> **O que este documento é:** o levantamento técnico e estratégico. As **ações do dono** que saíram daqui vivem no `MAPA-DE-PENDENCIAS.md` — este arquivo é o porquê, não a fila.
> **Regra de honestidade deste estudo:** onde eu **não medi**, está escrito "não medi". **Não há um único número de volume de busca inventado aqui** — eu não tenho ferramenta de volume nesta sessão, e chutar número seria pior que não ter.

---

## §1 · O QUE EU MEDI NO CÓDIGO (fatos, não impressões)

| | `/recuperacao-tributaria` | `/residuos` |
|---|---|---|
| linhas de código | **223** | **524** |
| FAQ na página | ❌ **não tem** | ✅ 6 perguntas |
| JSON-LD (dado estruturado) | ❌ **nenhum** | ✅ `Service` + `FAQPage` |
| `<h1>` | "O IRRF retido pelo município é do município." | "Resíduo não é só custo. Bem aproveitado, vira receita." |
| title | "Recuperação Tributária (Tema 1130) — SBA Negócios" | "Usina de Resíduos Sólidos Urbanos (RSU) para prefeituras e consórcios \| SBA Negócios" |
| prioridade no sitemap | 0.9 | **0.7** |

**Onde o `<h1>` mora:** em `src/components/Hero.tsx:66`, alimentado pela prop `titulo`. Ou seja: **mudar o H1 é mudar uma string** na chamada do `<Hero>` de cada página. É barato.

---

## §2 · A LENTE MAIS IMPORTANTE — o descasamento entre o título e o H1

Esta é a maior oportunidade das duas páginas, e a mais barata de corrigir.

O **title** (o que aparece na aba e no resultado do Google) e o **`<h1>`** (o maior texto da página) são os dois sinais mais fortes que o Google lê. Quando os dois dizem a mesma coisa, ele entende o assunto. Quando divergem, ele fica em dúvida.

### `/residuos` — o caso mais grave
- **title:** "Usina de Resíduos Sólidos Urbanos (RSU) para prefeituras e consórcios"
- **h1:** "Resíduo não é só custo. Bem aproveitado, vira receita."

O H1 é um **slogan**. Não contém *usina*, *resíduos sólidos*, *RSU*, *prefeitura* nem *consórcio* — **nenhuma** das palavras que o title escolheu como alvo. A página promete um assunto no title e abre com outro.

> **Isto não é implicância de SEO.** É o seguinte: quem digitou "usina de tratamento de resíduos para prefeitura" chega na página e a primeira coisa que lê é uma frase de efeito. O Google mede se as pessoas voltam para a busca depois de clicar. Um H1 que não confirma a promessa aumenta essa volta.

**A correção mantém a frase de efeito, só troca a ordem** — o slogan vira subtítulo:
- **H1 novo:** `Usina de resíduos sólidos urbanos para prefeituras e consórcios`
- **subtítulo:** `Resíduo não é só custo — bem aproveitado, vira receita.` + o texto que já existe

Nada de valor se perde. A frase boa continua na página, um degrau abaixo.

### `/recuperacao-tributaria` — o mesmo problema, mais sutil
- **h1:** "O IRRF retido pelo município é do município."

Melhor que o de resíduos (tem *IRRF* e *município*), mas **não tem "recuperação" nem "Tema 1130"** — que são exatamente os termos do title. Essas palavras existem na página, mas dentro do **eyebrow**, que é um `<p>` comum: para o Google, um parágrafo qualquer.

- **H1 sugerido:** `Recuperação do IRRF do município — Tema 1130 do STF`
- **subtítulo:** `O IRRF retido pelo município é do município.` (a frase atual, que é ótima, vira a promessa)

---

## §3 · A PÁGINA DO TEMA 1130 ESTÁ MUITO ATRÁS DA DE RESÍDUOS

A onda de agosto (pacote V6) tratou **só** o eixo Resíduos, por ordem específica. O resultado é que a página tributária ficou com **menos da metade** do conteúdo e **sem nenhum** dos ganhos técnicos.

**O que falta nela, em ordem de retorno:**

1. **FAQ — é a maior lacuna.** Tema 1130 é um assunto onde o comprador (procurador, secretário de finanças, prefeito) tem dúvidas específicas e recorrentes. Cada dúvida dessas é uma busca real. Perguntas que a página deveria responder:
   - *"Precisa de processo judicial ou dá para fazer administrativamente?"*
   - *"Quantos anos para trás dá para recuperar?"* (a prescrição de 5 anos)
   - *"O Tribunal de Contas pode questionar?"*
   - *"A Câmara precisa aprovar alguma lei?"*
   - *"O município precisa pagar alguma coisa antes?"*
   - *"E se o município já tem contador/assessoria — atrapalha?"*
2. **JSON-LD `Service` + `FAQPage`.** A mecânica **já existe e está pronta** — `applyPageSchema()` em `src/lib/seo.ts`, usada por `/residuos`. É reaproveitar, não construir.
3. **Conteúdo.** 223 linhas para o carro-chefe da empresa é pouco. Falta o que o comprador público precisa para se decidir: **como se contrata isso legalmente** (Lei 14.133), o que o TCE olha, o que exatamente se assina.

> **Nota importante:** o site **já tem** esse conteúdo, e ele é o melhor do site — o `/guia-etapas` (13 etapas, os 4 caminhos do dinheiro, o que se assina, quanto custa). Só que ele está **`noindex` e atrás de senha de parceiros**. Está invisível para o Google **de propósito**. Ver §6.

---

## §4 · CAMPANHA DE ADS — a resposta honesta

O dono perguntou; a resposta franca é: **ainda não. E para resíduos, provavelmente nunca da forma que se imagina.**

### Por que não começar por Ads

**(a) Não sabemos se existe demanda — e dá para descobrir de graça em 5 minutos.**
Anúncio de busca **captura** demanda existente; ele não cria. Se 40 pessoas no Brasil inteiro pesquisam "recuperação IRRF município" por mês, nenhum orçamento muda isso. **O Search Console (grátis) responde isso com dado real do próprio site.** Gastar em Ads antes de olhar o Search Console é comprar sem saber o preço.

**(b) O público é estruturalmente minúsculo.** São 5.570 municípios, e em cada um o decisor são 2 ou 3 pessoas. Isso não é um mercado de volume de busca — é um mercado de **lista nominal**. Ver §5, que é a parte mais valiosa deste estudo.

**(c) O clique não encurta a licitação.** Compra pública passa pela Lei 14.133. O anúncio, no máximo, gera o pedido de **estudo sem custo** — que é justamente o que a página já oferece de graça. O gargalo não é o topo do funil.

**(d) O SERP já tem donos.** Buscando o tema, aparecem consultorias estabelecidas oferecendo exatamente o mesmo modelo ("só paga sobre o êxito"): Fiscoplan, MC Associados, QSM, Recupera, entre outras. Entrar em leilão de clique contra quem já está posicionado é o cenário mais caro possível.

### ⚠️ (e) Um risco que precisa da sua atenção — publicidade e OAB

A própria página diz que o estudo é *"conduzido por advogados e contadores especializados"*. Isso liga o serviço à advocacia, e publicidade de advocacia é regulada.

O **Provimento 205/2021 da OAB** **permite** anunciar no Google Ads — mas com regras: o anúncio deve ser **informativo**, e é **vedado prometer resultado** ou usar apelo mercantil.

Traduzindo para o texto do anúncio: `"Recupere milhões para sua cidade"` seria problemático. `"Estudo sem custo sobre o Tema 1130 para municípios"` é informativo.

> **Isto é sinalização, não parecer.** Eu não sou advogado e não estou dando parecer jurídico. **Antes de qualquer anúncio no eixo tributário, mostre o texto do anúncio para os advogados que já trabalham com você.** É barato perguntar e caro errar.

### Se ainda assim quiser testar Ads — o desenho de menor risco
Só **depois** do Search Console rodando por ~30 dias, e assim:
- **Só o eixo tributário.** Resíduos não (§5 explica).
- **Orçamento de teste pequeno** (algo como R$ 20–30/dia por 30 dias), tratado como **compra de informação**, não como aquisição.
- **Só Rede de Pesquisa.** Desligar a Rede de Display e os parceiros de busca — é onde o orçamento evapora em cliques irrelevantes.
- **Correspondência de frase ou exata**, nunca ampla.
- **Palavras negativas desde o dia 1:** `concurso`, `apostila`, `emprego`, `vaga`, `salário`, `pdf`, `grátis`, `o que é`, `jurisprudência`, `modelo de petição` — senão você paga por estudante e por advogado pesquisando tese.
- **Destino:** `/recuperacao-tributaria`, **não** a home.
- **Métrica de sucesso:** número de pedidos de estudo, não cliques nem impressões.

---

## §5 · O ACHADO MAIS VALIOSO DESTE ESTUDO — para resíduos, a lista vale mais que o Google

Pesquisando o setor, encontrei o seguinte, e ele muda a estratégia do eixo Resíduos:

O Governo Federal, pelo **PPI** (Programa de Parcerias de Investimentos) com **BNDES** e **Caixa (FEP)**, fez um chamamento público para apoiar consórcios intermunicipais a **estruturar concessões de manejo de RSU**. De **86 arranjos regionais inscritos, 39 foram habilitados**, somando **511 municípios em 14 estados** (BA, CE, ES, GO, MG, PA, PR, PE, RN, RS, RJ, RO, SE, SP).

**Essa lista é pública e nominal, em `ppi.gov.br`.**

### Por que isso importa mais que SEO
Um consórcio habilitado nessa lista é, por definição:
- **já organizado juridicamente** (consórcio constituído é pré-requisito),
- **com escala** (mínimo 150 mil habitantes; até 40 municípios),
- **com dinheiro federal para estruturar o projeto**,
- e **comprometido a cobrar pelo serviço depois** — ou seja, o projeto tem receita.

**É exatamente o cliente da SBA, com nome, estado e telefone, numa lista pública de graça.**

> Nenhuma campanha de Google Ads vai te entregar 39 clientes qualificados. Essa lista entrega. **Um consórcio contatado dessa lista vale mais que mil cliques.**

**Isso não substitui o SEO da página de resíduos** — a página continua sendo necessária, porque o consórcio contatado **vai pesquisar a SBA no Google antes de responder**. O SEO aqui serve para **sustentar a credibilidade** de uma prospecção ativa, não para gerar o contato do zero. São papéis diferentes, e é bom saber qual é qual antes de gastar.

### O paralelo no eixo tributário
Existe equivalente para o Tema 1130: **dados públicos de finanças municipais** (Siconfi/Tesouro) permitem **estimar quanto cada município tem a recuperar** antes de qualquer contato. Isso transforma um e-mail frio em: *"sua cidade pagou R$ X a fornecedores nos últimos 5 anos; a estimativa de IRRF é R$ Y"*. É a mesma lógica: **dado público vira prospecção nominal**.

---

## §6 · O MELHOR CONTEÚDO DO SITE ESTÁ ESCONDIDO

`/guia-etapas` — 13 etapas, os 4 caminhos do dinheiro retido, o que se assina, quanto custa — está marcado **`noindex: true`** e protegido por senha de parceiros.

**A decisão de fechá-lo pode estar certa** (é material comercial detalhado, para parceiro). **Mas o efeito colateral é que o ativo de conteúdo mais forte da empresa é invisível para o Google.**

Concorrente que publica um guia parecido **aberto** vai ranquear com ele.

**Proposta (decisão do dono, não minha):** manter o guia fechado como está, e publicar uma **versão pública resumida** — sem tabela de preços, sem os detalhes comerciais, mas com a explicação do Tema 1130, as etapas em linhas gerais e as dúvidas frequentes. Quem quiser o detalhe pede acesso. Ganha-se o SEO sem abrir o comercial.

---

## §7 · FERRAMENTAS — o que instalar, na ordem, e as pegadinhas

### Grátis e essenciais (fazer nesta ordem)
| ferramenta | para quê | pegadinha |
|---|---|---|
| **Google Search Console** | O que as pessoas **realmente** digitam para chegar no site. **É o degrau zero de tudo.** | Sem ele você está cego. É o que decide se Ads faz sentido. |
| **Vercel Analytics** | Quantas visitas, em quais páginas | **Já está montado no código** (`src/App.tsx:69`). Pode já estar coletando — é só olhar o painel. |
| **Google Keyword Planner** | Volume de busca e custo estimado por clique | Exige conta no Google Ads, **mas não exige campanha ativa** — escolha "criar conta sem campanha". Sem campanha rodando, ele mostra **faixas** (ex.: 100–1.000), não número exato. |
| **Google Trends** | Se o interesse pelo tema sobe ou cai | Mostra tendência relativa, nunca volume absoluto. Bom para sazonalidade (ex.: início de mandato municipal). |
| **PageSpeed Insights** | Velocidade — que é fator de ranqueamento | Rode na URL de produção, não em `localhost`. |
| **Teste de Resultados Enriquecidos** (Google) | Confere se o FAQ/Service que instalamos está sendo lido | É como se prova que o JSON-LD funcionou. |
| **Bing Webmaster Tools** | Bing/Copilot | 15 minutos de trabalho. Pouco tráfego, mas importa cada vez mais porque assistentes de IA leem de lá. |

### Pagas — a opinião honesta
**Semrush** e **Ahrefs** são as melhores, e são **caras** (centenas de reais por mês). Para um site de 18 páginas num nicho B2G, **não recomendo agora** — o Search Console entrega o essencial de graça. Se um dia quiser algo pago, **Ubersuggest** custa uma fração e resolve.

### As ferramentas do SETOR — as que ninguém lembra e valem mais
| ferramenta | para quê |
|---|---|
| **`ppi.gov.br`** | A lista dos **39 consórcios de RSU habilitados** (§5). É prospecção pronta. |
| **PNCP** (Portal Nacional de Contratações Públicas) | Editais de resíduos/saneamento em andamento no país inteiro |
| **SNIS** (Sistema Nacional de Informações sobre Saneamento) | Quanto lixo cada município gera, como destina — dado para dimensionar projeto |
| **Siconfi / Tesouro** | Finanças municipais — base para estimar o IRRF a recuperar por cidade (§5) |

---

## §8 · O QUE EU NÃO FIZ / NÃO SEI (declarado)

- **Não tenho volume de busca.** Nenhum número de "X buscas/mês" aparece neste estudo porque eu não tenho ferramenta de volume aqui. Quem responde isso é o Search Console (dado real) e o Keyword Planner (estimativa em faixas). **Foi por isso que a primeira ação do mapa é o Search Console.**
- **Não analisei o SERP ao vivo.** A saída HTTP desta sessão é bloqueada pelo proxy; a leitura de concorrentes veio de busca, não de eu abrir os resultados e medir posição.
- **Não sei se a Vercel Analytics está coletando.** Não tenho acesso ao painel e o `CLAUDE.md` proíbe encostar na Vercel nesta sessão. Por isso é ação do dono, de 2 minutos.
- **Não mexi em nenhuma página.** Este estudo é **lente**, não execução. As mudanças de H1, FAQ e schema estão propostas e prontas para executar **ao seu "vai"** — nenhuma linha de produto foi alterada.
- **Não sou advogado.** A observação sobre OAB/Provimento 205 é sinalização de risco para você validar com os seus advogados, não parecer jurídico.

---

## §9 · FONTES
- STF — Tema 1130 (tese e andamento): `portal.stf.jus.br`
- STF — notícia "IR retido na fonte é de estados e municípios": `portal.stf.jus.br/noticias`
- ConJur — recuperação do IR das contratações públicas dos últimos 5 anos (2024)
- PPI/BNDES/Caixa — lista de consórcios habilitados para concessões de RSU: `ppi.gov.br`
- OAB — Provimento 205/2021 (publicidade na advocacia)
- Google Ads — Ajuda sobre previsões do Planejador de Palavras-chave
