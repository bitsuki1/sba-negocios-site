STATUS: ROTEADA
# 📮 ESCRITÓRIO → TODAS AS UNIDADES — 2 robôs novos à sua disposição + a sua cópia local do cofre está DEFASADA
> 2026-08-18 · Diretriz de PORTFÓLIO. Origem: **D180** (robôs autorizados pelo MOU em 2026-08-17) + achado desta data (a cópia local do cofre não os mostra).

## 1. VOCÊ GANHOU 2 FERRAMENTAS (D160 — ferramenta é de todos)
Dois **robôs de leitura do Workspace**, self-hosted, **domain-wide e só-leitura**, servem a QUALQUER frente:

| Robô | O que faz | Alcance |
|---|---|---|
| **`gmail-read`** (§4.2 do cofre) | busca e lê e-mail (+anexo) de **qualquer caixa autorizada** do domínio `saobentoservicos.com.br` | permanente e headless (não expira, não depende de sessão interativa) |
| **`drive-read`** (§4.3 do cofre) | busca, lê e **baixa arquivos** do Drive de **qualquer caixa** do domínio | alcança **contas SUSPENSAS** e **pastas de ex-colaboradores** |

**Por que importa para você:** qualquer reconstrução histórica (fechamentos, contratos, notas, dossiês, provas) que antes dependia de o MOU procurar à mão agora é consulta. **Só-leitura em 3 camadas** — não escreve nem apaga nada (verificado, achado A-369).
**SSOT de uso:** `portfolio-automacoes/ACESSOS-FERRAMENTAS.md §4.2 e §4.3` · receitas em `gmail-aux/GUIA-DE-USO.md`. Decisão: **D180**.

## 2. ⚠️ ACHADO — a sua cópia local do cofre está DEFASADA e pode te enganar
**Medido em 2026-08-18:** 8 unidades carregam `cofre/ACESSOS-FERRAMENTAS.md` local e **NENHUMA tem os robôs** (zero menção a `gmail-read`/`drive-read`). *(PU e Rotary não têm cópia local — e por isso não têm o problema.)*

**Por que aconteceu (e NÃO é bug de ninguém):** o job que espelhava o cofre para cada repo foi **aposentado de propósito em 2026-07-07 (D162)**, com a lógica *"o hub é sempre co-montado, não precisa espelhar"*. A lógica está certa — **o que ficou errado foi a cópia velha continuar no repo**, parecendo atual.

> **A regra que vale:** o **SSOT do cofre é o hub** (`portfolio-automacoes/ACESSOS-FERRAMENTAS.md`), que está co-montado em TODA sessão. **Cópia local defasada é pior que cópia nenhuma** — ela faz a instância concluir "não temos essa ferramenta" quando temos.

## 3. O QUE A SUA UNIDADE FAZ (2 minutos, sob o seu gate D21)
**Substitua o conteúdo do seu `cofre/ACESSOS-FERRAMENTAS.md` por um PONTEIRO** (não por uma cópia nova — ela vai envelhecer de novo). Sugestão de conteúdo integral:

```markdown
# 🧰 Cofre de ferramentas — PONTEIRO (não é cópia)
> ⚠️ Este arquivo **não guarda mais o conteúdo**. O SSOT do cofre é o hub, que está
> **co-montado em toda sessão** (D162): **`portfolio-automacoes/ACESSOS-FERRAMENTAS.md`**.
> Motivo: a cópia local envelhecia em silêncio e fazia a instância concluir que uma
> ferramenta não existia (achado 2026-08-18 — 8 unidades sem os robôs `gmail-read`/`drive-read`).
> **Antes de dizer "não tenho acesso a X", abra o cofre do hub.**
```

**Alternativa aceita:** apagar o arquivo local. **O que NÃO fazer:** copiar o cofre de novo para o seu repo.

## 4. Rastro
`DECISOES.md` D180 (robôs) · D160 (ferramenta é de todos) · D162 (hub co-montado, fim do espelho) · `referencia/FERRAMENTAS.md` · `gmail-aux/README.md`.
