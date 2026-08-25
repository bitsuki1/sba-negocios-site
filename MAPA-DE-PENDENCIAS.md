# MAPA DE PENDÊNCIAS — sba-negocios-site (site institucional da SBA Negócios)
> **🌐 URL para você olhar (padrão D172):** https://claude.ai/code/artifact/a2d0ecf3-8181-445f-ac6c-9418db470fde — foto deste arquivo, republicada no MESMO endereço a cada mudança.
> **Atualizado: 2026-08-25 (v6 — o rename saiu; a V1 foi cumprida por você e a varredura de ponteiros já rodou).** · **Só pendência.** O que já foi feito vive no git — não se repete aqui.
> **Régua de admissão (ordem do dono, 25/08):** *"as pendências são de problemas que atrapalham os demais projetos"*. Item que é **clique ou decisão de uma casa só** fica **neste** mapa. Só sobe ao **mapa do portfólio** o que **trava 2+ casas** ou é **regra para todas** — a lista do que subiu está no fim, em "O que mandei para o escritório".

> ### ✅ Você renomeou o repositório — a V1 saiu daqui
> O repo agora é **`sba-negocios-site`** (era `sba-site`). Fiz a varredura no mesmo turno: **39 ponteiros** corrigidos em 13 arquivos, mais o `package.json` e o endereço do repo na minha cópia local. **Você não precisa fazer mais nada por causa disso.**
> Uma coisa só, para você saber: o endereço antigo (`github.com/bitsuki1/sba-site`) **ainda funciona por um tempo** — o GitHub segura o redirecionamento, mas não para sempre. Se você tiver esse link salvo em algum favorito ou anotação, vale trocar.

**🎯 O que mudou nesta passada:** o escritório mandou **selar** este repo. Foi uma passada de **arrumação**, não de produto — não encostei em conteúdo, design nem texto do site. Achei e consertei **um erro grande de documentação**: o repo dizia que o site era publicado no GitHub Pages, e faz quase 2 meses que ele roda na **Vercel**. Detalhe no bloco ⚠️ logo abaixo, porque isso muda uma das suas pendências.

---

## ⚠️ Leia isto primeiro — corrigi um dado errado que estava te custando dinheiro à toa

O `CLAUDE.md` e o `USO.md` deste repo diziam: *"produção no GitHub Pages, deploy manual"*. **Está errado desde 3 de julho.** O site roda na **Vercel** e se publica sozinho a cada merge na `main`.

**Como eu provei:** o endereço `sbanegocios.com.br` aponta hoje para o número **216.198.79.1** — que é exatamente o número da Vercel escrito dentro do seu próprio script de deploy. O laudo do apagão de 17/08 também fechou com *"apex → 200, servidor: Vercel"*.

**O que isso muda para você, na prática:**
- **Publicar é dar merge na `main`.** Ninguém precisa rodar script nenhum.
- **A sua pendência de medição (era a V3) encolheu.** O motivo dela era *"o medidor da Vercel não funciona no GitHub Pages"*. Como o site **está** na Vercel, e o medidor **já está ligado no código**, é bem provável que você **já esteja medindo** e não saiba. Virou a **V3 nova** abaixo: 1 conferida de 2 minutos antes de você gastar tempo montando o Google Analytics.

---

# 🔒 SUAS — só você faz (cada passo já traz o link do lugar exato)

## 1. 🟩 V3 (nova) · Conferir se a Vercel já está medindo as visitas — 2 minutos, antes de montar qualquer outra coisa
**O que é:** o medidor da Vercel (`@vercel/analytics`) **já está instalado e ligado** no código do site. Antes, ele não servia para nada porque o site estava no GitHub Pages. Agora que está na Vercel, provavelmente **já está coletando**. Vale conferir antes de você montar o Google Analytics do zero.
**Passo a passo:**
1. **Abrir o projeto na Vercel** → https://vercel.com/bitsuki/site-sba-negocios
2. Clicar na aba **Analytics** (no topo).
3. **Se aparecer gráfico com visitas** → você já está medindo. Me avisa e eu **fecho a pendência do Google Analytics** (economiza seu tempo).
4. **Se aparecer um botão "Enable"** → clicar. É 1 clique, e passa a medir a partir dali.
5. **Se disser que precisa de plano pago** → me avisa, aí sim vale montar o Google Analytics (gratuito) e eu sigo o plano antigo.
> **Rec.:** **faça esta antes da V2.** É a mais barata e pode apagar uma pendência inteira.
> **Pronto quando:** você me disser qual das 3 telas apareceu.

## 2. 🟧 V2 · Google Search Console — provar que o site é seu e mandar o mapa do site
**O que é:** sem isso o Google não te conta o que as pessoas pesquisaram para chegar no site. É o primeiro degrau de qualquer trabalho de busca.
**Placar:** 1 verificação + 1 sitemap enviado (~5 min).
**Passo a passo:**
1. **Abrir** → https://search.google.com/search-console (com a conta Google dona do domínio).
2. **Add property** → escolher **Domain** (não "URL prefix") → digitar `sbanegocios.com.br` → Continue.
3. O Google mostra um valor `google-site-verification=…` — copiar.
4. **Colar na GoDaddy** → https://dcc.godaddy.com/manage/sbanegocios.com.br/dns → Add record → Tipo **TXT**, Nome **@**, Valor = o que você copiou → Save.
   ⚠️ **Só adicione o TXT. Não encoste no registro `A` do `@`** (o `216.198.79.1`) — foi exatamente mexer ali que derrubou o site em 17/08.
5. Voltar ao Search Console → **Verify**. Se disser que não achou, esperar ~15 min e tentar de novo.
6. **Sitemaps** → New sitemap → digitar `sitemap.xml` → Submit.
> **Pronto quando:** o card do domínio ficar verde e o sitemap aparecer como "Success".

## 3. 🟨 V4 · Perfil de Empresa no Google — aparecer no mapa e na busca local
**O que é:** aquele card à direita do resultado quando alguém pesquisa o nome da empresa. Gratuito.
**Passo a passo:**
1. **Abrir** → https://www.google.com/business/ → Sign in.
2. **Add business → Add single business** → nome "SBA Negócios".
3. **Categoria** → "Consultor de gestão" ou "Consultoria empresarial".
4. **Endereço** → o mesmo que está no site: Rua XV de Novembro, 200 — 15º andar, Sé/SP. (Se preferir não expor endereço, escolher "atende clientes na área".)
5. Provar por telefone ou carta (o Google escolhe).
6. Preencher telefone, site, horário, logo e 2–3 fotos.
> **Rec.:** depois da V2. É uma-vez-só.
> **Pronto quando:** o card aparecer ao pesquisar "SBA Negócios".

## 4. 🟨 V5 · Pedir ao parceiro CSTR um link de volta para o site
**O que é:** hoje a sua página de resíduos linka para o CSTR. Se o CSTR linkar de volta, o Google entende que os dois se reconhecem — e empresta reputação. É o link mais fácil que você tem à mão.
**Passo a passo:**
1. **Abrir** → https://cstr.eco.br
2. Procurar "Parceiros" ou "Sobre" e ver se a SBA já está lá.
3. Mandar ao contato do CSTR: *"Vocês teriam como incluir a SBA Negócios (https://sbanegocios.com.br) na página de parceiros? Fortalece o Google dos dois lados."*
> **Rec.:** mande esta semana.
> **Pronto quando:** aparecer o nome ou o logo da SBA em alguma página do CSTR.

## 5. 🟨 V7 · Aprovar (ou não) 3 páginas novas para o tema Resíduos
**O que é:** hoje "resíduos" é uma página só. Quem procura digita coisa específica. Cada busca dessas merece uma página própria — é assim que se multiplica a chance de aparecer.
**As 3 propostas:**
- `/residuos/consorcio-intermunicipal-residuos` — grupos de municípios (o modelo mais viável no interior).
- `/residuos/rsu-prefeitura` — prefeituras pequenas e médias procurando destinação legal.
- `/residuos/usina-biometano-municipal` — prefeituras que já têm coleta seletiva.
Cada uma reaproveita o layout que já existe. Pouco código novo, bastante ganho.
> **Rec.:** **aprovar as 3.** Se quiser fatiar, começo pela **de consórcio** — é o tema mais quente das prefeituras.
> **Pronto quando:** você responder "vai as 3" ou "vai só a de consórcio". Começo no mesmo turno.

---

# ⚙️ MINHAS — não precisam de você (estão aqui para você VER, não para cobrar)

| id | o que é | estado |
|---|---|---|
| M3 | Página `/residuos/consorcio-intermunicipal-residuos` | ⏳ depende da V7 |
| M4 | Página `/residuos/rsu-prefeitura` | ⏳ depende da V7 |
| M5 | Página `/residuos/usina-biometano-municipal` | ⏳ depende da V7 |
| M6 | Imagem de compartilhamento própria do tema Resíduos (hoje usa a da home) | ⏳ posso fazer, baixa prioridade |
| M7 | Data de atualização automática no mapa do site (`sitemap.xml`) | ⏳ posso fazer |
| M8 | Ligar o Google Analytics no site | ⏸️ **em espera pela V3 nova** — pode não ser mais necessário |
| M9 | Medir a velocidade do site e corrigir as 3 piores coisas | ⏳ posso fazer |
| M11 | Aterrissar (ou descartar) a economia de CI presa num galho morto — ver "Limites" | ⏳ depende do escritório |

_(M1, M2 e M10 saíram: feitos ou reclassificados. Vivem no git.)_

---

# 📌 LIMITES DECLARADOS — não são pendência, e não se apagam

- **Robô "chega na main" (D170) não existe neste repo.** Instalar exige um segredo de Actions configurado no próprio repositório = 1 clique seu. Pela régua de 25/08, **clique de uma casa só não vira pendência sua** — fica aqui declarado, e **o escritório decide** se vale o clique. Nada trava por causa disso.
- **Galho morto com trabalho dentro.** O galho `claude/instance-concurrency-94pbeg` carrega 1 commit que **nunca aterrissou**: tira o gatilho de "pull request" do robô de checagem, cortando ~50% do consumo de Actions. **Não apliquei** porque reduz a checagem automática nos PRs — é decisão de esteira, e esteira é do escritório. **Não apagar esse galho** enquanto não for decidido (é o M11).
- **Não mexo em produto sem sua ordem** — conteúdo, design e texto do site ficaram intocados nesta passada. V7 é a via limpa para você despachar mais produto.
- **Não toco Supabase nem Vercel** por esta sessão. A V3 nova é você olhando um painel — eu não mexo lá.
- **Se um dia eu achar senha ou chave dentro do git aqui**, a ação é sua (rotacionar), não minha. Nesta passada **varri e não achei nada** — detalhe no relatório ao escritório.
- **A chave do Supabase que aparece no código é pública de propósito** (`sb_publishable_…`). Ela vai embutida no site por desenho; quem protege o banco é a regra de acesso (RLS), não o segredo dessa chave. **Não é vazamento e não deve ser "consertada"** — trocar isso quebraria o formulário do site sem ganho de segurança.

---

# 📮 O que mandei para o escritório (o que passou na régua de admissão)
> Estes **saíram** do seu mapa porque não são clique seu — são coisa do escritório, e afetam mais de uma casa.

| o que | por que sobe |
|---|---|
| **Ponteiro fantasma:** o mapa do portfólio chama este repo de `site-sba-negocios` — nome que nunca existiu. **Alvo correto e final: `sba-negocios-site`** (avisei o escritório em carta própria, para ele não corrigir para `sba-site`, que também já é passado) | Faz sessão irmã montar o repo errado. Atrapalha outras casas. |
| **Regra sem arquivo:** a régua de admissão de 25/08 não existe como arquivo no escritório | É **regra para todas** as casas; sem arquivo, cada sessão inventa a sua. |
| **Vacina nova:** repo carregou por ~7 semanas um `CLAUDE.md` que apontava o alvo de deploy errado | Vale como regra para todas: quem sela um repo tem que **medir** onde o site mora, não acreditar no que o doc diz. |

---

> **Regras deste mapa:** tudo que você pede e tudo que eu descubro entra aqui na hora · ação sua = link direto, um por passo · resolvido **sai** (vive no git) · nada aqui cobra pendência morta.
> **Onde mora o detalhe:** governança = `CLAUDE.md` · o que é o site = `USO.md` · stack = `README.md` · o apagão de 17/08 = `docs/INCIDENTE-2026-08-17-loop-redirect-apex.md` · buscas = `src/lib/seo-routes.json`.
