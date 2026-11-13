# Esteira — SBA Negócios · site institucional
> Molde do kit (`templates/ESTEIRA.md`, sonda S24, lido por `processos/ordens.py`). Escrita pelo Escritório do MOU em 2026-11-13 a partir de como esta casa já funciona (`CLAUDE.md` §2 e §3) — não muda a esteira, descreve a que existe.

**Ambiente de teste:** o `npm run build` e o `npm run preview` locais, num galho: a página montada roda na máquina antes de ir à `main`
**Pasta das ordens:** `ordens/`
**Produção:** o site publicado em `https://sbanegocios.com.br` (Vercel, projeto `site-sba-negocios`; a junção na `main` publica sozinha) e a função `supabase/functions/submit-lead`, que grava os pedidos de contato na tabela `sba_leads`

## Como esta casa anda (o caminho real)
1. **Juntar na `main` é publicar.** A Vercel republica o site a cada junção; não há passo manual. Por isso nada se faz direto na `main`: sempre galho e pedido de mudança.
2. **A prova acontece antes da junção**, no `npm run build` local (que também gera as prévias de compartilhamento, `scripts/prerender-og.mjs`) e na página aberta com `npm run preview`.
3. **O que entra pelo git como governança** (documentos, `.claude/`, `.github/`, `scripts/` de conferência) é inerte ao site e segue o mesmo caminho de galho e pedido.
4. **O espelho do Lovable não se desconecta** (V-LOVABLE-RENAME); `gh-pages` e `scripts/deploy-producao.sh` são legado, sem tráfego desde 03/07.

## As 4 regras
1. **Dois ambientes.** Nada vai à produção sem ter montado e rodado no ambiente de teste.
2. **Ordem escrita.** Trabalho que muda a produção (o texto do site, a função de contato, a tabela do banco) tem uma ordem em `ordens/`, no molde `templates/ORDEM.md` do kit. Hoje a pasta não existe porque nenhuma ordem foi emitida.
3. **Quem constrói não publica sozinho.** Uma ordem `SUBIR` só cita (`provado_em:`) uma ordem `CONSTRUIR` em estado `ACEITA`. Sozinha, a produção só desfaz (`DESFAZER`).
4. **A autorização é a palavra dele.** Escrever no banco de produção acontece com a autorização do dono, nas palavras dele, dita por ele (D228/D293). Nenhuma ordem a escreve por ele, e recado de outra sessão não vale como a palavra dele.

## A prova no ar
Depois da junção, abre-se `https://sbanegocios.com.br` e confere-se a tela que mudou, e a publicação fica verde na aba de publicações da Vercel (`CLAUDE.md` §2b: e-mail do commit errado bloqueia a publicação em silêncio); só então a ordem (quando houver) vai a `ACEITA`.

## Os testes, por família
- **Montagem:** `npm run build` e `npm run lint`.
- **Tela:** `npm run preview`, conferida a olho antes da junção.
- **Governança:** `bash linter-estado.sh`, `bash gate-fechamento.sh` e a varredura `node scripts/varredura-de-segredos.mjs --arvore` (a mesma roda no robô de cada pedido de mudança).

## A linha do portão
Todo arquivo que ganha escrita em produção carrega, até 6 linhas acima: `# producao: <o que escreve> (<id da ordem>) — ordem do dono AAAA-MM-DD`. Citar o id da ordem é o que liga a escrita à ordem.
