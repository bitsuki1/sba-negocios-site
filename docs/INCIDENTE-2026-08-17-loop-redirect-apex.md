# 🔴 INCIDENTE 2026-08-17 — `sbanegocios.com.br` fora do ar (`ERR_TOO_MANY_REDIRECTS`)

> Laudo determinístico lavrado pela instância `claude/sba-instancia-pagina-sistema-sxb9wu`
> (orquestrador SBA), a pedido do MOU. Zero compressão (doutrina do escritório): a evidência
> crua fica registrada para a próxima instância e para a auditoria.

## 1. Sintoma
O navegador do MOU (2026-08-17 ~10:49) mostrou, ao abrir `sbanegocios.com.br`:

> **Esta página não está funcionando** — Redirecionamento em excesso por `www.sbanegocios.com.br` — **`ERR_TOO_MANY_REDIRECTS`**

Ou seja: o site entra em **loop de redirecionamento** e o Chrome corta.

## 2. Diagnóstico (evidência determinística, não suposição)

### 2.1 A cadeia de redirect (medida por `curl -IL`)
```
https://sbanegocios.com.br         → 301 → https://www.sbanegocios.com.br   (server: ip-10-123-xxx.ec2.internal  ← NÃO é a Vercel)
https://www.sbanegocios.com.br     → 308 → https://sbanegocios.com.br/      (server: Vercel)
… e recomeça, infinitamente.
```

### 2.2 O DNS atual (resolvido por DNS-over-HTTPS na GoDaddy `ns15/ns16.domaincontrol.com`)
| Nome | Tipo | Valor atual | Deveria ser |
|---|---|---|---|
| `sbanegocios.com.br` (apex) | **A** | **`15.197.225.128` + `3.33.251.168`** ← IPs de **Encaminhamento de Domínio (Domain Forwarding) da GoDaddy** (hospedados na AWS) | **A → `216.198.79.1`** (Vercel) |
| `www.sbanegocios.com.br` | CNAME | `a6cc1438ad279349.vercel-dns-017.com.` (Vercel) ✅ | (mantém) |

### 2.3 A Vercel está saudável
Projeto `site-sba-negocios` (time `bitsuki`): os dois domínios anexados, **último deploy de produção `READY`**.
O 308 `www → apex` é a Vercel redirecionando para o **domínio principal (apex)** — comportamento **correto**.

## 3. Causa-raiz
O **apex `sbanegocios.com.br` foi religado para "Encaminhamento de Domínio" na GoDaddy** (aponta para os
IPs de forwarding da GoDaddy, que respondem **301 → www**), em vez de apontar direto para a Vercel
(`A @ → 216.198.79.1`).

Como a Vercel mantém o apex como domínio principal (e por isso faz **308 `www → apex`**), formou-se o loop:

```
apex ──301 (GoDaddy)──▶ www ──308 (Vercel)──▶ apex ──301──▶ www ──▶ …  ∞
```

É exatamente o **"split apex/www"** que o `docs/HANDOFF-2026-07-03-ENCERRAMENTO.md` já havia eliminado
("apex canônico, `www → apex`, sem split"). Alguém **reativou o encaminhamento no apex** depois disso.

## 4. Correção

### ✅ Caminho recomendado (definitivo) — na GoDaddy (**ação do dono**; DNS mora lá)
1. **Domínio → Encaminhamento (Forwarding):** **DESLIGAR / remover** o encaminhamento do apex `@` para `www`.
2. **DNS → Registros:** **apagar os 2 registros A** do apex (`15.197.225.128` e `3.33.251.168`) e criar
   **`A` · host `@` · valor `216.198.79.1`** (o IP do apex que a Vercel indica na página do domínio).
3. **Manter** `CNAME · www · a6cc1438ad279349.vercel-dns-017.com` (já está certo).
4. Aguardar a propagação (TTL 3600 = até ~1 h). Resultado: **apex serve 200 direto da Vercel** e **`www → 308 → apex`**. Loop encerrado, arquitetura selada restaurada.

### ⏱️ Paliativo (opcional, se precisar do site no ar em minutos) — no painel da Vercel
Trocar o **domínio principal** do projeto de `apex` para **`www`** (Project → Settings → Domains → definir `www` como principal).
Aí `www` passa a servir **200** e o apex (via encaminhamento) cai em `www` sem loop — **sem depender da GoDaddy**.
**Custo:** muda o canônico para `www` (os `canonical`/`og:url` do site apontam para o apex) — é **temporário**;
reverter para `apex` depois de arrumar a GoDaddy (caminho recomendado).

> **Por que não corrigi sozinho:** o cofre (`portfolio-automacoes/ACESSOS-FERRAMENTAS.md`) **não tem acesso à
> GoDaddy** e o DNS é historicamente **"só o dono faz"** (`docs/HANDOFF-2026-07-03.md`). Pela Vercel eu tenho
> leitura (time `bitsuki`), mas a MCP da Vercel **não expõe** troca de redirect/domínio principal — isso é
> painel. Logo, os dois caminhos são **ação humana**. Bloqueio de infra = fato + caminho (D157).

## 5. Como confirmar que voltou
```bash
curl -sSI https://sbanegocios.com.br | head -1      # esperado: HTTP/2 200 (server: Vercel), sem 301 p/ www
curl -sSI https://www.sbanegocios.com.br | head -1  # esperado: HTTP/2 308 p/ apex (ok)
```

## 6. Estado
- **Repositório/código:** SÃO — `vercel.json` só tem o rewrite de SPA + headers; **nenhuma regra de redirect no repo** causa isto.
- **Nota de higiene:** `USO.md` está desatualizado (diz "GitHub Pages"); o hosting real é **Vercel** desde o cutover de 2026-07-03. Corrigir em passe futuro (não é a causa do incidente).
- **Pendência para o dono:** executar o Caminho recomendado (§4) na GoDaddy.
