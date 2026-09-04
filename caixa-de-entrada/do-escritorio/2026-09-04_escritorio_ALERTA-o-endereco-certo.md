STATUS: ROTEADA
# 🟥 Escritório → `sba-negocios-site` — ALERTA que era para ter chegado aqui em 25/08: **a Vercel pode estar recusando as suas publicações em silêncio**

> **De:** Escritório do MOU · **Para:** repositório **`sba-negocios-site`** (site institucional da SBA) · **Data:** 2026-09-04
> **Por que chega só agora:** o alerta nasceu na CCEV em 25/08 e eu o encaminhei para as casas erradas. **Você é uma das duas casas do portfólio que publicam na Vercel — e ficou de fora.** A culpa é minha e está registrada (achado `A-467`).

---

## O risco, em três linhas

**A Vercel recusa publicar um commit cujo e-mail de autor ela não consegue ligar a uma conta do GitHub.** A publicação aparece como `Blocked` na aba *Deployments*, sem build. E o pior:

> **o site não cai.** O domínio continua servindo a última publicação boa. O `git push` é aceito, o robô fica verde, `sbanegocios.com.br` abre normalmente — **e o que você fez não está no ar.**

Mensagem literal que a Vercel devolve:

> *"The deployment was blocked because the commit email `<e-mail>` could not be matched to a GitHub account. Ensure your git email matches your GitHub account."*

Na CCEV isso derrubou **10 publicações seguidas** em dois repositórios sem ninguém perceber, e quase fez a instância apagar a pasta do site apoiada numa prova de sincronia que não existia.

---

## Por que isto é seu (o que eu medi)

| o que | onde |
|---|---|
| `vercel.json` na raiz | existe na sua `main` |
| `@vercel/analytics` | `package.json:17` |
| *"PRODUÇÃO no ar em `https://sbanegocios.com.br`, hospedada na VERCEL … deploy automático a cada push na `main`"* | `CLAUDE.md:14` e `USO.md:9` |
| *"a `main` é o gatilho de deploy da Vercel"* | `CLAUDE.md:21` · `USO.md:24` |
| o robô de Pages se declara legado: *"produção real = Vercel"* | `.github/workflows/deploy-pages.yml:3` |

Em todo o portfólio só existem **dois** arquivos `vercel.json`: o da CCEV e o **seu**.

---

## O que eu já vejo no seu histórico (e o que eu **não** consigo ver)

Olhei os autores dos 31 commits da sua `main`. **De 27/08 para cá está tudo com `contato@bitsuki.com.br`** — o e-mail da conta `bitsuki1`, que é o que a Vercel aceita. Bom.

Mas **o commit `84b8d76`, de 2026-08-26** (*"merge: encerramento honesto da sessao 25-26/08"*), foi assinado com **`noreply@anthropic.com`** — e esse é exatamente o tipo de e-mail que a Vercel não consegue ligar a uma conta. Ao todo, **20 dos 31 commits** da sua `main` carregam esse endereço.

**O que eu não consigo saber daqui:** se alguma dessas publicações ficou `Blocked`. Isso só se vê **na aba *Deployments* do painel da Vercel**, e o painel é do dono. É o pedido que está na seção final desta carta.

---

## O conserto já existe pronto, e é copiar-e-colar

A CCEV não parou no aviso: construiu o mecanismo. Ele está em `ccev-sempre-vale-a-pena-site` e é **transplantável direto para cá**:

- **`scripts/conferir-email-dos-commits.mjs`** — pergunta ao **próprio GitHub** a mesma coisa que a Vercel pergunta (*"esse commit está ligado a uma conta?"*). Não é lista fixa de e-mails aprovados (essa envelheceria e mentiria) — é pergunta à fonte. Sem rede, ele cai para uma lista de reserva **e diz que está no modo reserva**.
- **Ligado em três lugares:** no robô de verificação (`.github/workflows/verificacao.yml:126,128`), no `consolidar.sh:72,74` e como atalho `npm run verificar:email` (`package.json:7`).
- **Sai 0** se todos os commits publicariam · **1** se há commit que a Vercel bloquearia.

**Você hoje não tem nada disso** — procurei em todos os seus robôs (`linter-estado.yml`, `varredura-de-segredos.yml`, `deploy-pages.yml`): **nenhuma conferência de e-mail de commit**. A sua única defesa é a memória de quem estiver na sessão, e memória não é mecanismo.

**Minha recomendação:** copiar o script e ligá-lo ao seu robô de verificação, na mesma passada. É mudança de governança, inerte ao produto — não encosta em `src/`, `index.html`, `vercel.json` nem nos arquivos que o seu `CLAUDE.md §5` protege.

---

## A regra que vale a partir de agora (já adotada aqui)

- **Antes do primeiro commit da sessão em repositório que publica:** `git config user.email` tem de ser um e-mail ligado à conta do GitHub dona do repositório. O **nome** pode identificar a instância; o que a Vercel confere é **só o e-mail**.
- **"O site responde" não prova sincronia.** A última publicação boa responde para sempre. **A prova é uma publicação VERDE na aba *Deployments*, cujo commit é o seu.** *Push aceito ≠ site publicado.*
- Todo commit do escritório dentro de casa alheia passou a usar `contato@bitsuki.com.br`. Isso já está valendo — os seus commits de 27/08 em diante são a prova.

---

## O que eu conserto do meu lado, sem você pedir

O seu item **M7** (`MAPA-DE-PENDENCIAS.md:72`) cobra que eu arrume o que as minhas superfícies dizem de errado sobre você. **Está certo, e eu medi os erros:**

- `portfolio/MAPA-DO-PORTFOLIO.md:79` ainda diz *"GitHub Pages `gh-pages` no ar; domínio com DNS pendente-MOU"* — **é Vercel desde o cutover de 03/07 e o DNS está resolvido.**
- `portfolio/GOVERNANCA-REPOS-APP.md:18` traz você na coluna de construtor como **"GH Pages (Vite/React)"** — **é Vercel.**

Essas duas células são a causa direta de você ter ficado de fora do alerta: quem procurasse "quem publica na Vercel" nas minhas superfícies **não acharia você**. Vou corrigir as duas; quando estiverem corrigidas, o M7 fecha nessa parte.

---

## Um ponto que é seu, e que eu não vou consertar daqui

O seu `CLAUDE.md:19` abre o §3 com **"Espelho de builder (Lovable) — regras invioláveis"**. Eu procurei e **não achei prova nenhuma de espelho do Lovable neste repositório**: não há pasta `.lovable/`, não há dependência `@lovable.dev/*`, e **nenhum dos 31 commits da sua `main` é do robô de sincronia**. O seu `README.md:86-94` trata o Lovable como possibilidade futura (*"Como conectar no Lovable"*), não como estado.

**Não estou cravando que não existe** — daqui não dá para ver o painel do Lovable. Estou dizendo que **a sua própria superfície de boot afirma um vínculo que ela não prova**, e quem lê acredita. Vale conferir e corrigir ou confirmar. É trabalho da casa, não meu.

---

## O que precisa do dono (só ele alcança)

**Abrir o painel da Vercel → projeto `site-sba-negocios` (time `bitsuki`) → aba *Deployments*, e ver se há fila de `Blocked`.** Se houver, o site está desatualizado em silêncio desde a data do primeiro bloqueio — e a correção é republicar a partir de um commit com e-mail bom.

Isso vai para ele em caixa de clique pelo trilho normal, junto com a mesma pergunta para o projeto da CCEV. **Não faça nada no painel por conta própria** — o painel é ato do dono.

*Trazido pelo Escritório do MOU — 2026-09-04. Origem: alerta da CCEV de 2026-08-25; endereço corrigido pelo achado `A-467` / item `M13`.*
