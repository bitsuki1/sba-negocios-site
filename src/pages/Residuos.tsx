import { Check, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { SecaoCTA } from "@/components/SecaoCTA";
import { CardSolucao } from "@/components/CardSolucao";
import { solucoesPorTema, PARCEIRO_CSTR } from "@/data/site";
import residuoValor from "@/assets/cstr/residuo-valor.png";
import plantaBiogas from "@/assets/cstr/planta-biogas.jpg";
import premioImg from "@/assets/cstr/premio.jpg";
import cstrLogo from "@/assets/cstr/cstr-logo.png";
import heroResiduos from "@/assets/cstr/circular.jpg";

const ESTAGIOS = [
  {
    numero: "01",
    titulo: "Teaser (grátis)",
    texto:
      "Uma primeira leitura da oportunidade, sem custo. Serve para entender se faz sentido seguir.",
  },
  {
    numero: "02",
    titulo: "Diagnóstico (pago)",
    texto:
      "Estudo a fundo da situação: o que existe, o volume, o que é possível e quais os caminhos.",
  },
  {
    numero: "03",
    titulo: "Estruturação",
    texto:
      "Organização do projeto: técnico, jurídico, modelo e atores. A SBA monta o arranjo que o torna viável.",
  },
  {
    numero: "04",
    titulo: "Intermediação",
    texto:
      "A SBA conecta cliente, operador, tecnologia e jurídico até o acordo. Quem executa é o operador, não a SBA.",
  },
];

const Residuos = () => {
  const segmentos = solucoesPorTema("Resíduos & Valorização");

  return (
    <Layout>
      <Hero
        compacto
        eyebrow="Resíduos & Valorização"
        titulo="Resíduo não é só custo. Bem estruturado, vira valor."
        subtitulo="A SBA não constrói usinas: estrutura o projeto e conecta cliente, operador, tecnologia e jurídico — do primeiro contato ao contrato. Atendemos o resíduo urbano do município, o grande gerador e o setor hospitalar."
        ctaPrincipal={{ label: "Conversar sobre um projeto", href: "/contato" }}
        imagem={{
          src: heroResiduos,
          alt: "Economia circular: resíduo que vira energia e valor.",
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
                  passivo ambiental e pressão regulatória. A boa notícia é que,
                  bem estruturado, o mesmo resíduo vira reciclável, energia e
                  receita nova.
                </p>
                <p>
                  É esse o caminho que a SBA monta — da coleta à valorização —
                  com a tecnologia certa para cada material e o operador certo
                  para tocar a planta.
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
              Três frentes, sem misturar
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada tipo de resíduo tem regra, tecnologia e operador próprios. A
              SBA trata cada um na sua frente.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {segmentos.map((s) => (
              <CardSolucao key={s.id} solucao={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Hub Conector */}
      <section className="bg-secondary/50">
        <div className="container-sba py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-primary-dark">
              O modelo Hub Conector
            </h2>
            <p className="mt-4 text-muted-foreground">
              Em vez de executar, a SBA articula. Trabalhamos em estágios, e cada
              um só avança quando faz sentido para o cliente.
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
                precisa escolher uma tecnologia sozinho: a SBA estrutura o
                projeto e a {PARCEIRO_CSTR.nome} traz a solução validada e a
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
                O objetivo é simples: tirar o resíduo do aterro e do passivo
                ambiental e devolvê-lo como valor — energia, receita ou
                conformidade. Os números variam caso a caso e ficam sob consulta.
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
              alt="Render de uma planta de valorização de resíduos (biogás, biometano e biofertilizante)"
              className="w-full rounded-lg shadow-xl ring-1 ring-white/10"
              loading="lazy"
            />
            <div className="text-primary-foreground">
              <div className="rule-gold mb-5" />
              <h2 className="font-display text-3xl font-bold">
                Como é uma planta de valorização
              </h2>
              <p className="mt-5 leading-relaxed text-primary-foreground/85">
                Em vez de mandar tudo para o aterro, o resíduo entra numa planta
                que separa, trata e transforma o material — gerando energia,
                biometano, biofertilizante e até crédito de carbono. É a
                infraestrutura que a SBA estrutura junto ao parceiro de tecnologia.
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
              Cada material tem o seu sistema. As faixas abaixo são as
              capacidades técnicas do parceiro — o dimensionamento de cada
              projeto é definido caso a caso.
            </p>
          </div>

          {/* Projeto-âncora */}
          <div className="mt-10 rounded-lg border border-primary/20 bg-primary/5 p-6 md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground">
                {PARCEIRO_CSTR.projeto.titulo}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-primary-dark">
                {PARCEIRO_CSTR.projeto.local}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {PARCEIRO_CSTR.projeto.tecnologia}
              </p>
            </div>
            <span className="mt-3 inline-block shrink-0 rounded-full bg-accent/15 px-3 py-1.5 text-sm font-semibold text-accent md:mt-0">
              {PARCEIRO_CSTR.projeto.status}
            </span>
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
            Dimensionamento e valores por projeto, sob consulta.
          </p>
        </div>
      </section>

      <SecaoCTA
        titulo="Tem um desafio de resíduos na sua cidade ou empresa?"
        texto="Comece pelo teaser, sem custo. A partir dele, decidimos juntos se vale seguir para o diagnóstico."
        botao={{ label: "Conversar sobre um projeto", href: "/contato" }}
      />
    </Layout>
  );
};

export default Residuos;
