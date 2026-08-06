// ============================================================================
// /guia-etapas — Guia do Processo (Tema 1130) para PARCEIROS e CLIENTES.
//
// Página SEM navegação interna apontando para ela (acesso só pela URL) e com
// noindex (via seo-routes.json + prerender): é material de apoio que a SBA
// envia a quem já está na conversa — não uma página de captação orgânica.
// Conteúdo: o guia completo do processo + catálogo de produtos + o explicativo
// da via administrativa (e da reserva judicial), em linguagem de leigo.
// ============================================================================
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/* ---------- blocos locais de apresentação ---------- */

const Secao = ({
  numero,
  titulo,
  chamada,
  children,
  id,
}: {
  numero: string;
  titulo: string;
  chamada?: string;
  children: ReactNode;
  id?: string;
}) => (
  <section id={id} className="border-t border-border py-14 first:border-t-0">
    <div className="container-sba max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        {numero}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold text-primary-dark md:text-3xl">
        {titulo}
      </h2>
      {chamada && (
        <p className="mt-3 max-w-2xl text-muted-foreground">{chamada}</p>
      )}
      <div className="rule-gold mt-5" />
      <div className="mt-8 space-y-6">{children}</div>
    </div>
  </section>
);

const Cartao = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
    {children}
  </div>
);

const Etapa = ({
  n,
  nome,
  grupo,
  children,
}: {
  n: number;
  nome: string;
  grupo: string;
  children: ReactNode;
}) => (
  <article className="rounded-lg border border-border bg-card p-6 shadow-sm">
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-md bg-primary px-3 py-2 font-display text-sm font-bold text-primary-foreground">
        Etapa {n}
      </span>
      <h3 className="font-display text-lg font-semibold text-primary-dark">
        {nome}
      </h3>
      <span className="ml-auto rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {grupo}
      </span>
    </div>
    <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-foreground/90">
      {children}
    </div>
  </article>
);

const Rotulo = ({ children }: { children: ReactNode }) => (
  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
    {children}
  </p>
);

const QA = ({ q, children }: { q: string; children: ReactNode }) => (
  <div className="max-w-3xl">
    <p className="font-semibold italic text-primary-dark">{q}</p>
    <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
      {children}
    </p>
  </div>
);

const Termo = ({ t, children }: { t: string; children: ReactNode }) => (
  <p className="text-sm leading-relaxed text-muted-foreground">
    <b className="text-foreground">{t}</b> — {children}
  </p>
);

/* ---------- página ---------- */

const GuiaEtapas = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="bg-primary-dark py-16 text-white md:py-20">
        <div className="container-sba max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            SBA Negócios · guia para parceiros e municípios
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-5xl">
            Recuperação do IRRF municipal — o caminho completo, explicado do
            zero
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            O que o Supremo decidiu, por que os municípios têm dinheiro a
            recuperar, e como funciona o nosso processo — etapa por etapa, com
            quem faz o quê, o que se assina e quanto custa. Sem juridiquês e
            sem promessa vazia.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-4 py-2 font-semibold">
              Diagnóstico sempre gratuito
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 font-semibold">
              Pagamento só sobre resultado real
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 font-semibold">
              Sem senha, sem sistema, sem procuração
            </span>
          </div>
        </div>
      </section>

      {/* 1 · HISTÓRIA */}
      <Secao
        numero="1 · Comece por aqui"
        titulo="A história em um minuto — por que existe dinheiro a recuperar"
      >
        <p>
          <b>Primeiro, o imposto.</b> Quando uma prefeitura paga um fornecedor —
          a empreiteira da obra, a empresa de limpeza, o escritório de
          engenharia — a lei manda <b>descontar uma parte do pagamento na
          hora</b>, a título de imposto de renda do fornecedor. Isso é a{" "}
          <b>retenção na fonte</b>; o imposto retido é o <b>IRRF</b>.
        </p>
        <p>
          <b>Segundo, a pergunta de bilhões: de quem é esse imposto?</b> A
          Constituição (art. 158, I) diz que o imposto de renda retido na fonte
          pelo município <b>pertence ao próprio município</b>. Mas, por décadas,
          quase todo mundo entendeu que isso valia só para a folha dos
          servidores — e o IRRF retido de <b>fornecedores</b> acabava indo para
          a União, ou se perdendo no caminho.
        </p>
        <p>
          <b>Terceiro, a decisão.</b> Em 2021 o Supremo Tribunal Federal julgou
          exatamente essa questão — o <b>Tema 1130</b> (RE 1.293.453) — e
          decidiu: o IRRF retido sobre pagamentos a fornecedores{" "}
          <b>também é do município</b>. A decisão <b>transitou em julgado</b> em
          16/02/2022 (acabou; não cabe mais recurso) e veio{" "}
          <b>sem modulação</b> — vale também para o passado. A própria
          Procuradoria da Fazenda Nacional orientou seus procuradores a não
          contestar o tema (Parecer 5.744/2022), e o Tribunal de Contas de São
          Paulo orientou os municípios a tratar o IRRF como receita própria
          (Comunicado GP nº 55/2022).
        </p>
        <Cartao>
          <Rotulo>As três frentes que a decisão abre</Rotulo>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px]">
            <li>
              <b>O passado:</b> o que foi retido nos <b>últimos 5 anos</b> e não
              ficou com o município pode ser recuperado (prazo legal — a
              prescrição quinquenal).
            </li>
            <li>
              <b>O presente:</b> dinheiro retido que <b>nunca saiu do caixa</b>,
              mas está travado na contabilidade sem poder ser usado — dá para
              regularizar.
            </li>
            <li>
              <b>O futuro:</b> o município pode passar a{" "}
              <b>reter corretamente e ficar</b> com esse imposto todo mês, sem
              depender de ninguém devolver nada.
            </li>
          </ol>
        </Cartao>
        <p>
          <b>Por que quase nenhum município pegou esse dinheiro?</b> (1) muitos
          nem sabem que a decisão os alcança; (2) recuperar exige{" "}
          <b>provar, documento a documento</b>, quanto foi retido e para onde
          cada real foi — trabalho técnico que as equipes não têm braço para
          fazer; e (3) há medo de errar: contratar mal esse serviço já rendeu
          contratos mandados rescindir pelos Tribunais de Contas.
        </p>
        <p>
          <b>É aqui que a SBA entra.</b> A SBA faz a conferência completa —{" "}
          <b>de graça</b> — e devolve ao município um número com prova. Só se
          houver valor, e só se o município quiser seguir, é que se fala em
          contrato; e a remuneração é <b>por resultado</b>. Se a conferência der
          zero, o trabalho encerra sem custo. O caminho da recuperação é{" "}
          <b>administrativo</b> — não é um processo judicial.
        </p>
      </Secao>

      {/* 2 · QUATRO CAMINHOS */}
      <Secao
        numero="2 · O conceito central"
        titulo="Os quatro caminhos do dinheiro"
        chamada="Cada real de IRRF retido pelo município tomou um de quatro caminhos. Descobrir qual — com prova — é o trabalho da conferência."
      >
        <Cartao>
          <Rotulo>Exemplo com números inventados</Rotulo>
          <p className="mt-2 text-[15px]">
            A prefeitura paga <b>R$ 100.000</b> a uma empresa de serviços. Pela
            tabela oficial, retém <b>4,8%</b> na fonte: <b>R$ 4.800</b>. A
            empresa recebe R$ 95.200. E os R$ 4.800? Foram para um destes
            quatro lugares:
          </p>
        </Cartao>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="border-b border-border py-2 pr-3">Caminho</th>
                <th className="border-b border-border py-2 pr-3">
                  O que aconteceu
                </th>
                <th className="border-b border-border py-2">
                  O que isso significa
                </th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr>
                <td className="border-b border-border py-3 pr-3 font-semibold">
                  1 · Apropriado
                </td>
                <td className="border-b border-border py-3 pr-3">
                  O município reconheceu o valor como receita própria e ficou
                  com ele.
                </td>
                <td className="border-b border-border py-3">
                  <b>Certo!</b> É o que a decisão do STF manda — aqui só se
                  comprova a conformidade.
                </td>
              </tr>
              <tr>
                <td className="border-b border-border py-3 pr-3 font-semibold">
                  2 · Descontado do FPM
                </td>
                <td className="border-b border-border py-3 pr-3">
                  A União abateu o valor do repasse mensal (o FPM) que o
                  município tinha a receber — o município "pagou" a União com
                  dinheiro que era dele.
                </td>
                <td className="border-b border-border py-3">
                  <b>Recuperável</b> pela via administrativa.
                </td>
              </tr>
              <tr>
                <td className="border-b border-border py-3 pr-3 font-semibold">
                  3 · Parado no passivo
                </td>
                <td className="border-b border-border py-3 pr-3">
                  O valor nunca saiu do caixa, mas ficou registrado numa conta
                  de "a recolher" — o município tem o dinheiro e não pode
                  usá-lo.
                </td>
                <td className="border-b border-border py-3">
                  <b>Regularizável:</b> prova-se que é IRRF de fornecedor e o
                  valor vira disponível.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-3 font-semibold">
                  4 · Recolhido à União
                </td>
                <td className="py-3 pr-3">
                  O município pagou uma guia (DARF) e mandou o valor para a
                  Receita Federal.
                </td>
                <td className="py-3">
                  <b>Recuperável:</b> é pagamento indevido — volta por
                  compensação ou restituição.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A régua de honestidade que amarra tudo: <b>a conta tem de fechar ao
          centavo</b>. Tudo o que foi retido num ano precisa aparecer na soma
          dos quatro caminhos daquele ano. Se não fecha, não se afirma —
          investiga-se até fechar. E <b>número, só com documento</b>: nenhum
          valor é afirmado sem a fonte que o prova.
        </p>
      </Secao>

      {/* 3 · REGRAS DE OURO + MAPA DAS ETAPAS */}
      <Secao
        numero="3 · O percurso de relance"
        titulo="As 12 etapas, em 4 blocos"
        chamada="O processo é uma escada: cada etapa produz o papel (ou o fato) que a seguinte precisa para existir. Três regras valem do começo ao fim:"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Cartao>
            <p className="font-semibold text-primary-dark">
              1 · Gratuito até haver resultado
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Da primeira carta ao Plano de Recuperação, nada custa. Preço só
              existe no contrato, e pagamento só sobre resultado.
            </p>
          </Cartao>
          <Cartao>
            <p className="font-semibold text-primary-dark">
              2 · Nada acontece no escuro
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              O gestor assina sabendo exatamente o que será pedido; cada
              entrega tem recibo; cada número tem fonte.
            </p>
          </Cartao>
          <Cartao>
            <p className="font-semibold text-primary-dark">
              3 · Sem sistema, senha ou procuração
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Trabalhamos só com cópias de documentos que o município já tem,
              entregues por servidor designado por portaria.
            </p>
          </Cartao>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="border-b border-border py-2 pr-3">Etapa</th>
                <th className="border-b border-border py-2 pr-3">Nome</th>
                <th className="border-b border-border py-2 pr-3">Quem age</th>
                <th className="border-b border-border py-2 pr-3">
                  Assina-se?
                </th>
                <th className="border-b border-border py-2">Custa?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1", "A carta (proposta inicial)", "SBA", "Nada", "Nada"],
                ["2", "A reunião", "Juntos", "Nada", "Nada"],
                [
                  "3",
                  "O termo de cooperação técnica",
                  "Município + SBA",
                  "Sim — o termo",
                  "Nada",
                ],
                [
                  "4",
                  "A portaria do servidor",
                  "Município",
                  "Sim — ato do Município",
                  "Nada",
                ],
                ["5", "O ofício (pedido formal)", "SBA", "Nada", "Nada"],
                [
                  "6",
                  "A entrega das cópias",
                  "Município (com apoio SBA)",
                  "Só o recibo",
                  "Nada",
                ],
                ["7", "A conferência", "SBA", "Nada", "Nada"],
                [
                  "8",
                  "O Levantamento de Oportunidade",
                  "SBA",
                  "Nada",
                  "Nada",
                ],
                [
                  "9",
                  "A definição das vias (Plano)",
                  "Juntos",
                  "Nada",
                  "Nada",
                ],
                [
                  "10",
                  "O contrato",
                  "Município + SBA",
                  "Sim — o contrato",
                  "Define os preços",
                ],
                [
                  "11",
                  "A execução",
                  "SBA (atos do Município)",
                  "Atos próprios do Município",
                  "Coberto pelo contrato",
                ],
                [
                  "12",
                  "A cobrança",
                  "SBA + Controle Interno",
                  "Nada",
                  "Só sobre resultado",
                ],
              ].map((r) => (
                <tr key={r[0]}>
                  <td className="border-b border-border py-2 pr-3 font-bold text-primary">
                    {r[0]}
                  </td>
                  <td className="border-b border-border py-2 pr-3 font-medium">
                    {r[1]}
                  </td>
                  <td className="border-b border-border py-2 pr-3">{r[2]}</td>
                  <td className="border-b border-border py-2 pr-3">{r[3]}</td>
                  <td className="border-b border-border py-2">{r[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Secao>

      {/* 4 · ETAPAS DETALHADAS */}
      <Secao
        numero="4 · Etapa por etapa"
        titulo="O que acontece em cada degrau — e por quê"
      >
        <Etapa n={1} nome="A carta (proposta inicial)" grupo="Abrir a porta">
          <p>
            A primeira aproximação: uma carta ao gestor que desperta o
            interesse com <b>dado público real</b> — não com promessa — e pede
            uma reunião. Antes de qualquer contato, a SBA levanta por conta
            própria os dados públicos do município (repasses na fonte oficial
            do Tesouro, série da contabilidade pública) e descobre, na
            legislação local, quem tem competência para assinar o termo.
            Ninguém pede nada à prefeitura nesta fase.
          </p>
          <p className="text-sm text-muted-foreground">
            O que <b>não</b> acontece aqui: não se pede documento, não se
            promete valor, não se fala em contrato. Quem "vende" na carta é o
            fato — a decisão definitiva do STF.
          </p>
        </Etapa>

        <Etapa n={2} nome="A reunião" grupo="Abrir a porta">
          <p>
            O encontro com o gestor (idealmente com procuradoria e contadoria
            juntas) onde mostramos <b>de onde vem cada número</b> — conferível
            ao vivo nas fontes públicas — e dizemos o limite honesto em voz
            alta: o dado público mostra o <i>tamanho</i> da oportunidade;
            quanto é efetivamente recuperável, só os documentos do próprio
            município revelam. Por isso o convite: uma conferência completa,
            gratuita e sem compromisso. <b>Nada se assina na reunião.</b>
          </p>
        </Etapa>

        <Etapa n={3} nome="O termo — o único “sim” da entrada" grupo="Autorizar">
          <p>
            Um <b>termo de cooperação técnica sem ônus</b> (da família dos
            convênios; a lei de licitações — art. 184 da Lei 14.133/2021 — o
            alcança apenas “no que couber”, e, como não gera despesa, não há o
            que licitar). É o único papel que o gestor assina na entrada:
            autoriza a conferência gratuita e a saída de <b>cópias</b> de
            documentos. O anexo do termo lista, um a um, os documentos que
            serão pedidos — o gestor assina <i>já sabendo</i> o que vem pela
            frente.
          </p>
          <p>
            Assinam: pelo município, quem tem a competência na estrutura local
            (em regra o <b>secretário da pasta</b>; o procurador-geral ou o
            prefeito são alternativas — e uma <b>delegação de uma página</b>,
            já minutada no material, resolve onde faltar); pela SBA, a
            representante legal. O termo já traz a proteção de dados desde a
            fase gratuita: o município é o controlador; a SBA, operadora, com
            dever de sigilo (LGPD).
          </p>
          <p className="text-sm text-muted-foreground">
            O termo não obriga a contratar depois, não dá exclusividade, não
            cede acesso a sistema e não tem custo escondido. Se a conferência
            der zero, ele simplesmente se encerra.
          </p>
        </Etapa>

        <Etapa n={4} nome="A portaria do servidor" grupo="Autorizar">
          <p>
            Um ato de uma página em que o Município designa, por escrito,{" "}
            <b>quem</b> vai reunir e entregar os documentos. Existe para{" "}
            <b>proteger o próprio servidor</b>: com portaria, ele age por dever
            de ofício, por ato oficial e com recibo — não por conta própria. A
            minuta vai pronta; o Município só adapta nome e cargo.
          </p>
        </Etapa>

        <Etapa n={5} nome="O ofício — o pedido formal, em grupos" grupo="Autorizar">
          <p>
            O papel em que a SBA formaliza <b>o que</b> entregar e <b>como</b>,
            citando o termo e a portaria — o documento que o servidor arquiva
            como amparo. O pedido vem em <b>grupos</b>: o essencial é o{" "}
            <b>Livro Razão</b> da conta de retenções, que sozinho já permite
            começar; o restante vem em levas, no ritmo do município — a
            entrega nunca trava à espera de um item difícil.
          </p>
        </Etapa>

        <Etapa n={6} nome="A entrega das cópias" grupo="Conferir · gratuito">
          <p>
            A contadoria extrai e entrega as cópias com um roteiro passo a
            passo que fornecemos (a extração pode ser feita em conjunto). Cada
            remessa é formalizada por um termo de entrega que registra a{" "}
            <b>“impressão digital” eletrônica</b> (SHA-256) de cada arquivo —
            se um único byte mudar depois, a alteração aparece. O servidor
            recebe recibo de tudo. Depois disto,{" "}
            <b>nada mais se assina até o contrato</b>.
          </p>
        </Etapa>

        <Etapa n={7} nome="A conferência" grupo="Conferir · gratuito">
          <p>
            Com as cópias em mãos, a SBA <b>fecha as contas ao centavo</b>:
            pega cada retenção registrada no Razão e descobre, com prova, qual
            dos quatro caminhos aquele dinheiro tomou. Cruza-se o público com o
            real (o que o Tesouro diz que distribuiu × o que o extrato mostra
            que entrou), fecha-se a equação por exercício e vale a regra
            anti-estimativa: número só de documento; sem documento, a linha
            fica “a apurar” — <b>nunca se inventa</b>. Onde couber, os valores
            são atualizados pela SELIC, na forma da legislação.
          </p>
        </Etapa>

        <Etapa n={8} nome="O Levantamento de Oportunidade" grupo="Conferir · gratuito">
          <p>
            O resultado da conferência, entregue ao município: o montante
            agregado apurado e a indicação resumida do caminho de cada parte.
            É o número com prova que permite decidir com segurança.{" "}
            <b>Se for zero, o vínculo se encerra aqui, sem custo</b> — e o
            município fica com o Levantamento como registro.
          </p>
        </Etapa>

        <Etapa n={9} nome="A definição das vias (Plano de Recuperação)" grupo="Definir e recuperar">
          <p>
            Com o Levantamento na mão, SBA e Município olham{" "}
            <b>todas as oportunidades juntas</b> e definem o que será feito e
            por quais vias — administrativa por regra; conformidade; judicial
            só como reserva. Nasce o <b>Plano de Recuperação</b>, base do
            contrato. Nada se assina aqui.
          </p>
        </Etapa>

        <Etapa n={10} nome="O contrato" grupo="Definir e recuperar">
          <p>
            Só agora, com número real e vontade de seguir: a forma de
            contratação (inexigibilidade, licitação ou credenciamento — quem
            escolhe é a procuradoria do município) e os preços por produto,
            fechados na negociação. Contratar <b>depois</b> do número e do
            plano é o que separa este desenho das contratações que os
            Tribunais de Contas mandaram rescindir — objeto genérico, preço sem
            base, pagamento sem ingresso.
          </p>
        </Etapa>

        <Etapa n={11} nome="A execução" grupo="Definir e recuperar">
          <p>
            A SBA conduz cada oportunidade pela via definida até o dinheiro
            estar <b>disponível</b> para o município: apropriar/regularizar
            (laudo e minutas da SBA; <b>o lançamento contábil é sempre da
            contadoria</b>), compensar (pela via eletrônica da Receita,{" "}
            <b>transmitida pelo próprio município</b> com o certificado digital
            dele — a SBA prepara, instrui e valida cada pedido), restituir
            quando a compensação não couber, e organizar as rotinas para o
            município <b>reter e apropriar corretamente daqui pra frente</b>.
          </p>
          <p className="text-sm text-muted-foreground">
            Os cuidados de dinheiro público: a receita entra “bruta” (honorário
            nunca é descontado na fonte); dinheiro novo entra no orçamento
            pelo mecanismo legal próprio; toda despesa tem empenho e
            liquidação.
          </p>
        </Etapa>

        <Etapa n={12} nome="A cobrança — só sobre o que virou realidade" grupo="Definir e recuperar">
          <p>
            O fecho do ciclo: a SBA só cobra sobre proveito{" "}
            <b>efetivamente disponibilizado</b>, evento a evento, atestado pelo{" "}
            <b>Controle Interno do município</b> — nunca sobre lançamento,
            projeção ou promessa. Acontece um evento concreto (parcela
            creditada, compensação homologada, economia medida) → o Controle
            Interno atesta o valor → a SBA emite a nota daquele evento → o
            pagamento segue o rito público. E a <b>trava de glosa</b>: se a
            Receita desfizer o proveito depois, a SBA <b>devolve</b> o que
            recebeu sobre a parcela desfeita, atualizado.
          </p>
          <p className="text-sm text-muted-foreground">
            Exemplo com números inventados: compensação homologada de R$
            200.000, atestada pelo Controle Interno; com êxito de 20%, a nota é
            de R$ 40.000 — sobre esse evento, e só sobre ele. Se depois a
            Receita glosar R$ 50.000, a SBA devolve os R$ 10.000
            correspondentes, atualizados.
          </p>
        </Etapa>
      </Secao>

      {/* 5 · PRODUTOS & PREÇOS */}
      <Secao
        numero="5 · Os produtos"
        titulo="O que a SBA entrega — e quanto custa cada coisa"
        chamada="Cada produto trata de um destino do dinheiro retido (para onde ele foi) ou de como parar de perdê-lo. Regra-mãe: tudo até o Plano de Recuperação é gratuito; preço só existe no contrato; cobrança só sobre resultado."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Cartao>
            <p className="font-display font-semibold text-primary-dark">
              1 · Recuperação do que foi para a União
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              O IRRF que acabou com a União — recolhido por guia (raro) ou{" "}
              <b>descontado do repasse do FPM</b> (o caminho mais comum). Volta
              pela via administrativa: apropriação, compensação com tributos
              federais do próprio município e restituição.
            </p>
            <p className="mt-3 text-sm">
              <b>Preço:</b> êxito de <b>20%</b> sobre o que efetivamente
              ingressar (referência; fecha na negociação), com trava de glosa.
            </p>
          </Cartao>
          <Cartao>
            <p className="font-display font-semibold text-primary-dark">
              2 · Regularização do dinheiro parado
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              O IRRF que <b>nunca saiu do caixa</b> — ficou “pendurado” numa
              conta de passivo. Não é dinheiro novo entrando: é disponibilidade
              que já existe e passa a poder ser usada. A SBA entrega um{" "}
              <b>laudo técnico credor a credor</b>;{" "}
              <b>o lançamento é sempre da contadoria</b>.
            </p>
            <p className="mt-3 text-sm">
              <b>Preço:</b> a análise é <b>gratuita</b>; a regularização sai
              por <b>preço fixo, fechado caso a caso</b> — nunca percentual —,
              cobrado no aceite do laudo (em até 2 parcelas).
            </p>
          </Cartao>
          <Cartao>
            <p className="font-display font-semibold text-primary-dark">
              3 · Correção da alíquota (reter certo)
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A retenção tem tabela oficial por tipo de bem ou serviço — e
              muitos municípios retêm de menos. Conferimos a régua atual contra
              a tabela e corrigimos daqui pra frente. A conta sai da lei e do
              dado, não de estimativa.
            </p>
            <p className="mt-3 text-sm">
              <b>Preço:</b> êxito de <b>20%</b> sobre a economia que a correção
              efetivamente trouxer, medida mês a mês numa janela definida no
              contrato.
            </p>
          </Cartao>
          <Cartao>
            <p className="font-display font-semibold text-primary-dark">
              4 · Estancamento (corrigir o fluxo futuro)
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Enquanto o passado se recupera, o futuro pode continuar vazando.
              Este produto instala as rotinas e a orientação para o município{" "}
              <b>apropriar corretamente todo mês</b> — economia recorrente,
              que só se realiza se o município aplicar (dito em voz alta: é
              condicionada, não é um cheque).
            </p>
            <p className="mt-3 text-sm">
              <b>Preço:</b> definido caso a caso na negociação, sempre sobre{" "}
              <b>economia realizada e medida</b> — nunca sobre projeção.
            </p>
          </Cartao>
          <Cartao>
            <p className="font-display font-semibold text-primary-dark">
              5 · Autarquias e fundações
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A decisão alcança também os “braços” do município com CNPJ
              próprio (serviço de água, fundações, instituto de previdência).
              É a mesma conferência, repetida por entidade — na prática, uma
              cidade são várias “cidades”. Quem contrata é sempre o{" "}
              <b>Município</b>; o instituto de previdência, quando envolvido,
              entra como interveniente — e o êxito sai do tesouro municipal,
              nunca de recurso previdenciário.
            </p>
            <p className="mt-3 text-sm">
              <b>Preço:</b> êxito de <b>20%</b> por entidade, no ingresso
              efetivo de cada uma, com trava de glosa.
            </p>
          </Cartao>
          <Cartao>
            <p className="font-display font-semibold text-primary-dark">
              As regras que valem para todos
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
              <li>
                Todo número apresentado é <b>potencial sujeito a conferência</b>{" "}
                — nunca promessa de resultado.
              </li>
              <li>
                <b>Nunca prometemos prazo</b> de recebimento: o ritmo é da
                Receita, não nosso.
              </li>
              <li>
                “Só no êxito” fala do <b>nosso pagamento</b> — jamais de “risco
                zero” sobre o resultado.
              </li>
              <li>
                “Não achamos nada” também é uma entrega — dita com todas as
                letras, sem inflar achado.
              </li>
              <li>
                Produtos do futuro não se somam entre si nem com o passado —
                nunca há cobrança dupla sobre o mesmo ganho.
              </li>
            </ul>
          </Cartao>
        </div>
      </Secao>

      {/* 6 · VIA ADMINISTRATIVA × JUDICIAL */}
      <Secao
        numero="6 · A via"
        titulo="Por que não é um processo judicial — e o que é a “reserva”"
      >
        <p>
          A recuperação desenhada é <b>administrativa</b>: apropriação como
          receita própria, compensação com tributos federais do próprio
          município e restituição — atos do próprio município e pedidos à
          Receita, preparados e validados pela SBA de ponta a ponta.{" "}
          <b>Não há segundo prestador na regra.</b>
        </p>
        <p>
          A via <b>judicial</b> existe apenas como <b>reserva</b>: se — e
          somente se — um ponto concreto travar na via administrativa. Nesse
          recorte de exceção, a SBA continua não litigando: o patrocínio da
          ação é de advocacia (ou da Procuradoria do próprio município), por{" "}
          <b>contrato próprio e separado</b>, com teto global declarado — dois
          papéis distintos, sem pagar duas vezes pelo mesmo trabalho. É uma
          porta que fica no plano para o caso raro que a exigir; não é a rota.
        </p>
      </Secao>

      {/* 7 · SEGURANÇA */}
      <Secao
        numero="7 · Segurança"
        titulo="O que a SBA nunca pede — e como os dados são protegidos"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Cartao>
            <p className="font-semibold text-primary-dark">Nunca pedimos</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>Senha ou acesso a qualquer sistema do município;</li>
              <li>Procuração;</li>
              <li>Instalação de qualquer programa;</li>
              <li>
                Documento fora da lista que o gestor conheceu <b>antes</b> de
                assinar o termo.
              </li>
            </ul>
          </Cartao>
          <Cartao>
            <p className="font-semibold text-primary-dark">Sempre fazemos</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
              <li>
                Cópias entregues por servidor designado por portaria, com
                recibo de tudo;
              </li>
              <li>
                Verificação de integridade (SHA-256) de cada arquivo recebido;
              </li>
              <li>
                LGPD desde a fase gratuita: o município é o controlador; a SBA,
                operadora, com dever de sigilo;
              </li>
              <li>
                Envios eletrônicos à Receita são atos do próprio município —
                com o certificado digital dele, nunca o nosso.
              </li>
            </ul>
          </Cartao>
        </div>
      </Secao>

      {/* 8 · O QUE SE ASSINA */}
      <Secao numero="8 · Em resumo" titulo="O que se assina, e quando">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
          <span className="rounded-md bg-primary px-3 py-2 text-primary-foreground">
            Termo de cooperação
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="rounded-md bg-primary px-3 py-2 text-primary-foreground">
            Portaria do servidor
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="rounded-md bg-primary px-3 py-2 text-primary-foreground">
            Recibos de entrega
          </span>
          <span className="text-muted-foreground">→</span>
          <span className="rounded-md bg-gold px-3 py-2 text-gold-foreground">
            Contrato
          </span>
        </div>
        <p>
          Da entrada ao Plano de Recuperação, os únicos papéis assinados são o{" "}
          <b>termo</b>, a <b>portaria</b> do próprio município e o{" "}
          <b>recibo</b> de cada entrega. A conferência, o Levantamento e a
          definição das vias não têm assinatura de compromisso. O{" "}
          <b>contrato</b> é o único que gera cobrança — e a execução e a
          cobrança correm sob ele.
        </p>
      </Secao>

      {/* 9 · FAQ */}
      <Secao
        numero="9 · Perguntas frequentes"
        titulo="As respostas curtas — sem juridiquês"
      >
        <div className="space-y-6">
          <QA q="Isso é legal mesmo? Não é brecha?">
            É o contrário de brecha: é decisão <b>definitiva</b> do Supremo
            (Tema 1130, sem recurso desde 2022), sobre um direito que está na
            Constituição (art. 158, I). A própria Fazenda Nacional orientou
            seus procuradores a não contestar (Parecer 5.744/2022). Recuperar
            receita própria é <b>dever</b> do gestor, não esperteza.
          </QA>
          <QA q="Por que ninguém fez isso antes?">
            Porque até 2021 a questão era discutida, e porque provar exige
            trabalho técnico pesado: fechar a conta de cada retenção, ao
            centavo, com documento. A decisão é recente e a maioria dos
            municípios ainda nem começou.
          </QA>
          <QA q="Vai virar processo judicial?">
            Não é o caminho. A recuperação é <b>administrativa</b>: atos do
            próprio município e pedidos à Receita. A via judicial existe só
            como reserva, por contrato próprio e separado, com advogado — a
            SBA não litiga.
          </QA>
          <QA q="Quanto o município vai receber?">
            Não sabemos — e quem disser que sabe, antes de conferir os
            documentos, está chutando. O dado público mostra o tamanho da
            conversa; o valor real sai da conferência, documento a documento.
            Pode ser maior, menor ou <b>zero</b> — e por isso a conferência vem
            antes de qualquer compromisso.
          </QA>
          <QA q="E se der zero?">
            Encerra sem custo. O município fica com o próprio Levantamento
            como registro do que foi conferido.
          </QA>
          <QA q="Por que a conferência é grátis? Qual é a pegadinha?">
            Não há: é o modelo de negócio. A SBA investe a análise para que a
            decisão do município seja tomada com número real na mesa — e só
            ganha se houver resultado contratado depois. De graça vai a{" "}
            <b>resposta</b> (quanto há, por onde); o dossiê detalhado e o
            método são da SBA.
          </QA>
          <QA q="O termo precisa de licitação?">
            Não: é um acordo de <b>cooperação técnica sem ônus</b> — como não
            gera despesa nem obrigação, não há o que licitar (a lei de
            licitações o alcança apenas “no que couber”, art. 184). Licitação,
            inexigibilidade ou credenciamento só aparecem <b>depois</b>, se o
            município decidir contratar a execução, já com o número na mesa.
          </QA>
          <QA q="Precisa ser o prefeito que assina?">
            No desenho-padrão, não: o termo pode ser assinado pelo{" "}
            <b>secretário da pasta</b> (ou pelo procurador-geral), conforme a
            competência prevista na estrutura do próprio município — e uma
            delegação de uma página, já minutada, resolve onde faltar. Antes
            de definir a caneta, a SBA confere a legislação local de cada
            cidade.
          </QA>
          <QA q="Por que vocês não pedem senha ou acesso ao sistema?">
            Porque criaria risco desnecessário para todo mundo. Cópias
            entregues por servidor designado, com recibo e verificação de
            integridade, dão o mesmo resultado técnico com rastreabilidade
            total.
          </QA>
          <QA q="O servidor que entregar os documentos corre risco?">
            Por isso existe a portaria: ele age por <b>ato oficial</b>, dentro
            de um termo assinado pela autoridade competente, contra um ofício
            formal e com recibo de tudo. É a blindagem dele.
          </QA>
          <QA q="Quanto tempo demora?">
            A conferência anda no ritmo da entrega dos documentos (por isso o
            pedido em grupos). Prazos de compensação e restituição são da
            Receita — e <b>não prometemos prazo de terceiros</b>.
          </QA>
          <QA q="Posso parar no meio?">
            Até o contrato, a qualquer momento e sem custo — o termo é sem
            ônus. Depois do contrato, vale o que o contrato diz: vigência por
            escopo e saída sem ônus nas hipóteses previstas.
          </QA>
          <QA q="Outros municípios já fizeram?">
            Sim — há centenas de contratações públicas desse serviço
            registradas no país. A SBA se diferencia pelo desenho: conferência
            gratuita primeiro, contrato depois do número, pagamento só sobre
            resultado e via administrativa como regra.
          </QA>
        </div>
      </Secao>

      {/* 10 · DICIONÁRIO */}
      <Secao
        numero="10 · Dicionário"
        titulo="Cada termo do processo, em uma frase"
      >
        <div className="grid gap-x-10 gap-y-3 md:grid-cols-2">
          <Termo t="IRRF">
            Imposto de Renda Retido na Fonte: a parte do pagamento que quem
            paga desconta na hora, a título de imposto de quem recebe.
          </Termo>
          <Termo t="Retenção na fonte">
            o ato de descontar o imposto no momento do pagamento.
          </Termo>
          <Termo t="Tema 1130">
            o número que o STF deu à questão “de quem é o IRRF que o município
            retém de fornecedores?”; resposta definitiva: do município.
          </Termo>
          <Termo t="Trânsito em julgado">
            o momento em que a decisão se torna definitiva, sem mais recurso
            (aqui: 16/02/2022).
          </Termo>
          <Termo t="Sem modulação">
            o STF não limitou a decisão “daqui para frente”; ela vale também
            para o passado.
          </Termo>
          <Termo t="Prescrição quinquenal">
            o prazo de 5 anos para reclamar valores; o que passa disso não se
            recupera mais.
          </Termo>
          <Termo t="FPM">
            Fundo de Participação dos Municípios: o repasse federal mensal; é
            dele que a União às vezes desconta o IRRF.
          </Termo>
          <Termo t="Livro Razão">
            o registro contábil que mostra, lançamento a lançamento, tudo que
            passou por uma conta.
          </Termo>
          <Termo t="DARF">
            a guia de pagamento de tributos federais; DARF de IRRF de
            fornecedor é pagamento indevido.
          </Termo>
          <Termo t="Indébito">
            pagamento que não era devido; gera direito de reaver (compensação
            ou restituição).
          </Termo>
          <Termo t="Compensação">
            usar um crédito para abater tributos federais que o próprio
            município deve.
          </Termo>
          <Termo t="Restituição">
            receber de volta, em dinheiro, o que foi pago indevidamente.
          </Termo>
          <Termo t="Apropriação">
            reconhecer um valor como receita própria — o destino correto do
            IRRF retido.
          </Termo>
          <Termo t="SELIC">
            a taxa oficial que corrige tributos no Brasil.
          </Termo>
          <Termo t="SHA-256">
            a “impressão digital” eletrônica de um arquivo — prova de
            integridade.
          </Termo>
          <Termo t="Controle Interno">
            o fiscal de dentro da prefeitura; é ele quem atesta cada proveito
            antes de qualquer cobrança.
          </Termo>
          <Termo t="Empenho e liquidação">
            os dois registros formais que autorizam e comprovam toda despesa
            pública.
          </Termo>
          <Termo t="Trava de glosa">
            a cláusula que devolve ao município qualquer êxito pago sobre valor
            que a Receita depois desfizer.
          </Termo>
          <Termo t="Minuta">
            o texto pronto de um documento, entregue para a autoridade adaptar
            e assinar.
          </Termo>
          <Termo t="Inexigibilidade">
            contratação direta, sem licitação, quando a disputa é inviável;
            exige processo justificado.
          </Termo>
          <Termo t="Credenciamento">
            o município pré-qualifica prestadores e aciona por demanda, a preço
            de edital.
          </Termo>
          <Termo t="Equação de fechamento">
            a prova dos nove: tudo que foi retido num ano tem de aparecer na
            soma dos quatro caminhos daquele ano, ao centavo.
          </Termo>
        </div>
      </Secao>

      {/* CTA FINAL */}
      <section className="bg-primary-dark py-14 text-white">
        <div className="container-sba max-w-4xl text-center">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">
            Quer levar isso ao seu município?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            A conversa começa sem compromisso: apresentamos os dados públicos
            da sua cidade e o caminho completo — e a conferência é gratuita.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/contato"
              className="rounded-md bg-white px-6 py-3 font-semibold text-primary-dark transition hover:bg-white/90"
            >
              Falar com a SBA
            </Link>
            <Link
              to="/recuperacao-tributaria"
              className="rounded-md border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Conhecer a solução
            </Link>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-white/60">
            Material informativo para parceiros e municípios. Nenhum conteúdo
            desta página é promessa de resultado: todo valor é potencial
            sujeito a conferência documental. Fundamentos: STF, Tema 1130 (RE
            1.293.453), trânsito em julgado 16/02/2022, sem modulação (art.
            158, I, CF); Parecer PGFN/ME 5.744/2022; TCE-SP, Comunicado GP nº
            55/2022; art. 184 da Lei nº 14.133/2021; IN RFB 1.234/2012 e
            2.145/2023.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default GuiaEtapas;
