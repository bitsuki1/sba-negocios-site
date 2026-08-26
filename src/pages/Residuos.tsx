import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, ExternalLink, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { applyPageSchema } from "@/lib/seo";
import { solucoesPorTema, PARCEIRO_CSTR } from "@/data/site";
import residuoValor from "@/assets/cstr/residuo-valor.png";
import plantaBiogas from "@/assets/cstr/planta-biogas.jpg";
import premioImg from "@/assets/cstr/premio.jpg";
import cstrLogo from "@/assets/cstr/cstr-logo.png";
import heroResiduos from "@/assets/cstr/circular.jpg";

// Perguntas frequentes do setor — respostas curtas, factuais, sem promessa
// de "garantido"; alinhado às regras de conteúdo do README (§Regras de conteúdo).
// O mesmo conteúdo alimenta o FAQPage schema (JSON-LD abaixo) para AEO / rich
// snippet ("People Also Ask") no Google.
const FAQS: { q: string; a: string }[] = [
  {
    q: "Qual a diferença entre aterro sanitário e usina de tratamento de resíduos?",
    a: "Aterro é destino final: o resíduo fica enterrado e o município paga pelo transporte, pela área e pelo passivo ambiental. A usina é o oposto — o resíduo entra e sai transformado em energia, biometano, biofertilizante e materiais recicláveis. O aterro é despesa; a usina, quando bem dimensionada, pode gerar receita nova ou pelo menos zerar o custo da destinação.",
  },
  {
    q: "O que é biometano municipal?",
    a: "Biometano é o biogás (produzido pela decomposição controlada do resíduo orgânico) que passou por purificação até ficar equivalente ao gás natural. Depois de purificado, pode ser injetado na rede de gás, virar combustível para a frota da prefeitura ou ser vendido a indústrias vizinhas. \"Municipal\" significa que o insumo é o próprio lixo urbano do município.",
  },
  {
    q: "Como funciona um consórcio intermunicipal de resíduos?",
    a: "Municípios vizinhos se unem por lei (Lei 11.107/2005) e operam como uma pessoa jurídica única na destinação dos resíduos. Assim é possível construir UMA usina que atende TODOS os municípios do consórcio, dividindo o investimento e a operação — dá escala mesmo para prefeituras pequenas, que sozinhas não teriam volume.",
  },
  {
    q: "Quem paga a usina — a prefeitura ou o operador?",
    a: "Depende do modelo. Nos três mais comuns: (i) a prefeitura paga direto, com dinheiro público e financiamento (FINEP, BNDES ou fundos verdes internacionais); (ii) o operador privado paga tudo e cobra uma tarifa mensal por tonelada tratada (modelo BOT / concessão, parecido com contrato de água); (iii) modelo híbrido, em que a prefeitura entra com a área e a coleta, e o operador entra com o capital e a tecnologia. A SBA estuda o caso e ajuda a definir o melhor modelo antes do contrato.",
  },
  {
    q: "Município pequeno (até 50 mil habitantes) tem escala para uma usina?",
    a: "Sozinho, quase sempre não. Em consórcio intermunicipal, quase sempre sim. Um município de 30 mil hab gera cerca de 0,8–1 kg/hab/dia de resíduo (fonte pública: SNIS / Ministério do Desenvolvimento Regional) — algo entre 24 e 30 t/dia. Isso está na faixa mínima dos sistemas do parceiro CSTR para RSU (50 a 300 t/dia). Um consórcio de 3–5 municípios da mesma região facilmente ultrapassa o piso.",
  },
  {
    q: "Como o Novo Marco do Saneamento (Lei 14.026/2020) muda a destinação de resíduos do meu município?",
    a: "O Marco exige o fim dos lixões e a destinação final ambientalmente adequada. O município que ainda usa lixão a céu aberto está fora da lei — e pode ter repasses federais bloqueados, ficar sem crédito nos bancos oficiais e responder na justiça. A mesma lei incentiva soluções regionais (consórcios) e permite ao município cobrar taxa específica de coleta (a \"taxa de lixo\"), que dá lastro financeiro ao projeto.",
  },
];

const ESTAGIOS = [
  {
    numero: "01",
    titulo: "Primeira leitura (grátis)",
    texto:
      "Uma primeira análise da oportunidade, sem custo. Serve para entender se faz sentido seguir.",
  },
  {
    numero: "02",
    titulo: "Estudo aprofundado (pago)",
    texto:
      "Estudo a fundo da situação: o que existe, o volume, o que é possível e quais os caminhos.",
  },
  {
    numero: "03",
    titulo: "Montagem do projeto",
    texto:
      "Organização do projeto: a parte técnica, a jurídica, o modelo de negócio e os parceiros. A SBA monta tudo o que torna o projeto possível.",
  },
  {
    numero: "04",
    titulo: "Ligação até o contrato",
    texto:
      "A SBA liga cliente, operador, tecnologia e jurídico até o contrato. Quem faz a operação é o operador, não a SBA.",
  },
];

const Residuos = () => {
  const segmentos = solucoesPorTema("Resíduos & Aproveitamento");

  // Structured data (JSON-LD) para esta rota — Service (o que a SBA oferece)
  // + FAQPage (as perguntas do FAQ acima). O Google usa para rich snippets.
  // O helper limpa o script anterior ao trocar de rota (data-page-schema).
  useEffect(() => {
    applyPageSchema({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          serviceType: "Estruturação de projeto de usina de tratamento de resíduos sólidos urbanos",
          provider: { "@type": "Organization", name: "SBA Negócios", url: "https://sbanegocios.com.br" },
          areaServed: { "@type": "Country", name: "Brasil" },
          audience: [
            { "@type": "Audience", audienceType: "Prefeituras municipais" },
            { "@type": "Audience", audienceType: "Consórcios intermunicipais" },
            { "@type": "Audience", audienceType: "Empresas geradoras de grande volume de resíduo" },
          ],
          description:
            "Estruturação de projetos de usina de tratamento de resíduos sólidos urbanos (RSU): da coleta ao biometano/energia, com tecnologia parceira (CSTR) e conformidade com o Novo Marco do Saneamento (Lei 14.026/2020) e a PNRS. A SBA organiza o projeto — não executa a obra.",
          offers: {
            "@type": "Offer",
            name: "Primeira leitura sem custo",
            price: "0",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
    return () => applyPageSchema(null);
  }, []);

  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Resíduos & Aproveitamento"
        titulo="Usina de resíduos sólidos urbanos para prefeituras e consórcios"
        subtitulo="Resíduo não é só custo — bem aproveitado, vira receita. A SBA não constrói usinas: ela organiza o projeto e reúne cliente, operador, tecnologia e jurídico — do primeiro contato ao contrato. Atendemos o lixo urbano do município, as empresas que geram grande volume e o setor hospitalar."
        ctaPrincipal={{ label: "Conversar sobre um projeto", href: "/contato" }}
        imagem={{
          src: heroResiduos,
          alt: "Resíduo que vira energia e receita, em vez de ir para o aterro.",
        }}
      />

      {/* Do resíduo ao valor */}
      <section className="border-b border-border bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Do resíduo ao valor
              </h2>
              <div className="mt-5 space-y-4 text-muted-foreground">
                <p>
                  Hoje o resíduo é, quase sempre, só despesa: transporte, aterro,
                  risco de multa ambiental e pressão da lei — o Novo Marco do
                  Saneamento (Lei 14.026/2020), que exige o fim dos lixões nos
                  municípios, e a Política Nacional de Resíduos, que responsabiliza
                  quem gera o lixo. A boa notícia é que, bem trabalhado, o mesmo
                  resíduo vira material reciclável, energia e receita nova.
                </p>
                <p>
                  É esse o caminho que a SBA monta — da coleta ao aproveitamento —
                  com a tecnologia certa para cada material e o operador certo
                  para tocar a usina.
                </p>
              </div>
            </div>
            <img
              src={residuoValor}
              alt="Do resíduo ao valor: reciclagem, energia e economia"
              className="w-full rounded-lg border border-border bg-white"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Os 3 segmentos */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Três tipos de resíduo, sem misturar
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada tipo de resíduo tem regra, tecnologia e operador próprios. A
              SBA cuida de cada um separadamente.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {segmentos.map((s) => {
              const Icone = s.icon;
              const temPaginaPropria = s.href && s.href !== "/residuos";
              return (
                <div
                  key={s.id}
                  className="flex h-full flex-col rounded-lg border border-border bg-card p-7"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icone className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                    {s.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.resumo}
                  </p>
                  <div className="mt-4 rounded-md bg-secondary/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                      Benefício
                    </p>
                    <p className="mt-1 text-sm text-foreground/90">{s.beneficio}</p>
                  </div>
                  <div className="flex-1" />
                  <Link
                    to={temPaginaPropria ? s.href! : "/contato"}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {temPaginaPropria ? "Ver detalhes" : "Falar sobre este resíduo"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hub Conector */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Como a SBA trabalha: organiza, não executa
            </h2>
            <p className="mt-4 text-muted-foreground">
              A SBA não toca a obra: ela organiza o projeto e reúne as pessoas
              certas. Trabalhamos por etapas, e cada uma só avança quando faz
              sentido para o cliente.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ESTAGIOS.map((estagio) => (
              <li
                key={estagio.numero}
                className="rounded-lg border border-border bg-card p-6"
              >
                <span className="font-display text-3xl font-bold text-gold">
                  {estagio.numero}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-primary-dark">
                  {estagio.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {estagio.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Tecnologia do parceiro CSTR */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-5 inline-flex rounded-lg bg-primary-dark px-4 py-3">
                <img
                  src={cstrLogo}
                  alt="CSTR — Centro Sustentável de Tratamento de Resíduos"
                  className="h-12 w-auto"
                />
              </span>
              <p className="text-sm font-semibold uppercase tracking-wide text-gold-foreground">
                Parceiro de tecnologia
              </p>
              <h2 className="mt-1 font-display text-3xl font-bold text-primary-dark">
                A tecnologia vem da {PARCEIRO_CSTR.nome}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {PARCEIRO_CSTR.nomeCompleto}
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {PARCEIRO_CSTR.chamada} Assim, o município ou a empresa não
                precisa escolher a tecnologia por conta própria: a SBA organiza o
                projeto e a {PARCEIRO_CSTR.nome} traz a tecnologia testada e a
                operação.
              </p>
              <a
                href={PARCEIRO_CSTR.site}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Conhecer a {PARCEIRO_CSTR.nome}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="space-y-5">
              <figure>
                <img
                  src={premioImg}
                  alt="CSTR reconhecido como Startup do ano (Troféu Frotas & Fretes Verdes 2025)"
                  className="w-full rounded-lg border border-border"
                  loading="lazy"
                />
                <figcaption className="mt-2 text-xs text-muted-foreground">
                  Reconhecido como Startup do ano — Troféu Frotas &amp; Fretes
                  Verdes 2025.
                </figcaption>
              </figure>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-7">
                <h3 className="font-display text-lg font-semibold text-primary-dark">
                  O que a {PARCEIRO_CSTR.nome} entrega
                </h3>
              <ul className="mt-5 space-y-3">
                {PARCEIRO_CSTR.entregas.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-primary/15 pt-4 text-sm text-muted-foreground">
                O objetivo é simples: tirar o resíduo do aterro e do risco
                ambiental e devolvê-lo como valor — energia, receita ou o
                cumprimento da lei. O tamanho e o custo de cada projeto dependem
                do caso — a SBA calcula isso junto com você.
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planta de valorização — render */}
      <section className="bg-primary-dark">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <img
              src={plantaBiogas}
              alt="Ilustração de uma usina que transforma resíduo em energia (biogás, biometano e biofertilizante)"
              className="w-full rounded-lg shadow-xl ring-1 ring-white/10"
              loading="lazy"
            />
            <div className="text-primary-foreground">
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold">
                Como é uma usina que transforma o lixo
              </h2>
              <p className="mt-5 leading-relaxed text-primary-foreground/85">
                Em vez de mandar tudo para o aterro, o resíduo entra numa usina
                que separa, trata e transforma o material — gerando energia,
                biometano, biofertilizante e até crédito de carbono. É a
                estrutura que a SBA organiza junto ao parceiro de tecnologia.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Energia e biometano", "Biofertilizante", "Crédito de carbono", "Menos aterro"].map(
                  (b) => (
                    <li key={b} className="flex items-center gap-3 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-gold" />
                      <span className="text-primary-foreground/90">{b}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologias / capacidades da CSTR */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              As tecnologias da {PARCEIRO_CSTR.nome}
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada material tem o seu sistema. Os números abaixo são a
              capacidade máxima que cada sistema do parceiro consegue tratar; o
              tamanho de cada projeto é definido caso a caso.
            </p>
          </div>

          {/* Projeto-farol: Congonhas do Campo — MG.
              Honesto sobre o estado: projeto EM CONSTRUÇÃO, não case operacional. */}
          <div className="mt-10 grid gap-5 rounded-lg border border-primary/20 bg-primary/5 p-6 md:grid-cols-[1fr_auto] md:items-start md:gap-8 lg:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                Projeto-farol do parceiro CSTR
              </p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-primary-dark">
                {PARCEIRO_CSTR.projeto.local}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {PARCEIRO_CSTR.projeto.titulo} usando <strong>tecnologia de explosão a vapor</strong> —
                o diferencial técnico da {PARCEIRO_CSTR.nome}. O resíduo é submetido a vapor sob
                alta pressão que rompe a estrutura celular do material orgânico, liberando açúcares
                para a fermentação (biogás/biometano) e reduzindo o volume final a uma fração do
                original.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-primary-dark">Por que "farol":</span> é o
                projeto de referência em construção — não uma usina em operação. Serve para o
                município ver a rota tecnológica e o modelo de projeto antes de decidir. Quando
                entrar em operação, os números reais entram nesta página.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark">
                  Startup do Ano · Frotas &amp; Fretes Verdes 2025
                </span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark">
                  {PARCEIRO_CSTR.origem}
                </span>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2 md:items-end md:text-right">
              <span className="inline-block rounded-full bg-accent/15 px-3 py-1.5 text-sm font-semibold text-accent">
                {PARCEIRO_CSTR.projeto.status}
              </span>
              <a
                href={PARCEIRO_CSTR.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
              >
                Ver no site da {PARCEIRO_CSTR.nome}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Sistemas */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARCEIRO_CSTR.sistemas.map((s) => {
              const Icone = s.icon;
              return (
                <div
                  key={s.nome}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-primary">
                      <Icone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {s.status && (
                      <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold-foreground">
                        {s.status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-primary-dark">
                    {s.nome}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-primary">
                    {s.capacidade}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.nota}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Capacidades técnicas informadas pelo parceiro {PARCEIRO_CSTR.nome}.
            O tamanho e o custo de cada projeto a SBA calcula com você.
          </p>
        </div>
      </section>

      {/* Sub-páginas do eixo (2026-08-26). Esta seção NÃO é decorativa: sem link
          da página-mãe, página nova nasce órfã e o buscador não a encontra.
          Cada filha trata UM público e UMA base legal distintos — ver
          LANDINGS_RESIDUOS em src/data/landings.ts. */}
      <section className="border-t border-border bg-muted/40">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Encontre o seu caso
            </h2>
            <p className="mt-4 text-muted-foreground">
              O caminho muda conforme quem procura. Escolha o que descreve a sua
              situação — cada página trata das regras e do modelo daquele caso.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                href: "/residuos/consorcio-intermunicipal-residuos",
                titulo: "Somos um grupo de municípios",
                texto:
                  "Consórcio intermunicipal (Lei 11.107/2005): como a união de municípios vizinhos dá a escala que nenhum deles tem sozinho.",
              },
              {
                href: "/residuos/rsu-prefeitura",
                titulo: "Sou uma prefeitura",
                texto:
                  "Novo Marco do Saneamento (Lei 14.026/2020): o fim dos lixões, o risco de repasse bloqueado e as alternativas de destinação adequada.",
              },
              {
                href: "/residuos/usina-biometano-municipal",
                titulo: "Quero saber do biometano",
                texto:
                  "Do lixo orgânico ao gás equivalente ao natural: os três destinos possíveis e, principalmente, quem investe no projeto.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-semibold text-primary-dark">
                  {item.titulo}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.texto}
                </p>
                <span className="mt-4 text-sm font-medium text-primary underline-offset-4 group-hover:underline">
                  Ver esta página &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — perguntas reais do setor de resíduos.
          Também virou FAQPage schema (JSON-LD acima) para rich snippet no Google. */}
      <section className="border-t border-border bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Perguntas que o município e a empresa fazem
            </h2>
            <p className="mt-4 text-muted-foreground">
              Respostas curtas e factuais — sem promessa de "garantido". Se a sua
              dúvida não estiver aqui, pergunte no {" "}
              <Link to="/contato" className="font-semibold text-primary hover:text-primary-dark">
                formulário de contato
              </Link>
              .
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-lg border border-border bg-card">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                className="group px-6 py-5"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-base font-semibold text-primary-dark marker:hidden">
                  <span className="flex-1">{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 rounded-full border border-border p-1 text-muted-foreground transition-transform group-open:rotate-45"
                  >
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor">
                      <path d="M9 4h2v5h5v2h-5v5H9v-5H4V9h5V4z" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SecaoCTA
        titulo="Tem um desafio de resíduos na sua cidade ou empresa?"
        texto="Comece pela primeira leitura, sem custo. A partir dela, decidimos juntos se vale seguir para o estudo aprofundado."
        botao={{ label: "Conversar sobre um projeto", href: "/contato" }}
      />
    </Layout>
  );
};

export default Residuos;
