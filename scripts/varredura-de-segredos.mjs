#!/usr/bin/env node
//
// VARREDURA DE SEGREDOS — o porteiro que impede credencial de ENTRAR no git do escritório.
//
// ────────────────────────────────────────────────────────────────────────────
// POR QUE EXISTE (a doutrina — D200 / D208)
// ────────────────────────────────────────────────────────────────────────────
//   Até 21/08/2026 valia a perna (a) da D106: "senha exposta = risco aceito".
//   Nesse dia o dono a REVOGOU, com todas as letras (D200, ordem viva, verbatim):
//     "credencial em git não é mais aceito, vamos arrumar a partir de agora e
//      não deixarmos mais acontecer".
//   A decisão tem DUAS metades e este arquivo é só a segunda:
//     · "arrumar o que já está lá"  → é ato do DONO (D208: o valor sai do HEAD e
//        vira PONTEIRO ao cofre humano; ROTAÇÃO NÃO É EXIGIDA; o histórico FICA,
//        porque apagar histórico é ato destrutivo e é decisão dele).
//        O escritório NUNCA rotaciona, apaga chave ou reescreve histórico.
//     · "não deixar acontecer de novo" → É ISTO AQUI: a porta de entrada.
//
//   Precedente copiado: `bitsuki1/profinders-hub` (scripts/varredura-de-segredos.mjs
//   + .github/workflows/verificacao.yml) e a variante da Keepee
//   (`keepee-unidade-de-negocios`, que trouxe a regra da string de conexão com
//   senha). Este arquivo é a UNIÃO das duas, calibrada para um repo de DOCUMENTOS.
//
// ────────────────────────────────────────────────────────────────────────────
// A REGRA DURA DA SAÍDA: nunca, em nenhuma hipótese, o VALOR
// ────────────────────────────────────────────────────────────────────────────
//   O relatório mostra `caminho:linha` + a CATEGORIA do achado. Nada mais.
//   Nem mascarado, nem "as pontas do valor", nem o trecho da linha — porque o
//   log de uma Action é lido por qualquer um com acesso ao repo, e um segredo
//   pela metade ainda é uma pista. (O precedente do hub imprime uma amostra
//   mascarada; aqui isso foi DELIBERADAMENTE removido.)
//   Quem precisa ver o valor abre o arquivo na linha apontada.
//
// ────────────────────────────────────────────────────────────────────────────
// A CALIBRAGEM É O PONTO MAIS IMPORTANTE
// ────────────────────────────────────────────────────────────────────────────
//   Porteiro que grita todo dia é porteiro que alguém desliga. Por isso a
//   varredura NÃO usa "parece aleatório" como critério: ela procura ASSINATURA
//   DE FORNECEDOR (`sb_secret_`, `re_`, `AIza`, `ghp_`, `AKIA`, `xox`…) e um
//   punhado de formas comprovadamente perigosas. E deixa passar, de propósito,
//   o que é PÚBLICO POR DESENHO (D206): a chave `publishable` do Supabase e o
//   crachá JWT cujo papel é `anon` — vão embutidos no navegador de quem visita;
//   quem protege o dado ali é o RLS, não o sigilo da chave. Chamar isso de
//   vazamento é gritar lobo.
//
//   ⚠️ A EXCEÇÃO À "SÓ ASSINATURA DE FORNECEDOR" — e por que ela existe.
//   O segredo real deste repositório NÃO tinha prefixo nenhum: eram 64
//   hexadecimais crus, uma vez sozinhos numa linha de bloco de código (o
//   rótulo "Token:" estava na linha ANTERIOR) e uma vez dentro de uma URL,
//   como `?token=…`. Nenhum dos dois precedentes o pegaria. Daí as duas
//   regras que só existem aqui — `credencial-em-url` e `hex-cru` — e a JANELA
//   de vizinhança de 3 linhas que a segunda usa. O preço de falso positivo
//   foi medido, não presumido: com elas ligadas, a árvore inteira (1.223
//   arquivos) continua devolvendo ZERO.
//
// ────────────────────────────────────────────────────────────────────────────
// OS DOIS MODOS (e por que os dois BLOQUEIAM neste repo)
// ────────────────────────────────────────────────────────────────────────────
//   node scripts/varredura-de-segredos.mjs --intervalo <base>..<topo>
//       Só o que o envio ACRESCENTOU. É a porta: bloqueia (sai 1).
//
//   node scripts/varredura-de-segredos.mjs --arvore
//       Tudo que está versionado hoje. No escritório isto TAMBÉM bloqueia —
//       sem `continue-on-error`. É uma escolha, não um descuido: o escritório
//       é o repo do PMO, não tem dívida de produção para carregar, e a lente
//       de 01/09 achou exatamente UM segredo vivo na árvore (tarjado na mesma
//       onda). Depois disso, `--arvore` = 0. Se um dia ficar vermelho, é
//       porque entrou coisa nova — e é para ficar vermelho mesmo.
//       ⚠️ Nas UNIDADES o caso é outro: lá o `--arvore` nasce em modo aviso
//       (`continue-on-error: true`) enquanto houver segredo antigo esperando o
//       dono, porque porta que reprova todo dia empurra todo mundo para o
//       `--no-verify`. O kit em `processos/kit-repo-app/` e
//       `processos/templates/` carrega essa diferença escrita no yml.
//
//   node scripts/varredura-de-segredos.mjs --arquivo <caminho>
//       Um arquivo só, dentro ou fora do repo. Existe para o AUTOTESTE
//       (V-INSTRUMENTO-TAMBEM-MENTE: instrumento que nunca foi testado com um
//       caso-verdadeiro e um caso-falso não prova nada).
//
// SAÍDA: 0 = nada encontrado · 1 = achado · 2 = erro de uso.
//
// A VÁLVULA DE ESCAPE: uma linha que carregue o marcador `segredo-ok` em
//   comentário é ignorada. É deliberada e VISÍVEL — quem usa está assinando
//   embaixo, e o revisor vê. Não existe desligar a varredura inteira sem
//   alguém enxergar.

import { execFileSync } from "node:child_process";
import { readFileSync, statSync } from "node:fs";

// ═══════════════════════════════════════════════════════════════════════════
// 1) O que é público por desenho e NUNCA vira achado (D206)
// ═══════════════════════════════════════════════════════════════════════════

const MARCADOR_DE_EXCECAO = /segredo-ok/;

/** Chave "publicável" do Supabase (formato novo). Vai no navegador. */
const CHAVE_PUBLICAVEL = /\bsb_publishable_[A-Za-z0-9_-]+/g;

/** Um crachá JWT qualquer (três blocos base64url separados por ponto). */
const JWT = /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g;

/**
 * Um JWT do Supabase cujo papel é `anon` é a MESMA coisa que a chave
 * publicável, só no formato antigo: público por desenho (D206). Qualquer outro
 * JWT — a começar pelo `service_role`, que é poder total sobre o banco — é
 * segredo. Quando o papel não puder ser lido, trata-se como segredo.
 */
function ehCrachaPublico(jwt) {
  try {
    const dados = JSON.parse(Buffer.from(jwt.split(".")[1], "base64url").toString("utf8"));
    return dados.role === "anon" || dados.role === "publishable";
  } catch {
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 2) As regras. Cada uma é uma assinatura de credencial de verdade.
//    `valor` = de onde sai o texto que passa pelo teste de placeholder.
//    `heuristicaFraca` = regra genérica (não é assinatura de fornecedor), então
//    ganha peneira extra contra exemplo/modelo.
// ═══════════════════════════════════════════════════════════════════════════

const REGRAS = [
  {
    id: "chave-privada",
    categoria: "chave privada (PEM/OpenSSH) em texto puro",
    re: /-----BEGIN (?:RSA |DSA |EC |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----/g,
    // 01/09: o parser de chave de conta de serviço (`ferramentas/workspace-leitura/**/_shared/*.ts`) cita o
    // marcador dentro de `.replace(/-----BEGIN…/)` / de uma regex — é CÓDIGO que trata a chave, não a chave.
    // Falso positivo ×4 medido na caixa de ferramentas; a chave real vem SEMPRE seguida de base64 na
    // linha de baixo, nunca dentro de `.replace(` ou de uma literal de regex.
    proibeContexto: /\.replace\s*\(|new RegExp|\/-----BEGIN|['"`]-----BEGIN[^-]*-----['"`]\s*[,)]/,
  },
  {
    id: "aws",
    categoria: "identificador de chave de acesso da AWS (AKIA…)",
    re: /\bAKIA[0-9A-Z]{16}\b/g,
  },
  {
    id: "github",
    categoria: "token do GitHub (ghp_/gho_/ghu_/ghs_/ghr_/github_pat_)",
    re: /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/g,
  },
  {
    id: "slack",
    categoria: "token do Slack (xox…)",
    re: /\bxox[baprse]-[A-Za-z0-9-]{10,}/g,
  },
  {
    id: "conexao-com-senha",
    categoria: "string de conexão de banco com senha embutida (postgres/mysql/mongodb)",
    re: /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s:@/]+:([^\s:@/]+)@/gi,
    valor: (m) => m[1],
  },
  {
    id: "senha-literal",
    categoria: "senha/segredo atribuído a um valor literal",
    re: /\b(?:senha|password|passwd|pwd|secret|segredo|api[_-]?key|apikey|token|access[_-]?key|client[_-]?secret|private[_-]?key)[a-z0-9_]*\s*[:=]\s*(['"])([^'"\n]{6,})\1/gi,
    valor: (m) => m[2],
    heuristicaFraca: true,
  },
  {
    // 01/09 (EX-F): a forma em que o COFRE HUMANO escreve — célula de tabela markdown com rótulo de
    // credencial numa célula e o valor opaco em outra da MESMA linha (`| Senha | ‹valor› |`). Nenhuma
    // regra acima casava isso (a `senha-literal` exige `=`/`:` + aspas): o scanner deu ✅ no cofre da
    // CCEV com a senha-mestra dentro. Valor = token sem espaço, ≥8, com pelo menos 2 classes de
    // caractere; placeholders (‹…›, <…>, xxx, SEU_/SUA_) caem na peneira `heuristicaFraca`.
    id: "senha-em-celula-de-tabela",
    categoria: "credencial em célula de tabela markdown (rótulo senha/token/chave na mesma linha)",
    // Valor = letra E dígito, sem `/` (caminho de arquivo em minúsculas com `-`/`/` NÃO é senha — foi o
    // 1º falso positivo, `cadastro/bitsuki/INVENTARIO.md:111`), sem `*`/`` ` `` de ênfase markdown.
    re: /^\s*\|[^|\n]*\b(?:senha|password|passwd|secret|segredo|token|api[_ -]?key|apikey|chave|client[_ -]?secret|service[_ -]?role)\b[^|\n]*\|(?:[^|\n]*\|)*?\s*((?=[^\s|]*[A-Za-z])(?=[^\s|]*[0-9])[^\s|/*`]{8,})\s*\|/gi,
    valor: (m) => m[1],
    heuristicaFraca: true,
  },
  {
    id: "onsuite",
    categoria: "senha do OnSuite embutida (ONSUITE_SENHA=…)",
    re: /\bONSUITE_SENHA\b\s*[:=]\s*['"]?([^'"\s]{4,})/g,
    valor: (m) => m[1],
    heuristicaFraca: true,
  },
  {
    id: "supabase-secreta",
    categoria: "chave SECRETA do Supabase (poder total sobre o banco)",
    re: /\bsb_secret_[A-Za-z0-9_-]{10,}/g,
  },
  {
    id: "resend",
    categoria: "chave da API do Resend (envio de e-mail)",
    re: /\bre_[A-Za-z0-9_-]{24,}/g,
  },
  {
    id: "google",
    categoria: "chave da API do Google (Gemini, Maps, Drive…)",
    re: /\bAIza[A-Za-z0-9_-]{35}\b/g,
  },
  {
    id: "anthropic",
    categoria: "chave da API da Anthropic (sk-ant-…)",
    re: /\bsk-ant-[A-Za-z0-9_-]{20,}/g,
  },
  {
    id: "sk-generica",
    categoria: "chave secreta no formato `sk-` (OpenAI e afins)",
    re: /\bsk-[A-Za-z0-9]{20,}\b/g,
  },
  {
    // Credencial embutida em URL. Não precisa de aspas nem de atribuição —
    // por isso escapa da regra de cima. Foi metade do achado real deste repo
    // (01/09/2026): a receita de ligar o robô de e-mails trazia o "plano B"
    // com `…/functions/v1/gmail-read?token=<64 hexadecimais>` no meio da
    // frase. Nenhum dos dois precedentes (hub e Keepee) pegava isto.
    id: "credencial-em-url",
    categoria: "credencial embutida na URL (?token=… / &key=…)",
    re: /[?&](?:token|key|api[_-]?key|apikey|access[_-]?token|auth|secret|senha|password|pwd)=([^\s&"'`)>\]}]{12,})/gi,
    valor: (m) => m[1],
    heuristicaFraca: true,
  },
  {
    // Muitos tokens (GitHub clássico, Supabase PAT, webhook, `gen_random_bytes`
    // codificado em hex) são hexadecimais crus, sem prefixo nenhum: 40
    // caracteres para 20 bytes, 64 para 32. Sozinho o padrão pegaria TODO SHA
    // de commit e TODA impressão digital SHA-256 do repositório — por isso ele
    // só vale perto de uma palavra de credencial (`exigeContexto`, medido numa
    // JANELA de 3 linhas, porque o valor costuma vir num bloco de código LOGO
    // ABAIXO do rótulo "Token:") e nunca numa linha que fala de commit, pino
    // de Action ou impressão digital (`proibeContexto`, medido só na linha).
    //
    // A janela é o que faz diferença: no achado real de 01/09 o token de 64
    // hexadecimais estava sozinho numa linha dentro de um bloco de código —
    // sem NENHUMA palavra ao lado. O rótulo estava na linha anterior.
    id: "hex-cru",
    categoria: "token hexadecimal cru (40 ou 64 caracteres) perto de um rótulo de credencial",
    re: /\b(?:[0-9a-f]{40}|[0-9a-f]{64})\b/g,
    exigeContexto: /\b(?:token|chave|key|bearer|auth|secret|segredo|senha|password|credencial)/i,
    janela: true,
    // 01/09 (v2.2): `merge`/`mesclad`/`pull request` entram no proibido — "**Merge na main:** `<sha>` — PR #85
    // (mesclado)" numa carta de encerramento é SHA de merge, não token (falso positivo medido em
    // `portfolio-automacoes/caixa-de-saida/…/2026-08-24_…-hashes.md:6`).
    proibeContexto:
      /\b(?:commit|sha-?1|sha-?256|sha-?512|hash|md5|checksum|digest|impress|integrity|manifest|revis|\brev\b|pin(?:ado|ned)?|uses:|actions\/|blob|tree|merge-base|rev-parse|merge|mesclad|pull request|\bPR\b)|@[0-9a-f]{40}/i,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 3) O que NÃO é valor: placeholder, modelo, exemplo
// ═══════════════════════════════════════════════════════════════════════════

/** Começa por uma palavra que denuncia "preencha aqui". */
const PLACEHOLDER_INICIO =
  /^(?:seu|sua|meu|minha|troque|preencha|coloque|exemplo|example|sample|placeholder|changeme|dummy|fake|teste|test|xxx+|\.{3}|<|«|‹|\$\{|%\(|\{\{|process\.env|deno\.env|Deno\.env|os\.environ|import\.meta|null|undefined|todo|redacted|tarjado)/i;

/** Aparece em QUALQUER posição e já denuncia modelo (o que o EX-D pediu). */
const PLACEHOLDER_CONTEM =
  /(?:SEU_|SUA_|MEU_|xxxx|XXXX|‹[^›]*›|«[^»]*»|<[A-Za-z0-9_.\- ]{2,}>|\$\{[^}]+\}|\{\{[^}]+\}\}|REDACTED|TARJAD|\*{4,}|…{1,}|COLE_AQUI|PREENCHA)/;

/**
 * Valores que NUNCA são senha de verdade — são a senha que se escreve num
 * manual. Vale para TODAS as regras que extraem um valor, não só as fracas:
 * o corpus de documentação de terceiro que este repo espelha (a biblioteca do
 * D37) está cheio de `postgresql://readonly:pass@…`, e acusar isso é gritar
 * lobo dentro de um livro que nem é nosso.
 */
const VALOR_DE_EXEMPLO =
  /^(?:pass|passwd|password|senha|pwd|secret|segredo|token|key|chave|mypassword|minhasenha|123456?|12345678|hunter2|abc123|qwerty|root|admin|teste|test|foo|bar|baz|user|usuario|value|valor)$/i;

function ehPlaceholder(v, fraca) {
  if (!v) return true;
  if (PLACEHOLDER_INICIO.test(v)) return true;
  if (PLACEHOLDER_CONTEM.test(v)) return true;
  if (VALOR_DE_EXEMPLO.test(v)) return true;
  if (!fraca) return false;
  // Peneira extra só para as regras genéricas (as que não são assinatura de
  // fornecedor). Não vale para as demais: `postgres://u:senha@` legítima não
  // tem número nenhum e nem por isso deixa de ser segredo.
  if (/^[^A-Za-z0-9]*$/.test(v)) return true; // sem letra nem número
  if (/^(.)\1+$/.test(v)) return true; // um caractere repetido
  // NOME_DE_VARIAVEL em caixa alta — com dígito também (`N8N_ENCRYPTION_KEY` numa coluna "Secret" é o
  // NOME do segredo, não o valor; 3º falso positivo, `portfolio-automacoes/docs/CONECTAR-CONTAS.md:16`).
  if (/^[A-Z][A-Z0-9_]{3,}$/.test(v)) return true;
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
// 4) Onde NÃO procurar
// ═══════════════════════════════════════════════════════════════════════════

/** Nunca, em nenhum modo: ruído de máquina e os próprios instrumentos. */
const IGNORADOS_SEMPRE = [
  /^node_modules\//,
  /^dist\//,
  /^\.git\//,
  // ⚰️ 01/09 (EX-F): `cofre/` NÃO é mais ignorado. A entrada presumia ".gitignore cobre" — falso em 4
  // casas (CCEV, EDU, AVC, bitrix-aux), onde `cofre/ACESSOS-FERRAMENTAS.md` é VERSIONADO e carregava
  // a senha-mestra (L2-01). O scanner dava ✅ na casa exata em que a lente dizia 🟥. Regra: o que o
  // `.gitignore` já tira, `git ls-files` não lista; o que ele não tira, o scanner OLHA.
  // 01/09 (v2.2, achado G-03 do executor dos auxiliares): `.lovable/` é GERADO pelo builder a cada sync —
  // o `system.md` traz a tabela "Color Tokens" do sistema de design (cabeçalho "Token" + valores como
  // `--primary-500`), que a regra de coluna lia como credencial (5 falsos positivos em
  // `profinders-apresentacao`). Marcador `segredo-ok` não sobrevive lá (o builder reescreve). Ignorado.
  /^\.lovable\//,
  /(^|\/)package-lock\.json$/,
  /(^|\/)bun\.lock$/,
  /(^|\/)yarn\.lock$/,
  /(^|\/)\.env\.example$/,
  // Os próprios instrumentos: eles CARREGAM os padrões, então achariam a si
  // mesmos. Vale para o script, para o workflow e para as cópias no kit.
  /varredura-de-segredos\.(mjs|yml)$/,
  // …e os CASOS DE TESTE do instrumento (`processos/testes/fixtures/varredura-caso-V.md` é feito para
  // acusar — a bateria o varre por `--arquivo`; a árvore não pode ficar vermelha por causa dele).
  /(^|\/)testes\/fixtures\/varredura-caso-[A-Z]\.md$/,
  /\.(png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|pdf|zip|gz|mp4|mp3|pyc|xlsx?|docx?)$/i,
];

/**
 * Só no modo ÁRVORE: arquivo morto. É rastro histórico do que já se soube — o
 * escritório não reescreve documento datado (a própria regra de ouro do
 * CLAUDE.md diz isso). No DIFF eles são varridos normalmente: acrescentar
 * segredo NOVO dentro de `_legado/` continua sendo acrescentar segredo.
 */
const IGNORADOS_SO_NA_ARVORE = [/(^|\/)_legado\//, /(^|\/)_historico\//];

function ignorar(caminho, modo) {
  if (IGNORADOS_SEMPRE.some((re) => re.test(caminho))) return true;
  if (modo === "arvore" && IGNORADOS_SO_NA_ARVORE.some((re) => re.test(caminho))) return true;
  return false;
}

// ═══════════════════════════════════════════════════════════════════════════
// 5) O motor
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Guarda as últimas linhas para as regras que precisam de VIZINHANÇA. Um valor
 * cru dentro de um bloco de código não tem palavra nenhuma ao lado — o rótulo
 * ("Token:", "Senha:") está uma ou duas linhas acima. Sem janela, a regra do
 * hexadecimal cru nunca acharia o caso real que motivou este arquivo.
 */
const TAMANHO_DA_JANELA = 3;

function criarJanela() {
  const buffer = [];
  return {
    empurrar(linha) {
      buffer.push(linha);
      if (buffer.length > TAMANHO_DA_JANELA + 1) buffer.shift();
    },
    texto() {
      return buffer.join("\n");
    },
  };
}

function examinarLinha(caminho, numero, texto, achados, janela) {
  if (MARCADOR_DE_EXCECAO.test(texto)) return;

  // Tira de vista o que é público por desenho, para que nenhuma regra o veja.
  let limpa = texto.replace(CHAVE_PUBLICAVEL, "«chave-publicavel»");
  limpa = limpa.replace(JWT, (jwt) => (ehCrachaPublico(jwt) ? "«cracha-anon-publico»" : jwt));

  const vizinhanca = janela ? janela.texto() : limpa;

  for (const regra of REGRAS) {
    // O contexto EXIGIDO pode vir da vizinhança (rótulo na linha de cima); o
    // PROIBIDO só vale na própria linha, senão um "commit" solto duas linhas
    // acima calaria um achado de verdade.
    if (regra.exigeContexto && !regra.exigeContexto.test(regra.janela ? vizinhanca : limpa)) continue;
    if (regra.proibeContexto && regra.proibeContexto.test(limpa)) continue;
    regra.re.lastIndex = 0;
    let m;
    while ((m = regra.re.exec(limpa)) !== null) {
      const valor = regra.valor ? regra.valor(m) : m[0];
      if (ehPlaceholder(valor, regra.heuristicaFraca)) continue;
      achados.push({ caminho, numero, id: regra.id, categoria: regra.categoria });
    }
  }

  // Um JWT que sobreviveu à limpeza acima NÃO é `anon`: é segredo.
  JWT.lastIndex = 0;
  if (JWT.exec(limpa) !== null) {
    achados.push({
      caminho,
      numero,
      id: "jwt-nao-anon",
      categoria: "crachá JWT que não é o público `anon` (pode ser `service_role`)",
    });
  }
}

// 01/09 (EX-F): a OUTRA forma do cofre humano — a credencial numa COLUNA (cabeçalho "Senha"/"Token")
// e o valor várias linhas abaixo, em cada linha da tabela. Nenhuma regra por linha vê isso: o rótulo
// não está na linha do valor. O motor lembra as colunas-de-credencial da tabela em curso.
const ROTULO_DE_CREDENCIAL =
  /\b(?:senha|password|passwd|secret|segredo|token|api[_ -]?key|apikey|chave|client[_ -]?secret|service[_ -]?role)\b/i;
const LINHA_SEPARADORA = /^\s*\|?\s*:?-{3,}/;
function celulasDe(l) {
  return l.replace(/^\s*\|/, "").replace(/\|\s*$/, "").split("|");
}
function examinarColunasDeTabela(caminho, numero, l, colunas, achados) {
  if (!colunas || !colunas.length || LINHA_SEPARADORA.test(l) || MARCADOR_DE_EXCECAO.test(l)) return;
  const cs = celulasDe(l);
  for (const k of colunas) {
    // tira ênfase markdown (`**Supabase**` tem 12 caracteres e parecia opaco — 2º falso positivo,
    // `processos/ESTRATEGIA-CONTAS-E-COFRE-2026-08-11.md:60`); exige letra E dígito; recusa caminho.
    const v = (cs[k] || "").trim().replace(/^[*_`]+|[*_`]+$/g, "");
    if (!/^[^\s|/]{8,}$/.test(v)) continue;
    if (!/[A-Za-z]/.test(v) || !/[0-9]/.test(v)) continue;
    if (CHAVE_PUBLICAVEL.test(v) || (JWT.test(v) && ehCrachaPublico(v))) continue;
    if (ehPlaceholder(v, true)) continue;
    achados.push({
      caminho, numero, id: "senha-em-coluna-de-tabela",
      categoria: "credencial em coluna de tabela markdown (cabeçalho senha/token/chave)",
    });
  }
}

function examinarTexto(caminho, conteudo, achados) {
  const linhas = conteudo.split("\n");
  const janela = criarJanela();
  let colunas = null; // índices das colunas-de-credencial da tabela em curso (null = fora de tabela)
  for (let i = 0; i < linhas.length; i += 1) {
    janela.empurrar(linhas[i]);
    examinarLinha(caminho, i + 1, linhas[i], achados, janela);
    const l = linhas[i];
    if (/^\s*\|/.test(l)) {
      if (LINHA_SEPARADORA.test(linhas[i + 1] || "")) {
        colunas = celulasDe(l).map((c, k) => (ROTULO_DE_CREDENCIAL.test(c) ? k : -1)).filter((k) => k >= 0);
        continue;
      }
      examinarColunasDeTabela(caminho, i + 1, l, colunas, achados);
    } else {
      colunas = null;
    }
  }
}

function git(args) {
  return execFileSync("git", args, { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
}

/** Lê um diff `-U0` e examina SÓ as linhas ACRESCENTADAS. */
function examinarDiff(diff, achados) {
  let caminho = null;
  let numero = 0;
  let janela = criarJanela();
  for (const linha of diff.split("\n")) {
    if (linha.startsWith("+++ ")) {
      const alvo = linha.slice(4).trim();
      caminho = alvo === "/dev/null" ? null : alvo.replace(/^b\//, "");
      if (caminho && ignorar(caminho, "diff")) caminho = null;
      janela = criarJanela(); // arquivo novo, vizinhança nova
      continue;
    }
    if (linha.startsWith("@@")) {
      const m = /\+(\d+)/.exec(linha);
      numero = m ? Number(m[1]) : 0;
      // Trecho novo: as linhas de antes não são vizinhas das de agora.
      janela = criarJanela();
      // O `-U0` corta o contexto, mas o cabeçalho do trecho costuma trazer a
      // assinatura da seção (`@@ … @@ ## Token do robô`) — vale como vizinho.
      const rotulo = linha.split("@@").slice(2).join("@@").trim();
      if (rotulo) janela.empurrar(rotulo);
      continue;
    }
    if (!caminho) continue;
    if (linha.startsWith("\\")) continue; // "\ No newline at end of file"
    if (linha.startsWith("-")) continue; // linha REMOVIDA: não é entrada de nada
    if (linha.startsWith(" ")) {
      // Linha de CONTEXTO (o diff é pedido com `-U2` justamente para elas):
      // não é varrida — ninguém a acrescentou neste envio — mas entra na
      // vizinhança, para que o rótulo "Token:" que já existia no arquivo
      // ainda sirva de contexto ao valor que ESTE envio acrescentou.
      janela.empurrar(linha.slice(1));
      numero += 1;
      continue;
    }
    if (linha.startsWith("+")) {
      const texto = linha.slice(1);
      janela.empurrar(texto);
      examinarLinha(caminho, numero, texto, achados, janela);
      numero += 1;
    }
  }
}

function examinarArvore(achados) {
  for (const caminho of git(["ls-files", "-z"]).split("\0").filter(Boolean)) {
    if (ignorar(caminho, "arvore")) continue;
    let conteudo;
    try {
      if (statSync(caminho).size > 8 * 1024 * 1024) continue;
      conteudo = readFileSync(caminho, "utf8");
    } catch {
      continue;
    }
    if (conteudo.includes("\u0000")) continue; // binário
    examinarTexto(caminho, conteudo, achados);
  }
}

/**
 * Resolve a base do intervalo. Branch nova, envio forçado ou primeiro commit:
 * o GitHub manda 40 zeros (ou vazio) — aí vale conferir ao menos o último
 * commit, em vez de não conferir nada. Esta lógica mora AQUI, e não no yml,
 * porque script se testa e shell embutido em workflow não.
 */
function resolverBase(base, topo) {
  const vazia = !base || /^0{40}$/.test(base);
  const existe = (r) => {
    try {
      git(["cat-file", "-e", `${r}^{commit}`]);
      return true;
    } catch {
      return false;
    }
  };
  if (!vazia && existe(base)) return base;
  try {
    return git(["rev-parse", `${topo}^`]).trim();
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 6) Linha de comando
// ═══════════════════════════════════════════════════════════════════════════

const USO =
  "uso: varredura-de-segredos.mjs [--intervalo <base>..<topo> | --intervalo <base> <topo> | --arvore | --arquivo <caminho>]";

const argv = process.argv.slice(2);
const modo = argv[0];
const achados = [];
let titulo;

try {
  if (modo === "--intervalo") {
    let base;
    let topo;
    if (argv[1] && argv[1].includes("..")) {
      // Aceita `base..topo` (a forma que o workflow usa) e também `base...topo`.
      const partes = argv[1].split("..");
      base = partes[0];
      topo = partes[partes.length - 1];
    } else {
      base = argv[1];
      topo = argv[2];
    }
    topo = topo || "HEAD";
    if (!base) {
      console.error(USO);
      process.exit(2);
    }
    const baseReal = resolverBase(base, topo);
    if (!baseReal) {
      console.log("ℹ️  Varredura de segredos: sem base de comparação neste evento — nada a varrer.");
      process.exit(0);
    }
    titulo = `no que ${topo.slice(0, 12)} acrescentou em relação a ${baseReal.slice(0, 12)}`;
    // `-U2` e não `-U0`: as duas linhas de contexto NÃO são varridas (ninguém
    // as acrescentou), mas alimentam a janela de vizinhança — é o que permite
    // o rótulo "Token:" que já estava no arquivo dar contexto ao valor cru que
    // este envio acrescentou uma linha abaixo.
    examinarDiff(git(["diff", "-U2", "--diff-filter=ACMR", "--no-color", baseReal, topo]), achados);
  } else if (modo === "--arvore") {
    titulo = "em tudo que está versionado hoje";
    examinarArvore(achados);
  } else if (modo === "--arquivo") {
    const alvo = argv[1];
    if (!alvo) {
      console.error(USO);
      process.exit(2);
    }
    titulo = `no arquivo ${alvo}`;
    examinarTexto(alvo, readFileSync(alvo, "utf8"), achados);
  } else {
    console.error(USO);
    process.exit(2);
  }
} catch (erro) {
  console.error(`varredura de segredos: falhou — ${erro.message}`);
  process.exit(2);
}

// Uma mesma linha pode casar em duas regras (um JWT que também está atribuído a
// um nome de segredo, por exemplo). Isso vale UMA linha de relatório por
// categoria, não duas — repetição também é ruído.
const vistos = new Set();
const unicos = achados.filter((a) => {
  const chave = `${a.caminho}:${a.numero}:${a.id}`;
  if (vistos.has(chave)) return false;
  vistos.add(chave);
  return true;
});
unicos.sort((a, b) => a.caminho.localeCompare(b.caminho) || a.numero - b.numero);

if (unicos.length === 0) {
  console.log(`✅ Varredura de segredos: nada encontrado ${titulo}.`);
  process.exit(0);
}

console.error("");
console.error(`🔴 Varredura de segredos (D200): ${unicos.length} achado(s) ${titulo}.`);
console.error("");
for (const a of unicos) {
  // Caminho, linha e categoria. O VALOR nunca — nem mascarado (ver o cabeçalho).
  console.error(`  ${a.caminho}:${a.numero}  —  ${a.categoria}`);
}
console.error("");
console.error("O que fazer (D200 + D208):");
console.error("  1. Tire o valor do arquivo. Segredo mora no cofre / nos segredos do painel");
console.error("     (Actions secrets, Edge secrets), nunca no git.");
console.error("  2. A linha vira PONTEIRO nomeado ao cofre humano (D208). Rotação NÃO é");
console.error("     obrigatória e o histórico FICA — as duas coisas são decisão do dono.");
console.error("     O escritório não rotaciona, não apaga chave e não reescreve histórico.");
console.error("  3. Antes de mexer em qualquer segredo, a lista de QUEM QUEBRA vem junto");
console.error("     (regra `segredo-e-consumidor`): pedido sem a lista é pedido inválido.");
console.error("  4. Se for chave `anon`/`publishable` do Supabase, é pública por desenho");
console.error("     (D206) e não deveria ter caído aqui — ajuste a allowlist.");
console.error("  5. Falso positivo de verdade: encerre a linha com o marcador `segredo-ok`");
console.error("     em comentário. Fica visível para quem revisar.");
console.error("");
process.exit(1);
