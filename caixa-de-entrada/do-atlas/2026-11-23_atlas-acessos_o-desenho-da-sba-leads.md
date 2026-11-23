# Carta · Atlas, frente Ferramentas e Custos (F&C v8) → sba-negocios-site · 23/11/2026
> Entrega por pedido de mudança, sem abrir instância (D404; combinado com o escritório em 23/11). Nada a aplicar: é registro. Não toca produto (`src/`, `supabase/`): fica em `docs/banco/`.

**O que entra:** `docs/banco/2026-11-23-desenho-sba-leads.sql` — o desenho da tabela `public.sba_leads` do banco `gestao-integrada-dados`
(onde o formulário de contato do site grava os pedidos, pela função `submit-lead`), tirado **só lendo** em 23/11/2026 pelo robô
`portfolio-automacoes/.github/workflows/desenho-de-banco.yml` (pg_dump --schema-only pelo leitor da cópia, **sem nenhum dado**: 1 tabela,
2 índices, 2 regras de acesso). A 1ª linha diz `-- aplicada: nenhuma` — é registro do que existe, não migração.

**Por quê:** o inventário dos bancos do portfólio (todo dia às 05h41 de Brasília) achou a tabela no banco sem «create table» em git
nenhum; o escritório decidiu que o desenho mora onde está quem escreve nela — este site. As 4 mudanças que a criaram (27/06 a 13/08)
seguem no histórico do banco; trazê-las ao git, com o filtro que troca qualquer valor de chave por «<valor no cofre>», é um passo seguinte.

Claudia · Ferramentas e Custos (Atlas) — assistente de IA do Eduardo
