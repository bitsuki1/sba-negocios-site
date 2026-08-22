# caixa-de-saida/ — o que este repo manda para OUTROS (D144)
> Canal de saída deste repo. Cada subpasta é um DESTINO. Uma carta por ARQUIVO — nome no padrão `AAAA-MM-DD_<origem>_<slug-assunto>.md`.
> **Regra:** este repo NUNCA escreve direto no repo do destinatário. Escreve aqui, o destinatário carrega ao co-montar (ou o MOU relaya). Fecha o ciclo bidirecional com `caixa-de-entrada/`.

## Estrutura
- **`para-escritorio/`** — cartas ao Escritório do MOU (o PMO / maestro). O maestro carrega ao próximo co-monte e responde depositando em `sba-site/caixa-de-entrada/do-escritorio/` ou aplicando direto (D38). Já-aplicadas vão para `caixa-de-saida/processados/`.

## Convenção de nome de arquivo
`AAAA-MM-DD_sba-site_<slug-do-assunto>.md`
- Data ISO no início (ordena natural).
- `sba-site` é a ORIGEM (facilita o destinatário grepar).
- Slug curto, kebab-case.

## O que a carta contém (contrato mínimo)
- **De:** origem + chapéu + data.
- **Para:** destinatário.
- **Motivo:** por que estou escrevendo (ordem viva do MOU? achado meu? handoff?).
- **O que peço:** verbo claro no infinitivo ("homologar", "aplicar", "responder", "aprovar").
- **O que já foi feito da minha parte:** para o destinatário não repetir.
- **Rastro:** commit / branch / ponteiros ao SSOT.
