# HANDOFF ÚLTIMO — `sba-negocios-site` · delta puro da última sessão (padrão D139/D66)
> **Para quem abrir este repo depois de mim.** Isto é **delta**, não resumo: só o que mudou e o que você precisa saber para não repetir trabalho nem acreditar em dado velho.
> **Sessão:** 2026-08-25 → 26 · chapéu: orquestrador do `sba-negocios-site` (D104).
> **Como começou:** o escritório mandou *"selar apenas"*. **Como terminou:** o dono assumiu a sessão, renomeou o repo, aprovou produto e despachou 8 decisões. A sessão foi de fecho a onda de produto.

---

## 1. As três coisas que você precisa saber antes de tocar em qualquer coisa

### (a) O repo mudou de nome — duas vezes no mesmo dia
`sba-site` → **`sba-negocios-site`** (o dono renomeou em 25/08, padrão D186). Confirmado como **rename e não recriação** (`id 1282269823`, criado 27/06): histórico, issues e o espelho do Lovable intactos.
- A varredura E-055 já rodou: 39 ponteiros em 13 arquivos.
- **NÃO renomeados de propósito:** nomes reais de branch (`claude/sba-site-*`) e as cartas já existentes (`_sba-site_`). Existem com aquele nome; trocar no texto criaria o ponteiro quebrado que a varredura evita.
- ⚠️ **A URL antiga ainda redireciona** — então um ponteiro errado *funciona* e passa despercebido. Não confie em "abriu, então está certo": bata o nome literal.
- ⚠️ Onde ainda está errado: o `MAPA-DO-PORTFOLIO.md` do escritório diz `site-sba-negocios`, nome que **nunca existiu** (é o nome do projeto na **Vercel**). Achado **A-452**, correção é do escritório — e o alvo é `sba-negocios-site`, **não** `sba-site`.

### (b) O site roda na VERCEL, não no GitHub Pages
O `CLAUDE.md` e o `USO.md` diziam Pages + deploy manual — **errado desde 2026-07-03**. Corrigido.
**Publicar = dar merge na `main`.** A Vercel republica sozinha. **Não rode `scripts/deploy-producao.sh`** — é legado.
Prova: o apex resolve `216.198.79.1`, o IP da Vercel documentado no próprio script.

### (c) Existe medição, e ela é dura
Painel da Vercel, 7 dias até 26/08: **15 visitantes · 22 páginas vistas · 87% de rejeição**.
Leia como **direção, não como número fino** — 15 visitas é amostra pequena e parte pode ser a própria equipe. Mas não há evidência de que o site converta. **Foi isso que derrubou a ideia de comprar anúncio agora.**

---

## 2. O que mudou no produto em 26/08 (o dono aprovou explicitamente)

| mudança | onde |
|---|---|
| **H1 das 2 landings** passou a casar com o `title` | `Residuos.tsx`, `RecuperacaoTributaria.tsx` (via prop `titulo` do `Hero`) |
| **JSON-LD Service + FAQPage** na tributária (era a única sem nenhum) | `RecuperacaoTributaria.tsx` |
| **FAQ da tributária extraído** do JSX para `const FAQS` para alimentar o schema | idem |
| **3 sub-páginas** `/residuos/:slug` | `LANDINGS_RESIDUOS` em `landings.ts` |
| **Seção "Encontre o seu caso"** ligando a mãe às 3 filhas | `Residuos.tsx` |
| **Guarda de coerência rota × sitemap** — reprova o build | `scripts/prerender-og.mjs` |
| `fetchPriority="high"` na imagem do topo (LCP) | `Hero.tsx` |
| `/residuos` 0.7 → 0.9 no sitemap | `public/sitemap.xml` |

### ⚠️ Erro meu que você não deve repetir
Eu reportei que a página tributária **"não tinha FAQ"**. **Tinha** — 8 perguntas boas. Minha varredura procurou a string `FAQ` e a seção chama-se **"Perguntas frequentes"**. O que faltava era só o *schema*.
**Lição:** ao auditar conteúdo em português, procure pelo termo em português. Grep por sigla em inglês dá falso negativo.

### Decisões de arquitetura que têm motivo (não desfaça sem ler)
- **`LANDINGS_RESIDUOS` é um mapa separado de propósito.** Se as 3 entrassem em `LANDINGS`, a mesma página existiria em `/solucoes/x` **e** `/residuos/x` = conteúdo duplicado. `PaginaSolucao` foi **parametrizado** (props `mapa`/`voltarPara`) em vez de duplicado.
- **A guarda do sitemap existe porque a falha era silenciosa:** adicionar rota exige editar `seo-routes.json` **e** `sitemap.xml`; esquecer o segundo não quebra nada — a página só nunca é descoberta. Agora o build sai com exit 1. **Foi testada reprovando de verdade**, não só escrita.

---

## 3. A senha do portão de parceiros — leia antes de mexer
O dono pediu a senha do `/guia-etapas`. **Ela não existia mais:** o repo guarda só o hash SHA-256, que é de mão única.
Como estava perdida para **todos**, o portão já estava de fato revogado — redefinir **não tirou acesso de ninguém**. Defini uma nova e entreguei ao dono no chat; **no git entrou só o hash**.
- **Só ASCII, de propósito.** A primeira que gerei tinha acento — quebra a digitação no celular e o hash não bate. Errei e refiz.
- **Verificado em navegador real** (Chromium/Playwright, contra o `dist` servido localmente): senha certa **abre**, senha errada **continua barrando**.
- **T-003** está aberta pedindo ao dono que salve no gerenciador. Se ela ficar só no chat, o ciclo se repete — foi exatamente assim que a anterior se perdeu.

---

## 4. O que verifiquei em navegador de verdade (não é "eu acho")
Chromium contra o `dist` servido em `127.0.0.1`:
- ✅ senha nova aceita · senha errada barrada
- ✅ as 3 páginas novas renderizam com o H1 certo
- ✅ `/residuos` e `/recuperacao-tributaria` entregam **Service + FAQPage** no `<head>`
- ✅ a mãe linka para as 3 filhas
- **Os 2 "erros" de console são do ambiente, não do site:** `fonts.googleapis.com` é bloqueado pelo proxy desta sessão, e `/_vercel/insights/script.js` é injetado pela plataforma Vercel em produção — não existe em servidor estático local.
> **O Playwright foi instalado só para isso e removido depois.** O `package.json` está intacto. Para repetir: `npm i -D playwright`, servir `dist` por `python3 -m http.server --bind 127.0.0.1` (o IPv6 não funciona aqui) e usar `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`.

---

## 5. O que NÃO fiz — e por quê

| não fiz | por quê |
|---|---|
| **Converter as imagens para formato moderno** | **3,5 MB em 26 arquivos, todas JPG/PNG.** É a maior oportunidade de velocidade que sobra. Exige ferramenta de imagem que o projeto não tem e mexe em asset de produto. |
| **Imagem de compartilhamento própria de Resíduos** | Precisa de arte 1200×630 — peça de design, não de código. |
| **Rodar Lighthouse** | Sem saída de internet. Medi o peso real dos arquivos gerados, que era o que dava com honestidade. |
| **Inventar volume de busca** | Não há ferramenta de volume aqui. **Nenhum número de "X buscas/mês" existe no estudo.** Todo número veio do painel do dono. |
| **Apagar galhos** | 8 dos 10 `claude/*` estão 100% na main (seguros); 2 carregam trabalho. Medir é meu, apagar é do escritório. |
| **Aplicar o commit `7277402`** | Tira o gatilho `pull_request` do linter (−50% de Actions) mas **reduz checagem em PR** — decisão de esteira, do escritório. **Não apague `claude/instance-concurrency-94pbeg`.** |
| **Novas perguntas jurídicas no FAQ** | Escrever prazo/prescrição sem fonte seria pior que a lacuna. Fica para o comercial/jurídico fornecer. |
| **Me auto-selar** | **E-071: quem produz não certifica.** |

---

## 6. Estado ao sair
- **`main` = `ab02d1a`+** · árvore limpa · nada fora da main · gate 🟩 · linter 🟩
- **Build verde**, 21 rotas pré-renderizadas (eram 18), guarda de sitemap ok
- **CI:** `linter-estado` verde. ⚠️ Histórico: o `deploy-pages.yml` rodou **29× e falhou 29×** desde a estreia; foi **silenciado** em 13/08 (gatilho removido), não consertado. Não afeta produção (Vercel). **Recomendei ao escritório removê-lo, não só silenciar.**
- **Segredos:** varri HEAD + 85 revisões. Nada. A chave `sb_publishable_` é **pública por desenho (D206)** — não é vazamento e **não deve ser "consertada"**.
- **Caixas:** `do-escritorio/` vazia. Em `caixa-de-saida/`: 1 carta ao escritório (fecho para o selo, com adendo do rename) e **2 ao comercial** (roteamento + relatório de anúncios).
- **Selo:** ⬜ **não emitido.** A torre precisa verificar na `main` o que foi declarado.

## 7. A única pendência do dono
**Google Search Console** — ele adiou duas vezes ("faremos depois"). Ficou **mais** importante depois de 26/08: as correções mudam como o Google lê as páginas, e sem ele **não dá para saber se funcionaram**. A Vercel dá as visitas; só o Search Console diz **por qual busca**.

## 8. Por onde começar
1. Este arquivo. 2. `CLAUDE.md`. 3. `MAPA-DE-PENDENCIAS.md` (v8). 4. `TAREFAS-DO-DONO.md` (T-002, T-003). 5. `docs/ESTUDO-SEO-ADS-2026-08-25.md` (o porquê de tudo, com as 5 lentes e as fontes).
