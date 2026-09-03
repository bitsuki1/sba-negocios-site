# MAPA DE PENDÊNCIAS — SBA · Site (sba-negocios-site)
> **🌐 Sua página:** https://claude.ai/code/artifact/8bf55b35-ffa5-4c03-9257-67c3fa94f09d — republicada no MESMO endereço a cada mudança. Fonte: `scratchpad/mapa-pendencias.html`.
> **Atualizado: 2026-09-03 (v9 — mapa posto no molde único do portfólio; 3 pendências suas, 8 minhas, 3 combinadas)** Desde 26/08 o site não mudou — o que andou foi governança (porta de segredos, permissões pré-liberadas, este molde). Tudo o que você decidiu em 26/08 está no ar e saiu daqui. Sobram três coisas suas: guardar a senha do guia (1 minuto), o Search Console quando você disser, e um insumo opcional.
> **Como responder:** cite o código (*"resolve o P2"*) ou clique na caixa quando eu trouxer. 🔒 = você faz · ⚙️ = eu faço, é só para você ver.
> **Régua desta casa (sua ordem, 26/08):** aqui só o que é 100% do site — código, SEO, conteúdo, publicação. Comercial e negócio moram na unidade `sba-unidades-de-negocios`; o que trava outras casas sobe ao mapa do escritório.

---

# 🔒 SEUS — 1 minuto hoje (P1) · 1 quando você disser (P2) · 1 opcional (P3)

> Você respondeu os 8 itens de 26/08; sete saíram no mesmo dia. Nada novo entrou desde então. Quando eu precisar de você, aparece em **caixa de clique** na tela, nunca em parágrafo no fim de um texto.

## P1 · 🟥 Guardar a senha nova do guia de parceiros no seu gerenciador (T-003)
Em 26/08 eu redefini a senha do `/guia-etapas` — a antiga estava perdida para todo mundo, porque o site guarda só uma versão embaralhada dela, de mão única — e te entreguei a nova no chat. Se ela ficar só na conversa, some com a conversa: foi exatamente assim que a anterior se perdeu.

> **Sem link para a senha:** ela foi entregue na conversa de 26/08 (a que executou suas 8 decisões), e conversa não tem endereço fixo. Os passos abaixo dizem o nome exato do que você vê na tela.

1. **Abrir o cofre** → app do Bitwarden no celular, ou https://vault.bitwarden.com/#/vault no navegador (a lista dos seus itens)
2. **Criar um item novo** → botão **Novo item** → tipo **Login** → nome `SBA site — senha do guia de parceiros` → cole a senha no campo **Senha** → **Salvar** *(⚠️ não a guarde em documento, no git nem no chat — só no cofre)*
3. **Conferir que abre** → https://sbanegocios.com.br/guia-etapas → digite a senha → a página do guia aparece
4. **Se não achar mais a conversa de 26/08** → me diga *"gera a senha de novo"* e eu redefino outra na hora (ninguém perde acesso: no site mora só a versão embaralhada)

**Pronto quando:** o item aparece na sua lista do Bitwarden e o `/guia-etapas` abre com a senha guardada lá. Me diga *"guardei"* e eu fecho a T-003.
**Rec.:** hoje. Leva 1 minuto, e cada dia sem guardar é um dia a mais de risco de repetirmos esta conversa.

## P2 · 🟡 Ligar o Google Search Console — quando você disser (era o item 2 de 26/08: *"faremos depois"*)
É a única ferramenta que mostra **o que as pessoas digitaram no Google** antes de chegar ao site. É de graça e é do Google. Sem ela, as correções de 26/08 ficam sem prova: o painel da Vercel dá as visitas, mas não a busca que trouxe cada uma — e é a busca que diz se o trabalho de SEO acertou o alvo.

1. **Abrir o Search Console** → https://search.google.com/search-console/welcome (entre com a conta Google dona do domínio)
2. **Adicionar a propriedade** → do lado esquerdo, escolha **Domínio** (não "Prefixo do URL") → digite `sbanegocios.com.br` → **Continuar** → copie o texto que começa com `google-site-verification=`
3. **Criar o registro na GoDaddy** → https://dcc.godaddy.com/manage/sbanegocios.com.br/dns → **Adicionar registro** → Tipo **TXT** · Nome **@** · Valor = o texto copiado → **Salvar** *(⚠️ só o TXT. NÃO encoste no registro A do @ — o `216.198.79.1` — foi mexer nele que derrubou o site em 17/08)*
4. **Verificar** → volte ao Search Console → **Verificar**. Se disser que não achou, espere uns 15 minutos e tente de novo
5. **Enviar o mapa do site** → https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Asbanegocios.com.br → digite `sitemap.xml` → **Enviar**

**Pronto quando:** a propriedade aparece como verificada (sem aviso vermelho) e o sitemap mostra **Sucesso**. Me avise — duas semanas depois eu leio e digo o que está funcionando (é o N3).
**Rec.:** quando você disser — mas quanto antes melhor, porque o relógio dos dados só começa a contar depois de verificado.

## P3 · 🟢 Foto ou notícia do projeto de Congonhas do Campo — opcional (T-002)
A página de resíduos mostra o projeto-farol do parceiro CSTR em Congonhas do Campo (MG). Ela funciona sem isso e já está no ar; fica mais forte com uma prova de fora.

> **Sem link:** os dois insumos estão com você ou com o parceiro, não numa tela.

1. **Se tiver foto ou imagem do canteiro** (JPG ou PNG, pelo menos 1200×800, do parceiro CSTR) → me mande na conversa
2. **Se souber de notícia sobre o projeto** (portal da prefeitura, jornal local, G1…) → me mande o endereço
3. **Se não tiver nenhum dos dois** → me diga *"seguir sem"* e eu fecho a T-002

**Pronto quando:** https://sbanegocios.com.br/residuos mostra a foto e o link — ou você disse *"seguir sem"*.
**Rec.:** *"seguir sem"*, se não estiver à mão. Nada trava por causa disso.

---

# 📅 PRÓXIMA INSTÂNCIA — combinado com você, não é cobrança

| código | o quê | gatilho |
|---|---|---|
| **N1** | Ligar ao site o **Perfil de Empresa no Google** e o **link de volta do parceiro CSTR** — as 2 cartas chegaram ao comercial da SBA em 26/08 (entregues pelo escritório); ele ainda não devolveu os endereços | depois que o comercial da SBA devolver os 2 endereços pela caixa da unidade |
| **N2** | Reler os números do painel da Vercel (visitas · páginas vistas · rejeição) e comparar com os **15 · 22 · 87%** de 26/08 — para saber se as correções seguraram quem chega | a partir de **26/09** (30 dias depois das correções); eu peço o print ou leio pela ferramenta da Vercel, se ela mostrar |
| **N3** | Ler o Search Console e dizer **por qual busca** cada visita chegou — o veredito do trabalho de SEO | 2 semanas depois de você fazer o **P2** |

---

# ⚙️ MINHAS — só para você ver

| # | o quê | estado |
|---|---|---|
| M1 | **Apagar os galhos já aterrissados** — medi os 20 galhos do repositório em 03/09: **18** têm tudo o que carregam já na `main` (14 `claude/*` + 4 `escritorio/*`; o laudo do incidente de 17/08 entrou à mão em 25/08, idêntico) e o **`gh-pages`** é do tempo do GitHub Pages. Tento pelo git primeiro; só o que a ferramenta negar vira clique seu, um link por galho | ⏳ |
| M2 | **Decidir a esteira do robô de qualidade** — aplicar ou descartar o commit `7277402` (galho `claude/instance-concurrency-94pbeg`: tira a rodada por PR do linter, metade do consumo de robô). É decisão do escritório, classe B; **o galho não se apaga antes** | ⏳ |
| M3 | **Aposentar o legado do GitHub Pages** — o robô `deploy-pages.yml` (0 de 29 execuções, silenciado em 13/08, nunca removido) e o script `deploy-producao.sh`. Recomendado ao escritório em 25/08, sem decisão até hoje | ⏳ |
| M4 | **Reconciliar as cópias herdadas do escritório** — as cópias são de 22–25/08 e o escritório mudou em 01–03/09: template do mapa (o molde), padrão-ouro, padrão de repo, matriz de lições, índice das regras, a régua de admissão (hoje já tem arquivo-fonte lá — a pendência A-453 fechou) e o gerador do mapa (a cópia de 03/09 já está 5 linhas atrás) | ⏳ |
| M5 | **Trazer o linter novo do kit** — o de lá confere sozinho se a página do mapa está em dia com este arquivo (aviso amarelo quando defasar); o daqui é de 27/08 e não confere | ⏳ |
| M6 | **Faxina de rastro** — 2 linhas defasadas no `CLAUDE.md` (o §5 ainda trata o rename como pendente; o §9 chama de "viva" a carta de 22/08 já processada) + carimbar como processadas as 4 cartas que já chegaram ao destino (2 ao escritório em 25/08, 2 ao comercial em 26/08) | ⏳ |
| M7 | **O escritório corrige o que as superfícies dele dizem errado sobre esta casa** — a regra de boot ainda diz `site-sba-negocios` (nome que nunca existiu: é o projeto na Vercel), e o mapa do portfólio e o registro de apps dizem "GitHub Pages" (é Vercel desde 03/07) | ⏳ |
| M8 | **Selo de onda desta casa** — o fecho de 25/08 recomendou *"pode selar"* com as 7 portas provadas; a torre ainda não emitiu | ⏳ |

---

# 📌 LIMITES DECLARADOS — ficam para não sumirem, não para serem cobrados

- **Os 4 itens roteados ao comercial da SBA** (a lista dos 39 consórcios do PPI · Perfil de Empresa no Google · link de volta do CSTR · campanha de anúncios) **não são pendência do site** — sua ordem, 26/08. Chegaram ao comercial em 26/08 e foram processados lá; o site só espera a devolução do N1.
- **O robô "chega na main" (D170) não existe nesta casa** — precisa de 1 clique seu (um segredo nas configurações do repositório). A casa declarou em 25/08 e o escritório decide se vale; o plano da onda de 01/09 o previa e não o entregou. Nada trava por causa disso.
- **Colisão de nome `SELO.md` × `SELO-DE-FECHO.md`** — o arquivo daqui carimba só o KIT, não é selo de onda; dúvida registrada em 25/08, o escritório arbitra. Até lá, o aviso no topo do arquivo é a mitigação.
- **O guia de etapas fica fechado** (fora do Google e com senha) — sua decisão, 26/08 (*"mantemos fechado"*). A versão pública resumida que o estudo propôs não foi aprovada; se um dia quiser, é decisão sua em caixa.
- **As imagens são o peso do site: 3,5 MB em 26 arquivos, todas JPG/PNG.** Converter para formato moderno cortaria bastante, mas exige ferramenta que o projeto não tem e mexe em arquivo de produto — não feito (instância, 26/08). Só com o seu *"vai"*.
- **Imagem de compartilhamento própria do tema Resíduos (arte 1200×630)** — é peça de design, não de código; não feita (instância, 26/08).
- **Perguntas jurídicas novas no FAQ da tributária** (prazo, prescrição) só entram com fonte do jurídico da SBA — escrever sem fonte seria pior que a lacuna (instância, 26/08).
- **Não há número de volume de busca no estudo de 25/08** — nenhum foi inventado; só o Search Console (P2) responde a isso.
- **Lighthouse não rodado** (a sessão de 26/08 não tinha saída de internet) — o que se mediu foi o peso real dos arquivos gerados.
- **O alerta de OAB** (Provimento 205/2021) no relatório de anúncios é sinalização para os seus advogados validarem, não parecer — quem escreveu não é advogado (instância, 26/08).
- **A chave `sb_publishable_` do Supabase no código é pública por desenho** (D206) — quem protege o dado é a regra de acesso do banco. Não é vazamento e não deve ser "consertada" (escritório e instância, 25/08).
- **A chave do Resend (aviso de lead por e-mail) não está no git** — vive só embutida na função publicada no Supabase (verificado 03/07). Se a função for republicada da fonte, é preciso cadastrar `RESEND_API_KEY` como segredo lá, senão o aviso de lead para em silêncio (o lead continua salvo). Risco aceito por você em 03/07; revogar o lote Resend está no seu *"não faremos"* de 25/08.
- **CNPJ e razão social, logos ConAid/Dynacal e material do time NÃO entram no site** — sua decisão definitiva, 03/07. Não reabrir.
- **Política de Privacidade sem CNPJ e não revisada por advogado** — risco aceito por você em 03/07; dado pessoal de terceiro segue a sua postura de 20/06. Uma linha, e segue.
- **Conteúdo de parceiros (CSTR, ConAid)** é atribuído a eles, não auditado por terceiro; **NEOMAG** marcada como P&D — sua decisão, 03/07.
- **E-mail exibido no site é `@saobentoservicos.com.br`** — domínio próprio descartado para e-mail, sua decisão de 28/06.
- **O DNS mora na GoDaddy e só você mexe** (regra desde 03/07). O incidente de 17/08 (site em loop) veio de um encaminhamento religado no apex — por isso o P2 avisa para não tocar no registro A.
- **A unidade SBA (`sba-unidades-de-negocios`) não se co-monta com este repositório** (D201) — números, textos jurídicos e cases vêm pela caixa, nunca por escrita cruzada.

---
> **Onde mora o resto:** o que já foi feito vive no git e no `HANDOFF-ULTIMO.md` — **não neste mapa**.
> Se esta página abrir vazia, me diga **"republica o meu mapa"**.
