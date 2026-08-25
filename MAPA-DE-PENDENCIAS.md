# MAPA DE PENDÊNCIAS — sba-negocios-site (site institucional da SBA Negócios)
> **🌐 URL para você olhar (padrão D172):** https://claude.ai/code/artifact/8bf55b35-ffa5-4c03-9257-67c3fa94f09d — foto deste arquivo, republicada no MESMO endereço a cada mudança.
> ⚠️ **Endereço NOVO desde 2026-08-25.** O anterior (`…a2d0ecf3…`) foi **apagado** e não abre mais — se você tiver ele salvo, troque pelo de cima. O endereço novo é o estável daqui pra frente.
> **Atualizado: 2026-08-25 (v7 — estudo de SEO das 2 landings + Ads + ferramentas).** · **Só pendência.** O que já foi feito vive no git.
> **Régua de admissão (sua ordem, 25/08):** só sobe ao mapa do portfólio o que trava 2+ casas ou é regra para todas. Tudo aqui é **desta casa** — é a sua fila do site, não a fila do portfólio.
> **O estudo completo** (o porquê de cada item, com as fontes) está em `docs/ESTUDO-SEO-ADS-2026-08-25.md`. Este mapa é só a fila.

---

## 🧭 LEIA ISTO PRIMEIRO — a ordem importa mais que a lista

Você pediu SEO e pensou em Ads. Depois de estudar, a recomendação muda a ordem natural, e vale explicar em 30 segundos por quê:

**Anúncio no Google não cria procura — ele compra a procura que já existe.** Se pouca gente procura "recuperação de IRRF do município", nenhum orçamento muda isso. E hoje **nós não sabemos** quanta gente procura, porque o site nunca foi ligado à ferramenta que mede isso.

Então a ordem é:

> **1º descobrir se tem procura (grátis) → 2º arrumar as páginas para capturar → 3º só então decidir se paga anúncio.**

E tem uma quarta coisa, que eu achei no meio do estudo e que provavelmente vale mais que as três juntas para o lado dos resíduos: **existe uma lista pública com 39 consórcios de lixo já organizados e com dinheiro federal para contratar projeto.** Está no item 5.

---

# 🔒 SUAS — na ordem recomendada

## 1. 🟩 Olhar o painel da Vercel — 2 minutos, e pode apagar uma pendência inteira
**O que é:** o medidor de visitas da Vercel **já está instalado no site** e provavelmente já está coletando. Antes de montar Google Analytics do zero, vale conferir se você já tem o dado.
**Passo a passo:**
1. Abrir → https://vercel.com/bitsuki/site-sba-negocios
2. Clicar na aba **Analytics**, no topo.
3. **Se aparecer gráfico com visitas** → me avise; eu **apago a pendência do Google Analytics** e você economiza o trabalho.
4. **Se aparecer um botão "Enable"** → clicar. É 1 clique e passa a medir dali em diante.
5. **Se pedir plano pago** → me avise; aí sim vale o Google Analytics, que é grátis.
> **Pronto quando:** você me disser qual das 3 telas apareceu.

## 2. 🟧 Google Search Console — o degrau zero. Sem ele, tudo o resto é chute
**O que é:** é a ferramenta que mostra **o que as pessoas realmente digitaram** no Google antes de cair no site. É de graça, é do Google, e é ela que vai dizer se vale ou não gastar com anúncio. Enquanto ela não roda, ninguém — nem eu — sabe se existe procura pelos seus temas.
**Placar:** ~5 minutos + esperar uns dias juntar dado.
**Passo a passo:**
1. Abrir → https://search.google.com/search-console (com a conta Google dona do domínio).
2. **Add property** → escolher **Domain** (não "URL prefix") → digitar `sbanegocios.com.br` → Continue.
3. O Google mostra um valor que começa com `google-site-verification=…` — copiar.
4. Ir na GoDaddy → https://dcc.godaddy.com/manage/sbanegocios.com.br/dns → **Add record** → Tipo **TXT**, Nome **@**, Valor = o que copiou → Save.
   > ⚠️ **Só adicione o TXT. Não encoste no registro `A` do `@`** (o `216.198.79.1`). Foi mexer nesse registro que derrubou o site em 17/08.
5. Voltar ao Search Console → **Verify**. Se disser que não achou, esperar ~15 min e tentar de novo.
6. **Sitemaps** (menu esquerdo) → New sitemap → digitar `sitemap.xml` → Submit.
> **Pronto quando:** o card do domínio ficar verde e o sitemap aparecer "Success". **Me avise** — daí a ~2 semanas eu leio os dados e te digo, com número real, se Ads faz sentido.

## 3. 🟩 Aprovar o pacote de correções das 2 landings — é o trabalho que eu faço, só preciso do seu "vai"
**O que é:** o estudo achou problemas concretos nas duas páginas. Nenhum deles é de conteúdo — eu **não** vou mexer no que você escreveu. São problemas de *estrutura*, que é o que o Google lê.

**O achado principal, em português:** o **título** da página de resíduos promete "Usina de Resíduos Sólidos Urbanos para prefeituras e consórcios", mas o **texto grande** que abre a página diz *"Resíduo não é só custo. Bem aproveitado, vira receita."* — uma frase de efeito que não repete **nenhuma** das palavras que alguém digitaria. A página promete um assunto e abre com outro.
**A correção não apaga a frase boa** — ela vira o subtítulo, um degrau abaixo. Não se perde nada.

**O pacote (a-d):**
- **(a) Trocar o texto de abertura das 2 páginas** para conter as palavras que as pessoas procuram; a frase de efeito atual vira subtítulo.
- **(b) Criar o FAQ da página do Tema 1130** — ela **não tem**, e é o tema com mais dúvida real ("precisa de processo judicial?", "quantos anos para trás?", "o Tribunal de Contas questiona?"). A de resíduos já ganhou FAQ em agosto; a tributária ficou para trás.
- **(c) Ligar o dado estruturado na página do Tema 1130** — é o código que faz o Google mostrar as perguntas direto no resultado da busca. **A mecânica já existe e funciona** na página de resíduos; é reaproveitar.
- **(d) Subir a prioridade de `/residuos`** no mapa do site (hoje está *abaixo* da tributária, sendo que é o eixo que você quer crescer).
> **Rec.:** **aprovar o pacote inteiro (a-d).** É a maior relação ganho/esforço da lista e não toca no seu texto.
> **Pronto quando:** você responder "vai o pacote" (ou disser quais letras quer).

## 4. 🟨 Decidir o que fazer com o guia que está escondido
**O que é:** a melhor peça de conteúdo do site — o `/guia-etapas`, com as 13 etapas, os 4 caminhos do dinheiro e o que se assina — está **fechado por senha e invisível para o Google, de propósito**.
Fechar pode estar certíssimo (é material comercial). Mas o efeito é que **o seu melhor conteúdo não trabalha para você** no Google. Se um concorrente publicar um guia parecido aberto, ele aparece e você não.
**A proposta:** manter o guia fechado como está **e** publicar uma **versão pública resumida** — sem preços e sem o detalhe comercial, só a explicação do Tema 1130, as etapas em linhas gerais e as dúvidas frequentes. Quem quiser o detalhe pede acesso.
> **É decisão sua, não minha** — envolve o quanto você quer expor do comercial.
> **Pronto quando:** você responder "pode fazer a versão pública" ou "deixa fechado".

## 5. 🟨 A lista dos 39 consórcios — provavelmente vale mais que todo o resto desta página
**O que é:** achei isto pesquisando o setor. O Governo Federal (PPI + BNDES + Caixa) abriu um chamamento para ajudar consórcios de municípios a **estruturar concessões de lixo urbano**. De 86 inscritos, **39 foram habilitados** — somando **511 municípios em 14 estados**. **A lista é pública e tem nome.**

**Por que isso é grande:** um consórcio dessa lista já é, por definição, **organizado juridicamente**, **com escala** (mínimo 150 mil habitantes), **com dinheiro federal para contratar o projeto** e **comprometido a cobrar pelo serviço depois**. É exatamente o seu cliente — com nome e estado, numa lista de graça.

> Nenhuma campanha de anúncio vai te entregar 39 clientes qualificados. **Essa lista entrega.**

**Passo a passo:**
1. Abrir → https://ppi.gov.br e procurar por "consórcios habilitados resíduos sólidos urbanos".
2. Ver a lista e marcar os consórcios dos estados onde a SBA já tem parceiro/atuação.
3. Me dizer quais te interessam — eu monto o material de abordagem em cima do que o site já tem.
> **Isto não substitui o SEO:** o consórcio que você contatar **vai pesquisar a SBA no Google antes de responder**. As páginas precisam estar boas para sustentar a prospecção. São papéis diferentes.
> **Pronto quando:** você me disser quais estados/consórcios quer atacar primeiro.

## 6. 🟨 Perfil de Empresa no Google
**O que é:** o card à direita do resultado quando alguém pesquisa "SBA Negócios". Gratuito, uma-vez-só.
**Passo a passo:**
1. Abrir → https://www.google.com/business/ → Sign in.
2. **Add business → Add single business** → nome "SBA Negócios".
3. **Categoria** → "Consultor de gestão" ou "Consultoria empresarial".
4. Endereço → o que está no site (Rua XV de Novembro, 200 — 15º andar, Sé/SP). Se preferir não expor, escolher "atende clientes na área".
5. Provar por telefone ou carta. Preencher telefone, site, horário, logo e 2–3 fotos.
> **Pronto quando:** o card aparecer ao pesquisar "SBA Negócios".

## 7. 🟨 Pedir ao CSTR o link de volta
**O que é:** sua página de resíduos linka para o CSTR. Se o CSTR linkar de volta, o Google entende que os dois se reconhecem e empresta reputação. É o link mais fácil que você tem à mão.
**Passo a passo:**
1. Abrir → https://cstr.eco.br e ver se a SBA já está em "Parceiros".
2. Mandar ao contato: *"Vocês teriam como incluir a SBA Negócios (https://sbanegocios.com.br) na página de parceiros? Fortalece o Google dos dois lados."*
> **Pronto quando:** aparecer o nome ou o logo da SBA em alguma página do CSTR.

## 8. 🟨 Aprovar (ou não) as 3 páginas novas de resíduos
**O que é:** hoje "resíduos" é uma página só, mas quem procura digita coisa específica. Cada busca dessas merece página própria.
- `/residuos/consorcio-intermunicipal-residuos` — grupos de municípios (**conversa direto com o item 5**)
- `/residuos/rsu-prefeitura` — prefeituras pequenas e médias
- `/residuos/usina-biometano-municipal` — quem já tem coleta seletiva
> **Rec.:** aprovar as 3. Se quiser fatiar, **começo pela de consórcio** — é a que casa com a lista dos 39.
> **Pronto quando:** você responder "vai as 3" ou "vai só a de consórcio".

---

# ⏸️ ANÚNCIOS PAGOS — minha recomendação é ESPERAR, e explico por quê

Você levantou a campanha de Ads. Estudei e **recomendo não começar agora**. Não é "não" — é "ainda não", por quatro motivos concretos:

1. **Você compraria sem saber o preço.** Anúncio captura procura existente. Não sabemos se ela existe — e o **item 2 (Search Console) responde isso de graça em ~2 semanas.**
2. **O público é minúsculo por natureza.** São 5.570 municípios, com 2 ou 3 decisores cada. Isso não é mercado de volume de busca — é mercado de **lista nominal**. Daí o item 5 valer tanto.
3. **O clique não encurta a licitação.** Compra de prefeitura passa pela Lei 14.133. O anúncio, no máximo, gera o pedido de estudo — que a página já oferece de graça.
4. **⚠️ Tem uma questão de OAB que precisa da sua atenção.** A página diz que o estudo é *"conduzido por advogados e contadores especializados"*. Isso liga o serviço à advocacia, e publicidade de advocacia é regulada: o **Provimento 205/2021 da OAB permite** anunciar no Google, mas **proíbe prometer resultado** e exige tom informativo. *"Recupere milhões para sua cidade"* seria problema; *"Estudo sem custo sobre o Tema 1130 para municípios"* é informativo.
   > **Eu não sou advogado e isto não é parecer.** É um alerta para você **mostrar o texto do anúncio aos advogados que já trabalham com você** antes de publicar. Barato perguntar, caro errar.

**Quando revisitar:** assim que o Search Console tiver ~30 dias de dado. Aí eu volto com número real e a decisão fica fácil. Se você quiser testar antes mesmo assim, o desenho de menor risco (orçamento, palavras negativas, o que desligar) está pronto em `docs/ESTUDO-SEO-ADS-2026-08-25.md` §4.

---

# ⚙️ MINHAS — não precisam de você (estão aqui para você VER, não para cobrar)

| id | o que é | estado |
|---|---|---|
| M12 | Trocar o texto de abertura (H1) das 2 landings | ⏳ depende do item 3 |
| M13 | FAQ da página do Tema 1130 (6 perguntas do setor) | ⏳ depende do item 3 |
| M14 | Dado estruturado na página do Tema 1130 (reusa o que já existe) | ⏳ depende do item 3 |
| M15 | Prioridade de `/residuos` no mapa do site | ⏳ depende do item 3 |
| M16 | Versão pública resumida do guia de etapas | ⏳ depende do item 4 |
| M3/M4/M5 | As 3 páginas novas de resíduos | ⏳ depende do item 8 |
| M6 | Imagem de compartilhamento própria do tema Resíduos | ⏳ posso fazer, baixa prioridade |
| M7 | Data de atualização automática no mapa do site | ⏳ posso fazer |
| M8 | Ligar o Google Analytics | ⏸️ em espera pelo item 1 — pode não ser necessário |
| M9 | Medir a velocidade do site e corrigir as 3 piores coisas | ⏳ posso fazer |
| M11 | Economia de CI presa num galho morto (decisão do escritório) | ⏳ depende do escritório |

---

# 📌 LIMITES DECLARADOS — não são pendência, e não se apagam

- **Não inventei nenhum número de busca.** Não tenho ferramenta de volume nesta sessão. Quem responde "quantas pessoas procuram isso" é o Search Console (dado real) e o Planejador de Palavras-chave (faixas). **É por isso que o item 2 vem antes de tudo.**
- **Não abri o site nem os concorrentes ao vivo** — a saída de internet desta sessão é bloqueada pelo proxy. A leitura de concorrentes veio de busca, não de medição de posição.
- **Não mexi em nenhuma página.** O estudo é lente, não execução. Nada de produto foi alterado — espero o seu "vai" no item 3.
- **Não toco Supabase nem Vercel.** O item 1 é você olhando um painel; eu não entro lá.
- **Não sou advogado.** A observação sobre OAB é sinalização de risco para validar com os seus, não parecer jurídico.
- **A chave do Supabase que aparece no código é pública de propósito** (`sb_publishable_`). Protegida por regra de acesso (RLS). **Não é vazamento e não deve ser "consertada"** — mexer nela quebra o formulário sem ganho de segurança.

---

# 📮 O que mandei para o escritório (passou na régua de admissão)

| o que | por que sobe |
|---|---|
| **Ponteiro fantasma:** o mapa do portfólio chama este repo de `site-sba-negocios`, nome que nunca existiu. **Alvo correto e final: `sba-negocios-site`** | Faz sessão irmã montar o repo errado |
| **Regra sem arquivo:** a régua de admissão de 25/08 não existe como arquivo no escritório | É regra para **todas** as casas |
| **Vacina:** o repo carregou ~7 semanas um alvo de deploy errado com gate verde o tempo todo | Regra para todas: quem sela **mede** onde o site mora |
| **Esteira:** robô de CI que nunca funcionou (0 de 29) foi silenciado, não consertado | Decisão de esteira é do escritório |

---

> **Onde mora o detalhe:** o estudo completo = `docs/ESTUDO-SEO-ADS-2026-08-25.md` · governança = `CLAUDE.md` · o que é o site = `USO.md` · o apagão de 17/08 = `docs/INCIDENTE-2026-08-17-loop-redirect-apex.md` · buscas = `src/lib/seo-routes.json`.
