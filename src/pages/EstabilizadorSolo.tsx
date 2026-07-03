import {
  Check,
  Wrench,
  Wallet,
  BadgeCheck,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import estrada from "@/assets/conaid/estrada.jpg";
import antes from "@/assets/conaid/antes.jpg";
import depois from "@/assets/conaid/depois.jpg";
import aplicacao from "@/assets/conaid/aplicacao.jpg";

const CREDIBILIDADE = [
  "Líder mundial em estabilização de solos (segundo o fabricante)",
  "Presente em mais de 100 países",
  "Distribuidor exclusivo no Brasil há 15 anos",
  "+5 milhões de m² aplicados no Brasil (2007–2023)",
];

const APLICACOES = [
  "Estradas rurais e vicinais",
  "Vias urbanas sem pavimento",
  "Mineração, sucroalcooleiras e petrolíferas",
  "Usinas solares e pátios industriais",
  "Aeródromos e acostamentos de rodovias",
  "Terraplenagens, aterros e quadras",
];

const BENEF_TEC = [
  "Acaba com a lama: reduz o índice de plasticidade",
  "Aumenta o suporte do solo (ISC/CBR em ~50%)",
  "Reduz a absorção de água e a liberação de poeira",
  "Produto com Selo Verde",
];

const BENEF_ECO = [
  "Estrada utilizável o ano todo, com pouca manutenção",
  "Reduz custos de execução, material e manutenção",
  "Permite pavimentação posterior",
  "Reduz cal (até 50%) e cimento (até 40%) na mistura",
];

const CERTIFICACOES = [
  "Registro nos Conselhos de Química e de Engenharia",
  "Selo Verde e ensaios ambientais anuais (acreditação INMETRO)",
  "Certificação junto ao IBAMA e a órgãos estaduais (IAT-PR, IMA-SC)",
  "Uso em obras com financiamento do BID",
  "Atestados de Petrobras, Vale e de obras públicas",
];

const EstabilizadorSolo = () => {
  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Infraestrutura · Estabilização de Solo"
        titulo="Estradas firmes o ano todo, a um custo bem menor."
        subtitulo="A SBA estrutura projetos de estabilização de solo com o ConAid CBR Plus — líder mundial em estabilização iônica, presente em mais de 100 países. Menos lama, menos poeira e menos manutenção, transformando o próprio solo em base resistente."
        ctaPrincipal={{ label: "Falar com a SBA", href: "/contato" }}
      />

      {/* Imagem + credibilidade */}
      <section className="border-b border-border bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <img
              src={estrada}
              alt="Estrada estabilizada com ConAid CBR Plus, firme em meio a lavouras"
              className="w-full rounded-lg border border-border object-cover"
              loading="lazy"
            />
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                O que é a estabilização de solo
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Em vez de cobrir a estrada com cascalho ou asfalto, a
                estabilização iônica trata o <strong>próprio solo</strong>: o
                ConAid CBR Plus é diluído em água e aplicado na base, deixando o
                terreno mais denso, resistente e impermeável. O resultado é uma
                pista que aguenta chuva e tráfego o ano todo.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {CREDIBILIDADE.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-foreground/90">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Antes e depois */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              A diferença na prática
            </h2>
            <p className="mt-4 text-muted-foreground">
              Da estrada que vira lama na chuva à pista firme e sem poeira —
              tratando o solo que já está lá.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
            {[
              { img: antes, legenda: "Antes — lama e buracos na chuva", tag: "Antes" },
              { img: aplicacao, legenda: "Aplicação do ConAid diluído em água", tag: "Aplicação" },
              { img: depois, legenda: "Depois — pista firme e regular", tag: "Depois" },
            ].map((f) => (
              <figure
                key={f.tag}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="relative">
                  <img
                    src={f.img}
                    alt={f.legenda}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-primary-dark/85 px-2.5 py-1 text-xs font-semibold text-primary-foreground">
                    {f.tag}
                  </span>
                </div>
                <figcaption className="p-4 text-sm text-muted-foreground">
                  {f.legenda}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 rule-gold" />
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              Por que vale a pena
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Wrench className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                Ganhos técnicos
              </h3>
              <ul className="mt-4 space-y-3">
                {BENEF_TEC.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Wallet className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary-dark">
                Ganhos econômicos
              </h3>
              <ul className="mt-4 space-y-3">
                {BENEF_ECO.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comparativo de custo */}
          <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-7 text-center">
            <p className="font-display text-lg font-semibold text-primary-dark">
              Mais quilômetros pelo mesmo custo de material
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Pelo custo de material de <strong>1 km</strong> feito com brita
              graduada ou solo-cimento, dá para estabilizar de{" "}
              <strong>2 a 3 km</strong> de estrada com o ConAid CBR Plus.
              Dimensionamento e valores por projeto, sob consulta.
            </p>
          </div>
        </div>
      </section>

      {/* Onde se aplica */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Onde se aplica
              </h2>
              <p className="mt-4 text-muted-foreground">
                Da estrada vicinal ao pátio industrial — onde houver solo e
                tráfego, há uma aplicação possível.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {APLICACOES.map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="bg-background">
        <div className="container-sba py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold text-primary-dark">
                Confiança construída
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                O ConAid CBR Plus tem histórico, certificação ambiental e
                atestados de grandes operações. A SBA estrutura o projeto e
                conecta o produto à execução.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Na estabilização e pavimentação, a SBA trabalha com parceiros
                especializados — como a{" "}
                <strong className="text-foreground">Dynacal</strong>{" "}
                (Estabilização e Pavimentação do Brasil), com mais de 40 anos de
                estrada e obras por todo o país.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a
                  href="https://conaidbrasil.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  Conhecer o ConAid CBR Plus
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://dynacal.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark"
                >
                  Conhecer a Dynacal
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <ul className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-7">
              {CERTIFICACOES.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SecaoCTA
        titulo="Tem estradas, pátios ou obras que pedem solo firme?"
        texto="Fale com a SBA. Avaliamos o solo, dimensionamos a aplicação e estruturamos o projeto com a tecnologia certa — valores sob consulta."
        botao={{ label: "Falar com a SBA", href: "/contato" }}
      />
    </Layout>
  );
};

export default EstabilizadorSolo;
