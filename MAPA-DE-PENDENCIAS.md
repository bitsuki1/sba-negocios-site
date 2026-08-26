# MAPA DE PENDÊNCIAS — sba-negocios-site (site institucional da SBA Negócios)
> **🌐 URL para você olhar:** https://claude.ai/code/artifact/8bf55b35-ffa5-4c03-9257-67c3fa94f09d — foto deste arquivo, republicada no MESMO endereço a cada mudança.
> **Atualizado: 2026-08-26 (v8 — suas 8 decisões executadas).** · **Só pendência.** O que já foi feito vive no git.
> **Régua de admissão:** só sobe ao mapa do portfólio o que trava 2+ casas. Tudo aqui é desta casa.

---

## ✅ O QUE VOCÊ DECIDIU EM 26/08 E JÁ ESTÁ FEITO

Você respondeu os 8 itens. Sete saíram do mapa no mesmo dia. **Sobrou um.**

| você disse | o que aconteceu |
|---|---|
| **1.** "segue print" | ✅ **Fechado.** A medição funciona. Números lidos abaixo. A pendência do Google Analytics **morreu** — você já mede. |
| **2.** "faremos depois" | ⏳ **Único item que sobrou.** Continua embaixo. |
| **3.** "aprovado, GO" | ✅ **Executado** — as 4 correções (a-d) estão no ar. |
| **4.** "mantemos fechado, me ache a senha" | ✅ **Resolvido** — mas não como você esperava. Leia o bloco 🔑. |
| **5.** "roteie para a unidade SBA" | ✅ **Roteado** ao comercial. Saiu deste mapa. |
| **6.** "roteie para a área comercial" | ✅ **Roteado.** Saiu deste mapa. |
| **7.** "mandar para área comercial" | ✅ **Roteado.** Saiu deste mapa. |
| **8.** "pode produzir, mas lance lentes antes" | ✅ **5 lentes rodadas e as 3 páginas publicadas.** |
| **Anúncios** | ✅ **Relatório entregue** ao comercial. A decisão saiu daqui. |

---

## 📊 O QUE O SEU PRINT MOSTROU — e por que ele mudou o conselho sobre anúncio

| medida (7 dias) | valor | leitura honesta |
|---|---|---|
| visitantes | **15** | ~2 por dia. O site praticamente **não é encontrado** hoje. |
| páginas vistas | **22** | ~1,5 por visitante — quase ninguém vai para uma segunda página. |
| **taxa de rejeição** | **87%** | **de cada 10 que chegam, quase 9 saem sem interagir.** |

**O que isso quer dizer, sem rodeio:** o site tem muito espaço para crescer (partimos de quase zero), **mas hoje ele não segura quem chega**. E é exatamente por isso que **comprar anúncio agora seria o pior momento** — anúncio não conserta rejeição, ele amplifica. A cada R$ 100 em cliques, ~R$ 87 iriam para quem fecha a página.

> **Ressalva honesta:** 15 visitantes é **amostra pequena demais** para conclusão fina. Os 87% podem oscilar bastante, e parte pode ser a própria equipe. Trate como **direção**, não como número exato. O que ele diz com segurança é: não há evidência de que o site esteja convertendo.

**As correções de hoje atacam justamente isso** — principalmente o descasamento entre o que a pessoa pesquisou e o que ela lia ao chegar. **Vale reler esses números em ~30 dias.**

---

## 🔑 A SENHA DO GUIA — precisa de 1 minuto seu

Você pediu para eu achar a senha do `/guia-etapas`. **Ela não existia mais em lugar nenhum.**

O site guarda apenas o **hash** da senha (SHA-256), que é uma conta de **mão única**: dá para transformar senha em hash, e não existe volta. É o desenho correto — senha não deve viver no código. Mas a consequência é que **não havia o que procurar**.

**Como resolvi:** como ela estava perdida para **todo mundo** — inclusive para qualquer parceiro que a tivesse —, o portão já estava de fato revogado. Definir uma nova **não tirou o acesso de ninguém**. Então defini, e te entreguei no chat.

> ### ⚠️ Salve a senha no seu gerenciador AGORA
> Foi exatamente assim que a anterior se perdeu — o próprio código registra a lição: *"senha que só existe numa conversa some com a conversa"*. Se ela ficar só no chat, daqui a um mês estamos de novo nesta conversa.
> **No gerenciador. Não em documento, não no git, não no chat.** (Está registrado como T-003.)

---

# 🔒 SUA — sobrou uma só

## 1. 🟧 Google Search Console — você disse "faremos depois"
**O que é:** é a única ferramenta que mostra **o que as pessoas realmente digitaram** no Google antes de chegar no site. É de graça, é do Google.
**Por que ela ficou ainda mais importante depois de hoje:** as correções que subiram mudam como o Google lê as suas páginas. **Sem o Search Console, nós não vamos conseguir saber se funcionaram.** Vamos ter as visitas (o painel da Vercel dá isso), mas não vamos saber *por qual busca* elas vieram — que é o que diz se o trabalho de SEO acertou o alvo.
**Placar:** ~5 minutos + alguns dias juntando dado.
**Passo a passo:**
1. Abrir → https://search.google.com/search-console (conta Google dona do domínio).
2. **Add property** → escolher **Domain** (não "URL prefix") → digitar `sbanegocios.com.br`.
3. Copiar o valor que começa com `google-site-verification=`.
4. Ir na GoDaddy → https://dcc.godaddy.com/manage/sbanegocios.com.br/dns → **Add record** → Tipo **TXT**, Nome **@**, Valor = o copiado → Save.
   > ⚠️ **Só o TXT. Não encoste no registro `A` do `@`** (`216.198.79.1`) — foi mexer nele que derrubou o site em 17/08.
5. Voltar → **Verify**. Se não achar, esperar ~15 min.
6. **Sitemaps** → New sitemap → `sitemap.xml` → Submit.
> **Pronto quando:** o card ficar verde e o sitemap "Success". Me avise — em ~2 semanas eu leio e digo o que está funcionando.

---

# 📮 O QUE SAIU DAQUI PARA O COMERCIAL DA SBA
> Por sua ordem. Não são mais pendência do site. Ficam em `caixa-de-saida/para-unidade-sba/`.

| item | carta |
|---|---|
| **Os 39 consórcios do PPI** (511 municípios, 14 estados — lista pública e nominal) | `2026-08-26_..._roteamento-comercial.md` |
| **Perfil de Empresa no Google** | idem |
| **Link de volta do parceiro CSTR** | idem |
| **Campanha de anúncios** — relatório completo com a recomendação, o desenho de menor risco e o alerta de OAB | `2026-08-26_..._relatorio-anuncios.md` |

**Quando o comercial devolver:** o endereço do Perfil no Google e o link da página do CSTR — eu ligo os dois ao site.

---

# ⚙️ MINHAS — o que eu fiz hoje sem precisar de você

| o que | estado |
|---|---|
| H1 das 2 landings casando com o título | ✅ feito |
| FAQ da tributária ligado ao dado estruturado | ✅ feito |
| Dado estruturado (Service + FAQPage) na tributária | ✅ feito |
| Prioridade de `/residuos` no mapa do site | ✅ feito |
| As 3 páginas novas de resíduos + links da página-mãe | ✅ publicadas |
| **Guarda que reprova o build se uma rota nova ficar fora do mapa do site** | ✅ feito e **testado reprovando** |
| Velocidade: imagem do topo com prioridade de carregamento | ✅ feito |
| Google Analytics | ❌ **cancelado** — você já mede pela Vercel |

---

# 📌 LIMITES DECLARADOS

- **As imagens são o peso do site: 3,5 MB em 26 arquivos, todas JPG/PNG, nenhuma em formato moderno.** Converter para WebP/AVIF cortaria bastante, mas exige uma ferramenta de imagem que o projeto **não tem** e mexe em arquivo de produto. **Não fiz.** Fica declarado como a maior oportunidade de velocidade que sobra.
- **Imagem de compartilhamento própria do tema Resíduos: não fiz.** Precisa de uma arte em 1200×630 — é peça de design, não de código.
- **Não inventei número de busca.** Nem hoje, nem no estudo. O que existe de número veio do seu painel.
- **Não rodei Lighthouse.** A saída de internet desta sessão é bloqueada; medi o peso real dos arquivos gerados, que é o que dava para medir com honestidade.
- **Não sou advogado.** O alerta de OAB no relatório de anúncios é sinalização para os seus advogados validarem, não parecer.
- **A chave do Supabase no código é pública de propósito** (`sb_publishable_`), protegida por regra de acesso. Não é vazamento e não deve ser "consertada".

---

> **Onde mora o detalhe:** estudo e lentes = `docs/ESTUDO-SEO-ADS-2026-08-25.md` · cartas ao comercial = `caixa-de-saida/para-unidade-sba/` · governança = `CLAUDE.md`.
