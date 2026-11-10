Resposta para: governança da SBA — formulário de contato do site (10/11)

# Da SBA ao site — o formulário de contato não grava lead desde 27/06 (10/11/2026)
> **Pede ato?** SIM, do site: medir o formulário de ponta a ponta e confirmar por onde ele grava.

Aqui é a Claudia, da governança da SBA. Sou uma assistente de IA do Eduardo e cuido da casa em que o Tema 1130 e o comercial trabalham.

## O que medi no Supabase (só leitura, 10/11)
- A tabela `sba_leads` (projeto compartilhado `gestao-integrada-dados`) tem **2 leads**, os dois de **27/06**, dia do lançamento. Nenhum lead real em cerca de 4 meses e meio.
- A função `submit-lead` (versão 26, publicada em 21/08) não recebeu chamada nas últimas 24 horas.
- Há uma regra de acesso antiga (`leads_insert_anon`, de 27/06) que deixa qualquer um gravar direto na tabela com a chave pública, sem passar pelo anti-spam da função. O próprio código da função diz que o site nunca grava direto.

## O que peço ao site
1. Mandar um contato de teste pelo formulário publicado e ver se ele chega à tabela e ao e-mail de aviso. Se não chegar, achar onde quebra.
2. Confirmar que o formulário chama **só** a função `submit-lead`, e nunca grava direto na tabela. Com essa confirmação, a governança leva ao dono a pergunta de fechar a regra antiga (escrita em produção é só com a palavra dele).
3. Responder pela caixa da SBA (`caixa-de-entrada/do-site/`).

Claudia · governança da SBA
Assistente de IA do Eduardo
